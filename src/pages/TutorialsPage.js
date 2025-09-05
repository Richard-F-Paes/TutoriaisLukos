import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Todas as Categorias', icon: '📚' },
    { id: 'pdv', name: 'PDV', icon: '🛒' },
    { id: 'retaguarda', name: 'Retaguarda', icon: '📦' },
    { id: 'faturamento', name: 'Faturamento', icon: '💰' },
    { id: 'relatorios', name: 'Relatórios', icon: '📊' },
    { id: 'configuracoes', name: 'Configurações', icon: '⚙️' },
    { id: 'integracao', name: 'Integração', icon: '🔗' }
  ];

  const difficulties = [
    { id: 'all', name: 'Todas as Dificuldades' },
    { id: 'Iniciante', name: 'Iniciante' },
    { id: 'Intermediário', name: 'Intermediário' },
    { id: 'Avançado', name: 'Avançado' }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      const allTutorials = [
        { id: 1, title: 'Primeira Venda no PDV', description: 'Aprenda a realizar sua primeira venda', duration: '5 min', difficulty: 'Iniciante', category: 'pdv', rating: 4.8, students: 1250 },
        { id: 2, title: 'Gestão de Clientes', description: 'Como cadastrar e gerenciar clientes', duration: '8 min', difficulty: 'Iniciante', category: 'pdv', rating: 4.6, students: 980 },
        { id: 3, title: 'Formas de Pagamento', description: 'Configurar e usar diferentes formas de pagamento', duration: '10 min', difficulty: 'Intermediário', category: 'pdv', rating: 4.7, students: 1100 },
        { id: 4, title: 'Descontos e Promoções', description: 'Aplicar descontos e criar promoções', duration: '7 min', difficulty: 'Intermediário', category: 'pdv', rating: 4.5, students: 850 },
        { id: 5, title: 'Relatórios de Vendas', description: 'Visualizar e analisar relatórios de vendas', duration: '12 min', difficulty: 'Avançado', category: 'pdv', rating: 4.9, students: 750 },
        { id: 6, title: 'Cadastro de Produtos', description: 'Como cadastrar produtos no sistema', duration: '15 min', difficulty: 'Iniciante', category: 'retaguarda', rating: 4.6, students: 1200 },
        { id: 7, title: 'Controle de Estoque', description: 'Gerenciar estoque e inventário', duration: '20 min', difficulty: 'Intermediário', category: 'retaguarda', rating: 4.8, students: 950 },
        { id: 8, title: 'Fornecedores', description: 'Cadastro e gestão de fornecedores', duration: '10 min', difficulty: 'Iniciante', category: 'retaguarda', rating: 4.4, students: 680 },
        { id: 9, title: 'Emissão de Nota Fiscal', description: 'Como emitir notas fiscais', duration: '18 min', difficulty: 'Intermediário', category: 'faturamento', rating: 4.7, students: 890 },
        { id: 10, title: 'Controle de Recebimentos', description: 'Gerenciar recebimentos e contas a receber', duration: '12 min', difficulty: 'Intermediário', category: 'faturamento', rating: 4.5, students: 720 },
        { id: 11, title: 'Relatório de Vendas', description: 'Análise detalhada de vendas', duration: '8 min', difficulty: 'Iniciante', category: 'relatorios', rating: 4.6, students: 1100 },
        { id: 12, title: 'Relatório de Estoque', description: 'Controle de estoque e movimentações', duration: '10 min', difficulty: 'Intermediário', category: 'relatorios', rating: 4.8, students: 850 },
        { id: 13, title: 'Configurações Básicas', description: 'Configurações iniciais do sistema', duration: '15 min', difficulty: 'Iniciante', category: 'configuracoes', rating: 4.4, students: 1300 },
        { id: 14, title: 'Usuários e Permissões', description: 'Gerenciar usuários e suas permissões', duration: '12 min', difficulty: 'Intermediário', category: 'configuracoes', rating: 4.7, students: 920 },
        { id: 15, title: 'API do Lukos', description: 'Como usar a API do sistema', duration: '25 min', difficulty: 'Avançado', category: 'integracao', rating: 4.9, students: 450 }
      ];
      
      setTutorials(allTutorials);
      setFilteredTutorials(allTutorials);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = tutorials;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory);
    }

    // Filtro por dificuldade
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.difficulty === selectedDifficulty);
    }

    setFilteredTutorials(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, tutorials]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : '📚';
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Carregando tutoriais...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Todos os Tutoriais
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encontre o tutorial perfeito para aprender o sistema Lukos
        </p>
      </motion.div>

      {/* Filtros */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Digite o nome do tutorial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dificuldade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dificuldade
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} encontrado{filteredTutorials.length !== 1 ? 's' : ''}
        </div>
      </motion.div>

      {/* Lista de Tutoriais */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              className="card hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/tutorial/${tutorial.id}`} className="block">
                <div className="card-body p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCategoryIcon(tutorial.category)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {tutorial.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tutorial.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
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
                    
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {tutorial.students.toLocaleString()} alunos
                    </span>
                    
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
      </AnimatePresence>

      {/* Mensagem quando não há resultados */}
      {filteredTutorials.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Nenhum tutorial encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Tente ajustar os filtros ou usar termos de busca diferentes
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="btn btn-primary"
          >
            Limpar Filtros
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default TutorialsPage;
