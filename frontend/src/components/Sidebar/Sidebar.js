import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import StepList from '../StepList/StepList';
import './Sidebar.css';

const Sidebar = () => {
  const { progress, currentStep, totalSteps } = useTutorial();

  return (
    <div className="tutorial-sidebar">
      <div className="tutorial-progress">
        <h3>Progresso do Tutorial</h3>
        <ProgressBar progress={progress} />
        <span className="progress-text">{Math.round(progress)}% concluído</span>
      </div>
      
      <div className="tutorial-steps">
        <h3>Passos do Tutorial</h3>
        <StepList />
      </div>
    </div>
  );
};

export default Sidebar;
