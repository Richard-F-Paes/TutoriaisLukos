import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import './StepItem.css';

const StepItem = ({ stepNumber, title, duration }) => {
  const { goToStep, isCurrentStep, isStepCompleted } = useTutorial();

  const handleClick = () => {
    goToStep(stepNumber);
  };

  const isActive = isCurrentStep(stepNumber);
  const isCompleted = isStepCompleted(stepNumber);

  return (
    <div 
      className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={handleClick}
    >
      <div className="step-number">
        {isCompleted ? <i className="fas fa-check"></i> : stepNumber}
      </div>
      <div className="step-content">
        <h4>{title}</h4>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default StepItem;
