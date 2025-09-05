import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Hook personalizado para navegação avançada
export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Carrega histórico de navegação do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('navigationHistory');
    if (savedHistory) {
      try {
        setNavigationHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico de navegação:', error);
      }
    }
  }, []);

  // Salva histórico de navegação no localStorage
  useEffect(() => {
    localStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
  }, [navigationHistory]);

  // Atualiza breadcrumbs baseado na rota atual
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbItems = [];

    // Sempre inclui "Início"
    breadcrumbItems.push({
      label: 'Início',
      path: '/',
      isActive: location.pathname === '/'
    });

    // Mapeia segmentos para labels
    const segmentLabels = {
      'categorias': 'Categorias',
      'categoria': 'Categoria',
      'tutoriais': 'Tutoriais',
      'tutorial': 'Tutorial',
      'sobre': 'Sobre',
      'busca': 'Busca',
      'login': 'Login',
      'register': 'Registro',
      'profile': 'Perfil',
      'editor': 'Editor',
      'admin': 'Administração'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbItems.push({
        label: segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentPath,
        isActive: isLast
      });
    });

    setBreadcrumbs(breadcrumbItems);
  }, [location.pathname]);

  // Adiciona página ao histórico de navegação
  const addToHistory = useCallback((path, title) => {
    const historyItem = {
      path,
      title: title || path,
      timestamp: new Date().toISOString()
    };

    setNavigationHistory(prev => {
      // Remove se já existe
      const filtered = prev.filter(item => item.path !== path);
      // Adiciona no início
      return [historyItem, ...filtered].slice(0, 20); // Máximo 20 itens
    });
  }, []);

  // Navegação com histórico
  const navigateWithHistory = useCallback((path, title) => {
    addToHistory(path, title);
    navigate(path);
  }, [navigate, addToHistory]);

  // Navegação para tutorial específico
  const navigateToTutorial = useCallback((tutorialId, title) => {
    const path = `/tutorial/${tutorialId}`;
    navigateWithHistory(path, title || `Tutorial ${tutorialId}`);
  }, [navigateWithHistory]);

  // Navegação para categoria específica
  const navigateToCategory = useCallback((categoryId, title) => {
    const path = `/categoria/${categoryId}`;
    navigateWithHistory(path, title || `Categoria ${categoryId}`);
  }, [navigateWithHistory]);

  // Navegação para busca
  const navigateToSearch = useCallback((query, filters = {}) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    
    const path = `/busca${params.toString() ? `?${params.toString()}` : ''}`;
    navigateWithHistory(path, 'Busca');
  }, [navigateWithHistory]);

  // Volta para página anterior
  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const previousPage = navigationHistory[1];
      navigate(previousPage.path);
    } else {
      navigate(-1);
    }
  }, [navigate, navigationHistory]);

  // Volta para página inicial
  const goHome = useCallback(() => {
    navigateWithHistory('/', 'Início');
  }, [navigateWithHistory]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Alt + Seta Esquerda = Voltar
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        goBack();
      }
      
      // Alt + Home = Ir para início
      if (event.altKey && event.key === 'Home') {
        event.preventDefault();
        goHome();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goHome]);

  return {
    // Estado
    navigationHistory,
    breadcrumbs,
    currentPath: location.pathname,
    
    // Ações de navegação
    navigateWithHistory,
    navigateToTutorial,
    navigateToCategory,
    navigateToSearch,
    goBack,
    goHome,
    
    // Utilitários
    addToHistory
  };
}

// Hook para navegação em tutoriais
export function useTutorialNavigation(tutorialId) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Carrega progresso do tutorial
  useEffect(() => {
    const savedProgress = localStorage.getItem(`tutorial_${tutorialId}_progress`);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCurrentStep(progress.currentStep || 1);
        setTotalSteps(progress.totalSteps || 1);
        setCompletedSteps(progress.completedSteps || []);
      } catch (error) {
        console.error('Erro ao carregar progresso do tutorial:', error);
      }
    }
  }, [tutorialId]);

  // Salva progresso do tutorial
  useEffect(() => {
    const progress = {
      currentStep,
      totalSteps,
      completedSteps,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`tutorial_${tutorialId}_progress`, JSON.stringify(progress));
  }, [tutorialId, currentStep, totalSteps, completedSteps]);

  // Navega para próximo passo
  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  // Navega para passo anterior
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Vai para passo específico
  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  // Marca passo como completo
  const completeStep = useCallback((step) => {
    setCompletedSteps(prev => {
      if (!prev.includes(step)) {
        return [...prev, step];
      }
      return prev;
    });
  }, []);

  // Finaliza tutorial
  const finishTutorial = useCallback(() => {
    // Marca todos os passos como completos
    setCompletedSteps(Array.from({ length: totalSteps }, (_, i) => i + 1));
    
    // Navega para página de conclusão ou lista de tutoriais
    setTimeout(() => {
      navigate('/tutoriais');
    }, 2000);
  }, [navigate, totalSteps]);

  // Reinicia tutorial
  const restartTutorial = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps([]);
  }, []);

  // Calcula progresso
  const progress = totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;

  return {
    // Estado
    currentStep,
    totalSteps,
    completedSteps,
    progress,
    
    // Ações
    nextStep,
    prevStep,
    goToStep,
    completeStep,
    finishTutorial,
    restartTutorial,
    setTotalSteps,
    
    // Utilitários
    isStepCompleted: (step) => completedSteps.includes(step),
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    canGoNext: currentStep < totalSteps,
    canGoPrev: currentStep > 1
  };
}
