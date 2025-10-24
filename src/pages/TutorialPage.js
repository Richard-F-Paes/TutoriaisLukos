import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import InteractiveLesson from '../components/InteractiveLesson/InteractiveLesson'
import { getTutorialById } from '../data/lukosTutorials'
import { getRetaguardaTutorialById } from '../data/retaguardaTutorials'

const TutorialPage = () => {
  const { tutorialId } = useParams()
  // Buscar tutorial primeiro no lukosTutorials, depois no retaguardaTutorials
  let tutorial = getTutorialById(tutorialId)
  if (!tutorial) {
    tutorial = getRetaguardaTutorialById(tutorialId)
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutorial não encontrado</h1>
          <p className="text-gray-600 mb-8">O tutorial que você está procurando não existe.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  // Converter dados do tutorial para o formato do InteractiveLesson
  const tutorialData = {
    title: tutorial.title,
    instructor: 'Equipe Lukos - Suporte Técnico',
    duration: tutorial.duration,
    rating: 4.9,
    studentsCount: 2500,
    difficulty: tutorial.difficulty,
    category: tutorial.category,
    benefits: [
      'Domínio completo do sistema Lukos',
      'Aumento da produtividade operacional',
      'Redução de erros e otimização de processos',
      'Gestão eficiente de postos e lojas',
      'Controle total de estoque e vendas',
      'Relatórios avançados e análises'
    ],
    equipment: 'Computador com acesso à internet, Sistema Lukos instalado',
    totalTime: (tutorial.steps || tutorial.instructions || []).reduce((total, step) => {
      const duration = typeof step.duration === 'string' ? parseInt(step.duration.replace(' min', '')) : step.duration
      return total + duration
    }, 0),
    precautions: [
      'Faça backup dos dados antes de qualquer alteração',
      'Teste em ambiente de desenvolvimento primeiro',
      'Consulte a documentação oficial',
      'Entre em contato com suporte em caso de dúvidas',
      'Mantenha o sistema sempre atualizado'
    ],
    contraindications: [
      'Usuários sem treinamento básico em sistemas',
      'Ambiente de produção sem backup',
      'Sistemas com versões desatualizadas',
      'Sem acesso à internet para atualizações'
    ]
  }

  // Criar steps individuais para cada passo do tutorial
  const steps = (tutorial.steps || tutorial.instructions || []).map((step, index) => ({
    id: `${tutorial.id}-step-${index + 1}`,
    title: step.title,
    category: tutorial.category,
    difficulty: tutorial.difficulty,
    image: step.image || tutorial.image,
    videoUrl: tutorial.videoUrl,
    description: step.description,
    instructions: [step], // Cada step é uma instrução individual
    tips: step.tips || tutorial.tips,
    commonMistakes: tutorial.commonMistakes,
    timeMarkers: (tutorial.steps || tutorial.instructions || []).map((s, i) => ({
      time: typeof s.duration === 'string' ? parseInt(s.duration.replace(' min', '')) : s.duration,
      title: s.title,
      description: s.description
    })),
    quiz: {
      questions: [
        {
          id: 1,
          question: `Qual é o primeiro passo para ${step.title.toLowerCase()}?`,
          options: ['Validar dados', 'Configurar sistema', 'Testar funcionalidade', 'Documentar processo'],
          correct: 0,
          explanation: 'Sempre valide os dados antes de prosseguir com qualquer operação.'
        }
      ]
    },
    resources: tutorial.resources
  }))

  const categories = ['Todos', tutorial.category]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{tutorial.title}</h1>
                <p className="text-sm text-gray-500">{tutorial.category} • {tutorial.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {tutorial.duration}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {tutorial.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Componente InteractiveLesson */}
      <InteractiveLesson
        tutorialData={tutorialData}
        steps={steps}
        categories={categories}
        initialStep={0}
        showSidebar={true}
        showDarkMode={true}
        onStepChange={(stepIndex, stepData) => {
          console.log('Step changed:', stepIndex, stepData)
        }}
        onStepComplete={(stepIndex, isCompleted, completedSteps) => {
          console.log('Step completed:', stepIndex, isCompleted, completedSteps)
        }}
        onFavoriteToggle={(stepIndex, isFavorite, favoriteSteps) => {
          console.log('Favorite toggled:', stepIndex, isFavorite, favoriteSteps)
        }}
        className="tutorial-page"
      />
    </div>
  )
}

export default TutorialPage