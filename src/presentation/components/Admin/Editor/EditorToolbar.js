import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '../../../../contexts/EditorContext';
import { useAuth } from '../../../../contexts/AuthContext';
import './EditorToolbar.css';

const EditorToolbar = () => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    clearCanvas,
    exportToHTML,
    saveProject,
    isPreviewMode,
    togglePreviewMode,
    isDirty
  } = useEditor();
  
  const { user } = useAuth();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleSave = () => {
    if (projectName.trim()) {
      saveProject(projectName.trim());
      setShowSaveModal(false);
      setProjectName('');
    }
  };

  const handleExport = () => {
    exportToHTML();
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar o canvas? Esta ação não pode ser desfeita.')) {
      clearCanvas();
    }
  };

  return (
    <motion.div 
      className="editor-toolbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="toolbar-section">
        <motion.div 
          className="toolbar-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.button
            className={`toolbar-btn ${canUndo ? '' : 'disabled'}`}
            onClick={undo}
            disabled={!canUndo}
            title="Desfazer (Ctrl+Z)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </motion.button>
          
          <motion.button
            className={`toolbar-btn ${canRedo ? '' : 'disabled'}`}
            onClick={redo}
            disabled={!canRedo}
            title="Refazer (Ctrl+Y)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="toolbar-divider"></div>

        <motion.div 
          className="toolbar-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.button
            className={`toolbar-btn ${isPreviewMode ? 'active' : ''}`}
            onClick={togglePreviewMode}
            title={isPreviewMode ? 'Sair do modo preview' : 'Modo preview'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isPreviewMode ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </>
              )}
            </svg>
            <span>{isPreviewMode ? 'Editar' : 'Preview'}</span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="toolbar-section"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.div 
          className="toolbar-group"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.button
            className="toolbar-btn"
            onClick={() => setShowSaveModal(true)}
            title="Salvar projeto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Salvar</span>
            {isDirty && <span className="dirty-indicator">•</span>}
          </motion.button>
          
          <motion.button
            className="toolbar-btn"
            onClick={handleExport}
            title="Exportar como HTML"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Exportar</span>
          </motion.button>
          
          <motion.button
            className="toolbar-btn danger"
            onClick={handleClear}
            title="Limpar canvas"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Limpar</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="toolbar-section"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <motion.div 
          className="user-info"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
        </motion.div>
      </motion.div>

      {/* Modal de Salvar */}
      {showSaveModal && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSaveModal(false)}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Salvar Projeto</h3>
              <button
                className="modal-close"
                onClick={() => setShowSaveModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="projectName">Nome do projeto</label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="form-input"
                  placeholder="Digite o nome do projeto"
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <motion.button
                className="btn btn-secondary"
                onClick={() => setShowSaveModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!projectName.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Salvar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EditorToolbar;
