import React, { createContext, useContext, useState, useCallback } from 'react';

const TutorialModalContext = createContext();

export function TutorialModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tutorialSlug, setTutorialSlug] = useState(null);

  const openModal = useCallback((slug) => {
    setTutorialSlug(slug);
    setIsOpen(true);
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTutorialSlug(null);
    // Restaurar scroll do body
    document.body.style.overflow = 'unset';
  }, []);

  const value = {
    isOpen,
    tutorialSlug,
    openModal,
    closeModal,
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

