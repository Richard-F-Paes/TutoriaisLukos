
import sys
import logging
from pathlib import Path
from bs4 import BeautifulSoup
import time

# Add current directory to path
sys.path.append(str(Path(__file__).parent))

from src.scraper.browser import BrowserConfig, create_driver

def find_url(target_title):
    setup_logging("INFO")
    log = logging.getLogger(__name__)
    
    cfg = BrowserConfig(
        browser="chrome",
        headless=True,
        page_load_timeout_seconds=60,
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    )
    driver = create_driver(cfg)
    
    try:
        base_url = "https://sites.google.com/view/lukos-tutoriais"
        log.info(f"Navigating to {base_url}...")
        driver.get(base_url)
        time.sleep(5)
        
        soup = BeautifulSoup(driver.page_source, "lxml")
        links = soup.find_all("a", href=True)
        
        found = False
        for link in links:
            text = link.get_text(" ", strip=True)
            href = link.get("href")
            if target_title.lower() in text.lower():
                print(f"FOUND: Title='{text}' | URL='{href}'")
                found = True
        
        if not found:
            print(f"Not found: {target_title}")
            
            # Try searching all text
            print("Listing all links found:")
            for link in links:
                text = link.get_text(" ", strip=True)
                if len(text) > 3:
                     print(f" - {text}: {link.get('href')}")

    except Exception as e:
        log.error(f"Error: {e}", exc_info=True)
    finally:
        driver.quit()

from src.utils.logging_utils import setup_logging

if __name__ == "__main__":
    # Force stdin/stdout to utf-8 if possible, or just be careful
    sys.stdout.reconfigure(encoding='utf-8', errors='replace') if hasattr(sys.stdout, 'reconfigure') else None
    
    target = "Ticket Médio Por Dia"
    if len(sys.argv) > 1:
        target = sys.argv[1]
    find_url(target)
