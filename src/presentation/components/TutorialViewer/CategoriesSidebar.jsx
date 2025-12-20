// CategoriesSidebar - Navegação hierárquica de categorias
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { useTutorials } from '../../../hooks/useTutorials.js';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import './CategoriesSidebar.css';

const CategoriesSidebar = ({ currentTutorial }) => {
  const { data: categoriesData, isLoading } = useCategoriesHierarchical();
  const { data: tutorialsData } = useTutorials();
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  
  const categories = categoriesData || [];
  const allTutorials = tutorialsData?.data || [];

  // Contar tutoriais publicados em uma categoria
  const getTutorialCount = (category) => {
    if (!allTutorials || allTutorials.length === 0) return 0;
    
    const categoryId = category.id || category.Id;
    let count = allTutorials.filter(t => {
      const isPublished = t.isPublished || t.IsPublished || false;
      if (!isPublished) return false;
      
      const catId = t.categoryId || t.CategoryId || 
                   t.category?.id || t.Category?.Id ||
                   t.category?.id || t.Category?.id;
      return Number(catId) === Number(categoryId);
    }).length;
    
    // Contar tutoriais nas subcategorias
    if (category.children && category.children.length > 0) {
      category.children.forEach(child => {
        count += getTutorialCount(child);
      });
    }
    
    return count;
  };

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

  // Expandir categoria atual automaticamente
  useEffect(() => {
    if (currentTutorial) {
      const category = currentTutorial.category || currentTutorial.Category;
      if (category) {
        const categoryId = category.id || category.Id;
        const parentId = category.parentId || category.ParentId ||
                        category.parent?.id || category.parent?.Id;
        
        setExpandedCategories(prev => {
          const newExpanded = new Set(prev);
          if (categoryId) {
            newExpanded.add(categoryId);
          }
          if (parentId) {
            newExpanded.add(parentId);
          }
          return newExpanded;
        });
      }
    }
  }, [currentTutorial]);

  if (isLoading) {
    return (
      <div className="categories-sidebar-loading">
        <div className="loading-spinner">Carregando categorias...</div>
      </div>
    );
  }

  const renderCategory = (category, level = 0) => {
    const categoryId = category.id || category.Id;
    const categoryName = category.name || category.Name || '';
    const categorySlug = category.slug || category.Slug || categoryId;
    const isExpanded = expandedCategories.has(categoryId);
    const hasChildren = category.children && category.children.length > 0;
    const tutorialCount = getTutorialCount(category);
    
    // Verificar se é a categoria ativa
    const currentCategory = currentTutorial?.category || currentTutorial?.Category;
    const currentCategoryId = currentCategory?.id || currentCategory?.Id;
    const isActive = currentCategoryId === categoryId;

    return (
      <div key={categoryId} className="category-item" style={{ paddingLeft: `${level * 1.25}rem` }}>
        <div className={`category-header ${isActive ? 'active' : ''}`}>
          {hasChildren ? (
            <button
              className="category-toggle"
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
            <span className="category-toggle-spacer" />
          )}
          
          <Link
            to={`/tutoriais?categoria=${categorySlug}`}
            className="category-link"
            onClick={(e) => {
              // Fechar modal ao clicar em uma categoria
              const modal = document.querySelector('.tutorial-modal-overlay');
              if (modal) {
                e.preventDefault();
                window.location.href = `/tutoriais?categoria=${categorySlug}`;
              }
            }}
          >
            {level === 0 ? (
              isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />
            ) : null}
            <span className="category-name">{categoryName}</span>
            {tutorialCount > 0 && (
              <span className="category-count">{tutorialCount}</span>
            )}
          </Link>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="category-children">
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="categories-sidebar">
      <div className="categories-sidebar-header">
        <h3 className="categories-sidebar-title">Categorias</h3>
        <Link to="/tutoriais" className="view-all-link">
          Ver todas
        </Link>
      </div>
      
      <nav className="categories-nav">
        {categories.length > 0 ? (
          categories.map(category => renderCategory(category))
        ) : (
          <div className="categories-empty">
            <p>Nenhuma categoria disponível</p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default CategoriesSidebar;

