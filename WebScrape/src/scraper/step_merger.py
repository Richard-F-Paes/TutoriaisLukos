from bs4 import BeautifulSoup, Tag

def _merge_alert_steps(steps: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    Merge steps that differ only by an alert title (IMPORTANTE!, ATENÇÃO, etc.)
    with the next step.
    
    Example:
    Step 4: IMPORTANTE!
    Step 5: Content...
    -> Merged Step 4: IMPORTANTE! Content...
    """
    if not steps:
        return []
    
    merged_steps = []
    i = 0
    while i < len(steps):
        current = steps[i]
        
        # Check if it's an alert step
        title = (current.get("title") or "").strip().upper()
        
        # Keywords to trigger merge
        alert_keywords = [
            "IMPORTANTE!", "ATENÇÃO", "ATENCAO", "OBSERVAÇÃO", "OBSERVACAO", "NOTA", "CUIDADO",
            "IMPORTANTE", "ATENÇÃO:", "OBSERVAÇÃO:", "NOTA:"
        ]
        is_alert = any(k in title for k in alert_keywords)
        
        # Also check if title is just "IMPORTANTE" without !
        # (Already handled by the Expanded list above, but keeping the logic if specific exact match was intended previously)
        if not is_alert and title.strip().upper() in ["IMPORTANTE", "ATENÇÃO", "ATENCAO", "OBSERVAÇÃO", "OBSERVACAO", "NOTA", "CUIDADO"]:
            is_alert = True
            
        if is_alert and i + 1 < len(steps):
            next_step = steps[i + 1]
            
            # Merge logic
            # 1. Combine titles
            next_title = next_step.get("title")
            new_title = f"{current.get('title')} {next_title}" if next_title else current.get("title")
            
            # 2. Combine content
            # Remove the alert heading/text from current content to avoid redundancy
            current_html = current.get("content_html", "")
            try:
                soup = BeautifulSoup(current_html, "lxml")
                # Find and remove the element containing the title
                # Usually it's a heading (h1-h6) or a paragraph or strong tag
                for elem in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "strong", "b", "div"]):
                    elem_text = elem.get_text(" ", strip=True).upper()
                    # If element text is essentially the title (allowing for some noise)
                    if elem_text == title or elem_text in title or title in elem_text:
                        # Only cleanup if it's short (don't delete a whole paragraph if it just contains the word)
                        if len(elem_text) < len(title) + 20: 
                            elem.decompose()
                            break # Assume only one title element needs removal
                
                # Check if we removed everything meaningful
                cleaned_text = soup.get_text(strip=True)
                if not cleaned_text:
                    # If empty, just use empty string
                    current_clean_html = ""
                else:
                    # If body/html/p tags remain empty, cleanup might be needed, but str(soup) is safer
                    current_clean_html = str(soup)
                    # Removing html/body tags that lxml adds
                    if "<body>" in current_clean_html:
                        current_clean_html = soup.body.decode_contents()
            except Exception:
                current_clean_html = current_html
                
            new_content = current_clean_html + next_step.get("content_html", "")
            
            # 3. Combine media
            new_media = (current.get("media") or []) + (next_step.get("media") or [])
            
            # 4. Use next step's logic
            
            merged_step = {
                "id": current.get("id"), 
                "tutorial_url": current.get("tutorial_url"),
                "step_number": current.get("step_number"), 
                "title": new_title,
                "content_html": new_content,
                "media": new_media,
                # merge extra specific fields
                "image_url": current.get("image_url") or next_step.get("image_url"),
                "video_url": current.get("video_url") or next_step.get("video_url")
            }
            
            merged_steps.append(merged_step)
            i += 2 # Skip next step as it is merged
            
        else:
            merged_steps.append(current)
            i += 1
            
    return merged_steps
