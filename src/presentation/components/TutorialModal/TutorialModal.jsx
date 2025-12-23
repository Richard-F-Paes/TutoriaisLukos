import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { useTutorial } from '../../../hooks/useTutorials.js';
import TutorialViewer from '../TutorialViewer/TutorialViewer';
import TutorialActions from '../TutorialViewer/TutorialActions';
import CategoriesDrawer from './CategoriesDrawer';
import { LukUnifiedSearch } from '../search/LukUnifiedSearch/LukUnifiedSearch';
import './TutorialModal.css';

const TutorialModal = () => {
  const {
    isOpen,
    tutorialSlug,
    viewMode,
    stepId,
    closeModal,
    canGoBackInModal,
    canGoForwardInModal,
    goBackInModal,
    goForwardInModal,
  } = useTutorialModal();
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
              <div className="tutorial-modal-header-search">
                <button
                  type="button"
                  className="tutorial-modal-nav-btn"
                  onClick={goBackInModal}
                  disabled={!canGoBackInModal}
                  aria-label="Tutorial anterior"
                  title="Tutorial anterior"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="tutorial-modal-nav-btn"
                  onClick={goForwardInModal}
                  disabled={!canGoForwardInModal}
                  aria-label="Tutorial seguinte"
                  title="Tutorial seguinte"
                >
                  <ChevronRight size={22} />
                </button>
                <LukUnifiedSearch
                  isModal={true}
                  className="tutorial-modal-header-search-bar"
                />
              </div>
              <div className="tutorial-modal-header-actions-right">
                {!tutorialLoading && tutorial && <TutorialActions tutorial={tutorial} />}
              </div>
            </div>
                  <button
                    className="tutorial-modal-close"
                    onClick={closeModal}
                    aria-label="Fechar modal"
                  >
                    <X size={28} />
                  </button>
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

