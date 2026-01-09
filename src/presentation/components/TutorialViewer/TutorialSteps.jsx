// TutorialSteps - Navegação entre passos
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { appConfig } from '../../../infrastructure/config/app.config.js';
import './TutorialSteps.css';

const buildAbsoluteUrl = (url) => {
  if (!url) return null;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.startsWith('/uploads')) {
    return `${appConfig.apiUrl}${url}`;
  }

  if (!url.startsWith('/')) {
    return `${appConfig.apiUrl}/uploads/${url}`;
  }

  return `${appConfig.apiUrl}${url}`;
};

// Componente para um item de passo individual
const TutorialStepItem = ({ step, index, onZoomImage }) => {
  const stepId = step.id || step.Id || index;
  const sortOrder = step.sortOrder || step.SortOrder || index + 1;
  const title = step.title || step.Title || '';
  // Fallback para campos alternativos (content_html/contentHtml) sem quebrar o shape atual
  const content = step.content || step.Content || step.content_html || step.contentHtml;
  const imageUrl = step.imageUrl || step.ImageUrl;
  const videoUrl = step.videoUrl || step.VideoUrl;

  const [imageError, setImageError] = useState(false);

  const absoluteImageUrl = imageUrl ? buildAbsoluteUrl(imageUrl) : null;
  const absoluteVideoUrl = videoUrl ? buildAbsoluteUrl(videoUrl) : null;

  return (
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
          onClick={() => onZoomImage(index)}
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
  );
};

