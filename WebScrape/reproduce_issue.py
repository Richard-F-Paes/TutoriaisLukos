
import sys
import os
# Add the current directory to sys.path so we can import src
sys.path.append(os.getcwd())

from bs4 import BeautifulSoup
# Mock logging to avoid errors if not configured
import logging
logging.basicConfig(level=logging.DEBUG)

try:
    from src.scraper.processor import _split_into_steps
    from src.scraper.step_merger import _merge_alert_steps
except ImportError as e:
    print(f"Error importing modules: {e}")
    sys.exit(1)

def test_split():
    print("Testing split logic...")
    
    # HTML that mimics the issue: An "IMPORTANTE!" paragraph followed by content
    # The current logic might split "IMPORTANTE!" into one step and the text into another
    # or group them poorly.
    html_content = """
    <html>
    <body>
        <div role="main">
            <h1>How to do something</h1>
            
            <p>First step of the tutorial.</p>
            
            <p>IMPORTANTE!</p>
            <p>This is a critical warning that must stay with the warning label.</p>
            <p>It explains why you should be careful.</p>
            
            <h2>Next Section</h2>
            <p>Continuing the tutorial...</p>
        </div>
    </body>
    </html>
    """

    soup = BeautifulSoup(html_content, "lxml")
    
    # Simulating what process_raw_page does
    print("Splitting into steps...")
    steps = _split_into_steps(soup)
    
    print(f"Raw steps found: {len(steps)}")
    for i, s in enumerate(steps):
        print(f"Step {i+1}: Title='{s.get('title')}'")
        print(f"Content: {s.get('content_html')[:100].replace(chr(10), ' ')}...")
    
    print("\nMerging alert steps...")
    merged = _merge_alert_steps(steps)
    print(f"Merged steps: {len(merged)}")
    
    issue_detected = False
    
    # Check if "IMPORTANTE!" is isolated or if the content is split
    for i, step in enumerate(merged):
        content = step.get("content_html", "")
        print(f"Final Step {i+1}: {content[:100].replace(chr(10), ' ')}...")
        
        # If we see "IMPORTANTE!" but NOT "This is a critical warning" in the same step, it's a fail
        if "IMPORTANTE!" in content and "This is a critical warning" not in content:
            print("FAILURE: 'IMPORTANTE!' found but warning text is missing from this step.")
            issue_detected = True
        
        # Or if we see the warning text but no "IMPORTANTE!" (and it wasn't merged)
        if "This is a critical warning" in content and "IMPORTANTE!" not in content:
             # Check if previous step had IMPORTANTE
             if i > 0 and "IMPORTANTE!" in merged[i-1].get("content_html", ""):
                 print("FAILURE: Warning text is separated from 'IMPORTANTE!' (in previous step).")
                 issue_detected = True

    if not issue_detected:
        print("\nSUCCESS: 'IMPORTANTE!' block seems correctly grouped (or at least not obviously split).")
    else:
        print("\nFAILURE: Issue reproduced.")

if __name__ == "__main__":
    test_split()
