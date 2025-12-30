from __future__ import annotations

import argparse
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any

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
from src.utils.urls import google_sites_path_segments, normalize_url, url_id


log = logging.getLogger(__name__)


def main() -> None:
    parser = argparse.ArgumentParser(prog="tutoriais-lukos-scraper")
    parser.add_argument("--dotenv", default=None, help="Path to a .env file (optional).")
    parser.add_argument("--log-level", default="INFO")

    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("discover", help="Discover pages from the site menu/home.")

    p_extract = sub.add_parser("extract", help="Extract content for discovered pages.")
    p_extract.add_argument("--limit", type=int, default=0, help="Limit number of pages (0 = no limit).")
    p_extract.add_argument("--force", action="store_true", help="Re-extract even if raw JSON exists.")

    p_media = sub.add_parser("download-media", help="Download images/documents referenced by raw pages.")
    p_media.add_argument("--limit", type=int, default=0, help="Limit number of raw pages (0 = no limit).")

    sub.add_parser("process", help="Process raw pages -> processed_data/*.json")

    p_check = sub.add_parser("check-schema", help="Check SQL Server schema/column requirements.")

    p_insert = sub.add_parser("insert-db", help="Insert processed_data into SQL Server tables.")
    p_insert.add_argument("--dry-run", action="store_true", help="Log SQL statements without executing.")

    p_all = sub.add_parser("run-all", help="Run discover -> extract -> download-media -> process (no DB).")
    p_all.add_argument("--limit", type=int, default=0, help="Limit pages for extract/download-media (0 = no limit).")

    args = parser.parse_args()
    setup_logging(args.log_level)

    settings = load_settings(args.dotenv)
    _ensure_dirs(settings.data_dir, settings.media_dir, settings.raw_content_dir(), settings.processed_dir())
    _ensure_dirs(settings.images_dir(), settings.documents_dir())
    if settings.report_mismatches:
        _ensure_dirs(settings.data_dir / "reports")

    if args.cmd == "discover":
        _cmd_discover(settings)
        return

    if args.cmd == "extract":
        _cmd_extract(settings, limit=args.limit, force=args.force)
        return

    if args.cmd == "download-media":
        _cmd_download_media(settings, limit=args.limit)
        return

    if args.cmd == "process":
        _cmd_process(settings)
        return

    if args.cmd == "check-schema":
        _cmd_check_schema(settings)
        return

    if args.cmd == "insert-db":
        _cmd_insert_db(settings, dry_run=args.dry_run)
        return

    if args.cmd == "run-all":
        _cmd_discover(settings)
        _cmd_extract(settings, limit=args.limit, force=False)
        _cmd_download_media(settings, limit=args.limit)
        _cmd_process(settings)
        return


def _cmd_discover(settings) -> None:
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
        write_json(settings.data_dir / "pages.json", {"base_url": settings.base_url, "pages": serialize_pages(pages)})
        write_json(settings.data_dir / "categories.json", {"base_url": settings.base_url, "categories": categories})
        log.info("Discovered %d pages, derived %d categories", len(pages), len(categories))
    finally:
        driver.quit()


def _cmd_extract(settings, *, limit: int, force: bool) -> None:
    pages_path = settings.data_dir / "pages.json"
    if not pages_path.exists():
        raise RuntimeError("pages.json not found. Run `discover` first.")
    payload = read_json(pages_path)
    pages = payload.get("pages") or []

    if limit and limit > 0:
        pages = pages[:limit]

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
                continue

            log.info("(%d/%d) Extracting: %s", i, len(pages), url)
            raw = extract_page(driver, url=url, base_url=settings.base_url, wait_timeout_seconds=settings.wait_timeout_seconds)

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
    finally:
        driver.quit()


def _cmd_download_media(settings, *, limit: int) -> None:
    raw_dir = settings.raw_content_dir()
    files = sorted(raw_dir.glob("*.json"))
    if limit and limit > 0:
        files = files[:limit]

    if not files:
        log.info("No files found for download")
        return

    robots = RobotsPolicy(base_url=settings.base_url, user_agent=settings.user_agent)
    can_fetch = (robots.can_fetch if settings.respect_robots else None)

    def process_page(fp: Path) -> tuple[Path, str]:
        """Process a single page. Thread-safe."""
        page = read_json(fp)
        title = page.get("title") or page.get("url") or fp.name
        updated = download_media_for_page(
            page,
            images_dir=settings.images_dir(),
            documents_dir=settings.documents_dir(),
            user_agent=settings.user_agent,
            timeout_seconds=settings.request_timeout_seconds,
            retries=settings.request_retries,
            backoff_seconds=settings.request_backoff_seconds,
            can_fetch=can_fetch,
            max_workers=settings.download_max_workers_media,
            max_media_per_page=settings.download_max_media_per_page,
        )
        write_json(fp, updated)
        return fp, title

    # Parallelize page processing
    max_workers_pages = settings.download_max_workers_pages
    limit_info = f" (limit: {settings.download_max_media_per_page} per page)" if settings.download_max_media_per_page else ""
    log.info("Processing %d pages with %d workers (up to %d simultaneous downloads per page)%s",
             len(files), max_workers_pages, settings.download_max_workers_media, limit_info)

    completed = 0
    with ThreadPoolExecutor(max_workers=max_workers_pages) as executor:
        futures = {executor.submit(process_page, fp): fp for fp in files}

        for future in as_completed(futures):
            try:
                fp, title = future.result()
                completed += 1
                log.info("(%d/%d) [OK] Completed: %s", completed, len(files), title)
            except Exception as exc:
                fp = futures[future]
                completed += 1
                log.error("(%d/%d) [ERRO] Error processing %s: %s", completed, len(files), fp.name, exc, exc_info=True)

    log.info("[OK] Media download completed for %d pages", len(files))


