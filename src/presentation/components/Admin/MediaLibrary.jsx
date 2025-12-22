// MediaLibrary - Biblioteca de mídia
import React, { useState } from 'react';
import { useMedia, useUploadMedia, useDeleteMedia } from '../../../hooks/useMedia.js';
import { Upload, Trash2, Video } from 'lucide-react';
import toast from 'react-hot-toast';

const MediaLibrary = () => {
  const { data: mediaData, isLoading } = useMedia();
  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();

  const media = mediaData?.data || [];

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast.loading('Fazendo upload...');
      await uploadMutation.mutateAsync(file);
      toast.dismiss();
      toast.success('Upload realizado com sucesso!');
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao fazer upload');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta mídia?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Mídia excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir mídia');
    }
  };

  return (
    <div className="media-library">
      <div className="manager-header">
        <h2>Biblioteca de Mídia</h2>
        <label
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
          <Upload size={18} />
          Upload
          <input type="file" onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {isLoading ? (
        <div className="loading">Carregando mídia...</div>
      ) : (
        <div className="media-grid">
          {media.map(item => (
            <div key={item.Id} className="media-item">
              {item.MimeType?.startsWith('image/') ? (
                <img src={item.Url} alt={item.OriginalName} />
              ) : (
                <div className="media-placeholder">
                  <Video size={48} />
                </div>
              )}
              <div className="media-info">
                <p className="media-name">{item.OriginalName}</p>
                <p className="media-size">{(item.Size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={() => handleDelete(item.Id)}
                className="btn-icon btn-danger media-delete"
                title="Excluir"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
