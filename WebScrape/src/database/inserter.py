from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

import pyodbc

from config import DbColumnMapping, DbTableMapping
from src.database.schema_check import TableCheck, check_schema


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class InsertResult:
    categories_inserted: int
    tutorials_inserted: int
    steps_inserted: int
    media_inserted: int


def build_schema_checks(tables: DbTableMapping, cols: DbColumnMapping) -> list[TableCheck]:
    return [
        TableCheck(
            schema=tables.schema,
            table=tables.categories,
            required_columns=[cols.category_id, cols.category_name, cols.category_parent_id],
        ),
        TableCheck(
            schema=tables.schema,
            table=tables.tutorials,
            required_columns=[
                cols.tutorial_id,
                cols.tutorial_category_id,
                cols.tutorial_title,
                cols.tutorial_url_original,
                cols.tutorial_content,
            ],
        ),
        TableCheck(
            schema=tables.schema,
            table=tables.tutorial_steps,
            required_columns=[cols.step_id, cols.step_tutorial_id, cols.step_number, cols.step_content],
        ),
        TableCheck(
            schema=tables.schema,
            table=tables.media,
            required_columns=[cols.media_id, cols.media_type, cols.media_url],
        ),
    ]


def insert_all(
    conn: pyodbc.Connection,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    processed: dict[str, Any],
    dry_run: bool = False,
) -> InsertResult:
    """
    Expects processed dict:
      { "categories": [...], "tutorials":[...], "steps":[...], "media":[...] }

    IMPORTANT: Because real DB schemas vary, this inserter checks column presence
    and fails with a clear error if the mapping doesn't match.
    """
    missing = check_schema(conn, build_schema_checks(tables, cols))
    if missing:
        msg = "DB schema mismatch. Missing required columns:\n" + "\n".join(
            f"- {tbl}: {cols_}" for tbl, cols_ in missing.items()
        )
        raise RuntimeError(msg)

    categories = processed.get("categories") or []
    tutorials = processed.get("tutorials") or []
    steps = processed.get("steps") or []
    media = processed.get("media") or []

    cur = conn.cursor()
    if not dry_run:
        cur.execute("BEGIN TRANSACTION;")

    cat_map: dict[str, Any] = {}  # processed category id -> db id

    try:
        cats_inserted = _insert_categories(cur, tables=tables, cols=cols, categories=categories, cat_map=cat_map, dry_run=dry_run)
        tuts_inserted, tut_map = _insert_tutorials(
            cur, tables=tables, cols=cols, tutorials=tutorials, cat_map=cat_map, dry_run=dry_run
        )
        steps_inserted, step_map = _insert_steps(
            cur, tables=tables, cols=cols, steps=steps, tut_map=tut_map, dry_run=dry_run
        )
        media_inserted = _insert_media(
            cur, tables=tables, cols=cols, media=media, tut_map=tut_map, step_map=step_map, dry_run=dry_run
        )

        if not dry_run:
            cur.execute("COMMIT;")
        return InsertResult(
            categories_inserted=cats_inserted,
            tutorials_inserted=tuts_inserted,
            steps_inserted=steps_inserted,
            media_inserted=media_inserted,
        )
    except Exception:
        if not dry_run:
            cur.execute("ROLLBACK;")
        raise


def _insert_categories(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    categories: list[dict[str, Any]],
    cat_map: dict[str, Any],
    dry_run: bool,
) -> int:
    """
    Inserts categories in parent-first order. categories elements:
      { id, name, parent_id }
    """
    # Simple loop with retries until no progress (handles arbitrary ordering)
    pending = categories[:]
    inserted = 0
    for _ in range(len(categories) + 2):
        if not pending:
            break
        next_pending: list[dict[str, Any]] = []
        progressed = False
        for c in pending:
            pid = c.get("parent_id")
            if pid and pid not in cat_map:
                next_pending.append(c)
                continue
            db_parent = cat_map.get(pid)

            sql = f"INSERT INTO {tables.schema}.{tables.categories} ({cols.category_name}, {cols.category_parent_id}) VALUES (?, ?);"
            params = (c.get("name"), db_parent)
            if dry_run:
                log.info("[dry-run] %s %s", sql, params)
                cat_map[c["id"]] = c["id"]  # fake mapping
            else:
                cur.execute(sql, params)
                # Best-effort: fetch identity if that column is identity and cursor supports it
                try:
                    new_id = cur.execute("SELECT SCOPE_IDENTITY();").fetchone()[0]
                except Exception:
                    new_id = None
                cat_map[c["id"]] = new_id if new_id is not None else c["id"]
            inserted += 1
            progressed = True

        if not progressed and next_pending:
            # Can't resolve parents; break to avoid infinite loop.
            raise RuntimeError("Could not insert categories due to unresolved parents. Check category tree data.")
        pending = next_pending
    return inserted


