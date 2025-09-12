import React, { createContext, useContext, useState, useCallback } from 'react';

const EditorContext = createContext();

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor deve ser usado dentro de um EditorProvider');
  }
  return context;
};

export const EditorProvider = ({ children }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Adicionar elemento
  const addElement = useCallback((element) => {
    const newElement = {
      id: `element_${Date.now()}`,
      type: element.type,
      props: element.props || {},
      children: element.children || [],
      position: element.position || { x: 0, y: 0 },
      size: element.size || { width: 'auto', height: 'auto' },
      styles: element.styles || {},
      ...element
    };

    setElements(prev => {
      const newElements = [...prev, newElement];
      saveToHistory(newElements);
      setIsDirty(true);
      return newElements;
    });

    setSelectedElement(newElement);
    return newElement;
  }, []);

  // Atualizar elemento
  const updateElement = useCallback((elementId, updates) => {
    setElements(prev => {
      const newElements = prev.map(element => 
        element.id === elementId 
          ? { ...element, ...updates }
          : element
      );
      saveToHistory(newElements);
      setIsDirty(true);
      return newElements;
    });

    if (selectedElement?.id === elementId) {
      setSelectedElement(prev => ({ ...prev, ...updates }));
    }
  }, [selectedElement]);

  // Remover elemento
  const removeElement = useCallback((elementId) => {
    setElements(prev => {
      const newElements = prev.filter(element => element.id !== elementId);
      saveToHistory(newElements);
      setIsDirty(true);
      return newElements;
    });

    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  // Mover elemento
  const moveElement = useCallback((elementId, newPosition) => {
    updateElement(elementId, { position: newPosition });
  }, [updateElement]);

  // Redimensionar elemento
  const resizeElement = useCallback((elementId, newSize) => {
    updateElement(elementId, { size: newSize });
  }, [updateElement]);

  // Duplicar elemento
  const duplicateElement = useCallback((elementId) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      const duplicatedElement = {
        ...element,
        id: `element_${Date.now()}`,
        position: {
          x: element.position.x + 20,
          y: element.position.y + 20
        }
      };
      addElement(duplicatedElement);
    }
  }, [elements, addElement]);

  // Salvar no histórico
  const saveToHistory = useCallback((newElements) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(newElements)));
      return newHistory.slice(-50); // Manter apenas 50 estados
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElements(JSON.parse(JSON.stringify(history[newIndex])));
      setIsDirty(true);
    }
  }, [historyIndex, history]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElements(JSON.parse(JSON.stringify(history[newIndex])));
      setIsDirty(true);
    }
  }, [historyIndex, history]);

  // Limpar canvas
  const clearCanvas = useCallback(() => {
    setElements([]);
    setSelectedElement(null);
    saveToHistory([]);
    setIsDirty(true);
  }, [saveToHistory]);

  // Salvar projeto
  const saveProject = useCallback((projectName) => {
    const project = {
      name: projectName,
      elements: elements,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Salvar no localStorage (em produção seria no servidor)
    localStorage.setItem(`project_${projectName}`, JSON.stringify(project));
    setIsDirty(false);
    
    return project;
  }, [elements]);

  // Carregar projeto
  const loadProject = useCallback((projectName) => {
    const projectData = localStorage.getItem(`project_${projectName}`);
    if (projectData) {
      const project = JSON.parse(projectData);
      setElements(project.elements || []);
      setSelectedElement(null);
      saveToHistory(project.elements || []);
      setIsDirty(false);
      return project;
    }
    return null;
  }, [saveToHistory]);

  // Exportar como HTML
  const exportToHTML = useCallback(() => {
    const htmlContent = generateHTML(elements);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projeto.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [elements]);

  // Gerar HTML dos elementos
  const generateHTML = useCallback((elements) => {
    const generateElementHTML = (element) => {
      const { type, props, children, styles } = element;
      const styleString = Object.entries(styles)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
      
      const propsString = Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      
      const childrenHTML = children
        .map(child => generateElementHTML(child))
        .join('');
      
      return `<${type} ${propsString} style="${styleString}">${childrenHTML}</${type}>`;
    };

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto Exportado</title>
    <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        ${elements.map(element => generateElementHTML(element)).join('')}
    </div>
</body>
</html>`;
  }, []);

  // Alternar modo preview
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
    if (!isPreviewMode) {
      setSelectedElement(null);
    }
  }, [isPreviewMode]);

  // Verificar se pode fazer undo/redo
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const value = {
    // Estado
    selectedElement,
    elements,
    isPreviewMode,
    isDirty,
    canUndo,
    canRedo,
    
    // Ações
    setSelectedElement,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    resizeElement,
    duplicateElement,
    undo,
    redo,
    clearCanvas,
    saveProject,
    loadProject,
    exportToHTML,
    togglePreviewMode,
    
    // Utilitários
    generateHTML
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};
