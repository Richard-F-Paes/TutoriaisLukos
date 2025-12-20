import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
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
import { useTutorials } from '../../../hooks/useTutorials.js';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import LukUnifiedSearch from '../../components/search/LukUnifiedSearch/LukUnifiedSearch';

const TutorialsUnified = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoriaParam = searchParams.get('categoria');
  const { openModal } = useTutorialModal();
  
  const { data: tutorialsData, isLoading: tutorialsLoading } = useTutorials();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesHierarchical();
  
  const allTutorials = tutorialsData?.data || [];
  const categories = categoriesData || [];
  
  // Filtrar apenas tutoriais publicados
  const publishedTutorials = useMemo(() => {
    return allTutorials.filter(t => {
      const isPublished = t.isPublished || t.IsPublished || false;
      return isPublished === true;
    });
  }, [allTutorials]);
  
  // Filtrar tutoriais por categoria se houver query param e agrupar por subcategorias
  const tutorials = useMemo(() => {
    if (!categoriaParam) return [];
    
    const filtered = publishedTutorials.filter(t => {
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
    
    // Agrupar por subcategorias
    const groupedBySubcategory = {};
    
    // Criar um mapa de categorias para facilitar busca
    const categoryMap = new Map();
    categories.forEach(cat => {
      categoryMap.set(cat.id || cat.Id, cat);
      if (cat.children) {
        cat.children.forEach(child => {
          categoryMap.set(child.id || child.Id, child);
        });
      }
    });
    
    filtered.forEach(tutorial => {
      const category = tutorial.Category || tutorial.category;
      const categoryId = category?.id || category?.Id;
      const categoryData = categoryId ? categoryMap.get(categoryId) : null;
      
      // Verificar se a categoria do tutorial tem parentId (é uma subcategoria)
      const parentId = categoryData?.parentId || categoryData?.ParentId || 
                       category?.parentId || category?.ParentId;
      
      let groupKey, groupName;
      
      if (parentId) {
        // É uma subcategoria, buscar o nome da categoria pai
        const parentCategory = categoryMap.get(parentId);
        groupKey = `subcat_${parentId}`;
        groupName = parentCategory?.name || parentCategory?.Name || 
                   category?.parent?.name || category?.parent?.Name || 
                   'Subcategoria';
      } else {
        // É uma categoria principal
        groupKey = 'main_category';
        groupName = category?.name || category?.Name || categoryData?.name || categoryData?.Name || 'Categoria Principal';
      }
      
      if (!groupedBySubcategory[groupKey]) {
        groupedBySubcategory[groupKey] = {
          id: parentId || 'main',
          name: groupName,
          tutorials: []
        };
      }
      
      groupedBySubcategory[groupKey].tutorials.push(tutorial);
    });
    
    return Object.values(groupedBySubcategory);
  }, [publishedTutorials, categoriaParam]);
  
  const isLoading = tutorialsLoading || categoriesLoading;

  // Compat: alguns trechos antigos deste componente ainda usam esse helper.
  // Conta tutoriais publicados por nome/slug de categoria, tentando cobrir formatos diferentes do payload.
  const getTutorialCountByCategory = (categoryKey) => {
    if (!publishedTutorials || publishedTutorials.length === 0) return 0;
    const key = String(categoryKey || '').toLowerCase();
    if (!key) return 0;

    return publishedTutorials.filter((t) => {
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


  // Função para contar tutoriais publicados em uma categoria (incluindo subcategorias)
  const getTutorialCountForCategory = (category) => {
    if (!publishedTutorials || publishedTutorials.length === 0) return 0;
    
    // Contar tutoriais publicados diretamente na categoria
    let count = publishedTutorials.filter(t => {
      const catId =
        t.categoryId ??
        t.CategoryId ??
        t.category?.id ??
        t.Category?.Id ??
        t.Category?.id;
      return Number(catId) === Number(category.id);
    }).length;
    
    // Contar tutoriais publicados nas subcategorias recursivamente
    if (category.children && category.children.length > 0) {
      category.children.forEach(child => {
        count += getTutorialCountForCategory(child);
      });
    }
    
    return count;
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
          
          {/* Barra de Pesquisa Gigante - Luk Unified Search */}
          <LukUnifiedSearch />

          {categoriaParam && (
            <Link 
              to="/tutoriais" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Ver todas as categorias
            </Link>
          )}
        </div>

        {/* Mostrar tutoriais filtrados se houver categoria selecionada, agrupados por subcategorias */}
        {categoriaParam && tutorials.length > 0 && (
          <div className="mb-16">
            {tutorials.map((subcategoryGroup) => (
              <div key={subcategoryGroup.id} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                  {subcategoryGroup.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {subcategoryGroup.tutorials.map((tutorial) => {
                    const tutorialSlug = tutorial.Slug || tutorial.slug;
                    return (
                      <button
                        key={tutorial.Id || tutorial.id}
                        onClick={() => {
                          if (tutorialSlug) {
                            openModal(tutorialSlug);
                          }
                        }}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden text-left w-full cursor-pointer"
                        disabled={!tutorialSlug}
                      >
                        {tutorial.ThumbnailUrl && (
                          <img 
                            src={tutorial.ThumbnailUrl} 
                            alt={tutorial.Title || tutorial.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutorial.Title || tutorial.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {tutorial.Description || tutorial.description || ''}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{tutorial.EstimatedDuration || tutorial.estimatedDuration ? `${tutorial.EstimatedDuration || tutorial.estimatedDuration} min` : 'N/A'}</span>
                            <span className="text-blue-600 font-semibold">Ver tutorial →</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mostrar grid de categorias apenas se não houver filtro */}
        {!categoriaParam && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Categorias</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tutorialCategories.map((category) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            const handleCategoryClick = (e) => {
              e.preventDefault();
              // Navegar para a página da categoria usando o link definido
              if (category.link) {
                navigate(category.link);
              }
            };
            
            return (
              <button
                key={category.id}
                onClick={handleCategoryClick}
                className="group text-left w-full cursor-pointer"
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
          </>
        )}

      </div>
    </div>
  );
};

export default TutorialsUnified;

