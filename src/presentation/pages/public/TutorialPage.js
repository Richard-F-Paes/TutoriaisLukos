import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { CourseDetail } from '../../components/content/Courses/CousesDetail'
import { useTutorial } from '../../../hooks/useTutorials.js'

const TutorialPage = () => {
  const { tutorialId } = useParams()
  const { data: tutorialData, isLoading, error } = useTutorial(tutorialId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando tutorial...</p>
        </div>
      </div>
    )
  }

  if (error || !tutorialData?.data) {
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

  const tutorial = tutorialData.data
  
  // Se o tutorial tem slug, redirecionar para a rota com slug
  if (tutorial.Slug || tutorial.slug) {
    return <Navigate to={`/tutoriais/${tutorial.Slug || tutorial.slug}`} replace />
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
    
    // Normalizar steps (pode vir como Steps, steps, ou instructions)
    const normalizedSteps = steps.map(step => ({
      title: step.Title || step.title,
      description: step.Description || step.description || step.Content || step.content || '',
      duration: step.Duration || step.duration,
      videoUrl: step.VideoUrl || step.videoUrl,
      image: step.ImageUrl || step.imageUrl || step.image,
      tips: step.Tips || step.tips || ''
    }))
    
    // Se houver muitos steps, dividir em módulos
    if (normalizedSteps.length > 5) {
      const moduleSize = Math.ceil(normalizedSteps.length / 3)
      const modules = []
      
      for (let i = 0; i < normalizedSteps.length; i += moduleSize) {
        const moduleSteps = normalizedSteps.slice(i, i + moduleSize)
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
            videoUrl: step.videoUrl || (step.image ? '' : tutorial.VideoUrl || tutorial.videoUrl || ''),
            image: step.image || tutorial.ThumbnailUrl || tutorial.thumbnailUrl || tutorial.image || '',
            tips: step.tips || '',
            completed: false
          }))
        })
      }
      
      return modules
    }
    
    // Se houver poucos steps, criar um único módulo
    const totalDuration = normalizedSteps.reduce((acc, step) => {
      const dur = typeof step.duration === 'number' ? step.duration : parseInt(step.duration?.replace(' min', '') || '0')
      return acc + dur
    }, 0)
    
    return [{
      title: 'Conteúdo do Tutorial',
      duration: convertDuration(totalDuration),
      lessons: normalizedSteps.map(step => ({
        title: step.title,
        description: step.description || '',
        duration: convertDuration(step.duration),
        videoUrl: step.videoUrl || (step.image ? '' : tutorial.VideoUrl || tutorial.videoUrl || ''),
        image: step.image || tutorial.ThumbnailUrl || tutorial.thumbnailUrl || tutorial.image || '',
        tips: step.tips || '',
        completed: false
      }))
    }]
  }

  // Calcular duração total
  const tutorialSteps = tutorial.Steps || tutorial.steps || tutorial.instructions || []
  const totalDuration = tutorialSteps.reduce((total, step) => {
    const duration = step.Duration || step.duration
    const dur = typeof duration === 'number' ? duration : parseInt(duration?.replace(' min', '') || '0')
    return total + dur
  }, 0) || tutorial.EstimatedDuration || 0

  const courseData = {
    id: tutorial.Id || tutorial.id,
    title: tutorial.Title || tutorial.title,
    description: tutorial.Description || tutorial.description,
    image: tutorial.ThumbnailUrl || tutorial.thumbnailUrl || tutorial.image || 'https://via.placeholder.com/800x450?text=' + encodeURIComponent(tutorial.Title || tutorial.title),
    level: tutorial.Difficulty || tutorial.difficulty || 'Iniciante',
    rating: 4.9,
    students: '2.5k',
    duration: convertDuration(totalDuration) || tutorial.EstimatedDuration ? `${tutorial.EstimatedDuration} min` : '10min',
    modules: convertStepsToModules(tutorialSteps),
    whatYouWillLearn: [
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