from __future__ import annotations

from bs4 import BeautifulSoup


def clean_html(html: str) -> str:
    """
    Remove scripts/styles and do light normalization.
    We intentionally keep markup (tables/lists) for fidelity.
    """
    soup = BeautifulSoup(html or "", "lxml")
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()
    return str(soup)


