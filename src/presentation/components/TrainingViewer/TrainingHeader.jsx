// TrainingHeader - Cabeçalho do treinamento
import React from 'react';
import { Folder, Gauge, Clock, Award } from 'lucide-react';
import './TrainingHeader.css';

const TrainingHeader = ({ training }) => {
  // Normalizar campos - aceitar tanto camelCase quanto PascalCase
  const title = training.title || training.Title || '';
  const description = training.description || training.Description;
  const categoryName = training.category?.name || training.category?.Name || 
                       training.Category?.name || training.Category?.Name ||
                       training.categoryName || training.CategoryName;
  const categorySlug = training.category?.slug || training.category?.Slug ||
                       training.Category?.slug || training.Category?.Slug ||
                       training.categorySlug || training.CategorySlug;
  const difficulty = training.difficulty || training.Difficulty;
  const estimatedDuration = training.estimatedDuration || training.EstimatedDuration;
  const trainingType = training.trainingType || training.TrainingType;

  return (
    <header className="training-header">
      <h1 className="training-title">{title}</h1>
      
      {description && (
        <p className="training-description">{description}</p>
      )}
      
      <div className="training-meta">
        {categoryName && (
          <span className="training-category">
            <Folder size={16} />
            {categoryName}
          </span>
        )}
        {trainingType && (
          <span className="training-type">
            <Award size={16} />
            {trainingType}
          </span>
        )}
        {difficulty && (
          <span className="training-difficulty">
            <Gauge size={16} />
            {difficulty}
          </span>
        )}
        {estimatedDuration && (
          <span className="training-duration">
            <Clock size={16} />
            {estimatedDuration} min
          </span>
        )}
      </div>
    </header>
  );
};

export default TrainingHeader;

