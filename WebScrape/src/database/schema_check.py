from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

import pyodbc


@dataclass(frozen=True)
class TableCheck:
    schema: str
    table: str
    required_columns: list[str]


def get_columns(conn: pyodbc.Connection, *, schema: str, table: str) -> set[str]:
    cur = conn.cursor()
    rows = cur.execute(
        """
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
        """,
        (schema, table),
    ).fetchall()
    return {r[0] for r in rows}


def check_schema(conn: pyodbc.Connection, checks: Iterable[TableCheck]) -> dict[str, list[str]]:
    missing: dict[str, list[str]] = {}
    for chk in checks:
        cols = get_columns(conn, schema=chk.schema, table=chk.table)
        need = [c for c in chk.required_columns if c not in cols]
        if need:
            missing[f"{chk.schema}.{chk.table}"] = need
    return missing


