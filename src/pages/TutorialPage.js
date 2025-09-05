import React, { useEffect } from 'react';
import { useTutorial } from '../contexts/TutorialContext';
import Navbar from '../components/Navbar/Navbar';
import TutorialHeader from '../components/TutorialHeader/TutorialHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import Step from '../components/Step/Step';
import Footer from '../components/Footer/Footer';
import { tutorialData } from '../data/tutorialData';
import './TutorialPage.css';

const TutorialPage = () => {
  const { currentStep } = useTutorial();

  // Configura atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Seta direita ou espaço = próximo passo
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        // Lógica será implementada no contexto
      }
      
      // Seta esquerda = passo anterior
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        // Lógica será implementada no contexto
      }
      
      // Teclas numéricas = passo direto
      if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        // Lógica será implementada no contexto
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="tutorial-page">
      <Navbar />
      
      <TutorialHeader />
      
      <section className="tutorial-content">
        <div className="container">
          <div className="tutorial-layout">
            <Sidebar />
            
            <div className="tutorial-main">
              {tutorialData.steps.map((step) => (
                <Step
                  key={step.id}
                  stepNumber={step.id}
                  title={step.title}
                  duration={step.duration}
                  content={step.content}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TutorialPage;
