import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial do tutorial
const initialState = {
  currentStep: 1,
  totalSteps: 6,
  completedSteps: [],
  isPlaying: false,
  progress: 0
};

// Tipos de ações
const TUTORIAL_ACTIONS = {
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  COMPLETE_STEP: 'COMPLETE_STEP',
  SET_PLAYING: 'SET_PLAYING',
  LOAD_PROGRESS: 'LOAD_PROGRESS',
  RESET_PROGRESS: 'RESET_PROGRESS'
};

// Reducer para gerenciar estado
function tutorialReducer(state, action) {
  switch (action.type) {
    case TUTORIAL_ACTIONS.SET_CURRENT_STEP:
      const newStep = Math.max(1, Math.min(action.payload, state.totalSteps));
      const newProgress = ((newStep - 1) / (state.totalSteps - 1)) * 100;
      return {
        ...state,
        currentStep: newStep,
        progress: newProgress
      };

    case TUTORIAL_ACTIONS.NEXT_STEP:
      if (state.currentStep < state.totalSteps) {
        const nextStep = state.currentStep + 1;
        const progress = ((nextStep - 1) / (state.totalSteps - 1)) * 100;
        return {
          ...state,
          currentStep: nextStep,
          progress
        };
      }
      return state;

    case TUTORIAL_ACTIONS.PREV_STEP:
      if (state.currentStep > 1) {
        const prevStep = state.currentStep - 1;
        const progress = ((prevStep - 1) / (state.totalSteps - 1)) * 100;
        return {
          ...state,
          currentStep: prevStep,
          progress
        };
      }
      return state;

    case TUTORIAL_ACTIONS.COMPLETE_STEP:
      const stepToComplete = action.payload;
      if (!state.completedSteps.includes(stepToComplete)) {
        return {
          ...state,
          completedSteps: [...state.completedSteps, stepToComplete]
        };
      }
      return state;

    case TUTORIAL_ACTIONS.SET_PLAYING:
      return {
        ...state,
        isPlaying: action.payload
      };

    case TUTORIAL_ACTIONS.LOAD_PROGRESS:
      return {
        ...state,
        ...action.payload
      };

    case TUTORIAL_ACTIONS.RESET_PROGRESS:
      return initialState;

    default:
      return state;
  }
}

// Contexto do tutorial
const TutorialContext = createContext();

// Provider do contexto
export function TutorialProvider({ children }) {
  const [state, dispatch] = useReducer(tutorialReducer, initialState);

  // Carrega progresso salvo ao inicializar
  useEffect(() => {
    const savedProgress = localStorage.getItem('tutorialProgress');
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        dispatch({
          type: TUTORIAL_ACTIONS.LOAD_PROGRESS,
          payload: progressData
        });
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  }, []);

  // Salva progresso automaticamente
  useEffect(() => {
    const progressData = {
      currentStep: state.currentStep,
      completedSteps: state.completedSteps,
      progress: state.progress,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('tutorialProgress', JSON.stringify(progressData));
  }, [state.currentStep, state.completedSteps, state.progress]);

  // Funções de navegação
  const goToStep = (stepNumber) => {
    dispatch({
      type: TUTORIAL_ACTIONS.SET_CURRENT_STEP,
      payload: stepNumber
    });
  };

  const nextStep = () => {
    dispatch({ type: TUTORIAL_ACTIONS.NEXT_STEP });
  };

  const prevStep = () => {
    dispatch({ type: TUTORIAL_ACTIONS.PREV_STEP });
  };

  const completeStep = (stepNumber) => {
    dispatch({
      type: TUTORIAL_ACTIONS.COMPLETE_STEP,
      payload: stepNumber
    });
  };

  const setPlaying = (isPlaying) => {
    dispatch({
      type: TUTORIAL_ACTIONS.SET_PLAYING,
      payload: isPlaying
    });
  };

  const resetProgress = () => {
    dispatch({ type: TUTORIAL_ACTIONS.RESET_PROGRESS });
    localStorage.removeItem('tutorialProgress');
  };

  // Verifica se um passo está completo
  const isStepCompleted = (stepNumber) => {
    return state.completedSteps.includes(stepNumber);
  };

  // Verifica se um passo é o atual
  const isCurrentStep = (stepNumber) => {
    return state.currentStep === stepNumber;
  };

  const value = {
    ...state,
    goToStep,
    nextStep,
    prevStep,
    completeStep,
    setPlaying,
    resetProgress,
    isStepCompleted,
    isCurrentStep
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}

// Hook para usar o contexto
export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial deve ser usado dentro de um TutorialProvider');
  }
  return context;
}
