from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

from bs4 import BeautifulSoup, Tag

from src.utils.html_cleaner import clean_html
from src.utils.category_path import limit_category_depth
from src.utils.urls import slugify, url_id


log = logging.getLogger(__name__)


def _is_footer_element(elem: Tag, soup: BeautifulSoup | None = None) -> bool:
    """
    Verifica se um elemento é parte do rodapé da página.
    
    Args:
        elem: Elemento Tag a ser verificado
        soup: BeautifulSoup opcional para verificar posição no documento
    
    Returns:
        True se o elemento é parte do rodapé, False caso contrário
    """
    if not isinstance(elem, Tag):
        return False
    
    # Verificar se está dentro de um elemento <footer>
    for parent in elem.parents:
        if isinstance(parent, Tag) and parent.name == "footer":
            return True
    
    # Verificar se o próprio elemento é um <footer>
    if elem.name == "footer":
        return True
    
    # Textos conhecidos de rodapé
    footer_texts = [
        "LUKOS SOLUÇÕES EM TECNOLOGIA",
        "© 2018",
        "©",
        "Sites do Google",
        "Denunciar abuso",
        "Report abuse",
        "Denunciar",
        "abuso",
        "TELEFONE",
        "EMAIL",
        "ATENDIMENTO",
        "suporte@lukos.com.br",
    ]
    
    # Obter texto do elemento (case-insensitive)
    elem_text = elem.get_text(" ", strip=True).upper()
    
    # Verificar se contém textos de rodapé conhecidos
    for footer_text in footer_texts:
        if footer_text.upper() in elem_text:
            # Verificar se o texto de rodapé é uma parte significativa do conteúdo
            # Se o elemento contém principalmente texto de rodapé, é rodapé
            if len(elem_text) < 200:  # Elementos pequenos com texto de rodapé são rodapé
                return True
            # Para elementos maiores, verificar se o texto de rodapé aparece no título ou início
            if footer_text.upper() in elem_text[:100]:
                return True
    
    # Verificar classes/id que indicam rodapé
    classes = elem.get("class", [])
    class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
    elem_id = elem.get("id", "")
    
    footer_keywords = ["footer", "copyright", "abuse", "denunciar"]
    for keyword in footer_keywords:
        if keyword.lower() in class_str.lower() or keyword.lower() in str(elem_id).lower():
            return True
    
    # Verificar se está dentro de um elemento de rodapé
    for parent in elem.parents:
        if isinstance(parent, Tag):
            parent_text = parent.get_text(" ", strip=True).upper()
            for footer_text in footer_texts:
                if footer_text.upper() in parent_text and len(parent_text) < 300:
                    return True
    
    # Verificar posição no documento (últimos 20% do conteúdo)
    if soup is not None:
        try:
            # Encontrar todos os elementos do mesmo tipo
            all_elements = soup.find_all(elem.name)
            if all_elements:
                # Verificar se este elemento está nos últimos 20%
                elem_index = -1
                for idx, e in enumerate(all_elements):
                    if e == elem:
                        elem_index = idx
                        break
                
                if elem_index >= 0:
                    # Se está nos últimos 20% dos elementos, pode ser rodapé
                    threshold = len(all_elements) * 0.8
                    if elem_index >= threshold:
                        # Verificar se tem pouco conteúdo ou é pequeno
                        if len(elem_text) < 150:
                            return True
        except Exception:
            pass
    
    return False


