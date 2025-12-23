from __future__ import annotations

import logging
from dataclasses import asdict, dataclass
from typing import Any

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from src.utils.category_path import limit_category_depth
from src.utils.urls import join_url, normalize_url, same_site, url_id


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class DiscoveredPage:
    id: str
    url: str
    title: str | None
    order: int
    parent_id: str | None
    category_path: list[str]
    is_leaf: bool
    discovered_from_menu: bool


def discover_pages(
    driver: Any,
    *,
    base_url: str,
    wait_timeout_seconds: int,
    normalize_menu_labels: bool = True,
) -> tuple[list[DiscoveredPage], list[dict[str, Any]]]:
    """
    Returns:
      - pages: flattened list with parent references (best-effort)
      - categories: derived category nodes from menu label paths (best-effort)

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
        pages.extend(_parse_nav_hierarchy(nav, base_url=base_url, normalize_menu_labels=normalize_menu_labels))

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


def _normalize_label(text: str) -> str:
    # Avoid false mismatches caused by weird whitespace/encoding artifacts.
    return " ".join((text or "").strip().split())


def _parse_nav_hierarchy(nav: Any, *, base_url: str, normalize_menu_labels: bool) -> list[DiscoveredPage]:
    pages: list[DiscoveredPage] = []
    order = 0

    def walk_list(list_node: Any, *, path_labels: list[str], parent_id: str | None) -> None:
        nonlocal order

        for li in list_node.find_all("li", recursive=False):
            a = li.find("a", href=True)
            label = None
            if a:
                label = a.get_text(" ", strip=True) or None
            else:
                # Fallback: use visible text from li (best-effort)
                label = li.get_text(" ", strip=True) or None

            if label and normalize_menu_labels:
                label = _normalize_label(label)

            nested = li.find(["ul", "ol"])
            has_children = nested is not None

            # The current node label becomes a category level for its children.
            next_path = path_labels + ([label] if label else [])

            if a:
                href = join_url(base_url, a["href"])
                if same_site(href, base_url):
                    pages.append(
                        DiscoveredPage(
                            id=url_id(href),
                            url=normalize_url(href),
                            title=label,
                            order=order,
                            parent_id=parent_id,
                            category_path=path_labels,
                            is_leaf=not has_children,
                            discovered_from_menu=True,
                        )
                    )
                    order += 1

            if nested:
                walk_list(nested, path_labels=next_path, parent_id=(url_id(join_url(base_url, a["href"])) if a else parent_id))

    # Prefer the first list inside nav; fallback to nav itself if none found.
    root_list = nav.find(["ul", "ol"]) or nav
    walk_list(root_list, path_labels=[], parent_id=None)
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
        pages.append(
            DiscoveredPage(
                id=url_id(href),
                url=href,
                title=title,
                order=order,
                parent_id=None,
                category_path=[],
                is_leaf=True,
                discovered_from_menu=False,
            )
        )
        seen.add(href)
        order += 1
    return pages


def _derive_categories_from_pages(pages: list[DiscoveredPage], *, base_url: str) -> list[dict[str, Any]]:
    """
    Creates a simple category tree using category_path label segments. This is best-effort.
    """
    # key: (parent_key, name) -> node
    nodes: dict[tuple[str | None, str], dict[str, Any]] = {}

    def ensure(parent_key: str | None, name: str) -> str:
        key = (parent_key, name)
        if key in nodes:
            return nodes[key]["id"]
        cid = url_id(f"{parent_key or 'root'}::{name}")
        nodes[key] = {"id": cid, "name": name, "parent_id": parent_key, "source": "menu"}
        return cid

    for p in pages:
        parent: str | None = None
        # if category_path empty, keep it unassigned (root)
        for seg in limit_category_depth(p.category_path, max_depth=2):
            parent = ensure(parent, seg)

    # Return stable by insertion is not guaranteed; sort by name then parent
    out = list(nodes.values())
    out.sort(key=lambda n: (n["parent_id"] or "", n["name"]))
    return out


def serialize_pages(pages: list[DiscoveredPage]) -> list[dict[str, Any]]:
    return [asdict(p) for p in pages]


