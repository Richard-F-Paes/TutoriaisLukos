import React, { useState } from 'react';
import { Clock, Users, Star, CheckCircle2, Play } from 'lucide-react';
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

function VideoPlayer({ videoUrl, title }) {
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
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors text-left ${
        active ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
      }`}
    >
      <div className={`flex-shrink-0 ${completed ? 'text-green-600' : 'text-gray-400'}`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={active ? 'text-blue-600' : 'text-gray-900'}>{title}</p>
        <p className="text-sm text-gray-600">{duration}</p>
      </div>
    </button>
  );
}

/* ------------------ CourseDetail principal ------------------ */

export function CourseDetail({ courseId, onNavigate }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  const course = {
    id: courseId,
    title: 'Tutorial Completo do Sistema PDV',
    description:
      'Aprenda a usar todas as funcionalidades do sistema PDV para pista de combustível e conveniência com tutoriais passo a passo.',
    image:
      'https://lh3.googleusercontent.com/sitesv/AAzXCke4_mHhycFfaKgW2Qy4C6xQLbxgB1jqwsJrOmflgcfhs__i-xeyXYldeN0QqBxZzEiOVEbWeZOzd2MqWw8-U1zKF7vBUZ6_lppF-Ii3IbwxjmHuMJZF_nVbxiBYkWWAF70iLCHZLAmzXE29DSVliQjooE1CQU7icH9-d2otFc2fPcZbaJO2kXv4pvigPG22Wqy4VcmLwXlUMJqNeO8MMI3_-8t7ikrd5Pqs=w1280',
    
    level: 'Iniciante',
   
    modules: [
      {
        title: 'Módulo 1: Introdução ao Sistema PDV',
        duration: '2h 40min',
        lessons: [
          { title: 'Introdução ao Sistema PDV', duration: '15min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: true },
          { title: 'Configuração Inicial do Sistema', duration: '25min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: true },
          { title: 'Navegação e Interface Principal', duration: '30min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Perfis de Usuário e Permissões', duration: '35min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Configurações Básicas do PDV', duration: '55min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
        ],
      },
      {
        title: 'Módulo 2: Operações de Venda',
        duration: '3h 35min',
        lessons: [
          { title: 'Realizando Vendas no PDV', duration: '20min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Gestão de Produtos e Estoque', duration: '30min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Formas de Pagamento', duration: '45min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Cupons Fiscais e Impressão', duration: '40min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Cancelamento e Devolução de Vendas', duration: '35min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Relatórios de Vendas', duration: '45min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
        ],
      },
      {
        title: 'Módulo 3: Pista de Combustível',
        duration: '2h 50min',
        lessons: [
          { title: 'Configuração das Bombas', duration: '30min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Abastecimento e Controle de Tanques', duration: '35min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Gestão de Preços de Combustível', duration: '25min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { title: 'Relatórios de Combustível', duration: '40min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
        ],
      },
    ],
    whatYouWillLearn: [
      'Configurar e usar o sistema PDV completo',
      'Realizar vendas e operações de conveniência',
      'Gerenciar pista de combustível e bombas',
      'Configurar produtos, preços e estoque',
      'Emitir cupons fiscais e relatórios',
      'Gerenciar usuários e permissões do sistema',
    ],
    requirements: [
      'Acesso ao sistema PDV Lukos',
      'Computador com Windows',
      'Conexão com internet',
      'Conhecimento básico de informática',
    ],
  };

  const completedLessons = course.modules.flatMap(m => m.lessons).filter(l => l.completed).length;
  const totalLessons = course.modules.flatMap(m => m.lessons).length;
  const progress = (completedLessons / totalLessons) * 100;

  const allLessons = course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      moduleIndex,
      lessonIndex,
    }))
  );

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    const lessonIndex2 =
      course.modules.slice(0, moduleIndex).reduce((acc, mod) => acc + mod.lessons.length, 0) + lessonIndex;
    setCurrentLesson(lessonIndex2);
    setShowPlayer(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showPlayer ? (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4">
            <Button variant="outline" onClick={() => setShowPlayer(false)} className="mb-4 flex justify-start align-start">
              ← Voltar para Visão Geral
            </Button>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <VideoPlayer videoUrl={allLessons[currentLesson].videoUrl} title={allLessons[currentLesson].title} />
                <div className="mt-6">
                  <h2 className="mb-2">{allLessons[currentLesson].title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{allLessons[currentLesson].duration}</span>
                    <span>•</span>
                    <span>
                      Aula {currentLesson + 1} de {totalLessons}
                    </span>
                  </div>
                  <Progress value={progress} className="mb-4" />
                  <p className="text-sm text-gray-600">
                    {completedLessons} de {totalLessons} aulas concluídas ({Math.round(progress)}%)
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Button onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))} disabled={currentLesson === 0}>
                      Aula Anterior
                    </Button>
                    <Button
                      onClick={() => setCurrentLesson(Math.min(totalLessons - 1, currentLesson + 1))}
                      disabled={currentLesson === totalLessons - 1}
                    >
                      Próxima Aula
                    </Button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4">Conteúdo do Curso</h3>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4">{course.level}</Badge>
                  <h1 className="text-white mb-4">{course.title}</h1>
                  <p className="text-gray-300 mb-6">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating} avaliação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{course.students} </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{course.duration} de conteúdo</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button size="lg" onClick={() => setShowPlayer(true)}>
                      <Play className="w-5 h-5 mr-2" />
                      Começar Tutorial
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900"
                    >
                      Adicionar à Lista
                    </Button>
                  </div>
                </div>
                <div>
                  <ImageWithFallback src={course.image} alt={course.title} className="rounded-lg shadow-2xl" />
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