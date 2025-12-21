// TutorialActions - Botões de ação (editar, compartilhar)
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext.js';
import { useEditorModal } from '../../../contexts/EditorModalContext.js';
import { useTutorialModal } from '../../../contexts/TutorialModalContext.js';
import { Edit, Share2 } from 'lucide-react';
import './TutorialActions.css';

const TutorialActions = ({ tutorial }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  const { openEditorModal } = useEditorModal();
  const { closeModal } = useTutorialModal();

  // Normalizar campos - aceitar tanto camelCase quanto PascalCase
  const tutorialId = tutorial.id || tutorial.Id;
  const title = tutorial.title || tutorial.Title || '';
  const description = tutorial.description || tutorial.Description || '';
  const shareHash = tutorial.shareHash || tutorial.ShareHash;

  const handleEdit = (e) => {
    e.preventDefault();
    if (tutorialId) {
      // Fechar modal de visualização antes de abrir o de edição
      closeModal();
      // Pequeno delay para garantir que o modal feche antes de abrir o editor
      setTimeout(() => {
        openEditorModal('tutorials', tutorialId);
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
      showTopNotification('Este tutorial ainda não possui um link de compartilhamento. Por favor, salve o tutorial novamente.');
      return;
    }

    const url = window.location.origin + `#tutorial-${shareHash}`;
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
    <div className="tutorial-actions">
      {isAuthenticated && hasPermission('edit_tutorial') && tutorialId && (
        <button
          onClick={handleEdit}
          className="btn-edit"
          title="Editar Tutorial"
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

export default TutorialActions;
