
import React from 'react'
import { Link } from 'react-router-dom'
import {Clock, User, ArrowRight} from 'lucide-react'

const TutorialCard = ({ tutorial }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Básico':
        return 'bg-green-100 text-green-800'
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800'
      case 'Avançado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'pista':
        return 'bg-orange-100 text-orange-800'
      case 'conveniencia':
        return 'bg-purple-100 text-purple-800'
      case 'sistema':
        return 'bg-gray-100 text-gray-800'
      case 'relatorios':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getCategoryName = (category) => {
    switch (category) {
      case 'pista':
        return 'Pista'
      case 'conveniencia':
        return 'Conveniência'
      case 'sistema':
        return 'Sistema'
      case 'relatorios':
        return 'Relatórios'
      default:
        return category
    }
  }

  return (
    <Link to={`/tutorial/${tutorial.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
        {/* Image or Icon */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          {tutorial.image ? (
            <img 
              src={tutorial.image} 
              alt={tutorial.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl mb-3 mx-auto w-fit">
                <tutorial.icon className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-600">{tutorial.title}</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tutorial.category)}`}>
              {getCategoryName(tutorial.category)}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
              {tutorial.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {tutorial.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {tutorial.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{tutorial.author}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Ver Tutorial
            </span>
            <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TutorialCard
