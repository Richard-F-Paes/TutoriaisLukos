from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

from bs4 import BeautifulSoup, Tag

from src.utils.html_cleaner import clean_html
from src.utils.urls import slugify, url_id


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class Step:
    id: str
    tutorial_url: str
    step_number: int
    title: str | None
    content_html: str


def process_raw_page(page: dict[str, Any]) -> dict[str, Any]:
    html = page.get("content_html") or ""
    cleaned = clean_html(html)
    soup = BeautifulSoup(cleaned, "lxml")

    steps = _split_into_steps(soup)
    step_rows: list[dict[str, Any]] = []
    for i, st in enumerate(steps, start=1):
        step_rows.append(
            {
                "id": url_id(f"{page.get('url')}#step{i}"),
                "tutorial_url": page.get("url"),
                "step_number": i,
                "title": st.get("title"),
                "content_html": st.get("content_html"),
            }
        )

    tutorial = {
        "id": page.get("id") or url_id(page.get("url", "")),
        "url_original": page.get("url"),
        "title": page.get("title"),
        "description": page.get("description"),
        "category_path": page.get("category_path") or [],
        "content_html": cleaned,
    }

    media_rows: list[dict[str, Any]] = []
    for m in page.get("media") or []:
        media_rows.append(
            {
                "id": url_id(f"{page.get('url')}::media::{m.get('type')}::{m.get('url')}"),
                "tutorial_url": page.get("url"),
                "tutorial_step_number": None,
                "media_type": m.get("type"),
                "url": m.get("url"),
                "file_path": m.get("local_path"),
                "file_name": m.get("file_name"),
                "file_size": m.get("file_size"),
                "mime_type": m.get("mime_type"),
                "thumbnail_url": m.get("thumbnail_url"),
            }
        )

    return {
        "tutorial": tutorial,
        "steps": step_rows,
        "media": media_rows,
    }


def _split_into_steps(soup: BeautifulSoup) -> list[dict[str, Any]]:
    # 1) Prefer ordered list(s)
    ol = soup.find("ol")
    if ol:
        lis = [li for li in ol.find_all("li", recursive=False)]
        if len(lis) >= 2:
            out: list[dict[str, Any]] = []
            for idx, li in enumerate(lis, start=1):
                out.append({"title": f"Passo {idx}", "content_html": str(li)})
            return out

    # 2) Split by headings (h2/h3)
    headings = soup.find_all(["h2", "h3"])
    if headings:
        out2: list[dict[str, Any]] = []
        for h in headings:
            title = h.get_text(" ", strip=True) or None
            chunk: list[str] = [str(h)]
            for sib in _iter_next_siblings_until_heading(h):
                chunk.append(str(sib))
            out2.append({"title": title, "content_html": "".join(chunk)})
        # If we got at least 2 chunks, treat as steps.
        if len(out2) >= 2:
            return out2

    # 3) Fallback: single-step with entire content
    return [{"title": None, "content_html": str(soup)}]


def _iter_next_siblings_until_heading(tag: Tag):
    sib = tag.next_sibling
    while sib is not None:
        if isinstance(sib, Tag) and sib.name in {"h2", "h3"}:
            return
        if isinstance(sib, Tag):
            yield sib
        sib = sib.next_sibling


