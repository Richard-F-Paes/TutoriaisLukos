import React from 'react';
import TutorialPlayer from '../components/TutorialPlayer/TutorialPlayer';

const TutorialPlayerTest = () => {
  const steps = [
    {
      id: 1,
      videoUrl: 'https://youtu.be/zRIbf6JqkNc',
      title: 'Introdução ao Tutorial',
      description: 'Nesta etapa você vai aprender os fundamentos básicos do sistema',
      tips: ['Preste atenção aos detalhes', 'Pause quando necessário']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center',
      title: 'Configuração Inicial',
      description: 'Aprenda como configurar o sistema pela primeira vez',
      tips: ['Mantenha suas credenciais seguras', 'Anote a senha em local seguro']
    },
    {
      id: 3,
      videoUrl: 'https://youtu.be/K89z4SjnI8A?si=1tDTOoNDZZ7zi1C8',
      title: 'Primeiros Passos',
      description: 'Comece a usar o sistema com confiança',
      tips: ['Pratique bastante', 'Explore todas as funcionalidades']
    }
  ];

  return (
    <TutorialPlayer
      steps={steps}
      title="Tutorial Completo - Sistema Lukos"
      author="Equipe Lukos"
      likes="1.2K"
      category="Desenvolvimento"
      difficulty="Iniciante"
    />
  );
};

export default TutorialPlayerTest;
