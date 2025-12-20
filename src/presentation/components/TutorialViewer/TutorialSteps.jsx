// TutorialSteps - Navegação entre passos
import React from 'react';
import ReactPlayer from 'react-player';
import './TutorialSteps.css';

const TutorialSteps = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="tutorial-steps">
      <h2 className="tutorial-steps-title">Passo a Passo</h2>
      <ol className="tutorial-steps-list">
        {steps.map((step, index) => {
          // Normalizar campos - aceitar tanto camelCase quanto PascalCase
          const stepId = step.id || step.Id || index;
          const sortOrder = step.sortOrder || step.SortOrder || index + 1;
          const title = step.title || step.Title || '';
          const content = step.content || step.Content;
          const imageUrl = step.imageUrl || step.ImageUrl;
          const videoUrl = step.videoUrl || step.VideoUrl;
          
          return (
            <li 
              key={stepId} 
              className="tutorial-step-item"
              data-step-id={stepId}
            >
              <div className="tutorial-step-header">
                <span className="tutorial-step-number">{sortOrder}</span>
                <h3 className="tutorial-step-title">{title}</h3>
              </div>
              {content && (
                <div 
                  className="tutorial-step-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="tutorial-step-image"
                  loading="lazy"
                />
              )}
              {videoUrl && (
                <div className="tutorial-step-video">
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="auto"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TutorialSteps;
