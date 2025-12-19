from __future__ import annotations

import logging
from dataclasses import asdict, dataclass
from typing import Any

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from src.utils.urls import google_sites_path_segments, join_url, normalize_url, same_site, url_id


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class DiscoveredPage:
    id: str
    url: str
    title: str | None
    order: int
    parent_id: str | None
    category_path: list[str]


def discover_pages(driver: Any, *, base_url: str, wait_timeout_seconds: int) -> tuple[list[DiscoveredPage], list[dict[str, Any]]]:
    """
    Returns:
      - pages: flattened list with parent references (best-effort)
      - categories: derived category nodes from URL segments (best-effort)

    Note: Google Sites DOM is not stable. We combine:
      - nav/menu anchors (when present)
      - all internal anchors as fallback
    """
    driver.get(base_url)
    wait = WebDriverWait(driver, wait_timeout_seconds)
    wait.until(lambda d: d.execute_script("return document.readyState") in ("interactive", "complete"))

    # Try to stabilize: wait for at least some anchors.
    try:
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[href]")))
    except Exception:
        pass

    html = driver.page_source or ""
    soup = BeautifulSoup(html, "lxml")

    pages: list[DiscoveredPage] = []

    # 1) Best attempt: parse hierarchical <nav> list (if any)
    nav = soup.find("nav")
    if nav:
        pages.extend(_parse_nav_hierarchy(nav, base_url=base_url))

    # 2) Fallback: collect internal links anywhere
    if not pages:
        pages.extend(_collect_internal_links(soup, base_url=base_url))

    # Deduplicate and keep stable ordering
    dedup: dict[str, DiscoveredPage] = {}
    for p in pages:
        dedup[p.url] = p
    pages = list(dedup.values())
    pages.sort(key=lambda p: p.order)

    # Derive categories from URL segments
    categories = _derive_categories_from_pages(pages, base_url=base_url)

    return pages, categories


def _parse_nav_hierarchy(nav: Any, *, base_url: str) -> list[DiscoveredPage]:
    pages: list[DiscoveredPage] = []
    order = 0

    def walk(node: Any, parent: DiscoveredPage | None) -> None:
        nonlocal order

        # Prefer anchors directly under this node or within its li
        for a in node.find_all("a", href=True, recursive=False):
            href = join_url(base_url, a["href"])
            if not same_site(href, base_url):
                continue
            title = (a.get_text(" ", strip=True) or None)
            segs = google_sites_path_segments(href, base_url)
            category_path = segs[:-1] if len(segs) >= 2 else segs[:-1]
            page = DiscoveredPage(
                id=url_id(href),
                url=normalize_url(href),
                title=title,
                order=order,
                parent_id=parent.id if parent else None,
                category_path=category_path,
            )
            pages.append(page)
            order += 1

        # Recursively walk nested lists
        for child in node.find_all(["ul", "ol"], recursive=False):
            walk(child, parent)

        for li in node.find_all("li", recursive=False):
            # Some menus nest anchors inside li
            a = li.find("a", href=True)
            if a:
                href = join_url(base_url, a["href"])
                if same_site(href, base_url):
                    title = (a.get_text(" ", strip=True) or None)
                    segs = google_sites_path_segments(href, base_url)
                    category_path = segs[:-1] if len(segs) >= 2 else segs[:-1]
                    page = DiscoveredPage(
                        id=url_id(href),
                        url=normalize_url(href),
                        title=title,
                        order=order,
                        parent_id=parent.id if parent else None,
                        category_path=category_path,
                    )
                    pages.append(page)
                    order += 1
                    # A li may contain a nested list representing children
                    nested = li.find(["ul", "ol"])
                    if nested:
                        walk(nested, page)
            else:
                nested = li.find(["ul", "ol"])
                if nested:
                    walk(nested, parent)

    walk(nav, None)
    return pages


def _collect_internal_links(soup: BeautifulSoup, *, base_url: str) -> list[DiscoveredPage]:
    pages: list[DiscoveredPage] = []
    order = 0
    seen: set[str] = set()
    for a in soup.find_all("a", href=True):
        href_raw = a.get("href")
        if not href_raw:
            continue
        href = join_url(base_url, href_raw)
        href = normalize_url(href)
        if href in seen:
            continue
        if not same_site(href, base_url):
            continue
        if "/view/" not in href:
            # Avoid pulling generic sites.google.com links outside the site container.
            continue

        title = (a.get_text(" ", strip=True) or None)
        segs = google_sites_path_segments(href, base_url)
        category_path = segs[:-1] if len(segs) >= 2 else segs[:-1]
        pages.append(
            DiscoveredPage(
                id=url_id(href),
                url=href,
                title=title,
                order=order,
                parent_id=None,
                category_path=category_path,
            )
        )
        seen.add(href)
        order += 1
    return pages


def _derive_categories_from_pages(pages: list[DiscoveredPage], *, base_url: str) -> list[dict[str, Any]]:
    """
    Creates a simple category tree using URL segments. This is best-effort and
    designed to be overwritten/refined later if needed.
    """
    # key: (parent_key, name) -> node
    nodes: dict[tuple[str | None, str], dict[str, Any]] = {}

    def ensure(parent_key: str | None, name: str) -> str:
        key = (parent_key, name)
        if key in nodes:
            return nodes[key]["id"]
        cid = url_id(f"{parent_key or 'root'}::{name}")
        nodes[key] = {"id": cid, "name": name, "parent_id": parent_key, "source": "url_segments"}
        return cid

    for p in pages:
        parent: str | None = None
        # if category_path empty, keep it unassigned (root)
        for seg in p.category_path:
            parent = ensure(parent, seg)

    # Return stable by insertion is not guaranteed; sort by name then parent
    out = list(nodes.values())
    out.sort(key=lambda n: (n["parent_id"] or "", n["name"]))
    return out


def serialize_pages(pages: list[DiscoveredPage]) -> list[dict[str, Any]]:
    return [asdict(p) for p in pages]


