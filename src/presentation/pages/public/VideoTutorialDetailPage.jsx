import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorialPlayer from '../../components/videos/TutorialPlayer/TutorialPlayer';
import { tutorials } from '../../../shared/data/__mocks__/videoTutorialsData.js';

const VideoTutorialDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const tutorial = tutorials.find(t => t.id === parseInt(id));
  const currentIndex = tutorials.findIndex(t => t.id === parseInt(id));

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Tutorial não encontrado</h1>
          <p className="text-gray-400 mb-8">O tutorial que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  // Criar steps básicos para o TutorialPlayer
  const steps = [
    {
      id: 1,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // URL de exemplo
      title: tutorial.title,
      description: `Aprenda sobre ${tutorial.category} com este tutorial completo.`,
      tips: [
        'Preste atenção aos detalhes',
        'Pause o vídeo quando necessário',
        'Siga os passos em ordem'
      ]
    },
    {
      id: 2,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: `Avançado - ${tutorial.category}`,
      description: 'Aprofunde seus conhecimentos com técnicas avançadas.',
      tips: [
        'Pratique o que aprendeu',
        'Experimente as funcionalidades',
        'Revise os conceitos importantes'
      ]
    }
  ];

  // Função customizada para quando chegar no último step
  const handleFinishLastStep = () => {
    // Navegar para o próximo tutorial da lista
    const nextIndex = currentIndex + 1;
    if (nextIndex < tutorials.length) {
      navigate(`/video-tutorial/${tutorials[nextIndex].id}`);
    }
  };

  return (
    <TutorialPlayer
      steps={steps}
      title={tutorial.title}
      author="Equipe Lukos - Suporte Técnico"
      likes="2.5K"
      category={tutorial.category}
      difficulty="Iniciante"
      onLastStepFinish={handleFinishLastStep}
    />
  );
};

export default VideoTutorialDetailPage;
