// CategoriesDrawer - Drawer com categorias, subcategorias e tutoriais
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { useTutorials } from '../../../hooks/useTutorials.js';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { ChevronRight, ChevronDown, Folder, FolderOpen, BookOpen, X } from 'lucide-react';
import './CategoriesDrawer.css';

const CategoriesDrawer = ({ isOpen, onClose, currentTutorial }) => {
  const { openModal } = useTutorialModal();
  const { data: categoriesData, isLoading } = useCategoriesHierarchical();
  const { data: tutorialsData } = useTutorials();
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [expandedTutorials, setExpandedTutorials] = useState(new Set());
  
  const categories = categoriesData || [];
  const allTutorials = tutorialsData?.data || [];

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

  // Tudo recolhido por padrão - não expandir nada automaticamente
  useEffect(() => {
    if (isOpen) {
      // Limpar todas as expansões - tudo fica recolhido por padrão
      setExpandedCategories(new Set());
      setExpandedTutorials(new Set());
    } else {
      // Quando fechar, limpar tudo
      setExpandedCategories(new Set());
      setExpandedTutorials(new Set());
    }
  }, [isOpen]);


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

  const toggleTutorials = (categoryId) => {
    setExpandedTutorials(prev => {
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
    const categorySlug = category.slug || category.Slug || categoryId;
    const isExpanded = expandedCategories.has(categoryId);
    const hasChildren = category.children && category.children.length > 0;
    const tutorials = getCategoryTutorials(categoryId);
    const tutorialsExpanded = expandedTutorials.has(categoryId);
    
    // Verificar se é a categoria ativa
    const currentCategory = currentTutorial?.category || currentTutorial?.Category;
    const currentCategoryId = currentCategory?.id || currentCategory?.Id;
    const isActive = currentCategoryId === categoryId;

    return (
      <div key={categoryId} className="category-drawer-item">
        <div className={`category-drawer-header ${isActive ? 'active' : ''}`} style={{ paddingLeft: `${level * 1.25}rem` }}>
          {hasChildren ? (
            <button
              className="category-drawer-toggle"
              onClick={() => toggleCategory(categoryId)}
              aria-label={isExpanded ? 'Recolher' : 'Expandir'}
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          ) : (
            <span className="category-drawer-toggle-spacer" />
          )}
          
          <div className="category-drawer-link-wrapper">
            {level === 0 ? (
              isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />
            ) : (
              <span className="category-drawer-icon-spacer" />
            )}
            <span className="category-drawer-name">{categoryName}</span>
            {tutorials.length > 0 && (
              <span className="category-drawer-count">{tutorials.length}</span>
            )}
          </div>

          {tutorials.length > 0 && (
            <button
              className="category-drawer-tutorials-toggle"
              onClick={() => toggleTutorials(categoryId)}
              aria-label={tutorialsExpanded ? 'Ocultar tutoriais' : 'Mostrar tutoriais'}
            >
              {tutorialsExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}
        </div>
        
        {tutorials.length > 0 && tutorialsExpanded && (
          <div className="category-drawer-tutorials" style={{ paddingLeft: `${(level + 1) * 1.25}rem` }}>
            {tutorials.map(tutorial => {
              const tutorialId = tutorial.id || tutorial.Id;
              const tutorialSlug = tutorial.slug || tutorial.Slug;
              const tutorialTitle = tutorial.title || tutorial.Title || '';
              const isCurrentTutorial = currentTutorial && 
                (currentTutorial.id === tutorialId || currentTutorial.Id === tutorialId);
              
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
            {category.children.map(child => renderCategory(child, level + 1))}
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
          
          <nav className="categories-drawer-nav">
            {categories.length > 0 ? (
              categories.map(category => renderCategory(category))
            ) : (
              <div className="categories-drawer-empty">
                <p>Nenhuma categoria disponível</p>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default CategoriesDrawer;

