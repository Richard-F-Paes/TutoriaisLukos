// CategoryManager - Gerenciamento de categorias
import React, { useState, useRef } from 'react';
import { useCategoriesHierarchical, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../../hooks/useCategories.js';
import { useUploadMedia } from '../../../hooks/useMedia.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Plus, Edit, Trash2, X, ChevronRight, ChevronDown, GripVertical, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';
import { appConfig } from '../../../infrastructure/config/app.config.js';

const CategoryManager = () => {
  const { data: categoriesData, isLoading } = useCategoriesHierarchical();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const uploadMutation = useUploadMedia();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

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

  // Sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    const isSubcategory = category.parentId || category.parent;
    setFormData({
      name: category.name || '',
      description: category.description || '',
      icon: category.icon || '',
      color: category.color || '',
      imageUrl: isSubcategory ? '' : (category.imageUrl || ''), // Subcategorias não têm imagem
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
      imageUrl: '', // Subcategorias não têm imagem
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
      // Garantir que subcategorias não tenham imageUrl
      const dataToSave = formData.parentId 
        ? { ...formData, imageUrl: '' } 
        : formData;
      
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          data: dataToSave,
        });
        toast.success('Categoria atualizada com sucesso!');
      } else {
        await createMutation.mutateAsync(dataToSave);
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

  // Handler para upload de imagem
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo (mesmos tipos do StepMediaUploader)
    const ALLOWED_IMAGE_TYPES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/svg+xml',
      'image/tiff',
      'image/x-icon',
      'image/vnd.microsoft.icon',
      'image/heic',
      'image/heif',
      'image/avif'
    ];

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Tipo de arquivo inválido. Formatos aceitos: JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, ICO, HEIC, HEIF, AVIF.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Validar tamanho (máximo 50MB - igual aos tutoriais e treinamentos)
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      toast.loading('Fazendo upload da imagem...');
      const userId = user?.id || user?.Id || null;
      const response = await uploadMutation.mutateAsync({ file, userId });
      
      const mediaData = response?.data || response;
      const mediaUrl = mediaData?.url || mediaData?.Url;
      
      if (!mediaUrl) {
        throw new Error('URL não retornada pelo servidor');
      }

      // Construir URL completa se necessário (mesma lógica do StepMediaUploader)
      let fullUrl = mediaUrl;
      if (!mediaUrl.startsWith('http://') && !mediaUrl.startsWith('https://')) {
        // Se for URL relativa começando com /uploads, construir URL completa usando a base da API
        if (mediaUrl.startsWith('/uploads')) {
          fullUrl = `${appConfig.apiUrl}${mediaUrl}`;
        } else if (!mediaUrl.startsWith('/')) {
          // Se for URL relativa sem / no início, adicionar /uploads
          fullUrl = `${appConfig.apiUrl}/uploads/${mediaUrl}`;
        } else {
          // Caso contrário, usar a base da API
          fullUrl = `${appConfig.apiUrl}${mediaUrl}`;
        }
      }

      setFormData({ ...formData, imageUrl: fullUrl });
      toast.dismiss();
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.dismiss();
      toast.error('Erro ao fazer upload da imagem');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handler para quando o drag termina - reordenar categorias do mesmo nível
  const handleDragEnd = async (event, parentId = null) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // Obter categorias do mesmo nível (mesmo parentId)
    const sameLevelCategories = parentId === null
      ? categories.filter(cat => !cat.parentId)
      : categories.find(cat => cat.id === parentId)?.children || [];

    const sortedSameLevel = [...sameLevelCategories].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    const oldIndex = sortedSameLevel.findIndex(cat => cat.id.toString() === active.id.toString());
    const newIndex = sortedSameLevel.findIndex(cat => cat.id.toString() === over.id.toString());

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    // Reordenar localmente
    const reorderedCategories = arrayMove(sortedSameLevel, oldIndex, newIndex);

    // Atualizar sortOrder de todos os itens afetados
    try {
      await Promise.all(
        reorderedCategories.map((category, index) =>
          updateMutation.mutateAsync({
            id: category.id,
            data: {
              sortOrder: index,
              // Manter outros campos existentes
              name: category.name,
              description: category.description || null,
              icon: category.icon || null,
              color: category.color || null,
              imageUrl: category.imageUrl || null,
              parentId: category.parentId || null,
              isActive: category.isActive !== undefined ? category.isActive : true,
            },
          })
        )
      );

      toast.success('Ordem atualizada com sucesso!');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar ordem';
      toast.error(errorMessage);
    }
  };

  // Componente para categoria arrastável
  const SortableCategoryRow = ({ category, level, parentId }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: category.id.toString() });

    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const indentStyle = { marginLeft: `${level * 24}px` };

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div 
        ref={setNodeRef} 
        style={style}
        className="category-item" 
        data-category-id={category.id}
      >
        <div className="category-row" style={{
          ...indentStyle,
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: isDragging ? '#f3f4f6' : '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          transition: 'all 0.15s',
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }
        }}
        >
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'grab',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#6b7280';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#9ca3af';
            }}
            title="Arrastar para reordenar"
          >
            <GripVertical size={18} />
          </button>

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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, category.id)}
            >
              <SortableContext 
                items={category.children.map(c => c.id.toString())} 
                strategy={verticalListSortingStrategy}
              >
                {category.children
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map(child => (
                    <SortableCategoryRow 
                      key={child.id} 
                      category={child} 
                      level={level + 1} 
                      parentId={category.id}
                    />
                  ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="category-manager">
      <div className="manager-header">
        <h2>Gerenciar Categorias</h2>
        <button 
          onClick={handleNew}
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
              
              {/* Campo de Upload de Imagem - Apenas para categorias principais (não subcategorias) */}
              {!formData.parentId && (
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Imagem da Categoria
                </label>
                
                {/* Preview da imagem */}
                {formData.imageUrl && (
                  <div style={{
                    marginBottom: '1rem',
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                  }}>
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.9)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Input de upload */}
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backgroundColor: formData.imageUrl ? '#f9fafb' : '#ffffff',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!uploadMutation.isPending) {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!uploadMutation.isPending) {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.backgroundColor = formData.imageUrl ? '#f9fafb' : '#ffffff';
                  }
                }}
                onClick={() => {
                  if (!uploadMutation.isPending && fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml,image/tiff,image/x-icon,image/vnd.microsoft.icon,image/heic,image/heif,image/avif"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    disabled={uploadMutation.isPending}
                  />
                  {uploadMutation.isPending ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <Loader2 size={24} className="animate-spin" style={{ color: '#3b82f6' }} />
                      <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Enviando imagem...</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      {formData.imageUrl ? (
                        <>
                          <ImageIcon size={24} style={{ color: '#3b82f6' }} />
                          <span style={{ color: '#374151', fontSize: '0.875rem', fontWeight: 500 }}>
                            Clique para alterar a imagem
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload size={24} style={{ color: '#6b7280' }} />
                          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                            Clique para fazer upload ou arraste uma imagem aqui
                          </span>
                          <span style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                            Formatos: JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, ICO, HEIC, HEIF, AVIF - máx. 50MB
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              )}

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
                    background: 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
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
                    e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, null)}
            >
              <SortableContext 
                items={categories.map(c => c.id.toString())} 
                strategy={verticalListSortingStrategy}
              >
                {categories
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map(category => (
                    <SortableCategoryRow 
                      key={category.id} 
                      category={category} 
                      level={0} 
                      parentId={null}
                    />
                  ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
