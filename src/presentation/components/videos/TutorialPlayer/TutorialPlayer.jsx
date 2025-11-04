import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, 
  ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Share2, Search, 
  Sun, Moon, Menu, X, PlayCircle, Image as ImageIcon, BookOpen, 
  Clock, CheckCircle, MoreVertical, Bell, Settings, Home, Grid3x3
} from 'lucide-react';
import VideoTutorialSidebar from '../VideoTutorials/VideoTutorialSidebar';

const TutorialPlayer = ({ 
  steps = [], 
  title = 'Tutorial', 
  author = 'Instrutor', 
  likes = '0', 
  category = 'Desenvolvimento', 
  difficulty = 'Intermediário',
  onLastStepFinish = null
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const containerRef = useRef(null);

  const navLinks = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/conveniencia', icon: Grid3x3, label: 'Conveniência' },
    { path: '/retaguarda', icon: BookOpen, label: 'Retaguarda' },
    { path: '/gerador-senha', icon: Settings, label: 'Gerador de Senha' },
  ];

  const currentStepData = steps[currentStep];

  // Função para converter URL do YouTube para formato embed
  const convertYouTubeUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1 && onLastStepFinish) {
      // Está no último step e há callback definido
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      onLastStepFinish();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const markStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const getProgressPercentage = () => {
    if (!steps || steps.length === 0) return 0;
    return (completedSteps.length / steps.length) * 100;
  };

  if (!steps || steps.length === 0) {
    return <div className="p-4">Nenhum conteúdo disponível</div>;
  }

  const stepType = currentStepData?.videoUrl ? 'video' : 'image';

  // YouTube-style theme colors
  const bgColor = isDarkMode ? 'bg-[#0f0f0f]' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-[#272727]' : 'bg-white';
  const hoverBg = isDarkMode ? 'hover:bg-[#3f3f3f]' : 'hover:bg-gray-100';
  const textPrimary = isDarkMode ? 'text-white' : 'text-black';
  const textSecondary = isDarkMode ? 'text-[#aaaaaa]' : 'text-[#606060]';
  const borderColor = isDarkMode ? 'border-[#3f3f3f]' : 'border-gray-200';
  const inputBg = isDarkMode ? 'bg-[#121212] border-[#3f3f3f]' : 'bg-white border-gray-300';

  return (
    <div className={`min-h-screen ${bgColor} ${textPrimary} transition-colors duration-200`}>
      {/* YouTube-style Header */}
      <header className={`${cardBg} border-b ${borderColor} px-4 py-2 sticky top-0 z-50`}>
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsNavMenuOpen(!isNavMenuOpen)} className={`p-2 rounded-full ${hoverBg}`}>
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center space-x-2">
            <img src="/LukosTube.png" alt="" className="object-cover w-10" />
              <span className="text-lg sm:text-xl font-semibold hidden md:block">Lukos</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden md:flex">
            <div className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-2 rounded-l-full border ${inputBg} ${textPrimary} placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                />
              </div>
              <button className={`px-6 py-2 ${isDarkMode ? 'bg-[#3f3f3f] hover:bg-[#4f4f4f]' : 'bg-gray-100 hover:bg-gray-200'} border ${borderColor} rounded-r-full transition-colors`}>
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={toggleTheme} className={`p-2 rounded-full ${hoverBg} transition-colors`}>
              {isDarkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
            <button className={`p-2 rounded-full hidden sm:block ${hoverBg}`}>
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
              L
            </div>
          </div>
        </div>
      </header>

      {/* Menu Lateral de Navegação com VideoTutorialSidebar */}
      {isNavMenuOpen && (
        <VideoTutorialSidebar 
          isOpen={true}
          onViewChange={() => setIsNavMenuOpen(false)}
          currentView="home"
        />
      )}

      <div className="flex max-w-screen-2xl mx-auto">
        <main className={`flex-1 flex justify-center ${isSidebarOpen ? 'mr-0 lg:mr-96' : ''} transition-all duration-300`}>
          <div className="p-2 sm:p-4 max-w-4xl w-full">
            {currentStepData && (
              <div ref={containerRef} className="relative bg-black rounded-xl overflow-hidden mb-4">
                <div className="aspect-video relative">
                  {stepType === 'video' && currentStepData.videoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={convertYouTubeUrl(currentStepData.videoUrl)}
                      title={currentStepData.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <img
                        src={currentStepData.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center"}
                        alt={currentStepData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStepData && (
              <div className="mb-4">
                <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-2 line-clamp-2">
                  Etapa {currentStep + 1}: {currentStepData.title}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                   <img src="/LukosTube.png" alt="" className="object-cover w-20" />
                      <div>
                        <div className="font-semibold">{author}</div>
                        <div className={`text-sm ${textSecondary}`}>1.2M inscritos</div>
                      </div>
                    </div> <li>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium transition-colors">
                      Inscrever-se
                      
                    </button>
                    </li>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center ${isDarkMode ? 'bg-[#272727]' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                      <button onClick={handleLike} className={`flex items-center space-x-2 px-3 py-2 sm:px-4 ${hoverBg} transition-colors ${isLiked ? 'text-blue-500' : ''}`}>
                        <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium hidden sm:inline">{likes}</span>
                      </button>
                      <div className={`w-px h-6 ${isDarkMode ? 'bg-[#3f3f3f]' : 'bg-gray-300'}`}></div>
                      <button onClick={handleDislike} className={`px-3 py-2 sm:px-4 ${hoverBg} transition-colors ${isDisliked ? 'text-blue-500' : ''}`}>
                        <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <button className={`hidden sm:flex items-center space-x-2 px-4 py-2 ${isDarkMode ? 'bg-[#272727]' : 'bg-gray-100'} rounded-full ${hoverBg} transition-colors`}>
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Compartilhar</span>
                    </button>

                    <button className={`hidden sm:block p-2 ${isDarkMode ? 'bg-[#272727]' : 'bg-gray-100'} rounded-full ${hoverBg} transition-colors`}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStepData && (
              <div className={`${cardBg} rounded-xl p-4 mb-4`}>
                <div className="flex items-center space-x-4 mb-3 text-sm font-medium">
                  <span>{completedSteps.length}/{steps.length} etapas</span>
                  <span>{Math.round(getProgressPercentage())}% concluído</span>
                  <span className={`px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                    {category}
                  </span>
                </div>
                
                <p className={`${textSecondary} mb-3 line-clamp-3`}>
                  {currentStepData.description}
                </p>

                {currentStepData.tips && currentStepData.tips.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold mb-2">💡 Dicas importantes</h4>
                    <div className="space-y-1">
                      {currentStepData.tips.map((tip, index) => (
                        <div key={index} className={`text-sm ${textSecondary} flex items-start space-x-2`}>
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center gap-2 flex-wrap">
              <button onClick={prevStep} disabled={currentStep === 0} className={`flex items-center space-x-2 px-3 py-2 sm:px-4 ${isDarkMode ? 'bg-[#272727] hover:bg-[#3f3f3f]' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}>
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm">Anterior</span>
              </button>

              <button onClick={() => markStepComplete(currentStep)} disabled={completedSteps.includes(currentStep)} className={`px-3 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${completedSteps.includes(currentStep) ? (isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700') : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                {completedSteps.includes(currentStep) ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Concluído</span>
                  </div>
                ) : (
                  <span className="hidden sm:inline">Marcar como Concluído</span>
                )}
              </button>

              <button 
                onClick={nextStep} 
                className={`flex items-center space-x-2 px-3 py-2 sm:px-4 ${isDarkMode ? 'bg-[#272727] hover:bg-[#3f3f3f]' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition-colors`}
              >
                <span className="text-sm">
                  {currentStep === steps.length - 1 && onLastStepFinish ? 'Próximo Tutorial' : currentStep === steps.length - 1 ? 'Finalizado' : 'Próximo'}
                </span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </main>

        <aside className={`${isSidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 overflow-hidden ${cardBg} border-l ${borderColor} fixed right-0 top-0 h-screen z-40 lg:relative lg:h-auto`}>
          <div className="p-4 pt-20 lg:pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Etapas do Tutorial</h2>
              <button onClick={toggleSidebar} className={`p-2 rounded-full ${hoverBg} lg:hidden`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {steps.map((step, index) => (
                <button key={step.id} onClick={() => setCurrentStep(index)} className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${index === currentStep ? (isDarkMode ? 'bg-[#3f3f3f]' : 'bg-gray-100') : hoverBg}`}>
                  <div className="flex space-x-3">
                    <div className="relative flex-shrink-0">
                      <div className={`w-24 h-16 rounded-lg overflow-hidden ${isDarkMode ? 'bg-[#1f1f1f]' : 'bg-gray-200'} flex items-center justify-center`}>
                        {step.videoUrl ? (
                          <div className="relative w-full h-full bg-black/50 flex items-center justify-center">
                            <PlayCircle className="w-6 h-6 text-white" />
                          </div>
                        ) : (
                          <img src={step.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"} alt={step.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      {completedSteps.includes(index) && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">{step.title}</h4>
                      <p className={`text-xs ${textSecondary} line-clamp-2 mb-1`}>{step.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${step.videoUrl ? (isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700') : (isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700')}`}>
                          {step.videoUrl ? 'Vídeo' : 'Imagem'}
                        </span>
                        {index === currentStep && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/10 text-black'}`}>
                            Atual
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className={`mt-4 p-3 rounded-xl ${isDarkMode ? 'bg-[#1f1f1f]' : 'bg-gray-50'}`}>
              <h4 className="font-semibold mb-2 text-sm">Progresso</h4>
              <div className={`w-full h-2 rounded-fullينة mb-3 ${isDarkMode ? 'bg-[#3f3f3f]' : 'bg-gray-200'}`}>
                <div className="h-full bg-red-600 rounded-full transition-all duration-300" style={{ width: `${getProgressPercentage()}%` }} />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={textSecondary}>Concluídas:</span>
                  <span className="font-medium">{completedSteps.length}/{steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className={textSecondary}>Progresso:</span>
                  <span className="font-medium">{Math.round(getProgressPercentage())}%</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className={`fixed bottom-6 right-6 p-4 ${cardBg} rounded-full shadow-lg z-50 lg:hidden`}>
          <Menu className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default TutorialPlayer;
