from __future__ import annotations

import logging
import sys
import io


def setup_logging(level: str = "INFO") -> None:
    numeric_level = getattr(logging, level.upper(), logging.INFO)
    
    # Configurar encoding UTF-8 para stdout no Windows
    if sys.platform == "win32":
        # Criar handler com encoding UTF-8
        handler = logging.StreamHandler(io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace'))
    else:
        handler = logging.StreamHandler(sys.stdout)
    
    logging.basicConfig(
        level=numeric_level,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[handler],
    )


