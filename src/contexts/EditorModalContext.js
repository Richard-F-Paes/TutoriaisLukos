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

  const openEditorModal = useCallback((tab = 'tutorials', tutorialId = null) => {
    setInitialTab(tab);
    setInitialTutorialId(tutorialId);
    setIsOpen(true);
    if (previousBodyOverflowRef.current === null) {
      previousBodyOverflowRef.current = document.body.style.overflow ?? '';
    }
    document.body.style.overflow = 'hidden';
  }, []);

  const closeEditorModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = previousBodyOverflowRef.current ?? '';
    previousBodyOverflowRef.current = null;
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


