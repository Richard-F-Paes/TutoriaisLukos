// TrainingManager - Gerenciamento de treinamentos no admin
import React, { useState, useEffect } from 'react';
import { useTrainings, useDeleteTraining } from '../../../hooks/useTrainings.js';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import TrainingEditorPanel from './TrainingEditorPanel.jsx';
import { formatDate } from '../../../shared/utils/index.js';

const TrainingManager = ({ initialTrainingId = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [parentCategoryFilter, setParentCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState(initialTrainingId ? 'edit' : 'list');
  const [editingId, setEditingId] = useState(initialTrainingId);

  useEffect(() => {
    if (initialTrainingId) {
      setEditingId(initialTrainingId);
      setView('edit');
    }
  }, [initialTrainingId]);

  const { data: categoriesData } = useCategoriesHierarchical();
  const categories = categoriesData || [];

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

  const categoryIdFilter = subcategoryFilter 
    ? (() => {
        const subcat = allCategoriesFlat.find(cat => 
          (cat.id || cat.Id) === parseInt(subcategoryFilter)
        );
        return subcat ? (subcat.id || subcat.Id) : undefined;
      })()
    : parentCategoryFilter
      ? (() => {
          const parentCat = categories.find(cat => 
            (cat.id || cat.Id) === parseInt(parentCategoryFilter)
          );
          return parentCat ? (parentCat.id || parentCat.Id) : undefined;
        })()
      : undefined;

  const { data: trainingsData, isLoading } = useTrainings({
    categoryId: categoryIdFilter,
    isPublished: statusFilter === 'all' 
      ? undefined 
      : statusFilter === 'published' 
        ? true 
        : false,
  });

  const deleteMutation = useDeleteTraining();
  const trainings = trainingsData?.data || [];

  const mainCategories = categories.filter(cat => !(cat.parentId || cat.ParentId));
  
  const getSubcategories = (parentId) => {
    if (!parentId) return [];
    const parentCat = categories.find(cat => (cat.id || cat.Id) === parseInt(parentId));
    return parentCat?.children || [];
  };

  const availableSubcategories = getSubcategories(parentCategoryFilter);

  useEffect(() => {
    if (!parentCategoryFilter) {
      setSubcategoryFilter('');
    } else {
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
    const numId = id ? Number(id) : null;
    if (numId && !isNaN(numId)) {
      setEditingId(numId);
      setView('edit');
    } else {
      console.error('ID de treinamento inválido:', id);
      toast.error('Erro ao abrir editor: ID inválido');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Tem certeza que deseja excluir o treinamento "${title}"?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Treinamento excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir treinamento');
    }
  };

  // Filtrar treinamentos localmente por termo de busca
  const filteredTrainings = searchTerm
    ? trainings.filter(training => {
        const title = training.title || training.Title || '';
        const description = training.description || training.Description || '';
        const searchLower = searchTerm.toLowerCase();
        return title.toLowerCase().includes(searchLower) || 
               description.toLowerCase().includes(searchLower);
      })
    : trainings;

  if (view === 'edit') {
    return (
      <TrainingEditorPanel
        trainingId={editingId}
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
        <h2>Gerenciar Treinamentos</h2>
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
          Novo Treinamento
        </button>
      </div>

      <div className="manager-filters">
        <div className="filter-group">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar treinamentos..."
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
              setSubcategoryFilter('');
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
        <div className="loading">Carregando treinamentos...</div>
      ) : (
        <div className="tutorials-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Vídeos</th>
                <th>Status</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Nenhum treinamento encontrado
                  </td>
                </tr>
              ) : (
                filteredTrainings.map(training => {
                  const trainingId = training.id || training.Id;
                  const trainingTitle = training.title || training.Title;
                  const trainingIsPublished = training.isPublished !== undefined ? training.isPublished : training.IsPublished;
                  const trainingCreatedAt = training.createdAt || training.CreatedAt;
                  const trainingCategory = training.category || training.Category;
                  const videosCount = training.videos ? (Array.isArray(training.videos) ? training.videos.length : 0) : 0;
                  
                  return (
                    <tr key={trainingId}>
                      <td>{trainingTitle}</td>
                      <td>{trainingCategory?.name || trainingCategory?.Name || '-'}</td>
                      <td>{videosCount}</td>
                      <td>
                        <span className={`status-badge ${trainingIsPublished ? 'published' : 'draft'}`}>
                          {trainingIsPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td>
                        {trainingCreatedAt 
                          ? formatDate(trainingCreatedAt)
                          : '-'}
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => openEdit(trainingId)}
                            title="Editar"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            className="btn-icon btn-danger"
                            onClick={() => handleDelete(trainingId, trainingTitle)}
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

export default TrainingManager;

