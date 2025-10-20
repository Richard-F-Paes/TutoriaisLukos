import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Search, Filter, Play, Clock, Target, BookOpen, Package, Shirt, Smartphone, Home, Car, Gamepad2, Book, Heart, Utensils, Dumbbell, Baby, Briefcase, Palette} from 'lucide-react'

const Categoriaisdostutoriais = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['Todas', 'Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros', 'Saúde', 'Alimentação']

  const categoryData = [
    {
      id: 1,
      title: 'Eletrônicos',
      category: 'Eletrônicos',
      productCount: 145,
      icon: Smartphone,
      color: 'from-blue-500 to-blue-600',
      description: 'Smartphones, tablets, notebooks e acessórios tecnológicos',
      hasNewProducts: true
    },
    {
      id: 2,
      title: 'Roupas e Moda',
      category: 'Roupas',
      productCount: 89,
      icon: Shirt,
      color: 'from-pink-500 to-rose-600',
      description: 'Vestuário masculino, feminino e infantil',
      hasNewProducts: false
    },
    {
      id: 3,
      title: 'Casa e Decoração',
      category: 'Casa',
      productCount: 67,
      icon: Home,
      color: 'from-green-500 to-emerald-600',
      description: 'Móveis, decoração e utensílios domésticos',
      hasNewProducts: false
    },
    {
      id: 4,
      title: 'Automotivo',
      category: 'Eletrônicos',
      productCount: 34,
      icon: Car,
      color: 'from-gray-600 to-gray-700',
      description: 'Peças, acessórios e produtos automotivos',
      hasNewProducts: false
    },
    {
      id: 5,
      title: 'Games e Entretenimento',
      category: 'Eletrônicos',
      productCount: 78,
      icon: Gamepad2,
      color: 'from-purple-500 to-violet-600',
      description: 'Jogos, consoles e acessórios para games',
      hasNewProducts: false
    },
    {
      id: 6,
      title: 'Livros e Educação',
      category: 'Livros',
      productCount: 156,
      icon: Book,
      color: 'from-amber-500 to-orange-600',
      description: 'Livros, cursos e materiais educativos',
      hasNewProducts: false
    },
    {
      id: 7,
      title: 'Saúde e Beleza',
      category: 'Saúde',
      productCount: 92,
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      description: 'Cosméticos, suplementos e produtos de saúde',
      hasNewProducts: false
    },
    {
      id: 8,
      title: 'Alimentação',
      category: 'Alimentação',
      productCount: 43,
      icon: Utensils,
      color: 'from-yellow-500 to-orange-500',
      description: 'Alimentos, bebidas e produtos gourmet',
      hasNewProducts: false
    },
    {
      id: 9,
      title: 'Esportes e Fitness',
      category: 'Esportes',
      productCount: 61,
      icon: Dumbbell,
      color: 'from-indigo-500 to-blue-600',
      description: 'Equipamentos esportivos e suplementos',
      hasNewProducts: false
    },
    {
      id: 10,
      title: 'Bebês e Crianças',
      category: 'Roupas',
      productCount: 55,
      icon: Baby,
      color: 'from-cyan-500 to-teal-600',
      description: 'Produtos infantis, brinquedos e acessórios',
      hasNewProducts: false
    },
    {
      id: 11,
      title: 'Escritório e Papelaria',
      category: 'Livros',
      productCount: 38,
      icon: Briefcase,
      color: 'from-slate-500 to-gray-600',
      description: 'Material de escritório e papelaria',
      hasNewProducts: false
    },
    {
      id: 12,
      title: 'Arte e Artesanato',
      category: 'Casa',
      productCount: 29,
      icon: Palette,
      color: 'from-emerald-500 to-green-600',
      description: 'Materiais artísticos e produtos artesanais',
      hasNewProducts: false
    }
  ]

  const filteredCategories = categoryData.filter(item => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gerenciamento de Categorias
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize e gerencie todas as categorias de produtos do sistema
          </p>
        </div>

        {/* Tutorial em Destaque */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold mb-2">📚 Tutorial de Cadastro</h2>
              <p className="text-lg opacity-90 mb-4">
                Aprenda o passo a passo completo para cadastrar produtos no sistema
              </p>
              <div className="flex items-center space-x-4 text-sm opacity-80">
                <span>• 6 etapas detalhadas</span>
                <span>• Validações automáticas</span>
                <span>• Dicas profissionais</span>
              </div>
            </div>
            <Link
              to="/aula-interativa"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Iniciar Tutorial
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredCategories.length} categoria{filteredCategories.length !== 1 ? 's' : ''}
            {selectedCategory !== 'Todas' && ` na categoria "${selectedCategory}"`}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((item) => {
            const IconComponent = item.icon
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <IconComponent className="h-20 w-20 text-white" />
                  </div>
                  
                  {item.hasNewProducts && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Novos Produtos
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2">
                    <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {item.productCount} produtos
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {item.productCount} itens
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {item.category}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/video/${item.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Gerenciar
                    </Link>
                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      <Package className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categoriaisdostutoriais
