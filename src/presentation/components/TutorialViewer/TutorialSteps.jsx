// TutorialSteps - Navegação entre passos
import React from 'react';
import ReactPlayer from 'react-player';

const TutorialSteps = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="tutorial-steps">
      <h2 className="tutorial-steps-title">Passos do Tutorial</h2>
      <ol className="tutorial-steps-list">
        {steps.map((step, index) => (
          <li key={step.Id || index} className="tutorial-step-item">
            <div className="tutorial-step-header">
              <span className="tutorial-step-number">{step.SortOrder || index + 1}</span>
              <h3 className="tutorial-step-title">{step.Title}</h3>
            </div>
            {step.Content && (
              <div 
                className="tutorial-step-content"
                dangerouslySetInnerHTML={{ __html: step.Content }}
              />
            )}
            {step.ImageUrl && (
              <img 
                src={step.ImageUrl} 
                alt={step.Title}
                className="tutorial-step-image"
                loading="lazy"
              />
            )}
            {step.VideoUrl && (
              <div className="tutorial-step-video">
                <ReactPlayer
                  url={step.VideoUrl}
                  controls
                  width="100%"
                  height="auto"
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TutorialSteps;
