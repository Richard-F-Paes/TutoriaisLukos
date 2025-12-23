#!/usr/bin/env python3
"""
Script de execução completa do webscrape para preencher o banco de dados.

Este script executa todas as etapas necessárias:
1. Descobrir páginas do site
2. Extrair conteúdo das páginas
3. Baixar mídias (imagens, documentos)
4. Processar dados brutos
5. Inserir no banco de dados

Uso:
    python run_scraper.py [--limit N] [--dry-run] [--skip-download]
"""

from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path

from config import load_settings
from src.database.inserter import build_schema_checks, insert_all
from src.database.schema_check import check_schema
from src.database.sqlserver import SqlServerConfig, connect as db_connect
from src.scraper.browser import BrowserConfig, create_driver
from src.scraper.discoverer import discover_pages, serialize_pages
from src.scraper.extractor import extract_page
from src.scraper.media_downloader import download_media_for_page
from src.scraper.processor import process_raw_page
from src.utils.category_path import limit_category_depth
from src.utils.json_io import read_json, write_json
from src.utils.logging_utils import setup_logging
from src.utils.robots import RobotsPolicy
from src.utils.urls import normalize_url, url_id


log = logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser(description="Executa webscrape completo para preencher banco de dados")
    parser.add_argument("--dotenv", default=None, help="Caminho para arquivo .env (opcional)")
    parser.add_argument("--log-level", default="INFO", help="Nível de log (DEBUG, INFO, WARNING, ERROR)")
    parser.add_argument("--limit", type=int, default=0, help="Limitar número de páginas (0 = sem limite)")
    parser.add_argument("--dry-run", action="store_true", help="Apenas simular inserção no banco (não executa)")
    parser.add_argument("--skip-download", action="store_true", help="Pular download de mídias")
    parser.add_argument("--force-extract", action="store_true", help="Forçar re-extração mesmo se já existir")
    
    args = parser.parse_args()
    setup_logging(args.log_level)
    
    settings = load_settings(args.dotenv)
    
    # Garantir que os diretórios existam
    _ensure_dirs(
        settings.data_dir,
        settings.media_dir,
        settings.raw_content_dir(),
        settings.processed_dir(),
        settings.images_dir(),
        settings.documents_dir(),
    )
    if settings.report_mismatches:
        _ensure_dirs(settings.data_dir / "reports")
    
    try:
        # Etapa 1: Descobrir páginas
        log.info("=" * 60)
        log.info("ETAPA 1: Descobrindo páginas do site")
        log.info("=" * 60)
        _discover_pages(settings)
        
        # Etapa 2: Extrair conteúdo
        log.info("=" * 60)
        log.info("ETAPA 2: Extraindo conteúdo das páginas")
        log.info("=" * 60)
        _extract_pages(settings, limit=args.limit, force=args.force_extract)
        
        # Etapa 3: Baixar mídias
        if not args.skip_download:
            log.info("=" * 60)
            log.info("ETAPA 3: Baixando mídias")
            log.info("=" * 60)
            _download_media(settings, limit=args.limit)
        else:
            log.info("Pulando download de mídias (--skip-download)")
        
        # Etapa 4: Processar dados
        log.info("=" * 60)
        log.info("ETAPA 4: Processando dados brutos")
        log.info("=" * 60)
        _process_data(settings)
        
        # Etapa 5: Verificar schema do banco
        log.info("=" * 60)
        log.info("ETAPA 5: Verificando schema do banco de dados")
        log.info("=" * 60)
        _check_schema(settings)
        
        # Etapa 6: Inserir no banco
        log.info("=" * 60)
        log.info("ETAPA 6: Inserindo dados no banco de dados")
        log.info("=" * 60)
        _insert_to_db(settings, dry_run=args.dry_run)
        
        log.info("=" * 60)
        log.info("PROCESSO CONCLUÍDO COM SUCESSO!")
        log.info("=" * 60)
        
    except Exception as e:
        log.error("Erro durante execução: %s", e, exc_info=True)
        sys.exit(1)


def _ensure_dirs(*dirs: Path) -> None:
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)


def _discover_pages(settings) -> None:
    pages_path = settings.data_dir / "pages.json"
    if pages_path.exists():
        log.info("Arquivo pages.json já existe. Pulando descoberta.")
        log.info("Para forçar nova descoberta, delete o arquivo: %s", pages_path)
        return
    
    cfg = BrowserConfig(
        browser=settings.browser,
        headless=settings.headless,
        page_load_timeout_seconds=settings.page_load_timeout_seconds,
        user_agent=settings.user_agent,
    )
    driver = create_driver(cfg)
    try:
        pages, categories = discover_pages(
            driver,
            base_url=settings.base_url,
            wait_timeout_seconds=settings.wait_timeout_seconds,
            normalize_menu_labels=settings.normalize_menu_labels,
        )
        write_json(
            settings.data_dir / "pages.json",
            {"base_url": settings.base_url, "pages": serialize_pages(pages)},
        )
        write_json(
            settings.data_dir / "categories.json",
            {"base_url": settings.base_url, "categories": categories},
        )
        log.info("✓ Descobertas %d páginas, derivadas %d categorias", len(pages), len(categories))
    finally:
        driver.quit()


