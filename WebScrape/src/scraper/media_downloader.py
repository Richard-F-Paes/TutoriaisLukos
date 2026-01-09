from __future__ import annotations

import json
import logging
import mimetypes
import random
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any
from typing import Callable
from urllib.parse import urlparse

from bs4 import BeautifulSoup
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import urllib3

from src.utils.retry import retry
from src.utils.urls import (
    is_http_url,
    normalize_url,
    normalize_googleusercontent_url,
    slugify,
    url_id,
)


log = logging.getLogger(__name__)

# Suprimir warnings do urllib3 sobre retries (já estamos tratando os erros)
# Reduzir verbosidade do urllib3 para não poluir os logs
urllib3_logger = logging.getLogger("urllib3.connectionpool")
urllib3_logger.setLevel(logging.ERROR)  # Apenas erros, não warnings de retry


def _build_google_headers(
    url: str,
    user_agent: str,
    page_url: str | None = None,
) -> dict[str, str]:
    """
    Build optimized HTTP headers for Google Sites/Googleusercontent requests.
    
    Args:
        url: The target URL being requested
        user_agent: User agent string to use
        page_url: Optional page URL for Referer header
    
    Returns:
        Dictionary of HTTP headers optimized for Google services
    """
    headers = {
        "User-Agent": user_agent,
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "DNT": "1",  # Do Not Track
        "Sec-GPC": "1",  # Global Privacy Control
    }
    
    # Add Referer for Google services (helps avoid 403)
    if "googleusercontent.com" in url or "sites.google.com" in url:
        # Use page_url as Referer if available, otherwise use Google Sites base
        if page_url:
            headers["Referer"] = page_url
        else:
            headers["Referer"] = "https://sites.google.com/"
        
        # Add Sec-Fetch headers to appear more browser-like (Chrome/Firefox behavior)
        headers["Sec-Fetch-Dest"] = "image"
        headers["Sec-Fetch-Mode"] = "no-cors"
        headers["Sec-Fetch-Site"] = "cross-site"
        headers["Sec-Fetch-User"] = "?1"  # Indicates user-initiated request
    
    return headers


