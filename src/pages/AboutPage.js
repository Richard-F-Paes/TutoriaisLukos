import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import "./AboutPage.css";

function AboutPage() {
  const features = [
    {
      icon: '🎯',
      title: 'Tutoriais Interativos',
      description: 'Aprenda através de tutoriais práticos e interativos que simulam o ambiente real do sistema.'
    },
    {
      icon: '📚',
      title: 'Conteúdo Completo',
      description: 'Cobertura completa de todas as funcionalidades do sistema Lukos, do básico ao avançado.'
    },
    {
      icon: '⚡',
      title: 'Aprendizado Rápido',
      description: 'Metodologia otimizada para que você aprenda rapidamente e aplique imediatamente.'
    },
    {
      icon: '🔄',
      title: 'Atualizações Constantes',
      description: 'Conteúdo sempre atualizado com as últimas versões e funcionalidades do sistema.'
    },
    {
      icon: '👥',
      title: 'Comunidade Ativa',
      description: 'Participe de uma comunidade de usuários que compartilham conhecimento e experiências.'
    },
    {
      icon: '🛠️',
      title: 'Suporte Técnico',
      description: 'Equipe especializada pronta para ajudar com dúvidas e problemas técnicos.'
    }
  ];

  const stats = [
    { number: '15+', label: 'Tutoriais Disponíveis' },
    { number: '5K+', label: 'Usuários Ativos' },
    { number: '98%', label: 'Taxa de Satisfação' },
    { number: '24/7', label: 'Suporte Disponível' }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <motion.div 
        className="about-hero text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="about-title text-5xl font-bold text-gray-900 mb-6">
          Sobre o <span className="text-primary-600">Tutorial Lukos</span>
        </h1>
        <p className="about-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A plataforma definitiva para aprender o sistema Lukos. Transformamos a complexidade em simplicidade, 
          oferecendo tutoriais interativos e didáticos para dominar todas as funcionalidades do sistema.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="ts grid grid-cols-2 md:grid-cols-4 gapabout-sta-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="about-stat-card text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <div className="stat-number text-4xl font-bold text-primary-600 mb-2">
              {stat.number}
            </div>
            <div className="stat-label text-gray-600 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission, Vision, Values */}
      <motion.div 
        className="about-core grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="card-about"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-icon text-4xl mb-4">🎯</div>
          <h3 className="card-title text-xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
          <p className="card-text text-gray-600 leading-relaxed">
            Facilitar o aprendizado do sistema Lukos através de tutoriais interativos, 
            didáticos e práticos, democratizando o acesso ao conhecimento tecnológico.
          </p>
        </motion.div>

        <motion.div 
          className="card-about"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-icon text-4xl mb-4">🚀</div>
          <h3 className="card-title text-xl font-bold text-gray-900 mb-4">Nossa Visão</h3>
          <p className="card-text text-gray-600 leading-relaxed">
            Ser a principal referência em tutoriais para sistemas de PDV e retaguarda, 
            reconhecida pela qualidade e eficácia do ensino.
          </p>
        </motion.div>

        <motion.div 
          className="card-about"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-icon text-4xl mb-4">💎</div>
          <h3 className="card-title text-xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
          <p className="card-text text-gray-600 leading-relaxed">
            Qualidade, simplicidade, eficiência e inovação no ensino de tecnologia, 
            sempre priorizando a experiência do usuário.
          </p>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div 
        className="card-about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="features-title text-3xl font-bold text-gray-900 text-center mb-12">
          Por que escolher o Tutorial Lukos?
        </h2>
        
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className=" card-about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon text-3xl mb-4">{feature.icon}</div>
              <h3 className="feature-title text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="feature-text text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="card-about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="team-header text-center mb-8">
          <h2 className="about-text">
            Nossa Equipe
          </h2>
          <p className="team-subtitle text-gray-600 max-w-2xl mx-auto">
            Profissionais especializados em sistemas de gestão e educação, 
            dedicados a criar a melhor experiência de aprendizado possível.
          </p>
        </div>
        
        <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="team-card text-center">
            <div className="team-avatar w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              TL
            </div>
            <h3 className="team-role font-semibold text-gray-900 mb-2">Equipe Técnica</h3>
            <p className="team-text text-gray-600 text-sm">
              Especialistas em sistemas Lukos com anos de experiência
            </p>
          </div>
          
          <div className="team-card text-center">
            <div className="team-avatar w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              ED
            </div>
            <h3 className="team-role font-semibold text-gray-900 mb-2">Educadores</h3>
            <p className="team-text text-gray-600 text-sm">
              Pedagogos especializados em educação tecnológica
            </p>
          </div>
          
          <div className="team-card text-center">
            <div className="team-avatar w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              UX
            </div>
            <h3 className="team-role font-semibold text-gray-900 mb-2">Designers UX/UI</h3>
            <p className="team-text text-gray-600 text-sm">
              Criadores de interfaces intuitivas e experiências fluidas
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="card-about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2 className="about-title">
          Pronto para começar sua jornada?
        </h2>
        <p className="cta-subtitle text-gray-600 mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de usuários que já dominam o sistema Lukos através dos nossos tutoriais.
        </p>
        
        <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/tutoriais" 
            className="btn btn-primary inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Explorar Tutoriais
          </Link>
          
          <Link 
            to="/categorias" 
            className="btn btn-secondary inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Ver Categorias
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutPage;
