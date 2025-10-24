import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Star, PlayCircle, BookOpen, Users } from 'lucide-react'
import { getTutorialsByCategory, getSubcategories } from '../data/lukosTutorials'

const CategoryTutorialsPage = () => {
  const { category } = useParams()
  const tutorials = getTutorialsByCategory(category)
  const subcategories = getSubcategories(category)

  if (!tutorials || tutorials.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600 mb-8">A categoria que você está procurando não existe.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800'
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800'
      case 'Avançado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <h1 className="text-2xl font-bold text-gray-900">{category}</h1>
                <p className="text-sm text-gray-500">{tutorials.length} tutoriais disponíveis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategorias */}
      {subcategories.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <span
                  key={subcategory}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {subcategory}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lista de Tutoriais */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.id}
              to={`/tutorial/${tutorial.id}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-200 overflow-hidden"
            >
              {/* Imagem do Tutorial */}
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative overflow-hidden">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-200"></div>
                <div className="absolute top-4 right-4">
                  <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {tutorial.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tutorial.description}
                </p>

                {/* Metadados */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{tutorial.steps.length} passos</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* Subcategoria */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                    {tutorial.subcategory}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas da Categoria</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{tutorials.length}</div>
              <div className="text-sm text-gray-500">Total de Tutoriais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {tutorials.filter(t => t.difficulty === 'Iniciante').length}
              </div>
              <div className="text-sm text-gray-500">Iniciante</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {tutorials.filter(t => t.difficulty === 'Intermediário').length}
              </div>
              <div className="text-sm text-gray-500">Intermediário</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {tutorials.filter(t => t.difficulty === 'Avançado').length}
              </div>
              <div className="text-sm text-gray-500">Avançado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryTutorialsPage
