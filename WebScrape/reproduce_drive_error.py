
import logging
import shutil
import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

from WebScrape.src.scraper.media_downloader import _download_single_media

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

def test_download():
    # URL that caused the error (from user logs)
    # "ERROR src.scraper.media_downloader - ✗ Mídia 3/3 erro inesperado: https://www.gstatic.com/atari/embeds/83a60601c213b72fb19c1855fb0c5f26/intermedia - Drive retornou página HTML de confirmação em vez do arquivo real."
    url = "https://www.gstatic.com/atari/embeds/83a60601c213b72fb19c1855fb0c5f26/intermedia"
    
    output_dir = Path("verify_output/drive_test")
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    media_item = {
        "url": url,
        "type": "video", # Assuming it's video based on "intermedia" and previous context, or generic
        "download_url": url
    }
    
    print(f"Attempting to download: {url}")
    
    try:
        result = _download_single_media(
            media_item,
            page_slug="test_page",
            images_dir=output_dir / "images",
            documents_dir=output_dir / "docs",
            videos_dir=output_dir / "videos",
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            timeout_seconds=30,
            retries=1,
            backoff_seconds=1,
            validate_integrity=False # Disable for this test to focus on download logic
        )
        
        print("\nDownload result:")
        print(result)
        
        if result.get("downloaded") is not False:
            print("\nSUCCESS: File downloaded!")
            local_path = result.get("local_path")
            if local_path:
                print(f"File path: {local_path}")
                print(f"File size: {Path(local_path).stat().st_size} bytes")
        else:
            print(f"\nFAILURE: {result.get('download_error')}")

    except Exception as e:
        print(f"\nEXCEPTION: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_download()
