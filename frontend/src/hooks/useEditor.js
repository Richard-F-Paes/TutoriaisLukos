import { useState, useCallback, useRef } from 'react';

// Hook personalizado para o editor visual
export function useEditor() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const editorRef = useRef(null);

  // Adiciona componente ao editor
  const addComponent = useCallback((component) => {
    const newComponent = {
      id: Date.now().toString(),
      type: component.type,
      props: component.props || {},
      position: { x: 100, y: 100 },
      size: component.size || { width: 200, height: 100 },
      ...component
    };

    setComponents(prev => {
      const newComponents = [...prev, newComponent];
      saveToHistory(newComponents);
      return newComponents;
    });

    setSelectedComponent(newComponent.id);
  }, []);

  // Remove componente do editor
  const removeComponent = useCallback((componentId) => {
    setComponents(prev => {
      const newComponents = prev.filter(comp => comp.id !== componentId);
      saveToHistory(newComponents);
      return newComponents;
    });

    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  // Atualiza propriedades do componente
  const updateComponent = useCallback((componentId, updates) => {
    setComponents(prev => {
      const newComponents = prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, ...updates }
          : comp
      );
      saveToHistory(newComponents);
      return newComponents;
    });
  }, []);

  // Move componente
  const moveComponent = useCallback((componentId, position) => {
    updateComponent(componentId, { position });
  }, [updateComponent]);

  // Redimensiona componente
  const resizeComponent = useCallback((componentId, size) => {
    updateComponent(componentId, { size });
  }, [updateComponent]);

  // Duplica componente
  const duplicateComponent = useCallback((componentId) => {
    const component = components.find(comp => comp.id === componentId);
    if (component) {
      const duplicatedComponent = {
        ...component,
        id: Date.now().toString(),
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      };

      setComponents(prev => {
        const newComponents = [...prev, duplicatedComponent];
        saveToHistory(newComponents);
        return newComponents;
      });

      setSelectedComponent(duplicatedComponent.id);
    }
  }, [components]);

  // Salva estado no histórico
  const saveToHistory = useCallback((newComponents) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(newComponents)));
      return newHistory.slice(-50); // Mantém apenas os últimos 50 estados
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // Desfaz última ação
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setComponents(JSON.parse(JSON.stringify(history[newIndex])));
    }
  }, [history, historyIndex]);

  // Refaz ação desfeita
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setComponents(JSON.parse(JSON.stringify(history[newIndex])));
    }
  }, [history, historyIndex]);

  // Limpa o editor
  const clearEditor = useCallback(() => {
    setComponents([]);
    setSelectedComponent(null);
    saveToHistory([]);
  }, [saveToHistory]);

  // Salva projeto
  const saveProject = useCallback((projectName) => {
    const project = {
      name: projectName,
      components,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const savedProjects = JSON.parse(localStorage.getItem('editorProjects') || '[]');
    savedProjects.push(project);
    localStorage.setItem('editorProjects', JSON.stringify(savedProjects));

    return project;
  }, [components]);

  // Carrega projeto
  const loadProject = useCallback((project) => {
    setComponents(project.components || []);
    setSelectedComponent(null);
    saveToHistory(project.components || []);
  }, [saveToHistory]);

  // Lista projetos salvos
  const getSavedProjects = useCallback(() => {
    return JSON.parse(localStorage.getItem('editorProjects') || '[]');
  }, []);

  // Alterna modo de preview
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  // Ajusta zoom
  const setZoomLevel = useCallback((level) => {
    setZoom(Math.max(25, Math.min(200, level)));
  }, []);

  // Zoom in
  const zoomIn = useCallback(() => {
    setZoomLevel(zoom + 25);
  }, [zoom, setZoomLevel]);

  // Zoom out
  const zoomOut = useCallback(() => {
    setZoomLevel(zoom - 25);
  }, [zoom, setZoomLevel]);

  // Reset zoom
  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  // Exporta projeto como JSON
  const exportProject = useCallback(() => {
    const project = {
      components,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0'
      }
    };

    const blob = new Blob([JSON.stringify(project, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projeto-tutorial.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [components]);

  // Importa projeto de JSON
  const importProject = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const project = JSON.parse(e.target.result);
          if (project.components) {
            setComponents(project.components);
            setSelectedComponent(null);
            saveToHistory(project.components);
            resolve(project);
          } else {
            reject(new Error('Formato de arquivo inválido'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  }, [saveToHistory]);

  return {
    // Estado
    components,
    selectedComponent,
    isDragging,
    isPreviewMode,
    zoom,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    
    // Ações de componentes
    addComponent,
    removeComponent,
    updateComponent,
    moveComponent,
    resizeComponent,
    duplicateComponent,
    setSelectedComponent,
    
    // Histórico
    undo,
    redo,
    clearEditor,
    
    // Projeto
    saveProject,
    loadProject,
    getSavedProjects,
    exportProject,
    importProject,
    
    // Visualização
    togglePreviewMode,
    setZoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    
    // Refs
    editorRef
  };
}

// Hook para paleta de componentes
export function useComponentPalette() {
  const [components, setComponents] = useState([
    {
      type: 'text',
      name: 'Texto',
      icon: '📝',
      category: 'básico',
      defaultProps: {
        content: 'Digite seu texto aqui',
        fontSize: 16,
        color: '#000000',
        fontWeight: 'normal'
      }
    },
    {
      type: 'heading',
      name: 'Título',
      icon: '📋',
      category: 'básico',
      defaultProps: {
        content: 'Título',
        level: 1,
        color: '#000000'
      }
    },
    {
      type: 'button',
      name: 'Botão',
      icon: '🔘',
      category: 'interativo',
      defaultProps: {
        text: 'Clique aqui',
        variant: 'primary',
        size: 'medium'
      }
    },
    {
      type: 'image',
      name: 'Imagem',
      icon: '🖼️',
      category: 'mídia',
      defaultProps: {
        src: '',
        alt: 'Imagem',
        width: 200,
        height: 150
      }
    },
    {
      type: 'video',
      name: 'Vídeo',
      icon: '🎥',
      category: 'mídia',
      defaultProps: {
        src: '',
        width: 400,
        height: 300,
        controls: true
      }
    },
    {
      type: 'card',
      name: 'Card',
      icon: '🃏',
      category: 'layout',
      defaultProps: {
        title: 'Título do Card',
        content: 'Conteúdo do card',
        padding: 16
      }
    },
    {
      type: 'container',
      name: 'Container',
      icon: '📦',
      category: 'layout',
      defaultProps: {
        width: 100,
        height: 100,
        backgroundColor: '#f5f5f5',
        padding: 16
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra componentes
  const filteredComponents = components.filter(component => {
    const matchesCategory = filter === 'all' || component.category === filter;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categorias disponíveis
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'básico', name: 'Básico' },
    { id: 'interativo', name: 'Interativo' },
    { id: 'mídia', name: 'Mídia' },
    { id: 'layout', name: 'Layout' }
  ];

  return {
    components: filteredComponents,
    categories,
    filter,
    searchTerm,
    setFilter,
    setSearchTerm
  };
}
