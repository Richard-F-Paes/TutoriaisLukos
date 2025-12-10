// TutorialContent - Renderiza conteúdo HTML sanitizado
import React from 'react';
import DOMPurify from 'dompurify';
import './TutorialContent.css';

const TutorialContent = ({ content }) => {
  if (!content) {
    return null;
  }

  // Sanitizar HTML
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
  });

  return (
    <div 
      className="tutorial-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default TutorialContent;
