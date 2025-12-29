from __future__ import annotations

import logging
import mimetypes
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any
from typing import Callable
from urllib.parse import urlparse

import requests

from src.utils.retry import retry
from src.utils.urls import is_http_url, normalize_url, slugify, url_id


log = logging.getLogger(__name__)


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

    # Verificar se já tem informações salvas e o arquivo existe
    existing_path = m.get("local_path")
    if existing_path:
        out_path = Path(existing_path)
        if out_path.exists() and m.get("downloaded") is True:
            log.debug("Arquivo já baixado, pulando: %s", out_path)
            return m
    
    # Criar sessão HTTP própria para esta thread
    session = requests.Session()
    session.headers.update({"User-Agent": user_agent})
    
    # Tentar descobrir o nome do arquivo antes de baixar
    # Primeiro tenta usar extensão do URL, depois faz HEAD para descobrir content-type
    url_ext = Path(urlparse(url).path).suffix
    url_id_str = url_id(url)
    
    # Tentar descobrir content-type com HEAD request (mais eficiente)
    content_type = None
    size = None
    try:
        head_resp = session.head(url, timeout=timeout_seconds, allow_redirects=True)
        if head_resp.status_code == 200:
            content_type = (head_resp.headers.get("content-type") or "").split(";")[0].strip() or None
            size = int(head_resp.headers.get("content-length") or 0) or None
    except Exception:
        # Se HEAD falhar, vamos descobrir durante o GET
        pass
    
    # Determinar extensão e nome do arquivo
    ext = _guess_ext(url, content_type)
    file_name = f"{url_id_str}{ext}"
    out_path = target_dir / file_name
    
    # Verificar se o arquivo já existe antes de baixar (com lock implícito via existência)
    if out_path.exists():
        log.debug("Arquivo já existe, pulando download: %s", out_path)
        actual_size = out_path.stat().st_size
        m["local_path"] = str(out_path.as_posix())
        m["mime_type"] = m.get("mime_type") or content_type
        m["file_name"] = m.get("file_name") or out_path.name
        m["file_size"] = m.get("file_size") or size or actual_size
        m["downloaded"] = True
        return m
    
    def do_download() -> tuple[Path, str | None, int | None]:
        resp = session.get(url, stream=True, timeout=timeout_seconds)
        resp.raise_for_status()
        # Se não descobrimos antes, pega agora
        if content_type is None:
            content_type_from_resp = (resp.headers.get("content-type") or "").split(";")[0].strip() or None
        else:
            content_type_from_resp = content_type
        size_from_resp = int(resp.headers.get("content-length") or 0) or None

        # Re-verificar extensão caso o content-type tenha mudado
        ext_final = _guess_ext(url, content_type_from_resp)
        if ext_final != ext:
            file_name_final = f"{url_id_str}{ext_final}"
            out_path_final = target_dir / file_name_final
            if out_path_final.exists():
                log.debug("Arquivo já existe (com extensão diferente), pulando: %s", out_path_final)
                actual_size = out_path_final.stat().st_size
                return out_path_final, content_type_from_resp, size_from_resp or actual_size
            out_path = out_path_final

        with out_path.open("wb") as f:
            for chunk in resp.iter_content(chunk_size=1024 * 64):
                if chunk:
                    f.write(chunk)
        return out_path, content_type_from_resp, size_from_resp

    try:
        out_path, content_type, size = retry(
            do_download,
            retries=retries,
            backoff_seconds=backoff_seconds,
            retry_on=(requests.RequestException,),
        )
        m["local_path"] = str(out_path.as_posix())
        m["mime_type"] = m.get("mime_type") or content_type
        m["file_name"] = m.get("file_name") or out_path.name
        m["file_size"] = m.get("file_size") or size or out_path.stat().st_size
        m["downloaded"] = True
    except Exception as exc:
        log.warning("Failed downloading %s (%s): %s", url, mtype, exc)
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