def _remove_navigation_elements(soup: BeautifulSoup) -> BeautifulSoup:
    """
    Remove elementos de navegação conhecidos do Google Sites.
    Remove elementos como menus, sidebars, "Search this site", etc.
    Também remove a section inicial com "TUTORIAL PASSO A PASSO DENTRO DA RETAGUARDA" e botão "Voltar".
    """
    # Criar uma cópia para não modificar o original
    soup_copy = BeautifulSoup(str(soup), "lxml")
    
    # Remover section inicial com "TUTORIAL PASSO A PASSO" e botão "Voltar"
    # Procurar por sections com id no formato h.{hash} que contenham esses textos
    for section in soup_copy.find_all("section", id=True):
        section_id = section.get("id", "")
        section_text = section.get_text(" ", strip=True).upper()
        
        # Verificar se contém textos indicativos da section inicial
        if (section_id.startswith("h.") and 
            ("TUTORIAL PASSO A PASSO" in section_text or 
             "VOLTAR" in section_text or
             "TUTORIAL PASSO A PASSO DENTRO DA RETAGUARDA" in section_text)):
            # Verificar se é realmente a section inicial (geralmente vem no início)
            # Pode ter classe "yaqOZd qeLZfd" ou similar
            section.decompose()
            log.debug("Removida section inicial de tutorial: %s", section_id)
            break  # Remover apenas a primeira encontrada
    
    # Textos conhecidos de navegação do Google Sites
    navigation_texts = [
        "Search this site",
        "Skip to main content",
        "Skip to navigation",
        "Embedded Files",
        "Tutoriais Lukos",
        "Início",
        # Textos de navegação em português
        "Pular para o conteúdo principal Pular para a navegação",
        "Pular para o conteúdo principalPular para a navegação",
        "Pular para o conteúdo principal",
        "Pular para a navegação",
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
    
    # Remover especificamente elementos com textos de navegação em português
    # Procurar por elementos que contêm esses textos (incluindo variações sem espaços)
    portuguese_nav_patterns = [
        "pular para o conteúdo principal",
        "pular para a navegação",
        "pular para o conteúdo principalpular para a navegação",
    ]
    
    for elem in soup_copy.find_all(True):  # Todos os elementos
        if not isinstance(elem, Tag):
            continue
        
        elem_text = elem.get_text(" ", strip=True).lower()
        # Normalizar espaços múltiplos para um único espaço
        elem_text_normalized = " ".join(elem_text.split())
        
        # Verificar se o elemento contém algum dos padrões de navegação
        for pattern in portuguese_nav_patterns:
            if pattern in elem_text_normalized:
                # Se o elemento contém principalmente esse texto de navegação, remover
                # Verificar se o texto de navegação é uma parte significativa do conteúdo
                if len(elem_text_normalized) < 150:  # Elementos pequenos provavelmente são navegação
                    elem.decompose()
                    log.debug("Removido elemento com texto de navegação em português: %s", pattern)
                    break
                # Para elementos maiores, verificar se começa com o texto de navegação
                elif elem_text_normalized.startswith(pattern) or elem_text_normalized[:len(pattern)+20].startswith(pattern):
                    elem.decompose()
                    log.debug("Removido elemento que começa com texto de navegação em português: %s", pattern)
                    break
    
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
    
    # Remover todos os elementos <footer> e seu conteúdo
    for footer in soup_copy.find_all("footer"):
        footer.decompose()
        log.debug("Removido elemento <footer> e seu conteúdo")
    
    # Remover elementos de rodapé usando a função de detecção
    # Coletar elementos para remover (para evitar modificar durante iteração)
    footer_elements_to_remove = []
    for elem in soup_copy.find_all(True):  # find_all(True) encontra todos os elementos
        if isinstance(elem, Tag) and _is_footer_element(elem, soup_copy):
            footer_elements_to_remove.append(elem)
    
    # Remover elementos de rodapé encontrados
    for elem in footer_elements_to_remove:
        elem.decompose()
        log.debug("Removido elemento de rodapé: %s", elem.name)
    
    # Remover imagens com classe CENy8b (decorativas/rodapé do Google Sites)
    for img in soup_copy.find_all("img", class_=True):
        classes = img.get("class", [])
        class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
        if "CENy8b" in class_str:
            img.decompose()
            log.debug("Removida imagem decorativa com classe CENy8b")
    
    return soup_copy

# Debug logging removed - use standard logging instead


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
    Também converte divs com botões (classe "JNdkSc-SmKAyb LkDMRd") que levam a outros tutoriais.
    
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
    
    # Converter divs com botões que levam a outros tutoriais
    # Procurar por divs com classe "JNdkSc-SmKAyb LkDMRd" que contêm links
    for div in soup.find_all("div", class_=True):
        classes = div.get("class", [])
        class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
        
        # Verificar se contém as classes "JNdkSc-SmKAyb" e "LkDMRd"
        if "JNdkSc-SmKAyb" in class_str and "LkDMRd" in class_str:
            # Procurar por links dentro dessa div
            for a_tag in div.find_all("a", href=True):
                href = a_tag.get("href", "")
                if not href:
                    continue
                
                # Ignorar links que já são hash de tutorial
                if href.startswith("#tutorial-"):
                    continue
                
                # Normalizar URL e converter
                try:
                    if href.startswith("/"):
                        from urllib.parse import urljoin
                        full_url = urljoin(base_url, href)
                    elif href.startswith("http://") or href.startswith("https://"):
                        full_url = href
                    else:
                        from urllib.parse import urljoin
                        full_url = urljoin(base_url, href)
                    
                    full_url = normalize_url(full_url)
                    
                    # Verificar se é um link interno do Google Sites
                    if not same_site(full_url, base_url):
                        continue
                    
                    # Verificar se temos um hash mapeado para esta URL
                    share_hash = url_to_hash_map.get(full_url)
                    if share_hash:
                        a_tag["href"] = f"#tutorial-{share_hash}"
                        a_tag["data-tutorial-hash"] = share_hash
                    else:
                        # Tentar extrair segmento da URL diretamente como fallback
                        segments = google_sites_path_segments(full_url, base_url)
                        if segments:
                            last_segment = segments[-1]
                            for url, mapped_hash in url_to_hash_map.items():
                                url_segments = google_sites_path_segments(url, base_url)
                                if url_segments and url_segments[-1] == last_segment:
                                    a_tag["href"] = f"#tutorial-{mapped_hash}"
                                    a_tag["data-tutorial-hash"] = mapped_hash
                                    break
                except Exception as e:
                    log.debug("Erro ao converter link em div botão %s: %s", href, e)
                    continue
    
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
    """
    Process raw page data into structured tutorial format.
    
    Args:
        page: Raw page dictionary with content_html, media, etc.
        url_to_hash_map: Optional mapping of URLs to share hashes for link conversion
    
    Returns:
        Dictionary with processed tutorial, steps, and media data
    """
    log.debug("Processando página: %s", page.get("url"))
    
    html = page.get("content_html") or ""
    cleaned = clean_html(html)
    soup = BeautifulSoup(cleaned, "lxml")
    
    # Remover elementos de navegação antes de processar
    soup = _remove_navigation_elements(soup)

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

    

    steps = _split_into_steps(soup)
    
    
    
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
        
        
        step_media = st.get("media") or []
        step_image_url = None
        step_video_url = None
        step_content_html = st.get("content_html") or ""
        
        
        
        # Processar mídias do passo e remover vídeos do content_html
        step_content_soup = BeautifulSoup(step_content_html, "lxml")
        
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
            
            # Se for vídeo, remover do content_html e colocar no video_url
            if media_type == "video":
                # Remover iframes e tags video do content_html
                for iframe in step_content_soup.find_all("iframe", src=True):
                    iframe_src = iframe.get("src", "")
                    # Verificar se é o mesmo vídeo (comparar URLs normalizadas)
                    if iframe_src == media_url or (final_url and iframe_src in final_url) or (final_url and final_url in iframe_src):
                        iframe.decompose()
                
                for video_tag in step_content_soup.find_all("video", src=True):
                    video_src = video_tag.get("src", "")
                    if video_src == media_url or (final_url and video_src in final_url) or (final_url and final_url in video_src):
                        video_tag.decompose()
                
                # Armazenar primeiro vídeo encontrado no video_url
                if not step_video_url:
                    step_video_url = final_url
            else:
                # Para imagens, apenas registrar
                if media_type == "image" and not step_image_url:
                    step_image_url = final_url
            
            # Associar mídia ao passo (apenas imagens, vídeos vão no video_url)
            if media_type != "video":  # Vídeos não são adicionados como mídias separadas, vão no video_url
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
        
        # Atualizar content_html sem vídeos
        step_content_html_clean = str(step_content_soup)
        
        step_rows.append(
            {
                "id": url_id(f"{page.get('url')}#step{i}"),
                "tutorial_url": page.get("url"),
                "step_number": i,
                "title": st.get("title"),
                "content_html": step_content_html_clean,
                "image_url": step_image_url,
                "video_url": step_video_url,
            }
        )
    
    # Processar mídias que não foram associadas a nenhum passo (mídias gerais da página)
    # Também incluir mídias extraídas diretamente do HTML que não foram capturadas na fase inicial
    all_page_media = list(page.get("media") or [])
    
    # Extrair mídias diretamente do HTML completo para garantir que não perdemos nenhuma
    html_media = _extract_media_from_element(soup)
    for html_m in html_media:
        # Verificar se já está na lista de mídias da página
        html_url = html_m.get("url", "")
        already_in_list = any(
            (pm.get("url") or "").endswith(html_url.split("/")[-1]) or
            html_url.endswith((pm.get("url") or "").split("/")[-1])
            for pm in all_page_media
        )
        if not already_in_list:
            all_page_media.append(html_m)
    
    for m in all_page_media:
        url = m.get("url") or ""
        if not url:
            continue
            
        # Verificar se já foi associada a algum passo
        already_associated = any(
            mr.get("url") == url or 
            mr.get("url") == m.get("local_path") or
            (m.get("local_path") and mr.get("url") == m.get("local_path")) or
            # Matching mais flexível por nome de arquivo
            (url.split("/")[-1] == (mr.get("url") or "").split("/")[-1] and url.split("/")[-1])
            for mr in media_rows
        )
        
        if not already_associated:
            # Determinar URL final (local_path se disponível, senão url original)
            final_url = m.get("local_path") or m.get("url") or url
            media_rows.append(
                {
                    "id": url_id(f"{page.get('url')}::media::{m.get('type', 'unknown')}::{url}"),
                    "tutorial_url": page.get("url"),
                    "tutorial_step_number": None,
                    "media_type": m.get("type", "unknown"),
                    "url": final_url,
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


def _find_step_separators(soup: BeautifulSoup) -> list[Tag]:
    """
    Encontra elementos separadores de passos.
    Prioridade:
    0. Divs com classe "iwQgFb" e role="presentation" (separador de linha/divisão visual)
    1. Divs com classes "oKdM2c ZZyype Kzv0Me" (separador principal)
    2. Sections com id no formato "h.{hash}" e classe "yaqOZd lQAHbd"
    
    Returns:
        Lista de elementos Tag que são separadores, ordenados por posição no documento
    """
    separators: list[Tag] = []
    
    # 0. Prioridade máxima: Procurar por divs com classe "iwQgFb" e role="presentation"
    # Este é o separador visual usado pelo Google Sites para dividir seções
    for div in soup.find_all("div", class_=True):
        classes = div.get("class", [])
        class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
        role = div.get("role", "")
        
        # Verificar se tem classe "iwQgFb" e role="presentation"
        if "iwQgFb" in class_str and role == "presentation":
            separators.append(div)
            log.debug("Encontrado separador div.iwQgFb com role=presentation")
    
    # Se encontrou separadores iwQgFb, retornar apenas eles (prioridade máxima)
    if separators:
        # Ordenar por posição no documento
        def get_element_position(elem: Tag) -> int:
            """Retorna uma posição aproximada do elemento no documento"""
            pos = 0
            for parent in elem.parents:
                if parent.name:
                    pos += 1
            # Contar elementos anteriores
            for prev in elem.previous_siblings:
                if isinstance(prev, Tag):
                    pos += 1
            return pos
        
        separators.sort(key=get_element_position)
        return separators
    
    # 1. Procurar por divs com classes "oKdM2c ZZyype Kzv0Me"
    # Nota: As classes podem estar em qualquer ordem, então verificamos se todas estão presentes
    for div in soup.find_all("div", class_=True):
        classes = div.get("class", [])
        class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
        # Verificar se contém todas as classes necessárias
        if all(cls in class_str for cls in ["oKdM2c", "ZZyype", "Kzv0Me"]):
            separators.append(div)
    
    # 2. Se não encontrou separadores principais, procurar por sections com id h.{hash} e classe yaqOZd lQAHbd
    if not separators:
        for section in soup.find_all("section", id=True, class_=True):
            section_id = section.get("id", "")
            classes = section.get("class", [])
            class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
            
            # Verificar se id começa com "h." e tem as classes corretas
            if (section_id.startswith("h.") and 
                "yaqOZd" in class_str and 
                "lQAHbd" in class_str):
                # Excluir sections que estão dentro de elementos <footer>
                is_in_footer = False
                for parent in section.parents:
                    if isinstance(parent, Tag) and parent.name == "footer":
                        is_in_footer = True
                        break
                
                # Excluir sections que são rodapé (contêm textos de rodapé conhecidos)
                if not is_in_footer:
                    section_text = section.get_text(" ", strip=True).upper()
                    footer_texts = ["LUKOS SOLUÇÕES EM TECNOLOGIA", "© 2018", "TELEFONE", "EMAIL", "ATENDIMENTO", "SUPORTE@LUKOS.COM.BR"]
                    is_footer_text = any(ft in section_text for ft in footer_texts)
                    
                    if not is_footer_text:
                        separators.append(section)
                    else:
                        log.debug("Excluída section de rodapé dos separadores: %s", section_id)
                else:
                    log.debug("Excluída section dentro de <footer> dos separadores: %s", section_id)
    
    # Ordenar separadores por posição no documento
    # Usar uma função que encontra a posição do elemento na árvore
    def get_element_position(elem: Tag) -> int:
        """Retorna uma posição aproximada do elemento no documento"""
        pos = 0
        for parent in elem.parents:
            if parent.name:
                pos += 1
        # Contar elementos anteriores
        for prev in elem.previous_siblings:
            if isinstance(prev, Tag):
                pos += 1
        return pos
    
    separators.sort(key=get_element_position)
    
    return separators


def _split_into_steps(soup: BeautifulSoup) -> list[dict[str, Any]]:
    
    
    # Remover H1 e obter conteúdo introdutório
    soup_no_h1, intro_content = _remove_h1_and_get_intro(soup)
    
    
    
    # 0) Prioridade: Usar separadores específicos (divs ou sections)
    separators = _find_step_separators(soup_no_h1)
    if separators:
        
        
        out_sep: list[dict[str, Any]] = []
        
        # Estratégia simplificada: dividir o HTML baseado nas posições dos separadores
        # Converter soup para string e encontrar posições dos separadores
        html_str = str(soup_no_h1)
        
        # Encontrar posições dos separadores no HTML
        separator_positions = []
        for sep in separators:
            sep_str = str(sep)
            pos = html_str.find(sep_str)
            if pos != -1:
                separator_positions.append((pos, sep))
        
        # Ordenar por posição
        separator_positions.sort(key=lambda x: x[0])
        
        # Dividir HTML em segmentos
        step_num = 1
        start_pos = 0
        
        for sep_pos, sep in separator_positions:
            # Extrair segmento entre start_pos e sep_pos
            if sep_pos > start_pos:
                segment_html = html_str[start_pos:sep_pos].strip()
                
                if segment_html:
                    segment_soup = BeautifulSoup(segment_html, "lxml")
                    step_media = _extract_media_from_element(segment_soup)
                    
                    # Extrair título
                    step_title = None
                    first_heading = segment_soup.find(["h1", "h2", "h3", "h4", "h5", "h6"])
                    if first_heading:
                        step_title = first_heading.get_text(" ", strip=True)
                    else:
                        text = segment_soup.get_text(" ", strip=True)
                        if text and len(text) > 10:
                            step_title = text[:100].strip()
                    
                    # Verificar se não é um passo de rodapé
                    # Verificar pelo texto do segmento
                    segment_text = segment_soup.get_text(" ", strip=True).upper()
                    is_footer = False
                    footer_texts = ["LUKOS SOLUÇÕES EM TECNOLOGIA", "© 2018", "SITES DO GOOGLE", "DENUNCIAR ABUSO", "REPORT ABUSE"]
                    for footer_text in footer_texts:
                        if footer_text in segment_text and len(segment_text) < 300:
                            is_footer = True
                            break
                    
                    # Se não detectou pelo texto, verificar pelo primeiro elemento
                    if not is_footer:
                        first_elem = segment_soup.find()
                        if first_elem:
                            is_footer = _is_footer_element(first_elem, soup_no_h1)
                    
                    if not is_footer:
                        out_sep.append({
                            "title": step_title or str(step_num),
                            "content_html": segment_html,
                            "media": step_media
                        })
                        step_num += 1
                    else:
                        log.debug("Pulado passo de rodapé: %s", step_title)
            
            # Próximo segmento começa após o separador
            start_pos = sep_pos + len(str(sep))
        
        # Adicionar último segmento (após último separador)
        if start_pos < len(html_str):
            segment_html = html_str[start_pos:].strip()
            
            if segment_html:
                segment_soup = BeautifulSoup(segment_html, "lxml")
                step_media = _extract_media_from_element(segment_soup)
                
                step_title = None
                first_heading = segment_soup.find(["h1", "h2", "h3", "h4", "h5", "h6"])
                if first_heading:
                    step_title = first_heading.get_text(" ", strip=True)
                else:
                    text = segment_soup.get_text(" ", strip=True)
                    if text and len(text) > 10:
                        step_title = text[:100].strip()
                
                # Verificar se não é um passo de rodapé
                # Verificar pelo texto do segmento
                segment_text = segment_soup.get_text(" ", strip=True).upper()
                is_footer = False
                footer_texts = ["LUKOS SOLUÇÕES EM TECNOLOGIA", "© 2018", "SITES DO GOOGLE", "DENUNCIAR ABUSO", "REPORT ABUSE"]
                for footer_text in footer_texts:
                    if footer_text in segment_text and len(segment_text) < 300:
                        is_footer = True
                        break
                
                # Se não detectou pelo texto, verificar pelo primeiro elemento
                if not is_footer:
                    first_elem = segment_soup.find()
                    if first_elem:
                        is_footer = _is_footer_element(first_elem, soup_no_h1)
                
                if not is_footer:
                    out_sep.append({
                        "title": step_title or str(step_num),
                        "content_html": segment_html,
                        "media": step_media
                    })
                else:
                    log.debug("Pulado último passo de rodapé: %s", step_title)
        
        # Se encontrou pelo menos 1 passo, retornar
        if len(out_sep) >= 1:
            
            return out_sep
    
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
                # Verificar se não é um passo de rodapé
                if not _is_footer_element(li, soup_no_h1):
                    # Extrair mídias do li
                    step_media = _extract_media_from_element(li)
                    out.append({"title": str(idx), "content_html": str(li), "media": step_media})
                else:
                    log.debug("Pulado passo de rodapé da lista: Passo %d", idx)
            return out

    # 2) Split by headings (h2/h3)
    headings = soup_no_h1.find_all(["h2", "h3"])
    
    
    
    if headings:
        out2: list[dict[str, Any]] = []
        # Adicionar conteúdo introdutório como primeiro passo se existir
        if intro_content:
            # Extrair mídias do conteúdo introdutório
            intro_soup = BeautifulSoup(intro_content, "lxml")
            intro_media = _extract_media_from_element(intro_soup)
            
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
                    
            
            # Se não encontrou mídias nos irmãos, procurar no próprio heading
            if not step_media:
                step_media = _extract_media_from_element(h)
            
            
            
            # Verificar se não é um passo de rodapé antes de adicionar
            chunk_soup = BeautifulSoup("".join(chunk), "lxml")
            chunk_text = chunk_soup.get_text(" ", strip=True).upper()
            is_footer = False
            footer_texts = ["LUKOS SOLUÇÕES EM TECNOLOGIA", "© 2018", "SITES DO GOOGLE", "DENUNCIAR ABUSO", "REPORT ABUSE"]
            for footer_text in footer_texts:
                if footer_text in chunk_text and len(chunk_text) < 300:
                    is_footer = True
                    break
            
            # Se não detectou pelo texto, verificar pelo primeiro elemento
            if not is_footer:
                first_elem = chunk_soup.find()
                if first_elem:
                    is_footer = _is_footer_element(first_elem, soup_no_h1)
            
            if not is_footer:
                out2.append({"title": title, "content_html": "".join(chunk), "media": step_media})
            else:
                log.debug("Pulado passo de rodapé do heading: %s", title)
        
        # If we got at least 2 chunks (ou 1 se tiver intro), treat as steps.
        if len(out2) >= 2 or (len(out2) == 1 and intro_content):
            
            return out2

    # 3) Dividir por parágrafos - agrupar 1-2 parágrafos consecutivos com imagens associadas
    paragraphs = soup_no_h1.find_all("p")
    if paragraphs:
        # Filtrar parágrafos com conteúdo significativo
        valid_paragraphs = []
        for p in paragraphs:
            p_text = p.get_text(" ", strip=True)
            # Ignorar parágrafos muito pequenos ou vazios
            if len(p_text) > 10:
                # Verificar se não é um parágrafo de rodapé
                p_text_upper = p_text.upper()
                is_footer = False
                footer_texts = ["LUKOS SOLUÇÕES EM TECNOLOGIA", "© 2018", "SITES DO GOOGLE", "DENUNCIAR ABUSO", "REPORT ABUSE"]
                for footer_text in footer_texts:
                    if footer_text in p_text_upper and len(p_text) < 300:
                        is_footer = True
                        break
                
                # Verificar se não é elemento de rodapé
                if not is_footer:
                    is_footer = _is_footer_element(p, soup_no_h1)
                
                if not is_footer:
                    valid_paragraphs.append(p)
        
        # Se encontrou pelo menos 1 parágrafo válido, usar como passos
        if len(valid_paragraphs) >= 1:
            out_para: list[dict[str, Any]] = []
            # Adicionar conteúdo introdutório como primeiro passo se existir
            if intro_content:
                intro_soup = BeautifulSoup(intro_content, "lxml")
                intro_media = _extract_media_from_element(intro_soup)
                out_para.append({"title": None, "content_html": intro_content, "media": intro_media})
            
            # Agrupar 1-2 parágrafos consecutivos por passo
            i = 0
            while i < len(valid_paragraphs):
                # Começar um novo passo com o primeiro parágrafo
                step_paragraphs = [valid_paragraphs[i]]
                
                # Verificar se podemos adicionar um segundo parágrafo consecutivo
                if i + 1 < len(valid_paragraphs):
                    next_p = valid_paragraphs[i + 1]
                    current_p = valid_paragraphs[i]
                    
                    # Verificar se há um separador visual entre os dois parágrafos
                    has_separator = False
                    
                    # Verificar se há um heading entre eles
                    for elem in current_p.next_siblings:
                        if isinstance(elem, Tag):
                            if elem == next_p:
                                # Chegamos no próximo parágrafo sem encontrar separador
                                break
                            if elem.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                                has_separator = True
                                break
                            # Verificar se é um separador visual (div com classes específicas)
                            if elem.name == "div":
                                classes = elem.get("class", [])
                                class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
                                role = elem.get("role", "")
                                # Verificar separadores conhecidos
                                if ("iwQgFb" in class_str and role == "presentation") or \
                                   all(cls in class_str for cls in ["oKdM2c", "ZZyype", "Kzv0Me"]):
                                    has_separator = True
                                    break
                    
                    # Se não há separador, adicionar o segundo parágrafo ao passo
                    if not has_separator:
                        step_paragraphs.append(next_p)
                        i += 1  # Pular o próximo parágrafo pois já foi incluído
                
                # Criar HTML do passo com os parágrafos agrupados
                step_html_parts = [str(p) for p in step_paragraphs]
                
                # Procurar por imagem após os parágrafos agrupados
                last_p = step_paragraphs[-1]
                associated_image = None
                
                # Procurar imagem nos próximos irmãos (até encontrar outro parágrafo ou separador)
                for next_elem in last_p.next_siblings:
                    if isinstance(next_elem, Tag):
                        # Se encontrou outro parágrafo válido, parar
                        if next_elem.name == "p" and next_elem in valid_paragraphs:
                            break
                        # Se encontrou um heading, parar (novo passo)
                        if next_elem.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                            break
                        # Se encontrou um separador visual, parar
                        if next_elem.name == "div":
                            classes = next_elem.get("class", [])
                            class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
                            role = next_elem.get("role", "")
                            if ("iwQgFb" in class_str and role == "presentation") or \
                               all(cls in class_str for cls in ["oKdM2c", "ZZyype", "Kzv0Me"]):
                                break
                        # Se encontrou uma imagem, adicionar ao passo
                        if next_elem.name == "img" and next_elem.get("src"):
                            associated_image = next_elem
                            step_html_parts.append(str(next_elem))
                            break
                        # Se encontrou um container com imagem dentro, procurar
                        if next_elem.find("img", src=True):
                            img = next_elem.find("img", src=True)
                            if img:
                                associated_image = img
                                # Incluir o container inteiro se for pequeno (div wrapper da imagem)
                                if len(next_elem.get_text(" ", strip=True)) < 50:
                                    step_html_parts.append(str(next_elem))
                                else:
                                    step_html_parts.append(str(img))
                                break
                
                # Combinar HTML dos parágrafos e imagem
                step_content_html = "".join(step_html_parts)
                
                # Extrair mídias do passo (parágrafos + imagem associada)
                step_soup = BeautifulSoup(step_content_html, "lxml")
                step_media = _extract_media_from_element(step_soup)
                
                # Extrair título do passo
                step_title = None
                first_p = step_paragraphs[0]
                # Verificar se há um heading antes do primeiro parágrafo
                for prev in first_p.previous_siblings:
                    if isinstance(prev, Tag) and prev.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                        step_title = prev.get_text(" ", strip=True)
                        break
                
                # Se não encontrou heading, usar primeiras palavras do primeiro parágrafo
                if not step_title:
                    first_p_text = first_p.get_text(" ", strip=True)
                    words = first_p_text.split()[:10]
                    if words and len(first_p_text) > 50:
                        step_title = " ".join(words)
                
                out_para.append({
                    "title": step_title,
                    "content_html": step_content_html,
                    "media": step_media
                })
                
                i += 1  # Avançar para o próximo parágrafo
            
            # Se encontrou pelo menos 1 passo, retornar
            if len(out_para) >= 1:
                log.debug("Dividido em %d passos baseados em agrupamento de parágrafos (1-2 por passo)", len(out_para))
                return out_para

    # 4) Tentar dividir por divs/sections com conteúdo significativo
    # Procurar por divs ou sections que possam ser passos
    content_elements = soup_no_h1.find_all(["div", "section", "article"], class_=True)
    potential_steps = []
    
    for elem in content_elements:
        # Verificar se o elemento tem conteúdo significativo
        text = elem.get_text(" ", strip=True)
        if len(text) > 50:  # Pelo menos 50 caracteres de texto
            # Verificar se não é um elemento de navegação ou estrutura
            classes = elem.get("class", [])
            class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
            role = elem.get("role", "")
            
            # Ignorar elementos de navegação, estrutura ou containers vazios
            if (role not in ["navigation", "banner", "complementary"] and
                "nav" not in class_str.lower() and
                "header" not in class_str.lower() and
                "footer" not in class_str.lower()):
                # Verificar se tem headings internos ou conteúdo estruturado
                has_internal_heading = bool(elem.find(["h2", "h3", "h4", "h5", "h6"]))
                has_structured_content = bool(elem.find(["p", "ul", "ol", "table", "img"]))
                
                if has_internal_heading or has_structured_content:
                    # Extrair título do primeiro heading interno ou usar texto inicial
                    title = None
                    first_heading = elem.find(["h2", "h3", "h4", "h5", "h6"])
                    if first_heading:
                        title = first_heading.get_text(" ", strip=True)
                    else:
                        # Usar primeiras palavras do texto como título
                        words = text.split()[:10]
                        if words:
                            title = " ".join(words)
                    
                    # Verificar se não é um passo de rodapé
                    if not _is_footer_element(elem, soup_no_h1):
                        step_media = _extract_media_from_element(elem)
                        potential_steps.append({
                            "title": title,
                            "content_html": str(elem),
                            "media": step_media
                        })
                    else:
                        log.debug("Pulado passo potencial de rodapé: %s", title)
    
    # Se encontrou múltiplos passos potenciais, retornar
    if len(potential_steps) >= 2:
        
        return potential_steps
    
    # 4) Fallback final: single-step with entire content (sem H1)
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
    
    
    media: list[dict[str, Any]] = []
    
    if not isinstance(elem, (Tag, BeautifulSoup)):
        return media
    
    # Extrair imagens
    imgs = elem.find_all("img", src=True)
    
    
    for img in imgs:
        src = img.get("src") or ""
        if not src:
            continue
        
        # Filtrar imagens com classe CENy8b (decorativas/rodapé do Google Sites)
        classes = img.get("class", [])
        class_str = " ".join(classes) if isinstance(classes, list) else str(classes)
        if "CENy8b" in class_str:
            log.debug("Filtrada imagem decorativa com classe CENy8b: %s", src)
            continue
        
        # Verificar se a imagem está dentro de um elemento de rodapé
        if _is_footer_element(img, None):
            log.debug("Filtrada imagem de rodapé: %s", src)
            continue
        
        # Verificar se algum parent é rodapé
        is_in_footer = False
        for parent in img.parents:
            if isinstance(parent, Tag) and _is_footer_element(parent, None):
                is_in_footer = True
                break
        
        if is_in_footer:
            log.debug("Filtrada imagem dentro de elemento de rodapé: %s", src)
            continue
        
        media.append({
            "type": "image",
            "url": src,
            "alt": img.get("alt"),
        })
    
    # Extrair vídeos (iframes e tags video)
    iframes = elem.find_all("iframe", src=True)
    videos = elem.find_all("video", src=True)
    
    
    
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


