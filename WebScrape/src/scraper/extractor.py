from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

from src.utils.urls import google_sites_path_segments, is_http_url, join_url, normalize_url, same_site, url_id


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class ExtractedMedia:
    type: str  # image | video | document | unknown
    url: str
    mime_type: str | None = None
    alt: str | None = None
    local_path: str | None = None
    file_name: str | None = None
    file_size: int | None = None
    thumbnail_url: str | None = None


def extract_page(driver: Any, *, url: str, base_url: str, wait_timeout_seconds: int) -> dict[str, Any]:
    driver.get(url)
    wait = WebDriverWait(driver, wait_timeout_seconds)
    wait.until(lambda d: d.execute_script("return document.readyState") in ("interactive", "complete"))

    title = (driver.title or "").strip() or None

    main_html, main_selector = _get_main_html(driver)
    soup = BeautifulSoup(main_html or "", "lxml")

    # Attempt a better title from h1 inside main
    h1 = soup.find(["h1", "h2"])
    if h1:
        t = h1.get_text(" ", strip=True)
        if t:
            title = t

    media = _extract_media(soup, base_url=base_url, page_url=url)
    links_internal = _extract_internal_links(soup, base_url=base_url, page_url=url)

    segs = google_sites_path_segments(url, base_url)
    category_path = segs[:-1] if len(segs) >= 2 else segs[:-1]

    text = soup.get_text("\n", strip=True)
    description = None
    if text:
        description = text[:280]

    return {
        "id": url_id(url),
        "url": normalize_url(url),
        "title": title,
        "description": description,
        "category_path": category_path,
        "main_selector": main_selector,
        "content_html": main_html,
        "content_text": text,
        "media": [m.__dict__ for m in media],
        "links_internal": links_internal,
        "extracted_at": datetime.now(timezone.utc).isoformat(),
    }


def _get_main_html(driver: Any) -> tuple[str, str]:
    """
    Google Sites varies; we try several candidates.
    """
    selectors = [
        "div[role='main']",
        "main",
        "article",
        "#sites-canvas-main-content",  # classic-ish fallback
        "body",
    ]
    for sel in selectors:
        try:
            el = driver.find_element(By.CSS_SELECTOR, sel)
            html = el.get_attribute("outerHTML") or ""
            if html.strip():
                return html, sel
        except Exception:
            continue
    return driver.page_source or "", "page_source"


def _extract_media(soup: BeautifulSoup, *, base_url: str, page_url: str) -> list[ExtractedMedia]:
    out: list[ExtractedMedia] = []

    # Images
    for img in soup.find_all("img", src=True):
        src = img.get("src")
        if not src:
            continue
        full = join_url(page_url, src)
        if not is_http_url(full):
            continue
        out.append(
            ExtractedMedia(
                type="image",
                url=normalize_url(full),
                alt=(img.get("alt") or None),
            )
        )

    # Iframes (YouTube etc.)
    for iframe in soup.find_all("iframe", src=True):
        src = iframe.get("src")
        if not src:
            continue
        full = join_url(page_url, src)
        if not is_http_url(full):
            continue
        out.append(ExtractedMedia(type="video", url=normalize_url(full)))

    # Document links (best-effort: pdf, doc, etc.)
    for a in soup.find_all("a", href=True):
        href = a.get("href")
        if not href:
            continue
        full = join_url(page_url, href)
        if not is_http_url(full):
            continue
        lower = full.lower()
        if any(lower.endswith(ext) for ext in [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"]):
            out.append(ExtractedMedia(type="document", url=normalize_url(full)))

    # Dedup by url+type
    dedup: dict[tuple[str, str], ExtractedMedia] = {}
    for m in out:
        dedup[(m.type, m.url)] = m
    return list(dedup.values())


def _extract_internal_links(soup: BeautifulSoup, *, base_url: str, page_url: str) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for a in soup.find_all("a", href=True):
        href = a.get("href")
        if not href:
            continue
        full = join_url(page_url, href)
        full = normalize_url(full)
        if full in seen:
            continue
        if not same_site(full, base_url):
            continue
        if "/view/" not in full:
            continue
        out.append(full)
        seen.add(full)
    return out


