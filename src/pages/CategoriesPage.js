import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setCategories([
        {
          id: 'pdv',
          title: 'PDV - Ponto de Venda',
          description: 'Aprenda a usar o sistema de vendas do Lukos',
          icon: '🛒',
          tutorialCount: 12,
          color: 'bg-blue-500'
        },
        {
          id: 'retaguarda',
          title: 'Retaguarda',
          description: 'Gerencie estoque, produtos e fornecedores',
          icon: '📦',
          tutorialCount: 8,
          color: 'bg-green-500'
        },
        {
          id: 'faturamento',
          title: 'Faturamento',
          description: 'Controle financeiro e emissão de notas',
          icon: '💰',
          tutorialCount: 6,
          color: 'bg-yellow-500'
        },
        {
          id: 'relatorios',
          title: 'Relatórios',
          description: 'Análise de vendas e performance',
          icon: '📊',
          tutorialCount: 4,
          color: 'bg-purple-500'
        },
        {
          id: 'configuracoes',
          title: 'Configurações',
          description: 'Personalize o sistema conforme sua necessidade',
          icon: '⚙️',
          tutorialCount: 10,
          color: 'bg-gray-500'
        },
        {
          id: 'integracao',
          title: 'Integração',
          description: 'Conecte com outros sistemas e APIs',
          icon: '🔗',
          tutorialCount: 3,
          color: 'bg-indigo-500'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Carregando categorias...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <motion.div 
        className="page-header text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Categorias de Tutoriais
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore todas as categorias disponíveis e encontre os tutoriais que você precisa
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="card hover:shadow-xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link to={`/categoria/${category.id}`} className="block">
              <div className="card-body p-8">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.tutorialCount} tutoriais
                  </span>
                  <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                    Explorar
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-gray-600 mb-6">
          Não encontrou o que procura? Use nossa busca avançada
        </p>
        <Link 
          to="/busca" 
          className="btn btn-primary inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar Tutoriais
        </Link>
      </motion.div>
    </div>
  );
}

export default CategoriesPage;
