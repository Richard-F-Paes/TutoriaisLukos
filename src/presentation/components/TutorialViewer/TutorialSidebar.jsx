// TutorialSidebar - Tutoriais relacionados
import React from 'react';
import { Link } from 'react-router-dom';
import { useTutorials } from '../../../hooks/useTutorials.js';

const TutorialSidebar = ({ tutorial }) => {
  // Normalizar campos
  const categoryId = tutorial.categoryId || tutorial.CategoryId ||
                     tutorial.category?.id || tutorial.Category?.Id;
  const tutorialId = tutorial.id || tutorial.Id;
  
  const { data: relatedTutorials } = useTutorials({
    categoryId: categoryId,
    limit: 5,
  });

  // Filtrar apenas tutoriais publicados
  const publishedRelated = relatedTutorials?.data?.filter(t => {
    const isPublished = t.isPublished || t.IsPublished || false;
    const relatedId = t.id || t.Id;
    return isPublished && relatedId !== tutorialId;
  }) || [];

  return (
    <aside className="tutorial-sidebar">
      {publishedRelated.length > 0 && (
        <div className="tutorial-related">
          <h3 className="tutorial-related-title">Tutoriais Relacionados</h3>
          <ul className="related-list">
            {publishedRelated.slice(0, 3).map(related => {
              const relatedSlug = related.slug || related.Slug;
              const relatedTitle = related.title || related.Title;
              return (
                <li key={related.id || related.Id}>
                  <Link 
                    to={`/tutoriais/${relatedSlug}`}
                    onClick={(e) => {
                      // Fechar modal ao clicar em um tutorial relacionado
                      const modal = document.querySelector('.tutorial-modal-overlay');
                      if (modal) {
                        e.preventDefault();
                        window.location.href = `/tutoriais/${relatedSlug}`;
                      }
                    }}
                  >
                    {relatedTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default TutorialSidebar;
