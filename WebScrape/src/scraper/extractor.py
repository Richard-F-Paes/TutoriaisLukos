from __future__ import annotations

import logging
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from src.utils.urls import (
    google_sites_path_segments,
    is_http_url,
    join_url,
    normalize_url,
    normalize_googleusercontent_url,
    same_site,
    url_id,
)


log = logging.getLogger(__name__)

# Constants for content checking and waiting
DEFAULT_CONTENT_CHECK_MIN_WORDS = 10
DEFAULT_WAIT_DELAY_SECONDS = 0.3
DEFAULT_MAX_WAIT_ATTEMPTS = 2
DEFAULT_DELAY_BETWEEN_PAGES = 0.5
DEFAULT_DESCRIPTION_MAX_LENGTH = 280
DEFAULT_SHORT_WAIT_TIMEOUT = 1
DEFAULT_DESCRIPTION_MIN_LENGTH = 50


def generate_smart_description(soup: BeautifulSoup, max_length: int = DEFAULT_DESCRIPTION_MAX_LENGTH, min_length: int = DEFAULT_DESCRIPTION_MIN_LENGTH) -> str | None:
    """
    Generate a smart description from page content.
    
    Strategy:
    1. Try to find the first meaningful paragraph (at least min_length chars)
    2. If no paragraph found, use first text block after title
    3. Remove HTML tags and clean whitespace
    4. Truncate to max_length at word boundary
    
    Args:
        soup: BeautifulSoup object with page content
        max_length: Maximum length for description (default 280)
        min_length: Minimum length for a meaningful paragraph (default 50)
    
    Returns:
        Clean plain text description or None if no valid description found
    """
    if not soup:
        return None
    
    # Strategy 1: Find first meaningful paragraph
    paragraphs = soup.find_all("p")
    for p in paragraphs:
        p_text = p.get_text(" ", strip=True)
        # Remove extra whitespace
        p_text = " ".join(p_text.split())
        if len(p_text) >= min_length:
            # Found a meaningful paragraph
            if len(p_text) <= max_length:
                return p_text
            # Truncate at word boundary
            truncated = p_text[:max_length].rsplit(' ', 1)[0]
            if truncated:
                return truncated + "..."
            return p_text[:max_length] + "..."
    
    # Strategy 2: Find first text block after removing title/navigation
    # Remove h1, navigation elements, and get text
    soup_copy = BeautifulSoup(str(soup), "lxml")
    
    # Remove h1
    for h1 in soup_copy.find_all("h1"):
        h1.decompose()
    
    # Remove navigation elements (buttons, skip links, etc.)
    for nav in soup_copy.find_all(["button", "nav", "a"], class_=lambda x: x and any(
        cls in str(x).lower() for cls in ["skip", "nav", "button", "menu"]
    )):
        nav.decompose()
    
    # Get all text blocks
    text_blocks = []
    for elem in soup_copy.find_all(["p", "div", "section", "article"]):
        elem_text = elem.get_text(" ", strip=True)
        elem_text = " ".join(elem_text.split())
        if len(elem_text) >= min_length:
            text_blocks.append(elem_text)
    
    if text_blocks:
        first_block = text_blocks[0]
        if len(first_block) <= max_length:
            return first_block
        # Truncate at word boundary
        truncated = first_block[:max_length].rsplit(' ', 1)[0]
        if truncated:
            return truncated + "..."
        return first_block[:max_length] + "..."
    
    # Strategy 3: Fallback - use first meaningful text from entire content
    all_text = soup_copy.get_text(" ", strip=True)
    all_text = " ".join(all_text.split())
    
    if len(all_text) >= min_length:
        if len(all_text) <= max_length:
            return all_text
        # Truncate at word boundary
        truncated = all_text[:max_length].rsplit(' ', 1)[0]
        if truncated:
            return truncated + "..."
        return all_text[:max_length] + "..."
    
    return None


