// TutorialEditorPanel - Editor embutido (modal-only) para criar/editar tutoriais
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useCategories } from '../../../hooks/useCategories.js';
import { useCreateTutorial, useTutorial, useUpdateTutorial } from '../../../hooks/useTutorials.js';
import TutorialEditor from '../TutorialEditor/TutorialEditor.jsx';
import { useCreateStep, useDeleteStep, useReorderSteps, useSteps, useUpdateStep } from '../../../hooks/useSteps.js';

export default function TutorialEditorPanel({ tutorialId = null, onCancel, onSaved }) {
  const isNew = !tutorialId;

  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];

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
      setContent(initial.Content || initial.content || '');
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
    if (!content || content.trim().length < 5) {
      toast.error('Conteúdo é obrigatório');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description?.trim() || '',
      content,
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
      <div className="edit-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Voltar
        </button>
        <h1 style={{ margin: 0, flex: 1 }}>{isNew ? 'Novo Tutorial' : 'Editar Tutorial'}</h1>
        <button onClick={handleSave} className="btn-save-primary" disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {!isNew && isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="edit-form">
          <div className="form-group">
            <label>Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do tutorial" />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição curta do tutorial"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Sem categoria</option>
              {categories.map((cat) => (
                <option key={cat.Id} value={cat.Id}>
                  {cat.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions" style={{ marginBottom: 10 }}>
            <label>
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} /> Publicar tutorial
            </label>
          </div>

          <div className="form-group">
            <label>Conteúdo</label>
            <TutorialEditor content={content} onChange={setContent} onSave={handleSave} />
          </div>

          {/* Passos */}
          <div className="form-group">
            <label>Passos</label>
            {isNew ? (
              <div style={{ opacity: 0.8 }}>
                Salve o tutorial primeiro para começar a criar passos.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'grid', gap: 8, padding: 10, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 600 }}>{stepDraft.id ? 'Editar passo' : 'Novo passo'}</div>
                  <input
                    type="text"
                    value={stepDraft.title}
                    onChange={(e) => setStepDraft((s) => ({ ...s, title: e.target.value }))}
                    placeholder="Título do passo"
                  />
                  <textarea
                    value={stepDraft.content}
                    onChange={(e) => setStepDraft((s) => ({ ...s, content: e.target.value }))}
                    placeholder="Conteúdo (HTML ou texto)"
                    rows={4}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: 8 }}>
                    <input
                      type="text"
                      value={stepDraft.videoUrl}
                      onChange={(e) => setStepDraft((s) => ({ ...s, videoUrl: e.target.value }))}
                      placeholder="Video URL"
                    />
                    <input
                      type="text"
                      value={stepDraft.imageUrl}
                      onChange={(e) => setStepDraft((s) => ({ ...s, imageUrl: e.target.value }))}
                      placeholder="Image URL"
                    />
                    <input
                      type="number"
                      value={stepDraft.duration}
                      onChange={(e) => setStepDraft((s) => ({ ...s, duration: e.target.value }))}
                      placeholder="Min"
                      min="0"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-secondary" onClick={resetStepDraft} disabled={createStepMutation.isPending || updateStepMutation.isPending}>
                      Cancelar
                    </button>
                    <button type="button" className="btn-primary" onClick={submitStep} disabled={createStepMutation.isPending || updateStepMutation.isPending}>
                      {createStepMutation.isPending || updateStepMutation.isPending ? 'Salvando...' : 'Salvar passo'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 8 }}>
                  {(steps || []).length === 0 ? (
                    <div style={{ opacity: 0.8 }}>Nenhum passo ainda.</div>
                  ) : (
                    steps.map((s, idx) => (
                      <div
                        key={s.Id ?? s.id ?? idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: 10,
                          alignItems: 'center',
                          padding: 10,
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: 12,
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600 }}>
                            {(s.SortOrder ?? s.sortOrder ?? idx + 1) + '. '} {s.Title ?? s.title}
                          </div>
                          <div style={{ fontSize: 12, opacity: 0.75 }}>
                            {s.Duration ?? s.duration ? `${s.Duration ?? s.duration} min` : 'sem duração'}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 6 }}>
                          <button type="button" className="btn-secondary" onClick={() => moveStep(idx, -1)} disabled={reorderStepsMutation.isPending}>
                            ↑
                          </button>
                          <button type="button" className="btn-secondary" onClick={() => moveStep(idx, 1)} disabled={reorderStepsMutation.isPending}>
                            ↓
                          </button>
                          <button type="button" className="btn-secondary" onClick={() => editStep(s)}>
                            Editar
                          </button>
                          <button type="button" className="btn-danger" onClick={() => removeStep(s.Id ?? s.id)} disabled={deleteStepMutation.isPending}>
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))
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


