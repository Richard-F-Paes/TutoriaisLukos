
import sys
import logging
from pathlib import Path
import shutil

# Add current directory to path
sys.path.append(str(Path(__file__).parent))

from src.scraper.browser import BrowserConfig, create_driver
from src.scraper.extractor import extract_page
from src.scraper.media_downloader import download_media_for_page
from src.utils.logging_utils import setup_logging

def reproduce(url):
    setup_logging("DEBUG")
    log = logging.getLogger(__name__)
    
    # Clean previous downloads for this reproduction
    test_dir = Path("test_downloads")
    if test_dir.exists():
        shutil.rmtree(test_dir)
    test_dir.mkdir()
    
    cfg = BrowserConfig(
        browser="chrome",
        headless=True,
        page_load_timeout_seconds=60,
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    )
    driver = create_driver(cfg)
    
    try:
        log.info(f"Extracting {url}...")
        page_data = extract_page(
            driver, 
            url=url, 
            base_url="https://sites.google.com/view/lukos-tutoriais",
            wait_timeout_seconds=60
        )
        
        
        # Capture debug info
        with open("debug_source.html", "w", encoding="utf-8") as f:
            f.write(driver.page_source)
        driver.save_screenshot("debug_screenshot.png")
        log.info("Saved debug_source.html and debug_screenshot.png")

        media_items = page_data.get('media', [])
        log.info(f"Extracted {len(media_items)} media items.")
        for m in media_items:
            log.info(f"Media: {m}")

        import json
        with open("reproduce_output.json", "w", encoding="utf-8") as f:
            json.dump(page_data, f, indent=2, ensure_ascii=False)
        log.info("Saved page data to reproduce_output.json")

        log.info(f"Downloading media for {page_data['title']}...")
        download_media_for_page(
            page_data,
            images_dir=test_dir / "images",
            documents_dir=test_dir / "documents",
            videos_dir=test_dir / "videos",
            user_agent="Mozilla/5.0",
            timeout_seconds=30,
            retries=3,
            backoff_seconds=1,
        )
        log.info("Download completed successfully.")
        
    except Exception as e:
        log.error(f"Caught unexpected error: {e}", exc_info=True)
    finally:
        driver.quit()

if __name__ == "__main__":
    # URL confirmed from navigation in debug_source.html
    url = "https://sites.google.com/view/lukos-tutoriais/retaguarda/cadastros/cliente/faturamento?authuser=0"
    if len(sys.argv) > 1:
        url = sys.argv[1]
    reproduce(url)
