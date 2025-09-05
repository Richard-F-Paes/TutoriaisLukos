import React from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import StepItem from '../StepItem/StepItem';
import './StepList.css';

const StepList = () => {
  const { totalSteps } = useTutorial();

  const steps = [
    {
      id: 1,
      title: 'Introdução ao Sistema',
      duration: '5 min'
    },
    {
      id: 2,
      title: 'Configuração Inicial',
      duration: '8 min'
    },
    {
      id: 3,
      title: 'Cadastro de Produtos',
      duration: '10 min'
    },
    {
      id: 4,
      title: 'Controle de Estoque',
      duration: '12 min'
    },
    {
      id: 5,
      title: 'Relatórios Gerenciais',
      duration: '8 min'
    },
    {
      id: 6,
      title: 'Backup e Segurança',
      duration: '6 min'
    }
  ];

  return (
    <div className="steps-list">
      {steps.map((step) => (
        <StepItem
          key={step.id}
          stepNumber={step.id}
          title={step.title}
          duration={step.duration}
        />
      ))}
    </div>
  );
};

export default StepList;
