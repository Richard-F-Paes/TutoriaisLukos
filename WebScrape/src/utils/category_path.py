from __future__ import annotations

from collections.abc import Iterable
from typing import Any


def limit_category_depth(path: Any, *, max_depth: int = 2) -> list[str]:
    """
    Enforce a max depth for category paths.

    Rules:
    - None/empty -> []
    - 1 item -> [categoria] (subcategoria vazia)
    - 2+ items -> [categoria, subcategoria]
    - 3+ items -> levels 3+ are discarded (never concatenated)
    """
    if max_depth < 0:
        raise ValueError("max_depth must be >= 0")

    if not path:
        return []

    # Accept list/tuple/etc. but avoid treating strings as iterables of chars
    if isinstance(path, str):
        items: list[Any] = [path]
    elif isinstance(path, Iterable):
        items = list(path)
    else:
        items = [path]

    # Normalize to strings and drop empties
    out: list[str] = []
    for it in items:
        s = ("" if it is None else str(it)).strip()
        if s:
            out.append(s)
        if len(out) >= max_depth:
            break

    return out


