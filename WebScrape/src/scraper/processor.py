from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup, Tag

from src.utils.html_cleaner import clean_html
from src.utils.category_path import limit_category_depth
from src.utils.urls import slugify, url_id


log = logging.getLogger(__name__)


def _remove_navigation_elements(soup: BeautifulSoup) -> BeautifulSoup:
    """
    Remove elementos de navegação conhecidos do Google Sites.
    Remove elementos como menus, sidebars, "Search this site", etc.
    """
    # Criar uma cópia para não modificar o original
    soup_copy = BeautifulSoup(str(soup), "lxml")
    
    # Textos conhecidos de navegação do Google Sites
    navigation_texts = [
        "Search this site",
        "Skip to main content",
        "Skip to navigation",
        "Embedded Files",
        "Tutoriais Lukos",
        "Início",
    ]
    
    # Remover elementos por role
    for role in ["navigation", "banner", "complementary"]:
        for elem in soup_copy.find_all(attrs={"role": role}):
            elem.decompose()
    
    # Remover elementos <nav> e seus filhos
    for nav in soup_copy.find_all("nav"):
        nav.decompose()
    
    # Remover elementos por classes/id contendo palavras-chave de navegação
    nav_keywords = ["nav", "navigation", "sidebar", "menu", "header", "footer", "breadcrumb"]
    for keyword in nav_keywords:
        # Por classe
        for elem in soup_copy.find_all(class_=lambda x: x and keyword.lower() in str(x).lower()):
            elem.decompose()
        # Por id
        for elem in soup_copy.find_all(id=lambda x: x and keyword.lower() in str(x).lower()):
            elem.decompose()
    
    # Remover elementos por aria-label contendo palavras-chave
    for keyword in ["navigation", "menu", "sidebar"]:
        for elem in soup_copy.find_all(attrs={"aria-label": lambda x: x and keyword.lower() in str(x).lower()}):
            elem.decompose()
    
    # Remover elementos que contêm apenas texto de navegação conhecido
    for text in navigation_texts:
        for elem in soup_copy.find_all(string=lambda x: x and text.lower() in str(x).strip().lower()):
            parent = elem.parent
            if parent:
                # Verificar se o elemento pai contém apenas texto de navegação
                parent_text = parent.get_text(" ", strip=True)
                if parent_text and len(parent_text) < 100:  # Elementos pequenos provavelmente são navegação
                    # Verificar se contém principalmente texto de navegação
                    nav_text_count = sum(1 for nav_text in navigation_texts if nav_text.lower() in parent_text.lower())
                    if nav_text_count > 0:
                        parent.decompose()
    
    # Remover elementos com classes específicas do Google Sites que são navegação
    google_sites_nav_classes = [
        "sites-nav",
        "sites-nav-menu",
        "sites-nav-list",
        "sites-header",
        "sites-footer",
    ]
    for class_name in google_sites_nav_classes:
        for elem in soup_copy.find_all(class_=lambda x: x and class_name.lower() in str(x).lower()):
            elem.decompose()
    
    return soup_copy

