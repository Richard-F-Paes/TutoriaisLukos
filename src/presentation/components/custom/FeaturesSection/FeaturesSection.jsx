import React from 'react';
import { Zap, Shield, Users, Award, Clock, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Acesso Rápido',
      description: 'Encontre tutoriais e soluções de forma instantânea com nossa busca inteligente.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Conteúdo Confiável',
      description: 'Tutoriais verificados e atualizados por especialistas em tecnologia.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Participe de uma comunidade engajada e compartilhe conhecimento.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Conteúdo de alta qualidade com exemplos práticos e casos de uso reais.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Atualizações Constantes',
      description: 'Novos tutoriais e atualizações regulares para manter você sempre atualizado.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Star,
      title: 'Destaques em Destaque',
      description: 'Acesse os tutoriais mais populares e recomendados pela comunidade.',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Por que escolher nossos{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tutoriais?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos a melhor experiência de aprendizado com conteúdo atualizado e suporte completo
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
