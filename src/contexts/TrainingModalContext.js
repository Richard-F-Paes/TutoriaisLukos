import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import apiClient from '../infrastructure/api/client.js';

const TrainingModalContext = createContext();

export function TrainingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingSlug, setTrainingSlug] = useState(null);
  // Rastrear se o modal foi aberto através de um hash de treinamento compartilhado
  const openedViaHashRef = useRef(false);
  const previousBodyOverflowRef = useRef(null);
  const previousScrollYRef = useRef(null);
  const previousBodyPositionRef = useRef(null);
  const previousBodyTopRef = useRef(null);

  const openModal = useCallback((slug, options = {}) => {
    setTrainingSlug(slug);
    setIsOpen(true);
    
    // Salvar estado anterior apenas se ainda não foi salvo (evita sobrescrever se outro modal já está aberto)
    if (previousBodyOverflowRef.current === null) {
      previousBodyOverflowRef.current = document.body.style.overflow ?? '';
      previousScrollYRef.current = window.scrollY;
      previousBodyPositionRef.current = document.body.style.position ?? '';
      previousBodyTopRef.current = document.body.style.top ?? '';
      
      // Aplicar estilos para desabilitar scroll e manter posição visual
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }
    
    // Se o modal foi aberto manualmente (não via hash), resetar a flag
    // Isso garante que apenas aberturas via hash redirecionem para /tutoriais/treinamentos
    if (!window.location.hash || !window.location.hash.startsWith('#training-')) {
      openedViaHashRef.current = false;
    }
  }, []);

  const closeModal = useCallback((shouldNavigateToTrainings = false) => {
    setIsOpen(false);
    setTrainingSlug(null);
    
    // Restaurar estilos do body
    if (previousBodyOverflowRef.current !== null) {
      document.body.style.overflow = previousBodyOverflowRef.current;
      document.body.style.position = previousBodyPositionRef.current;
      document.body.style.top = previousBodyTopRef.current;
      document.body.style.width = '';
      
      // Restaurar posição do scroll
      if (previousScrollYRef.current !== null) {
        window.scrollTo(0, previousScrollYRef.current);
      }
      
      // Limpar refs
      previousBodyOverflowRef.current = null;
      previousScrollYRef.current = null;
      previousBodyPositionRef.current = null;
      previousBodyTopRef.current = null;
    }
    
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

