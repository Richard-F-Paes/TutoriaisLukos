
import sys
import os
from bs4 import BeautifulSoup, Tag
import logging

# Add src to path
# Add WebScrape root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.scraper.processor import _split_into_steps

# Setup minimal logging
logging.basicConfig(level=logging.DEBUG)

def test_alert_grouping():
    html_content = """
    <html>
    <body>
        <p><strong>IMPORTANTE!</strong></p>
        <p>Essa é uma requisição de abastecimento ÚNICO;</p>
        <p>O valor liberado é o VALOR MÁXIMO QUE PODE SER CONSUMIDO, O VALOR NÃO É CUMULATIVO!</p>
        <p>Caso nenhum combustível seja informado, o produto da requisição é livre, pode ser usado em produtos e serviços no posto.</p>
        <h2>Próximo Passo</h2>
        <p>Conteúdo do próximo passo.</p>
    </body>
    </html>
    """
    
    soup = BeautifulSoup(html_content, "lxml")
    steps = _split_into_steps(soup)
    
    print(f"Total steps found: {len(steps)}")
    
    for i, step in enumerate(steps):
        print(f"Step {i+1}:")
        print(f"  Title: {step.get('title')}")
        content = step.get('content_html')
        print(f"  Content Length: {len(content)}")
        soup_step = BeautifulSoup(content, "html.parser")
        paragraphs = soup_step.find_all("p")
        print(f"  Paragraphs count: {len(paragraphs)}")
        for p in paragraphs:
            print(f"    - {p.get_text().strip()[:50]}...")

    # Verification criteria
    # Step 1 should contain all 4 paragraphs starting with IMPORTANTE!
    first_step_paragraphs = BeautifulSoup(steps[0]['content_html'], "html.parser").find_all("p")
    
    if len(first_step_paragraphs) >= 4:
        print("\nSUCCESS: Alert block grouped correctly!")
    else:
        print("\nFAILURE: Alert block was split!")

if __name__ == "__main__":
    test_alert_grouping()
