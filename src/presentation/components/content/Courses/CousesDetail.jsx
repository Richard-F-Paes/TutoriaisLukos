import React, { useState } from 'react';
import { Clock, Users, Star, CheckCircle2, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { Card, CardContent } from '../../ui/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion/accordion';
import { Progress } from '../../ui/progress/progress';
import { Badge } from '../../ui/badge/badge';


/* ------------------ Componentes internos ------------------ */

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  const handleError = () => setDidError(true);

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
}

function VideoPlayer({ videoUrl, title, image }) {
  if (!videoUrl) {
    // Se não houver vídeo, exibir imagem se disponível
    if (image) {
      return (
        <div className="w-full">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <ImageWithFallback 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }
    // Se não houver nem vídeo nem imagem, exibir placeholder
    return (
      <div className="w-full">
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Sem conteúdo de mídia disponível</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function LessonItem({ title, duration, completed, active, onClick }) {
  const isGrayLesson = title === 'Navegação e Interface Principal';
  
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors text-left ${
        isGrayLesson 
          ? active 
            ? 'bg-gray-200 border border-gray-300' 
            : 'bg-gray-100 hover:bg-gray-200'
          : active 
            ? 'bg-blue-50 border border-blue-200' 
            : 'hover:bg-gray-50'
      }`}
    >
      <div className={`flex-shrink-0 ${completed ? 'text-green-600' : isGrayLesson ? 'text-gray-600' : 'text-gray-400'}`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={isGrayLesson ? 'text-gray-800' : active ? 'text-blue-600' : 'text-gray-900'}>{title}</p>
        <p className={`text-sm ${isGrayLesson ? 'text-gray-600' : 'text-gray-600'}`}>{duration}</p>
      </div>
    </button>
  );
}

/* ------------------ CourseDetail principal ------------------ */

export function CourseDetail({ 
  course = {
    id: 'default',
    title: 'Tutorial Completo do Sistema PDV',
    description: 'Aprenda a usar todas as funcionalidades do sistema PDV para pista de combustível e conveniência com tutoriais passo a passo.',
    image: 'https://lh3.googleusercontent.com/sitesv/AAzXCke4_mHhycFfaKgW2Qy4C6xQLbxgB1jqwsJrOmflgcfhs__i-xeyXYldeN0QqBxZzEiOVEbWeZOzd2MqWw8-U1zKF7vBUZ6_lppF-Ii3IbwxjmHuMJZF_nVbxiBYkWWAF70iLCHZLAmzXE29DSVliQjooE1CQU7icH9-d2otFc2fPcZbaJO2kXv4pvigPG22Wqy4VcmLwXlUMJqNeO8MMI3_-8t7ikrd5Pqs=w1280',
    level: 'Iniciante',
    rating: 4.9,
    students: '2.5k',
    duration: '9h 5min',
    modules: [],
    whatYouWillLearn: [],
    requirements: []
  },
  courseId,
  onNavigate 
}) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  const completedLessons = course.modules.flatMap(m => m.lessons || []).filter(l => l.completed).length;
  const totalLessons = course.modules.flatMap(m => m.lessons || []).length;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const allLessons = course.modules.flatMap((module, moduleIndex) =>
    (module.lessons || []).map((lesson, lessonIndex) => ({
      ...lesson,
      moduleIndex,
      lessonIndex,
    }))
  );

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    const lessonIndex2 =
      course.modules.slice(0, moduleIndex).reduce((acc, mod) => acc + (mod.lessons || []).length, 0) + lessonIndex;
    setCurrentLesson(lessonIndex2);
    setShowPlayer(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showPlayer ? (
        <div className="bg-white relative">
          {/* Navbar fixa com botões de navegação e barra de progresso */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Barra de progresso */}
              <div className="py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-blue-50/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">Progresso do Tutorial</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600">{completedLessons} de {totalLessons} aulas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-3.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Botões de navegação */}
              <div className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <Button variant="outline" onClick={() => setShowPlayer(false)} className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </Button>
                  <div className="flex flex-row gap-3 flex-1 max-w-md mx-auto">
                    <Button 
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))} 
                      disabled={currentLesson === 0}
                      className="group flex-1 px-4 py-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-sm flex items-center justify-center gap-2 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span className="hidden sm:inline">Anterior</span>
                    </Button>
                    <div className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg">
                      {currentLesson + 1} / {totalLessons}
                    </div>
                    <Button
                      onClick={() => setCurrentLesson(Math.min(totalLessons - 1, currentLesson + 1))}
                      disabled={currentLesson === totalLessons - 1}
                      className="group flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-md flex items-center justify-center gap-2 transform hover:scale-[1.02] text-sm"
                    >
                      <span className="hidden sm:inline">Próxima</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="w-20"></div> {/* Espaçador para centralizar */}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 lg:pb-12 flex flex-col gap-6">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Exibir vídeo ou imagem */}
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
                  <VideoPlayer 
                    videoUrl={allLessons[currentLesson].videoUrl} 
                    title={allLessons[currentLesson].title}
                    image={allLessons[currentLesson].image}
                  />
                </div>
                
                {/* Exibir imagem adicional abaixo do vídeo se houver ambos */}
                {allLessons[currentLesson].image && allLessons[currentLesson].videoUrl && (
                  <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden p-3">
                    <ImageWithFallback 
                      src={allLessons[currentLesson].image} 
                      alt={allLessons[currentLesson].title} 
                      className="w-full rounded-xl"
                    />
                  </div>
                )}

                {/* Título destacado */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl p-5 lg:p-6 border-2 border-blue-100 shadow-lg">
                  <div className="mb-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">{allLessons[currentLesson].title}</h2>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-700 text-sm">{allLessons[currentLesson].duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                        <span className="font-medium text-gray-700 text-sm">Aula {currentLesson + 1} de {totalLessons}</span>
                      </div>
                    </div>
                    {/* Descrição do passo */}
                    {allLessons[currentLesson].description && (
                      <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed text-base">{allLessons[currentLesson].description}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden sticky top-32">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Conteúdo do Curso
                    </h3>
                    <p className="text-blue-100 text-xs mt-1">
                      {totalLessons} aulas • {Math.round(progress)}% concluído
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {allLessons.map((lesson, index) => (
                        <LessonItem
                          key={index}
                          title={lesson.title}
                          duration={lesson.duration}
                          completed={lesson.completed}
                          active={currentLesson === index}
                          onClick={() => setCurrentLesson(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">{course.level}</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating} avaliação</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">{course.students} alunos</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => setShowPlayer(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all px-8 py-4"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Começar Tutorial
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 px-8 py-4"
                    >
                      Adicionar à Lista
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
                  <div className="relative">
                    <ImageWithFallback 
                      src={course.image} 
                      alt={course.title} 
                      className="rounded-2xl shadow-2xl border-4 border-white/20" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default CourseDetail;