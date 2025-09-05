import { useState, useEffect, useCallback } from 'react';

// Hook personalizado para busca avançada
export function useSearch(initialData = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    duration: '',
    rating: '',
    sortBy: 'relevance'
  });
  const [results, setResults] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Função de busca principal
  const performSearch = useCallback(async (data = initialData) => {
    setLoading(true);
    setHasSearched(true);
    
    // Simular delay de busca
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...data];

    // Filtro por termo de busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.tags?.some(tag => tag.toLowerCase().includes(term)) ||
        item.category?.toLowerCase().includes(term)
      );
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Filtro por dificuldade
    if (filters.difficulty) {
      filtered = filtered.filter(item => item.difficulty === filters.difficulty);
    }

    // Filtro por duração
    if (filters.duration) {
      filtered = filtered.filter(item => {
        const duration = parseInt(item.duration);
        switch (filters.duration) {
          case 'curto': return duration <= 15;
          case 'medio': return duration > 15 && duration <= 30;
          case 'longo': return duration > 30;
          default: return true;
        }
      });
    }

    // Filtro por rating
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(item => item.rating >= minRating);
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration || 0) - parseInt(b.duration || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'title':
        filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default: // relevance
        // Manter ordem original para relevância
        break;
    }

    setResults(filtered);
    setLoading(false);
  }, [searchTerm, filters, initialData]);

  // Executa busca quando os parâmetros mudam
  useEffect(() => {
    if (searchTerm || Object.values(filters).some(filter => filter !== '')) {
      performSearch();
    } else {
      setResults(initialData);
      setHasSearched(false);
    }
  }, [searchTerm, filters, performSearch, initialData]);

  // Função para atualizar filtros
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      difficulty: '',
      duration: '',
      rating: '',
      sortBy: 'relevance'
    });
    setHasSearched(false);
  };

  // Função para busca rápida
  const quickSearch = (term) => {
    setSearchTerm(term);
  };

  // Função para busca por categoria
  const searchByCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  // Função para busca por dificuldade
  const searchByDifficulty = (difficulty) => {
    setFilters(prev => ({
      ...prev,
      difficulty
    }));
  };

  return {
    // Estado
    searchTerm,
    filters,
    results,
    loading,
    hasSearched,
    
    // Ações
    setSearchTerm,
    updateFilter,
    clearFilters,
    quickSearch,
    searchByCategory,
    searchByDifficulty,
    performSearch
  };
}

// Hook para sugestões de busca
export function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = useCallback(async (term) => {
    if (!term || term.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Sugestões baseadas em termos comuns
    const commonTerms = [
      'PDV', 'venda', 'cliente', 'produto', 'estoque', 'relatório',
      'faturamento', 'nota fiscal', 'pagamento', 'desconto', 'promoção',
      'retaguarda', 'fornecedor', 'configuração', 'usuário', 'permissão',
      'integração', 'API', 'backup', 'restauração', 'auditoria'
    ];

    const filtered = commonTerms
      .filter(item => item.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 5);

    setSuggestions(filtered);
    setLoading(false);
  }, []);

  return {
    suggestions,
    loading,
    getSuggestions
  };
}

// Hook para histórico de buscas
export function useSearchHistory() {
  const [history, setHistory] = useState([]);
  const maxHistoryItems = 10;

  // Carrega histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico de busca:', error);
      }
    }
  }, []);

  // Salva histórico no localStorage
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  // Adiciona termo ao histórico
  const addToHistory = (term) => {
    if (!term || term.trim() === '') return;
    
    const trimmedTerm = term.trim();
    setHistory(prev => {
      // Remove se já existe
      const filtered = prev.filter(item => item !== trimmedTerm);
      // Adiciona no início
      const newHistory = [trimmedTerm, ...filtered].slice(0, maxHistoryItems);
      return newHistory;
    });
  };

  // Remove termo do histórico
  const removeFromHistory = (term) => {
    setHistory(prev => prev.filter(item => item !== term));
  };

  // Limpa todo o histórico
  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
}
