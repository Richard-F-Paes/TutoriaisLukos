import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorialPlayer from '../components/TutorialPlayer/TutorialPlayer';
import { tutorials } from '../data/videoTutorialsData';

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

  // Criar steps dinâmicos por tutorial (usa tutorial.steps se existir, ou defaults)
  const defaultSteps = [
    {
      id: 1,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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

  // Steps específicos para Aferição (ID 66)
  // Preencha videoUrl com o link do vídeo (YouTube/Vimeo) ou image com o caminho da imagem.
  const afericaoSteps = [
    {
      id: 1,
      title: 'Tutorial passo a passo (vídeo)',
      description: 'Assista primeiro ao vídeo com o fluxo completo da aferição.',
      videoUrl: 'https://drive.google.com/file/d/19dnsf60ACtiTk5HjCdd1cHoDdG3KSflG/preview'  
    },
    {
      id: 2,
      title: 'Selecione o(s) abastecimentos de aferição e clique na setinha ao lado de "Adicionar no Cupom"',
      description: 'No caixa (PDV Pista), acesse Menu > Operações > Aferição.',
      image: 'https://lh3.googleusercontent.com/sitesv/AAzXCkdIWbkCwWVZ4CbXlInlKI-oInRKLxlc4KWt1rToil7_JNnk691PMUh3LrcqiAqkNuT2GTwOWFaovX_XWY3qa9f2nHtdEpx2Iv6H1JsG8UCK3d11Zx0nwDEo2ESa4dkSwgc8xAPVUs1kEtMh_mxlQQIRjICGkTUwU4rNG8qkvOvYWzBw9EOd03SLpj0RGw5KpIyj1RZFJQzwMprcf6Q2oPtKU_EuAuyirgBcwuA=w1280'
    },
    {
      id: 3,
      title: 'Clique em "Aferir selecionados"',
      description: 'Clique em "Aferir selecionados".',
      videoUrl: 'https://lh3.googleusercontent.com/sitesv/AAzXCkfceeHvk2F9muEzHg90X4LFSsnbZr8XQNDJ4wD8O7ugMS_iVFD7IZdOpJ--VobHOcTtBWn1-_obtrZQ0CO4GTN3x149qAF7SbobzrqmJGNdg1q_-5wULFenjXffV2cVW39CJ0IVDEU0S_SVZx-AYRUc8j3lHca6Jr1ZBOEFrTNlOkW6hO8YL9x5hH8yV6vYS42cRhzQoz8ZNsFPHaguxF8Qnj2gYXxnXsJz=w1280',
      image: '/images/afericao/step3.png'
    },
    {
      id: 4,
      title: 'Insira a senha do supervisor',
      description: 'Insira a senha do supervisor.',
      image: 'https://lh3.googleusercontent.com/sitesv/AAzXCkebxk-H-hhvLa-manp3qtx5SnOFsNYzPhejIQDcgLo4jbNP2GeWsMGKhQcFy7mxucrgyOU3W9JA_DlDDKMp0RzQ95D4tJxsrhPofwFBO9zCHvaOKbdKupBKf7wbdzz-iXh1UHqWVhtSDCPQGSmPd7Cgzs_FuHVe2FM0ouW6jswFnlRExvpRCsF5jqKXIhcxmV3sAqLn5sj6efKu29mXmZ728cGe07y07N4_zps=w1280'
    },
    {
      id: 5,
      title: 'Insira a senha do supervisor',
      description: 'Informe a senha do supervisor para confirmar a operação e finalizar a aferição.',
      videoUrl: 'https://youtu.be/SEU_VIDEO_ID_3',
      image: '/images/afericao/step5.png'
    }
  ];

  const steps = tutorial?.steps
    ? tutorial.steps
    : tutorial?.id === 66
      ? afericaoSteps
      : defaultSteps;

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
