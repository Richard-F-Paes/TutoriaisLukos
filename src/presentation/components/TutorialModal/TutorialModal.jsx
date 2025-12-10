import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import TutorialViewer from '../TutorialViewer/TutorialViewer';
import './TutorialModal.css';

const TutorialModal = () => {
  const { isOpen, tutorialSlug, closeModal } = useTutorialModal();

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

  return ReactDOM.createPortal(
    <div className="tutorial-modal-overlay" onClick={closeModal}>
      <div className="tutorial-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="tutorial-modal-close"
          onClick={closeModal}
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>
        <div className="tutorial-modal-content">
          <TutorialViewer slug={tutorialSlug} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TutorialModal;

