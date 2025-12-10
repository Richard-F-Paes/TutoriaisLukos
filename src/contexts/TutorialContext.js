import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import tutorialProgressService from '../services/tutorialProgressService.js';

// Estado inicial do tutorial
const initialState = {
  tutorialId: null,
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
export function TutorialProvider({ children, tutorialId = null }) {
  const [state, dispatch] = useReducer(tutorialReducer, {
    ...initialState,
    tutorialId
  });

  // Carrega progresso salvo ao inicializar ou quando tutorialId mudar
  useEffect(() => {
    const loadProgress = async () => {
      if (!tutorialId) {
        // Fallback para progresso genérico sem tutorialId
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
        return;
      }

      // Tentar carregar da API primeiro
      try {
        const apiProgress = await tutorialProgressService.getProgress(tutorialId);
        if (apiProgress?.data) {
          dispatch({
            type: TUTORIAL_ACTIONS.LOAD_PROGRESS,
            payload: apiProgress.data
          });
        } else {
          // Fallback para localStorage
          const localProgress = tutorialProgressService.getProgressLocal(tutorialId);
          if (localProgress) {
            dispatch({
              type: TUTORIAL_ACTIONS.LOAD_PROGRESS,
              payload: localProgress
            });
            // Tentar sincronizar com API em background
            tutorialProgressService.syncProgress(tutorialId);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
        // Fallback para localStorage
        const localProgress = tutorialProgressService.getProgressLocal(tutorialId);
        if (localProgress) {
          dispatch({
            type: TUTORIAL_ACTIONS.LOAD_PROGRESS,
            payload: localProgress
          });
        }
      }
    };

    loadProgress();
  }, [tutorialId]);

  // Salva progresso automaticamente
  useEffect(() => {
    if (!tutorialId) {
      // Fallback para progresso genérico
      const progressData = {
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        progress: state.progress,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('tutorialProgress', JSON.stringify(progressData));
      return;
    }

    const saveProgress = async () => {
      const progressData = {
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        progress: state.progress,
        totalSteps: state.totalSteps,
        timestamp: new Date().toISOString()
      };

      // Tentar salvar na API
      try {
        const result = await tutorialProgressService.saveProgress(tutorialId, progressData);
        if (!result) {
          // Se API falhar, salvar no localStorage
          tutorialProgressService.saveProgressLocal(tutorialId, progressData);
        }
      } catch (error) {
        // Se API falhar, salvar no localStorage
        tutorialProgressService.saveProgressLocal(tutorialId, progressData);
      }
    };

    // Debounce para não salvar a cada mudança
    const timeoutId = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [state.currentStep, state.completedSteps, state.progress, state.totalSteps, tutorialId]);

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

  const resetProgress = useCallback(async () => {
    dispatch({ type: TUTORIAL_ACTIONS.RESET_PROGRESS });
    
    if (tutorialId) {
      // Tentar remover da API
      try {
        // Nota: Pode ser necessário criar endpoint DELETE no backend
        await tutorialProgressService.saveProgress(tutorialId, {
          currentStep: 1,
          completedSteps: [],
          progress: 0,
          totalSteps: state.totalSteps
        });
      } catch (error) {
        console.warn('Erro ao resetar progresso na API:', error);
      }
      // Remover do localStorage também
      localStorage.removeItem(`tutorial_progress_${tutorialId}`);
    } else {
      localStorage.removeItem('tutorialProgress');
    }
  }, [tutorialId, state.totalSteps]);

  // Verifica se um passo está completo
  const isStepCompleted = (stepNumber) => {
    return state.completedSteps.includes(stepNumber);
  };

  // Verifica se um passo é o atual
  const isCurrentStep = (stepNumber) => {
    return state.currentStep === stepNumber;
  };

  // Função para inicializar progresso de um tutorial específico
  const initializeTutorial = useCallback((tutorialId, totalSteps) => {
    dispatch({
      type: TUTORIAL_ACTIONS.LOAD_PROGRESS,
      payload: {
        tutorialId,
        totalSteps,
        currentStep: 1,
        completedSteps: [],
        progress: 0
      }
    });
  }, []);

  const value = {
    ...state,
    goToStep,
    nextStep,
    prevStep,
    completeStep,
    setPlaying,
    resetProgress,
    isStepCompleted,
    isCurrentStep,
    initializeTutorial
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
