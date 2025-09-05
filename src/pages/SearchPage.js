import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    level: searchParams.get('level') || '',
    duration: searchParams.get('duration') || '',
    sortBy: searchParams.get('sort') || 'relevance'
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    { id: '', name: 'Todas as categorias', icon: '📚' },
    { id: 'pdv', name: 'PDV', icon: '🛒' },
    { id: 'retaguarda', name: 'Retaguarda', icon: '📦' },
    { id: 'faturamento', name: 'Faturamento', icon: '💰' },
    { id: 'relatorios', name: 'Relatórios', icon: '📊' },
    { id: 'configuracoes', name: 'Configurações', icon: '⚙️' },
    { id: 'integracao', name: 'Integração', icon: '🔗' }
  ];

  const levels = [
    { id: '', name: 'Todos os níveis' },
    { id: 'Iniciante', name: 'Iniciante' },
    { id: 'Intermediário', name: 'Intermediário' },
    { id: 'Avançado', name: 'Avançado' }
  ];

  const durations = [
    { id: '', name: 'Qualquer duração' },
    { id: 'curto', name: 'Até 15 min' },
    { id: 'medio', name: '15-30 min' },
    { id: 'longo', name: 'Mais de 30 min' }
  ];

  const sortOptions = [
    { id: 'relevance', name: 'Relevância' },
    { id: 'rating', name: 'Melhor Avaliado' },
    { id: 'duration', name: 'Duração' },
    { id: 'newest', name: 'Mais Recente' }
  ];

  const allTutorials = [
    { id: 1, title: 'Primeira Venda no PDV', description: 'Aprenda a realizar sua primeira venda no sistema', duration: '5 min', difficulty: 'Iniciante', category: 'pdv', rating: 4.8, students: 1250, tags: ['venda', 'pdv', 'iniciante'] },
    { id: 2, title: 'Gestão de Clientes', description: 'Como cadastrar e gerenciar clientes no sistema', duration: '8 min', difficulty: 'Iniciante', category: 'pdv', rating: 4.6, students: 980, tags: ['clientes', 'cadastro', 'gestão'] },
    { id: 3, title: 'Formas de Pagamento', description: 'Configurar e usar diferentes formas de pagamento', duration: '10 min', difficulty: 'Intermediário', category: 'pdv', rating: 4.7, students: 1100, tags: ['pagamento', 'configuração', 'dinheiro'] },
    { id: 4, title: 'Descontos e Promoções', description: 'Aplicar descontos e criar promoções especiais', duration: '7 min', difficulty: 'Intermediário', category: 'pdv', rating: 4.5, students: 850, tags: ['desconto', 'promoção', 'oferta'] },
    { id: 5, title: 'Relatórios de Vendas', description: 'Visualizar e analisar relatórios detalhados de vendas', duration: '12 min', difficulty: 'Avançado', category: 'pdv', rating: 4.9, students: 750, tags: ['relatório', 'vendas', 'análise'] },
    { id: 6, title: 'Cadastro de Produtos', description: 'Como cadastrar produtos no sistema de forma eficiente', duration: '15 min', difficulty: 'Iniciante', category: 'retaguarda', rating: 4.6, students: 1200, tags: ['produtos', 'cadastro', 'estoque'] },
    { id: 7, title: 'Controle de Estoque', description: 'Gerenciar estoque e inventário de produtos', duration: '20 min', difficulty: 'Intermediário', category: 'retaguarda', rating: 4.8, students: 950, tags: ['estoque', 'inventário', 'controle'] },
    { id: 8, title: 'Fornecedores', description: 'Cadastro e gestão completa de fornecedores', duration: '10 min', difficulty: 'Iniciante', category: 'retaguarda', rating: 4.4, students: 680, tags: ['fornecedores', 'cadastro', 'gestão'] },
    { id: 9, title: 'Emissão de Nota Fiscal', description: 'Como emitir notas fiscais corretamente', duration: '18 min', difficulty: 'Intermediário', category: 'faturamento', rating: 4.7, students: 890, tags: ['nota fiscal', 'faturamento', 'imposto'] },
    { id: 10, title: 'Controle de Recebimentos', description: 'Gerenciar recebimentos e contas a receber', duration: '12 min', difficulty: 'Intermediário', category: 'faturamento', rating: 4.5, students: 720, tags: ['recebimento', 'contas', 'financeiro'] },
    { id: 11, title: 'Relatório de Vendas', description: 'Análise detalhada de vendas e performance', duration: '8 min', difficulty: 'Iniciante', category: 'relatorios', rating: 4.6, students: 1100, tags: ['relatório', 'vendas', 'performance'] },
    { id: 12, title: 'Relatório de Estoque', description: 'Controle de estoque e movimentações', duration: '10 min', difficulty: 'Intermediário', category: 'relatorios', rating: 4.8, students: 850, tags: ['relatório', 'estoque', 'movimentação'] },
    { id: 13, title: 'Configurações Básicas', description: 'Configurações iniciais do sistema Lukos', duration: '15 min', difficulty: 'Iniciante', category: 'configuracoes', rating: 4.4, students: 1300, tags: ['configuração', 'inicial', 'setup'] },
    { id: 14, title: 'Usuários e Permissões', description: 'Gerenciar usuários e suas permissões no sistema', duration: '12 min', difficulty: 'Intermediário', category: 'configuracoes', rating: 4.7, students: 920, tags: ['usuários', 'permissões', 'acesso'] },
    { id: 15, title: 'API do Lukos', description: 'Como usar a API do sistema para integrações', duration: '25 min', difficulty: 'Avançado', category: 'integracao', rating: 4.9, students: 450, tags: ['api', 'integração', 'desenvolvimento'] }
  ];

  useEffect(() => {
    if (searchTerm || Object.values(filters).some(filter => filter !== '')) {
      performSearch();
    }
  }, [searchTerm, filters]);

  const performSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    
    // Simular delay de busca
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filtered = allTutorials;

    // Filtro por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(term) ||
        tutorial.description.toLowerCase().includes(term) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(tutorial => tutorial.category === filters.category);
    }

    // Filtro por nível
    if (filters.level) {
      filtered = filtered.filter(tutorial => tutorial.difficulty === filters.level);
    }

    // Filtro por duração
    if (filters.duration) {
      filtered = filtered.filter(tutorial => {
        const duration = parseInt(tutorial.duration);
        switch (filters.duration) {
          case 'curto': return duration <= 15;
          case 'medio': return duration > 15 && duration <= 30;
          case 'longo': return duration > 30;
          default: return true;
        }
      });
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // relevance
        // Manter ordem original para relevância
        break;
    }

    setResults(filtered);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Atualizar URL
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

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
          Buscar Tutoriais
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encontre exatamente o que você precisa para aprender o sistema Lukos
        </p>
      </motion.div>

      {/* Barra de Busca */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o que você está procurando..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-12 pr-4 py-4 text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary py-2 px-6"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilters('category', e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nível
            </label>
            <select
              value={filters.level}
              onChange={(e) => updateFilters('level', e.target.value)}
              className="input"
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duração
            </label>
            <select
              value={filters.duration}
              onChange={(e) => updateFilters('duration', e.target.value)}
              className="input"
            >
              {durations.map(duration => (
                <option key={duration.id} value={duration.id}>
                  {duration.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters('sortBy', e.target.value)}
              className="input"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Resultados */}
      {loading && (
        <motion.div 
          className="flex items-center justify-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Buscando tutoriais...</p>
          </div>
        </motion.div>
      )}

      {!loading && hasSearched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
            </h2>
            {results.length > 0 && (
              <div className="text-sm text-gray-600">
                Ordenado por: {sortOptions.find(opt => opt.id === filters.sortBy)?.name}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {results.map((tutorial, index) => (
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
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou usar termos de busca diferentes
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ category: '', level: '', duration: '', sortBy: 'relevance' });
                    setSearchParams({});
                  }}
                  className="btn btn-primary"
                >
                  Limpar Filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Estado inicial */}
      {!hasSearched && !loading && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Pronto para buscar?
          </h3>
          <p className="text-gray-600 mb-6">
            Digite o que você está procurando e encontre o tutorial perfeito
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['PDV', 'Estoque', 'Relatórios', 'Configuração'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SearchPage;
