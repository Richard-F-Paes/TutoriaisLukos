
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {Search, Filter, BookOpen, ArrowRight} from 'lucide-react'

const Tutorialpresentacao = ({ category }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('todos')

  const categoryInfo = {
    pista: {
      title: 'Pista de Combustível',
      description: 'Tutoriais completos para operações da pista, desde abertura de turno até vendas de combustível',
      icon: '⛽',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    },
    conveniencia: {
      title: 'Conveniência',
      description: 'Gestão completa da loja de conveniência, produtos, vendas e controle de estoque',
      icon: '🛒',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-50'
    },
    sistema: {
      title: 'Retaguarda',
      description: 'Configurações do sistema, usuários, backup e operações administrativas',
      icon: '⚙️',
      gradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-50 to-gray-50'
    },
    relatorios: {
      title: 'Dashboard',
      description: 'Relatórios, análises e dashboards para acompanhamento de performance',
      icon: '📊',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-50'
    }
  }

  const info = categoryInfo[category] || categoryInfo.pista

  const difficulties = [
    { id: 'todos', name: 'Todos os Níveis' },
    { id: 'Básico', name: 'Básico' },
    { id: 'Intermediário', name: 'Intermediário' },
    { id: 'Avançado', name: 'Avançado' }
  ]

  const filteredTutorials = tutorialsData.filter(tutorial => {
    const matchesCategory = tutorial.category === category
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'todos' || tutorial.difficulty === selectedDifficulty
    return matchesCategory && matchesSearch && matchesDifficulty
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${info.bgGradient} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">{info.icon}</div>
          <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent mb-6`}>
            {info.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {info.description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{filteredTutorials.length} tutoriais disponíveis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar tutoriais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDifficulty === difficulty.id
                    ? `bg-gradient-to-r ${info.gradient} text-white shadow-lg`
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum tutorial encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar sua busca ou filtros</p>
            <Link 
              to="/"
              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${info.gradient} text-white rounded-xl font-medium hover:shadow-lg transition-all`}
            >
              Ver todos os tutoriais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tutorialpresentacao
