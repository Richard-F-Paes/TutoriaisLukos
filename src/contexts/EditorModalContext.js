import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const EditorModalContext = createContext();

/**
 * EditorModalProvider
 * Controla abertura/fechamento do modal de edição e tab inicial.
 */
export function EditorModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTab, setInitialTab] = useState('tutorials');
  const previousBodyOverflowRef = useRef(null);

  const openEditorModal = useCallback((tab = 'tutorials') => {
    setInitialTab(tab);
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
      openEditorModal,
      closeEditorModal,
    }),
    [isOpen, initialTab, openEditorModal, closeEditorModal]
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


