import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Clock,
  Star,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Building,
  MapPin,
  UserCheck,
  UserPlus,
  Search,
  Globe,
  CheckCircle,
  Tag,
  Settings,
  Phone,
  Shield,
  Wrench,
  Truck,
  Fuel,
  Package,
  DollarSign,
  Calendar,
  Clock as ClockIcon,
  CreditCard,
  Building2,
  Download,
  Grid,
  Receipt,
  BarChart3,
  Calculator,
  FileSpreadsheet,
  Target,
  FileText,
  Plus,
  Upload,
  ArrowLeft,
  Zap,
  Sun,
  Moon,
  ShoppingCart,
  Store,
  Package2,
  TrendingDown,
  Monitor,
  PieChart,
  Activity
} from 'lucide-react'

const DashboardTutorialsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const tutorials = [
    // RELATÓRIOS
    {
      id: 'dashboard-principal',
      title: 'Dashboard Principal',
      category: 'Relatórios',
      subcategory: 'Dashboard',
      difficulty: 'Intermediário',
      icon: Monitor,
      color: 'from-purple-500 to-purple-700',
      videoUrl: '',
      description: 'Navegue pelo dashboard principal do sistema Lukos e configure indicadores.',
      instructions: [
        {
          step: 1,
          title: 'Acesso ao Dashboard',
          description: 'Acesse o menu Dashboard > Principal e visualize os indicadores principais',
          duration: '2 min',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=19',
          tips: 'Verifique conexão com sistema e confirme permissões de acesso',
          focusArea: 'Acesso ao sistema'
        },
        {
          step: 2,
          title: 'Visualização de Indicadores',
          description: 'Explore os widgets de vendas, estoque e financeiro disponíveis',
          duration: '5 min',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=20',
          tips: 'Analise indicadores de vendas e monitore níveis de estoque',
          focusArea: 'Indicadores principais'
        },
        {
          step: 3,
          title: 'Configuração Personalizada',
          description: 'Configure widgets personalizados e alertas importantes',
          duration: '6 min',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=21',
          tips: 'Configure alertas de estoque e defina metas de vendas',
          focusArea: 'Configuração'
        },
        {
          step: 4,
          title: 'Relatórios Rápidos',
          description: 'Acesse relatórios rápidos e exporte dados importantes',
          duration: '4 min',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=22',
          tips: 'Gere relatórios de vendas e exporte dados para análise',
          focusArea: 'Relatórios'
        },
        {
          step: 5,
          title: 'Monitoramento Contínuo',
          description: 'Configure monitoramento automático e notificações',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=23',
          tips: 'Configure notificações e monitore indicadores regularmente',
          focusArea: 'Monitoramento'
        }
      ],
      tips: [
        'Configure widgets personalizados para suas necessidades',
        'Defina alertas importantes para monitoramento',
        'Monitore indicadores regularmente',
        'Use relatórios rápidos para análise',
        'Mantenha dashboard atualizado'
      ],
      commonMistakes: [
        'Não configurar alertas importantes',
        'Ignorar indicadores críticos',
        'Dashboard não personalizado',
        'Não monitorar regularmente',
        'Alertas mal configurados'
      ],
      resources: [
        { name: 'Manual Dashboard', type: 'pdf', size: '2.8 MB' },
        { name: 'Guia Widgets', type: 'pdf', size: '400 KB' }
      ]
    },

    {
      id: 'relatorios-comerciais',
      title: 'Relatórios Comerciais',
      category: 'Relatórios',
      subcategory: 'Comerciais',
      difficulty: 'Intermediário',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-700',
      videoUrl: '',
      description: 'Gere relatórios de vendas e lucratividade no sistema Lukos.',
      instructions: [
        {
          step: 1,
          title: 'Acesso aos Relatórios',
          description: 'Acesse o menu Dashboard > Relatórios > Comerciais',
          duration: '2 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=24',
          tips: 'Verifique permissões de acesso e confirme conexão com dados',
          focusArea: 'Acesso ao sistema'
        },
        {
          step: 2,
          title: 'Seleção do Relatório',
          description: 'Escolha o tipo de relatório comercial desejado',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=25',
          tips: 'Selecione relatório de vendas ou escolha relatório de lucratividade',
          focusArea: 'Seleção de relatório'
        },
        {
          step: 3,
          title: 'Configuração de Filtros',
          description: 'Configure filtros de período, produtos e unidades',
          duration: '5 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=26',
          tips: 'Defina período de análise e configure filtros de produtos',
          focusArea: 'Configuração de filtros'
        },
        {
          step: 4,
          title: 'Geração do Relatório',
          description: 'Gere o relatório e analise os dados apresentados',
          duration: '4 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=27',
          tips: 'Analise dados de vendas e verifique indicadores de lucratividade',
          focusArea: 'Análise de dados'
        },
        {
          step: 5,
          title: 'Exportação e Compartilhamento',
          description: 'Exporte o relatório em diferentes formatos e compartilhe',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=28',
          tips: 'Exporte em PDF/Excel e compartilhe com equipe',
          focusArea: 'Exportação'
        }
      ],
      tips: [
        'Configure filtros adequados para análise',
        'Escolha período correto para comparação',
        'Exporte em formato adequado para uso',
        'Analise tendências e padrões',
        'Compartilhe relatórios com equipe'
      ],
      commonMistakes: [
        'Filtros inadequados para análise',
        'Período incorreto selecionado',
        'Formato de exportação inadequado',
        'Não analisar dados apresentados',
        'Relatórios não compartilhados'
      ],
      resources: [
        { name: 'Manual Relatórios', type: 'pdf', size: '3.2 MB' },
        { name: 'Modelos Relatórios', type: 'xlsx', size: '600 KB' }
      ]
    }
  ]

  const categories = [
    { name: 'Relatórios', icon: BarChart3, color: 'from-purple-500 to-purple-700', count: 2 }
  ]

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

  const filteredTutorials = selectedCategory 
    ? tutorials.filter(tutorial => tutorial.category === selectedCategory)
    : tutorials

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} hover:text-purple-600 transition-colors`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tutoriais de Dashboard
              </h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200 transition-colors`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Categorias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={`relative p-6 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category.name 
                      ? 'ring-2 ring-purple-500 shadow-lg' 
                      : 'hover:shadow-md'
                  } ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl opacity-10`} />
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {category.count} tutorial{category.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tutorials */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Tutoriais Disponíveis
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 transition-colors`}
              >
                Ver Todos
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => {
              const Icon = tutorial.icon
              return (
                <div
                  key={tutorial.id}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tutorial.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tutorial.color} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm font-medium">4.8</span>
                        </div>
                      </div>
                    </div>

                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-purple-600 transition-colors`}>
                      {tutorial.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tutorial.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{tutorial.instructions.length} passos</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{tutorial.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/tutorial/${tutorial.id}`}
                        className={`inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r ${tutorial.color} text-white hover:shadow-md transition-all duration-200`}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Começar Tutorial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Estatísticas do Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {tutorials.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Tutoriais Disponíveis
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {categories.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Categorias
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                4.8
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Avaliação Média
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTutorialsPage
