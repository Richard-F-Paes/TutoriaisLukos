from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

from src.utils.urls import google_sites_path_segments, is_http_url, join_url, normalize_url, same_site, url_id


log = logging.getLogger(__name__)

# #region agent log
DEBUG_LOG_PATH = Path(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log")
def _debug_log(location: str, message: str, data: dict[str, Any], hypothesis_id: str = ""):
    try:
        with DEBUG_LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(json.dumps({
                "sessionId": "debug-session",
                "runId": "run2",
                "hypothesisId": hypothesis_id,
                "location": location,
                "message": message,
                "data": data,
                "timestamp": __import__("time").time() * 1000
            }, ensure_ascii=False) + "\n")
    except Exception:
        pass
# #endregion


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
    
    # Aguardar conteúdo dinâmico do Google Sites carregar
    # Google Sites usa JavaScript para carregar conteúdo, então precisamos aguardar
    import time
    from selenium.webdriver.support import expected_conditions as EC
    
    # #region agent log
    _debug_log("extractor.py:55", "Before wait for content", {
        "url": url,
        "page_source_length": len(driver.page_source or ""),
        "ready_state": driver.execute_script("return document.readyState")
    }, "H6")
    # #endregion
    
    # Verificar se o conteúdo já está disponível imediatamente (otimização)
    content_loaded = False
    try:
        check_result = driver.execute_script("""
            var main = document.querySelector('div[role="main"]') || document.querySelector('main');
            if (!main) return {hasContent: false, reason: 'no_main'};
            var contentElements = main.querySelectorAll('p, h2, h3, h4, img, ol, ul, table, div[class*="content"], div[class*="text"], div[class*="paragraph"], div[class*="section"]');
            if (contentElements.length > 0) return {hasContent: true, reason: 'elements', count: contentElements.length};
            var textContent = (main.innerText || main.textContent || '').trim();
            var words = textContent.split(/\\s+/).filter(function(w) { return w.length > 0; });
            if (words.length > 10) return {hasContent: true, reason: 'text', wordCount: words.length};
            return {hasContent: false, reason: 'insufficient', wordCount: words.length, textLength: textContent.length};
        """)
        if isinstance(check_result, dict) and check_result.get("hasContent"):
            content_loaded = True
        else:
            content_loaded = False
    except Exception:
        content_loaded = False
    
    # Se o conteúdo já está disponível, pular esperas
    if not content_loaded:
        # Aguardar inicial reduzido para JavaScript executar
        time.sleep(0.3)
        
        # #region agent log
        try:
            main_exists = bool(driver.find_elements(By.CSS_SELECTOR, "div[role='main'], main"))
            main_innerHTML_result = driver.execute_script("""
                var main = document.querySelector('div[role="main"]') || document.querySelector('main');
                return main ? (main.innerHTML || '').length : 0;
            """)
            main_text_result = driver.execute_script("""
                var main = document.querySelector('div[role="main"]') || document.querySelector('main');
                return main ? (main.innerText || main.textContent || '').trim().length : 0;
            """)
            main_innerHTML_length = main_innerHTML_result if isinstance(main_innerHTML_result, int) else len(str(main_innerHTML_result or ""))
            main_text_length = main_text_result if isinstance(main_text_result, int) else len(str(main_text_result or ""))
            _debug_log("extractor.py:62", "After initial sleep", {
                "main_exists": main_exists,
                "main_innerHTML_length": main_innerHTML_length,
                "main_text_length": main_text_length
            }, "H6")
        except Exception as e:
            _debug_log("extractor.py:62_error", "After initial sleep ERROR", {
                "error": str(e),
                "error_type": type(e).__name__
            }, "H6")
        # #endregion
        
        # Tentar aguardar por conteúdo real (reduzido para 2 tentativas)
        max_wait_attempts = 2
        for attempt in range(max_wait_attempts):
            try:
                check_result = driver.execute_script("""
                    var main = document.querySelector('div[role="main"]') || document.querySelector('main');
                    if (!main) return {hasContent: false, reason: 'no_main'};
                    var contentElements = main.querySelectorAll('p, h2, h3, h4, img, ol, ul, table, div[class*="content"], div[class*="text"], div[class*="paragraph"], div[class*="section"]');
                    if (contentElements.length > 0) return {hasContent: true, reason: 'elements', count: contentElements.length};
                    var textContent = (main.innerText || main.textContent || '').trim();
                    var words = textContent.split(/\\s+/).filter(function(w) { return w.length > 0; });
                    if (words.length > 10) return {hasContent: true, reason: 'text', wordCount: words.length};
                    return {hasContent: false, reason: 'insufficient', wordCount: words.length, textLength: textContent.length};
                """)
                
                # #region agent log
                _debug_log(f"extractor.py:attempt{attempt+1}", "Content check result", {
                    "attempt": attempt + 1,
                    "has_content": check_result.get("hasContent") if isinstance(check_result, dict) else bool(check_result),
                    "check_result": check_result
                }, "H6")
                # #endregion
                
                if isinstance(check_result, dict) and check_result.get("hasContent"):
                    content_loaded = True
                    break
            except Exception as e:
                # #region agent log
                _debug_log(f"extractor.py:attempt{attempt+1}_error", "Content check error", {
                    "attempt": attempt + 1,
                    "error": str(e)
                }, "H6")
                # #endregion
                pass
            
            # Aguardar reduzido antes da próxima tentativa
            if attempt < max_wait_attempts - 1:
                time.sleep(0.2)
        
        # Se ainda não carregou, tentar aguardar por elementos específicos (com timeout reduzido)
        if not content_loaded:
            try:
                short_wait = WebDriverWait(driver, 1)  # Timeout reduzido para 1s
                short_wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[role='main'] p, div[role='main'] h2, div[role='main'] img, div[role='main'] ol, div[role='main'] ul")))
                content_loaded = True
                # #region agent log
                _debug_log("extractor.py:EC_wait", "EC wait succeeded", {}, "H6")
                # #endregion
            except Exception as e:
                # Última tentativa: aguardar reduzido
                # #region agent log
                _debug_log("extractor.py:EC_wait_failed", "EC wait failed", {
                    "error": str(e)
                }, "H6")
                # #endregion
                time.sleep(0.2)
    
    # #region agent log
    try:
        final_main_innerHTML_result = driver.execute_script("""
            var main = document.querySelector('div[role="main"]') || document.querySelector('main');
            return main ? (main.innerHTML || '').length : 0;
        """)
        final_main_text_result = driver.execute_script("""
            var main = document.querySelector('div[role="main"]') || document.querySelector('main');
            return main ? (main.innerText || main.textContent || '').trim().length : 0;
        """)
        final_main_innerHTML_length = final_main_innerHTML_result if isinstance(final_main_innerHTML_result, int) else len(str(final_main_innerHTML_result or ""))
        final_main_text_length = final_main_text_result if isinstance(final_main_text_result, int) else len(str(final_main_text_result or ""))
        _debug_log("extractor.py:after_wait", "After all wait attempts", {
            "content_loaded": content_loaded,
            "final_main_innerHTML_length": final_main_innerHTML_length,
            "final_main_text_length": final_main_text_length
        }, "H6")
    except Exception as e:
        _debug_log("extractor.py:after_wait_error", "After all wait attempts ERROR", {
            "content_loaded": content_loaded,
            "error": str(e),
            "error_type": type(e).__name__
        }, "H6")
    # #endregion

    try:
        title = (driver.title or "").strip() or None
    except Exception:
        # Sessão pode ter sido invalidada, usar None
        title = None

    # #region agent log
    # Verificar se há iframes que podem conter conteúdo
    iframes_info = driver.execute_script("""
        var iframes = document.querySelectorAll('iframe');
        return Array.from(iframes).map(function(iframe) {
            return {
                src: iframe.src || '',
                id: iframe.id || '',
                className: iframe.className || ''
            };
        });
    """)
    _debug_log("extractor.py:before_get_main", "Before _get_main_html", {
        "iframes_count": len(iframes_info) if isinstance(iframes_info, list) else 0,
        "iframes": iframes_info
    }, "H6")
    # #endregion
    
    main_html, main_selector = _get_main_html(driver)
    
    # #region agent log
    _debug_log("extractor.py:45", "After _get_main_html", {
        "main_selector": main_selector,
        "main_html_length": len(main_html or ""),
        "main_html_preview": (main_html or "")[:200],
        "content_loaded": content_loaded
    }, "H1")
    # #endregion
    
    soup = BeautifulSoup(main_html or "", "lxml")
    
    # #region agent log
    _debug_log("extractor.py:52", "After BeautifulSoup parse", {
        "soup_has_h1": bool(soup.find("h1")),
        "soup_has_h2": bool(soup.find("h2")),
        "soup_has_h3": bool(soup.find("h3")),
        "soup_has_p": bool(soup.find("p")),
        "soup_has_ol": bool(soup.find("ol")),
        "soup_has_ul": bool(soup.find("ul")),
        "soup_has_img": bool(soup.find("img")),
        "soup_text_length": len(soup.get_text() or "")
    }, "H1")
    # #endregion
    
    # Remover elementos de navegação antes de processar
    from src.scraper.processor import _remove_navigation_elements
    soup = _remove_navigation_elements(soup)
    
    # #region agent log
    _debug_log("extractor.py:after_nav_removal", "After navigation removal", {
        "soup_has_h1": bool(soup.find("h1")),
        "soup_has_h2": bool(soup.find("h2")),
        "soup_has_h3": bool(soup.find("h3")),
        "soup_has_p": bool(soup.find("p")),
        "soup_text_length": len(soup.get_text() or "")
    }, "H1")
    # #endregion
    
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
    
    # Extrair descrição após remover navegação
    text = soup.get_text("\n", strip=True)
    description = None
    if text:
        description = text[:280]
    
    # Atualizar main_html com o soup limpo
    main_html = str(soup)

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


