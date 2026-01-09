
import sys
import logging
from pathlib import Path
from bs4 import BeautifulSoup

# Add current directory to path
sys.path.append(str(Path(__file__).parent))

from src.scraper.browser import BrowserConfig, create_driver
from src.scraper.extractor import extract_page, _extract_media
from src.utils.logging_utils import setup_logging

def audit_media(url):
    setup_logging("DEBUG")
    log = logging.getLogger(__name__)
    
    cfg = BrowserConfig(
        browser="chrome",
        headless=True,
        page_load_timeout_seconds=60,
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    )
    driver = create_driver(cfg)
    
    try:
        log.info(f"Navigating to {url}...")
        driver.get(url)
        
        # Get raw soup
        soup = BeautifulSoup(driver.page_source, "lxml")
        
        # 1. RAW COUNTS
        all_imgs = soup.find_all("img")
        all_iframes = soup.find_all("iframe")
        drive_embeds = soup.find_all("div", attrs={"data-embed-doc-id": True})
        
        print("\n" + "="*50)
        print("RAW DOM AUDIT")
        print("="*50)
        print(f"Total <img> tags: {len(all_imgs)}")
        print(f"Total <iframe> tags: {len(all_iframes)}")
        print(f"Total Drive Embed divs: {len(drive_embeds)}")
        
        # 2. RUN EXTRACTOR
        print("\n" + "="*50)
        print("RUNNING EXTRACTOR")
        print("="*50)
        # We manually call _extract_media to see what it picks up
        # We need base_url for normalization
        base_url = "https://sites.google.com/view/lukos-tutoriais"
        extracted = _extract_media(soup, base_url=base_url, page_url=url, remove_size_params=True)
        
        print(f"Extracted Media Items: {len(extracted)}")
        
        extracted_urls = {m.url for m in extracted}
        
        # 3. ANALYZE MISSED ITEMS
        print("\n" + "="*50)
        print("MISSED ITEM ANALYSIS")
        print("="*50)
        
        # Check missed images
        print(f"\n--- IMAGES (Total {len(all_imgs)}) ---")
        missed_imgs = 0
        for img in all_imgs:
            src = img.get("src") or img.get("data-src")
            if not src:
                continue
            
            # Simple normalization check (this is loose, just for audit)
            # In reality extractor does full normalization
            is_extracted = False
            for e_url in extracted_urls:
                if src in str(e_url) or (str(e_url) in src): 
                    is_extracted = True
                    break
            
            if not is_extracted:
                missed_imgs += 1
                classes = img.get("class", [])
                parent = img.parent.name if img.parent else "None"
                print(f"[MISSED] Src: {src[:80]}... | Class: {classes} | Parent: {parent}")
                
        print(f"Total Missed Images: {missed_imgs}")

    except Exception as e:
        log.error(f"Error: {e}", exc_info=True)
    finally:
        driver.quit()

if __name__ == "__main__":
    url = "https://sites.google.com/view/lukos-tutoriais/fatura-web/reqabastecimento"
    if len(sys.argv) > 1:
        url = sys.argv[1]
    audit_media(url)
