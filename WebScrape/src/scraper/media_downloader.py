from __future__ import annotations

import logging
import mimetypes
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any
from typing import Callable
from urllib.parse import urlparse

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import urllib3

from src.utils.retry import retry
from src.utils.urls import is_http_url, normalize_url, slugify, url_id


log = logging.getLogger(__name__)

# Suprimir warnings do urllib3 sobre retries (já estamos tratando os erros)
# Reduzir verbosidade do urllib3 para não poluir os logs
urllib3_logger = logging.getLogger("urllib3.connectionpool")
urllib3_logger.setLevel(logging.ERROR)  # Apenas erros, não warnings de retry


def _download_single_media(
    m: dict[str, Any],
    *,
    page_slug: str,
    images_dir: Path,
    documents_dir: Path,
    user_agent: str,
    timeout_seconds: int,
    retries: int,
    backoff_seconds: float,
    can_fetch: Callable[[str], bool] | None = None,
) -> dict[str, Any]:
    """
    Download a single media item. Thread-safe function.
    Returns the updated media dict.
    """
    mtype = (m.get("type") or "unknown").lower()
    url = normalize_url(m.get("url") or "")
    if not is_http_url(url):
        return m
    if mtype not in {"image", "document"}:
        return m
    if can_fetch is not None and not can_fetch(url):
        m["downloaded"] = False
        m["download_reason"] = "blocked_by_robots"
        return m

    target_base = images_dir if mtype == "image" else documents_dir
    target_dir = target_base / page_slug
    target_dir.mkdir(parents=True, exist_ok=True)

    # Determinar nome do arquivo ANTES de fazer qualquer requisição HTTP
    url_id_str = url_id(url)
    
    # Verificar se arquivo já existe (verificação única e centralizada)
    existing_file_path, existing_ext = _check_existing_file(m, url, url_id_str, target_dir)
    if existing_file_path is not None:
        _update_media_metadata(m, existing_file_path)
        return m
    
    # Se chegou aqui, arquivo não existe - precisa baixar
    # Criar sessão HTTP própria para esta thread com configurações melhoradas
    session = requests.Session()
    
    # Configurar headers para parecer mais com um navegador real
    session.headers.update({
        "User-Agent": user_agent,
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
    })
    
    # Adicionar Referer para imagens do Google Sites (ajuda a evitar 403)
    if "googleusercontent.com" in url or "sites.google.com" in url:
        # Tentar extrair a URL base da página se disponível
        page_url = m.get("tutorial_url") or m.get("page_url")
        if page_url:
            session.headers["Referer"] = page_url
        else:
            session.headers["Referer"] = "https://sites.google.com/"
    
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
        head_resp = session.head(url, timeout=timeout_seconds, allow_redirects=True)
        if head_resp.status_code == 200:
            content_type = (head_resp.headers.get("content-type") or "").split(";")[0].strip() or None
            size = int(head_resp.headers.get("content-length") or 0) or None
        elif head_resp.status_code == 403:
            # 403 no HEAD geralmente significa que não podemos baixar
            log.debug("HEAD request retornou 403 para %s, pulando download", url)
            m["downloaded"] = False
            m["download_reason"] = "forbidden_403"
            m["download_error"] = "403 Forbidden - acesso negado pelo servidor"
            return m
    except requests.exceptions.SSLError as ssl_err:
        log.debug("Erro SSL no HEAD request para %s: %s", url, ssl_err)
        # Continuar e tentar GET mesmo assim
    except requests.exceptions.RequestException as req_err:
        log.debug("Erro no HEAD request para %s: %s", url, req_err)
        # Continuar e tentar GET mesmo assim
    except Exception:
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
    
    def do_download() -> tuple[Path, str | None, int | None]:
        # Pequeno delay para evitar rate limiting
        time.sleep(0.1)
        
        resp = session.get(url, stream=True, timeout=timeout_seconds, allow_redirects=True)
        
        # Tratar 403 especificamente (não tentar novamente)
        if resp.status_code == 403:
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

        with current_out_path.open("wb") as f:
            for chunk in resp.iter_content(chunk_size=1024 * 64):
                if chunk:
                    f.write(chunk)
        return current_out_path, content_type_from_resp, size_from_resp

    try:
        # Não tentar novamente em erros 403 (são permanentes)
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
            _update_media_metadata(m, downloaded_path, downloaded_content_type, downloaded_size)
        else:
            m["downloaded"] = False
            m["download_error"] = "Download retornou None"
    except requests.exceptions.HTTPError as http_err:
        # Tratar 403 especificamente (não é um erro crítico, apenas não podemos baixar)
        if http_err.response is not None and http_err.response.status_code == 403:
            log.debug("Acesso negado (403) para %s (%s): %s", url, mtype, http_err)
            m["downloaded"] = False
            m["download_reason"] = "forbidden_403"
            m["download_error"] = f"403 Forbidden - acesso negado pelo servidor: {http_err}"
        else:
            log.warning("HTTP error ao baixar %s (%s): %s", url, mtype, http_err)
            m["downloaded"] = False
            m["download_error"] = str(http_err)
    except requests.exceptions.SSLError as ssl_err:
        log.warning("Erro SSL ao baixar %s (%s): %s", url, mtype, ssl_err)
        m["downloaded"] = False
        m["download_error"] = f"SSL Error: {ssl_err}"
    except requests.exceptions.RequestException as req_err:
        log.warning("Erro de requisição ao baixar %s (%s): %s", url, mtype, req_err)
        m["downloaded"] = False
        m["download_error"] = str(req_err)
    except Exception as exc:
        log.warning("Erro inesperado ao baixar %s (%s): %s", url, mtype, exc)
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
    user_agent: str,
    timeout_seconds: int,
    retries: int,
    backoff_seconds: float,
    can_fetch: Callable[[str], bool] | None = None,
    max_workers: int = 8,
) -> dict[str, Any]:
    """
    Mutates and returns page dict with `media[].local_path` if downloaded.
    Downloads are parallelized using ThreadPoolExecutor.
    """
    media = page.get("media") or []
    if not media:
        page["media"] = media
        return page
    
    page_slug = slugify(page.get("title") or url_id(page.get("url", "")))

    # Filtrar mídias válidas para download
    valid_media = []
    for m in media:
        mtype = (m.get("type") or "unknown").lower()
        url = normalize_url(m.get("url") or "")
        if not is_http_url(url):
            continue
        if mtype not in {"image", "document"}:
            continue
        if can_fetch is not None and not can_fetch(url):
            m["downloaded"] = False
            m["download_reason"] = "blocked_by_robots"
            continue
        valid_media.append(m)
    
    # Se não há mídias válidas, retornar
    if not valid_media:
        page["media"] = media
        return page
    
    # Paralelizar downloads usando ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(
                _download_single_media,
                m,
                page_slug=page_slug,
                images_dir=images_dir,
                documents_dir=documents_dir,
                user_agent=user_agent,
                timeout_seconds=timeout_seconds,
                retries=retries,
                backoff_seconds=backoff_seconds,
                can_fetch=can_fetch,
            ): m
            for m in valid_media
        }
        
        # Aguardar conclusão de todos os downloads
        for future in as_completed(futures):
            try:
                updated_m = future.result()
                # Atualizar o item original na lista media
                for i, original_m in enumerate(media):
                    if original_m is futures[future]:
                        media[i] = updated_m
                        break
            except Exception as exc:
                m = futures[future]
                log.error("Erro inesperado ao baixar mídia %s: %s", m.get("url"), exc, exc_info=True)
                m["downloaded"] = False
                m["download_error"] = str(exc)

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
) -> tuple[Path | None, str | None]:
    """
    Verifica se o arquivo já existe no disco.
    
    Primeiro verifica se m.get("local_path") existe e o arquivo está no disco com downloaded=True.
    Se não encontrar, verifica no disco usando url_id e extensões possíveis.
    
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
    checked_paths = []
    if url_ext and len(url_ext) <= 8:
        checked_paths.append((target_dir / f"{url_id_str}{url_ext}", url_ext))
    
    # Verificar extensões comuns se não tiver extensão no URL
    if not url_ext or len(url_ext) > 8:
        for ext in common_extensions:
            checked_paths.append((target_dir / f"{url_id_str}{ext}", ext))
    
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


