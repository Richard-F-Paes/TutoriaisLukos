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
    // ... seus tutoriais
  ];

  useEffect(() => {
    if (searchTerm || Object.values(filters).some(f => f !== '')) performSearch();
  }, [searchTerm, filters]);

  const performSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    await new Promise(r => setTimeout(r, 800));

    let filtered = allTutorials;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (filters.category) filtered = filtered.filter(t => t.category === filters.category);
    if (filters.level) filtered = filtered.filter(t => t.difficulty === filters.level);
    if (filters.duration) {
      filtered = filtered.filter(t => {
        const duration = parseInt(t.duration);
        if (filters.duration === 'curto') return duration <= 15;
        if (filters.duration === 'medio') return duration > 15 && duration <= 30;
        if (filters.duration === 'longo') return duration > 30;
        return true;
      });
    }

    if (filters.sortBy === 'rating') filtered.sort((a,b)=> b.rating-a.rating);
    if (filters.sortBy === 'duration') filtered.sort((a,b)=> parseInt(a.duration)-parseInt(b.duration));
    if (filters.sortBy === 'newest') filtered.sort((a,b)=> b.id-a.id);

    setResults(filtered);
    setLoading(false);
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    Object.entries(newFilters).forEach(([k,v])=>{ if(v) params.set(k,v); });
    setSearchParams(params);
  };

  const getDifficultyColor = (difficulty) => {
    if(difficulty==='Iniciante') return 'bg-green-100 text-green-800';
    if(difficulty==='Intermediário') return 'bg-yellow-100 text-yellow-800';
    if(difficulty==='Avançado') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id===category);
    return cat ? cat.icon : '📚';
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <motion.div className="text-center mb-12"
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Buscar Tutoriais</h1>
        <p className="text-lg text-gray-600">Encontre exatamente o que você precisa para aprender o sistema Lukos</p>
      </motion.div>

      {/* Busca e filtros */}
      <motion.div className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6, delay:0.2 }}
      >
        {/* Input de busca */}
        <form onSubmit={e=>{ e.preventDefault(); performSearch(); }} className="mb-6 relative">
          <input
            type="text"
            placeholder="Digite o que você está procurando..."
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg">Buscar</button>
        </form>

        {/* Filtros */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Categoria', value: filters.category, options: categories, key: 'category', display: o => `${o.icon} ${o.name}` },
            { label: 'Nível', value: filters.level, options: levels, key: 'level', display: o => o.name },
            { label: 'Duração', value: filters.duration, options: durations, key: 'duration', display: o => o.name },
            { label: 'Ordenar por', value: filters.sortBy, options: sortOptions, key: 'sortBy', display: o => o.name },
          ].map(f=>(
            <motion.div key={f.key} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
              <select
                value={f.value}
                onChange={e=>updateFilters(f.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-primary-500 transition-all"
              >
                {f.options.map(opt => (
                  <option key={opt.id} value={opt.id}>{f.display(opt)}</option>
                ))}
              </select>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Resultados */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin h-12 w-12 border-b-4 border-primary-600 rounded-full"></div>
        </div>
      )}

      {!loading && hasSearched && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{results.length} resultado{results.length!==1?'s':''} encontrado{results.length!==1?'s':''}</h2>
            {results.length>0 && <span className="text-sm text-gray-600">Ordenado por: {sortOptions.find(o=>o.id===filters.sortBy)?.name}</span>}
          </div>

          <AnimatePresence mode="wait">
            {results.length>0 ? (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((t,i)=>(
                  <motion.div
                    key={t.id}
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    exit={{opacity:0, y:-20}}
                    transition={{delay: i*0.05}}
                    whileHover={{y:-5, boxShadow: '0 20px 30px rgba(0,0,0,0.1)'}}
                  >
                    <Link to={`/tutorial/${t.id}`} className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-5">
                      <div className="flex items-start mb-4 space-x-3">
                        <div className="text-2xl">{getCategoryIcon(t.category)}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.title}</h3>
                          <p className="text-gray-600 text-sm">{t.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <span>{t.duration} • <span className={`px-2 py-1 rounded-full ${getDifficultyColor(t.difficulty)}`}>{t.difficulty}</span></span>
                        <span>⭐ {t.rating}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600 font-medium">
                        <span>{t.students.toLocaleString()} alunos</span>
                        <span className="text-primary-600 flex items-center transition-transform group-hover:translate-x-1">Iniciar →</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-600 mb-6">Tente ajustar os filtros ou usar termos de busca diferentes</p>
                <button onClick={()=>{ setSearchTerm(''); setFilters({ category:'', level:'', duration:'', sortBy:'relevance' }); setSearchParams({}); }}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg">Limpar Filtros</button>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {!hasSearched && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Pronto para buscar?</h3>
          <p className="text-gray-600 mb-6">Digite o que você está procurando e encontre o tutorial perfeito</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['PDV','Estoque','Relatórios','Configuração'].map(tag=>(
              <button key={tag} onClick={()=>setSearchTerm(tag)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors">{tag}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
