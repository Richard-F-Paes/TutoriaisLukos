from __future__ import annotations

import logging
import mimetypes
from pathlib import Path
from typing import Any
from typing import Callable
from urllib.parse import urlparse

import requests

from src.utils.retry import retry
from src.utils.urls import is_http_url, normalize_url, slugify, url_id


log = logging.getLogger(__name__)


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
) -> dict[str, Any]:
    """
    Mutates and returns page dict with `media[].local_path` if downloaded.
    """
    media = page.get("media") or []
    page_slug = slugify(page.get("title") or url_id(page.get("url", "")))

    session = requests.Session()
    session.headers.update({"User-Agent": user_agent})

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

        target_base = images_dir if mtype == "image" else documents_dir
        target_dir = target_base / page_slug
        target_dir.mkdir(parents=True, exist_ok=True)

        def do_download() -> tuple[Path, str | None, int | None]:
            resp = session.get(url, stream=True, timeout=timeout_seconds)
            resp.raise_for_status()
            content_type = (resp.headers.get("content-type") or "").split(";")[0].strip() or None
            size = int(resp.headers.get("content-length") or 0) or None

            ext = _guess_ext(url, content_type)
            file_name = f"{url_id(url)}{ext}"
            out_path = target_dir / file_name

            with out_path.open("wb") as f:
                for chunk in resp.iter_content(chunk_size=1024 * 64):
                    if chunk:
                        f.write(chunk)
            return out_path, content_type, size

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