const ImageZoomModal = ({
  step,
  stepIndex,
  totalSteps,
  onClose,
  onPrev,
  onNext,
}) => {
  const title = step?.title || step?.Title || '';
  const sortOrder = step?.sortOrder || step?.SortOrder || stepIndex + 1;
  const imageUrl = step?.imageUrl || step?.ImageUrl;
  const absoluteImageUrl = imageUrl ? buildAbsoluteUrl(imageUrl) : null;

  const [zoom, setZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [touchState, setTouchState] = useState(null);
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [swipeStart, setSwipeStart] = useState(null);
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  const canPrev = stepIndex > 0;
  const canNext = stepIndex < totalSteps - 1;

  const calculatePanLimits = useCallback(() => {
    if (!imageRef.current || !wrapperRef.current) {
      return { maxX: 0, maxY: 0 };
    }

    const img = imageRef.current;
    const wrapper = wrapperRef.current;

    const imgRect = img.getBoundingClientRect();
    const imgWidth = imgRect.width / (zoom || 1);
    const imgHeight = imgRect.height / (zoom || 1);

    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperWidth = wrapperRect.width;
    const wrapperHeight = wrapperRect.height;

    const scaledWidth = imgWidth * zoom;
    const scaledHeight = imgHeight * zoom;

    const excessWidth = Math.max(0, scaledWidth - wrapperWidth);
    const excessHeight = Math.max(0, scaledHeight - wrapperHeight);

    const maxX = excessWidth / 2 + 10;
    const maxY = excessHeight / 2 + 10;

    return { maxX, maxY };
  }, [zoom]);

  useEffect(() => {
    if (!step) return;
    setZoom(1);
    setPanPosition({ x: 0, y: 0 });
    setTouchState(null);
    setLastTouchPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setSwipeStart(null);
  }, [step]);

  useEffect(() => {
    if (!step || zoom <= 1) return;

    const handleResize = () => {
      const limits = calculatePanLimits();
      setPanPosition((prev) => ({
        x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x)),
        y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [step, zoom, calculatePanLimits]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!step) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
      if (e.key === 'ArrowLeft' && canPrev) {
        e.preventDefault();
        e.stopPropagation();
        onPrev();
      }
      if (e.key === 'ArrowRight' && canNext) {
        e.preventDefault();
        e.stopPropagation();
        onNext();
      }
    };

    if (step) {
      document.addEventListener('keydown', handleKeyDown, true); // Use capture phase
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = 'unset';
    };
  }, [step, canPrev, canNext, onClose, onPrev, onNext]);

  const handleWheel = (e) => {
    if (!step) return;

    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(2.5, zoom + delta));
    setZoom(newZoom);

    if (newZoom === 1) {
      setPanPosition({ x: 0, y: 0 });
    } else {
      setTimeout(() => {
        const limits = calculatePanLimits();
        setPanPosition((prev) => ({
          x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x)),
          y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y)),
        }));
      }, 0);
    }
  };

  const handleTouchStart = (e) => {
    if (!step) return;

    if (e.touches.length === 2) {
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
      setSwipeStart(null);
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setSwipeStart({ x: touch.clientX, y: touch.clientY, time: Date.now() });
      setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!step) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.touches.length === 2 && touchState) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      const zoomFactor = currentDistance / touchState.initialDistance;
      const newZoom = Math.max(1, Math.min(2.5, touchState.initialZoom * zoomFactor));
      setZoom(newZoom);
      return;
    }

    if (e.touches.length === 1 && zoom > 1) {
      const touch = e.touches[0];

      if (lastTouchPosition.x === 0 && lastTouchPosition.y === 0) {
        setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
        return;
      }

      const deltaX = touch.clientX - lastTouchPosition.x;
      const deltaY = touch.clientY - lastTouchPosition.y;

      const limits = calculatePanLimits();
      setPanPosition((prev) => ({
        x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x + deltaX)),
        y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y + deltaY)),
      }));

      setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = (e) => {
    if (!step) return;

    if (touchState) {
      setTouchState(null);
    }
    setLastTouchPosition({ x: 0, y: 0 });

    if (swipeStart && zoom === 1) {
      const touch = e.changedTouches?.[0];
      if (touch) {
        const dx = touch.clientX - swipeStart.x;
        const dy = touch.clientY - swipeStart.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0 && canPrev) {
            onPrev();
          } else if (dx < 0 && canNext) {
            onNext();
          }
        }
      }
    }

    setSwipeStart(null);
  };

  const handleMouseDown = (e) => {
    if (!step || zoom <= 1) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX, 
      y: e.clientY,
      panX: panPosition.x,
      panY: panPosition.y
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    e.stopPropagation();

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const limits = calculatePanLimits();
    setPanPosition({
      x: Math.max(-limits.maxX, Math.min(limits.maxX, dragStart.panX + deltaX)),
      y: Math.max(-limits.maxY, Math.min(limits.maxY, dragStart.panY + deltaY)),
    });
  }, [isDragging, zoom, dragStart, calculatePanLimits]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Adicionar listeners globais quando estiver arrastando
  useEffect(() => {
    if (!isDragging || zoom <= 1 || !dragStart) return;

    const handleGlobalMouseMove = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const limits = calculatePanLimits();
      setPanPosition({
        x: Math.max(-limits.maxX, Math.min(limits.maxX, dragStart.panX + deltaX)),
        y: Math.max(-limits.maxY, Math.min(limits.maxY, dragStart.panY + deltaY)),
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, zoom, dragStart, calculatePanLimits]);

  if (!step || !absoluteImageUrl) return null;

  return (
    <div
      className="tutorial-image-zoom-modal"
      onClick={onClose}
    >
      <button
        className={`tutorial-image-zoom-arrow left ${!canPrev ? 'disabled' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (canPrev) onPrev();
        }}
        aria-label="Voltar passo"
        disabled={!canPrev}
      >
        ‹
      </button>
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
              if (zoom > 1) {
                const limits = calculatePanLimits();
                setPanPosition((prev) => ({
                  x: Math.max(-limits.maxX, Math.min(limits.maxX, prev.x)),
                  y: Math.max(-limits.maxY, Math.min(limits.maxY, prev.y)),
                }));
              }
            }}
          />
          <button
            className="tutorial-image-zoom-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        {title && (
          <div className="tutorial-image-zoom-footer">
            <span className="tutorial-image-zoom-caption-label">Legenda</span>
            <span className="tutorial-image-zoom-caption-label">Passo {sortOrder}</span>
            <div className="tutorial-image-zoom-caption">{title}</div>
          </div>
        )}
      </div>
      <button
        className={`tutorial-image-zoom-arrow right ${!canNext ? 'disabled' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (canNext) onNext();
        }}
        aria-label="Avançar passo"
        disabled={!canNext}
      >
        ›
      </button>
    </div>
  );
};

const TutorialSteps = ({ steps }) => {
  const [zoomedIndex, setZoomedIndex] = useState(null);

  if (!steps || steps.length === 0) {
    return null;
  }

  const currentStep = useMemo(
    () => (zoomedIndex !== null ? steps[zoomedIndex] : null),
    [steps, zoomedIndex]
  );

  const handleCloseZoom = () => setZoomedIndex(null);
  const handlePrev = () => setZoomedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () =>
    setZoomedIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));

  return (
    <div className="tutorial-steps">
      <h2 className="tutorial-steps-title">Passo a Passo</h2>
      <ol className="tutorial-steps-list">
        {steps.map((step, index) => (
          <TutorialStepItem
            key={step.id || step.Id || index}
            step={step}
            index={index}
            onZoomImage={setZoomedIndex}
          />
        ))}
      </ol>
      {zoomedIndex !== null && (
        <ImageZoomModal
          step={currentStep}
          stepIndex={zoomedIndex}
          totalSteps={steps.length}
          onClose={handleCloseZoom}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default TutorialSteps;
