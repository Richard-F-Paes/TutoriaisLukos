// TrainingEditorPanel - Editor para criar/editar treinamentos (focado em vídeos)
import React, { useEffect, useMemo, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
import { useCreateTraining, useTraining, useUpdateTraining } from '../../../hooks/useTrainings.js';
import { useTrainingVideos } from '../../../hooks/useTrainingVideos.js';
import { useTrainingConfigsByType } from '../../../hooks/useTrainingConfigs.js';
import TrainingVideoUploader from './TrainingVideoUploader.jsx';
import StepMediaUploader from './StepMediaUploader.jsx';
import './TutorialEditorPanel.css';

export default function TrainingEditorPanel({ trainingId = null, onCancel, onSaved }) {
  const isNew = !trainingId;

  const { data: difficultyLevels = [] } = useTrainingConfigsByType('difficulty_level');
  const { data: trainingTypes = [] } = useTrainingConfigsByType('training_type');

  const normalizedTrainingId = useMemo(() => {
    if (isNew || !trainingId) return null;
    const numId = Number(trainingId);
    return isNaN(numId) ? null : numId;
  }, [trainingId, isNew]);

  const { data: trainingData, isLoading } = useTraining(normalizedTrainingId);
  const createMutation = useCreateTraining();
  const updateMutation = useUpdateTraining();
  const { data: videosData, refetch: refetchVideos } = useTrainingVideos(normalizedTrainingId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const initializedRef = useRef(false);
  const lastInitialIdRef = useRef(null);

  useEffect(() => {
    const currentId = !isNew ? Number(trainingId) : null;
    if (lastInitialIdRef.current !== currentId) {
      initializedRef.current = false;
    }
  }, [trainingId, isNew]);

  const initial = useMemo(() => trainingData?.data || null, [trainingData]);

  useEffect(() => {
    const currentId = normalizedTrainingId;
    
    if (isNew) {
      if (!initializedRef.current) {
        setTitle('');
        setDescription('');
        setTrainingType('');
        setThumbnailUrl('');
        setDifficulty('');
        setEstimatedDuration('');
        setIsPublished(false);
        setIsFeatured(false);
        lastInitialIdRef.current = null;
        initializedRef.current = true;
      }
      return;
    }

    if (currentId !== null && initial && !isLoading) {
      const trainingIdFromData = initial.Id || initial.id;
      if (trainingIdFromData === currentId && (!initializedRef.current || lastInitialIdRef.current !== currentId)) {
        setTitle(initial.Title || initial.title || '');
        setDescription(initial.Description || initial.description || '');
        setTrainingType(initial.TrainingType || initial.trainingType || '');
        setThumbnailUrl(initial.ThumbnailUrl || initial.thumbnailUrl || '');
        setDifficulty(initial.Difficulty || initial.difficulty || '');
        setEstimatedDuration(initial.EstimatedDuration || initial.estimatedDuration ? String(initial.EstimatedDuration || initial.estimatedDuration) : '');
        setIsPublished(initial.IsPublished !== undefined ? initial.IsPublished : (initial.isPublished !== undefined ? initial.isPublished : false));
        setIsFeatured(initial.IsFeatured !== undefined ? initial.IsFeatured : (initial.isFeatured !== undefined ? initial.isFeatured : false));
        lastInitialIdRef.current = currentId;
        initializedRef.current = true;
      }
    }
  }, [normalizedTrainingId, initial, isLoading, isNew]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description?.trim() || null,
      trainingType: trainingType || null,
      thumbnailUrl: thumbnailUrl.trim() || null,
      difficulty: difficulty || null,
      estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
      isPublished,
      isFeatured,
    };

    try {
      if (isNew) {
        await createMutation.mutateAsync(payload);
        toast.success('Treinamento criado com sucesso!');
      } else {
        await updateMutation.mutateAsync({ id: normalizedTrainingId, data: payload });
        toast.success('Treinamento atualizado com sucesso!');
      }
      onSaved?.();
    } catch (error) {
      console.error('Erro ao salvar treinamento:', error);
      toast.error('Erro ao salvar treinamento');
    }
  };

  const videos = videosData?.data || [];

  if (isLoading && !isNew) {
    return <div className="loading">Carregando treinamento...</div>;
  }

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
          {isNew ? 'Novo Treinamento' : 'Editar Treinamento'}
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
          <label 
            htmlFor="publish-checkbox-training"
            style={{ 
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
              id="publish-checkbox-training"
              type="checkbox" 
              checked={isPublished} 
              onChange={(e) => {
                const newValue = e.target.checked;
                setIsPublished(newValue);
              }}
              style={{ 
                cursor: 'pointer',
                width: '16px',
                height: '16px',
                accentColor: '#6c2396',
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
              background: createMutation.isPending || updateMutation.isPending ? '#9ca3af' : 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
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
                e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (!createMutation.isPending && !updateMutation.isPending) {
                e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
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
              placeholder="Digite o título do treinamento"
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
                e.target.style.borderColor = '#6c2396';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="edit-form-grid">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#374151',
                letterSpacing: '0.025em',
              }}>
                Tipo de Treinamento
              </label>
              <select
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value)}
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
                  e.target.style.borderColor = '#6c2396';
                  e.target.style.outline = 'none';
                  e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Selecione...</option>
                {trainingTypes.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
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
                Dificuldade
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
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
                  e.target.style.borderColor = '#6c2396';
                  e.target.style.outline = 'none';
                  e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Selecione...</option>
                {difficultyLevels.map((level) => (
                  <option key={level.id} value={level.value}>
                    {level.label}
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
              placeholder="Digite uma descrição curta do treinamento"
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
                e.target.style.borderColor = '#6c2396';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
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
              Thumbnail
            </label>
            <StepMediaUploader
              imageUrl={thumbnailUrl}
              onImageChange={(url) => setThumbnailUrl(url || '')}
              onRemove={() => setThumbnailUrl('')}
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
              Duração Estimada (minutos)
            </label>
            <input
              type="number"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="Ex: 60"
              min="1"
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
                e.target.style.borderColor = '#6c2396';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 3px rgba(108, 35, 150, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              cursor: 'pointer',
              padding: '0.75rem 1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
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
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                style={{ 
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px',
                  accentColor: '#6c2396',
                }}
              />
              <span>Destaque</span>
            </label>
          </div>

          {!isNew && normalizedTrainingId && (
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#374151',
                letterSpacing: '0.025em',
              }}>
                Vídeos
              </label>
              <TrainingVideoUploader
                trainingId={normalizedTrainingId}
                videos={videos}
                onVideosChange={() => {
                  refetchVideos();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

