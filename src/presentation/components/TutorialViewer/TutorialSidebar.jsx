// TutorialSidebar - Índice e tutoriais relacionados
import React from 'react';
import { Link } from 'react-router-dom';
import { useTutorials } from '../../../hooks/useTutorials.js';

const TutorialSidebar = ({ tutorial }) => {
  const { data: relatedTutorials } = useTutorials({
    categoryId: tutorial.CategoryId,
    limit: 5,
  });

  return (
    <aside className="tutorial-sidebar">
      {tutorial.Tags && tutorial.Tags.length > 0 && (
        <div className="tutorial-tags">
          <h3>Tags</h3>
          <div className="tags-list">
            {tutorial.Tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {relatedTutorials?.data && relatedTutorials.data.length > 0 && (
        <div className="tutorial-related">
          <h3>Tutoriais Relacionados</h3>
          <ul className="related-list">
            {relatedTutorials.data
              .filter(t => t.Id !== tutorial.Id)
              .slice(0, 5)
              .map(related => (
                <li key={related.Id}>
                  <Link to={`/tutoriais/${related.Slug}`}>
                    {related.Title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default TutorialSidebar;
