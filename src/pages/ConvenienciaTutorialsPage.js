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
  TrendingDown
} from 'lucide-react'

const ConvenienciaTutorialsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const tutorials = [
    // LOJA
    {
      id: 'venda-produtos-loja',
      title: 'Venda de Produtos na Loja',
      category: 'Loja',
      subcategory: 'Vendas',
      difficulty: 'Iniciante',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-700',
      videoUrl: '',
      description: 'Processo completo de venda de produtos na loja de conveniência.',
      instructions: [
        {
          step: 1,
          title: 'Acesso ao PDV Loja',
          description: 'Acesse o sistema PDV > Loja e configure o terminal',
          duration: '1 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=29',
          tips: 'Verifique conexão com sistema e confirme operador',
          focusArea: 'Acesso ao sistema'
        },
        {
          step: 2,
          title: 'Seleção de Produtos',
          description: 'Selecione os produtos desejados pelo código de barras ou busca',
          duration: '2 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=30',
          tips: 'Use leitor de código de barras e confirme produtos selecionados',
          focusArea: 'Seleção de produtos'
        },
        {
          step: 3,
          title: 'Identificação do Cliente',
          description: 'Identifique o cliente e configure forma de pagamento',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=31',
          tips: 'Digite CPF/CNPJ se necessário e selecione forma de pagamento',
          focusArea: 'Identificação do cliente'
        },
        {
          step: 4,
          title: 'Processamento da Venda',
          description: 'Processe a venda e confirme os valores antes de finalizar',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=32',
          tips: 'Revise valores totais e confirme dados do cliente',
          focusArea: 'Processamento'
        },
        {
          step: 5,
          title: 'Finalização e Cupom',
          description: 'Finalize a venda e emita o cupom fiscal',
          duration: '2 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=33',
          tips: 'Emita cupom fiscal e confirme pagamento',
          focusArea: 'Finalização'
        }
      ],
      tips: [
        'Sempre verifique preços antes da venda',
        'Confirme dados do cliente quando necessário',
        'Emita cupom fiscal corretamente',
        'Valide forma de pagamento',
        'Mantenha controle de estoque atualizado'
      ],
      commonMistakes: [
        'Preços não atualizados',
        'Dados do cliente incorretos',
        'Cupom fiscal não emitido',
        'Forma de pagamento não confirmada',
        'Estoque não atualizado'
      ],
      resources: [
        { name: 'Manual Loja', type: 'pdf', size: '2.0 MB' },
        { name: 'Códigos de Barras', type: 'xlsx', size: '150 KB' }
      ]
    },

    // ESTOQUE
    {
      id: 'gestao-estoque-conveniencia',
      title: 'Gestão de Estoque - Conveniência',
      category: 'Estoque',
      subcategory: 'Controle',
      difficulty: 'Intermediário',
      icon: Package2,
      color: 'from-blue-500 to-blue-700',
      videoUrl: '',
      description: 'Como gerenciar o estoque da loja de conveniência.',
      instructions: [
        {
          step: 1,
          title: 'Acesso ao Controle de Estoque',
          description: 'Acesse o menu Retaguarda > Estoque > Consulta Estoque',
          duration: '2 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=34',
          tips: 'Verifique permissões de acesso e confirme unidade operacional',
          focusArea: 'Acesso ao sistema'
        },
        {
          step: 2,
          title: 'Consulta de Produtos',
          description: 'Consulte produtos por categoria, departamento ou código',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=35',
          tips: 'Use filtros para busca e verifique níveis de estoque',
          focusArea: 'Consulta de produtos'
        },
        {
          step: 3,
          title: 'Controle de Validade',
          description: 'Monitore produtos próximos do vencimento',
          duration: '4 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=36',
          tips: 'Configure alertas de validade e monitore produtos críticos',
          focusArea: 'Controle de validade'
        },
        {
          step: 4,
          title: 'Reposição Automática',
          description: 'Configure reposição automática para produtos essenciais',
          duration: '5 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=37',
          tips: 'Configure pontos de reposição e defina quantidades mínimas',
          focusArea: 'Reposição automática'
        },
        {
          step: 5,
          title: 'Relatórios de Estoque',
          description: 'Gere relatórios de movimentação e análise de estoque',
          duration: '3 min',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=38',
          tips: 'Gere relatório de movimentação e analise produtos mais vendidos',
          focusArea: 'Relatórios'
        }
      ],
      tips: [
        'Monitore níveis de estoque regularmente',
        'Configure alertas de validade',
        'Use reposição automática para produtos essenciais',
        'Analise relatórios de movimentação',
        'Mantenha estoque mínimo adequado'
      ],
      commonMistakes: [
        'Não monitorar níveis de estoque',
        'Ignorar alertas de validade',
        'Reposição automática mal configurada',
        'Não analisar relatórios',
        'Estoque mínimo inadequado'
      ],
      resources: [
        { name: 'Manual Estoque', type: 'pdf', size: '2.5 MB' },
        { name: 'Planilha Controle', type: 'xlsx', size: '200 KB' }
      ]
    }
  ]

  const categories = [
    { name: 'Loja', icon: Store, color: 'from-green-500 to-green-700', count: 1 },
    { name: 'Estoque', icon: Package2, color: 'from-blue-500 to-blue-700', count: 1 }
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
                Tutoriais de Conveniência
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial) => {
              const Icon = tutorial.icon
              return (
                <Link
                  to={`/tutorial/${tutorial.id}`}
                  key={tutorial.id}
                  className={`block rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border overflow-hidden group ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className={`relative h-48 w-full bg-gradient-to-br ${tutorial.color} flex items-center justify-center`}>
                    <Icon className="w-20 h-20 text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(tutorial.difficulty)}`}>
                      {tutorial.difficulty}
                    </span>
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-gray-900 bg-opacity-70 text-white text-xs font-semibold flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {tutorial.instructions.reduce((total, inst) => total + parseInt(inst.duration), 0)} min
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                    }`}>
                      {tutorial.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tutorial.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tutorial.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {tutorial.instructions.length} passos
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <section className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {selectedCategory ? `Estatísticas de ${selectedCategory}` : 'Estatísticas dos Tutoriais'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl font-bold text-blue-500 mb-2">{filteredTutorials.length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedCategory ? 'Tutoriais na Categoria' : 'Total de Tutoriais'}
              </div>
            </div>
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl font-bold text-green-500 mb-2">{categories.length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Módulos Disponíveis</div>
            </div>
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {filteredTutorials.reduce((total, tutorial) => total + tutorial.instructions.reduce((sum, inst) => sum + parseInt(inst.duration), 0), 0)}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Minutos de Conteúdo</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ConvenienciaTutorialsPage
