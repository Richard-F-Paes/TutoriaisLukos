import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor } from '../../../../contexts/EditorContext';
import './EditorCanvas.css';

const EditorCanvas = () => {
  const { 
    elements, 
    selectedElement, 
    setSelectedElement, 
    updateElement, 
    removeElement,
    isPreviewMode 
  } = useEditor();
  
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef(null);

  // Renderizar elemento
  const renderElement = useCallback((element) => {
    const { type, props, styles, content, children } = element;
    
    const elementProps = {
      ...props,
      style: {
        ...styles,
        position: 'relative',
        cursor: isPreviewMode ? 'default' : 'pointer',
        outline: selectedElement?.id === element.id ? '2px solid #3b82f6' : 'none',
        outlineOffset: '2px'
      },
      onClick: (e) => {
        if (!isPreviewMode) {
          e.stopPropagation();
          setSelectedElement(element);
        }
      },
      onDoubleClick: (e) => {
        if (!isPreviewMode && element.props.contentEditable) {
          e.preventDefault();
          const newContent = prompt('Editar conteúdo:', content);
          if (newContent !== null) {
            updateElement(element.id, { content: newContent });
          }
        }
      }
    };

    // Se tem filhos, renderizar recursivamente
    if (children && children.length > 0) {
      return React.createElement(
        type,
        elementProps,
        children.map(child => renderElement(child))
      );
    }

    // Se tem conteúdo, renderizar com conteúdo
    if (content !== undefined) {
      return React.createElement(type, elementProps, content);
    }

    // Elemento vazio
    return React.createElement(type, elementProps);
  }, [selectedElement, isPreviewMode, setSelectedElement, updateElement]);

  // Lidar com drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (isPreviewMode) return;

    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newElement = {
        ...componentData.component,
        position: { x, y },
        styles: {
          ...componentData.component.styles,
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`
        }
      };

      // Adicionar elemento (será implementado no contexto)
      console.log('Adicionando elemento:', newElement);
    } catch (error) {
      console.error('Erro ao processar drop:', error);
    }
  }, [isPreviewMode]);

  // Lidar com drag over
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!isPreviewMode) {
      setDragOver(true);
    }
  }, [isPreviewMode]);

  // Lidar com drag leave
  const handleDragLeave = useCallback((e) => {
    if (!canvasRef.current.contains(e.relatedTarget)) {
      setDragOver(false);
    }
  }, []);

  // Lidar com clique no canvas
  const handleCanvasClick = useCallback((e) => {
    if (e.target === canvasRef.current && !isPreviewMode) {
      setSelectedElement(null);
    }
  }, [isPreviewMode, setSelectedElement]);

  // Atalhos de teclado
  const handleKeyDown = useCallback((e) => {
    if (isPreviewMode) return;

    if (e.key === 'Delete' && selectedElement) {
      removeElement(selectedElement.id);
    }
  }, [isPreviewMode, selectedElement, removeElement]);

  return (
    <div className="editor-canvas-container">
      <div className="canvas-toolbar">
        <div className="canvas-info">
          <span className="element-count">
            {elements.length} elemento{elements.length !== 1 ? 's' : ''}
          </span>
          {selectedElement && (
            <span className="selected-element">
              Selecionado: {selectedElement.type}
            </span>
          )}
        </div>
        
        <div className="canvas-actions">
          {selectedElement && (
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => removeElement(selectedElement.id)}
              title="Remover elemento (Delete)"
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      </div>

      <div
        ref={canvasRef}
        className={`editor-canvas ${dragOver ? 'drag-over' : ''} ${isPreviewMode ? 'preview-mode' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleCanvasClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {elements.length === 0 ? (
          <div className="empty-canvas">
            <div className="empty-canvas-content">
              <i className="fas fa-mouse-pointer"></i>
              <h3>Canvas Vazio</h3>
              <p>
                {isPreviewMode 
                  ? 'Nenhum elemento para visualizar'
                  : 'Arraste componentes da paleta para começar a criar'
                }
              </p>
              {!isPreviewMode && (
                <div className="empty-canvas-hint">
                  <i className="fas fa-arrow-left"></i>
                  <span>Use a paleta de componentes à esquerda</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="canvas-content">
            {elements.map(element => (
              <div key={element.id} className="canvas-element">
                {renderElement(element)}
                
                {!isPreviewMode && selectedElement?.id === element.id && (
                  <div className="element-controls">
                    <button
                      className="control-btn"
                      onClick={() => removeElement(element.id)}
                      title="Remover"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      className="control-btn"
                      onClick={() => {
                        const newContent = prompt('Editar conteúdo:', element.content);
                        if (newContent !== null) {
                          updateElement(element.id, { content: newContent });
                        }
                      }}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {dragOver && !isPreviewMode && (
          <div className="drop-indicator">
            <div className="drop-indicator-content">
              <i className="fas fa-plus"></i>
              <span>Solte o componente aqui</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorCanvas;
