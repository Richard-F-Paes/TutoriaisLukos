// StepMediaUploader - Componente de upload de mídia para passos (aceita vídeo ou imagem)
import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Video, Loader2, AlertCircle } from 'lucide-react';
import { useUploadMedia } from '../../../hooks/useMedia.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { appConfig } from '../../../infrastructure/config/app.config.js';
import toast from 'react-hot-toast';
import './StepMediaUploader.css';

const StepMediaUploader = ({ videoUrl = '', imageUrl = '', onVideoChange, onImageChange, onRemove }) => {
  const fileInputRef = useRef(null);
  const uploadMutation = useUploadMedia();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaType, setMediaType] = useState(null); // 'image' ou 'video'
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('image'); // 'image' ou 'video'
  const urlInputRef = useRef(null);

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

  // Atualizar mediaType quando há mídia (incluindo quando os dados são carregados do backend)
  React.useEffect(() => {
    if (currentMediaType) {
      setMediaType(currentMediaType);
    } else if (!activeMedia && mediaType) {
      // Limpar mediaType se não houver mídia
      setMediaType(null);
    }
  }, [currentMediaType, activeMedia, mediaType]);

  // Focar no input quando o modal abrir
  useEffect(() => {
    if (isUrlModalOpen && urlInputRef.current) {
      setTimeout(() => {
        urlInputRef.current?.focus();
      }, 100);
    }
  }, [isUrlModalOpen]);

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

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast.error('Por favor, insira uma URL válida');
      return;
    }

    const url = urlInput.trim();
    
    // Tentar detectar tipo pela URL se não foi especificado
    let detectedType = selectedMediaType;
    if (!detectedType) {
      const lowerUrl = url.toLowerCase();
      const videoExtensions = ['.mp4', '.mpeg', '.mpg', '.mov', '.avi', '.wmv', '.webm', '.ogg', '.ogv', '.mkv', '.flv', '.3gp', '.3g2', '.m4v'];
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.tiff', '.tif', '.ico', '.heic', '.heif', '.avif'];
      const isVideo = videoExtensions.some(ext => lowerUrl.includes(ext)) || lowerUrl.includes('video');
      const isImage = imageExtensions.some(ext => lowerUrl.includes(ext)) || lowerUrl.includes('image');
      
      if (isVideo) {
        detectedType = 'video';
      } else if (isImage) {
        detectedType = 'image';
      } else {
        // Usar o tipo selecionado como padrão
        detectedType = selectedMediaType || 'image';
      }
    }

    // Atualizar o estado apropriado
    if (detectedType === 'video') {
      onImageChange?.(''); // Limpar imagem
      onVideoChange?.(url);
      setMediaType('video');
      toast.success('URL do vídeo inserida com sucesso!');
    } else {
      onVideoChange?.(''); // Limpar vídeo
      onImageChange?.(url);
      setMediaType('image');
      toast.success('URL da imagem inserida com sucesso!');
    }

    // Fechar modal e limpar
    setIsUrlModalOpen(false);
    setUrlInput('');
    setSelectedMediaType('image');
  };

  const isExternalUrl = (url) => {
    if (!url) return false;
    // Consideramos "interna" qualquer URL que aponte para /uploads (relativa ou absoluta).
    // Isso evita marcar como externa quando o backend está em IP/hostname (ex.: http://192.168.x.x:3001/uploads/...).
    if (url.startsWith('/uploads')) return false;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        const parsed = new URL(url);
        return !parsed.pathname.startsWith('/uploads');
      } catch {
        return true;
      }
    }
    return true;
  };

  // Construir URL absoluta para preview
  const getAbsoluteUrl = (url) => {
    if (!url) return null;
    
    // Se já for uma URL absoluta (http/https), retornar como está
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Se for URL relativa começando com /uploads, construir URL completa usando a base da API
    if (url.startsWith('/uploads')) {
      const baseUrl = appConfig.apiUrl;
      return `${baseUrl}${url}`;
    }
    
    // Se for URL relativa sem / no início, adicionar /uploads
    if (!url.startsWith('/')) {
      return `${appConfig.apiUrl}/uploads/${url}`;
    }
    
    // Caso contrário, usar a base da API
    return `${appConfig.apiUrl}${url}`;
  };

  const previewUrl = videoUrl || imageUrl;
  const displayType = currentMediaType || mediaType;
  const absolutePreviewUrl = previewUrl ? getAbsoluteUrl(previewUrl) : null;

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
          {(() => {
            // Determinar o tipo de mídia para exibição
            let mediaTypeToDisplay = displayType;
            
            // Se não temos o tipo definido, tentar detectar pela URL
            if (!mediaTypeToDisplay && previewUrl) {
              const urlLower = previewUrl.toLowerCase();
              const videoExtensions = ['.mp4', '.mpeg', '.mpg', '.mov', '.avi', '.wmv', '.webm', '.ogg', '.ogv', '.mkv', '.flv', '.3gp', '.3g2', '.m4v'];
              const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.tiff', '.tif', '.ico', '.heic', '.heif', '.avif'];
              
              if (videoExtensions.some(ext => urlLower.includes(ext))) {
                mediaTypeToDisplay = 'video';
              } else if (imageExtensions.some(ext => urlLower.includes(ext))) {
                mediaTypeToDisplay = 'image';
              }
              // Se ainda não detectou e temos videoUrl, é vídeo
              else if (videoUrl && !imageUrl) {
                mediaTypeToDisplay = 'video';
              }
              // Se temos imageUrl, é imagem
              else if (imageUrl && !videoUrl) {
                mediaTypeToDisplay = 'image';
              }
            }

            return mediaTypeToDisplay === 'video' ? (
              <video 
                key={absolutePreviewUrl}
                src={absolutePreviewUrl} 
                controls 
                className="step-media-preview-video"
                onError={(e) => {
                  console.error('Erro ao carregar vídeo:', absolutePreviewUrl, e);
                  e.target.style.display = 'none';
                  const errorDiv = e.target.nextSibling;
                  if (errorDiv) {
                    errorDiv.classList.remove('hidden');
                  }
                }}
              />
            ) : (
              <img 
                key={absolutePreviewUrl}
                src={absolutePreviewUrl} 
                alt="Preview da imagem" 
                className="step-media-preview-image"
                onError={(e) => {
                  console.error('Erro ao carregar imagem:', absolutePreviewUrl, e);
                  e.target.style.display = 'none';
                  const errorDiv = e.target.nextSibling;
                  if (errorDiv) {
                    errorDiv.classList.remove('hidden');
                  }
                }}
              />
            );
          })()}
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
            setUrlInput('');
            setSelectedMediaType('image');
            setIsUrlModalOpen(true);
          }}
          className="step-media-url-button"
        >
          Ou inserir URL manualmente
        </button>
      )}

      {/* Modal para inserir URL manualmente */}
      {isUrlModalOpen && (
        <div className="step-media-url-modal-overlay" onClick={() => setIsUrlModalOpen(false)}>
          <div className="step-media-url-modal" onClick={(e) => e.stopPropagation()}>
            <div className="step-media-url-modal-header">
              <h3>Inserir URL da Mídia</h3>
              <button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="step-media-url-modal-close"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="step-media-url-modal-body">
              <div className="step-media-url-modal-input-group">
                <label htmlFor="media-url-input">URL da mídia:</label>
                <input
                  id="media-url-input"
                  ref={urlInputRef}
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg ou https://exemplo.com/video.mp4"
                  className="step-media-url-modal-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUrlSubmit();
                    } else if (e.key === 'Escape') {
                      setIsUrlModalOpen(false);
                    }
                  }}
                />
              </div>
              <div className="step-media-url-modal-type-group">
                <label>Tipo de mídia:</label>
                <div className="step-media-url-modal-type-options">
                  <button
                    type="button"
                    onClick={() => setSelectedMediaType('image')}
                    className={`step-media-url-modal-type-btn ${selectedMediaType === 'image' ? 'active' : ''}`}
                  >
                    <ImageIcon size={16} />
                    Imagem
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMediaType('video')}
                    className={`step-media-url-modal-type-btn ${selectedMediaType === 'video' ? 'active' : ''}`}
                  >
                    <Video size={16} />
                    Vídeo
                  </button>
                </div>
              </div>
            </div>
            <div className="step-media-url-modal-footer">
              <button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="step-media-url-modal-cancel"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="step-media-url-modal-submit"
                disabled={!urlInput.trim()}
              >
                Inserir URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepMediaUploader;

