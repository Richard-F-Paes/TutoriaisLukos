
import sys
import logging
import json
from pathlib import Path
import shutil
import time

# Add current directory to path
sys.path.append(str(Path(__file__).parent))

from config import load_settings
from src.scraper.browser import BrowserConfig, create_driver
from src.scraper.extractor import extract_page
from src.scraper.media_downloader import download_media_for_page
from src.scraper.processor import process_raw_page
from src.database.inserter import insert_all
from src.database.sqlserver import SqlServerConfig, connect as db_connect
from src.utils.logging_utils import setup_logging
from src.utils.json_io import write_json
from src.utils.urls import normalize_url

def verify_scrape(url):
    setup_logging("DEBUG")
    log = logging.getLogger(__name__)
    
    # Load settings
    settings = load_settings()
    
    # Clean previous downloads for this verif
    test_dir = Path("verify_output")
    if test_dir.exists():
        shutil.rmtree(test_dir)
    test_dir.mkdir()
    
    # Override settings directories to point to local verification dir
    # But for media download we might want to use the actual paths or local ones
    # Let's use local ones for verification to avoid messing up the main data folder immediately
    # actually user said "subir no banco de dados", so maybe we should use real paths?
    # but let's first see if it works.
    
    # Logic: extract -> save raw -> download -> save raw updated -> proces -> save processed -> insert
    
    try:
        # 1. EXTRACT
        log.info(f"Extracting {url}...")
        cfg = BrowserConfig(
            browser="chrome",
            headless=True,
            page_load_timeout_seconds=60,
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        )
        driver = create_driver(cfg)
        try:
            raw_data = extract_page(
                driver, 
                url=url, 
                base_url="https://sites.google.com/view/lukos-tutoriais",
                wait_timeout_seconds=60
            )
        finally:
            driver.quit()
        
        raw_path = test_dir / "raw.json"
        write_json(raw_path, raw_data)
        log.info(f"Raw data parsed. Found {len(raw_data['media'])} media items.")
        
        # 2. DOWNLOAD MEDIA
        log.info("Downloading media...")
        # We download to a 'media' subdir in verify_output
        images_dir = test_dir / "images"
        documents_dir = test_dir / "documents" 
        videos_dir = test_dir / "videos"
        images_dir.mkdir(exist_ok=True)
        documents_dir.mkdir(exist_ok=True)
        videos_dir.mkdir(exist_ok=True)
        
        updated_data = download_media_for_page(
            raw_data,
            images_dir=images_dir,
            documents_dir=documents_dir,
            videos_dir=videos_dir,
            user_agent="Mozilla/5.0",
            timeout_seconds=30,
            retries=3,
            backoff_seconds=1,
        )
        write_json(test_dir / "downloaded.json", updated_data)
        
        media_count = len(updated_data.get("media") or [])
        downloaded_count = sum(1 for m in updated_data.get("media") or [] if m.get("downloaded"))
        log.info(f"Media download complete. Items: {media_count}, Downloaded: {downloaded_count}")
        
        # 3. PROCESS
        log.info("Processing extracted data...")
        processed = process_raw_page(updated_data)
        
        tutorial = processed["tutorial"]
        steps = processed["steps"]
        media = processed["media"]
        
        log.info(f"Tutorial Title: {tutorial.get('title')}")
        log.info(f"Steps found: {len(steps)}")
        for s in steps:
            log.info(f"  Step {s['step_number']}: {s.get('title') or '(no title)'}")
            # log.info(f"    Content preview: {s.get('content_html')[:100]}...")
            if s.get('image_url'):
                log.info(f"    Image: {s.get('image_url')}")
        
        log.info(f"Media rows mapped: {len(media)}")
        for m in media:
            log.info(f"  Media: {m['media_type']} - {m['url']} (Step: {m['tutorial_step_number']})")
            
        write_json(test_dir / "processed_tutorial.json", tutorial)
        write_json(test_dir / "processed_steps.json", {"steps": steps})
        write_json(test_dir / "processed_media.json", {"media": media})
        
        # 4. INSERT TO DB
        log.info("Attempting DB insertion...")
        
        # We need to construct the 'processed' dict structure expected by insert_all
        # categories needs to be derived or mocked
        # Since we are inserting a single tutorial, we might need its category
        
        # Deriving category from path
        cat_path = tutorial.get("category_path") or []
        categories = []
        parent_id = None
        current_cat_id = None
        
        for name in cat_path:
             # simple mock ID generation matching utils
            from src.utils.urls import url_id
            cat_id = url_id(f"{parent_id or 'root'}::{name}")
            categories.append({
                "id": cat_id,
                "name": name,
                "parent_id": parent_id
            })
            parent_id = cat_id
            current_cat_id = cat_id
            
        if current_cat_id:
            tutorial["category_db_key"] = current_cat_id
            
        processed_data = {
            "categories": categories,
            "tutorials": [tutorial],
            "steps": steps,
            "media": media
        }
        
        cfg_db = SqlServerConfig(
            driver=settings.sqlserver_driver,
            server=settings.sqlserver_server,
            database=settings.sqlserver_database,
            trusted_connection=settings.sqlserver_trusted_connection,
            username=settings.sqlserver_username,
            password=settings.sqlserver_password,
            port=settings.sqlserver_port,
        )
        
        conn = db_connect(cfg_db)
        try:
            result = insert_all(
                conn,
                tables=settings.tables,
                cols=settings.columns,
                processed=processed_data,
                dry_run=False, # User wants it uploaded
                default_user_id=settings.default_user_id,
            )
            log.info(f"Insertion result: Tutorials={result.tutorials_inserted}, Steps={result.steps_inserted}, Media={result.media_inserted}")
        except Exception as e:
            log.error(f"DB Insertion failed: {e}", exc_info=True)
        finally:
            conn.close()

    except Exception as e:
        log.error(f"Verification failed: {e}", exc_info=True)

if __name__ == "__main__":
    url = "https://sites.google.com/view/lukos-tutoriais/retaguarda/cadastros/cliente/cliente_cpf?authuser=0"
    if len(sys.argv) > 1:
        url = sys.argv[1]
    
    # Normalize URL if needed (strip authuser)
    # The extractor normally handles it but let's be safe
    # url = normalize_url(url) 
    
    verify_scrape(url)
