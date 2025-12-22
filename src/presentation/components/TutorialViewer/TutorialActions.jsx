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

  const copyToClipboard = async (text) => {
    // Método 1: Clipboard API (requer contexto seguro - HTTPS)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Erro ao usar Clipboard API:', err);
        // Continua para o fallback
      }
    }

    // Método 2: Fallback usando document.execCommand (para navegadores antigos ou HTTP)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        return true;
      } else {
        throw new Error('execCommand falhou');
      }
    } catch (err) {
      console.error('Erro ao copiar para área de transferência:', err);
      return false;
    }
  };

  const handleShare = async () => {
    if (!shareHash) {
      showTopNotification('Este tutorial ainda não possui um link de compartilhamento. Por favor, salve o tutorial novamente.');
      return;
    }

    const url = window.location.origin + `#tutorial-${shareHash}`;
    
    // Tenta usar a API de compartilhamento nativa primeiro
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
        return; // Se compartilhou com sucesso, não precisa copiar
      } catch (err) {
        // Se o usuário cancelar ou ocorrer erro, tenta copiar para clipboard
        if (err.name !== 'AbortError') {
          console.warn('Erro ao compartilhar:', err);
        }
      }
    }

    // Se não usou a API de compartilhamento, copia para clipboard
    const copied = await copyToClipboard(url);
    if (copied) {
      showTopNotification('Link copiado para a área de transferência!');
    } else {
      showTopNotification('Não foi possível copiar o link. Por favor, copie manualmente: ' + url);
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
