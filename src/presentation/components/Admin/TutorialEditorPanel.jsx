// TutorialEditorPanel - Editor embutido (modal-only) para criar/editar tutoriais
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X, ChevronUp, ChevronDown, Save, Clock, Video, Image as ImageIcon } from 'lucide-react';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import { useCreateTutorial, useTutorial, useUpdateTutorial } from '../../../hooks/useTutorials.js';
import { useCreateStep, useDeleteStep, useReorderSteps, useSteps, useUpdateStep } from '../../../hooks/useSteps.js';

export default function TutorialEditorPanel({ tutorialId = null, onCancel, onSaved }) {
  const isNew = !tutorialId;

  const { data: categoriesData } = useCategoriesHierarchical();
  const categories = categoriesData || [];

  // Flatten categories for dropdown (include subcategories with hierarchy indicator)
  const flattenCategoriesForSelect = (cats, level = 0) => {
    const result = [];
    cats.forEach(cat => {
      const prefix = '  '.repeat(level);
      result.push({
        ...cat,
        displayName: `${prefix}${cat.name || cat.Name}`,
        level,
        id: cat.id || cat.Id,
      });
      if (cat.children && cat.children.length > 0) {
        result.push(...flattenCategoriesForSelect(cat.children, level + 1));
      }
    });
    return result;
  };

  const allCategoriesFlat = flattenCategoriesForSelect(categories);

  const { data: tutorialData, isLoading } = useTutorial(!isNew ? Number(tutorialId) : null);
  const createMutation = useCreateTutorial();
  const updateMutation = useUpdateTutorial();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const initial = useMemo(() => tutorialData?.data || null, [tutorialData]);
  const normalizedId = !isNew ? Number(tutorialId) : null;

  // Steps (somente após tutorial existir)
  const { data: stepsData } = useSteps(normalizedId);
  const steps = stepsData?.data || stepsData || [];
  const createStepMutation = useCreateStep(normalizedId);
  const updateStepMutation = useUpdateStep(normalizedId);
  const deleteStepMutation = useDeleteStep(normalizedId);
  const reorderStepsMutation = useReorderSteps(normalizedId);

  const [stepDraft, setStepDraft] = useState({
    id: null,
    title: '',
    content: '',
    videoUrl: '',
    imageUrl: '',
    duration: '',
  });

  useEffect(() => {
    if (!isNew && initial) {
      setTitle(initial.Title || initial.title || '');
      setDescription(initial.Description || initial.description || '');
      setContent(''); // Conteúdo removido - tutorial será dividido em passos
      setCategoryId(initial.CategoryId ? String(initial.CategoryId) : initial.categoryId ? String(initial.categoryId) : '');
      setIsPublished(!!(initial.IsPublished ?? initial.isPublished));
    }
    if (isNew) {
      setTitle('');
      setDescription('');
      setContent('');
      setCategoryId('');
      setIsPublished(false);
    }
  }, [isNew, initial]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description?.trim() || '',
      content: '', // Conteúdo removido - tutorial será dividido em passos
      categoryId: categoryId ? Number(categoryId) : null,
      isPublished,
    };

    try {
      if (isNew) {
        await createMutation.mutateAsync(payload);
        toast.success('Tutorial criado com sucesso!');
      } else {
        await updateMutation.mutateAsync({ id: tutorialId, data: payload });
        toast.success('Tutorial atualizado com sucesso!');
      }
      onSaved?.();
    } catch (e) {
      toast.error('Erro ao salvar tutorial');
    }
  };

  const resetStepDraft = () => {
    setStepDraft({ id: null, title: '', content: '', videoUrl: '', imageUrl: '', duration: '' });
  };

  const submitStep = async () => {
    if (isNew || !normalizedId) return;
    if (!stepDraft.title.trim()) {
      toast.error('Título do passo é obrigatório');
      return;
    }

    const payload = {
      title: stepDraft.title.trim(),
      content: stepDraft.content || '',
      videoUrl: stepDraft.videoUrl || null,
      imageUrl: stepDraft.imageUrl || null,
      duration: stepDraft.duration ? Number(stepDraft.duration) : null,
    };

    try {
      if (stepDraft.id) {
        await updateStepMutation.mutateAsync({ stepId: stepDraft.id, data: payload });
        toast.success('Passo atualizado!');
      } else {
        await createStepMutation.mutateAsync(payload);
        toast.success('Passo criado!');
      }
      resetStepDraft();
    } catch {
      toast.error('Erro ao salvar passo');
    }
  };

  const editStep = (s) => {
    setStepDraft({
      id: s.Id ?? s.id,
      title: s.Title ?? s.title ?? '',
      content: s.Content ?? s.content ?? '',
      videoUrl: s.VideoUrl ?? s.videoUrl ?? '',
      imageUrl: s.ImageUrl ?? s.imageUrl ?? '',
      duration: String(s.Duration ?? s.duration ?? ''),
    });
  };

  const removeStep = async (stepId) => {
    if (!normalizedId) return;
    if (!window.confirm('Excluir este passo?')) return;
    try {
      await deleteStepMutation.mutateAsync(stepId);
      toast.success('Passo excluído!');
    } catch {
      toast.error('Erro ao excluir passo');
    }
  };

  const moveStep = async (fromIndex, direction) => {
    if (!normalizedId) return;
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= steps.length) return;

    const ids = steps.map((s) => s.Id ?? s.id);
    const [moved] = ids.splice(fromIndex, 1);
    ids.splice(toIndex, 0, moved);

    try {
      await reorderStepsMutation.mutateAsync(ids);
      toast.success('Ordem atualizada!');
    } catch {
      toast.error('Erro ao reordenar passos');
    }
  };

  return (
    <div className="tutorial-edit-page">
      <div className="edit-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: '#1f2937', letterSpacing: '-0.025em' }}>
          {isNew ? 'Novo Tutorial' : 'Editar Tutorial'}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onCancel}
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
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
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
            Voltar
          </button>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#374151',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
          >
            <input 
              type="checkbox" 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)}
              style={{ 
                cursor: 'pointer',
                width: '16px',
                height: '16px',
                accentColor: '#3b82f6',
              }}
            />
            <span>Publicar</span>
          </label>
          <button 
            onClick={handleSave} 
            className="btn-save-primary" 
            disabled={createMutation.isPending || updateMutation.isPending}
            style={{
              padding: '0.5rem 1rem',
              background: createMutation.isPending || updateMutation.isPending ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: createMutation.isPending || updateMutation.isPending ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
            onMouseEnter={(e) => {
              if (!createMutation.isPending && !updateMutation.isPending) {
                e.target.style.background = '#2563eb';
              }
            }}
            onMouseLeave={(e) => {
              if (!createMutation.isPending && !updateMutation.isPending) {
                e.target.style.background = '#3b82f6';
              }
            }}
          >
            {createMutation.isPending || updateMutation.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      {!isNew && isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="edit-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#374151',
                letterSpacing: '0.025em',
              }}>
                Título <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Digite o título do tutorial"
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

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#374151',
                letterSpacing: '0.025em',
              }}>
                Categoria
              </label>
              <select 
                value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.9375rem',
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
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
              >
                <option value="">Sem categoria</option>
                {allCategoriesFlat.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.displayName || cat.name || cat.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#374151',
              letterSpacing: '0.025em',
            }}>
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite uma descrição curta do tutorial"
              rows={3}
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
                fontFamily: 'inherit',
                resize: 'vertical',
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

          {/* Passos */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#374151',
              letterSpacing: '0.025em',
            }}>
              Passos
            </label>
            {isNew ? (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: '#f9fafb', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                color: '#6b7280',
                fontSize: '0.875rem',
              }}>
                Salve o tutorial primeiro para começar a criar passos.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Formulário de Passo */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem', 
                  padding: '1.25rem', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#1f2937',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <Plus size={18} />
                      {stepDraft.id ? 'Editar passo' : 'Novo passo'}
                    </h3>
                    {stepDraft.id && (
                      <button
                        type="button"
                        onClick={resetStepDraft}
                        style={{
                          padding: '0.375rem',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f3f4f6';
                          e.target.style.color = '#374151';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#6b7280';
                        }}
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: '#374151',
                    }}>
                      Título do passo <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={stepDraft.title}
                      onChange={(e) => setStepDraft((s) => ({ ...s, title: e.target.value }))}
                      placeholder="Digite o título do passo"
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

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: '#374151',
                    }}>
                      Conteúdo
                    </label>
                    <textarea
                      value={stepDraft.content}
                      onChange={(e) => setStepDraft((s) => ({ ...s, content: e.target.value }))}
                      placeholder="Digite o conteúdo do passo (HTML ou texto)"
                      rows={4}
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
                        fontFamily: 'inherit',
                        resize: 'vertical',
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '0.75rem' }}>
                    <div>
                      <label style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        marginBottom: '0.5rem', 
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: '#374151',
                      }}>
                        <Video size={14} />
                        URL do Vídeo
                      </label>
                      <input
                        type="text"
                        value={stepDraft.videoUrl}
                        onChange={(e) => setStepDraft((s) => ({ ...s, videoUrl: e.target.value }))}
                        placeholder="https://..."
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
                    <div>
                      <label style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        marginBottom: '0.5rem', 
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: '#374151',
                      }}>
                        <ImageIcon size={14} />
                        URL da Imagem
                      </label>
                      <input
                        type="text"
                        value={stepDraft.imageUrl}
                        onChange={(e) => setStepDraft((s) => ({ ...s, imageUrl: e.target.value }))}
                        placeholder="https://..."
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
                    <div>
                      <label style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        marginBottom: '0.5rem', 
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: '#374151',
                      }}>
                        <Clock size={14} />
                        Duração (min)
                      </label>
                      <input
                        type="number"
                        value={stepDraft.duration}
                        onChange={(e) => setStepDraft((s) => ({ ...s, duration: e.target.value }))}
                        placeholder="0"
                        min="0"
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
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    {stepDraft.id && (
                      <button 
                        type="button" 
                        onClick={resetStepDraft} 
                        disabled={createStepMutation.isPending || updateStepMutation.isPending}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#ffffff',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          cursor: createStepMutation.isPending || updateStepMutation.isPending ? 'not-allowed' : 'pointer',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          transition: 'all 0.15s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          opacity: createStepMutation.isPending || updateStepMutation.isPending ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (!createStepMutation.isPending && !updateStepMutation.isPending) {
                            e.target.style.background = '#f9fafb';
                            e.target.style.borderColor = '#9ca3af';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!createStepMutation.isPending && !updateStepMutation.isPending) {
                            e.target.style.background = '#ffffff';
                            e.target.style.borderColor = '#d1d5db';
                          }
                        }}
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    )}
                    <button 
                      type="button" 
                      onClick={submitStep} 
                      disabled={createStepMutation.isPending || updateStepMutation.isPending}
                      style={{
                        padding: '0.5rem 1rem',
                        background: createStepMutation.isPending || updateStepMutation.isPending ? '#9ca3af' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: createStepMutation.isPending || updateStepMutation.isPending ? 'not-allowed' : 'pointer',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                      }}
                      onMouseEnter={(e) => {
                        if (!createStepMutation.isPending && !updateStepMutation.isPending) {
                          e.target.style.background = '#2563eb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!createStepMutation.isPending && !updateStepMutation.isPending) {
                          e.target.style.background = '#3b82f6';
                        }
                      }}
                    >
                      <Save size={16} />
                      {createStepMutation.isPending || updateStepMutation.isPending ? 'Salvando...' : 'Salvar passo'}
                    </button>
                  </div>
                </div>

                {/* Lista de Passos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(steps || []).length === 0 ? (
                    <div style={{ 
                      padding: '2rem', 
                      textAlign: 'center',
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#6b7280',
                      fontSize: '0.875rem',
                    }}>
                      Nenhum passo ainda. Adicione o primeiro passo acima.
                    </div>
                  ) : (
                    steps.map((s, idx) => {
                      const stepId = s.Id ?? s.id ?? idx;
                      const stepTitle = s.Title ?? s.title ?? 'Sem título';
                      const stepDuration = s.Duration ?? s.duration;
                      const stepOrder = s.SortOrder ?? s.sortOrder ?? idx + 1;
                      
                      return (
                        <div
                          key={stepId}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            padding: '1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            transition: 'all 0.2s',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: '32px',
                              height: '32px',
                              backgroundColor: '#f3f4f6',
                              borderRadius: '6px',
                              color: '#6b7280',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}>
                              {stepOrder}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ 
                                fontWeight: 600, 
                                fontSize: '0.9375rem',
                                color: '#1f2937',
                                marginBottom: '0.25rem',
                              }}>
                                {stepTitle}
                              </div>
                              <div style={{ 
                                fontSize: '0.8125rem', 
                                color: '#6b7280',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}>
                                {stepDuration && (
                                  <>
                                    <Clock size={12} />
                                    {stepDuration} min
                                  </>
                                )}
                                {!stepDuration && <span>Sem duração definida</span>}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button 
                              type="button" 
                              onClick={() => moveStep(idx, -1)} 
                              disabled={reorderStepsMutation.isPending || idx === 0}
                              style={{
                                padding: '0.5rem',
                                background: idx === 0 ? '#f3f4f6' : '#ffffff',
                                color: idx === 0 ? '#9ca3af' : '#374151',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                cursor: idx === 0 || reorderStepsMutation.isPending ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.15s',
                                opacity: idx === 0 ? 0.5 : 1,
                              }}
                              onMouseEnter={(e) => {
                                if (idx !== 0 && !reorderStepsMutation.isPending) {
                                  e.target.style.backgroundColor = '#f9fafb';
                                  e.target.style.borderColor = '#d1d5db';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (idx !== 0 && !reorderStepsMutation.isPending) {
                                  e.target.style.backgroundColor = '#ffffff';
                                  e.target.style.borderColor = '#e5e7eb';
                                }
                              }}
                              title="Mover para cima"
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => moveStep(idx, 1)} 
                              disabled={reorderStepsMutation.isPending || idx === steps.length - 1}
                              style={{
                                padding: '0.5rem',
                                background: idx === steps.length - 1 ? '#f3f4f6' : '#ffffff',
                                color: idx === steps.length - 1 ? '#9ca3af' : '#374151',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                cursor: idx === steps.length - 1 || reorderStepsMutation.isPending ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.15s',
                                opacity: idx === steps.length - 1 ? 0.5 : 1,
                              }}
                              onMouseEnter={(e) => {
                                if (idx !== steps.length - 1 && !reorderStepsMutation.isPending) {
                                  e.target.style.backgroundColor = '#f9fafb';
                                  e.target.style.borderColor = '#d1d5db';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (idx !== steps.length - 1 && !reorderStepsMutation.isPending) {
                                  e.target.style.backgroundColor = '#ffffff';
                                  e.target.style.borderColor = '#e5e7eb';
                                }
                              }}
                              title="Mover para baixo"
                            >
                              <ChevronDown size={16} />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => editStep(s)}
                              style={{
                                padding: '0.5rem',
                                background: '#ffffff',
                                color: '#3b82f6',
                                border: '1px solid #dbeafe',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.15s',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#eff6ff';
                                e.target.style.borderColor = '#93c5fd';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#ffffff';
                                e.target.style.borderColor = '#dbeafe';
                              }}
                              title="Editar passo"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => removeStep(stepId)} 
                              disabled={deleteStepMutation.isPending}
                              style={{
                                padding: '0.5rem',
                                background: '#ffffff',
                                color: '#ef4444',
                                border: '1px solid #fee2e2',
                                borderRadius: '6px',
                                cursor: deleteStepMutation.isPending ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.15s',
                                opacity: deleteStepMutation.isPending ? 0.6 : 1,
                              }}
                              onMouseEnter={(e) => {
                                if (!deleteStepMutation.isPending) {
                                  e.target.style.backgroundColor = '#fef2f2';
                                  e.target.style.borderColor = '#fecaca';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!deleteStepMutation.isPending) {
                                  e.target.style.backgroundColor = '#ffffff';
                                  e.target.style.borderColor = '#fee2e2';
                                }
                              }}
                              title="Excluir passo"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


