import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { CourseDetail } from '../../components/content/Courses/CousesDetail'
import { getTutorialById } from '../../../shared/data/__mocks__/lukosTutorials.js'
import { getRetaguardaTutorialById } from '../../../shared/data/__mocks__/retaguardaTutorials.js'

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

  // Converter dados do tutorial para o formato do CourseDetail
  const convertDuration = (duration) => {
    if (!duration) return '0min'
    if (typeof duration === 'number') {
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
    }
    return duration
  }

  // Converter steps para módulos e lições
  const convertStepsToModules = (steps) => {
    if (!steps || steps.length === 0) return []
    
    // Se houver muitos steps, dividir em módulos
    if (steps.length > 5) {
      const moduleSize = Math.ceil(steps.length / 3)
      const modules = []
      
      for (let i = 0; i < steps.length; i += moduleSize) {
        const moduleSteps = steps.slice(i, i + moduleSize)
        const totalDuration = moduleSteps.reduce((acc, step) => {
          const dur = typeof step.duration === 'number' ? step.duration : parseInt(step.duration?.replace(' min', '') || '0')
          return acc + dur
        }, 0)
        
        modules.push({
          title: `Módulo ${Math.floor(i / moduleSize) + 1}: ${moduleSteps[0]?.title || 'Conteúdo'}`,
          duration: convertDuration(totalDuration),
          lessons: moduleSteps.map(step => ({
            title: step.title,
            description: step.description || '',
            duration: convertDuration(step.duration),
            // Se o step tem imagem própria, não usar videoUrl do tutorial (para exibir a imagem)
            videoUrl: step.videoUrl || (step.image ? '' : tutorial.videoUrl || ''),
            image: step.image || tutorial.image || '',
            tips: step.tips || '',
            completed: step.completed || false
          }))
        })
      }
      
      return modules
    }
    
    // Se houver poucos steps, criar um único módulo
    const totalDuration = steps.reduce((acc, step) => {
      const dur = typeof step.duration === 'number' ? step.duration : parseInt(step.duration?.replace(' min', '') || '0')
      return acc + dur
    }, 0)
    
    return [{
      title: 'Conteúdo do Tutorial',
      duration: convertDuration(totalDuration),
      lessons: steps.map(step => ({
        title: step.title,
        description: step.description || '',
        duration: convertDuration(step.duration),
        // Se o step tem imagem própria, não usar videoUrl do tutorial (para exibir a imagem)
        videoUrl: step.videoUrl || (step.image ? '' : tutorial.videoUrl || ''),
        image: step.image || tutorial.image || '',
        tips: step.tips || '',
        completed: step.completed || false
      }))
    }]
  }

  // Calcular duração total
  const totalDuration = (tutorial.steps || tutorial.instructions || []).reduce((total, step) => {
    const duration = typeof step.duration === 'number' ? step.duration : parseInt(step.duration?.replace(' min', '') || '0')
    return total + duration
  }, 0)

  const courseData = {
    id: tutorial.id,
    title: tutorial.title,
    description: tutorial.description,
    image: tutorial.image || 'https://via.placeholder.com/800x450?text=' + encodeURIComponent(tutorial.title),
    level: tutorial.difficulty || 'Iniciante',
    rating: 4.9,
    students: '2.5k',
    duration: convertDuration(totalDuration) || tutorial.duration || '10min',
    modules: convertStepsToModules(tutorial.steps || tutorial.instructions || []),
    whatYouWillLearn: tutorial.tips || [
      'Domínio completo do sistema Lukos',
      'Aumento da produtividade operacional',
      'Redução de erros e otimização de processos'
    ],
    requirements: [
      'Acesso ao sistema Lukos',
      'Computador com Windows',
      'Conexão com internet',
      'Conhecimento básico de informática'
    ]
  }

  return (
    <CourseDetail course={courseData} />
  )
}

export default TutorialPage