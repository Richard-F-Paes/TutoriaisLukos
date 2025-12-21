import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { useTutorial } from '../../../hooks/useTutorials.js';
import TutorialViewer from '../TutorialViewer/TutorialViewer';
import TutorialActions from '../TutorialViewer/TutorialActions';
import CategoriesDrawer from './CategoriesDrawer';
import { LukUnifiedSearch } from '../search/LukUnifiedSearch/LukUnifiedSearch';
import './TutorialModal.css';

const TutorialModal = () => {
  const { isOpen, tutorialSlug, viewMode, stepId, closeModal } = useTutorialModal();
  const { data: tutorialData, isLoading: tutorialLoading } = useTutorial(tutorialSlug);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Escutar evento de navegação quando o modal é fechado via hash
  useEffect(() => {
    const handleNavigate = (event) => {
      if (event.detail && event.detail.path) {
        navigate(event.detail.path, { replace: true });
      }
    };

    window.addEventListener('tutorial-modal-close-navigate', handleNavigate);
    return () => {
      window.removeEventListener('tutorial-modal-close-navigate', handleNavigate);
    };
  }, [navigate]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeModal]);

  if (!isOpen || !tutorialSlug) return null;

  const tutorial = tutorialData?.data;

  return ReactDOM.createPortal(
    <>
      <div className="tutorial-modal-overlay" onClick={closeModal}>
        <div className="tutorial-modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="tutorial-modal-header">
            <button
              className="tutorial-modal-menu-button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <Menu size={24} />
            </button>
            <div className="tutorial-modal-actions">
              {!tutorialLoading && tutorial && <TutorialActions tutorial={tutorial} />}
            </div>
                  <button
                    className="tutorial-modal-close"
                    onClick={closeModal}
                    aria-label="Fechar modal"
                  >
                    <X size={28} />
                  </button>
          </div>
          <div className="tutorial-modal-search">
            <LukUnifiedSearch isModal={true} />
          </div>
          <div className="tutorial-modal-content">
            <TutorialViewer slug={tutorialSlug} viewMode={viewMode} focusStepId={stepId} />
          </div>
        </div>
      </div>
      <CategoriesDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        currentTutorial={tutorial}
      />
    </>,
    document.body
  );
};

export default TutorialModal;

