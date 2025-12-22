// TutorialHeader - Cabeçalho do tutorial
import React from 'react';
import { Folder, Gauge, Clock, Eye } from 'lucide-react';
import './TutorialHeader.css';

const TutorialHeader = ({ tutorial }) => {
  // Normalizar campos - aceitar tanto camelCase quanto PascalCase
  const title = tutorial.title || tutorial.Title || '';
  const description = tutorial.description || tutorial.Description;
  const categoryName = tutorial.category?.name || tutorial.category?.Name || 
                       tutorial.Category?.name || tutorial.Category?.Name ||
                       tutorial.categoryName || tutorial.CategoryName;
  const categorySlug = tutorial.category?.slug || tutorial.category?.Slug ||
                       tutorial.Category?.slug || tutorial.Category?.Slug ||
                       tutorial.categorySlug || tutorial.CategorySlug;
  const difficulty = tutorial.difficulty || tutorial.Difficulty;
  const estimatedDuration = tutorial.estimatedDuration || tutorial.EstimatedDuration;
  const viewCount = tutorial.viewCount !== undefined ? tutorial.viewCount : 
                    tutorial.ViewCount !== undefined ? tutorial.ViewCount : undefined;

  const breadcrumbs = [
    { label: 'Início', path: '/' },
    { label: 'Tutoriais', path: '/tutoriais' },
    categoryName && { label: categoryName, path: `/tutoriais?categoria=${categorySlug || categoryName.toLowerCase()}` },
    { label: title, path: null },
  ].filter(Boolean);

  return (
    <header className="tutorial-header">
      <h1 className="tutorial-title">{title}</h1>
      
      {description && (
        <p className="tutorial-description">{description}</p>
      )}
      
      <div className="tutorial-meta">
        {categoryName && (
          <span className="tutorial-category">
            <Folder size={16} />
            {categoryName}
          </span>
        )}
        {difficulty && (
          <span className="tutorial-difficulty">
            <Gauge size={16} />
            {difficulty}
          </span>
        )}
        {estimatedDuration && (
          <span className="tutorial-duration">
            <Clock size={16} />
            {estimatedDuration} min
          </span>
        )}
        {viewCount !== undefined && (
          <span className="tutorial-views">
            <Eye size={16} />
            {viewCount} visualizações
          </span>
        )}
      </div>
    </header>
  );
};

export default TutorialHeader;