def _extract_pages(settings, *, limit: int, force: bool) -> None:
    pages_path = settings.data_dir / "pages.json"
    if not pages_path.exists():
        raise RuntimeError("pages.json não encontrado. Execute a descoberta primeiro.")
    
    payload = read_json(pages_path)
    pages = payload.get("pages") or []
    
    if limit and limit > 0:
        pages = pages[:limit]
        log.info("Limitando extração a %d páginas", limit)
    
    cfg = BrowserConfig(
        browser=settings.browser,
        headless=settings.headless,
        page_load_timeout_seconds=settings.page_load_timeout_seconds,
        user_agent=settings.user_agent,
    )
    driver = create_driver(cfg)
    try:
        for i, p in enumerate(pages, start=1):
            url = normalize_url(p.get("url"))
            pid = p.get("id") or url_id(url)
            out_path = settings.raw_content_dir() / f"{pid}.json"
            
            if out_path.exists() and not force:
                log.debug("(%d/%d) Já extraído: %s", i, len(pages), url)
                continue
            
            log.info("(%d/%d) Extraindo: %s", i, len(pages), url)
            raw = extract_page(
                driver,
                url=url,
                base_url=settings.base_url,
                wait_timeout_seconds=settings.wait_timeout_seconds,
            )
            
            # Merge discovery hints
            raw["discovered_from_menu"] = bool(p.get("discovered_from_menu"))
            if "is_leaf" in p:
                raw["is_leaf"] = p.get("is_leaf")
            
            # Keep extracted values for reporting/audit
            raw["title_extracted"] = raw.get("title")
            raw["category_path_extracted"] = raw.get("category_path")
            
            # Canonicalize (menu-first)
            if settings.title_source == "menu_first" and p.get("title"):
                raw["title_menu"] = p.get("title")
                raw["title"] = p.get("title")
            elif p.get("title") and not raw.get("title"):
                raw["title_menu"] = p.get("title")
                raw["title"] = p.get("title")
            
            if settings.category_source == "menu" and p.get("category_path"):
                raw["category_path_menu"] = p.get("category_path")
                raw["category_path"] = p.get("category_path")
            elif p.get("category_path") and not raw.get("category_path"):
                raw["category_path_menu"] = p.get("category_path")
                raw["category_path"] = p.get("category_path")
            
            # Enforce max depth (categoria/subcategoria only). Keep *_menu intact for audit.
            raw["category_path"] = limit_category_depth(raw.get("category_path"), max_depth=2)

            write_json(out_path, raw)
        
        log.info("✓ Extração concluída para %d páginas", len(pages))
    finally:
        driver.quit()


def _download_media(settings, *, limit: int) -> None:
    raw_dir = settings.raw_content_dir()
    files = sorted(raw_dir.glob("*.json"))
    if limit and limit > 0:
        files = files[:limit]
        log.info("Limitando download a %d páginas", limit)
    
    robots = RobotsPolicy(base_url=settings.base_url, user_agent=settings.user_agent)
    can_fetch = (robots.can_fetch if settings.respect_robots else None)
    
    for i, fp in enumerate(files, start=1):
        page = read_json(fp)
        title = page.get("title") or page.get("url") or fp.name
        log.info("(%d/%d) Baixando mídias: %s", i, len(files), title)
        updated = download_media_for_page(
            page,
            images_dir=settings.images_dir(),
            documents_dir=settings.documents_dir(),
            user_agent=settings.user_agent,
            timeout_seconds=settings.request_timeout_seconds,
            retries=settings.request_retries,
            backoff_seconds=settings.request_backoff_seconds,
            can_fetch=can_fetch,
        )
        write_json(fp, updated)
    
    log.info("✓ Download de mídias concluído para %d páginas", len(files))


