from __future__ import annotations

import argparse
import logging
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
from src.utils.json_io import read_json, write_json
from src.utils.logging_utils import setup_logging
from src.utils.robots import RobotsPolicy
from src.utils.urls import normalize_url, slugify, url_id


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
        pages, categories = discover_pages(driver, base_url=settings.base_url, wait_timeout_seconds=settings.wait_timeout_seconds)
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
            if not raw.get("title") and p.get("title"):
                raw["title"] = p.get("title")
            if not raw.get("category_path") and p.get("category_path"):
                raw["category_path"] = p.get("category_path")

            write_json(out_path, raw)
    finally:
        driver.quit()


def _cmd_download_media(settings, *, limit: int) -> None:
    raw_dir = settings.raw_content_dir()
    files = sorted(raw_dir.glob("*.json"))
    if limit and limit > 0:
        files = files[:limit]

    robots = RobotsPolicy(base_url=settings.base_url, user_agent=settings.user_agent)
    can_fetch = (robots.can_fetch if settings.respect_robots else None)

    for i, fp in enumerate(files, start=1):
        page = read_json(fp)
        title = page.get("title") or page.get("url") or fp.name
        log.info("(%d/%d) Download media: %s", i, len(files), title)
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


def _cmd_process(settings) -> None:
    raw_dir = settings.raw_content_dir()
    files = sorted(raw_dir.glob("*.json"))
    if not files:
        raise RuntimeError("No raw_content/*.json found. Run `extract` first.")

    tutorials: list[dict[str, Any]] = []
    steps: list[dict[str, Any]] = []
    media: list[dict[str, Any]] = []

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
        processed = process_raw_page(page)
        tut = processed["tutorial"]

        # Map category_path -> leaf category id (internal key used later by inserter)
        parent: str | None = None
        for seg in tut.get("category_path") or []:
            parent = ensure_category(parent, str(seg))
        tut["category_db_key"] = parent

        tutorials.append(tut)
        steps.extend(processed["steps"])
        media.extend(processed["media"])

    # Stable sorting for repeatability
    categories.sort(key=lambda c: (c["parent_id"] or "", c["name"]))
    tutorials.sort(key=lambda t: (t.get("title") or "", t.get("url_original") or ""))
    steps.sort(key=lambda s: (s.get("tutorial_url") or "", int(s.get("step_number") or 0)))

    write_json(settings.processed_dir() / "categories.json", {"categories": categories})
    write_json(settings.processed_dir() / "tutorials.json", {"tutorials": tutorials})
    write_json(settings.processed_dir() / "steps.json", {"steps": steps})
    write_json(settings.processed_dir() / "media.json", {"media": media})
    log.info("Processed: %d categories, %d tutorials, %d steps, %d media", len(categories), len(tutorials), len(steps), len(media))


def _cmd_check_schema(settings) -> None:
    cfg = SqlServerConfig(
        driver=settings.sqlserver_driver,
        server=settings.sqlserver_server,
        database=settings.sqlserver_database,
        trusted_connection=settings.sqlserver_trusted_connection,
        username=settings.sqlserver_username,
        password=settings.sqlserver_password,
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
    )
    conn = db_connect(cfg)
    try:
        result = insert_all(conn, tables=settings.tables, cols=settings.columns, processed=processed, dry_run=dry_run)
        log.info("Inserted: %s", result)
    finally:
        conn.close()


def _ensure_dirs(*dirs: Path) -> None:
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)


if __name__ == "__main__":
    main()


