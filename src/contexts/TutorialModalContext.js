import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import apiClient from '../infrastructure/api/client.js';

const TutorialModalContext = createContext();

export function TutorialModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tutorialSlug, setTutorialSlug] = useState(null);
  const [viewMode, setViewMode] = useState('full'); // 'full' | 'step'
  const [stepId, setStepId] = useState(null);

  const openModal = useCallback((slug, options = {}) => {
    setTutorialSlug(slug);
    setViewMode(options.viewMode || 'full');
    setStepId(options.stepId || null);
    setIsOpen(true);
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTutorialSlug(null);
    setViewMode('full');
    setStepId(null);
    // Restaurar scroll do body
    document.body.style.overflow = 'unset';
    // Limpar hash da URL
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Detectar hash na URL e abrir modal automaticamente
  useEffect(() => {
    const checkHashAndOpenModal = async () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#tutorial-')) {
        const hashValue = hash.substring(10); // Remove '#tutorial-'
        // Separar hash de parâmetros de query se houver (ex: #tutorial-abc123?step=5)
        const [shareHash, queryString] = hashValue.split('?');
        
        try {
          const response = await apiClient.get(`/api/v1/tutorials/by-hash/${shareHash}`);
          const tutorial = response.data?.data;
          
          if (tutorial && tutorial.slug) {
            // Verificar se há parâmetro de passo na query string
            let stepParam = null;
            if (queryString) {
              const urlParams = new URLSearchParams(queryString);
              stepParam = urlParams.get('step');
            }
            
            openModal(tutorial.slug, {
              viewMode: stepParam ? 'step' : 'full',
              stepId: stepParam ? parseInt(stepParam) : null,
            });
          }
        } catch (error) {
          console.error('Erro ao buscar tutorial por hash:', error);
          // Se não encontrar, limpar hash inválido
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
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

  const switchToFullView = useCallback(() => {
    setViewMode('full');
    setStepId(null);
  }, []);

  const value = {
    isOpen,
    tutorialSlug,
    viewMode,
    stepId,
    openModal,
    closeModal,
    switchToFullView,
  };

  return (
    <TutorialModalContext.Provider value={value}>
      {children}
    </TutorialModalContext.Provider>
  );
}

export function useTutorialModal() {
  const context = useContext(TutorialModalContext);
  if (!context) {
    throw new Error('useTutorialModal deve ser usado dentro de um TutorialModalProvider');
  }
  return context;
}

