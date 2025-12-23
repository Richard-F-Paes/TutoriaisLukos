import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import apiClient from '../infrastructure/api/client.js';

const TutorialModalContext = createContext();

export function TutorialModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tutorialSlug, setTutorialSlug] = useState(null);
  const [viewMode, setViewMode] = useState('full'); // 'full' | 'step'
  const [stepId, setStepId] = useState(null);
  const [modalHistoryIndex, setModalHistoryIndex] = useState(-1);
  // Rastrear se o modal foi aberto através de um hash de tutorial compartilhado
  const openedViaHashRef = useRef(false);
  const previousBodyOverflowRef = useRef(null);
  const previousScrollYRef = useRef(null);
  const previousBodyPositionRef = useRef(null);
  const previousBodyTopRef = useRef(null);
  const modalHistoryRef = useRef([]); // [{ tutorialSlug, viewMode, stepId }]
  const isOpenRef = useRef(false);
  const modalHistoryIndexRef = useRef(-1);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    modalHistoryIndexRef.current = modalHistoryIndex;
  }, [modalHistoryIndex]);

  const pushModalHistoryState = useCallback((entry, nextIdx) => {
    const url = window.location.pathname + window.location.search + window.location.hash;
    try {
      window.history.pushState(
        { __tutorialModal: true, ...entry, modalIdx: nextIdx },
        '',
        url
      );
    } catch {
      // Se pushState falhar por qualquer motivo, seguimos sem histórico.
    }
  }, []);

  const openModal = useCallback((slug, options = {}) => {
    setTutorialSlug(slug);
    setViewMode(options.viewMode || 'full');
    setStepId(options.stepId || null);
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
    // Isso garante que apenas aberturas via hash redirecionem para /tutoriais
    if (!window.location.hash || !window.location.hash.startsWith('#tutorial-')) {
      openedViaHashRef.current = false;
    }

    // Histórico interno do modal (para setas de anterior/próximo tutorial)
    // Evitar empilhar novamente quando a mudança veio de popstate
    if (!options.__fromHistory) {
      const entry = {
        tutorialSlug: slug,
        viewMode: options.viewMode || 'full',
        stepId: options.stepId ?? null,
      };

      const currentIdx = modalHistoryIndexRef.current;
      const currentEntry = modalHistoryRef.current[currentIdx] || null;
      const isSameAsCurrent =
        currentEntry &&
        currentEntry.tutorialSlug === entry.tutorialSlug &&
        currentEntry.viewMode === entry.viewMode &&
        (currentEntry.stepId ?? null) === (entry.stepId ?? null);

      if (!isSameAsCurrent) {
        // Se voltamos no histórico e abrimos outro tutorial, truncar "forward"
        if (currentIdx < modalHistoryRef.current.length - 1) {
          modalHistoryRef.current = modalHistoryRef.current.slice(0, currentIdx + 1);
        }

        modalHistoryRef.current.push(entry);
        const nextIdx = modalHistoryRef.current.length - 1;
        setModalHistoryIndex(nextIdx);
        pushModalHistoryState(entry, nextIdx);
      }
    }
  }, []);

  const closeModal = useCallback((shouldNavigateToTutorials = false) => {
    setIsOpen(false);
    setTutorialSlug(null);
    setViewMode('full');
    setStepId(null);
    
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
    
    // Se o modal foi aberto via hash de tutorial compartilhado, sinalizar para navegar
    // A navegação será feita pelo componente TutorialModal que está dentro do Router
    if (openedViaHashRef.current || shouldNavigateToTutorials) {
      openedViaHashRef.current = false;
      // Disparar evento customizado para que o TutorialModal faça a navegação
      window.dispatchEvent(new CustomEvent('tutorial-modal-close-navigate', { 
        detail: { path: '/tutoriais' } 
      }));
    } else {
      // Limpar hash da URL sem redirecionar
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Resetar histórico interno do modal
    modalHistoryRef.current = [];
    setModalHistoryIndex(-1);
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
            // Marcar que o modal foi aberto via hash de tutorial compartilhado
            openedViaHashRef.current = true;
            
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
      } else {
        // Se não há hash de tutorial, resetar a flag
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

  // Listener de popstate para navegar entre tutoriais dentro do modal
  useEffect(() => {
    const handlePopState = (event) => {
      if (!isOpenRef.current) return;
      const state = event?.state;
      if (!state || state.__tutorialModal !== true) return;

      const entry = {
        tutorialSlug: state.tutorialSlug,
        viewMode: state.viewMode || 'full',
        stepId: state.stepId ?? null,
      };

      // Atualizar índice do histórico (se existir no state)
      if (typeof state.modalIdx === 'number') {
        setModalHistoryIndex(state.modalIdx);
      } else {
        // fallback: tentar localizar entrada
        const idx = modalHistoryRef.current.findIndex((e) => {
          return (
            e.tutorialSlug === entry.tutorialSlug &&
            e.viewMode === entry.viewMode &&
            (e.stepId ?? null) === (entry.stepId ?? null)
          );
        });
        if (idx >= 0) setModalHistoryIndex(idx);
      }

      // Abrir/navegar sem empilhar novamente
      openModal(entry.tutorialSlug, { viewMode: entry.viewMode, stepId: entry.stepId, __fromHistory: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [openModal]);

  const switchToFullView = useCallback(() => {
    setViewMode('full');
    setStepId(null);
  }, []);

  const canGoBackInModal = modalHistoryIndex > 0;
  const canGoForwardInModal = modalHistoryIndex >= 0 && modalHistoryIndex < modalHistoryRef.current.length - 1;

  const goBackInModal = useCallback(() => {
    if (!canGoBackInModal) return;
    window.history.back();
  }, [canGoBackInModal]);

  const goForwardInModal = useCallback(() => {
    if (!canGoForwardInModal) return;
    window.history.forward();
  }, [canGoForwardInModal]);

  const value = {
    isOpen,
    tutorialSlug,
    viewMode,
    stepId,
    openModal,
    closeModal,
    switchToFullView,
    canGoBackInModal,
    canGoForwardInModal,
    goBackInModal,
    goForwardInModal,
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
