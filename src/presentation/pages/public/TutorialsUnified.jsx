import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Fuel,
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
  const [activeTab, setActiveTab] = useState(null);
  const tabsRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

    // Criar um mapa de categorias para facilitar busca
    const categoryMap = new Map();
    const categoryIdMap = new Map(); // Mapa por ID
    const categorySlugMap = new Map(); // Mapa por slug
    const categoryNameMap = new Map(); // Mapa por nome

    categories.forEach(cat => {
      const catId = cat.id || cat.Id;
      const catSlug = (cat.slug || cat.Slug || '').toLowerCase();
      const catName = (cat.name || cat.Name || '').toLowerCase();

      categoryMap.set(catId, cat);
      if (catSlug) categorySlugMap.set(catSlug, cat);
      if (catName) categoryNameMap.set(catName, cat);

      if (cat.children) {
        cat.children.forEach(child => {
          const childId = child.id || child.Id;
          const childSlug = (child.slug || child.Slug || '').toLowerCase();
          const childName = (child.name || child.Name || '').toLowerCase();

          categoryMap.set(childId, child);
          if (childSlug) categorySlugMap.set(childSlug, child);
          if (childName) categoryNameMap.set(childName, child);
        });
      }
    });

    // Encontrar a categoria principal pelo parâmetro
    const paramKey = String(categoriaParam || '').toLowerCase();
    const mainCategory = categorySlugMap.get(paramKey) || categoryNameMap.get(paramKey);

    if (!mainCategory) {
      // Se não encontrou a categoria, retornar array vazio
      return [];
    }

    const mainCategoryId = mainCategory.id || mainCategory.Id;

    // Coletar todos os IDs de categorias válidas (categoria principal + suas subcategorias)
    const validCategoryIds = new Set([mainCategoryId]);
    if (mainCategory.children && mainCategory.children.length > 0) {
      mainCategory.children.forEach(child => {
        const childId = child.id || child.Id;
        if (childId) validCategoryIds.add(childId);
      });
    }

    // Filtrar tutoriais que pertencem à categoria principal OU às suas subcategorias
    const filtered = publishedTutorials.filter(t => {
      const tutorialCategory = t.Category || t.category;
      const tutorialCategoryId = tutorialCategory?.id || tutorialCategory?.Id ||
        t.categoryId || t.CategoryId;

      // Verificar se o tutorial pertence à categoria principal ou suas subcategorias
      return tutorialCategoryId && validCategoryIds.has(Number(tutorialCategoryId));
    });

    // Agrupar por subcategorias (ou categoria principal se não houver subcategoria)
    const groupedBySubcategory = {};

    filtered.forEach(tutorial => {
      const tutorialCategory = tutorial.Category || tutorial.category;
      const tutorialCategoryId = tutorialCategory?.id || tutorialCategory?.Id ||
        tutorial.categoryId || tutorial.CategoryId;
      const categoryData = tutorialCategoryId ? categoryMap.get(Number(tutorialCategoryId)) : null;

      // Verificar se a categoria do tutorial tem parentId (é uma subcategoria)
      const parentId = categoryData?.parentId || categoryData?.ParentId ||
        tutorialCategory?.parentId || tutorialCategory?.ParentId;

      let groupKey, groupName, groupId;

      if (parentId && parentId === mainCategoryId) {
        // É uma subcategoria da categoria principal
        groupId = tutorialCategoryId;
        groupKey = `subcat_${tutorialCategoryId}`;
        groupName = categoryData?.name || categoryData?.Name ||
          tutorialCategory?.name || tutorialCategory?.Name ||
          'Subcategoria';
      } else {
        // É um tutorial diretamente na categoria principal (sem subcategoria)
        groupId = mainCategoryId;
        groupKey = 'main_category';
        groupName = mainCategory.name || mainCategory.Name || 'Categoria Principal';
      }

      if (!groupedBySubcategory[groupKey]) {
        groupedBySubcategory[groupKey] = {
          id: groupId,
          name: groupName,
          tutorials: []
        };
      }

      groupedBySubcategory[groupKey].tutorials.push(tutorial);
    });

    // Ordenar grupos: categoria principal primeiro, depois subcategorias por nome
    const sortedGroups = Object.values(groupedBySubcategory).sort((a, b) => {
      if (a.id === mainCategoryId) return -1;
      if (b.id === mainCategoryId) return 1;
      return a.name.localeCompare(b.name);
    });

    return sortedGroups;
  }, [publishedTutorials, categoriaParam, categories]);

  // Definir aba ativa quando os tutoriais carregarem ou categoria mudar
  useEffect(() => {
    if (tutorials.length > 0) {
      // Se a aba ativa não está mais na lista ou é null, definir para a primeira
      const activeGroupExists = tutorials.some(group => group.id === activeTab);
      if (!activeGroupExists || activeTab === null) {
        setActiveTab(tutorials[0].id);
      }
    } else {
      setActiveTab(null);
    }
  }, [tutorials, categoriaParam]);

  // Função para navegar para próxima/anterior aba
  const navigateTab = (direction) => {
    if (tutorials.length === 0) return;

    const currentIndex = tutorials.findIndex(group => group.id === activeTab);
    if (currentIndex === -1) return;

    if (direction === 'next' && currentIndex < tutorials.length - 1) {
      setActiveTab(tutorials[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(tutorials[currentIndex - 1].id);
    }
  };

  // Handlers para swipe nas abas
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Distância mínima para considerar um swipe

    if (distance > minSwipeDistance) {
      // Swipe para a esquerda = próxima aba
      navigateTab('next');
    } else if (distance < -minSwipeDistance) {
      // Swipe para a direita = aba anterior
      navigateTab('prev');
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Obter tutorial ativo baseado na aba selecionada
  const activeTutorialGroup = useMemo(() => {
    if (!activeTab || !tutorials.length) return null;
    return tutorials.find(group => group.id === activeTab) || tutorials[0];
  }, [activeTab, tutorials]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative ">
      {/* Padrão de gradiente diagonal */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(59, 130, 246, 0.3) 40px, rgba(59, 130, 246, 0.3) 42px) '
        }}
      ></div>


      <main className=" ">



        {/* 2. SEÇÃO AZUL -> AGORA ROXA (Hero Courses) */}
        <section className="bg-[#5a2ab3] min-h-auto md:min-h-[500px] py-12 md:py-20 px-4 md:px-20 flex flex-col justify-center overflow-hidden rounded-b-2xl">
          <div className="max-w-7xl mx-auto w-full">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-16">
              <span>Home</span>
              <span className="opacity-30">{'>'}</span>
              <span className="text-white font-medium">Tutoriais Lukos</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Lado do Título com Efeito Outline */}
              <div className="relative">
                <h2 className="text-5xl md:text-9xl font-black text-white relative z-10 leading-none">
                  Tutoriais
                </h2>
                {/* Camadas Vazadas Roxas */}
                <h2 className="text-5xl md:text-9xl font-black absolute top-6 left-1 opacity-30 select-none leading-none"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)', color: 'transparent' }}>
                  Tutoriais
                </h2>
                <h2 className="text-5xl md:text-9xl font-black absolute top-12 left-2 opacity-10 select-none leading-none"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                  Tutoriais
                </h2>
              </div>

              {/* Lado do Conteúdo */}
              <div className="text-white space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  Tutoriais Lukos: <p className="text-white/80 text-2xl">Tutoriais exclusivos para nossos clientes</p>
                </h3>
                <p className="text-white/80 text-lg">
                  Domine as tecnologias mais modernas com nossa metodologia exclusiva.
                </p>

              </div>
            </div>



          </div>
        </section>

      </main>




      {/* Categories Grid - Estilo Tutorials.jsx */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        <div className="text-center mt-12 mb-20">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg transform rotate-[12deg] hover:rotate-0 transition-transform duration-300">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-300">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg transform rotate-6 hover:-rotate-6 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
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

        {/* Mostrar tutoriais filtrados se houver categoria selecionada, em abas por subcategorias */}
        {categoriaParam && tutorials.length > 0 && (
          <div className="mb-16">
            {/* Abas de Subcategorias */}
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav
                  ref={tabsRef}
                  className="-mb-px flex space-x-8 overflow-x-auto justify-center"
                  aria-label="Tabs"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {tutorials.map((subcategoryGroup) => {
                    const isActive = activeTab === subcategoryGroup.id;
                    return (
                      <button
                        key={subcategoryGroup.id}
                        onClick={() => setActiveTab(subcategoryGroup.id)}
                        className={`
                          whitespace-nowrap py-5 px-4 border-b-2 font-bold text-lg transition-all duration-200
                          ${isActive
                            ? 'border-blue-500 text-blue-600 shadow-sm'
                            : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
                          }
                        `}
                      >
                        {subcategoryGroup.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Conteúdo da aba ativa */}
            {activeTutorialGroup && (
              <div className="flex justify-center">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full place-items-center">
                  {activeTutorialGroup.tutorials.map((tutorial) => {
                    const tutorialSlug = tutorial.Slug || tutorial.slug;
                    return (
                      <button
                        key={tutorial.Id || tutorial.id}
                        onClick={() => {
                          if (tutorialSlug) {
                            openModal(tutorialSlug);
                          }
                        }}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden text-left w-full max-w-sm cursor-pointer transform hover:-translate-y-1"
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
            )}

            {/* Mensagem quando não há tutoriais na aba selecionada */}
            {activeTutorialGroup && activeTutorialGroup.tutorials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum tutorial encontrado nesta subcategoria.</p>
              </div>
            )}
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

