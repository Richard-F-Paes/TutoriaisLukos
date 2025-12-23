// CategoriesDrawer - Drawer com categorias, subcategorias e tutoriais
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { useTutorials } from '../../../hooks/useTutorials.js';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { ChevronRight, Folder, FolderOpen, BookOpen, X, Search } from 'lucide-react';
import './CategoriesDrawer.css';

const CategoriesDrawer = ({ isOpen, onClose, currentTutorial }) => {
  const { openModal } = useTutorialModal();
  const { data: categoriesData, isLoading } = useCategoriesHierarchical();
  const { data: tutorialsData } = useTutorials();
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  
  const categories = categoriesData || [];
  const allTutorials = tutorialsData?.data || [];

  const normalize = (value) =>
    String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // Obter tutoriais publicados de uma categoria
  const getCategoryTutorials = React.useCallback((categoryId) => {
    if (!allTutorials || allTutorials.length === 0) return [];
    
    return allTutorials.filter(t => {
      const isPublished = t.isPublished || t.IsPublished || false;
      if (!isPublished) return false;
      
      const catId = t.categoryId || t.CategoryId || 
                   t.category?.id || t.Category?.Id ||
                   t.category?.id || t.Category?.id;
      return Number(catId) === Number(categoryId);
    });
  }, [allTutorials]);

  const currentCategoryId = useMemo(() => {
    const currentCategory = currentTutorial?.category || currentTutorial?.Category;
    return currentCategory?.id || currentCategory?.Id || null;
  }, [currentTutorial]);

  const currentTutorialId = useMemo(() => {
    return currentTutorial?.id || currentTutorial?.Id || null;
  }, [currentTutorial]);

  const findPathToCategory = (cats, targetId, path = []) => {
    for (const cat of cats) {
      const catId = cat.id || cat.Id;
      const nextPath = [...path, catId];
      if (Number(catId) === Number(targetId)) return nextPath;
      const children = cat.children || [];
      if (children.length > 0) {
        const result = findPathToCategory(children, targetId, nextPath);
        if (result) return result;
      }
    }
    return null;
  };

  // Ao abrir: expandir a trilha da categoria atual (se houver) para dar contexto.
  useEffect(() => {
    if (isOpen) {
      const initialExpanded = new Set();
      if (currentCategoryId) {
        const path = findPathToCategory(categories, currentCategoryId);
        if (path && path.length > 0) {
          path.forEach((id) => initialExpanded.add(id));
        }
      }
      setExpandedCategories(initialExpanded);
      // manter query atual; foco no input ajuda navegação rápida
      setTimeout(() => searchInputRef.current?.focus?.(), 0);
    } else {
      // Quando fechar, limpar tudo
      setExpandedCategories(new Set());
      setQuery('');
    }
  }, [isOpen, currentCategoryId, categories]);


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

  const handleTutorialClick = (tutorial) => {
    const tutorialSlug = tutorial.slug || tutorial.Slug;
    if (tutorialSlug) {
      openModal(tutorialSlug);
      onClose();
    }
  };

  const q = useMemo(() => normalize(query), [query]);

  // Filtrar árvore de categorias com base em query (mantém hierarquia e expande automaticamente para matches)
  const { filteredCategories, autoExpandedIds } = useMemo(() => {
    // Função para ordenar: categorias com subcategorias primeiro, sem subcategorias por último
    const sortCategories = (cats) => {
      return [...cats].sort((a, b) => {
        // Verificar se tem subcategorias (children), não tutoriais
        // Verificar tanto no objeto original quanto no filtrado
        const aChildren = a.children || a.__filteredChildren || [];
        const bChildren = b.children || b.__filteredChildren || [];
        const aHasSubcategories = Array.isArray(aChildren) && aChildren.length > 0;
        const bHasSubcategories = Array.isArray(bChildren) && bChildren.length > 0;
        
        // Categorias COM subcategorias vêm primeiro (return negativo = menor índice)
        // Categorias SEM subcategorias vêm por último (return positivo = maior índice)
        if (aHasSubcategories && !bHasSubcategories) return -1; // a vem antes de b
        if (!aHasSubcategories && bHasSubcategories) return 1;   // b vem antes de a
        return 0; // mantém ordem original se ambos têm ou ambos não têm subcategorias
      });
    };

    if (!q) {
      const sorted = sortCategories(categories);
      return { filteredCategories: sorted, autoExpandedIds: new Set() };
    }

    const auto = new Set();

    const filterNode = (node) => {
      const nodeId = node.id || node.Id;
      const nodeName = node.name || node.Name || '';
      const children = node.children || [];

      const nodeMatches = normalize(nodeName).includes(q);

      const filteredChildren = children
        .map(filterNode)
        .filter(Boolean);

      const tutorials = getCategoryTutorials(nodeId);
      const matchingTutorials = tutorials.filter((t) => {
        const title = t.title || t.Title || '';
        return normalize(title).includes(q);
      });

      const hasChildMatches = filteredChildren.length > 0;
      const hasTutorialMatches = matchingTutorials.length > 0;
      const shouldKeep = nodeMatches || hasChildMatches || hasTutorialMatches;

      if (!shouldKeep) return null;

      // Se tiver matches embaixo, expandir automaticamente
      if (hasChildMatches || hasTutorialMatches) auto.add(nodeId);

      return {
        ...node,
        __filteredChildren: filteredChildren.map((c) => c.__original ?? c),
        __filteredTutorials: matchingTutorials,
        __original: node,
      };
    };

    const next = categories.map(filterNode).filter(Boolean);
    const sorted = sortCategories(next);
    return { filteredCategories: sorted, autoExpandedIds: auto };
  }, [categories, q, getCategoryTutorials]);

  if (isLoading) {
    return (
      <div className={`categories-drawer ${isOpen ? 'open' : ''}`}>
        <div className="categories-drawer-content">
          <div className="categories-drawer-loading">
            <div className="loading-spinner">Carregando categorias...</div>
          </div>
        </div>
      </div>
    );
  }

  const renderCategory = (category, level = 0) => {
    const categoryId = category.id || category.Id;
    const categoryName = category.name || category.Name || '';
    const children = category.__filteredChildren ?? category.children ?? [];
    const hasChildren = children.length > 0;
    const tutorials = category.__filteredTutorials ?? getCategoryTutorials(categoryId);

    const shouldAutoExpand = q ? autoExpandedIds.has(categoryId) : false;
    const isExpanded = expandedCategories.has(categoryId) || shouldAutoExpand;
    
    // Verificar se é a categoria ativa
    const isActive = currentCategoryId === categoryId;
    const isExpandable = hasChildren || tutorials.length > 0;
    const rowPaddingLeft = `${level * 1.25}rem`;

    return (
      <div key={categoryId} className="category-drawer-item">
        <button
          type="button"
          className={`category-drawer-row ${isActive ? 'active' : ''}`}
          style={{ paddingLeft: rowPaddingLeft }}
          onClick={() => {
            if (isExpandable) toggleCategory(categoryId);
          }}
          aria-expanded={isExpandable ? isExpanded : undefined}
          aria-label={isExpandable ? (isExpanded ? 'Recolher categoria' : 'Expandir categoria') : 'Categoria'}
        >
          <span className={`category-drawer-chevron ${isExpandable ? '' : 'hidden'} ${isExpanded ? 'expanded' : ''}`} aria-hidden="true">
            <ChevronRight size={16} />
          </span>

          <span className="category-drawer-icon" aria-hidden="true">
            {level === 0 ? (isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />) : <span className="category-drawer-icon-spacer" />}
          </span>

          <span className="category-drawer-name">{categoryName}</span>

          {tutorials.length > 0 && (
            <span className="category-drawer-count" title={`${tutorials.length} tutoriais`}>
              {tutorials.length}
            </span>
          )}
        </button>

        {isExpanded && tutorials.length > 0 && (
          <div className="category-drawer-tutorials" style={{ paddingLeft: `${(level + 1) * 1.25}rem` }}>
            {tutorials.map((tutorial) => {
              const tutorialId = tutorial.id || tutorial.Id;
              const tutorialTitle = tutorial.title || tutorial.Title || '';
              const isCurrentTutorial = currentTutorialId && Number(currentTutorialId) === Number(tutorialId);

              return (
                <button
                  key={tutorialId}
                  className={`category-drawer-tutorial ${isCurrentTutorial ? 'active' : ''}`}
                  onClick={() => handleTutorialClick(tutorial)}
                >
                  <BookOpen size={14} />
                  <span className="category-drawer-tutorial-name">{tutorialTitle}</span>
                </button>
              );
            })}
          </div>
        )}
        
        {hasChildren && isExpanded && (
          <div className="category-drawer-children">
            {children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div 
        className={`categories-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`categories-drawer ${isOpen ? 'open' : ''}`}>
        <div className="categories-drawer-content">
          <div className="categories-drawer-header">
            <h3 className="categories-drawer-title">Tutoriais</h3>
            <button
              className="categories-drawer-close"
              onClick={onClose}
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="categories-drawer-search">
            <div className="categories-drawer-search-icon" aria-hidden="true">
              <Search size={18} />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar categoria ou tutorial..."
              className="categories-drawer-search-input"
            />
            {query && (
              <button
                type="button"
                className="categories-drawer-search-clear"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
                title="Limpar"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <nav className="categories-drawer-nav">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => renderCategory(category))
            ) : (
              <div className="categories-drawer-empty">
                <p>{q ? 'Nenhum resultado para a sua busca' : 'Nenhuma categoria disponível'}</p>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default CategoriesDrawer;

