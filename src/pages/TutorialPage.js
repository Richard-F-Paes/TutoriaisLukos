import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import TutorialPlayer from '../components/TutorialPlayer/TutorialPlayer'
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

  return (
    <TutorialPlayer
      steps={steps.map((step) => ({
        id: step.id,
        title: step.title,
        description: step.description,
        videoUrl: step.videoUrl,
        image: step.image,
        tips: Array.isArray(step.tips) ? step.tips : (step.tips ? [step.tips] : [])
      }))}
      title={tutorial.title}
      author={tutorialData.instructor}
      likes="2500"
      category={tutorial.category}
      difficulty={tutorial.difficulty}
      initialStep={0}
    />
  )
}

export default TutorialPage