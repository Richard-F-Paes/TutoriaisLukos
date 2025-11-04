import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter,  Clock, Users } from 'lucide-react'

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const categories = [
    { id: 'all', name: 'Todas as Categorias' },
    { id: 'retaguarda', name: 'Retaguarda' },
    { id: 'pdv', name: 'PDV' },
    { id: 'relatorios', name: 'Relatórios' },
    { id: 'configuracoes', name: 'Configurações' },
  ]

  const levels = [
    { id: 'all', name: 'Todos os Tutoriais' },
    { id: 'pago', name: 'Com Valor' },
  ]

  const tutorials = [
    {
      id: 1,
      title: "Cadastro de Produtos no PDV",
      instructor: "Equipe Lukos",
        
      category: "pdv",
      image: "retaguarda.png",
      description: "Aprenda a cadastrar produtos rapidamente no PDV."
    },
    {
      id: 2,
      title: "Fechamento de Caixa e Relatórios",
      instructor: "Equipe Lukos",

      category: "retaguarda",
      image: "retaguarda.png",      
      description: "Veja como realizar fechamento de caixa e gerar relatórios."
    },
    {
      id: 3,
      title: "Configurações Avançadas do Sistema",
      instructor: "Equipe Lukos",
 

 
      category: "configuracoes",
      image: "retaguarda.png",      
      description: "Aprenda a configurar opções avançadas para seu sistema."
    },
    {
      id: 4,
      title: "Emitindo Notas Fiscais",
      instructor: "Equipe Lukos",
    

  
      category: "retaguarda",
      image: "retaguarda.png",      
      description: "Tutorial passo a passo para emissão de notas fiscais."
    },
    {
      id: 5,
      title: "Relatórios de Vendas Personalizados",
      instructor: "Equipe Lukos",
 

      category: "relatorios",
      image: "retaguarda.png",      
      description: "Como gerar relatórios detalhados de vendas."
    },
    {
      id: 6,
      title: "PDV - Recebendo Pagamentos",
      instructor: "Equipe Lukos",


      category: "pdv",
      image: "retaguarda.png",      
      description: "Aprenda a registrar recebimentos e pagamentos no PDV."
    },
  ]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tutorial.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || tutorial.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutoriais Lukos</h1>
          <p className="text-xl text-gray-600">
            Tutoriais gratuitos e pagos para clientes e usuários do sistema
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar tutoriais..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>

            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              Filtrar
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredTutorials.length} de {tutorials.length} tutoriais
          </p>
        </div>

        {/* Grid de Tutoriais */}
        <div className="grid grid-cols-3 gap-6">
          {filteredTutorials.map(tutorial => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={tutorial.image}
                alt={tutorial.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {categories.find(c => c.id === tutorial.category)?.name}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {levels.find(l => l.id === tutorial.level)?.name}
                  </span>
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{tutorial.instructor}</p>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{tutorial.description}</p>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" /> {tutorial.students}
                    </div>
                  </div>
              
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">{tutorial.price}</span>
                  <Link
                    to={`/tutorial/${tutorial.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 transition-colors"
                  >
                    Ver Tutorial
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum tutorial encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tutorials
