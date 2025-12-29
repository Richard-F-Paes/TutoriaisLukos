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

    # Performance optimizations: disable images to speed up page loads
    prefs = {
        "profile.managed_default_content_settings.images": 2,  # Disable images
        "profile.default_content_setting_values.notifications": 2,  # Disable notifications
    }
    try:
        getattr(opts, "add_experimental_option")("prefs", prefs)
    except Exception:
        pass

    # Additional performance arguments (safe and widely supported)
    getattr(opts, "add_argument")("--disable-extensions")
    getattr(opts, "add_argument")("--no-sandbox")
    getattr(opts, "add_argument")("--disable-dev-shm-usage")
    getattr(opts, "add_argument")("--disable-background-networking")
    getattr(opts, "add_argument")("--disable-sync")
    getattr(opts, "add_argument")("--disable-features=TranslateUI")
    getattr(opts, "add_argument")("--disable-ipc-flooding-protection")
    getattr(opts, "add_argument")("--disable-hang-monitor")
    getattr(opts, "add_argument")("--disable-prompt-on-repost")
    getattr(opts, "add_argument")("--no-first-run")
    getattr(opts, "add_argument")("--safebrowsing-disable-auto-update")
    getattr(opts, "add_argument")("--enable-automation")
    getattr(opts, "add_argument")("--password-store=basic")
    
    # Suprimir erros e warnings do Chrome/Edge que não afetam funcionalidade
    getattr(opts, "add_argument")("--disable-logging")
    getattr(opts, "add_argument")("--log-level=3")  # Apenas erros fatais
    getattr(opts, "add_argument")("--silent")
    getattr(opts, "add_argument")("--disable-component-extensions-with-background-pages")
    
    # Desabilitar funcionalidades que geram esses erros específicos
    getattr(opts, "add_argument")("--disable-features=EdgeIdentity")
    getattr(opts, "add_argument")("--disable-features=EdgeAccount")
    getattr(opts, "add_argument")("--disable-features=TaskManager")
    
    # Desabilitar WebGL/GPU para evitar avisos (não necessário para scraping)
    getattr(opts, "add_argument")("--disable-webgl")
    getattr(opts, "add_argument")("--disable-3d-apis")
    getattr(opts, "add_argument")("--disable-gpu-compositing")
    # Usar SwiftShader como fallback seguro (sugerido pelo próprio Chrome)
    getattr(opts, "add_argument")("--enable-unsafe-swiftshader")

    # Reduce automation noise a bit (not "stealth", just quality-of-life).
    try:
        getattr(opts, "add_experimental_option")("excludeSwitches", ["enable-automation", "enable-logging"])
    except Exception:
        pass


