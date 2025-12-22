import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTrainingModal } from '../../../contexts/TrainingModalContext';
import { useTraining } from '../../../hooks/useTrainings.js';
import TrainingViewer from '../TrainingViewer/TrainingViewer';
import TrainingActions from '../TrainingViewer/TrainingActions';
import { LukUnifiedSearch } from '../search/LukUnifiedSearch/LukUnifiedSearch';
import './TrainingModal.css';

const TrainingModal = () => {
  const { isOpen, trainingSlug, closeModal } = useTrainingModal();
  const { data: trainingData, isLoading: trainingLoading } = useTraining(trainingSlug);
  const navigate = useNavigate();

  // Escutar evento de navegação quando o modal é fechado via hash
  useEffect(() => {
    const handleNavigate = (event) => {
      if (event.detail && event.detail.path) {
        navigate(event.detail.path, { replace: true });
      }
    };

    window.addEventListener('training-modal-close-navigate', handleNavigate);
    return () => {
      window.removeEventListener('training-modal-close-navigate', handleNavigate);
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

  if (!isOpen || !trainingSlug) return null;

  const training = trainingData?.data;

  return ReactDOM.createPortal(
    <>
      <div className="training-modal-overlay" onClick={closeModal}>
        <div className="training-modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="training-modal-header">
            <div className="training-modal-actions">
              {!trainingLoading && training && <TrainingActions training={training} />}
            </div>
            <button
              className="training-modal-close"
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              <X size={28} />
            </button>
          </div>
          <div className="training-modal-search">
            <LukUnifiedSearch isModal={true} />
          </div>
          <div className="training-modal-content">
            <TrainingViewer slug={trainingSlug} />
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default TrainingModal;

