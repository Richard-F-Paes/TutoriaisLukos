from __future__ import annotations

import time
from typing import Callable, TypeVar

T = TypeVar("T")


def retry(
    fn: Callable[[], T],
    *,
    retries: int,
    backoff_seconds: float,
    retry_on: tuple[type[Exception], ...] = (Exception,),
) -> T:
    last_exc: Exception | None = None
    for attempt in range(retries + 1):
        try:
            return fn()
        except retry_on as exc:  # type: ignore[misc]
            last_exc = exc
            if attempt >= retries:
                raise
            sleep_for = backoff_seconds * (2**attempt)
            time.sleep(sleep_for)
    raise last_exc or RuntimeError("retry() failed without exception")


