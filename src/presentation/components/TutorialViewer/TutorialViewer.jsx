// TutorialViewer - Componente Universal para visualizar tutoriais
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useTutorial } from '../../../hooks/useTutorials.js';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import TutorialHeader from './TutorialHeader.jsx';
import TutorialContent from './TutorialContent.jsx';
import TutorialMedia from './TutorialMedia.jsx';
import TutorialSteps from './TutorialSteps.jsx';
import TutorialSidebar from './TutorialSidebar.jsx';
import TutorialActions from './TutorialActions.jsx';
import StepsNavigation from './StepsNavigation.jsx';
import './TutorialViewer.css';

const TutorialViewer = ({ slug, viewMode = 'full', focusStepId = null }) => {
  const { switchToFullView } = useTutorialModal();
  const { data, isLoading, error } = useTutorial(slug);

  // Normalizar os passos do tutorial - pode vir como tutorialSteps, Steps, ou steps
  const tutorialSteps = data?.data 
    ? (data.data.tutorialSteps || data.data.TutorialSteps || data.data.steps || data.data.Steps || [])
    : [];

  // Modo "somente passo": encontrar o passo específico
  const focusedStep = viewMode === 'step' && focusStepId
    ? tutorialSteps.find(step => (step.id || step.Id) === focusStepId)
    : null;

  // Scroll para o passo quando abrir no modo step
  useEffect(() => {
    if (viewMode === 'step' && focusStepId && focusedStep) {
      const stepId = focusedStep.id || focusedStep.Id || focusStepId;
      const element = document.querySelector(`[data-step-id="${stepId}"]`);
      if (element) {
        setTimeout(() => {
          const headerHeight = document.querySelector('.tutorial-modal-header')?.offsetHeight || 0;
          const offset = headerHeight + 20;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [viewMode, focusStepId, focusedStep]);

  if (isLoading) {
    return (
      <div className="tutorial-viewer-loading">
        <div className="loading-spinner">Carregando tutorial...</div>
      </div>
    );
  }

  if (error) {
    console.error('Erro ao carregar tutorial:', error);
    return (
      <div className="tutorial-viewer-error">
        <h2>Tutorial não encontrado</h2>
        <p>O tutorial que você está procurando não existe ou foi removido.</p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
          Slug: {slug}
        </p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="tutorial-viewer-error">
        <h2>Tutorial não encontrado</h2>
        <p>O tutorial que você está procurando não existe ou foi removido.</p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
          Slug: {slug}
        </p>
      </div>
    );
  }

  const tutorial = data.data;

  // Se estiver no modo "somente passo", renderizar apenas o passo
  if (viewMode === 'step' && focusedStep) {
    const stepId = focusedStep.id || focusedStep.Id;
    const sortOrder = focusedStep.sortOrder || focusedStep.SortOrder || 1;
    const title = focusedStep.title || focusedStep.Title || '';
    const content = focusedStep.content || focusedStep.Content;
    const imageUrl = focusedStep.imageUrl || focusedStep.ImageUrl;
    const videoUrl = focusedStep.videoUrl || focusedStep.VideoUrl;

    return (
      <div className="tutorial-viewer tutorial-viewer-step-only">
        <div className="tutorial-step-only-header">
          <div className="tutorial-step-only-badge">
            Passo {sortOrder} de {tutorialSteps.length}
          </div>
          <h2 className="tutorial-step-only-title">{title}</h2>
          <button
            onClick={switchToFullView}
            className="tutorial-step-only-button"
          >
            Ver tutorial completo
          </button>
        </div>
        <div className="tutorial-viewer-content-wrapper">
          <main className="tutorial-viewer-main">
            <div className="tutorial-step-item" data-step-id={stepId}>
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
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Modo completo (padrão)
  return (
    <div className="tutorial-viewer">
      <TutorialHeader tutorial={tutorial} />

      <div className="tutorial-viewer-content-wrapper">
        <main className="tutorial-viewer-main">
          <TutorialMedia tutorial={tutorial} />
          <TutorialContent content={tutorial.content || tutorial.Content} />
          {tutorialSteps && tutorialSteps.length > 0 && (
            <TutorialSteps steps={tutorialSteps} />
          )}
        </main>

        <aside className="tutorial-viewer-sidebar">
          {tutorialSteps && tutorialSteps.length > 0 && (
            <StepsNavigation steps={tutorialSteps} />
          )}
          <TutorialSidebar tutorial={tutorial} />
        </aside>
      </div>
    </div>
  );
};

export default TutorialViewer;
