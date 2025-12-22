// TrainingViewer - Componente Universal para visualizar treinamentos
import React from 'react';
import { useTraining } from '../../../hooks/useTrainings.js';
import TrainingHeader from './TrainingHeader.jsx';
import TrainingMedia from './TrainingMedia.jsx';
import TrainingActions from './TrainingActions.jsx';
import './TrainingViewer.css';

const TrainingViewer = ({ slug }) => {
  const { data, isLoading, error } = useTraining(slug);

  if (isLoading) {
    return (
      <div className="training-viewer-loading">
        <div className="loading-spinner">Carregando treinamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="training-viewer-error">
        <p>Erro ao carregar treinamento. Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="training-viewer-error">
        <p>Treinamento não encontrado.</p>
      </div>
    );
  }

  const training = data.data;

  return (
    <div className="training-viewer">
      <TrainingHeader training={training} />

      <div className="training-viewer-content-wrapper">
        <main className="training-viewer-main">
          <TrainingMedia training={training} />
        </main>
      </div>
    </div>
  );
};

export default TrainingViewer;

