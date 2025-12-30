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


# Regex patterns for Google image size parameters
# Matches patterns like =w1280, =s400, =h200, =w400-h300, etc.
_GOOGLE_SIZE_PARAM_PATTERN = re.compile(r"=[swh]\d+(-[swh]\d+)*")


def extract_google_image_params(url: str) -> dict[str, int | None]:
    """
    Extract Google image size parameters from URL.
    
    Parameters:
    - w: width in pixels
    - h: height in pixels  
    - s: size (max dimension)
    
    Example:
      https://lh3.googleusercontent.com/...=w1280
      -> {"w": 1280, "h": None, "s": None}
      
      https://lh3.googleusercontent.com/...=s400
      -> {"w": None, "h": None, "s": 400}
      
      https://lh3.googleusercontent.com/...=w400-h300
      -> {"w": 400, "h": 300, "s": None}
    
    Returns:
        dict with keys "w", "h", "s" (values are int or None)
    """
    params = {"w": None, "h": None, "s": None}
    
    # Find all size parameter patterns
    matches = _GOOGLE_SIZE_PARAM_PATTERN.findall(url)
    if not matches:
        return params
    
    # Process the last match (most specific)
    match_str = matches[-1] if matches else ""
    if not match_str:
        return params
    
    # Remove leading =
    param_str = match_str.lstrip("=")
    
    # Parse individual parameters (e.g., "w400-h300" or "s400")
    parts = param_str.split("-")
    for part in parts:
        if part.startswith("w") and len(part) > 1:
            try:
                params["w"] = int(part[1:])
            except ValueError:
                pass
        elif part.startswith("h") and len(part) > 1:
            try:
                params["h"] = int(part[1:])
            except ValueError:
                pass
        elif part.startswith("s") and len(part) > 1:
            try:
                params["s"] = int(part[1:])
            except ValueError:
                pass
    
    return params


def normalize_googleusercontent_url(url: str, remove_size_params: bool = True) -> str:
    """
    Normalize Googleusercontent.com image URLs by optionally removing size parameters.
    
    Google image URLs often contain size parameters like =w1280, =s400, =h200.
    Removing these parameters typically returns the original/full-size image.
    
    Args:
        url: The Googleusercontent URL to normalize
        remove_size_params: If True, remove size parameters to get original image.
                           If False, keep parameters as-is.
    
    Returns:
        Normalized URL with size parameters removed (if remove_size_params=True)
        or original URL (if remove_size_params=False)
    
    Example:
        normalize_googleusercontent_url("https://lh3.googleusercontent.com/...=w1280", True)
        -> "https://lh3.googleusercontent.com/..."
        
        normalize_googleusercontent_url("https://lh3.googleusercontent.com/...=w1280", False)
        -> "https://lh3.googleusercontent.com/...=w1280"
    """
    if not url or "googleusercontent.com" not in url.lower():
        return url
    
    if not remove_size_params:
        return url
    
    # Remove size parameters using regex
    normalized = _GOOGLE_SIZE_PARAM_PATTERN.sub("", url)
    
    # Clean up any trailing = or & characters
    normalized = normalized.rstrip("=&")
    
    return normalized


