// TrainingActions - Botões de ação (editar, compartilhar)
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext.js';
import { useEditorModal } from '../../../contexts/EditorModalContext.js';
import { useTrainingModal } from '../../../contexts/TrainingModalContext.js';
import { Edit, Share2 } from 'lucide-react';
import './TrainingActions.css';

const TrainingActions = ({ training }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  const { openEditorModal } = useEditorModal();
  const { closeModal } = useTrainingModal();

  // Normalizar campos - aceitar tanto camelCase quanto PascalCase
  const trainingId = training.id || training.Id;
  const title = training.title || training.Title || '';
  const description = training.description || training.Description || '';
  const shareHash = training.shareHash || training.ShareHash;

  const handleEdit = (e) => {
    e.preventDefault();
    if (trainingId) {
      // Fechar modal de visualização antes de abrir o de edição
      closeModal();
      // Pequeno delay para garantir que o modal feche antes de abrir o editor
      setTimeout(() => {
        openEditorModal('trainings', trainingId);
      }, 100);
    }
  };

  const showTopNotification = (message) => {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.top-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Cria o elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'top-notification';
    notification.textContent = message;
    
    // Adiciona ao body
    document.body.appendChild(notification);
    
    // Trigger reflow para garantir que a animação funciona
    notification.offsetHeight;
    
    // Adiciona a classe para fazer aparecer
    notification.classList.add('show');
    
    // Remove após 3 segundos com fade out
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
      
      // Remove do DOM após a animação
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 2500);
  };

  const handleShare = () => {
    if (!shareHash) {
      showTopNotification('Este treinamento ainda não possui um link de compartilhamento. Por favor, salve o treinamento novamente.');
      return;
    }

    const url = window.location.origin + `#training-${shareHash}`;
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      }).catch(() => {
        // Se o usuário cancelar, não fazer nada
      });
    } else {
      navigator.clipboard.writeText(url);
      showTopNotification('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="training-actions">
      {isAuthenticated && hasPermission('edit_training') && trainingId && (
        <button
          onClick={handleEdit}
          className="btn-edit"
          title="Editar Treinamento"
        >
          <Edit size={20} />
        </button>
      )}

      <button onClick={handleShare} className="btn-share" title="Compartilhar">
        <Share2 size={20} />
      </button>
    </div>
  );
};

export default TrainingActions;

