// TrainingConfigManager - Gerenciamento de configurações de treinamento
import React, { useState } from 'react';
import { useTrainingConfigs, useCreateTrainingConfig, useUpdateTrainingConfig, useDeleteTrainingConfig } from '../../../hooks/useTrainingConfigs.js';
import { Plus, Edit, Trash2, X, Save, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';
import './TrainingConfigManager.css';

const CONFIG_TYPES = [
  { value: 'training_type', label: 'Tipos de Treinamento', description: 'Tipos de treinamento disponíveis no formulário de agendamento' },
  { value: 'difficulty_level', label: 'Níveis de Dificuldade', description: 'Níveis de dificuldade dos treinamentos' },
  { value: 'modality', label: 'Modalidades', description: 'Modalidades de treinamento (Presencial, Online, etc.)' },
];

// Componente para linha arrastável da tabela
const SortableRow = ({ config, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: config.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <tr ref={setNodeRef} style={style} className={isDragging ? 'dragging' : ''}>
      <td style={{ width: '40px', padding: '0.5rem' }}>
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
      </td>
      <td>{config.label}</td>
      <td>
        <span className={`status-badge ${config.isActive ? 'active' : 'inactive'}`}>
          {config.isActive ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td>
        <div className="actions">
          <button
            type="button"
            className="btn-icon"
            onClick={() => onEdit(config)}
            title="Editar"
          >
            <Edit size={16} />
          </button>
          <button
            type="button"
            className="btn-icon btn-danger"
            onClick={() => onDelete(config)}
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
      </td>
    </tr>
  );
};

const TrainingConfigManager = () => {
  const { data: configsData, isLoading } = useTrainingConfigs();
  const createMutation = useCreateTrainingConfig();
  const updateMutation = useUpdateTrainingConfig();
  const deleteMutation = useDeleteTrainingConfig();

  const [selectedType, setSelectedType] = useState('training_type');
  const [editingConfig, setEditingConfig] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [configToDelete, setConfigToDelete] = useState(null);
  const [formData, setFormData] = useState({
    type: 'training_type',
    value: '',
    label: '',
    sortOrder: 0,
    isActive: true,
    metadata: '',
  });

  const configs = configsData || [];
  const filteredConfigs = configs.filter(config => config.type === selectedType);
  const sortedConfigs = [...filteredConfigs].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  // Sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Função para gerar valor técnico a partir do nome (remove acentos, normaliza)
  const generateTechnicalValue = (name) => {
    if (!name) return '';
    return name
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_') // Espaços viram underscore
      .replace(/[^a-z0-9_]/g, '') // Remove caracteres especiais
      .replace(/_+/g, '_') // Múltiplos underscores viram um
      .replace(/^_+|_+$/g, ''); // Remove underscores do início/fim
  };

  // Handler para quando o nome muda - auto-gera value e label (apenas ao criar novo)
  const handleNameChange = (name) => {
    if (editingConfig) {
      // Ao editar, apenas atualiza o label, mantém o value original
      setFormData({
        ...formData,
        label: name,
      });
    } else {
      // Ao criar novo, auto-gera value e label
      const technicalValue = generateTechnicalValue(name);
      setFormData({
        ...formData,
        value: technicalValue,
        label: name,
      });
    }
  };

  const handleNew = () => {
    setEditingConfig(null);
    setFormData({
      type: selectedType,
      value: '',
      label: '',
      sortOrder: filteredConfigs.length, // Ordem automática baseada na quantidade existente
      isActive: true,
      metadata: null, // Metadados serão null por padrão
    });
    setShowForm(true);
  };

  const handleEdit = (config) => {
    setEditingConfig(config);
    setFormData({
      type: config.type || selectedType,
      value: config.value || '',
      label: config.label || '',
      sortOrder: config.sortOrder || 0, // Manter ordem existente ao editar
      isActive: config.isActive !== undefined ? config.isActive : true,
      metadata: config.metadata || null, // Manter metadata existente ao editar
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.label.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    // Garantir que o value está preenchido (gerar se necessário)
    let finalValue = formData.value.trim();
    if (!finalValue) {
      finalValue = generateTechnicalValue(formData.label);
    }
    
    if (!finalValue) {
      toast.error('Erro ao gerar valor técnico. Tente novamente.');
      return;
    }

    try {
      // Calcular ordem automaticamente se estiver criando novo
      const autoSortOrder = editingConfig 
        ? (formData.sortOrder || 0) // Ao editar, manter ordem existente
        : filteredConfigs.length; // Ao criar, usar quantidade existente

      const submitData = {
        type: editingConfig ? formData.type : selectedType, // Ao criar, usar selectedType; ao editar, manter tipo original
        value: finalValue,
        label: formData.label.trim(),
        sortOrder: autoSortOrder,
        isActive: formData.isActive,
        metadata: null, // Sempre null - metadados não são necessários
      };

      if (editingConfig) {
        await updateMutation.mutateAsync({
          id: editingConfig.id,
          data: submitData,
        });
        toast.success('Configuração atualizada com sucesso!');
      } else {
        await createMutation.mutateAsync(submitData);
        toast.success('Configuração criada com sucesso!');
      }
      setShowForm(false);
      setEditingConfig(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao salvar configuração';
      toast.error(errorMessage);
    }
  };

  const handleDeleteClick = (config) => {
    setConfigToDelete(config);
  };

  const handleConfirmDelete = async () => {
    if (!configToDelete) return;

    try {
      await deleteMutation.mutateAsync(configToDelete.id);
      toast.success('Configuração excluída com sucesso!');
      setConfigToDelete(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao excluir configuração';
      toast.error(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setConfigToDelete(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingConfig(null);
    setFormData({
      type: selectedType,
      value: '',
      label: '',
      sortOrder: 0,
      isActive: true,
      metadata: '',
    });
  };

  // Handler para quando o drag termina - reordenar itens
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sortedConfigs.findIndex(config => config.id.toString() === active.id.toString());
    const newIndex = sortedConfigs.findIndex(config => config.id.toString() === over.id.toString());

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    // Reordenar localmente
    const reorderedConfigs = arrayMove(sortedConfigs, oldIndex, newIndex);

    // Atualizar sortOrder de todos os itens afetados
    try {
      // Atualizar todos os itens em paralelo
      await Promise.all(
        reorderedConfigs.map((config, index) =>
          updateMutation.mutateAsync({
            id: config.id,
            data: { 
              sortOrder: index,
              // Manter outros campos
              type: config.type,
              value: config.value,
              label: config.label,
              isActive: config.isActive,
              metadata: config.metadata,
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

  if (isLoading) {
    return <div className="loading">Carregando configurações...</div>;
  }

  return (
    <div className="training-config-manager">
      <div className="manager-header">
        <h2>Configurações de Treinamento</h2>
      </div>

      <div className="config-types-tabs">
        {CONFIG_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            className={`type-tab ${selectedType === type.value ? 'active' : ''}`}
            onClick={() => {
              setSelectedType(type.value);
              setShowForm(false);
              setEditingConfig(null);
            }}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="config-type-info">
        <p>{CONFIG_TYPES.find(t => t.value === selectedType)?.description}</p>
        <button 
          type="button" 
          onClick={handleNew}
          style={{
            marginTop: '0.75rem',
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
          Adicionar {CONFIG_TYPES.find(t => t.value === selectedType)?.label}
        </button>
      </div>

      {showForm && (
        <div className="category-form-modal" style={{
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
                {editingConfig 
                  ? `Editar ${CONFIG_TYPES.find(t => t.value === formData.type)?.label || 'Configuração'}`
                  : `Novo ${CONFIG_TYPES.find(t => t.value === selectedType)?.label || 'Configuração'}`
                }
              </h3>
              <button 
                className="close-btn" 
                onClick={handleCancelForm}
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
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
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
                  value={formData.label || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  placeholder={
                    selectedType === 'difficulty_level' 
                      ? 'Ex: Iniciante, Intermediário, Avançado'
                      : selectedType === 'modality'
                      ? 'Ex: Presencial, Online, Híbrido'
                      : 'Ex: Conciliação Bancária, Gestão de Estoque'
                  }
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

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  flex: 1,
                }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    style={{ 
                      cursor: 'pointer',
                      width: '18px',
                      height: '18px',
                      accentColor: '#3b82f6',
                    }}
                  />
                    <span>Ativo</span>
                </label>
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
                  onClick={handleCancelForm}
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
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: (createMutation.isPending || updateMutation.isPending) ? '#9ca3af' : 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (createMutation.isPending || updateMutation.isPending) ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    boxShadow: (createMutation.isPending || updateMutation.isPending) ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
                      e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
                      e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  <Save size={16} />
                  {createMutation.isPending || updateMutation.isPending ? 'Salvando...' : (editingConfig ? 'Atualizar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="configs-table">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Nome</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedConfigs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-state">
                    Nenhuma configuração encontrada. Clique em "Adicionar {CONFIG_TYPES.find(t => t.value === selectedType)?.label}" para adicionar.
                  </td>
                </tr>
              ) : (
                <SortableContext items={sortedConfigs.map(c => c.id.toString())} strategy={verticalListSortingStrategy}>
                  {sortedConfigs.map((config) => (
                    <SortableRow
                      key={config.id}
                      config={config}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </SortableContext>
              )}
            </tbody>
          </table>
        </DndContext>
      </div>

      {configToDelete && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir a configuração "{configToDelete.label}"?
            </p>
            <div className="modal-actions">
              <button 
                type="button" 
                onClick={handleCancelDelete}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ffffff',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.15s',
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
                type="button" 
                onClick={handleConfirmDelete}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#ef4444';
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingConfigManager;

