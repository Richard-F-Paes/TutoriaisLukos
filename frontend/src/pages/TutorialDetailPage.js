import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function TutorialDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedTutorials, setRelatedTutorials] = useState([]);

  const tutorialsData = {
    1: {
      id: 1,
      title: 'Primeira Venda no PDV',
      description: 'Aprenda a realizar sua primeira venda no sistema Lukos de forma simples e eficiente.',
      longDescription: 'Este tutorial completo irá te guiar através de todos os passos necessários para realizar sua primeira venda no sistema PDV do Lukos. Você aprenderá desde o login no sistema até a finalização da venda, incluindo cadastro de clientes, seleção de produtos, aplicação de descontos e formas de pagamento.',
      duration: '5 min',
      difficulty: 'Iniciante',
      category: 'pdv',
      rating: 4.8,
      students: 1250,
      icon: '🛒',
      color: 'bg-blue-500',
      objectives: [
        'Entender a interface do PDV',
        'Realizar login no sistema',
        'Cadastrar um cliente',
        'Selecionar produtos',
        'Aplicar descontos',
        'Finalizar a venda'
      ],
      prerequisites: [
        'Acesso ao sistema Lukos',
        'Conhecimento básico de informática'
      ],
      steps: [
        'Login no sistema',
        'Abertura do caixa',
        'Cadastro do cliente',
        'Seleção de produtos',
        'Aplicação de descontos',
        'Escolha da forma de pagamento',
        'Finalização da venda'
      ]
    },
    2: {
      id: 2,
      title: 'Gestão de Clientes',
      description: 'Como cadastrar e gerenciar clientes no sistema de forma eficiente.',
      longDescription: 'Aprenda todas as funcionalidades de gestão de clientes no sistema Lukos. Desde o cadastro inicial até a manutenção de dados, histórico de compras e relacionamento com o cliente.',
      duration: '8 min',
      difficulty: 'Iniciante',
      category: 'pdv',
      rating: 4.6,
      students: 980,
      icon: '👥',
      color: 'bg-green-500',
      objectives: [
        'Cadastrar novos clientes',
        'Editar dados de clientes',
        'Visualizar histórico de compras',
        'Gerenciar relacionamento'
      ],
      prerequisites: [
        'Acesso ao sistema Lukos',
        'Conhecimento básico de informática'
      ],
      steps: [
        'Acesso ao módulo de clientes',
        'Cadastro de novo cliente',
        'Edição de dados',
        'Visualização de histórico',
        'Relatórios de clientes'
      ]
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const tutorialData = tutorialsData[id] || tutorialsData[1];
      setTutorial(tutorialData);
      
      // Simular tutoriais relacionados
      setRelatedTutorials([
        { id: 2, title: 'Gestão de Clientes', duration: '8 min', difficulty: 'Iniciante', category: 'pdv' },
        { id: 3, title: 'Formas de Pagamento', duration: '10 min', difficulty: 'Intermediário', category: 'pdv' },
        { id: 4, title: 'Descontos e Promoções', duration: '7 min', difficulty: 'Intermediário', category: 'pdv' }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleStartTutorial = () => {
    navigate(`/tutorial/${id}/executar`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Carregando tutorial...</p>
          </div>
        </div>
      </div>
    );
  }

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
        <Link to="/tutoriais" className="hover:text-primary-600 transition-colors">Tutoriais</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{tutorial.title}</span>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          {/* Header do Tutorial */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-16 h-16 ${tutorial.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {tutorial.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {tutorial.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tutorial.duration}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">{tutorial.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {tutorial.longDescription}
            </p>

            <button 
              onClick={handleStartTutorial}
              className="btn btn-primary btn-lg inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Iniciar Tutorial
            </button>
          </motion.div>

          {/* Objetivos */}
          <motion.div 
            className="card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">O que você vai aprender</h3>
            <ul className="space-y-2">
              {tutorial.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pré-requisitos */}
          <motion.div 
            className="card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pré-requisitos</h3>
            <ul className="space-y-2">
              {tutorial.prerequisites.map((prerequisite, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{prerequisite}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Passos do Tutorial */}
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Estrutura do Tutorial</h3>
            <div className="space-y-3">
              {tutorial.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Informações do Tutorial */}
          <motion.div 
            className="card p-6 mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informações</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duração:</span>
                <span className="font-medium">{tutorial.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dificuldade:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Categoria:</span>
                <span className="font-medium capitalize">{tutorial.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avaliação:</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{tutorial.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alunos:</span>
                <span className="font-medium">{tutorial.students.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Tutoriais Relacionados */}
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tutoriais Relacionados</h3>
            <div className="space-y-3">
              {relatedTutorials.map((related) => (
                <Link 
                  key={related.id}
                  to={`/tutorial/${related.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{related.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{related.duration}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(related.difficulty)}`}>
                      {related.difficulty}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TutorialDetailPage;
