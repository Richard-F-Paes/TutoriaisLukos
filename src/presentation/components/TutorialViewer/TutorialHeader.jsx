// TutorialHeader - Cabeçalho do tutorial
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import './TutorialHeader.css';

const TutorialHeader = ({ tutorial }) => {
  const breadcrumbs = [
    { label: 'Início', path: '/' },
    { label: 'Tutoriais', path: '/tutoriais' },
    tutorial.CategoryName && { label: tutorial.CategoryName, path: `/tutoriais?categoria=${tutorial.CategorySlug}` },
    { label: tutorial.Title, path: null },
  ].filter(Boolean);

  return (
    <header className="tutorial-header">
      <nav className="tutorial-breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {crumb.path ? (
              <Link to={crumb.path} className="breadcrumb-link">
                {index === 0 && <Home className="breadcrumb-icon" size={16} />}
                {crumb.label}
              </Link>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="breadcrumb-separator" size={16} />
            )}
          </React.Fragment>
        ))}
      </nav>
      
      <h1 className="tutorial-title">{tutorial.Title}</h1>
      
      {tutorial.Description && (
        <p className="tutorial-description">{tutorial.Description}</p>
      )}
      
      <div className="tutorial-meta">
        {tutorial.CategoryName && (
          <span className="tutorial-category">{tutorial.CategoryName}</span>
        )}
        {tutorial.Difficulty && (
          <span className="tutorial-difficulty">{tutorial.Difficulty}</span>
        )}
        {tutorial.EstimatedDuration && (
          <span className="tutorial-duration">{tutorial.EstimatedDuration} min</span>
        )}
        {tutorial.ViewCount !== undefined && (
          <span className="tutorial-views">{tutorial.ViewCount} visualizações</span>
        )}
      </div>
    </header>
  );
};

export default TutorialHeader;
