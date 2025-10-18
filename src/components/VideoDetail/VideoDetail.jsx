import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {ArrowLeft, Clock, Target, User, BookOpen, Play} from 'lucide-react'

const VideoDetail = () => {
  const { id } = useParams()

  const tutorial = {
    id: 1,
    title: 'Cadastro no PDV',
    category: 'PDV',
    duration: '10:25',
    difficulty: 'Iniciante',
    instructor: 'Equipe Lukos',
    videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
    description: 'Aprenda a realizar cadastros e operações básicas no módulo PDV do sistema.',
    instructions: [
      'Acesse o módulo PDV no sistema',
      'Clique em "Novo Cadastro"',
      'Preencha os campos obrigatórios',
      'Salve as informações',
      'Verifique se o cadastro foi concluído corretamente'
    ],
    tips: [
      'Sempre revise os dados antes de salvar',
      'Utilize campos de busca para evitar duplicidade de cadastros',
      'Mantenha a senha do PDV segura',
      'Confira relatórios periódicos para validar os cadastros'
    ],
    modules: ['PDV', 'Retaguarda', 'Conveniência'],
    tools: ['Sistema Lukos']
  }

  const relatedTutorials = [
    {
      id: 2,
      title: 'Relatórios Retaguarda',
      thumbnail: 'https://via.placeholder.com/150x90?text=Retaguarda',
      duration: '7:30'
    },
    {
      id: 3,
      title: 'Controle de Estoque Conveniência',
      thumbnail: 'https://via.placeholder.com/150x90?text=Conveniência',
      duration: '8:10'
    },
    {
      id: 4,
      title: 'Configurações do Sistema',
      thumbnail: 'https://via.placeholder.com/150x90?text=Configurações',
      duration: '6:45'
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/tutorials"
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm md:text-base"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar aos Tutoriais
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={tutorial.videoUrl}
                  title={tutorial.title}
                  className="w-full h-64 md:h-96"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Tutorial Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base">
                <span className={`px-3 py-1 rounded-full font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {tutorial.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Target className="h-4 w-4 mr-1" />
                  {tutorial.category}
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {tutorial.instructor}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {tutorial.title}
              </h1>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {tutorial.description}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-red-600" />
                Como Executar
              </h2>
              <ol className="space-y-3 text-sm md:text-base">
                {tutorial.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Dicas Importantes
              </h2>
              <ul className="space-y-3 text-sm md:text-base">
                {tutorial.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tutorial Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-sm md:text-base">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                Módulos do Tutorial
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutorial.modules.map((module, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm md:text-base">
                    {module}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Tutorials */}
            <div className="bg-white rounded-lg shadow-md p-6 text-sm md:text-base">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                Tutoriais Relacionados
              </h3>
              <div className="space-y-4">
                {relatedTutorials.map((related) => (
                  <Link
                    key={related.id}
                    to={`/video/${related.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{related.title}</h4>
                      <div className="flex items-center text-gray-500 text-xs md:text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {related.duration}
                      </div>
                    </div>
                    <Play className="h-5 w-5 text-red-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetail
