import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Fuel, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Users, 
  Smartphone,
  Clock, 
  Star, 
  PlayCircle,
  ShoppingCart
} from 'lucide-react';
import { getAllTutorials, getCategories } from '../../../shared/data/__mocks__/lukosTutorials.js';

// Componentes da HomePage original
import { Chatbot } from '../../components/custom/Chatbot/Chatbot';

const TutorialsUnified = () => {
  const tutorials = getAllTutorials();
  const categories = getCategories();

  // Categorias de tutoriais do componente Tutorials.jsx
  const tutorialCategories = [
    {
      id: "Retaguarda",
      title: "Retaguarda",
      description: "Controle completo de estoque, produtos e relatórios",
      icon: FileText,
      color: "blue",
      tutorials: tutorials.filter(t => t.category === 'Retaguarda').length,
      duration: "45 min",
      image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/retaguarda-tutoriais"
    },
    {
      id: "PDV",
      title: "PDV",
      description: "Controle completo de vendas, pagamentos e relatórios",
      icon: FileText,
      color: "indigo",
      tutorials: tutorials.filter(t => t.category === 'PDV').length,
      duration: "1h 20min",
      image: "https://images.unsplash.com/photo-1602665742701-389671bc40c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      link: "/PDV"
    },
    {
      id: "Dashboard",
      title: "Dashboard",
      description: "Painel de controle completo de vendas, pagamentos e relatórios",
      icon: Fuel,
      color: "indigo",
      tutorials: tutorials.filter(t => t.category === 'Dashboard').length,
      duration: "35 min",
      image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
      link: "/dashboard-tutoriais"
    },
    {
      id: "Pré-Venda",
      title: "Pré-Venda",
      description: "Orçamentos, pedidos e gestão de vendas externas",
      icon: Fuel,
      color: "indigo",
      tutorials: tutorials.filter(t => t.category === 'Pré-Venda').length,
      duration: "55 min",
      image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073",
      link: "/prevenda"
    },
    {
      id: "Fatura Web",
      title: "Fatura Web",
      description: "Controle completo de vendas, pagamentos e relatórios",
      icon: Fuel,
      color: "indigo",
      tutorials: tutorials.filter(t => t.category === 'Fatura Web').length,
      duration: "40 min",
      image: "https://plus.unsplash.com/premium_photo-1678139620956-cbd87b6ba3d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      link: "/FaturaWeb"
    },
    {
      id: "PDV-Smart POS",
      title: "PDV-Smart POS",
      description: "Controle completo de vendas, pagamentos e relatórios",
      icon: Fuel,
      color: "indigo",
      tutorials: tutorials.filter(t => t.category === 'PDV-Smart POS').length,
      duration: "40 min",
      image: "https://images.unsplash.com/photo-1556742521-9713bf272865?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      link: "/lukos-pay"
    },
    {
      id: "Conveniência",
      title: "Conveniência",
      description: "Controle completo de estoque, produtos e relatórios",
      icon: Fuel,
      color: "indigo",
      tutorials: tutorials.filter(t => t.category === 'Conveniência').length,
      duration: "40 min",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      link: "/conveniencia-tutoriais"
    }
  ];

  const categoryIcons = {
    'Retaguarda': Settings,
    'PDV': Fuel,
    'Dashboard': BarChart3,
    'Fatura Web': CreditCard,
    'Pré-Venda': Users,
    'PDV Móvel': Smartphone
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: "from-blue-50 to-white", border: "border-blue-200", text: "text-blue-600", icon: "bg-blue-600" },
      indigo: { bg: "from-indigo-50 to-white", border: "border-indigo-200", text: "text-indigo-600", icon: "bg-indigo-600" },
      orange: { bg: "from-orange-50 to-white", border: "border-orange-200", text: "text-orange-600", icon: "bg-orange-600" },
      amber: { bg: "from-amber-50 to-white", border: "border-amber-200", text: "text-amber-600", icon: "bg-amber-600" },
      green: { bg: "from-green-50 to-white", border: "border-green-200", text: "text-green-600", icon: "bg-green-600" },
      teal: { bg: "from-teal-50 to-white", border: "border-teal-200", text: "text-teal-600", icon: "bg-teal-600" },
      purple: { bg: "from-purple-50 to-white", border: "border-purple-200", text: "text-purple-600", icon: "bg-purple-600" }
    };
    return colors[color] || colors.blue;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Categories Grid - Estilo Tutorials.jsx */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-300">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg transform rotate-6 hover:-rotate-6 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tutoriais do Sistema
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Aprenda a usar todas as funcionalidades do sistema PDV para pista de combustível 
            e conveniência com nossos tutoriais passo a passo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tutorialCategories.map((category) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            return (
              <Link
                key={category.id}
                to={category.link || `/tutoriais/${category.id}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl overflow-hidden border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                      <div className={`${colors.icon} p-2 rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">{category.tutorials} tutoriais</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Play className="w-4 h-4" />
                        <span>{category.duration}</span>
                      </div>
                      
                      <div className={`flex items-center space-x-2 ${colors.text} font-semibold group-hover:translate-x-2 transition-transform`}>
                        <span>Acessar</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tutoriais em Destaque - Estilo TutorialsHomePage.js */}
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
      </div>

      {/* Componentes adicionais da HomePage */}
      <Chatbot />
    </div>
  );
};

export default TutorialsUnified;

