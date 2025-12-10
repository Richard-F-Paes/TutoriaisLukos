// TutorialViewer - Componente Universal para visualizar tutoriais
import React from 'react';
import { useTutorial } from '../../../hooks/useTutorials.js';
import TutorialHeader from './TutorialHeader.jsx';
import TutorialContent from './TutorialContent.jsx';
import TutorialMedia from './TutorialMedia.jsx';
import TutorialSteps from './TutorialSteps.jsx';
import TutorialSidebar from './TutorialSidebar.jsx';
import TutorialActions from './TutorialActions.jsx';
import './TutorialViewer.css';

const TutorialViewer = ({ slug }) => {
  const { data, isLoading, error } = useTutorial(slug);

  if (isLoading) {
    return (
      <div className="tutorial-viewer-loading">
        <div className="loading-spinner">Carregando tutorial...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="tutorial-viewer-error">
        <h2>Tutorial não encontrado</h2>
        <p>O tutorial que você está procurando não existe ou foi removido.</p>
      </div>
    );
  }

  const tutorial = data.data;

  return (
    <div className="tutorial-viewer">
      <TutorialHeader tutorial={tutorial} />

      <div className="tutorial-viewer-content-wrapper">
        <main className="tutorial-viewer-main">
          <TutorialMedia tutorial={tutorial} />
          <TutorialContent content={tutorial.Content} />
          {tutorial.steps && tutorial.steps.length > 0 && (
            <TutorialSteps steps={tutorial.steps} />
          )}
          <TutorialActions tutorial={tutorial} />
        </main>

        <aside className="tutorial-viewer-sidebar">
          <TutorialSidebar tutorial={tutorial} />
        </aside>
      </div>
    </div>
  );
};

export default TutorialViewer;
