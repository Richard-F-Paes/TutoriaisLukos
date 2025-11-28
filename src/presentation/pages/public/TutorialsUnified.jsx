import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Fuel, 
  ArrowRight, 
  Play, 
  BookOpen, 
  GraduationCap, 
  Video, 
  Image as ImageIcon, 
  CheckCircle2,
  Settings, 
  BarChart3, 
  CreditCard, 
  Users, 
  Smartphone,
  Clock, 
  Star, 
  PlayCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { getAllTutorials, getCategories } from '../../../shared/data/__mocks__/lukosTutorials.js';

// Componentes da HomePage original
import LandingHero from '../../components/custom/LandingHero/LandingHero';
import HeroTutorial from '../../components/features/HeroTutorial/HeroTutorial';
import TrainingSection from '../../components/custom/TrainingSection/TrainingSection';
import VideoShowcase from '../../components/videos/VideoShowcase/VideoShowcase';
import ServicesSection from '../../components/custom/ServicesSection/ServicesSection';
import TeamSection from '../../components/custom/TeamSection/TeamSection';
import TrainingScheduler from '../../components/custom/TrainingScheduler/TrainingScheduler';
import CustomSection from '../../components/custom/CustomSection/CustomSection';
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
      {/* Componentes da HomePage original */}
      <LandingHero />
      <HeroTutorial />
      <TrainingSection />
      
      {/* Header - Estilo Tutorials.jsx */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
              <GraduationCap className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Central de Tutoriais</h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-blue-200">
                <div className="flex items-center space-x-1">
                  <Video className="w-4 h-4" />
                  <span>Vídeos HD</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ImageIcon className="w-4 h-4" />
                  <span>Imagens Ilustrativas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Passo a Passo</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Aprenda a usar todas as funcionalidades dos nossos produtos com tutoriais passo a passo, vídeos explicativos e imagens ilustrativas.
          </p>
        </div>
      </div>

      {/* Categories Grid - Estilo Tutorials.jsx */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Categorias de Tutoriais</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore nossos tutoriais organizados por categoria para encontrar exatamente o que você precisa.
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

      </div>

      {/* Componentes adicionais da HomePage */}
      <VideoShowcase />
      <ServicesSection />
      <TeamSection />
      <TrainingScheduler />
      <CustomSection />
      <Chatbot />
    </div>
  );
};

export default TutorialsUnified;

