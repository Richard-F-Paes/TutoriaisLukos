from __future__ import annotations

import logging
from dataclasses import dataclass
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class RobotsPolicy:
    base_url: str
    user_agent: str

    def _robots_url(self) -> str:
        parsed = urlparse(self.base_url)
        root = f"{parsed.scheme}://{parsed.netloc}/"
        return urljoin(root, "robots.txt")

    def can_fetch(self, url: str) -> bool:
        robots_url = self._robots_url()
        rp = RobotFileParser()
        rp.set_url(robots_url)
        try:
            rp.read()
        except Exception as exc:
            log.warning("Failed to read robots.txt (%s): %s. Allowing by default.", robots_url, exc)
            return True
        return rp.can_fetch(self.user_agent, url)


