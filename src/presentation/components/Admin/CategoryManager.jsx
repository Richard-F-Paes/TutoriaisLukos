// CategoryManager - Gerenciamento de categorias
import React, { useState } from 'react';
import { useCategoriesHierarchical, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../../hooks/useCategories.js';
import { Plus, Edit, Trash2, X, ChevronRight, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const CategoryManager = () => {
  const { data: categoriesData, isLoading } = useCategoriesHierarchical();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '',
    imageUrl: '',
    sortOrder: 0,
    parentId: null,
  });

  const categories = categoriesData || [];

  // Flatten categories for parent selection (exclude current category being edited)
  const flattenCategories = (cats, excludeId = null, level = 0) => {
    const result = [];
    cats.forEach(cat => {
      if (cat.id !== excludeId) {
        result.push({ ...cat, level, displayName: '  '.repeat(level) + cat.name });
        if (cat.children && cat.children.length > 0) {
          result.push(...flattenCategories(cat.children, excludeId, level + 1));
        }
      }
    });
    return result;
  };

  const allCategoriesFlat = flattenCategories(categories, editingCategory?.id);

  const toggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleNew = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      icon: '',
      color: '',
      imageUrl: '',
      sortOrder: 0,
      parentId: null,
    });
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      description: category.description || '',
      icon: category.icon || '',
      color: category.color || '',
      imageUrl: category.imageUrl || '',
      sortOrder: category.sortOrder || 0,
      parentId: category.parentId || null,
    });
    setShowForm(true);
  };

  const handleAddSubcategory = (parentCategory) => {
    // Verificar se a categoria pai já é uma subcategoria (tem parentId)
    if (parentCategory.parentId || parentCategory.parent) {
      toast.error('Não é possível criar subcategoria de uma subcategoria. Apenas categorias principais podem ter subcategorias.');
      return;
    }
    
    setEditingCategory(null); // Nova categoria, não edição
    setFormData({
      name: '',
      description: '',
      icon: '',
      color: '',
      imageUrl: '',
      sortOrder: 0,
      parentId: parentCategory.id, // ID da categoria pai
    });
    setShowForm(true);
  };

  // Helper function to find category name by id in hierarchical structure
  const findCategoryById = (cats, id) => {
    for (const cat of cats) {
      if (cat.id === id) return cat;
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar: não permitir criar/editar categoria como subcategoria de uma subcategoria
    if (formData.parentId) {
      const parentCategory = findCategoryById(categories, formData.parentId);
      if (parentCategory && (parentCategory.parentId || parentCategory.parent)) {
        toast.error('Não é possível criar subcategoria de uma subcategoria. Apenas categorias principais podem ter subcategorias.');
        return;
      }
    }
    
    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          data: formData,
        });
        toast.success('Categoria atualizada com sucesso!');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Categoria criada com sucesso!');
      }
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao salvar categoria';
      toast.error(errorMessage);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteMutation.mutateAsync(categoryToDelete.id);
      toast.success('Categoria excluída com sucesso!');
      setCategoryToDelete(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao excluir categoria';
      toast.error(errorMessage);
      // Não fechar o modal em caso de erro, para que o usuário veja a mensagem
    }
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  const renderCategory = (category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const indentStyle = { marginLeft: `${level * 24}px` };

    return (
      <div 
        key={category.id} 
        className="category-item" 
        data-category-id={category.id}
        style={{
          ...indentStyle,
          marginBottom: '0.5rem',
        }}
      >
        <div className="category-row" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
        >
          {hasChildren && (
            <button
              className="expand-btn"
              onClick={() => toggleExpand(category.id)}
              aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b7280';
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          {!hasChildren && <span style={{ width: '24px' }} />}
          <div className="category-info" style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              margin: 0,
              marginBottom: '0.25rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#1f2937',
              letterSpacing: '-0.01em',
            }}>
              {category.name}
            </h3>
            {category.parent && (
              <span style={{
                display: 'inline-block',
                fontSize: '0.8125rem',
                color: '#6b7280',
                fontWeight: 500,
              }}>
                Pai: {category.parent.name}
              </span>
            )}
          </div>
          <div className="category-actions" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {/* Só mostrar botão de adicionar subcategoria se a categoria não for uma subcategoria */}
            {!(category.parentId || category.parent) && (
              <button
                className="btn-icon"
                title="Adicionar Subcategoria"
                onClick={() => handleAddSubcategory(category)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f9ff';
                  e.target.style.color = '#0ea5e9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#6b7280';
                }}
              >
                <Plus size={16} />
              </button>
            )}
            <button
              className="btn-icon"
              title="Editar"
              onClick={() => handleEdit(category)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                color: '#6b7280',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.color = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteClick(category)}
              className="btn-icon btn-danger"
              title="Excluir"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                color: '#6b7280',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fef2f2';
                e.target.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="category-children" style={{
            marginTop: '0.5rem',
            marginLeft: '1.5rem',
            paddingLeft: '1rem',
            borderLeft: '2px solid #e5e7eb',
          }}>
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="category-manager">
      <div className="manager-header">
        <h2>Gerenciar Categorias</h2>
        <button className="btn-primary" onClick={handleNew}>
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      {showForm && (
        <div className="category-form-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}>
          <div className="form-container" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}>
            <div className="form-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: 600,
                color: '#1f2937',
                letterSpacing: '-0.025em',
              }}>
                {formData.parentId 
                  ? (editingCategory ? 'Editar Subcategoria' : 'Nova Subcategoria')
                  : (editingCategory ? 'Editar Categoria' : 'Nova Categoria')
                }
              </h3>
              <button 
                className="close-btn" 
                onClick={() => setShowForm(false)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e5e7eb';
                  e.target.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.color = '#6b7280';
                }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {formData.parentId && (
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#0369a1',
                }}>
                  <strong>Subcategoria de:</strong> {findCategoryById(categories, formData.parentId)?.name || 'Categoria pai'}
                </div>
              )}
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Nome <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Digite o nome da categoria"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div className="form-actions" style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e5e7eb',
              }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#ffffff',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f9fafb';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ffffff';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2563eb';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#3b82f6';
                    e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                  }}
                >
                  {editingCategory ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {categoryToDelete && (
        <div
          className="category-form-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !deleteMutation.isPending) {
              handleCancelDelete();
            }
          }}
        >
          <div
            className="form-container"
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.75rem',
              maxWidth: '480px',
              width: '92%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="form-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Trash2 size={20} style={{ color: '#dc2626' }} />
                Excluir {categoryToDelete.parentId || categoryToDelete.parent ? 'subcategoria' : 'categoria'}?
              </h3>
              <button
                type="button"
                className="close-btn"
                onClick={handleCancelDelete}
                disabled={deleteMutation.isPending}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!deleteMutation.isPending) {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.color = '#6b7280';
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ color: '#111827', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 1.25rem 0', fontWeight: 500, letterSpacing: '0.01em', color: '#0f172a' }}>
                Tem certeza que deseja excluir a{' '}
                <strong style={{ color: '#030712', fontWeight: 700, fontSize: '1.125rem' }}>
                  {categoryToDelete.parentId || categoryToDelete.parent ? 'subcategoria' : 'categoria'} "{categoryToDelete.name}"
                </strong>
                ?
              </p>

              {/* Avisos baseados na categoria */}
              <div
                style={{
                  padding: '0.875rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ color: '#991b1b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  <strong>⚠️ Atenção:</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
                    {categoryToDelete.children && categoryToDelete.children.length > 0 && (
                      <li style={{ marginBottom: '0.25rem' }}>
                        Esta categoria possui {categoryToDelete.children.length} subcategoria(s). 
                        Remova ou mova as subcategorias primeiro.
                      </li>
                    )}
                    <li style={{ marginBottom: '0.25rem' }}>
                      Todos os tutoriais associados a esta {categoryToDelete.parentId || categoryToDelete.parent ? 'subcategoria' : 'categoria'} serão desvinculados.
                    </li>
                    <li>Esta ação não pode ser desfeita.</li>
                  </ul>
                </div>
              </div>

              {/* Mostrar informações adicionais se for subcategoria */}
              {categoryToDelete.parentId || categoryToDelete.parent ? (
                <div
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: '#0369a1',
                    marginBottom: '1rem',
                  }}
                >
                  <strong>Subcategoria de:</strong>{' '}
                  {(() => {
                    const parentId = categoryToDelete.parentId || categoryToDelete.parent?.id;
                    if (parentId) {
                      const parentCategory = findCategoryById(categories, parentId);
                      return parentCategory?.name || 'Categoria pai';
                    }
                    return categoryToDelete.parent?.name || 'Categoria pai';
                  })()}
                </div>
              ) : null}
            </div>

            <div
              className="form-actions"
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelDelete}
                disabled={deleteMutation.isPending}
                style={{
                  padding: '0.7rem 1.25rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!deleteMutation.isPending) {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
                disabled={
                  deleteMutation.isPending ||
                  (categoryToDelete.children && categoryToDelete.children.length > 0)
                }
                style={{
                  padding: '0.7rem 1.25rem',
                  background:
                    deleteMutation.isPending ||
                    (categoryToDelete.children && categoryToDelete.children.length > 0)
                      ? '#9ca3af'
                      : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor:
                    deleteMutation.isPending ||
                    (categoryToDelete.children && categoryToDelete.children.length > 0)
                      ? 'not-allowed'
                      : 'pointer',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (
                    !deleteMutation.isPending &&
                    (!categoryToDelete.children || categoryToDelete.children.length === 0)
                  ) {
                    e.target.style.background = '#b91c1c';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(220, 38, 38, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    !deleteMutation.isPending &&
                    (!categoryToDelete.children || categoryToDelete.children.length === 0)
                  ) {
                    e.target.style.background = '#dc2626';
                    e.target.style.boxShadow = 'none';
                  }
                }}
                title={
                  categoryToDelete.children && categoryToDelete.children.length > 0
                    ? 'Remova as subcategorias primeiro'
                    : ''
                }
              >
                {deleteMutation.isPending
                  ? 'Excluindo...'
                  : categoryToDelete.children && categoryToDelete.children.length > 0
                  ? 'Não é possível excluir'
                  : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Carregando categorias...</div>
      ) : (
        <div className="categories-list">
          {categories.length === 0 ? (
            <p>Nenhuma categoria encontrada.</p>
          ) : (
            categories.map(category => renderCategory(category))
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
