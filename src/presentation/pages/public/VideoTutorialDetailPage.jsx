import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorialPlayer from '../../components/videos/TutorialPlayer/TutorialPlayer';
import { useTutorials } from '../../../hooks/useTutorials.js';

const VideoTutorialDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Buscar tutoriais da API (filtrar apenas os que têm vídeo)
  const { data: tutorialsData, isLoading } = useTutorials({ hasVideo: true });
  const allTutorials = tutorialsData?.data?.filter(t => t.VideoUrl) || [];
  
  // Converter para formato esperado
  const tutorials = useMemo(() => {
    return allTutorials.map(t => ({
      id: t.Id,
      title: t.Title,
      category: t.Category?.Name || t.CategoryName || 'Geral',
      videoUrl: t.VideoUrl,
      thumbnail: t.ThumbnailUrl || t.Category?.ImageUrl || 'https://via.placeholder.com/150'
    }));
  }, [allTutorials]);
  
  const tutorial = tutorials.find(t => t.id === parseInt(id));
  const currentIndex = tutorials.findIndex(t => t.id === parseInt(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando tutorial...</p>
        </div>
      </div>
    );
  }

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

  // Buscar tutorial completo da API para obter steps
  const fullTutorial = allTutorials.find(t => t.Id === parseInt(id));
  
  // Criar steps básicos para o TutorialPlayer
  const steps = useMemo(() => {
    if (fullTutorial?.steps && fullTutorial.steps.length > 0) {
      return fullTutorial.steps.map((step, index) => ({
        id: step.Id || index + 1,
        videoUrl: step.VideoUrl || tutorial.videoUrl,
        title: step.Title || `Passo ${index + 1}`,
        description: step.Content || `Aprenda sobre ${tutorial.category} com este tutorial completo.`,
        tips: [
          'Preste atenção aos detalhes',
          'Pause o vídeo quando necessário',
          'Siga os passos em ordem'
        ]
      }));
    }
    
    // Fallback: criar step único com o vídeo do tutorial
    return [
      {
        id: 1,
        videoUrl: tutorial.videoUrl,
        title: tutorial.title,
        description: `Aprenda sobre ${tutorial.category} com este tutorial completo.`,
        tips: [
          'Preste atenção aos detalhes',
          'Pause o vídeo quando necessário',
          'Siga os passos em ordem'
        ]
      }
    ];
  }, [fullTutorial, tutorial]);

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
      difficulty={fullTutorial?.Difficulty === 'iniciante' ? 'Iniciante' : 
                  fullTutorial?.Difficulty === 'intermediario' ? 'Intermediário' : 
                  fullTutorial?.Difficulty === 'avancado' ? 'Avançado' : 'Iniciante'}
      onLastStepFinish={handleFinishLastStep}
    />
  );
};

export default VideoTutorialDetailPage;
