import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import VideoPlaceholder from '../VideoPlaceholder/VideoPlaceholder';
import StepActions from '../StepActions/StepActions';
import './Step.css';

const Step = ({ stepNumber, title, duration, content }) => {
  const { isCurrentStep, completeStep } = useTutorial();

  const isActive = isCurrentStep(stepNumber);

  // Marca o passo como visualizado após um tempo
  React.useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        completeStep(stepNumber);
      }, 10000); // 10 segundos

      return () => clearTimeout(timer);
    }
  }, [isActive, stepNumber, completeStep]);

  if (!isActive) return null;

  return (
    <div className="tutorial-step active">
      <div className="step-header">
        <h2>{title}</h2>
        <div className="step-duration">
          <i className="fas fa-clock"></i>
          <span>{duration}</span>
        </div>
      </div>
      
      <div className="step-content">
        <VideoPlaceholder 
          title={content.videoTitle}
          description={content.videoDescription}
        />
        
        <div className="content-text">
          {content.sections.map((section, index) => (
            <div key={index}>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              {section.features && (
                <ul className="feature-list">
                  {section.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {section.configSteps && (
                <div className="config-steps">
                  {section.configSteps.map((configStep, configIndex) => (
                    <div key={configIndex} className="config-item">
                      <div className="config-number">{configIndex + 1}</div>
                      <div className="config-content">
                        <h4>{configStep.title}</h4>
                        <p>{configStep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <StepActions stepNumber={stepNumber} />
    </div>
  );
};

export default Step;