# #region agent log
DEBUG_LOG_PATH = Path(r"c:\Desenvolvimento\TutoriaisLukos\.cursor\debug.log")
def _debug_log(location: str, message: str, data: dict[str, Any], hypothesis_id: str = ""):
    try:
        with DEBUG_LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(json.dumps({
                "sessionId": "debug-session",
                "runId": "run1",
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
class Step:
    id: str
    tutorial_url: str
    step_number: int
    title: str | None
    content_html: str


def _convert_internal_links(html: str, url_to_hash_map: dict[str, str], base_url: str) -> str:
    """
    Converte links internos do Google Sites para links que abrem tutoriais no modal usando shareHash.
    
    Args:
        html: HTML contendo links a serem convertidos
        url_to_hash_map: Mapeamento de URL do Google Sites para shareHash do tutorial
        base_url: URL base do site do Google Sites
    
    Returns:
        HTML com links convertidos para formato #tutorial-{shareHash}
    """
    from src.utils.urls import normalize_url, same_site, google_sites_path_segments
    
    if not html or not url_to_hash_map:
        return html
    
    soup = BeautifulSoup(html, "lxml")
    
    # Encontrar todos os links
    for a_tag in soup.find_all("a", href=True):
        href = a_tag.get("href", "")
        if not href:
            continue
        
        # Ignorar links que já são hash de tutorial
        if href.startswith("#tutorial-"):
            continue
        
        # Normalizar URL
        try:
            # Se for URL relativa, precisa ser resolvida com base_url
            if href.startswith("/"):
                # URL relativa ao domínio
                from urllib.parse import urljoin
                full_url = urljoin(base_url, href)
            elif href.startswith("http://") or href.startswith("https://"):
                full_url = href
            else:
                # URL relativa ao caminho atual, tentar resolver
                from urllib.parse import urljoin
                full_url = urljoin(base_url, href)
            
            full_url = normalize_url(full_url)
            
            # Verificar se é um link interno do Google Sites
            if not same_site(full_url, base_url):
                continue
            
            # Verificar se temos um hash mapeado para esta URL
            share_hash = url_to_hash_map.get(full_url)
            if share_hash:
                # Converter para link de tutorial usando hash
                a_tag["href"] = f"#tutorial-{share_hash}"
                # Adicionar atributo para facilitar interceptação (opcional)
                a_tag["data-tutorial-hash"] = share_hash
            else:
                # Tentar extrair segmento da URL diretamente como fallback
                segments = google_sites_path_segments(full_url, base_url)
                if segments:
                    # Usar o último segmento para tentar encontrar no mapeamento
                    last_segment = segments[-1]
                    # Tentar encontrar no mapeamento usando apenas o segmento
                    for url, mapped_hash in url_to_hash_map.items():
                        url_segments = google_sites_path_segments(url, base_url)
                        if url_segments and url_segments[-1] == last_segment:
                            a_tag["href"] = f"#tutorial-{mapped_hash}"
                            a_tag["data-tutorial-hash"] = mapped_hash
                            break
        except Exception as e:
            # Se houver erro ao processar o link, manter como está
            log.debug("Erro ao converter link %s: %s", href, e)
            continue
    
    return str(soup)


def process_raw_page(page: dict[str, Any], *, url_to_hash_map: dict[str, str] | None = None) -> dict[str, Any]:
    # #region agent log
    _debug_log("processor.py:26", "process_raw_page ENTRY", {
        "page_url": page.get("url"),
        "has_content_html": bool(page.get("content_html")),
        "content_html_length": len(page.get("content_html") or ""),
        "media_count": len(page.get("media") or [])
    }, "H1")
    # #endregion
    
    html = page.get("content_html") or ""
    cleaned = clean_html(html)
    soup = BeautifulSoup(cleaned, "lxml")
    
    # Remover elementos de navegação antes de processar
    soup = _remove_navigation_elements(soup)

    # #region agent log
    _debug_log("processor.py:35", "After clean_html and nav removal", {
        "cleaned_length": len(cleaned),
        "soup_has_h1": bool(soup.find("h1")),
        "soup_has_h2": bool(soup.find("h2")),
        "soup_has_h3": bool(soup.find("h3")),
        "soup_has_ol": bool(soup.find("ol")),
        "soup_has_images": len(soup.find_all("img")) > 0,
        "soup_has_iframes": len(soup.find_all("iframe")) > 0,
        "soup_text_length": len(soup.get_text() or "")
    }, "H1,H2")
    # #endregion

    # Mapear mídias originais por URL para associar com mídias extraídas dos passos
    # Normalizar URLs para melhor matching (remover query params, normalizar)
    original_media_by_url: dict[str, dict[str, Any]] = {}
    for m in page.get("media") or []:
        url = m.get("url") or ""
        if url:
            # Armazenar por URL original e também por URL normalizada
            original_media_by_url[url] = m
            # Também armazenar pela URL sem query params para melhor matching
            if "?" in url:
                url_base = url.split("?")[0]
                if url_base not in original_media_by_url:
                    original_media_by_url[url_base] = m

    # #region agent log
    _debug_log("processor.py:52", "Before _split_into_steps", {
        "original_media_count": len(original_media_by_url),
        "soup_text_preview": (soup.get_text() or "")[:200]
    }, "H2")
    # #endregion

    steps = _split_into_steps(soup)
    
    # #region agent log
    _debug_log("processor.py:56", "After _split_into_steps", {
        "steps_count": len(steps),
        "steps_details": [{
            "title": s.get("title"),
            "content_length": len(s.get("content_html") or ""),
            "content_preview": (s.get("content_html") or "")[:100],
            "media_count": len(s.get("media") or [])
        } for s in steps[:3]]
    }, "H1,H3")
    # #endregion
    
    # Converter links internos nos passos se mapeamento fornecido
    page_url = page.get("url", "") or ""
    if url_to_hash_map and page_url:
        # Extrair base_url da URL da página
        from urllib.parse import urlparse
        try:
            parsed = urlparse(page_url)
            base_url = f"{parsed.scheme}://{parsed.netloc}"
            # Adicionar o caminho base do Google Sites se necessário
            if "sites.google.com" in base_url:
                # Extrair o caminho base (até /view/site-slug/)
                path_parts = parsed.path.split("/")
                if len(path_parts) >= 3 and path_parts[1] == "view":
                    base_url = f"{base_url}/view/{path_parts[2]}"
        except Exception:
            # Fallback para base_url padrão
            base_url = "https://sites.google.com/view/lukos-tutoriais/"
        
        for step in steps:
            if step.get("content_html"):
                step["content_html"] = _convert_internal_links(
                    step["content_html"],
                    url_to_hash_map,
                    base_url
                )
    step_rows: list[dict[str, Any]] = []
    media_rows: list[dict[str, Any]] = []
    
    for i, st in enumerate(steps, start=1):
        # #region agent log
        _debug_log(f"processor.py:60-step{i}", "Processing step", {
            "step_number": i,
            "step_title": st.get("title"),
            "step_content_length": len(st.get("content_html") or ""),
            "step_media_count": len(st.get("media") or [])
        }, "H1,H3")
        # #endregion
        
        step_media = st.get("media") or []
        step_image_url = None
        step_video_url = None
        
        # #region agent log
        _debug_log(f"processor.py:67-step{i}", "Step media details", {
            "step_media": step_media
        }, "H2,H5")
        # #endregion
        
        # Processar mídias do passo
        for media_info in step_media:
            media_url = media_info.get("url") or ""
            media_type = media_info.get("type") or "unknown"
            
            # Tentar encontrar mídia original (com informações de download)
            # Tentar matching exato primeiro
            original_media = original_media_by_url.get(media_url)
            
            # Se não encontrou, tentar matching parcial (URL base sem query params)
            if not original_media and "?" in media_url:
                url_base = media_url.split("?")[0]
                original_media = original_media_by_url.get(url_base)
            
            # Se ainda não encontrou, tentar matching por sufixo (última parte da URL)
            if not original_media:
                # Tentar encontrar por sufixo da URL (nome do arquivo)
                for orig_url, orig_media in original_media_by_url.items():
                    if media_url.endswith(orig_url.split("/")[-1]) or orig_url.endswith(media_url.split("/")[-1]):
                        original_media = orig_media
                        break
            
            # Determinar URL final (local_path se disponível, senão url original)
            final_url = None
            if original_media:
                final_url = original_media.get("local_path") or original_media.get("url") or media_url
            else:
                final_url = media_url
            
            # Associar ao passo
            media_id = url_id(f"{page.get('url')}::media::{media_type}::{media_url}::step{i}")
            media_rows.append(
                {
                    "id": media_id,
                    "tutorial_url": page.get("url"),
                    "tutorial_step_number": i,
                    "media_type": media_type,
                    "url": final_url,
                    "file_path": original_media.get("local_path") if original_media else None,
                    "file_name": original_media.get("file_name") if original_media else None,
                    "file_size": original_media.get("file_size") if original_media else None,
                    "mime_type": original_media.get("mime_type") if original_media else None,
                    "thumbnail_url": original_media.get("thumbnail_url") if original_media else None,
                }
            )
            
            # Armazenar primeira imagem e primeiro vídeo do passo
            if media_type == "image" and not step_image_url:
                step_image_url = final_url
            elif media_type == "video" and not step_video_url:
                step_video_url = final_url
        
        step_rows.append(
            {
                "id": url_id(f"{page.get('url')}#step{i}"),
                "tutorial_url": page.get("url"),
                "step_number": i,
                "title": st.get("title"),
                "content_html": st.get("content_html"),
                "image_url": step_image_url,
                "video_url": step_video_url,
            }
        )
    
    # Processar mídias que não foram associadas a nenhum passo (mídias gerais da página)
    for m in page.get("media") or []:
        url = m.get("url") or ""
        # Verificar se já foi associada a algum passo
        already_associated = any(
            mr.get("url") == url or 
            mr.get("url") == m.get("local_path") or
            (m.get("local_path") and mr.get("url") == m.get("local_path"))
            for mr in media_rows
        )
        
        if not already_associated:
            media_rows.append(
                {
                    "id": url_id(f"{page.get('url')}::media::{m.get('type')}::{url}"),
                    "tutorial_url": page.get("url"),
                    "tutorial_step_number": None,
                    "media_type": m.get("type"),
                    "url": m.get("local_path") or m.get("url") or url,
                    "file_path": m.get("local_path"),
                    "file_name": m.get("file_name"),
                    "file_size": m.get("file_size"),
                    "mime_type": m.get("mime_type"),
                    "thumbnail_url": m.get("thumbnail_url"),
                }
            )

    tutorial = {
        "id": page.get("id") or url_id(page.get("url", "")),
        "url_original": page.get("url"),
        "title": page.get("title"),
        "description": page.get("description"),
        # Enforce max depth (categoria/subcategoria only).
        "category_path": limit_category_depth(page.get("category_path"), max_depth=2),
        "content_html": cleaned,
        # shareHash será adicionado durante o processamento em lote se fornecido
    }

    return {
        "tutorial": tutorial,
        "steps": step_rows,
        "media": media_rows,
    }


def _remove_h1_and_get_intro(soup: BeautifulSoup) -> tuple[BeautifulSoup, str | None]:
    """
    Remove todos os H1 do soup e retorna o conteúdo introdutório (se houver)
    que vem após o último H1 mas antes do primeiro H2/H3.
    """
    # Criar uma cópia do soup para não modificar o original
    soup_copy = BeautifulSoup(str(soup), "lxml")
    
    # Remover elementos de navegação antes de processar
    soup_copy = _remove_navigation_elements(soup_copy)
    
    # Encontrar todos os H1
    h1_tags = soup_copy.find_all("h1")
    if not h1_tags:
        return soup_copy, None
    
    # Encontrar o primeiro H2 ou H3 antes de remover H1
    first_h2_h3 = soup_copy.find(["h2", "h3"])
    
    # Coletar conteúdo introdutório antes de remover H1
    intro_content = None
    if first_h2_h3:
        # Coletar elementos entre o body/main e o primeiro H2/H3
        intro_chunks: list[Tag] = []
        
        # Encontrar o container principal (body, main, ou o próprio soup)
        main_container = soup_copy.find("body") or soup_copy.find("main") or soup_copy
        
        # Coletar todos os elementos filhos diretos antes do primeiro H2/H3
        for child in main_container.children:
            if isinstance(child, Tag):
                if child == first_h2_h3:
                    break
                # Só coletar elementos que não são headings (h1, h2, h3) e não são navegação
                if child.name not in {"h1", "h2", "h3", "script", "style", "nav"}:
                    # Verificar se não é um elemento de navegação
                    role = child.get("role", "")
                    class_attr = " ".join(child.get("class", [])) if child.get("class") else ""
                    if role not in ["navigation", "banner"] and "nav" not in class_attr.lower():
                        intro_chunks.append(child)
        
        # Se encontrou conteúdo introdutório, criar um soup com ele
        if intro_chunks:
            intro_soup = BeautifulSoup("", "lxml")
            for chunk in intro_chunks:
                # Criar uma cópia do chunk para não modificar o original
                intro_soup.append(chunk.__copy__() if hasattr(chunk, '__copy__') else str(chunk))
            intro_text = intro_soup.get_text(" ", strip=True)
            # Só retornar se tiver conteúdo significativo (mais de 20 caracteres)
            if intro_text and len(intro_text) > 20:
                intro_content = str(intro_soup)
    
    # Agora remover apenas os H1 (não remover H2/H3)
    for h1 in soup_copy.find_all("h1"):
        h1.decompose()
    
    return soup_copy, intro_content


def _split_into_steps(soup: BeautifulSoup) -> list[dict[str, Any]]:
    # #region agent log
    _debug_log("processor.py:217", "_split_into_steps ENTRY", {
        "soup_has_h1": bool(soup.find("h1")),
        "soup_has_h2": bool(soup.find("h2")),
        "soup_has_h3": bool(soup.find("h3")),
        "soup_has_ol": bool(soup.find("ol")),
        "soup_text_length": len(soup.get_text() or "")
    }, "H1,H3")
    # #endregion
    
    # Remover H1 e obter conteúdo introdutório
    soup_no_h1, intro_content = _remove_h1_and_get_intro(soup)
    
    # #region agent log
    _debug_log("processor.py:225", "After _remove_h1_and_get_intro", {
        "has_intro_content": bool(intro_content),
        "intro_content_length": len(intro_content or ""),
        "soup_no_h1_has_h1": bool(soup_no_h1.find("h1")),
        "soup_no_h1_has_h2": bool(soup_no_h1.find("h2")),
        "soup_no_h1_has_h3": bool(soup_no_h1.find("h3"))
    }, "H1")
    # #endregion
    
    # 1) Prefer ordered list(s)
    ol = soup_no_h1.find("ol")
    if ol:
        lis = [li for li in ol.find_all("li", recursive=False)]
        if len(lis) >= 2:
            out: list[dict[str, Any]] = []
            # Adicionar conteúdo introdutório como primeiro passo se existir
            if intro_content:
                out.append({"title": None, "content_html": intro_content, "media": []})
            for idx, li in enumerate(lis, start=1):
                # Extrair mídias do li
                step_media = _extract_media_from_element(li)
                out.append({"title": f"Passo {idx}", "content_html": str(li), "media": step_media})
            return out

    # 2) Split by headings (h2/h3)
    headings = soup_no_h1.find_all(["h2", "h3"])
    
    # #region agent log
    _debug_log("processor.py:245", "Checking headings", {
        "headings_count": len(headings),
        "headings_titles": [h.get_text(" ", strip=True) for h in headings[:5]]
    }, "H1,H3")
    # #endregion
    
    if headings:
        out2: list[dict[str, Any]] = []
        # Adicionar conteúdo introdutório como primeiro passo se existir
        if intro_content:
            # Extrair mídias do conteúdo introdutório
            intro_soup = BeautifulSoup(intro_content, "lxml")
            intro_media = _extract_media_from_element(intro_soup)
            # #region agent log
            _debug_log("processor.py:252", "Intro step created", {
                "intro_media_count": len(intro_media),
                "intro_content_length": len(intro_content)
            }, "H2")
            # #endregion
            out2.append({"title": None, "content_html": intro_content, "media": intro_media})
        
        for h in headings:
            title = h.get_text(" ", strip=True) or None
            chunk: list[str] = [str(h)]
            # Extrair mídias deste passo
            step_media: list[dict[str, Any]] = []
            
            siblings_processed = 0
            for sib in _iter_next_siblings_until_heading(h):
                chunk.append(str(sib))
                siblings_processed += 1
                # Extrair mídias do elemento irmão
                if isinstance(sib, Tag):
                    sib_media = _extract_media_from_element(sib)
                    step_media.extend(sib_media)
                    # #region agent log
                    _debug_log(f"processor.py:270-heading-{title}", "Sibling processed", {
                        "sibling_tag": sib.name,
                        "sibling_media_found": len(sib_media),
                        "total_chunk_length": sum(len(str(c)) for c in chunk)
                    }, "H3,H4")
                    # #endregion
            
            # Se não encontrou mídias nos irmãos, procurar no próprio heading
            if not step_media:
                step_media = _extract_media_from_element(h)
            
            # #region agent log
            _debug_log(f"processor.py:280-heading-{title}", "Step created from heading", {
                "title": title,
                "chunk_length": sum(len(str(c)) for c in chunk),
                "siblings_count": siblings_processed,
                "step_media_count": len(step_media),
                "final_content_length": len("".join(chunk))
            }, "H1,H3,H4")
            # #endregion
            
            out2.append({"title": title, "content_html": "".join(chunk), "media": step_media})
        
        # If we got at least 2 chunks (ou 1 se tiver intro), treat as steps.
        if len(out2) >= 2 or (len(out2) == 1 and intro_content):
            # #region agent log
            _debug_log("processor.py:290", "Returning steps from headings", {
                "steps_count": len(out2),
                "steps_summary": [{"title": s.get("title"), "content_len": len(s.get("content_html") or "")} for s in out2]
            }, "H1")
            # #endregion
            return out2

    # 3) Fallback: single-step with entire content (sem H1)
    # Remover H1 do fallback também
    fallback_soup = BeautifulSoup(str(soup_no_h1), "lxml")
    # Garantir que não há H1
    for h1 in fallback_soup.find_all("h1"):
        h1.decompose()
    
    fallback_media = _extract_media_from_element(fallback_soup)
    return [{"title": None, "content_html": str(fallback_soup), "media": fallback_media}]


def _iter_next_siblings_until_heading(tag: Tag):
    """
    Itera pelos irmãos seguintes até encontrar outro heading (h2/h3).
    Captura tanto Tags quanto NavigableString para não perder conteúdo de texto.
    """
    sib = tag.next_sibling
    while sib is not None:
        if isinstance(sib, Tag) and sib.name in {"h2", "h3", "h1"}:
            return
        # Capturar tanto Tags quanto strings
        yield sib
        sib = sib.next_sibling


def _extract_media_from_element(elem: Tag | BeautifulSoup) -> list[dict[str, Any]]:
    """
    Extrai mídias (imagens e vídeos) de um elemento HTML.
    Retorna lista de dicionários com informações das mídias.
    """
    # #region agent log
    _debug_log("processor.py:295", "_extract_media_from_element ENTRY", {
        "elem_type": type(elem).__name__,
        "elem_name": getattr(elem, "name", None) if isinstance(elem, Tag) else None
    }, "H2")
    # #endregion
    
    media: list[dict[str, Any]] = []
    
    if not isinstance(elem, (Tag, BeautifulSoup)):
        return media
    
    # Extrair imagens
    imgs = elem.find_all("img", src=True)
    # #region agent log
    _debug_log("processor.py:305", "Found images", {
        "images_count": len(imgs),
        "image_srcs": [img.get("src") for img in imgs[:3]]
    }, "H2")
    # #endregion
    
    for img in imgs:
        src = img.get("src") or ""
        if src:
            media.append({
                "type": "image",
                "url": src,
                "alt": img.get("alt"),
            })
    
    # Extrair vídeos (iframes e tags video)
    iframes = elem.find_all("iframe", src=True)
    videos = elem.find_all("video", src=True)
    
    # #region agent log
    _debug_log("processor.py:320", "Found videos", {
        "iframes_count": len(iframes),
        "videos_count": len(videos),
        "iframe_srcs": [iframe.get("src") for iframe in iframes[:3]]
    }, "H2")
    # #endregion
    
    for iframe in iframes:
        src = iframe.get("src") or ""
        if src:
            media.append({
                "type": "video",
                "url": src,
            })
    
    for video in videos:
        src = video.get("src") or ""
        if src:
            media.append({
                "type": "video",
                "url": src,
            })
    
    # #region agent log
    _debug_log("processor.py:340", "_extract_media_from_element EXIT", {
        "total_media_found": len(media),
        "media_types": [m.get("type") for m in media]
    }, "H2")
    # #endregion
    
    return media


def _extract_media_from_soup_segment(soup: BeautifulSoup, start_elem: Tag | None, end_elem: Tag | None) -> list[dict[str, Any]]:
    """
    Extrai mídias de um segmento do soup entre dois elementos.
    """
    if not start_elem and not end_elem:
        return _extract_media_from_element(soup)
    
    media: list[dict[str, Any]] = []
    current = start_elem.next_sibling if start_elem else soup.find()
    
    while current is not None:
        if current == end_elem:
            break
        if isinstance(current, Tag):
            media.extend(_extract_media_from_element(current))
        current = current.next_sibling if hasattr(current, 'next_sibling') else None
    
    return media


