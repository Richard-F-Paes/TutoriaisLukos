from __future__ import annotations

from dataclasses import dataclass

import pyodbc


@dataclass(frozen=True)
class SqlServerConfig:
    driver: str
    server: str
    database: str
    trusted_connection: bool
    username: str | None = None
    password: str | None = None


def build_connection_string(cfg: SqlServerConfig) -> str:
    parts: list[str] = [
        f"DRIVER={{{cfg.driver}}}",
        f"SERVER={cfg.server}",
        f"DATABASE={cfg.database}",
        "TrustServerCertificate=yes",
    ]

    if cfg.trusted_connection:
        parts.append("Trusted_Connection=yes")
    else:
        if not cfg.username or not cfg.password:
            raise ValueError("SQL Server username/password required when trusted connection is disabled.")
        parts.append(f"UID={cfg.username}")
        parts.append(f"PWD={cfg.password}")

    return ";".join(parts) + ";"


def connect(cfg: SqlServerConfig) -> pyodbc.Connection:
    conn_str = build_connection_string(cfg)
    return pyodbc.connect(conn_str)


