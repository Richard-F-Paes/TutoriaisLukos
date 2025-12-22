// TrainingManager - Gerenciamento de treinamentos no admin
import React, { useState, useEffect, useRef } from 'react';
import { useTrainings, useDeleteTraining, useUpdateTraining } from '../../../hooks/useTrainings.js';
import { useTrainingConfigsByType } from '../../../hooks/useTrainingConfigs.js';
import { Plus, Edit, Trash2, Search, Filter, ChevronDown, Check, X as XIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import TrainingEditorPanel from './TrainingEditorPanel.jsx';
import { formatDate } from '../../../shared/utils/index.js';

const TrainingManager = ({ initialTrainingId = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState(initialTrainingId ? 'edit' : 'list');
  const [editingId, setEditingId] = useState(initialTrainingId);

  useEffect(() => {
    if (initialTrainingId) {
      setEditingId(initialTrainingId);
      setView('edit');
    }
  }, [initialTrainingId]);

  const { data: trainingsData, isLoading } = useTrainings({
    isPublished: statusFilter === 'all' 
      ? undefined 
      : statusFilter === 'published' 
        ? true 
        : false,
  });

  const deleteMutation = useDeleteTraining();
  const updateMutation = useUpdateTraining();
  const trainings = trainingsData?.data || [];
  
  // Obter tipos de treinamento
  const { data: trainingTypes = [] } = useTrainingConfigsByType('training_type');
  
  // Estado para controlar qual dropdown está aberto
  const [openDropdown, setOpenDropdown] = useState(null);

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

  const handleTypeChange = async (trainingId, trainingType) => {
    try {
      await updateMutation.mutateAsync({
        id: trainingId,
        data: {
          trainingType: trainingType || null,
        },
      });
      
      toast.success('Tipo atualizado com sucesso!');
      setOpenDropdown(null);
    } catch (error) {
      console.error('Erro ao atualizar tipo:', error);
      toast.error('Erro ao atualizar tipo');
    }
  };

  // Componente de dropdown para tipo de treinamento
  const TypeDropdown = ({ training, trainingType }) => {
    const dropdownRef = useRef(null);
    const trainingId = training.id || training.Id;
    const dropdownKey = `${trainingId}-type`;
    const isOpen = openDropdown === dropdownKey;
    
    const currentType = trainingType || null;
    
    // Encontrar o label do tipo atual
    const currentTypeConfig = trainingTypes.find(type => 
      (type.value || type.Value) === currentType
    );
    const displayText = currentTypeConfig 
      ? (currentTypeConfig.label || currentTypeConfig.Label || currentType)
      : (currentType || 'Sem tipo');

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

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
              minWidth: '200px',
              maxWidth: '300px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '0.5rem',
            }}
          >
            {/* Opção "Sem tipo" */}
            <button
              type="button"
              onClick={() => handleTypeChange(trainingId, null)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                textAlign: 'left',
                background: currentType === null ? '#f3e8ff' : 'transparent',
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
                e.currentTarget.style.backgroundColor = currentType === null ? '#f3e8ff' : 'transparent';
              }}
            >
              {currentType === null && <Check size={14} />}
              <span>Sem tipo</span>
            </button>

            {/* Lista de tipos */}
            {trainingTypes.map(type => {
              const typeValue = type.value || type.Value;
              const typeLabel = type.label || type.Label || typeValue;
              const isSelected = currentType === typeValue;
              
              return (
                <button
                  key={type.id || type.Id || typeValue}
                  type="button"
                  onClick={() => handleTypeChange(trainingId, typeValue)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    background: isSelected ? '#f3e8ff' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s',
                    marginTop: '0.25rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isSelected ? '#f3e8ff' : 'transparent';
                  }}
                >
                  {isSelected && <Check size={14} />}
                  <span>{typeLabel}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Filtrar treinamentos localmente por termo de busca e tipo
  const filteredTrainings = trainings.filter(training => {
    // Filtro por busca
    if (searchTerm) {
      const title = training.title || training.Title || '';
      const description = training.description || training.Description || '';
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = title.toLowerCase().includes(searchLower) || 
                           description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Filtro por tipo
    if (typeFilter !== 'all') {
      const trainingType = training.trainingType || training.TrainingType || null;
      if (trainingType !== typeFilter) return false;
    }
    
    return true;
  });

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
            placeholder="Buscar treinamentos..."
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

        {/* Filtro de Tipo */}
        <div style={{ position: 'relative' }}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
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
            <option value="all">Todos os tipos</option>
            {trainingTypes.map(type => {
              const typeValue = type.value || type.Value;
              const typeLabel = type.label || type.Label || typeValue;
              return (
                <option key={type.id || type.Id || typeValue} value={typeValue}>
                  {typeLabel}
                </option>
              );
            })}
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
        {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('all');
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
        <div className="loading">Carregando treinamentos...</div>
      ) : (
        <div className="tutorials-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Vídeos</th>
                <th>Status</th>
                <th>Última Atualização</th>
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
                  const trainingUpdatedAt = training.updatedAt || training.UpdatedAt;
                  const trainingType = training.trainingType || training.TrainingType;
                  const videosCount = training.videos ? (Array.isArray(training.videos) ? training.videos.length : 0) : 0;
                  
                  return (
                    <tr key={trainingId}>
                      <td>{trainingTitle}</td>
                      <td>
                        <TypeDropdown training={training} trainingType={trainingType} />
                      </td>
                      <td>{videosCount}</td>
                      <td>
                        <span className={`status-badge ${trainingIsPublished ? 'published' : 'draft'}`}>
                          {trainingIsPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td>
                        {trainingUpdatedAt 
                          ? formatDate(trainingUpdatedAt)
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