def _insert_tutorials(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    tutorials: list[dict[str, Any]],
    cat_map: dict[str, Any],
    dry_run: bool,
) -> tuple[int, dict[str, Any]]:
    tut_map: dict[str, Any] = {}  # tutorial url -> db id
    inserted = 0
    for t in tutorials:
        cat_key = t.get("category_db_key")
        db_cat = cat_map.get(cat_key) if cat_key else None
        sql = (
            f"INSERT INTO {tables.schema}.{tables.tutorials} "
            f"({cols.tutorial_category_id}, {cols.tutorial_title}, {cols.tutorial_description}, {cols.tutorial_url_original}, {cols.tutorial_content}) "
            f"VALUES (?, ?, ?, ?, ?);"
        )
        params = (db_cat, t.get("title"), t.get("description"), t.get("url_original"), t.get("content_html"))
        if dry_run:
            log.info("[dry-run] %s %s", sql, tuple(_safe_param(p) for p in params))
            tut_map[t["url_original"]] = t["url_original"]
        else:
            cur.execute(sql, params)
            try:
                new_id = cur.execute("SELECT SCOPE_IDENTITY();").fetchone()[0]
            except Exception:
                new_id = None
            tut_map[t["url_original"]] = new_id if new_id is not None else t["url_original"]
        inserted += 1
    return inserted, tut_map


def _insert_steps(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    steps: list[dict[str, Any]],
    tut_map: dict[str, Any],
    dry_run: bool,
) -> tuple[int, dict[tuple[str, int], Any]]:
    step_map: dict[tuple[str, int], Any] = {}
    inserted = 0
    for s in steps:
        tut_url = s.get("tutorial_url")
        if not tut_url or tut_url not in tut_map:
            continue
        db_tut = tut_map[tut_url]
        sql = (
            f"INSERT INTO {tables.schema}.{tables.tutorial_steps} "
            f"({cols.step_tutorial_id}, {cols.step_number}, {cols.step_title}, {cols.step_content}) "
            f"VALUES (?, ?, ?, ?);"
        )
        params = (db_tut, s.get("step_number"), s.get("title"), s.get("content_html"))
        if dry_run:
            log.info("[dry-run] %s %s", sql, tuple(_safe_param(p) for p in params))
            step_map[(tut_url, int(s.get("step_number") or 0))] = f"{tut_url}#step{s.get('step_number')}"
        else:
            cur.execute(sql, params)
            try:
                new_id = cur.execute("SELECT SCOPE_IDENTITY();").fetchone()[0]
            except Exception:
                new_id = None
            step_map[(tut_url, int(s.get("step_number") or 0))] = new_id
        inserted += 1
    return inserted, step_map


def _insert_media(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    media: list[dict[str, Any]],
    tut_map: dict[str, Any],
    step_map: dict[tuple[str, int], Any],
    dry_run: bool,
) -> int:
    inserted = 0
    for m in media:
        tut_url = m.get("tutorial_url")
        if not tut_url or tut_url not in tut_map:
            continue
        db_tut = tut_map[tut_url]

        step_no = m.get("tutorial_step_number")
        db_step = None
        if isinstance(step_no, int):
            db_step = step_map.get((tut_url, step_no))

        sql = (
            f"INSERT INTO {tables.schema}.{tables.media} "
            f"({cols.media_tutorial_id}, {cols.media_step_id}, {cols.media_type}, {cols.media_url}, {cols.media_file_path}, {cols.media_file_name}, {cols.media_file_size}, {cols.media_mime_type}, {cols.media_thumbnail_url}) "
            f"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
        )
        params = (
            db_tut,
            db_step,
            m.get("media_type"),
            m.get("url"),
            m.get("file_path"),
            m.get("file_name"),
            m.get("file_size"),
            m.get("mime_type"),
            m.get("thumbnail_url"),
        )
        if dry_run:
            log.info("[dry-run] %s %s", sql, tuple(_safe_param(p) for p in params))
        else:
            cur.execute(sql, params)
        inserted += 1
    return inserted


def _safe_param(p: Any) -> Any:
    # Avoid logging multi-MB HTML bodies
    if isinstance(p, str) and len(p) > 200:
        return p[:200] + "...(truncated)"
    return p


