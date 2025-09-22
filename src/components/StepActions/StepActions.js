import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import './StepActions.css';

const StepActions = ({ stepNumber }) => {
  const { currentStep, totalSteps, nextStep, prevStep } = useTutorial();

  const canGoNext = currentStep < totalSteps;
  const canGoPrev = currentStep > 1;

  return (
    <div className="step-actions">
      <button 
        className="btn btn-secondary prev-step"
        onClick={prevStep}
        disabled={!canGoPrev}
      >
        <i className="fas fa-arrow-left"></i>
        Passo Anterior
      </button>
      
      {/* <button 
        className="btn btn-primary next-step"
        onClick={nextStep}
        disabled={!canGoNext}
      >
        Próximo Passo
        <i className="fas fa-arrow-right"></i>
      </button> */}
    </div>
  );
};

export default StepActions;
