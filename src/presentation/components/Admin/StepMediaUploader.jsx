// StepMediaUploader - Componente de upload de mídia para passos (aceita vídeo ou imagem)
import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Video, Loader2, AlertCircle } from 'lucide-react';
import { useUploadMedia } from '../../../hooks/useMedia.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import toast from 'react-hot-toast';
import './StepMediaUploader.css';

const StepMediaUploader = ({ videoUrl = '', imageUrl = '', onVideoChange, onImageChange, onRemove }) => {
  const fileInputRef = useRef(null);
  const uploadMutation = useUploadMedia();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaType, setMediaType] = useState(null); // 'image' ou 'video'

  // Tipos de arquivo permitidos
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
  const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/mpeg',
    'video/quicktime', // .mov
    'video/x-msvideo', // .avi
    'video/x-ms-wmv', // .wmv
    'video/webm',
    'video/ogg',
    'video/x-matroska', // .mkv
    'video/x-flv', // .flv
    'video/3gpp', // .3gp
    'video/3gpp2', // .3g2
    'video/x-m4v' // .m4v
  ];
  const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  // Determinar qual mídia está ativa e seu tipo
  const activeMedia = videoUrl || imageUrl;
  const currentMediaType = videoUrl ? 'video' : (imageUrl ? 'image' : null);

  // Atualizar mediaType quando há mídia
  React.useEffect(() => {
    if (currentMediaType) {
      setMediaType(currentMediaType);
    }
  }, [currentMediaType]);

  // Detectar tipo de arquivo
  const detectFileType = (file) => {
    // Primeiro tentar pelo MIME type
    if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'image';
    }
    if (ALLOWED_VIDEO_TYPES.includes(file.type)) {
      return 'video';
    }
    
    // Se não encontrar pelo MIME, tentar pela extensão
    const fileName = file.name.toLowerCase();
    const imageExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.webp',
      '.bmp', '.svg', '.tiff', '.tif', '.ico',
      '.heic', '.heif', '.avif'
    ];
    const videoExtensions = [
      '.mp4', '.mpeg', '.mpg', '.mov', '.avi',
      '.wmv', '.webm', '.ogg', '.ogv', '.mkv',
      '.flv', '.3gp', '.3g2', '.m4v'
    ];
    
    if (imageExtensions.some(ext => fileName.endsWith(ext))) {
      return 'image';
    }
    if (videoExtensions.some(ext => fileName.endsWith(ext))) {
      return 'video';
    }
    
    return null;
  };

  const validateFile = (file) => {
    const detectedType = detectFileType(file);
    
    if (!detectedType) {
      toast.error('Tipo de arquivo inválido. Formatos aceitos: Imagens (JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, ICO, HEIC, HEIF, AVIF) ou Vídeos (MP4, MPEG, MOV, AVI, WMV, WebM, OGG, MKV, FLV, 3GP, M4V).');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return false;
    }

    return detectedType;
  };

  const processFile = async (file) => {
    const detectedType = validateFile(file);
    if (!detectedType) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);
    setMediaType(detectedType);

    try {
      // Fazer upload
      const userId = user?.id || user?.Id || null;
      const response = await uploadMutation.mutateAsync({ file, userId });
      
      // A resposta pode vir em diferentes formatos (normalizar)
      const mediaData = response?.data || response;
      const mediaUrl = mediaData?.url || mediaData?.Url;
      
      if (!mediaUrl) {
        throw new Error('URL não retornada pelo servidor');
      }

      // Limpar o campo oposto e atualizar o correto
      if (detectedType === 'video') {
        onImageChange?.(''); // Limpar imagem
        onVideoChange?.(mediaUrl);
      } else {
        onVideoChange?.(''); // Limpar vídeo
        onImageChange?.(mediaUrl);
      }
      
      toast.success(`${detectedType === 'image' ? 'Imagem' : 'Vídeo'} enviado com sucesso!`);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error(`Erro ao fazer upload do ${detectedType === 'image' ? 'imagem' : 'vídeo'}`);
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

  // Drag and Drop handlers
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

  const handleRemove = () => {
    if (videoUrl) {
      onVideoChange?.('');
    }
    if (imageUrl) {
      onImageChange?.('');
    }
    setMediaType(null);
    onRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const isExternalUrl = (url) => {
    if (!url) return false;
    return !url.startsWith('/uploads') && !url.startsWith('http://localhost');
  };

  const previewUrl = videoUrl || imageUrl;
  const displayType = currentMediaType || mediaType;

  return (
    <div 
      className={`step-media-uploader ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="step-media-uploader-header">
        <label className="step-media-uploader-label">
          {displayType === 'image' ? (
            <>
              <ImageIcon size={14} />
              Mídia (Imagem)
            </>
          ) : displayType === 'video' ? (
            <>
              <Video size={14} />
              Mídia (Vídeo)
            </>
          ) : (
            <>
              <Upload size={14} />
              Mídia (Vídeo ou Imagem)
            </>
          )}
        </label>
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="step-media-uploader-remove"
            title="Remover mídia"
            disabled={isUploading}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {previewUrl ? (
        <div className="step-media-uploader-preview">
          {currentMediaType === 'image' ? (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="step-media-preview-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling?.classList.remove('hidden');
              }}
            />
          ) : (
            <video 
              src={previewUrl} 
              controls 
              className="step-media-preview-video"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling?.classList.remove('hidden');
              }}
            />
          )}
          <div className="step-media-preview-error hidden">
            <AlertCircle size={24} />
            <span>Erro ao carregar preview</span>
          </div>
          {isExternalUrl(previewUrl) && (
            <div className="step-media-external-badge">
              URL Externa
            </div>
          )}
        </div>
      ) : (
        <div className={`step-media-uploader-empty ${isDragging ? 'drag-over' : ''}`}>
          <button
            type="button"
            onClick={handleButtonClick}
            className="step-media-upload-button"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="spinning" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span>Fazer Upload ou Arrastar Arquivo</span>
              </>
            )}
          </button>
          <p className="step-media-uploader-hint">
            Formatos: Imagens (JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, ICO, HEIC, HEIF, AVIF) ou Vídeos (MP4, MPEG, MOV, AVI, WMV, WebM, OGG, MKV, FLV, 3GP, M4V) - máx. 50MB
          </p>
        </div>
      )}

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="step-media-file-input"
        disabled={isUploading}
      />

      {/* Campo de URL manual (opcional, para URLs externas) */}
      {previewUrl && isExternalUrl(previewUrl) && (
        <div className="step-media-url-input">
          <input
            type="text"
            value={previewUrl}
            onChange={(e) => {
              const url = e.target.value;
              if (currentMediaType === 'video') {
                onVideoChange?.(url);
              } else {
                onImageChange?.(url);
              }
            }}
            placeholder={`URL do ${currentMediaType === 'image' ? 'imagem' : 'vídeo'}`}
            className="step-media-url-field"
          />
        </div>
      )}

      {/* Botão para adicionar URL manual se não houver preview */}
      {!previewUrl && !isUploading && (
        <button
          type="button"
          onClick={() => {
            const url = prompt('Digite a URL da mídia (imagem ou vídeo):');
            if (url && url.trim()) {
              // Tentar detectar tipo pela URL
              const lowerUrl = url.toLowerCase();
              const videoExtensions = ['.mp4', '.mpeg', '.mpg', '.mov', '.avi', '.wmv', '.webm', '.ogg', '.ogv', '.mkv', '.flv', '.3gp', '.3g2', '.m4v'];
              const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.tiff', '.tif', '.ico', '.heic', '.heif', '.avif'];
              const isVideo = videoExtensions.some(ext => lowerUrl.includes(ext)) || lowerUrl.includes('video');
              const isImage = imageExtensions.some(ext => lowerUrl.includes(ext)) || lowerUrl.includes('image');
              
              if (isVideo) {
                onImageChange?.(''); // Limpar imagem
                onVideoChange?.(url.trim());
              } else if (isImage) {
                onVideoChange?.(''); // Limpar vídeo
                onImageChange?.(url.trim());
              } else {
                // Se não conseguir detectar, perguntar ao usuário
                const choice = prompt('É uma imagem ou vídeo? Digite "imagem" ou "video":');
                if (choice && choice.toLowerCase().includes('video')) {
                  onImageChange?.('');
                  onVideoChange?.(url.trim());
                } else {
                  onVideoChange?.('');
                  onImageChange?.(url.trim());
                }
              }
            }
          }}
          className="step-media-url-button"
        >
          Ou inserir URL manualmente
        </button>
      )}
    </div>
  );
};

export default StepMediaUploader;