def _check_content_loaded(
    driver: Any,
    *,
    min_words: int = DEFAULT_CONTENT_CHECK_MIN_WORDS,
) -> dict[str, Any] | bool:
    """
    Check if page content is loaded by executing JavaScript check.
    
    Args:
        driver: Selenium WebDriver instance
        min_words: Minimum number of words to consider content loaded
    
    Returns:
        Dictionary with check result or False if check failed
    """
    try:
        script = f"""
            var main = document.querySelector('div[role="main"]') || document.querySelector('main');
            if (!main) return {{hasContent: false, reason: 'no_main'}};
            var contentElements = main.querySelectorAll('p, h2, h3, h4, img, ol, ul, table, div[class*="content"], div[class*="text"], div[class*="paragraph"], div[class*="section"]');
            if (contentElements.length > 0) return {{hasContent: true, reason: 'elements', count: contentElements.length}};
            var textContent = (main.innerText || main.textContent || '').trim();
            var words = textContent.split(/\\s+/).filter(function(w) {{ return w.length > 0; }});
            if (words.length >= {min_words}) return {{hasContent: true, reason: 'text', wordCount: words.length}};
            return {{hasContent: false, reason: 'insufficient', wordCount: words.length, textLength: textContent.length}};
        """
        result = driver.execute_script(script)
        if isinstance(result, dict):
            return result
        return False
    except Exception as e:
        log.debug("Erro ao verificar conteúdo carregado: %s", e)
        return False


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


