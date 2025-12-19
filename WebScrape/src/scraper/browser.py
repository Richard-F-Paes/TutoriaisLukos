from __future__ import annotations

import logging
from dataclasses import dataclass

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.edge.options import Options as EdgeOptions


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class BrowserConfig:
    browser: str  # "chrome" | "edge"
    headless: bool
    page_load_timeout_seconds: int
    user_agent: str


def create_driver(cfg: BrowserConfig) -> webdriver.Remote:
    browser = (cfg.browser or "").strip().lower()
    if browser not in {"chrome", "edge"}:
        raise ValueError(f"Unsupported browser: {cfg.browser}. Use 'edge' or 'chrome'.")

    if browser == "chrome":
        opts = ChromeOptions()
        _apply_common_options(opts, cfg)
        driver = webdriver.Chrome(options=opts)
    else:
        opts = EdgeOptions()
        _apply_common_options(opts, cfg)
        driver = webdriver.Edge(options=opts)

    driver.set_page_load_timeout(cfg.page_load_timeout_seconds)
    return driver


def _apply_common_options(opts: object, cfg: BrowserConfig) -> None:
    # Selenium docs show add_argument('--headless') as a baseline.
    # We keep it simple & stable across Edge/Chrome.
    if cfg.headless:
        getattr(opts, "add_argument")("--headless")
        getattr(opts, "add_argument")("--disable-gpu")

    getattr(opts, "add_argument")("--window-size=1920,1080")
    getattr(opts, "add_argument")(f"--user-agent={cfg.user_agent}")

    # Reduce automation noise a bit (not "stealth", just quality-of-life).
    try:
        getattr(opts, "add_experimental_option")("excludeSwitches", ["enable-automation", "enable-logging"])
    except Exception:
        pass


