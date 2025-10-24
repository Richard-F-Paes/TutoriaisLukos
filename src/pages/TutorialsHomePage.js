import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Settings, 
  Fuel, 
  BarChart3, 
  CreditCard, 
  Users, 
  Smartphone,
  Clock, 
  Star, 
  PlayCircle, 
  BookOpen,
  TrendingUp,
  Award
} from 'lucide-react'
import { getAllTutorials, getCategories } from '../data/lukosTutorials'

const HomePage = () => {
  const tutorials = getAllTutorials()
  const categories = getCategories()

  const categoryIcons = {
    'Retaguarda': Settings,
    'PDV': Fuel,
    'Dashboard': BarChart3,
    'Fatura Web': CreditCard,
    'Pré-Venda': Users,
    'PDV Móvel': Smartphone
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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tutoriais Lukos
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Aprenda a usar o sistema Lukos com tutoriais completos, passo a passo, 
              desenvolvidos pela equipe de suporte técnico.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center text-purple-100">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{tutorials.length} Tutoriais Disponíveis</span>
              </div>
              <div className="flex items-center text-purple-100">
                <Award className="w-5 h-5 mr-2" />
                <span>Certificação Oficial</span>
              </div>
              <div className="flex items-center text-purple-100">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>Atualizado Regularmente</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Categorias de Tutoriais</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore nossos tutoriais organizados por categoria para encontrar exatamente o que você precisa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || BookOpen
            const categoryTutorials = tutorials.filter(t => t.category === category)
            
            return (
              <Link
                key={category}
                to={
                  category === 'Retaguarda' ? '/retaguarda-tutoriais' :
                  category === 'Conveniência' ? '/conveniencia-tutoriais' :
                  category === 'Dashboard' ? '/dashboard-tutoriais' :
                  category === 'PDV' ? '/pista-tutoriais' :
                  `/categoria/${category}`
                }
                className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {categoryTutorials.length} tutoriais
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {category === 'Retaguarda' && 'Cadastros, produtos, financeiro, estoque e relatórios.'}
                  {category === 'PDV' && 'Operações de pista e loja, encerramento de turno.'}
                  {category === 'Dashboard' && 'Relatórios avançados e análises de dados.'}
                  {category === 'Fatura Web' && 'Gestão de frota e requisições web.'}
                  {category === 'Pré-Venda' && 'Sistema de comandas e pré-vendas.'}
                  {category === 'PDV Móvel' && 'POS móvel e integrações.'}
                </p>
                <div className="flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700">
                  <span>Explorar tutoriais</span>
                  <PlayCircle className="w-4 h-4 ml-2" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Tutoriais em Destaque */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tutoriais em Destaque</h2>
            <p className="text-lg text-gray-600">
              Os tutoriais mais acessados e recomendados pela nossa equipe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.slice(0, 6).map((tutorial) => (
              <Link
                key={tutorial.id}
                to={`/tutorial/${tutorial.id}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-200 overflow-hidden"
              >
                {/* Imagem do Tutorial */}
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative overflow-hidden">
                  <img
                    src={`${tutorial.image}&t=${Date.now()}`}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1&t=${Date.now()}`;
                    }}
                    loading="lazy"
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

                  {/* Categoria */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      {tutorial.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Estatísticas da Plataforma</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{tutorials.length}</div>
              <div className="text-sm text-gray-500">Total de Tutoriais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {tutorials.filter(t => t.difficulty === 'Iniciante').length}
              </div>
              <div className="text-sm text-gray-500">Nível Iniciante</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {tutorials.filter(t => t.difficulty === 'Intermediário').length}
              </div>
              <div className="text-sm text-gray-500">Nível Intermediário</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {tutorials.filter(t => t.difficulty === 'Avançado').length}
              </div>
              <div className="text-sm text-gray-500">Nível Avançado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Suporte Técnico Lukos</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-300">
              <div>📞 (11) 4858-8429</div>
              <div>✉️ suporte@lukos.com.br</div>
              <div>🕒 Seg-Sex: 08h30 às 17h30</div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              © 2024 Lukos Soluções em Tecnologia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