def extract_page(
    driver: Any,
    *,
    url: str,
    base_url: str,
    wait_timeout_seconds: int,
    content_check_min_words: int = DEFAULT_CONTENT_CHECK_MIN_WORDS,
    wait_delay_seconds: float = DEFAULT_WAIT_DELAY_SECONDS,
    max_wait_attempts: int = DEFAULT_MAX_WAIT_ATTEMPTS,
    short_wait_timeout: int = DEFAULT_SHORT_WAIT_TIMEOUT,
    enable_debug_log: bool = False,
) -> dict[str, Any]:
    """
    Extract content from a Google Sites page.
    
    Args:
        driver: Selenium WebDriver instance
        url: URL of the page to extract
        base_url: Base URL of the site
        wait_timeout_seconds: Timeout for page load
        content_check_min_words: Minimum words to consider content loaded
        wait_delay_seconds: Delay between wait attempts
        max_wait_attempts: Maximum number of wait attempts
        short_wait_timeout: Timeout for short wait operations
        enable_debug_log: Enable debug logging (default: False)
    
    Returns:
        Dictionary with extracted page data
    """
    start_time = time.time()
    
    try:
        driver.get(url)
        wait = WebDriverWait(driver, wait_timeout_seconds)
        wait.until(lambda d: d.execute_script("return document.readyState") in ("interactive", "complete"))
    except Exception as e:
        log.error("Erro ao carregar página %s: %s", url, e)
        raise
    
    # Check if content is already loaded (optimization)
    content_loaded = False
    check_result = _check_content_loaded(driver, min_words=content_check_min_words)
    if isinstance(check_result, dict) and check_result.get("hasContent"):
        content_loaded = True
        log.debug("Conteúdo já carregado imediatamente para %s", url)
    
    # If content not loaded, wait for it
    if not content_loaded:
        # Initial delay for JavaScript to execute
        time.sleep(wait_delay_seconds)
        
        # Try waiting for content with multiple attempts
        for attempt in range(max_wait_attempts):
            check_result = _check_content_loaded(driver, min_words=content_check_min_words)
            if isinstance(check_result, dict) and check_result.get("hasContent"):
                content_loaded = True
                log.debug("Conteúdo carregado após tentativa %d para %s", attempt + 1, url)
                break
            
            # Wait before next attempt
            if attempt < max_wait_attempts - 1:
                time.sleep(wait_delay_seconds * 0.67)  # Slightly shorter delay between attempts
        
        # If still not loaded, try waiting for specific elements
        if not content_loaded:
            try:
                short_wait = WebDriverWait(driver, short_wait_timeout)
                short_wait.until(EC.presence_of_element_located((
                    By.CSS_SELECTOR,
                    "div[role='main'] p, div[role='main'] h2, div[role='main'] img, "
                    "div[role='main'] ol, div[role='main'] ul"
                )))
                content_loaded = True
                log.debug("Conteúdo carregado após espera por elementos específicos para %s", url)
            except Exception as e:
                log.warning("Timeout aguardando elementos específicos para %s: %s", url, e)
                # Last attempt: small delay
                time.sleep(wait_delay_seconds * 0.67)

    # Get page title
    try:
        title = (driver.title or "").strip() or None
    except Exception as e:
        log.warning("Erro ao obter título da página %s: %s", url, e)
        title = None
    
    # Wait for images to load and force lazy loading images to load
    try:
        # Scroll to trigger lazy loading
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(0.5)  # Wait for lazy images to start loading
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(0.3)  # Wait a bit more
        
        # Force lazy images to load by setting src from data-src
        driver.execute_script("""
            var images = document.querySelectorAll('img[data-src], img[data-lazy-src], img[data-original]');
            images.forEach(function(img) {
                var src = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('data-original');
                if (src && !img.src) {
                    img.src = src;
                }
            });
        """)
        time.sleep(0.5)  # Wait for images to load
    except Exception as e:
        log.debug("Erro ao forçar carregamento de imagens lazy para %s: %s", url, e)
    
    # Extract main HTML content
    try:
        main_html, main_selector = _get_main_html(driver)
        log.debug("HTML extraído usando seletor: %s (tamanho: %d bytes)", main_selector, len(main_html or ""))
    except Exception as e:
        log.error("Erro ao extrair HTML principal de %s: %s", url, e)
        main_html = ""
        main_selector = "error"
    
    # Parse HTML with BeautifulSoup
    try:
        soup = BeautifulSoup(main_html or "", "lxml")
    except Exception as e:
        log.error("Erro ao fazer parse do HTML de %s: %s", url, e)
        soup = BeautifulSoup("", "lxml")
    
    # Remove navigation elements before processing
    try:
        from src.scraper.processor import _remove_navigation_elements
        soup = _remove_navigation_elements(soup)
    except Exception as e:
        log.warning("Erro ao remover elementos de navegação de %s: %s", url, e)
    
    # Validate extracted content
    text = soup.get_text("\n", strip=True)
    text_length = len(text)
    has_content = text_length > 0
    
    if not has_content:
        log.warning("Página %s extraída sem conteúdo de texto", url)
    else:
        log.debug("Conteúdo extraído: %d caracteres de texto", text_length)
    
    # Attempt a better title from h1 inside main
    try:
        h1 = soup.find(["h1", "h2"])
        if h1:
            t = h1.get_text(" ", strip=True)
            if t:
                title = t
    except Exception as e:
        log.debug("Erro ao extrair título de h1/h2 de %s: %s", url, e)
    
    # Extract media and links
    try:
        media = _extract_media(soup, base_url=base_url, page_url=url, remove_size_params=True)
        # #region agent log
        import json
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"G","location":"extractor.py:214","message":"Mídias extraídas","data":{"url":url[:100],"media_count":len(media),"media_types":[m.type for m in media]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        log.debug("Extraídas %d mídias de %s", len(media), url)
    except Exception as e:
        # #region agent log
        import json
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"G","location":"extractor.py:217","message":"Erro ao extrair mídias","data":{"url":url[:100],"error":str(e)[:200]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        log.error("Erro ao extrair mídias de %s: %s", url, e)
        media = []
    
    try:
        links_internal = _extract_internal_links(soup, base_url=base_url, page_url=url)
        log.debug("Extraídos %d links internos de %s", len(links_internal), url)
    except Exception as e:
        log.error("Erro ao extrair links internos de %s: %s", url, e)
        links_internal = []
    
    # Extract category path
    try:
        segs = google_sites_path_segments(url, base_url)
        category_path = segs[:-1] if len(segs) >= 2 else segs[:-1]
    except Exception as e:
        log.warning("Erro ao extrair category_path de %s: %s", url, e)
        category_path = []
    
    # Extract description using smart generation
    description = generate_smart_description(soup, max_length=DEFAULT_DESCRIPTION_MAX_LENGTH)
    
    # Update main_html with cleaned soup
    main_html = str(soup)
    
    # Calculate extraction time
    extraction_time = time.time() - start_time
    
    # Get cookies from driver for later use in media downloads
    cookies = []
    try:
        selenium_cookies = driver.get_cookies()
        # Convert Selenium cookie format to requests cookie format
        cookies = [
            {
                "name": c.get("name"),
                "value": c.get("value"),
                "domain": c.get("domain"),
                "path": c.get("path", "/"),
            }
            for c in selenium_cookies
            if c.get("name") and c.get("value")
        ]
        # #region agent log
        import json
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"extractor.py:261","message":"Cookies extraídos do driver","data":{"url":url[:100],"cookie_count":len(cookies),"selenium_cookie_count":len(selenium_cookies)},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        log.debug("Extraídos %d cookies do driver para %s", len(cookies), url)
    except Exception as e:
        # #region agent log
        import json
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"F","location":"extractor.py:263","message":"Erro ao obter cookies","data":{"url":url[:100],"error":str(e)[:200]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        log.debug("Erro ao obter cookies do driver para %s: %s", url, e)
        cookies = []
    
    result = {
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
        "extraction_time_seconds": round(extraction_time, 2),
        "content_validated": has_content,
        "text_length": text_length,
        "cookies": cookies,  # Save cookies for media downloads
    }
    
    log.info("Página extraída: %s (tempo: %.2fs, texto: %d chars, mídias: %d, links: %d)",
            url, extraction_time, text_length, len(media), len(links_internal))
    
    return result


def _get_main_html(driver: Any) -> tuple[str, str]:
    """
    Google Sites varies; we try several candidates.
    Prefer elements with actual content (text, images, etc.)
    """
    selectors = [
        "div[role='main']",
        "main",
        "article",
        "#sites-canvas-main-content",  # classic-ish fallback
        "body",
    ]
    best_html = ""
    best_selector = "page_source"
    best_content_score = 0
    
    for sel in selectors:
        try:
            el = driver.find_element(By.CSS_SELECTOR, sel)
            html = el.get_attribute("outerHTML") or ""
            if not html.strip():
                continue
            
            # Calcular "score" de conteúdo: verificar se há elementos de conteúdo real
            try:
                # Contar elementos de conteúdo
                content_elements = el.find_elements(By.CSS_SELECTOR, "p, h2, h3, h4, img, ol, ul, table, div[class*='content'], div[class*='text']")
                text_content = (el.text or "").strip()
                content_score = len(content_elements) + (len(text_content) // 10)  # Score baseado em elementos + texto
                
                # Se este tem mais conteúdo, usar este
                if content_score > best_content_score:
                    best_html = html
                    best_selector = sel
                    best_content_score = content_score
                    
                    # Se encontrou conteúdo significativo, usar este
                    if content_score > 5 or len(text_content) > 100:
                        return html, sel
            except Exception:
                # Se não conseguir calcular score, usar se for o primeiro com HTML
                if not best_html:
                    best_html = html
                    best_selector = sel
        except Exception:
            continue
    
    # Retornar o melhor encontrado, ou page_source como fallback
    if best_html:
        return best_html, best_selector
    return driver.page_source or "", "page_source"


def _extract_media(
    soup: BeautifulSoup,
    *,
    base_url: str,
    page_url: str,
    remove_size_params: bool = True,
) -> list[ExtractedMedia]:
    """
    Extract media (images, videos, documents) from parsed HTML.
    
    Args:
        soup: BeautifulSoup parsed HTML
        base_url: Base URL of the site
        page_url: URL of the current page
        remove_size_params: If True, normalize Google image URLs by removing size parameters
    
    Returns:
        List of ExtractedMedia objects
    """
    out: list[ExtractedMedia] = []

    # Images - check both src and data-src (lazy loading)
    all_imgs = soup.find_all("img")
    # #region agent log
    import json
    with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
        f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"G","location":"extractor.py:374","message":"Encontradas tags img no HTML","data":{"url":page_url[:100],"total_img_tags":len(all_imgs)},"timestamp":int(time.time()*1000)})+"\n")
    # #endregion
    
    for img in all_imgs:
        # Try src first, then data-src, then data-lazy-src (common lazy loading attributes)
        src = img.get("src") or img.get("data-src") or img.get("data-lazy-src") or img.get("data-original")
        src_attr = "src" if img.get("src") else ("data-src" if img.get("data-src") else ("data-lazy-src" if img.get("data-lazy-src") else "data-original"))
        
        if not src:
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"G","location":"extractor.py:378","message":"Imagem sem src válido","data":{"url":page_url[:100],"has_src":bool(img.get("src")),"has_data_src":bool(img.get("data-src")),"has_data_lazy_src":bool(img.get("data-lazy-src"))},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            continue
        
        # Skip data URIs and placeholder images
        if src.startswith("data:") or src.startswith("blob:"):
            continue
        
        # Skip common placeholder/empty images
        if any(placeholder in src.lower() for placeholder in ["placeholder", "spacer", "blank", "transparent", "1x1"]):
            continue
        
        full = join_url(page_url, src)
        if not is_http_url(full):
            # #region agent log
            with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"G","location":"extractor.py:388","message":"URL não é HTTP válida","data":{"url":page_url[:100],"src":src[:100],"full":full[:100]},"timestamp":int(time.time()*1000)})+"\n")
            # #endregion
            continue
        
        # Normalize Google image URLs if configured
        normalized_url = normalize_url(full)
        if remove_size_params and "googleusercontent.com" in normalized_url.lower():
            normalized_url = normalize_googleusercontent_url(normalized_url, remove_size_params=True)
        
        # #region agent log
        with open(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log", "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"post-fix","hypothesisId":"G","location":"extractor.py:395","message":"Imagem extraída","data":{"url":page_url[:100],"src_attr":src_attr,"normalized_url":normalized_url[:100]},"timestamp":int(time.time()*1000)})+"\n")
        # #endregion
        
        out.append(
            ExtractedMedia(
                type="image",
                url=normalized_url,
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