def _cmd_process(settings) -> None:
    raw_dir = settings.raw_content_dir()
    files = sorted(raw_dir.glob("*.json"))
    if not files:
        raise RuntimeError("No raw_content/*.json found. Run `extract` first.")

    tutorials: list[dict[str, Any]] = []
    steps: list[dict[str, Any]] = []
    media: list[dict[str, Any]] = []
    mismatches: list[dict[str, Any]] = []

    # Build categories tree from tutorial.category_path (stable IDs)
    categories: list[dict[str, Any]] = []
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
            # Respect rule: non-leaf nodes are categories only, even if they have page content.
            continue

        processed = process_raw_page(page)
        tut = processed["tutorial"]

        # Map category_path -> leaf category id (internal key used later by inserter)
        parent: str | None = None
        for seg in limit_category_depth(tut.get("category_path"), max_depth=2):
            parent = ensure_category(parent, str(seg))
        tut["category_db_key"] = parent

        tutorials.append(tut)
        steps.extend(processed["steps"])
        media.extend(processed["media"])

        if settings.report_mismatches:
            url = page.get("url") or ""
            slug = None
            try:
                segs = google_sites_path_segments(url, settings.base_url)
                slug = segs[-1] if segs else None
            except Exception:
                slug = None
            mismatches.append(
                {
                    "url": url,
                    "slug": slug,
                    "title_menu": page.get("title_menu"),
                    "title_extracted": page.get("title_extracted"),
                    "title_final": page.get("title"),
                    "category_path_menu": page.get("category_path_menu"),
                    "category_path_extracted": page.get("category_path_extracted"),
                    "category_path_final": page.get("category_path"),
                    "discovered_from_menu": page.get("discovered_from_menu"),
                }
            )

    # Stable sorting for repeatability
    categories.sort(key=lambda c: (c["parent_id"] or "", c["name"]))
    tutorials.sort(key=lambda t: (t.get("title") or "", t.get("url_original") or ""))
    steps.sort(key=lambda s: (s.get("tutorial_url") or "", int(s.get("step_number") or 0)))

    write_json(settings.processed_dir() / "categories.json", {"categories": categories})
    write_json(settings.processed_dir() / "tutorials.json", {"tutorials": tutorials})
    write_json(settings.processed_dir() / "steps.json", {"steps": steps})
    write_json(settings.processed_dir() / "media.json", {"media": media})
    if settings.report_mismatches:
        write_json(settings.data_dir / "reports" / "mismatches.json", {"items": mismatches})
    log.info("Processed: %d categories, %d tutorials, %d steps, %d media", len(categories), len(tutorials), len(steps), len(media))


def _cmd_check_schema(settings) -> None:
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
            log.info("Schema OK (required columns found).")
        else:
            for tbl, cols in missing.items():
                log.error("Missing in %s: %s", tbl, cols)
            raise SystemExit(2)
    finally:
        conn.close()


def _cmd_insert_db(settings, *, dry_run: bool) -> None:
    proc_dir = settings.processed_dir()
    cats_p = proc_dir / "categories.json"
    tuts_p = proc_dir / "tutorials.json"
    steps_p = proc_dir / "steps.json"
    media_p = proc_dir / "media.json"
    if not (cats_p.exists() and tuts_p.exists() and steps_p.exists() and media_p.exists()):
        raise RuntimeError("processed_data/*.json missing. Run `process` first.")

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
        result = insert_all(
            conn, 
            tables=settings.tables, 
            cols=settings.columns, 
            processed=processed, 
            dry_run=dry_run,
            default_user_id=settings.default_user_id
        )
        log.info("Inserted: %s", result)
    finally:
        conn.close()


def _ensure_dirs(*dirs: Path) -> None:
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)


if __name__ == "__main__":
    main()


