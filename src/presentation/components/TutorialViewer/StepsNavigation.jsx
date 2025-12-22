// StepsNavigation - Sidebar de navegação entre passos
import React, { useState, useEffect, useRef } from 'react';
import { Hash, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import './StepsNavigation.css';

const StepsNavigation = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(null);
  const observerRef = useRef(null);
  
  // Encontrar índice do passo ativo
  const activeStepIndex = steps?.findIndex((step, index) => {
    const stepId = step.id || step.Id || `step-${index}`;
    return String(stepId) === activeStep;
  }) ?? -1;
  
  const totalSteps = steps?.length || 0;
  const hasPrevious = activeStepIndex > 0;
  const hasNext = activeStepIndex < totalSteps - 1;

  useEffect(() => {
    if (!steps || steps.length === 0) return;

    // Aguardar um pouco para garantir que os elementos estejam renderizados
    const timer = setTimeout(() => {
      // Criar Intersection Observer para detectar qual passo está visível
      const options = {
        root: null, // Usar viewport
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.3,
      };

      observerRef.current = new IntersectionObserver((entries) => {
        // Encontrar o passo mais visível
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.getAttribute('data-step-id');
          }
        });

        if (mostVisible) {
          setActiveStep(mostVisible);
        }
      }, options);

      // Observar todos os passos
      const stepElements = document.querySelectorAll('[data-step-id]');
      stepElements.forEach((el) => {
        observerRef.current.observe(el);
      });

      // Definir primeiro passo como ativo inicialmente
      if (stepElements.length > 0) {
        const firstStepId = stepElements[0].getAttribute('data-step-id');
        setActiveStep(firstStepId);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [steps]);

  const scrollToStep = (stepId) => {
    const element = document.querySelector(`[data-step-id="${stepId}"]`);
    if (element) {
      const headerHeight = document.querySelector('.tutorial-modal-header')?.offsetHeight || 0;
      const offset = headerHeight + 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Atualizar passo ativo imediatamente
      setActiveStep(stepId);
    }
  };

  const scrollToStepIndex = (index) => {
    if (index >= 0 && index < totalSteps) {
      const step = steps[index];
      const stepId = step.id || step.Id || `step-${index}`;
      scrollToStep(String(stepId));
    }
  };

  const goToPrevious = () => {
    if (hasPrevious) {
      scrollToStepIndex(activeStepIndex - 1);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      scrollToStepIndex(activeStepIndex + 1);
    }
  };

  const goToFirst = () => {
    if (totalSteps > 0) {
      scrollToStepIndex(0);
    }
  };

  const goToLast = () => {
    if (totalSteps > 0) {
      scrollToStepIndex(totalSteps - 1);
    }
  };

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <nav className="steps-navigation">
      <div className="steps-navigation-header">
        <Hash size={18} />
        <h3 className="steps-navigation-title">Navegação</h3>
      </div>
      
      <div className="steps-navigation-controls">
        <button
          onClick={goToFirst}
          className="steps-nav-button steps-nav-button-first"
          title="Voltar ao início"
          disabled={!hasPrevious && activeStepIndex !== 0}
          aria-label="Voltar ao início"
        >
          <ArrowLeft size={20} />
        </button>
        
        <button
          onClick={goToPrevious}
          className="steps-nav-button steps-nav-button-prev"
          title="Passo anterior"
          disabled={!hasPrevious}
          aria-label="Passo anterior"
        >
          <ChevronLeft size={22} />
        </button>
        
        <button
          onClick={goToNext}
          className="steps-nav-button steps-nav-button-next"
          title="Próximo passo"
          disabled={!hasNext}
          aria-label="Próximo passo"
        >
          <ChevronRight size={22} />
        </button>
        
        <button
          onClick={goToLast}
          className="steps-nav-button steps-nav-button-last"
          title="Ir até o fim"
          disabled={!hasNext && activeStepIndex !== totalSteps - 1}
          aria-label="Ir até o fim"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      
      <ul className="steps-navigation-list">
        {steps.map((step, index) => {
          const stepId = step.id || step.Id || `step-${index}`;
          const sortOrder = step.sortOrder || step.SortOrder || index + 1;
          const title = step.title || step.Title || `Passo ${sortOrder}`;
          const isActive = activeStep === String(stepId);

          return (
            <li key={stepId} className={`steps-navigation-item ${isActive ? 'active' : ''}`}>
              <button
                onClick={() => scrollToStep(String(stepId))}
                className="steps-navigation-link"
                aria-label={`Ir para passo ${sortOrder}: ${title}`}
              >
                <span className="steps-navigation-number">{sortOrder}</span>
                <span className="steps-navigation-text">{title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default StepsNavigation;

