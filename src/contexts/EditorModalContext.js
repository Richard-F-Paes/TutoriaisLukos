import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const EditorModalContext = createContext();

/**
 * EditorModalProvider
 * Controla abertura/fechamento do modal de edição e tab inicial.
 */
export function EditorModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTab, setInitialTab] = useState('tutorials');
  const [initialTutorialId, setInitialTutorialId] = useState(null);
  const previousBodyOverflowRef = useRef(null);
  const previousScrollYRef = useRef(null);
  const previousBodyPositionRef = useRef(null);
  const previousBodyTopRef = useRef(null);

  const openEditorModal = useCallback((tab = 'tutorials', tutorialId = null) => {
    setInitialTab(tab);
    setInitialTutorialId(tutorialId);
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
  }, []);

  const closeEditorModal = useCallback(() => {
    setIsOpen(false);
    
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
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      initialTab,
      initialTutorialId,
      openEditorModal,
      closeEditorModal,
    }),
    [isOpen, initialTab, initialTutorialId, openEditorModal, closeEditorModal]
  );

  return <EditorModalContext.Provider value={value}>{children}</EditorModalContext.Provider>;
}

export function useEditorModal() {
  const context = useContext(EditorModalContext);
  if (!context) {
    throw new Error('useEditorModal deve ser usado dentro de um EditorModalProvider');
  }
  return context;
}


