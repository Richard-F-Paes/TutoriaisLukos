// TutorialManager - Gerenciamento de tutoriais no admin
import React, { useState, useEffect, useRef } from 'react';
import { useTutorials, useDeleteTutorial, useUpdateTutorial } from '../../../hooks/useTutorials.js';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { Plus, Edit, Trash2, Eye, Search, Filter, ChevronDown, Check, X as XIcon } from 'lucide-react';
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
  const updateMutation = useUpdateTutorial();
  const tutorials = tutorialsData?.data || [];
  
  // Estado para controlar qual dropdown está aberto (tutorialId + 'category' ou 'subcategory')
  const [openDropdown, setOpenDropdown] = useState(null);

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

  const handleCategoryChange = async (tutorialId, categoryId, subcategoryId = null) => {
    try {
      // Usar subcategoria se selecionada, senão usar categoria principal
      const finalCategoryId = subcategoryId ? Number(subcategoryId) : (categoryId ? Number(categoryId) : null);
      
      await updateMutation.mutateAsync({
        id: tutorialId,
        data: {
          categoryId: finalCategoryId,
        },
      });
      
      toast.success('Categoria atualizada com sucesso!');
      setOpenDropdown(null);
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      toast.error('Erro ao atualizar categoria');
    }
  };

  // Componente de dropdown para categoria/subcategoria
  const CategoryDropdown = ({ tutorial, tutorialCategory }) => {
    const dropdownRef = useRef(null);
    const tutorialId = tutorial.id || tutorial.Id;
    const dropdownKey = `${tutorialId}-category`;
    const isOpen = openDropdown === dropdownKey;
    const [expandedCategories, setExpandedCategories] = useState(new Set());
    
    // Determinar categoria e subcategoria atual
    let currentCategoryId = null;
    let currentSubcategoryId = null;
    
    if (tutorialCategory) {
      if (tutorialCategory.parent) {
        // Se tem parent, é uma subcategoria
        currentCategoryId = tutorialCategory.parent.id || tutorialCategory.parent.Id;
        currentSubcategoryId = tutorialCategory.id || tutorialCategory.Id;
      } else {
        // É uma categoria principal
        currentCategoryId = tutorialCategory.id || tutorialCategory.Id;
      }
    }

    // Expandir automaticamente a categoria atual quando o dropdown abrir
    useEffect(() => {
      if (isOpen && currentCategoryId) {
        setExpandedCategories(prev => new Set(prev).add(currentCategoryId));
      }
    }, [isOpen, currentCategoryId]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDropdown(null);
          setExpandedCategories(new Set());
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const toggleCategoryExpansion = (categoryId, event) => {
      event.stopPropagation();
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

    const displayText = currentSubcategoryId && tutorialCategory?.parent
      ? `${tutorialCategory.parent.name || tutorialCategory.parent.Name} / ${tutorialCategory.name || tutorialCategory.Name}`
      : currentCategoryId && tutorialCategory
        ? (tutorialCategory.name || tutorialCategory.Name || 'Sem categoria')
        : 'Sem categoria';

    return (
      <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : dropdownKey)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#374151',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all 0.2s',
            minWidth: '120px',
            justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6c2396';
            e.currentTarget.style.backgroundColor = '#faf5ff';
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }
          }}
        >
          <span style={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            flex: 1,
            textAlign: 'left',
          }}>
            {displayText}
          </span>
          <ChevronDown 
            size={14} 
            style={{ 
              flexShrink: 0,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }} 
          />
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              zIndex: 10000,
              minWidth: '250px',
              maxWidth: '350px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '0.5rem',
            }}
          >
            {/* Opção "Sem categoria" */}
            <button
              type="button"
              onClick={() => handleCategoryChange(tutorial.id || tutorial.Id, null)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                textAlign: 'left',
                background: currentCategoryId === null ? '#f3e8ff' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentCategoryId === null ? '#f3e8ff' : 'transparent';
              }}
            >
              {currentCategoryId === null && <Check size={14} />}
              <span>Sem categoria</span>
            </button>

            {/* Lista de categorias principais e subcategorias */}
            {mainCategories.map(parentCat => {
              const parentId = parentCat.id || parentCat.Id;
              const subcategories = parentCat.children || [];
              const isParentSelected = currentCategoryId === parentId && !currentSubcategoryId;
              const isExpanded = expandedCategories.has(parentId);
              const hasSubcategories = subcategories.length > 0;
              
              return (
                <div key={parentId} style={{ marginTop: '0.25rem' }}>
                  {/* Categoria principal */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {/* Botão de expansão/colapso (se tiver subcategorias) */}
                    {hasSubcategories ? (
                      <button
                        type="button"
                        onClick={(e) => toggleCategoryExpansion(parentId, e)}
                        style={{
                          padding: '0.25rem',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s',
                          flexShrink: 0,
                          width: '24px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <ChevronDown
                          size={14}
                          style={{
                            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                            transition: 'transform 0.2s',
                            color: '#6b7280',
                          }}
                        />
                      </button>
                    ) : (
                      <div style={{ width: '24px', flexShrink: 0 }} />
                    )}
                    
                    {/* Botão da categoria principal (selecionável) */}
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(tutorial.id || tutorial.Id, parentId)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        background: isParentSelected ? '#f3e8ff' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isParentSelected ? '#f3e8ff' : 'transparent';
                      }}
                    >
                      {isParentSelected && <Check size={14} style={{ flexShrink: 0 }} />}
                      <span style={{ flex: 1 }}>{parentCat.name || parentCat.Name}</span>
                    </button>
                  </div>

                  {/* Subcategorias (expandidas) */}
                  {hasSubcategories && isExpanded && (
                    <div style={{ paddingLeft: '1.5rem', marginTop: '0.125rem' }}>
                      {subcategories.map(subcat => {
                        const subcatId = subcat.id || subcat.Id;
                        const isSubcatSelected = currentSubcategoryId === subcatId;
                        
                        return (
                          <button
                            key={subcatId}
                            type="button"
                            onClick={() => handleCategoryChange(tutorial.id || tutorial.Id, parentId, subcatId)}
                            style={{
                              width: '100%',
                              padding: '0.375rem 0.75rem',
                              textAlign: 'left',
                              background: isSubcatSelected ? '#f3e8ff' : 'transparent',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                              color: '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f9fafb';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isSubcatSelected ? '#f3e8ff' : 'transparent';
                            }}
                          >
                            {isSubcatSelected && <Check size={14} style={{ flexShrink: 0 }} />}
                            <span style={{ color: '#6b7280' }}>{subcat.name || subcat.Name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
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

      <div className="manager-filters" style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {/* Busca */}
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '200px',
          maxWidth: '400px',
        }}>
          <Search 
            size={18} 
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Buscar tutoriais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem 0.625rem 2.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#374151',
              background: '#ffffff',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6c2396';
              e.target.style.outline = 'none';
              e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                color: '#9ca3af',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              <XIcon size={16} />
            </button>
          )}
        </div>

        {/* Filtro de Categoria */}
        <div style={{ position: 'relative' }}>
          <select
            value={parentCategoryFilter}
            onChange={(e) => {
              setParentCategoryFilter(e.target.value);
              setSubcategoryFilter('');
            }}
            style={{
              padding: '0.625rem 2.5rem 0.625rem 0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#374151',
              background: '#ffffff',
              cursor: 'pointer',
              appearance: 'none',
              minWidth: '180px',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6c2396';
              e.target.style.outline = 'none';
              e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Todas as categorias</option>
            {mainCategories.map(cat => (
              <option key={cat.id || cat.Id} value={cat.id || cat.Id}>
                {cat.name || cat.Name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Filtro de Subcategoria */}
        {parentCategoryFilter && availableSubcategories.length > 0 && (
          <div style={{ position: 'relative' }}>
            <select
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
              style={{
                padding: '0.625rem 2.5rem 0.625rem 0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#374151',
                background: '#ffffff',
                cursor: 'pointer',
                appearance: 'none',
                minWidth: '180px',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6c2396';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Todas as subcategorias</option>
              {availableSubcategories.map(subcat => (
                <option key={subcat.id || subcat.Id} value={subcat.id || subcat.Id}>
                  {subcat.name || subcat.Name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                pointerEvents: 'none',
              }}
            />
          </div>
        )}

        {/* Filtro de Status */}
        <div style={{ position: 'relative' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.625rem 2.5rem 0.625rem 0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#374151',
              background: '#ffffff',
              cursor: 'pointer',
              appearance: 'none',
              minWidth: '140px',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6c2396';
              e.target.style.outline = 'none';
              e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">Todos os status</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
          <ChevronDown
            size={16}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Botão de limpar filtros (se houver filtros ativos) */}
        {(searchTerm || parentCategoryFilter || subcategoryFilter || statusFilter !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setParentCategoryFilter('');
              setSubcategoryFilter('');
              setStatusFilter('all');
            }}
            style={{
              padding: '0.625rem 1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#6b7280',
              background: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <XIcon size={16} />
            Limpar filtros
          </button>
        )}
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
                <th>Status</th>
                <th>Visualizações (Total/30d)</th>
                <th>Última Alteração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
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
                        <CategoryDropdown tutorial={tutorial} tutorialCategory={tutorialCategory} />
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