def _download_single_media(
    m: dict[str, Any],
    *,
    page_slug: str,
    images_dir: Path,
    documents_dir: Path,
    videos_dir: Path | None = None,
    user_agent: str,
    timeout_seconds: int,
    retries: int,
    backoff_seconds: float,
    can_fetch: Callable[[str], bool] | None = None,
    media_index: int | None = None,
    total_media: int | None = None,
    remove_size_params: bool = True,
    delay_seconds: float = 0.1,
    validate_integrity: bool = True,
    cookies: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """
    Download a single media item. Thread-safe function.
    Returns the updated media dict.
    
    Args:
        m: Media dictionary with url, type, etc.
        page_slug: Slug for organizing files by page
        images_dir: Directory for images
        documents_dir: Directory for documents
        videos_dir: Directory for videos (optional)
        user_agent: User agent string
        timeout_seconds: Request timeout
        retries: Number of retry attempts
        backoff_seconds: Base backoff time for retries
        can_fetch: Optional robots.txt checker
        media_index: Optional index for progress logging
        total_media: Optional total count for progress logging
        remove_size_params: If True, remove Google image size parameters
        delay_seconds: Delay between requests (with jitter)
        validate_integrity: If True, validate file integrity after download
    """
    mtype = (m.get("type") or "unknown").lower()
    original_url = normalize_url(m.get("url") or "")
    
    # For Google Drive embeds (images and videos), prefer download_url if available
    # This ensures we download the actual file, not the preview HTML
    download_url = m.get("download_url")
    if download_url and "drive.google.com" in (original_url.lower() or download_url.lower()):
        url = normalize_url(download_url)
        log.debug("Usando download_url do Google Drive para %s: %s", mtype, url[:80] + "..." if len(url) > 80 else url)
    else:
        # Normalize Google URLs by removing size parameters if configured
        if remove_size_params and "googleusercontent.com" in original_url.lower():
            url = normalize_googleusercontent_url(original_url, remove_size_params=True)
            # Store original URL for reference (only if different)
            if url != original_url:
                m["original_url"] = original_url
                log.debug("URL normalizada (parâmetros de tamanho removidos): %s -> %s", 
                         original_url[:80] + "..." if len(original_url) > 80 else original_url,
                         url[:80] + "..." if len(url) > 80 else url)
        else:
            url = original_url
    
    # Log início do download
    if media_index is not None and total_media is not None:
        log.info("Baixando mídia %d/%d (%s): %s", media_index + 1, total_media, mtype, url[:80] + "..." if len(url) > 80 else url)
    else:
        log.info("Baixando mídia (%s): %s", mtype, url[:80] + "..." if len(url) > 80 else url)
    
    if not is_http_url(url):
        log.debug("URL inválida, pulando: %s", url)
        return m
    if mtype not in {"image", "document", "video"}:
        log.debug("Tipo de mídia não suportado (%s), pulando: %s", mtype, url)
        return m
    if can_fetch is not None and not can_fetch(url):
        log.debug("URL bloqueada por robots.txt: %s", url)
        m["downloaded"] = False
        m["download_reason"] = "blocked_by_robots"
        return m

    # Determine target directory based on media type
    if mtype == "image":
        target_base = images_dir
    elif mtype == "video":
        if videos_dir is None:
            log.warning("videos_dir não fornecido, pulando download de vídeo: %s", url)
            return m
        target_base = videos_dir
    else:  # document
        target_base = documents_dir
    
    # For backend/uploads, don't use page_slug subdirectory (flat structure)
    # Check if we're saving to backend/uploads by checking if path contains "uploads"
    use_page_slug = "uploads" not in str(target_base)
    target_dir = target_base / page_slug if use_page_slug else target_base
    target_dir.mkdir(parents=True, exist_ok=True)

    # Determinar nome do arquivo ANTES de fazer qualquer requisição HTTP
    # Use original URL for ID to maintain consistency (if available, otherwise use normalized)
    url_for_id = m.get("original_url") or url
    url_id_str = url_id(url_for_id)
    
    # Verificar se arquivo já existe (verificação única e centralizada)
    existing_file_path, existing_ext = _check_existing_file(
        m, url, url_id_str, target_dir, remove_size_params=remove_size_params
    )
    if existing_file_path is not None:
        log.debug("Arquivo já existe, pulando download: %s", existing_file_path)
        _update_media_metadata(m, existing_file_path)
        if media_index is not None and total_media is not None:
            log.info("✓ Mídia %d/%d já existe: %s", media_index + 1, total_media, existing_file_path.name)
        return m
    
    # Se chegou aqui, arquivo não existe - precisa baixar
    # Rate limiting: add delay with jitter to avoid thundering herd
    if delay_seconds > 0:
        jitter = random.uniform(0, delay_seconds * 0.3)  # 30% jitter
        time.sleep(delay_seconds + jitter)
    
    # Criar sessão HTTP própria para esta thread com configurações melhoradas
    session = requests.Session()
    
    # Add cookies from Selenium if available (helps with Google Sites authentication)
    if cookies:
        try:
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"media_downloader.py:183","message":"Aplicando cookies do Selenium","data":{"url":url[:100],"media_index":media_index,"cookie_count":len(cookies),"cookie_names":[c.get("name") for c in cookies[:5]]},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            for cookie in cookies:
                # Convert to requests cookie format
                cookie_name = cookie.get("name")
                cookie_value = cookie.get("value")
                cookie_domain = cookie.get("domain")
                cookie_path = cookie.get("path", "/")
                
                if cookie_name and cookie_value:
                    # Use requests.cookies.RequestsCookieJar.set() method
                    # This is simpler and more compatible
                    try:
                        session.cookies.set(
                            name=cookie_name,
                            value=cookie_value,
                            domain=cookie_domain,
                            path=cookie_path,
                        )
                    except Exception as cookie_err:
                        # Fallback: try setting without domain/path
                        try:
                            session.cookies.set(name=cookie_name, value=cookie_value)
                        except Exception:
                            pass  # Skip this cookie if it fails
            
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"media_downloader.py:210","message":"Cookies aplicados com sucesso","data":{"url":url[:100],"media_index":media_index,"session_cookie_count":len(session.cookies)},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            log.debug("Aplicados %d cookies do Selenium para download de %s (total na sessão: %d)", 
                     len(cookies), url[:80], len(session.cookies))
        except Exception as e:
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"media_downloader.py:214","message":"Erro ao aplicar cookies","data":{"url":url[:100],"media_index":media_index,"error":str(e)[:200]},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            log.debug("Erro ao aplicar cookies do Selenium: %s", e)
    
    # Build optimized headers for Google services
    page_url = m.get("tutorial_url") or m.get("page_url")
    headers = _build_google_headers(url, user_agent, page_url)
    session.headers.update(headers)
    
    # Configurar retry strategy para a sessão
    # Reduzir retries automáticos do urllib3 (já temos retry customizado)
    # Não incluir erros SSL na lista de retry automático (tratamos separadamente)
    retry_strategy = Retry(
        total=2,  # Reduzido de 3 para 2 (já temos retry customizado)
        backoff_factor=0.5,  # Backoff mais rápido
        status_forcelist=[429, 500, 502, 503, 504],  # Apenas erros HTTP temporários
        allowed_methods=["HEAD", "GET"],
        respect_retry_after_header=True,
        # Não fazer retry automático em erros de conexão/SSL (tratamos no nosso código)
        connect=0,  # Não retry em erros de conexão
        read=0,  # Não retry em erros de leitura
        redirect=2,  # Permitir redirecionamentos
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    # Tentar descobrir content-type com HEAD request (mais eficiente)
    content_type = None
    size = None
    try:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"media_downloader.py:205","message":"HEAD request iniciado","data":{"url":url[:100],"media_index":media_index},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        head_resp = session.head(url, timeout=timeout_seconds, allow_redirects=True)
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"media_downloader.py:208","message":"HEAD response recebido","data":{"status_code":head_resp.status_code,"url":url[:100],"media_index":media_index},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        if head_resp.status_code == 200:
            content_type = (head_resp.headers.get("content-type") or "").split(";")[0].strip() or None
            size = int(head_resp.headers.get("content-length") or 0) or None
        elif head_resp.status_code == 403:
            # 403 no HEAD não significa necessariamente que GET também falhará
            # Muitos servidores bloqueiam HEAD mas permitem GET
            log.debug("HEAD request retornou 403 para %s, tentando GET mesmo assim", url)
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"A","location":"media_downloader.py:218","message":"HEAD 403 Forbidden, continuando com GET","data":{"url":url[:100],"media_index":media_index,"status_code":403},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            # Continuar para tentar GET - não retornar aqui
    except requests.exceptions.SSLError as ssl_err:
        log.debug("Erro SSL no HEAD request para %s: %s", url, ssl_err)
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"D","location":"media_downloader.py:217","message":"HEAD SSL error","data":{"url":url[:100],"media_index":media_index,"error":str(ssl_err)[:200]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        # Continuar e tentar GET mesmo assim
    except requests.exceptions.RequestException as req_err:
        log.debug("Erro no HEAD request para %s: %s", url, req_err)
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"B","location":"media_downloader.py:220","message":"HEAD RequestException","data":{"url":url[:100],"media_index":media_index,"error":str(req_err)[:200],"error_type":type(req_err).__name__},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        # Continuar e tentar GET mesmo assim
    except Exception as exc:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"E","location":"media_downloader.py:223","message":"HEAD Exception inesperada","data":{"url":url[:100],"media_index":media_index,"error":str(exc)[:200],"error_type":type(exc).__name__},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        # Se HEAD falhar, vamos descobrir durante o GET
        pass
    
    # Determinar extensão e nome do arquivo final
    ext = _guess_ext(url, content_type)
    file_name = f"{url_id_str}{ext}"
    out_path = target_dir / file_name
    
    # Verificar novamente se o arquivo existe (caso tenha sido criado entre a verificação anterior e agora)
    if out_path.exists():
        log.debug("Arquivo já existe (após HEAD), pulando download: %s", out_path)
        _update_media_metadata(m, out_path, content_type, size)
        return m
    
    # Inicializar variáveis para evitar erro de variável não definida
    downloaded_path: Path | None = None
    downloaded_content_type: str | None = content_type
    downloaded_size: int | None = size
    
    # Variável para controlar timeout em streams
    download_timed_out = threading.Event()
    
    def do_download() -> tuple[Path, str | None, int | None]:
        # Resetar flag de timeout
        download_timed_out.clear()
        
        # Timer para forçar timeout em streams longos
        def timeout_handler():
            download_timed_out.set()
        
        timeout_timer = threading.Timer(timeout_seconds * 2, timeout_handler)
        timeout_timer.start()
        
        try:
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"media_downloader.py:257","message":"GET request iniciado","data":{"url":url[:100],"media_index":media_index},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            resp = session.get(url, stream=True, timeout=timeout_seconds, allow_redirects=True)
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"media_downloader.py:260","message":"GET response recebido","data":{"status_code":resp.status_code,"url":url[:100],"media_index":media_index},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            
            # Tratar 403 especificamente (não tentar novamente)
            if resp.status_code == 403:
                # #region agent log
                with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                    f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"media_downloader.py:264","message":"GET 403 Forbidden","data":{"url":url[:100],"media_index":media_index,"status_code":403},"timestamp":int(time.time()*1000)})+"\n")
                # #endregion
                raise requests.exceptions.HTTPError(
                    f"403 Client Error: Forbidden for url: {url}",
                    response=resp
                )
            
            resp.raise_for_status()
            
            # Se não descobrimos antes, pega agora
            if content_type is None:
                content_type_from_resp = (resp.headers.get("content-type") or "").split(";")[0].strip() or None
            else:
                content_type_from_resp = content_type
            size_from_resp = int(resp.headers.get("content-length") or 0) or None
            
            # Log tamanho esperado se disponível
            if size_from_resp:
                size_mb = size_from_resp / (1024 * 1024)
                log.debug("Tamanho esperado: %.2f MB", size_mb)

            # Re-verificar extensão caso o content-type tenha mudado
            ext_final = _guess_ext(url, content_type_from_resp)
            current_out_path = out_path
            if ext_final != ext:
                file_name_final = f"{url_id_str}{ext_final}"
                out_path_final = target_dir / file_name_final
                if out_path_final.exists():
                    log.debug("Arquivo já existe (com extensão diferente), pulando: %s", out_path_final)
                    actual_size = out_path_final.stat().st_size
                    return out_path_final, content_type_from_resp, size_from_resp or actual_size
                current_out_path = out_path_final

            # Download com progresso e verificação de timeout
            bytes_downloaded = 0
            last_log_time = time.time()
            chunk_size = 1024 * 64  # 64KB chunks
            
            with current_out_path.open("wb") as f:
                for chunk in resp.iter_content(chunk_size=chunk_size):
                    if download_timed_out.is_set():
                        raise requests.exceptions.Timeout(f"Timeout após {timeout_seconds * 2}s durante download de stream")
                    
                    if chunk:
                        f.write(chunk)
                        bytes_downloaded += len(chunk)
                        
                        # Log progresso a cada 5 segundos ou a cada 10MB
                        current_time = time.time()
                        if current_time - last_log_time >= 5.0 or bytes_downloaded % (10 * 1024 * 1024) < chunk_size:
                            if size_from_resp:
                                progress_pct = (bytes_downloaded / size_from_resp) * 100
                                log.debug("Progresso: %.1f%% (%.2f MB / %.2f MB)", 
                                         progress_pct, bytes_downloaded / (1024 * 1024), size_from_resp / (1024 * 1024))
                            else:
                                log.debug("Progresso: %.2f MB baixados", bytes_downloaded / (1024 * 1024))
                            last_log_time = current_time
            
            # Log conclusão
            final_size_mb = bytes_downloaded / (1024 * 1024)
            log.debug("Download concluído: %.2f MB", final_size_mb)
            
                # CRITICAL: Check if Drive returned HTML instead of the actual file
            # This happens when Drive shows a confirmation page instead of direct download
            if content_type_from_resp and content_type_from_resp.startswith("text/html"):
                log.warning("Drive retornou HTML em vez do arquivo real (página de confirmação). Tentando detectar redirect...")
                # Try to read first few bytes to confirm it's HTML
                is_invalid_html = False
                html_content_bytes = b""
                try:
                    with current_out_path.open("rb") as f:
                        first_bytes = f.read(512)
                        first_text = first_bytes.decode("utf-8", errors="ignore").lower()
                        if "<html" in first_text or "<!doctype" in first_text:
                            is_invalid_html = True
                            # Read the rest of the file for parsing later
                            html_content_bytes = first_bytes + f.read()
                except Exception as e:
                    # If we can't read it, we can't verify, but if content-type says html, it's suspect.
                    # safer to fail if we are unsure? or let it pass?
                    # logic was: catch exception and cleanup.
                    if current_out_path.exists():
                        try:
                            current_out_path.unlink() 
                        except OSError:
                            pass
                    raise

                if is_invalid_html:
                    # Tentar encontrar link de confirmação (virus scan warning)
                    log.warning("Tentando encontrar link de confirmação no HTML...")
                    try:
                        soup = BeautifulSoup(html_content_bytes, "html.parser")
                        confirm_link = None
                        for a in soup.find_all("a", href=True):
                            if "confirm=" in a["href"]:
                                confirm_link = a["href"]
                                break
                        
                        if confirm_link:
                            # Se for link relativo, adicionar base
                            if confirm_link.startswith("/"):
                                parsed_url = urlparse(url)
                                base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
                                confirm_link = base_url + confirm_link
                            
                            log.info("Link de confirmação encontrado: %s", confirm_link)
                            
                            # Fazer nova requisição para o link de confirmação
                            # Fechar arquivo atual para poder sobrescrever
                            
                            # Recursão limitada (ou apenas uma nova chamada simples)
                            # Vamos fazer uma nova request simples aqui mesmo
                            log.info("Seguindo link de confirmação...")
                            confirm_resp = session.get(confirm_link, stream=True, timeout=timeout_seconds, allow_redirects=True)
                            confirm_resp.raise_for_status()
                            
                            # Atualizar info do response
                            resp = confirm_resp
                            content_type_from_resp = (resp.headers.get("content-type") or "").split(";")[0].strip() or None
                            size_from_resp = int(resp.headers.get("content-length") or 0) or None
                            
                            # Resetar arquivo e continuar download com o novo response
                            # O loop de leitura abaixo vai ler do novo 'resp'
                            # Precisamos reiniciar o arquivo para escrita (truncate)
                            # ATENÇÃO: O código original está dentro de um 'with open', então precisamos ter cuidado.
                            # Na verdade, como estamos DENTRO do 'with open', não podemos simplesmente trocar o 'resp' e continuar o loop externo facilmente
                            # sem reestruturar.
                            # Melhor abordagem: Retornar recursivamente chamando do_download com a NOVA URL se detectado.
                            # Mas do_download usa a URL original do escopo externo via closure.
                            
                            # Alternativa simples e segura:
                            # 1. Fechar este arquivo (já vamos sair do with open via raise se falhar)
                            # 2. Levantar uma exceção especial ou retornar um valor que indique "tentar nova URL"
                            # mas estamos dentro de uma função aninhada complexa.
                            
                            # Vamos fazer o download completo DO CONFIRM LINK aqui mesmo e substituir o arquivo.
                            # Isso evita reestruturar todo o loop de chunks.
                            
                            current_out_path.unlink() # Remove o HTML parcial/invalido
                            
                            # Download do arquivo real
                            with current_out_path.open("wb") as f_real:
                                for chunk in resp.iter_content(chunk_size=chunk_size):
                                    if download_timed_out.is_set():
                                        raise requests.exceptions.Timeout(f"Timeout após {timeout_seconds * 2}s durante download de stream (confirmação)")
                                    if chunk:
                                        f_real.write(chunk)
                                        # (Atualizar stats de progresso seria bom, mas opcional aqui para simplificar)
                            
                            # Se chegou aqui, sucesso no download do arquivo real
                            log.info("Download via link de confirmação concluído com sucesso.")
                            
                            # Atualizar variáveis para o return final
                            # O loop externo vai terminar (estamos dentro do 'with' que escrevia o HTML), mas já sobrescrevemos o arquivo.
                            # Precisamos garantir que o loop externo pare ou que a gente retorne aqui.
                            return current_out_path, content_type_from_resp, size_from_resp or size_from_resp # size pode ser None
                            
                    except Exception as e:
                        log.error("Falha ao processar link de confirmação: %s", e)
                        # Fallback para o erro original
                    
                    # Se não conseguiu recuperar via confirmação, falha como antes
                    log.warning("Arquivo baixado é HTML (página de confirmação do Drive) e não foi possível confirmar. Removendo.")
                    if current_out_path.exists():
                        try:
                            current_out_path.unlink()
                        except OSError:
                            pass 
                    
                    raise IOError("Drive retornou página HTML de confirmação em vez do arquivo real. "
                                "O arquivo pode requerer autenticação ou confirmação manual.")
            
            # Validate file integrity
            if validate_integrity:
                # Check file exists and has content
                if not current_out_path.exists():
                    raise IOError(f"Arquivo não foi criado: {current_out_path}")
                
                actual_size = current_out_path.stat().st_size
                if actual_size == 0:
                    raise IOError(f"Arquivo está vazio (0 bytes): {current_out_path}")
                
                # Verify size matches expected (with 5% tolerance for compression)
                if size_from_resp and actual_size > 0:
                    size_diff_pct = abs(actual_size - size_from_resp) / size_from_resp * 100
                    if size_diff_pct > 5.0:  # More than 5% difference
                        log.warning("Tamanho do arquivo difere do esperado: esperado=%d, atual=%d (%.1f%%)",
                                   size_from_resp, actual_size, size_diff_pct)
                
                # Validate content-type if available
                if content_type_from_resp:
                    if mtype == "image":
                        expected_types = ["image/", "application/octet-stream"]
                        if not any(content_type_from_resp.startswith(et) for et in expected_types):
                            log.warning("Content-Type inesperado para imagem: %s (esperado: image/*)",
                                       content_type_from_resp)
                    elif mtype == "video":
                        expected_types = ["video/", "application/octet-stream", "application/x-mpegURL"]
                        if not any(content_type_from_resp.startswith(et) for et in expected_types):
                            log.warning("Content-Type inesperado para vídeo: %s (esperado: video/* ou application/octet-stream)",
                                       content_type_from_resp)
            
            return current_out_path, content_type_from_resp, size_from_resp or bytes_downloaded
        finally:
            # Sempre cancelar o timer, mesmo em caso de erro
            timeout_timer.cancel()

    try:
        # Não tentar novamente em erros 403 (são permanentes)
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"E","location":"media_downloader.py:352","message":"Iniciando retry do download","data":{"url":url[:100],"media_index":media_index,"retries":retries},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        downloaded_path, downloaded_content_type, downloaded_size = retry(
            do_download,
            retries=retries,
            backoff_seconds=backoff_seconds,
            retry_on=(
                requests.exceptions.Timeout,
                requests.exceptions.ConnectionError,
                requests.exceptions.SSLError,
                requests.exceptions.ChunkedEncodingError,
            ),
        )
        if downloaded_path is not None:
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"E","location":"media_downloader.py:364","message":"Download sucesso","data":{"url":url[:100],"media_index":media_index,"file_name":downloaded_path.name},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            _update_media_metadata(m, downloaded_path, downloaded_content_type, downloaded_size)
            if media_index is not None and total_media is not None:
                log.info("✓ Mídia %d/%d baixada com sucesso: %s (%.2f MB)", 
                        media_index + 1, total_media, downloaded_path.name,
                        (downloaded_size or 0) / (1024 * 1024) if downloaded_size else 0)
            else:
                log.info("✓ Mídia baixada com sucesso: %s", downloaded_path.name)
        else:
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"E","location":"media_downloader.py:375","message":"Download retornou None","data":{"url":url[:100],"media_index":media_index},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            m["downloaded"] = False
            m["download_error"] = "Download retornou None"
            if media_index is not None and total_media is not None:
                log.warning("✗ Mídia %d/%d falhou: Download retornou None", media_index + 1, total_media)
    except requests.exceptions.HTTPError as http_err:
        # Tratar 403 especificamente (não é um erro crítico, apenas não podemos baixar)
        status_code = http_err.response.status_code if http_err.response else None
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A" if status_code == 403 else "B","location":"media_downloader.py:378","message":"HTTPError capturado","data":{"url":url[:100],"media_index":media_index,"status_code":status_code,"error":str(http_err)[:200]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        if http_err.response is not None and http_err.response.status_code == 403:
            if media_index is not None and total_media is not None:
                log.warning("✗ Mídia %d/%d bloqueada (403): %s", media_index + 1, total_media, url[:80])
            else:
                log.warning("Acesso negado (403) para %s (%s): %s", url, mtype, http_err)
            m["downloaded"] = False
            m["download_reason"] = "forbidden_403"
            m["download_error"] = f"403 Forbidden - acesso negado pelo servidor: {http_err}"
        else:
            if media_index is not None and total_media is not None:
                log.error("✗ Mídia %d/%d erro HTTP: %s - %s", media_index + 1, total_media, url[:80], http_err)
            else:
                log.warning("HTTP error ao baixar %s (%s): %s", url, mtype, http_err)
            m["downloaded"] = False
            m["download_error"] = str(http_err)
    except requests.exceptions.Timeout as timeout_err:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"C","location":"media_downloader.py:395","message":"Timeout capturado","data":{"url":url[:100],"media_index":media_index,"error":str(timeout_err)[:200]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        if media_index is not None and total_media is not None:
            log.error("✗ Mídia %d/%d timeout: %s - %s", media_index + 1, total_media, url[:80], timeout_err)
        else:
            log.warning("Timeout ao baixar %s (%s): %s", url, mtype, timeout_err)
        m["downloaded"] = False
        m["download_error"] = f"Timeout: {timeout_err}"
    except requests.exceptions.SSLError as ssl_err:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"D","location":"media_downloader.py:402","message":"SSLError capturado","data":{"url":url[:100],"media_index":media_index,"error":str(ssl_err)[:200]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        if media_index is not None and total_media is not None:
            log.error("✗ Mídia %d/%d erro SSL: %s - %s", media_index + 1, total_media, url[:80], ssl_err)
        else:
            log.warning("Erro SSL ao baixar %s (%s): %s", url, mtype, ssl_err)
        m["downloaded"] = False
        m["download_error"] = f"SSL Error: {ssl_err}"
    except requests.exceptions.RequestException as req_err:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"B","location":"media_downloader.py:409","message":"RequestException capturado","data":{"url":url[:100],"media_index":media_index,"error":str(req_err)[:200],"error_type":type(req_err).__name__},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        if media_index is not None and total_media is not None:
            log.error("✗ Mídia %d/%d erro de requisição: %s - %s", media_index + 1, total_media, url[:80], req_err)
        else:
            log.warning("Erro de requisição ao baixar %s (%s): %s", url, mtype, req_err)
        m["downloaded"] = False
        m["download_error"] = str(req_err)
    except Exception as exc:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"E","location":"media_downloader.py:416","message":"Exception inesperada capturada","data":{"url":url[:100],"media_index":media_index,"error":str(exc)[:200],"error_type":type(exc).__name__},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        if media_index is not None and total_media is not None:
            log.error("✗ Mídia %d/%d erro inesperado: %s - %s", media_index + 1, total_media, url[:80], exc, exc_info=True)
        else:
            log.warning("Erro inesperado ao baixar %s (%s): %s", url, mtype, exc, exc_info=True)
        m["downloaded"] = False
        m["download_error"] = str(exc)
    finally:
        session.close()
    
    return m


def download_media_for_page(
    page: dict[str, Any],
    *,
    images_dir: Path,
    documents_dir: Path,
    videos_dir: Path | None = None,
    user_agent: str,
    timeout_seconds: int,
    retries: int,
    backoff_seconds: float,
    can_fetch: Callable[[str], bool] | None = None,
    max_workers: int = 8,
    max_media_per_page: int | None = None,
    remove_size_params: bool = True,
    delay_seconds: float = 0.1,
    validate_integrity: bool = True,
    cookies: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """
    Mutates and returns page dict with `media[].local_path` if downloaded.
    Downloads are parallelized using ThreadPoolExecutor.
    
    Args:
        page: Page dictionary with media list
        images_dir: Directory for images
        documents_dir: Directory for documents
        videos_dir: Directory for videos (optional)
        user_agent: User agent string
        timeout_seconds: Request timeout
        retries: Number of retry attempts
        backoff_seconds: Base backoff time for retries
        can_fetch: Optional robots.txt checker
        max_workers: Maximum parallel workers
        max_media_per_page: Maximum media items per page
        remove_size_params: If True, remove Google image size parameters
        delay_seconds: Delay between requests (with jitter)
        validate_integrity: If True, validate file integrity after download
        cookies: Optional list of cookies from Selenium (helps with Google Sites authentication)
    """
    media = page.get("media") or []
    if not media:
        page["media"] = media
        return page
    
    page_title = page.get("title") or page.get("url") or "unknown"
    page_slug = slugify(page_title)
    
    # Check if cookies are available
    page_cookies = page.get("cookies") or cookies
    if page_cookies:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"media_downloader.py:540","message":"Cookies disponíveis na página","data":{"page_title":page_title[:50],"cookie_count":len(page_cookies),"has_cookies_param":bool(cookies)},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        log.debug("Cookies disponíveis para página '%s': %d cookies", page_title, len(page_cookies))
    else:
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"media_downloader.py:545","message":"Nenhum cookie disponível","data":{"page_title":page_title[:50],"has_cookies_in_page":bool(page.get("cookies")),"has_cookies_param":bool(cookies)},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        log.debug("Nenhum cookie disponível para página '%s'", page_title)
    
    log.info("Processando mídias para página: %s", page_title)

    # Filtrar mídias válidas para download
    valid_media = []
    skipped_count = 0
    for m in media:
        mtype = (m.get("type") or "unknown").lower()
        url = normalize_url(m.get("url") or "")
        if not is_http_url(url):
            skipped_count += 1
            continue
        if mtype not in {"image", "document", "video"}:
            skipped_count += 1
            continue
        if mtype == "video" and videos_dir is None:
            log.debug("Vídeo ignorado (videos_dir não fornecido): %s", url)
            skipped_count += 1
            continue
        if can_fetch is not None and not can_fetch(url):
            m["downloaded"] = False
            m["download_reason"] = "blocked_by_robots"
            skipped_count += 1
            continue
        valid_media.append(m)
    
    # Aplicar limite de mídias por página se configurado
    if max_media_per_page and len(valid_media) > max_media_per_page:
        log.warning("Limitando %d mídias para %d por página (configuração DOWNLOAD_MAX_MEDIA_PER_PAGE)", 
                   len(valid_media), max_media_per_page)
        valid_media = valid_media[:max_media_per_page]
    
    # Se não há mídias válidas, retornar
    if not valid_media:
        log.info("Nenhuma mídia válida para download (puladas: %d)", skipped_count)
        page["media"] = media
        return page
    
    total_valid = len(valid_media)
    log.info("Iniciando download de %d mídia(s) (puladas: %d)", total_valid, skipped_count)
    if remove_size_params:
        log.debug("Normalização de URLs do Google ativada (removendo parâmetros de tamanho)")
    if delay_seconds > 0:
        log.debug("Rate limiting ativado (delay: %.2fs com jitter)", delay_seconds)
    if validate_integrity:
        log.debug("Validação de integridade ativada")
    
    # Estatísticas de progresso e performance
    stats = {"success": 0, "failed": 0, "skipped": 0}
    download_times: list[float] = []  # Track download times for metrics
    start_time = time.time()
    
    # Paralelizar downloads usando ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(
                _download_single_media,
                m,
                page_slug=page_slug,
                images_dir=images_dir,
                documents_dir=documents_dir,
                videos_dir=videos_dir,
                user_agent=user_agent,
                timeout_seconds=timeout_seconds,
                retries=retries,
                backoff_seconds=backoff_seconds,
                can_fetch=can_fetch,
                media_index=idx,
                total_media=total_valid,
                remove_size_params=remove_size_params,
                delay_seconds=delay_seconds,
                validate_integrity=validate_integrity,
                cookies=page_cookies,
            ): (idx, m)
            for idx, m in enumerate(valid_media)
        }
        
        # Aguardar conclusão de todos os downloads
        completed = 0
        for future in as_completed(futures):
            completed += 1
            idx, original_m = futures[future]
            item_start_time = time.time()
            try:
                updated_m = future.result()
                item_duration = time.time() - item_start_time
                download_times.append(item_duration)
                
                # Atualizar o item original na lista media
                for i, m in enumerate(media):
                    if m is original_m:
                        media[i] = updated_m
                        break
                
                # Atualizar estatísticas
                if updated_m.get("downloaded"):
                    stats["success"] += 1
                elif updated_m.get("local_path"):
                    stats["skipped"] += 1
                else:
                    stats["failed"] += 1
                
                # Log progresso a cada 25% ou no final
                if completed % max(1, total_valid // 4) == 0 or completed == total_valid:
                    elapsed = time.time() - start_time
                    avg_time = sum(download_times) / len(download_times) if download_times else 0
                    success_rate = (stats["success"] / completed * 100) if completed > 0 else 0
                    log.info("Progresso: %d/%d concluídos (%d sucessos, %d falhas, %d pulados) | "
                            "Taxa de sucesso: %.1f%% | Tempo médio: %.2fs | Tempo total: %.1fs",
                            completed, total_valid, stats["success"], stats["failed"], stats["skipped"],
                            success_rate, avg_time, elapsed)
            except Exception as exc:
                stats["failed"] += 1
                log.error("Erro inesperado ao baixar mídia %d/%d (%s): %s", 
                         idx + 1, total_valid, original_m.get("url", "unknown"), exc, exc_info=True)
                original_m["downloaded"] = False
                original_m["download_error"] = str(exc)
                # Atualizar na lista original também
                for i, m in enumerate(media):
                    if m is original_m:
                        media[i] = original_m
                        break

    # Log resumo final com métricas de performance
    total_duration = time.time() - start_time
    avg_download_time = sum(download_times) / len(download_times) if download_times else 0
    min_download_time = min(download_times) if download_times else 0
    max_download_time = max(download_times) if download_times else 0
    success_rate = (stats["success"] / total_valid * 100) if total_valid > 0 else 0
    
    log.info("Download concluído para página '%s': %d sucessos, %d falhas, %d pulados (total: %d)", 
            page_title, stats["success"], stats["failed"], stats["skipped"] + skipped_count, total_valid)
    log.info("Métricas de performance: taxa de sucesso=%.1f%%, tempo médio=%.2fs, "
            "tempo min=%.2fs, tempo max=%.2fs, tempo total=%.1fs",
            success_rate, avg_download_time, min_download_time, max_download_time, total_duration)

    page["media"] = media
    return page


def _guess_ext(url: str, content_type: str | None) -> str:
    path = urlparse(url).path
    ext = Path(path).suffix
    if ext and len(ext) <= 8:
        return ext
    if content_type:
        guessed = mimetypes.guess_extension(content_type)
        if guessed:
            return guessed
    return ""


def _guess_mime_from_ext(ext: str) -> str | None:
    """Tenta adivinhar o MIME type a partir da extensão do arquivo."""
    if not ext:
        return None
    # Remover o ponto se presente
    ext_clean = ext.lstrip(".")
    guessed = mimetypes.guess_type(f"file.{ext_clean}")[0]
    return guessed


def _check_existing_file(
    m: dict[str, Any],
    url: str,
    url_id_str: str,
    target_dir: Path,
    *,
    remove_size_params: bool = True,
) -> tuple[Path | None, str | None]:
    """
    Verifica se o arquivo já existe no disco.
    
    Primeiro verifica se m.get("local_path") existe e o arquivo está no disco com downloaded=True.
    Se não encontrar, verifica no disco usando url_id e extensões possíveis.
    Considera tanto a URL original quanto a URL normalizada (sem parâmetros de tamanho).
    
    Args:
        m: Media dictionary
        url: URL to check (may be normalized)
        url_id_str: Hash ID for the URL
        target_dir: Target directory to check
        remove_size_params: Whether to also check normalized URL
    
    Returns:
        tuple[Path | None, str | None]: (caminho do arquivo encontrado, extensão) ou (None, None) se não encontrado
    """
    # Primeiro, verificar se já tem informações salvas e o arquivo existe
    existing_path = m.get("local_path")
    if existing_path:
        out_path = Path(existing_path)
        if out_path.exists() and m.get("downloaded") is True:
            log.debug("Arquivo já baixado (local_path), pulando: %s", out_path)
            return out_path, out_path.suffix
    
    # Tentar descobrir extensão do URL sem fazer requisição HTTP
    url_ext = Path(urlparse(url).path).suffix
    # Tentar extensões comuns se não tiver extensão no URL
    common_extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf", ".doc", ".docx"]
    
    # Verificar se arquivo já existe com diferentes extensões possíveis
    # Check both original URL ID and normalized URL ID if applicable
    checked_paths = []
    url_ids_to_check = [url_id_str]
    
    # If this is a Google URL and we're removing size params, also check normalized URL
    if remove_size_params and "googleusercontent.com" in url.lower():
        original_url = m.get("original_url") or m.get("url") or url
        if original_url != url:
            # The current url_id_str is based on original_url, so we need to check normalized version
            normalized_url = normalize_googleusercontent_url(original_url, True)
            normalized_url_id = url_id(normalized_url)
            if normalized_url_id != url_id_str:
                url_ids_to_check.append(normalized_url_id)
                log.debug("Verificando também URL normalizada: %s", normalized_url_id)
    
    for check_id in url_ids_to_check:
        if url_ext and len(url_ext) <= 8:
            checked_paths.append((target_dir / f"{check_id}{url_ext}", url_ext))
        
        # Verificar extensões comuns se não tiver extensão no URL
        if not url_ext or len(url_ext) > 8:
            for ext in common_extensions:
                checked_paths.append((target_dir / f"{check_id}{ext}", ext))
    
    # Verificar se algum dos caminhos possíveis já existe
    for possible_path, ext in checked_paths:
        if possible_path.exists():
            log.debug("Arquivo já existe no disco, pulando download: %s", possible_path)
            return possible_path, ext
    
    return None, None


def _update_media_metadata(
    m: dict[str, Any],
    file_path: Path,
    content_type: str | None = None,
    file_size: int | None = None,
) -> None:
    """
    Atualiza todos os metadados do arquivo de uma vez.
    Gera URL pública (/uploads/...) se o arquivo estiver em backend/uploads.
    
    Args:
        m: Objeto de mídia a ser atualizado
        file_path: Caminho do arquivo
        content_type: Tipo MIME (opcional, será adivinhado da extensão se não fornecido)
        file_size: Tamanho do arquivo (opcional, será obtido do arquivo se não fornecido)
    """
    if file_size is None:
        try:
            file_size = file_path.stat().st_size
        except OSError:
            file_size = None
    
    if content_type is None:
        content_type = _guess_mime_from_ext(file_path.suffix)
    
    m["local_path"] = str(file_path.as_posix())
    m["mime_type"] = m.get("mime_type") or content_type
    m["file_name"] = m.get("file_name") or file_path.name
    m["file_size"] = m.get("file_size") or file_size
    m["downloaded"] = True
    
    # Generate public URL if saving to backend/uploads
    file_path_str = str(file_path)
    if "uploads" in file_path_str:
        # Extract subdirectory (images or videos) and filename
        parts = file_path.parts
        try:
            uploads_idx = next(i for i, part in enumerate(parts) if part == "uploads")
            if uploads_idx + 1 < len(parts):
                subdir = parts[uploads_idx + 1]  # "images" or "videos"
                filename = parts[-1]  # filename
                public_url = f"/uploads/{subdir}/{filename}"
                m["public_url"] = public_url
                log.debug("URL pública gerada: %s", public_url)
        except (StopIteration, IndexError):
            pass


