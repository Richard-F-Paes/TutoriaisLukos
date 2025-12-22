// TutorialManager - Gerenciamento de tutoriais no admin
import React, { useState, useEffect } from 'react';
import { useTutorials, useDeleteTutorial } from '../../../hooks/useTutorials.js';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { Plus, Edit, Trash2, Eye, Search, Filter, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { useEditorModal } from '../../../contexts/EditorModalContext';
import TutorialEditorPanel from './TutorialEditorPanel.jsx';
import { formatDate } from '../../../shared/utils/index.js';

const TutorialManager = ({ initialTutorialId = null }) => {
  const { openModal } = useTutorialModal();
  const { openEditorModal } = useEditorModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [parentCategoryFilter, setParentCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState(initialTutorialId ? 'edit' : 'list'); // 'list' | 'edit'
  const [editingId, setEditingId] = useState(initialTutorialId);

  // Abrir edição quando initialTutorialId for fornecido
  useEffect(() => {
    if (initialTutorialId) {
      setEditingId(initialTutorialId);
      setView('edit');
    }
  }, [initialTutorialId]);

  const { data: categoriesData } = useCategoriesHierarchical();
  const categories = categoriesData || [];

  // Flatten categories for dropdown (include subcategories with hierarchy indicator)
  const flattenCategoriesForSelect = (cats, level = 0, excludeId = null) => {
    const result = [];
    cats.forEach(cat => {
      if (cat.id !== excludeId) {
        const prefix = '  '.repeat(level);
        result.push({
          ...cat,
          displayName: `${prefix}${cat.name || cat.Name}`,
          level,
        });
        if (cat.children && cat.children.length > 0) {
          result.push(...flattenCategoriesForSelect(cat.children, level + 1, excludeId));
        }
      }
    });
    return result;
  };

  const allCategoriesFlat = flattenCategoriesForSelect(categories);

  // Determinar qual filtro usar (prioridade para subcategoria se selecionada)
  const categoryIdFilter = subcategoryFilter 
    ? (() => {
        // Buscar o ID da subcategoria selecionada
        const subcat = allCategoriesFlat.find(cat => 
          (cat.id || cat.Id) === parseInt(subcategoryFilter)
        );
        return subcat ? (subcat.id || subcat.Id) : undefined;
      })()
    : parentCategoryFilter
      ? (() => {
          // Buscar o ID da categoria pai selecionada
          const parentCat = categories.find(cat => 
            (cat.id || cat.Id) === parseInt(parentCategoryFilter)
          );
          return parentCat ? (parentCat.id || parentCat.Id) : undefined;
        })()
      : undefined;

  const { data: tutorialsData, isLoading } = useTutorials({
    search: searchTerm || undefined,
    categoryId: categoryIdFilter,
    isPublished: statusFilter === 'all' 
      ? undefined 
      : statusFilter === 'published' 
        ? true 
        : false, // 'draft' = false
  });

  const deleteMutation = useDeleteTutorial();
  const tutorials = tutorialsData?.data || [];

  // Separar categorias principais (sem parentId) e subcategorias
  const mainCategories = categories.filter(cat => !(cat.parentId || cat.ParentId));
  
  // Obter subcategorias da categoria pai selecionada
  const getSubcategories = (parentId) => {
    if (!parentId) return [];
    const parentCat = categories.find(cat => (cat.id || cat.Id) === parseInt(parentId));
    return parentCat?.children || [];
  };

  const availableSubcategories = getSubcategories(parentCategoryFilter);

  // Limpar filtro de subcategoria quando a categoria pai mudar
  useEffect(() => {
    if (!parentCategoryFilter) {
      setSubcategoryFilter('');
    } else {
      // Verificar se a subcategoria atual ainda pertence à nova categoria pai
      const currentSubcat = allCategoriesFlat.find(cat => 
        (cat.id || cat.Id) === parseInt(subcategoryFilter)
      );
      if (currentSubcat && (currentSubcat.parentId || currentSubcat.ParentId) !== parseInt(parentCategoryFilter)) {
        setSubcategoryFilter('');
      }
    }
  }, [parentCategoryFilter, subcategoryFilter, allCategoriesFlat]);

  const openCreate = () => {
    setEditingId(null);
    setView('edit');
  };

  const openEdit = (id) => {
    // Garantir que o ID seja um número válido
    const numId = id ? Number(id) : null;
    if (numId && !isNaN(numId)) {
      setEditingId(numId);
      setView('edit');
    } else {
      console.error('ID de tutorial inválido:', id);
      toast.error('Erro ao abrir editor: ID inválido');
    }
  };

  const openView = (slug) => {
    if (slug) openModal(slug);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Tem certeza que deseja excluir o tutorial "${title}"?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Tutorial excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir tutorial');
    }
  };

  if (view === 'edit') {
    return (
      <TutorialEditorPanel
        tutorialId={editingId}
        onCancel={() => setView('list')}
        onSaved={() => {
          setView('list');
          setEditingId(null);
        }}
      />
    );
  }

  return (
    <div className="tutorial-manager">
      <div className="manager-header">
        <h2>Gerenciar Tutoriais</h2>
        <button 
          type="button" 
          onClick={openCreate} 
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
          }}
        >
          <Plus size={18} />
          Novo Tutorial
        </button>
      </div>

      <div className="manager-filters">
        <div className="filter-group">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar tutoriais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select
            value={parentCategoryFilter}
            onChange={(e) => {
              setParentCategoryFilter(e.target.value);
              setSubcategoryFilter(''); // Limpar subcategoria ao mudar categoria pai
            }}
          >
            <option value="">Todas as categorias</option>
            {mainCategories.map(cat => (
              <option key={cat.id || cat.Id} value={cat.id || cat.Id}>
                {cat.name || cat.Name}
              </option>
            ))}
          </select>
        </div>

        {parentCategoryFilter && availableSubcategories.length > 0 && (
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
            >
              <option value="">Todas as subcategorias</option>
              {availableSubcategories.map(subcat => (
                <option key={subcat.id || subcat.Id} value={subcat.id || subcat.Id}>
                  {subcat.name || subcat.Name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Carregando tutoriais...</div>
      ) : (
        <div className="tutorials-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Subcategoria</th>
                <th>Status</th>
                <th>Visualizações (Total/30d)</th>
                <th>Última Alteração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    Nenhum tutorial encontrado
                  </td>
                </tr>
              ) : (
                tutorials.map(tutorial => {
                  // Suportar tanto camelCase quanto PascalCase
                  const tutorialId = tutorial.id || tutorial.Id;
                  const tutorialTitle = tutorial.title || tutorial.Title;
                  const tutorialSlug = tutorial.slug || tutorial.Slug;
                  const tutorialIsPublished = tutorial.isPublished !== undefined ? tutorial.isPublished : tutorial.IsPublished;
                  const tutorialViewCount = tutorial.viewCount !== undefined ? tutorial.viewCount : tutorial.ViewCount;
                  const tutorialUpdatedAt = tutorial.updatedAt || tutorial.UpdatedAt;
                  const tutorialCategory = tutorial.category || tutorial.Category;
                  const viewsLast30Days = tutorial.viewsLast30Days !== undefined ? tutorial.viewsLast30Days : 0;
                  
                  return (
                    <tr key={tutorialId}>
                      <td>
                        <button
                          type="button"
                          className="btn-link"
                          onClick={() => openView(tutorialSlug)}
                          title="Visualizar"
                        >
                          {tutorialTitle}
                        </button>
                      </td>
                      <td>
                        {tutorialCategory?.parent 
                          ? (
                            <button
                              type="button"
                              className="btn-link"
                              onClick={() => {
                                if (tutorialCategory.parent?.id || tutorialCategory.parent?.Id) {
                                  openEditorModal('categories', null);
                                  // Scroll para a categoria será feito pelo CategoryManager
                                  setTimeout(() => {
                                    const categoryElement = document.querySelector(`[data-category-id="${tutorialCategory.parent.id || tutorialCategory.parent.Id}"]`);
                                    if (categoryElement) {
                                      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                      categoryElement.style.backgroundColor = '#fff3cd';
                                      setTimeout(() => {
                                        categoryElement.style.backgroundColor = '';
                                      }, 2000);
                                    }
                                  }, 300);
                                }
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                textDecoration: 'none',
                                color: '#6c2396',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: 'none',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f3e8ff';
                                e.target.style.textDecoration = 'underline';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.textDecoration = 'none';
                              }}
                            >
                              {tutorialCategory.parent.name || tutorialCategory.parent.Name}
                              <ExternalLink size={12} />
                            </button>
                          )
                          : (
                            tutorialCategory?.id || tutorialCategory?.Id
                              ? (
                                <button
                                  type="button"
                                  className="btn-link"
                                  onClick={() => {
                                    openEditorModal('categories', null);
                                    setTimeout(() => {
                                      const categoryElement = document.querySelector(`[data-category-id="${tutorialCategory.id || tutorialCategory.Id}"]`);
                                      if (categoryElement) {
                                        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        categoryElement.style.backgroundColor = '#fff3cd';
                                        setTimeout(() => {
                                          categoryElement.style.backgroundColor = '';
                                        }, 2000);
                                      }
                                    }, 300);
                                  }}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    textDecoration: 'none',
                                    color: '#6c2396',
                                    cursor: 'pointer',
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    transition: 'all 0.2s',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f3e8ff';
                                    e.target.style.textDecoration = 'underline';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.textDecoration = 'none';
                                  }}
                                >
                                  {tutorialCategory?.name || '-'}
                                  <ExternalLink size={12} />
                                </button>
                              )
                              : (tutorialCategory?.name || '-')
                          )
                        }
                      </td>
                      <td>
                        {tutorialCategory?.parent 
                          ? (
                            <button
                              type="button"
                              className="btn-link"
                              onClick={() => {
                                if (tutorialCategory?.id || tutorialCategory?.Id) {
                                  openEditorModal('categories', null);
                                  setTimeout(() => {
                                    const categoryElement = document.querySelector(`[data-category-id="${tutorialCategory.id || tutorialCategory.Id}"]`);
                                    if (categoryElement) {
                                      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                      categoryElement.style.backgroundColor = '#fff3cd';
                                      setTimeout(() => {
                                        categoryElement.style.backgroundColor = '';
                                      }, 2000);
                                    }
                                  }, 300);
                                }
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                textDecoration: 'none',
                                color: '#6c2396',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: 'none',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f3e8ff';
                                e.target.style.textDecoration = 'underline';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.textDecoration = 'none';
                              }}
                            >
                              {tutorialCategory?.name || '-'}
                              <ExternalLink size={12} />
                            </button>
                          )
                          : '-'
                        }
                      </td>
                      <td>
                        <span className={`status-badge ${tutorialIsPublished ? 'published' : 'draft'}`}>
                          {tutorialIsPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td>
                        {tutorialViewCount || 0}/{viewsLast30Days}
                      </td>
                      <td>{tutorialUpdatedAt ? formatDate(tutorialUpdatedAt) : '-'}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            onClick={() => openView(tutorialSlug)}
                            className="btn-icon"
                            title="Visualizar"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEdit(tutorialId)}
                            className="btn-icon"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tutorialId, tutorialTitle)}
                            className="btn-icon btn-danger"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TutorialManager;
