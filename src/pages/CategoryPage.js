import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryData = {
    pdv: {
      title: 'PDV - Ponto de Venda',
      description: 'Aprenda a usar o sistema de vendas do Lukos',
      icon: '🛒',
      color: 'bg-blue-500',
      longDescription: 'O PDV (Ponto de Venda) é o coração do sistema Lukos. Aqui você aprenderá todas as funcionalidades essenciais para realizar vendas de forma eficiente e profissional.'
    },
    retaguarda: {
      title: 'Retaguarda',
      description: 'Gerencie estoque, produtos e fornecedores',
      icon: '📦',
      color: 'bg-green-500',
      longDescription: 'A retaguarda é onde você gerencia todo o seu negócio. Controle de estoque, cadastro de produtos, fornecedores e muito mais.'
    },
    faturamento: {
      title: 'Faturamento',
      description: 'Controle financeiro e emissão de notas',
      icon: '💰',
      color: 'bg-yellow-500',
      longDescription: 'Sistema completo de faturamento com emissão de notas fiscais, controle de recebimentos e relatórios financeiros.'
    },
    relatorios: {
      title: 'Relatórios',
      description: 'Análise de vendas e performance',
      icon: '📊',
      color: 'bg-purple-500',
      longDescription: 'Relatórios detalhados para análise de performance, vendas, estoque e tomada de decisões estratégicas.'
    },
    configuracoes: {
      title: 'Configurações',
      description: 'Personalize o sistema conforme sua necessidade',
      icon: '⚙️',
      color: 'bg-gray-500',
      longDescription: 'Configure o sistema Lukos de acordo com as necessidades específicas do seu negócio.'
    },
    integracao: {
      title: 'Integração',
      description: 'Conecte com outros sistemas e APIs',
      icon: '🔗',
      color: 'bg-indigo-500',
      longDescription: 'Integre o Lukos com outros sistemas, APIs e ferramentas para otimizar seus processos.'
    }
  };

  const tutorialsData = {
    pdv: [
      { id: 1, title: 'Primeira Venda no PDV', description: 'Aprenda a realizar sua primeira venda', duration: '5 min', difficulty: 'Iniciante' },
      { id: 2, title: 'Gestão de Clientes', description: 'Como cadastrar e gerenciar clientes', duration: '8 min', difficulty: 'Iniciante' },
      { id: 3, title: 'Formas de Pagamento', description: 'Configurar e usar diferentes formas de pagamento', duration: '10 min', difficulty: 'Intermediário' },
      { id: 4, title: 'Descontos e Promoções', description: 'Aplicar descontos e criar promoções', duration: '7 min', difficulty: 'Intermediário' },
      { id: 5, title: 'Relatórios de Vendas', description: 'Visualizar e analisar relatórios de vendas', duration: '12 min', difficulty: 'Avançado' }
    ],
    retaguarda: [
      { id: 6, title: 'Cadastro de Produtos', description: 'Como cadastrar produtos no sistema', duration: '15 min', difficulty: 'Iniciante' },
      { id: 7, title: 'Controle de Estoque', description: 'Gerenciar estoque e inventário', duration: '20 min', difficulty: 'Intermediário' },
      { id: 8, title: 'Fornecedores', description: 'Cadastro e gestão de fornecedores', duration: '10 min', difficulty: 'Iniciante' }
    ],
    faturamento: [
      { id: 9, title: 'Emissão de Nota Fiscal', description: 'Como emitir notas fiscais', duration: '18 min', difficulty: 'Intermediário' },
      { id: 10, title: 'Controle de Recebimentos', description: 'Gerenciar recebimentos e contas a receber', duration: '12 min', difficulty: 'Intermediário' }
    ],
    relatorios: [
      { id: 11, title: 'Relatório de Vendas', description: 'Análise detalhada de vendas', duration: '8 min', difficulty: 'Iniciante' },
      { id: 12, title: 'Relatório de Estoque', description: 'Controle de estoque e movimentações', duration: '10 min', difficulty: 'Intermediário' }
    ],
    configuracoes: [
      { id: 13, title: 'Configurações Básicas', description: 'Configurações iniciais do sistema', duration: '15 min', difficulty: 'Iniciante' },
      { id: 14, title: 'Usuários e Permissões', description: 'Gerenciar usuários e suas permissões', duration: '12 min', difficulty: 'Intermediário' }
    ],
    integracao: [
      { id: 15, title: 'API do Lukos', description: 'Como usar a API do sistema', duration: '25 min', difficulty: 'Avançado' }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setCategory(categoryData[id] || categoryData.pdv);
      setTutorials(tutorialsData[id] || tutorialsData.pdv);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Carregando categoria...</p>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <motion.nav 
        className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="hover:text-primary-600 transition-colors">Início</Link>
        <span>/</span>
        <Link to="/categorias" className="hover:text-primary-600 transition-colors">Categorias</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{category.title}</span>
      </motion.nav>

      {/* Header da Categoria */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`w-20 h-20 ${category.color} rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6`}>
          {category.icon}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {category.longDescription}
        </p>
      </motion.div>

      {/* Lista de Tutoriais */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {tutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            className="card hover:shadow-xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link to={`/tutorial/${tutorial.id}`} className="block">
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tutorial.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tutorial.duration}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                    Iniciar
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

      {/* Call to Action */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Escolha um tutorial acima e comece a aprender o sistema Lukos hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tutoriais" 
              className="btn btn-primary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Ver Todos os Tutoriais
            </Link>
            <Link 
              to="/busca" 
              className="btn btn-secondary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar Específico
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CategoryPage;
