import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  FileText, 
  Fuel, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Users, 
  Smartphone,
  Clock, 
  Star, 
  PlayCircle,
  ShoppingCart,
  Search,
  X
} from 'lucide-react';
import { useTutorials, useSearchTutorials } from '../../../hooks/useTutorials.js';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import ExpandableCategoryCard from '../../components/ui/ExpandableCategoryCard/ExpandableCategoryCard.jsx';

// Componentes da HomePage original
import { Chatbot } from '../../components/custom/Chatbot/Chatbot';

const TutorialsUnified = () => {
  const [searchParams] = useSearchParams();
  const categoriaParam = searchParams.get('categoria');
  const { openModal } = useTutorialModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const searchRef = useRef(null);
  
  const { data: tutorialsData, isLoading: tutorialsLoading } = useTutorials();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesHierarchical();
  
  // Busca de tutoriais
  const { data: searchData, isLoading: isSearching } = useSearchTutorials(
    searchQuery.trim().length > 2 ? searchQuery : '',
    { limit: 10 }
  );
  
  const searchResults = searchData?.data || [];
  
  const allTutorials = tutorialsData?.data || [];
  const categories = categoriesData || [];
  
  // Filtrar tutoriais por categoria se houver query param
  const tutorials = useMemo(() => {
    if (!categoriaParam) return allTutorials;
    
    return allTutorials.filter(t => {
      const catName =
        t.Category?.Name ||
        t.Category?.name ||
        t.category?.name ||
        t.CategoryName ||
        t.categoryName ||
        '';
      const catSlug =
        t.Category?.Slug ||
        t.Category?.slug ||
        t.category?.slug ||
        t.CategorySlug ||
        t.categorySlug ||
        '';
      const key = String(categoriaParam || '').toLowerCase();
      return (
        String(catName || '').toLowerCase() === key ||
        String(catSlug || '').toLowerCase() === key
      );
    });
  }, [allTutorials, categoriaParam]);
  
  const isLoading = tutorialsLoading || categoriesLoading;

  // Compat: alguns trechos antigos deste componente ainda usam esse helper.
  // Conta tutoriais por nome/slug de categoria, tentando cobrir formatos diferentes do payload.
  const getTutorialCountByCategory = (categoryKey) => {
    if (!allTutorials || allTutorials.length === 0) return 0;
    const key = String(categoryKey || '').toLowerCase();
    if (!key) return 0;

    return allTutorials.filter((t) => {
      const catName =
        t.Category?.Name ||
        t.Category?.name ||
        t.category?.name ||
        t.CategoryName ||
        t.categoryName ||
        t.category ||
        '';
      const catSlug =
        t.Category?.Slug ||
        t.Category?.slug ||
        t.category?.slug ||
        t.CategorySlug ||
        t.categorySlug ||
        '';

      return (
        String(catName || '').toLowerCase() === key ||
        String(catSlug || '').toLowerCase() === key
      );
    }).length;
  };

  // Fechar resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mostrar resultados quando houver busca
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTutorialClick = (tutorial) => {
    const tutorialSlug = tutorial.Slug || tutorial.slug;
    if (tutorialSlug) {
      openModal(tutorialSlug);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      handleTutorialClick(searchResults[0]);
    } else if (e.key === 'Escape') {
      setShowSearchResults(false);
    }
  };

  // Função para contar tutoriais em uma categoria (incluindo subcategorias)
  const getTutorialCountForCategory = (category) => {
    if (!allTutorials || allTutorials.length === 0) return 0;
    
    // Contar tutoriais diretamente na categoria
    let count = allTutorials.filter(t => {
      const catId =
        t.categoryId ??
        t.CategoryId ??
        t.category?.id ??
        t.Category?.Id ??
        t.Category?.id;
      return Number(catId) === Number(category.id);
    }).length;
    
    // Contar tutoriais nas subcategorias recursivamente
    if (category.children && category.children.length > 0) {
      category.children.forEach(child => {
        count += getTutorialCountForCategory(child);
      });
    }
    
    return count;
  };

  // Função para toggle de expansão
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Função para selecionar categoria
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Navegar para a página da categoria
    const slug = category.slug || category.Slug || category.id;
    window.location.href = `/tutoriais?categoria=${slug}`;
  };

  // Categorias de tutoriais do componente Tutorials.jsx
  // Se houver categorias da API, usar elas, senão usar categorias padrão
  const tutorialCategories = categories.length > 0 
    ? categories.map(cat => ({
        id: cat.Slug || cat.Id?.toString() || cat.id,
        title: cat.Name || cat.name,
        description: cat.Description || cat.description || "Tutoriais sobre " + (cat.Name || cat.name),
        icon: FileText,
        color: cat.Color || "blue",
        tutorials: getTutorialCountForCategory(cat),
        duration: "45 min",
        image: cat.ImageUrl || cat.imageUrl || "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: `/tutoriais?categoria=${cat.Slug || cat.slug || cat.id}`
      }))
    : [
      {
        id: "Retaguarda",
        title: "Retaguarda",
        description: "Controle completo de estoque, produtos e relatórios",
        icon: FileText,
        color: "blue",
        tutorials: getTutorialCountByCategory('Retaguarda'),
        duration: "45 min",
        image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "/tutoriais?categoria=retaguarda"
      },
      {
        id: "PDV",
        title: "PDV",
        description: "Controle completo de vendas, pagamentos e relatórios",
        icon: FileText,
        color: "indigo",
        tutorials: getTutorialCountByCategory('PDV'),
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
        tutorials: getTutorialCountByCategory('Dashboard'),
        duration: "35 min",
        image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
        link: "/tutoriais?categoria=dashboard"
      },
      {
        id: "Pré-Venda",
        title: "Pré-Venda",
        description: "Orçamentos, pedidos e gestão de vendas externas",
        icon: Fuel,
        color: "indigo",
        tutorials: getTutorialCountByCategory('Pré-Venda'),
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
        tutorials: getTutorialCountByCategory('Fatura Web'),
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
        tutorials: getTutorialCountByCategory('PDV-Smart POS'),
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
        tutorials: getTutorialCountByCategory('Conveniência'),
        duration: "40 min",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        link: "/tutoriais?categoria=conveniencia"
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando tutoriais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Padrão de gradiente diagonal */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(59, 130, 246, 0.3) 40px, rgba(59, 130, 246, 0.3) 42px)'
        }}
      ></div>
      
      {/* Categories Grid - Estilo Tutorials.jsx */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mt-12 mb-20">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-300">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg transform rotate-6 hover:-rotate-6 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {categoriaParam ? `Tutoriais - ${categoriaParam.charAt(0).toUpperCase() + categoriaParam.slice(1)}` : 'Tutoriais do Sistema'}
            </span>
          </h1>
          
          {/* Barra de Pesquisa Gigante */}
          <div ref={searchRef} className="relative max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery.trim().length > 2 && setShowSearchResults(true)}
                placeholder="Busque tutoriais, funcionalidades, PDV, Retaguarda, Fatura Web..."
                className="w-full pl-16 pr-16 py-6 text-base md:text-lg bg-white border-4 border-blue-200 rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-900 font-medium leading-relaxed"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                  letterSpacing: '0.01em'
                }}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Dropdown de Resultados */}
            {showSearchResults && searchQuery.trim().length > 2 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-blue-100 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    Buscando tutoriais...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((tutorial) => (
                      <button
                        key={tutorial.Id || tutorial.id}
                        onClick={() => handleTutorialClick(tutorial)}
                        className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                              {tutorial.Title || tutorial.title}
                            </h3>
                            {tutorial.Description || tutorial.description ? (
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {tutorial.Description || tutorial.description}
                              </p>
                            ) : null}
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              {tutorial.CategoryName && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                  {tutorial.CategoryName}
                                </span>
                              )}
                              {tutorial.EstimatedDuration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {tutorial.EstimatedDuration} min
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Nenhum tutorial encontrado
                      </h3>
                      <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                        Não encontramos tutoriais para "<span className="font-medium text-gray-900">{searchQuery}</span>". 
                        Tente buscar com outras palavras-chave ou explore as categorias abaixo.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {categoriaParam && (
            <Link 
              to="/tutoriais" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Ver todas as categorias
            </Link>
          )}
        </div>

        {/* Mostrar tutoriais filtrados se houver categoria selecionada */}
        {categoriaParam && tutorials.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {tutorials.length} {tutorials.length === 1 ? 'tutorial encontrado' : 'tutoriais encontrados'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Link
                  key={tutorial.Id}
                  to={`/tutoriais/${tutorial.Slug || tutorial.Id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {tutorial.ThumbnailUrl && (
                    <img 
                      src={tutorial.ThumbnailUrl} 
                      alt={tutorial.Title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutorial.Title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {tutorial.Description || ''}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{tutorial.EstimatedDuration ? `${tutorial.EstimatedDuration} min` : 'N/A'}</span>
                      <span className="text-blue-600 font-semibold">Ver tutorial →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mostrar categorias expansíveis apenas se não houver filtro */}
        {!categoriaParam && categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Categorias</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {categories.map(category => (
                <ExpandableCategoryCard
                  key={category.id}
                  category={category}
                  isExpanded={expandedCategories.has(category.id)}
                  onToggle={toggleCategory}
                  onSelect={handleCategorySelect}
                  isSelected={selectedCategory?.id === category.id}
                  getTutorialCount={getTutorialCountForCategory}
                  expandedCategories={expandedCategories}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mostrar grid de categorias apenas se não houver filtro */}
        {!categoriaParam && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tutorialCategories.map((category) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            // Encontrar o primeiro tutorial desta categoria
            const categoryTutorials = allTutorials.filter(t => {
              const catName = t.Category?.Name || t.CategoryName || '';
              const catSlug = t.Category?.Slug || '';
              return catName === category.title || 
                     catSlug === category.id ||
                     catName?.toLowerCase() === category.title?.toLowerCase();
            });
            const firstTutorial = categoryTutorials.length > 0 ? categoryTutorials[0] : null;
            const tutorialSlug = firstTutorial?.Slug || firstTutorial?.slug || null;
            
            const handleCategoryClick = (e) => {
              e.preventDefault();
              if (tutorialSlug) {
                openModal(tutorialSlug);
              }
            };
            
            return (
              <button
                key={category.id}
                onClick={handleCategoryClick}
                disabled={!tutorialSlug}
                className={`group text-left w-full ${!tutorialSlug ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
              </button>
            );
          })}
          </div>
        )}

      </div>

      {/* Componentes adicionais da HomePage */}
      <Chatbot />
    </div>
  );
};

export default TutorialsUnified;

