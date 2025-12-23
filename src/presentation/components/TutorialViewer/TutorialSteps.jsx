// TutorialSteps - Navegação entre passos
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { appConfig } from '../../../infrastructure/config/app.config.js';
import './TutorialSteps.css';

// Componente para um item de passo individual
const TutorialStepItem = ({ step, index }) => {
  // Normalizar campos - aceitar tanto camelCase quanto PascalCase
  const stepId = step.id || step.Id || index;
  const sortOrder = step.sortOrder || step.SortOrder || index + 1;
  const title = step.title || step.Title || '';
  const content = step.content || step.Content;
  const imageUrl = step.imageUrl || step.ImageUrl;
  const videoUrl = step.videoUrl || step.VideoUrl;
  
  // Estado para tratamento de erro de imagem
  const [imageError, setImageError] = useState(false);
  // Estado para controlar o modal de zoom da imagem
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  // Estado para zoom da imagem (100% = 1.0, 250% = 2.5)
  const [zoom, setZoom] = useState(1);
  // Estado para posição de pan (scroll quando zoom > 1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  // Estado para touch (pinch zoom)
  const [touchState, setTouchState] = useState(null);
  // Estado para última posição do touch (para pan)
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });
  // Estado para mouse drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Refs para calcular limites de pan
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Construir URL absoluta para imagens e vídeos
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
  
  // Construir URLs absolutas
  const absoluteImageUrl = imageUrl ? getAbsoluteUrl(imageUrl) : null;
  const absoluteVideoUrl = videoUrl ? getAbsoluteUrl(videoUrl) : null;
  
  // Função para calcular limites de pan baseados no tamanho real
  const calculatePanLimits = useCallback(() => {
    if (!imageRef.current || !wrapperRef.current) {
      return { maxX: 0, maxY: 0 };
    }
    
    const img = imageRef.current;
    const wrapper = wrapperRef.current;
    
    // Obter o tamanho renderizado da imagem (sem zoom aplicado)
    // Usar getBoundingClientRect para obter o tamanho real renderizado
    const imgRect = img.getBoundingClientRect();
    const imgWidth = imgRect.width / (zoom || 1); // Dividir pelo zoom atual para obter tamanho original
    const imgHeight = imgRect.height / (zoom || 1);
    
    // Tamanho do container
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperWidth = wrapperRect.width;
    const wrapperHeight = wrapperRect.height;
    
    // Tamanho da imagem com zoom aplicado
    const scaledWidth = imgWidth * zoom;
    const scaledHeight = imgHeight * zoom;
    
    // Calcular quanto a imagem excede o container
    const excessWidth = Math.max(0, scaledWidth - wrapperWidth);
    const excessHeight = Math.max(0, scaledHeight - wrapperHeight);
    
    // Limites de pan (metade do excesso em cada direção)
    // Adicionar um pequeno buffer para permitir movimento suave
    const maxX = excessWidth / 2 + 10;
    const maxY = excessHeight / 2 + 10;
    
    return { maxX, maxY };
  }, [zoom]);

  // Resetar zoom e pan quando fechar o modal
  useEffect(() => {
    if (!isImageZoomed) {
      setZoom(1);
      setPanPosition({ x: 0, y: 0 });
      setTouchState(null);
      setLastTouchPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isImageZoomed]);

  // Recalcular limites quando zoom ou tamanho da janela mudar
  useEffect(() => {
    if (!isImageZoomed || zoom <= 1) return;

    const handleResize = () => {
      const limits = calculatePanLimits();
      setPanPosition(prev => ({
        x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x)),
        y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isImageZoomed, zoom, calculatePanLimits]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isImageZoomed) {
        setIsImageZoomed(false);
      }
    };
    
    if (isImageZoomed) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll do body quando o modal está aberto
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isImageZoomed]);

  // Handler para zoom com scroll do mouse
  const handleWheel = (e) => {
    if (!isImageZoomed) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(2.5, zoom + delta));
    setZoom(newZoom);
    
    // Se zoom voltar para 1, resetar pan
    if (newZoom === 1) {
      setPanPosition({ x: 0, y: 0 });
    } else {
      // Ajustar pan para os novos limites quando zoom muda
      setTimeout(() => {
        const limits = calculatePanLimits();
        setPanPosition(prev => ({
          x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x)),
          y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y)),
        }));
      }, 0);
    }
  };

  // Handler para touch start (início do pinch)
  const handleTouchStart = (e) => {
    if (!isImageZoomed || e.touches.length !== 2) return;
    
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    
    const distance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
    
    setTouchState({
      initialDistance: distance,
      initialZoom: zoom,
      centerX: (touch1.clientX + touch2.clientX) / 2,
      centerY: (touch1.clientY + touch2.clientY) / 2,
    });
  };

  // Handler para touch move (pinch zoom e pan)
  const handleTouchMove = (e) => {
    if (!isImageZoomed) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.touches.length === 2 && touchState) {
      // Pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      const zoomFactor = currentDistance / touchState.initialDistance;
      const newZoom = Math.max(1, Math.min(2.5, touchState.initialZoom * zoomFactor));
      setZoom(newZoom);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Pan quando zoom > 1
      const touch = e.touches[0];
      
      if (lastTouchPosition.x === 0 && lastTouchPosition.y === 0) {
        setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
        return;
      }
      
      const deltaX = touch.clientX - lastTouchPosition.x;
      const deltaY = touch.clientY - lastTouchPosition.y;
      
      const limits = calculatePanLimits();
      setPanPosition(prev => ({
        x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x + deltaX)),
        y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y + deltaY)),
      }));
      
      setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  // Handler para touch end
  const handleTouchEnd = () => {
    setTouchState(null);
    setLastTouchPosition({ x: 0, y: 0 });
  };

  // Handler para mouse drag (pan quando zoom > 1)
  const handleMouseDown = (e) => {
    if (zoom > 1 && e.button === 0) { // Apenas botão esquerdo
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      e.preventDefault();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const limits = calculatePanLimits();
      setPanPosition({
        x: Math.max(-limits.maxX, Math.min(limits.maxX, newX)),
        y: Math.max(-limits.maxY, Math.min(limits.maxY, newY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  return (
    <>
      <li 
        key={stepId} 
        className="tutorial-step-item"
        data-step-id={stepId}
      >
        <div className="tutorial-step-header">
          <span className="tutorial-step-number">{sortOrder}</span>
          <h3 className="tutorial-step-title">{title}</h3>
        </div>
        {content && (
          <div 
            className="tutorial-step-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {absoluteImageUrl && !imageError && (
          <img 
            src={absoluteImageUrl} 
            alt={title}
            className="tutorial-step-image"
            loading="lazy"
            onError={() => setImageError(true)}
            onClick={() => setIsImageZoomed(true)}
            style={{ cursor: 'pointer' }}
          />
        )}
        {imageError && (
          <div className="tutorial-step-image-error">
            <p>Imagem não disponível</p>
            <small>URL: {imageUrl}</small>
          </div>
        )}
        {absoluteVideoUrl && (
          <div className="tutorial-step-video">
            <ReactPlayer
              url={absoluteVideoUrl}
              controls
              width="100%"
              height="auto"
            />
          </div>
        )}
      </li>
      
      {/* Modal de zoom da imagem */}
      {isImageZoomed && absoluteImageUrl && (
        <div 
          className="tutorial-image-zoom-modal"
          onClick={() => setIsImageZoomed(false)}
        >
          <div 
            className="tutorial-image-zoom-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              ref={wrapperRef}
              className="tutorial-image-zoom-img-wrapper"
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <img 
                ref={imageRef}
                src={absoluteImageUrl} 
                alt={title}
                className="tutorial-image-zoom-img"
                style={{
                  transform: `scale(${zoom}) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                  transformOrigin: 'center center',
                  transition: touchState || isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
                draggable={false}
                onLoad={() => {
                  // Ajustar pan quando imagem carregar
                  if (zoom > 1) {
                    const limits = calculatePanLimits();
                    setPanPosition(prev => ({
                      x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x)),
                      y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y)),
                    }));
                  }
                }}
              />
              <button
                className="tutorial-image-zoom-close"
                onClick={() => setIsImageZoomed(false)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            {title && (
              <div className="tutorial-image-zoom-title">{title}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const TutorialSteps = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="tutorial-steps">
      <h2 className="tutorial-steps-title">Passo a Passo</h2>
      <ol className="tutorial-steps-list">
        {steps.map((step, index) => (
          <TutorialStepItem key={step.id || step.Id || index} step={step} index={index} />
        ))}
      </ol>
    </div>
  );
};

export default TutorialSteps;