def _process_data(settings) -> None:
    raw_dir = settings.raw_content_dir()
    files = sorted(raw_dir.glob("*.json"))
    if not files:
        raise RuntimeError("Nenhum arquivo raw_content/*.json encontrado. Execute a extração primeiro.")
    
    tutorials: list[dict] = []
    steps: list[dict] = []
    media: list[dict] = []
    mismatches: list[dict] = []
    
    # Build categories tree from tutorial.category_path (stable IDs)
    categories: list[dict] = []
    cat_key_to_id: dict[tuple[str | None, str], str] = {}
    
    def ensure_category(parent_id: str | None, name: str) -> str:
        key = (parent_id, name)
        if key in cat_key_to_id:
            return cat_key_to_id[key]
        cid = url_id(f"{parent_id or 'root'}::{name}")
        categories.append({"id": cid, "name": name, "parent_id": parent_id})
        cat_key_to_id[key] = cid
        return cid
    
    for fp in files:
        page = read_json(fp)
        
        if settings.ignore_non_leaf_pages and page.get("is_leaf") is False:
            continue
        
        processed = process_raw_page(page)
        tut = processed["tutorial"]
        
        # Map category_path -> leaf category id
        parent: str | None = None
        for seg in limit_category_depth(tut.get("category_path"), max_depth=2):
            parent = ensure_category(parent, str(seg))
        tut["category_db_key"] = parent
        
        tutorials.append(tut)
        steps.extend(processed["steps"])
        media.extend(processed["media"])
        
        if settings.report_mismatches:
            from src.utils.urls import google_sites_path_segments
            url = page.get("url") or ""
            slug = None
            try:
                segs = google_sites_path_segments(url, settings.base_url)
                slug = segs[-1] if segs else None
            except Exception:
                slug = None
            mismatches.append({
                "url": url,
                "slug": slug,
                "title_menu": page.get("title_menu"),
                "title_extracted": page.get("title_extracted"),
                "title_final": page.get("title"),
                "category_path_menu": page.get("category_path_menu"),
                "category_path_extracted": page.get("category_path_extracted"),
                "category_path_final": page.get("category_path"),
                "discovered_from_menu": page.get("discovered_from_menu"),
            })
    
    # Stable sorting
    categories.sort(key=lambda c: (c["parent_id"] or "", c["name"]))
    tutorials.sort(key=lambda t: (t.get("title") or "", t.get("url_original") or ""))
    steps.sort(key=lambda s: (s.get("tutorial_url") or "", int(s.get("step_number") or 0)))
    
    write_json(settings.processed_dir() / "categories.json", {"categories": categories})
    write_json(settings.processed_dir() / "tutorials.json", {"tutorials": tutorials})
    write_json(settings.processed_dir() / "steps.json", {"steps": steps})
    write_json(settings.processed_dir() / "media.json", {"media": media})
    if settings.report_mismatches:
        write_json(settings.data_dir / "reports" / "mismatches.json", {"items": mismatches})
    
    log.info("✓ Processados: %d categorias, %d tutoriais, %d passos, %d mídias",
             len(categories), len(tutorials), len(steps), len(media))


def _check_schema(settings) -> None:
    cfg = SqlServerConfig(
        driver=settings.sqlserver_driver,
        server=settings.sqlserver_server,
        database=settings.sqlserver_database,
        trusted_connection=settings.sqlserver_trusted_connection,
        username=settings.sqlserver_username,
        password=settings.sqlserver_password,
        port=settings.sqlserver_port,
    )
    conn = db_connect(cfg)
    try:
        checks = build_schema_checks(settings.tables, settings.columns)
        missing = check_schema(conn, checks)
        if not missing:
            log.info("✓ Schema OK (colunas necessárias encontradas)")
        else:
            for tbl, cols in missing.items():
                log.error("Faltando em %s: %s", tbl, cols)
            raise RuntimeError("Schema do banco não corresponde ao esperado")
    finally:
        conn.close()


def _insert_to_db(settings, *, dry_run: bool) -> None:
    proc_dir = settings.processed_dir()
    cats_p = proc_dir / "categories.json"
    tuts_p = proc_dir / "tutorials.json"
    steps_p = proc_dir / "steps.json"
    media_p = proc_dir / "media.json"
    
    if not (cats_p.exists() and tuts_p.exists() and steps_p.exists() and media_p.exists()):
        raise RuntimeError("Arquivos processed_data/*.json faltando. Execute o processamento primeiro.")
    
    processed = {
        "categories": read_json(cats_p).get("categories") or [],
        "tutorials": read_json(tuts_p).get("tutorials") or [],
        "steps": read_json(steps_p).get("steps") or [],
        "media": read_json(media_p).get("media") or [],
    }
    
    cfg = SqlServerConfig(
        driver=settings.sqlserver_driver,
        server=settings.sqlserver_server,
        database=settings.sqlserver_database,
        trusted_connection=settings.sqlserver_trusted_connection,
        username=settings.sqlserver_username,
        password=settings.sqlserver_password,
        port=settings.sqlserver_port,
    )
    conn = db_connect(cfg)
    try:
        default_user_id = 1  # Assumindo que existe um usuário com ID 1
        result = insert_all(
            conn,
            tables=settings.tables,
            cols=settings.columns,
            processed=processed,
            dry_run=dry_run,
            default_user_id=default_user_id,
        )
        if dry_run:
            log.info("✓ Simulação concluída (dry-run)")
        else:
            log.info("✓ Inseridos: %d categorias, %d tutoriais, %d passos, %d mídias",
                     result.categories_inserted,
                     result.tutorials_inserted,
                     result.steps_inserted,
                     result.media_inserted)
    finally:
        conn.close()


if __name__ == "__main__":
    main()

