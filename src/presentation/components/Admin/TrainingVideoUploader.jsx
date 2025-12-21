// TrainingVideoUploader - Componente de upload de vídeos para treinamentos
import React, { useRef, useState } from 'react';
import { Upload, X, Video, Loader2, AlertCircle, GripVertical } from 'lucide-react';
import { useUploadTrainingVideo, useDeleteTrainingVideo, useReorderTrainingVideos } from '../../../hooks/useTrainingVideos.js';
import toast from 'react-hot-toast';
import './TrainingVideoUploader.css';

const TrainingVideoUploader = ({ trainingId, videos = [], onVideosChange }) => {
  const fileInputRef = useRef(null);
  const uploadMutation = useUploadTrainingVideo();
  const deleteMutation = useDeleteTrainingVideo();
  const reorderMutation = useReorderTrainingVideos();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/webm',
    'video/ogg',
    'video/x-matroska',
    'video/x-flv',
    'video/3gpp',
    'video/3gpp2',
    'video/x-m4v'
  ];

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const validateFile = (file) => {
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      toast.error('Tipo de arquivo inválido. Apenas vídeos são permitidos.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return false;
    }

    return true;
  };

  const processFile = async (file) => {
    if (!validateFile(file)) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);

    try {
      await uploadMutation.mutateAsync({ trainingId, file });
      toast.success('Vídeo enviado com sucesso!');
      onVideosChange?.();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error('Erro ao fazer upload do vídeo');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    await processFile(file);
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Tem certeza que deseja excluir este vídeo?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({ trainingId, videoId });
      toast.success('Vídeo excluído com sucesso!');
      onVideosChange?.();
    } catch (error) {
      console.error('Erro ao deletar vídeo:', error);
      toast.error('Erro ao excluir vídeo');
    }
  };

  const handleMove = async (videoId, direction) => {
    const currentVideos = videos || [];
    const currentIndex = currentVideos.findIndex(v => (v.id || v.Id) === videoId);
    if (currentIndex === -1) return;

    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= currentVideos.length) return;

    const videoIds = currentVideos.map(v => v.id || v.Id);
    const [moved] = videoIds.splice(currentIndex, 1);
    videoIds.splice(newIndex, 0, moved);

    try {
      await reorderMutation.mutateAsync({ trainingId, videoIds });
      toast.success('Ordem atualizada!');
      onVideosChange?.();
    } catch (error) {
      console.error('Erro ao reordenar vídeos:', error);
      toast.error('Erro ao reordenar vídeos');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const videoList = videos || [];

  return (
    <div className="training-video-uploader">
      <div className="training-video-uploader-header">
        <label>Vídeos do Treinamento</label>
        <span className="video-count">{videoList.length} vídeo(s)</span>
      </div>

      <div 
        className={`training-video-upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <button
          type="button"
          onClick={handleButtonClick}
          className="training-video-upload-button"
          disabled={isUploading || !trainingId}
        >
          {isUploading ? (
            <>
              <Loader2 size={18} className="spinning" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Upload size={18} />
              <span>Fazer Upload de Vídeo ou Arrastar Arquivo</span>
            </>
          )}
        </button>
        <p className="training-video-upload-hint">
          Formatos: MP4, MPEG, MOV, AVI, WMV, WebM, OGG, MKV, FLV, 3GP, M4V - máx. 50MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="training-video-file-input"
          disabled={isUploading || !trainingId}
        />
      </div>

      {videoList.length > 0 && (
        <div className="training-videos-list">
          {videoList.map((video, index) => {
            const videoId = video.id || video.Id;
            const filePath = video.filePath || video.FilePath;
            const fileName = video.originalName || video.OriginalName || video.fileName || video.FileName;
            
            return (
              <div key={videoId} className="training-video-item">
                <div className="training-video-item-drag">
                  <GripVertical size={16} />
                </div>
                <div className="training-video-item-preview">
                  <Video size={20} />
                </div>
                <div className="training-video-item-info">
                  <div className="training-video-item-name">{fileName}</div>
                  <div className="training-video-item-path">{filePath}</div>
                </div>
                <div className="training-video-item-actions">
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => handleMove(videoId, -1)}
                    disabled={index === 0}
                    title="Mover para cima"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => handleMove(videoId, 1)}
                    disabled={index === videoList.length - 1}
                    title="Mover para baixo"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(videoId)}
                    title="Excluir"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrainingVideoUploader;

