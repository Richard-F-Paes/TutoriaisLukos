import React from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '../../../contexts/EditorContext';
import './ComponentPalette.css';

const ComponentPalette = () => {
  const { addElement } = useEditor();

  const componentTypes = [
    {
      id: 'text',
      name: 'Texto',
      icon: 'fas fa-font',
      description: 'Adicionar texto simples',
      component: {
        type: 'p',
        props: { contentEditable: true },
        styles: {
          padding: '10px',
          margin: '10px 0',
          fontSize: '16px',
          color: '#333'
        },
        content: 'Clique para editar o texto'
      }
    },
    {
      id: 'heading',
      name: 'Título',
      icon: 'fas fa-heading',
      description: 'Adicionar título',
      component: {
        type: 'h2',
        props: { contentEditable: true },
        styles: {
          padding: '10px',
          margin: '20px 0 10px 0',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333'
        },
        content: 'Título do Seção'
      }
    },
    {
      id: 'button',
      name: 'Botão',
      icon: 'fas fa-square',
      description: 'Adicionar botão',
      component: {
        type: 'button',
        props: { type: 'button' },
        styles: {
          padding: '12px 24px',
          margin: '10px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        },
        content: 'Clique aqui'
      }
    },
    {
      id: 'image',
      name: 'Imagem',
      icon: 'fas fa-image',
      description: 'Adicionar imagem',
      component: {
        type: 'img',
        props: { 
          src: 'https://via.placeholder.com/300x200?text=Imagem',
          alt: 'Imagem'
        },
        styles: {
          maxWidth: '100%',
          height: 'auto',
          margin: '10px 0',
          borderRadius: '8px'
        }
      }
    },
    {
      id: 'container',
      name: 'Container',
      icon: 'fas fa-square-full',
      description: 'Container para agrupar elementos',
      component: {
        type: 'div',
        props: {},
        styles: {
          padding: '20px',
          margin: '10px 0',
          border: '2px dashed #e2e8f0',
          borderRadius: '8px',
          minHeight: '100px',
          backgroundColor: '#f8f9fa'
        },
        children: []
      }
    },
    {
      id: 'card',
      name: 'Card',
      icon: 'fas fa-id-card',
      description: 'Card com conteúdo',
      component: {
        type: 'div',
        props: {},
        styles: {
          padding: '20px',
          margin: '10px 0',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        },
        children: [
          {
            type: 'h3',
            props: { contentEditable: true },
            styles: {
              margin: '0 0 10px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333'
            },
            content: 'Título do Card'
          },
          {
            type: 'p',
            props: { contentEditable: true },
            styles: {
              margin: '0',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.5'
            },
            content: 'Descrição do card. Clique para editar.'
          }
        ]
      }
    },
    {
      id: 'list',
      name: 'Lista',
      icon: 'fas fa-list',
      description: 'Lista de itens',
      component: {
        type: 'ul',
        props: {},
        styles: {
          padding: '20px',
          margin: '10px 0',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        },
        children: [
          {
            type: 'li',
            props: { contentEditable: true },
            styles: {
              margin: '5px 0',
              padding: '5px 0',
              fontSize: '16px',
              color: '#333'
            },
            content: 'Item da lista 1'
          },
          {
            type: 'li',
            props: { contentEditable: true },
            styles: {
              margin: '5px 0',
              padding: '5px 0',
              fontSize: '16px',
              color: '#333'
            },
            content: 'Item da lista 2'
          }
        ]
      }
    },
    {
      id: 'video',
      name: 'Vídeo',
      icon: 'fas fa-video',
      description: 'Player de vídeo',
      component: {
        type: 'video',
        props: {
          controls: true,
          src: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        styles: {
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          margin: '10px 0',
          borderRadius: '8px'
        }
      }
    }
  ];

  const handleDragStart = (e, componentType) => {
    e.dataTransfer.setData('application/json', JSON.stringify(componentType));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleClick = (componentType) => {
    addElement(componentType.component);
  };

  return (
    <motion.div 
      className="component-palette"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="palette-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3>Componentes</h3>
        <p>Arraste ou clique para adicionar</p>
      </motion.div>
      
      <motion.div 
        className="palette-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {componentTypes.map((component, index) => (
          <motion.div
            key={component.id}
            className="palette-item"
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            onClick={() => handleClick(component)}
            title={component.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="palette-item-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {component.id === 'text' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                )}
                {component.id === 'heading' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                )}
                {component.id === 'button' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                )}
                {component.id === 'image' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                )}
                {component.id === 'container' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                )}
                {component.id === 'form' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                )}
              </svg>
            </div>
            <div className="palette-item-content">
              <h4>{component.name}</h4>
              <p>{component.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ComponentPalette;
