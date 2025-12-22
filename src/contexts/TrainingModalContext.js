import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import apiClient from '../infrastructure/api/client.js';

const TrainingModalContext = createContext();

export function TrainingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingSlug, setTrainingSlug] = useState(null);
  // Rastrear se o modal foi aberto através de um hash de treinamento compartilhado
  const openedViaHashRef = useRef(false);

  const openModal = useCallback((slug, options = {}) => {
    setTrainingSlug(slug);
    setIsOpen(true);
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
    // Se o modal foi aberto manualmente (não via hash), resetar a flag
    // Isso garante que apenas aberturas via hash redirecionem para /tutoriais/treinamentos
    if (!window.location.hash || !window.location.hash.startsWith('#training-')) {
      openedViaHashRef.current = false;
    }
  }, []);

  const closeModal = useCallback((shouldNavigateToTrainings = false) => {
    setIsOpen(false);
    setTrainingSlug(null);
    // Restaurar scroll do body
    document.body.style.overflow = 'unset';
    
    // Se o modal foi aberto via hash de treinamento compartilhado, sinalizar para navegar
    // A navegação será feita pelo componente TrainingModal que está dentro do Router
    if (openedViaHashRef.current || shouldNavigateToTrainings) {
      openedViaHashRef.current = false;
      // Disparar evento customizado para que o TrainingModal faça a navegação
      window.dispatchEvent(new CustomEvent('training-modal-close-navigate', { 
        detail: { path: '/tutoriais/treinamentos' } 
      }));
    } else {
      // Limpar hash da URL sem redirecionar
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  // Detectar hash na URL e abrir modal automaticamente
  useEffect(() => {
    const checkHashAndOpenModal = async () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#training-')) {
        const hashValue = hash.substring(10); // Remove '#training-'
        
        try {
          const response = await apiClient.get(`/api/v1/trainings/by-hash/${hashValue}`);
          const training = response.data?.data;
          
          if (training && training.slug) {
            // Marcar que o modal foi aberto via hash de treinamento compartilhado
            openedViaHashRef.current = true;
            
            openModal(training.slug);
          }
        } catch (error) {
          console.error('Erro ao buscar treinamento por hash:', error);
          // Se não encontrar, limpar hash inválido
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        // Se não há hash de treinamento, resetar a flag
        openedViaHashRef.current = false;
      }
    };

    // Verificar hash ao montar
    checkHashAndOpenModal();

    // Listener para mudanças no hash
    const handleHashChange = () => {
      checkHashAndOpenModal();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [openModal]);

  const value = {
    isOpen,
    trainingSlug,
    openModal,
    closeModal,
  };

  return (
    <TrainingModalContext.Provider value={value}>
      {children}
    </TrainingModalContext.Provider>
  );
}

export function useTrainingModal() {
  const context = useContext(TrainingModalContext);
  if (!context) {
    throw new Error('useTrainingModal deve ser usado dentro de um TrainingModalProvider');
  }
  return context;
}

