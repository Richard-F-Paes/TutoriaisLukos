from __future__ import annotations

import hashlib
import re
from urllib.parse import urljoin, urlparse, urlunparse, unquote


def normalize_url(url: str) -> str:
    """
    Normalize URLs for stable de-duplication:
    - strips fragments
    - strips trailing whitespace
    - keeps query (Google Sites may use it)
    """
    url = url.strip()
    parsed = urlparse(url)
    parsed = parsed._replace(fragment="")
    return urlunparse(parsed)


def is_http_url(url: str) -> bool:
    try:
        scheme = urlparse(url).scheme.lower()
        return scheme in {"http", "https"}
    except Exception:
        return False


def same_site(url: str, base_url: str) -> bool:
    try:
        return urlparse(url).netloc.lower() == urlparse(base_url).netloc.lower()
    except Exception:
        return False


def join_url(base: str, href: str) -> str:
    return normalize_url(urljoin(base, href))


def url_id(url: str) -> str:
    return hashlib.sha1(url.encode("utf-8")).hexdigest()[:16]


_slug_re = re.compile(r"[^a-z0-9]+")


def slugify(text: str, *, max_len: int = 80) -> str:
    s = unquote(text).strip().lower()
    s = _slug_re.sub("-", s)
    s = s.strip("-")
    if not s:
        s = "item"
    return s[:max_len]


def google_sites_path_segments(url: str, base_url: str) -> list[str]:
    """
    Best-effort extraction of path segments after `/view/<site-slug>/`.
    Example:
      https://sites.google.com/view/lukos-tutoriais/retaguarda/cadastros/x
      -> ["retaguarda","cadastros","x"]
    """
    u = urlparse(url)
    b = urlparse(base_url)
    if u.netloc.lower() != b.netloc.lower():
        return []
    path = unquote(u.path or "")
    parts = [p for p in path.split("/") if p]
    # Expect ["view", "<slug>", ...]
    if len(parts) >= 2 and parts[0].lower() == "view":
        return parts[2:]
    return parts


