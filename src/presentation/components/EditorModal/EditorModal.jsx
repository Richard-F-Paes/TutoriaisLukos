import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useEditorModal } from '../../../contexts/EditorModalContext';
import AdminDashboard from '../Admin/AdminDashboard.jsx';
import TutorialManager from '../Admin/TutorialManager.jsx';
import CategoryManager from '../Admin/CategoryManager.jsx';
import HeaderMenuManager from '../Admin/HeaderMenuManager/HeaderMenuManager.jsx';
import UserManager from '../Admin/UserManager.jsx';
import MediaLibrary from '../Admin/MediaLibrary.jsx';
import AuditLogs from '../Admin/AuditLogs.jsx';
import './EditorModal.css';

function TabButton({ isActive, onClick, children, disabled, tabId }) {
  return (
    <motion.button
      type="button"
      className={`editor-modal-tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { x: 2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-selected={isActive}
      role="tab"
    >
      {children}
      {isActive && (
        <motion.div
          className="editor-modal-tab-indicator"
          layoutId="activeTabIndicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

export default function EditorModal() {
  const { isAuthenticated, user, hasPermission } = useAuth();
  const { isOpen, initialTab, closeEditorModal } = useEditorModal();
  const [activeTab, setActiveTab] = useState(initialTab || 'tutorials');
  const [mode, setMode] = useState('edit'); // 'view' | 'edit'
  const containerRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || 'tutorials');
    }
  }, [isOpen, initialTab]);

  const tabs = useMemo(() => {
    const canSeeTutorials = hasPermission('create_tutorial') || hasPermission('edit_tutorial');
    const canManageCategories = hasPermission('manage_categories');
    const canManageUsers = hasPermission('manage_users');
    const canUploadMedia = hasPermission('upload_media');
    const canViewLogs = hasPermission('view_audit_logs');

    return [
      { id: 'dashboard', label: 'Dashboard', visible: true },
      { id: 'tutorials', label: 'Tutoriais', visible: canSeeTutorials },
      { id: 'categories', label: 'Categorias', visible: canManageCategories },
      { id: 'header-menus', label: 'Header', visible: canManageCategories },
      { id: 'users', label: 'Usuários', visible: canManageUsers },
      { id: 'media', label: 'Mídia', visible: canUploadMedia },
      { id: 'logs', label: 'Logs', visible: canViewLogs },
    ].filter((t) => t.visible);
  }, [hasPermission]);

  // Focus trap e gerenciamento de foco aprimorado
  useEffect(() => {
    if (!isOpen) return;
    
    // Salva elemento ativo anterior
    previousActiveElementRef.current = document.activeElement;
    
    // Aguarda render do portal e foca no container
    const t = window.setTimeout(() => {
      containerRef.current?.focus();
    }, 0);
    
    return () => {
      window.clearTimeout(t);
      // Restaura foco ao elemento anterior ao fechar
      if (previousActiveElementRef.current && previousActiveElementRef.current.focus) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // Fechar modal com ESC e navegação por teclado aprimorada
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeEditorModal();
      }
      // Navegação por teclado nas tabs (Ctrl/Cmd + número)
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9' && isOpen) {
        const tabIndex = parseInt(e.key) - 1;
        if (tabs[tabIndex]) {
          e.preventDefault();
          setActiveTab(tabs[tabIndex].id);
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closeEditorModal, tabs]);

  // Segurança extra: se abriu sem estar logado, bloqueia.
  const unauthContent = !isAuthenticated && (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="editor-modal-overlay"
          onClick={closeEditorModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="editor-modal-container"
            role="dialog"
            aria-modal="true"
            aria-label="Acesso restrito"
            tabIndex={-1}
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.button
              className="editor-modal-close"
              onClick={closeEditorModal}
              aria-label="Fechar modal"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <X size={22} />
            </motion.button>
            <div className="editor-modal-unauth">
              <h2>Você precisa estar logado</h2>
              <p>O modo de edição é exclusivo para a equipe.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (unauthContent) {
    return ReactDOM.createPortal(unauthContent, document.body);
  }

  if (!isOpen) return null;

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'tutorials':
        return <TutorialManager editorMode={mode} />;
      case 'categories':
        return <CategoryManager editorMode={mode} />;
      case 'header-menus':
        return <HeaderMenuManager editorMode={mode} />;
      case 'users':
        return <UserManager editorMode={mode} />;
      case 'media':
        return <MediaLibrary editorMode={mode} />;
      case 'logs':
        return <AuditLogs editorMode={mode} />;
      default:
        return <div>Selecione uma aba.</div>;
    }
  };

  // Variantes de animação para reduzir movimento (acessibilidade)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.15 }
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.95, 
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: prefersReducedMotion ? 400 : 300, 
        damping: prefersReducedMotion ? 40 : 30,
        duration: prefersReducedMotion ? 0.2 : undefined
      }
    },
    exit: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.95, 
      y: prefersReducedMotion ? 0 : 20,
      transition: { 
        duration: prefersReducedMotion ? 0.15 : 0.2 
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.15 : 0.25,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      x: prefersReducedMotion ? 0 : -10,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.2 
      }
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="editor-modal-overlay"
          onClick={closeEditorModal}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="editor-modal-container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-modal-title"
            tabIndex={-1}
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="editor-modal-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <div className="editor-modal-title">
                <div className="editor-modal-title-top" id="editor-modal-title">
                  Edição do Site
                </div>
                <div className="editor-modal-title-sub">
                  {user?.name} • {user?.role}
                </div>
              </div>

              <div className="editor-modal-header-actions">
                <motion.div 
                  className="editor-modal-mode"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                >
                  <span className="editor-modal-mode-label">Modo</span>
                  <motion.button
                    type="button"
                    className={`editor-modal-mode-btn ${mode === 'view' ? 'active' : ''}`}
                    onClick={() => setMode('view')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    Visualização
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`editor-modal-mode-btn ${mode === 'edit' ? 'active' : ''}`}
                    onClick={() => setMode('edit')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    Edição
                  </motion.button>
                </motion.div>

                <motion.button
                  className="editor-modal-close"
                  onClick={closeEditorModal}
                  aria-label="Fechar modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <X size={22} />
                </motion.button>
              </div>
            </motion.div>

            <div className="editor-modal-body">
              <motion.aside 
                className="editor-modal-sidebar" 
                role="tablist" 
                aria-label="Abas do editor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {tabs.map((tab) => (
                  <TabButton 
                    key={tab.id} 
                    tabId={tab.id}
                    isActive={activeTab === tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </TabButton>
                ))}
              </motion.aside>

              <AnimatePresence mode="wait">
                <motion.main
                  key={activeTab}
                  className="editor-modal-content"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {renderTab()}
                </motion.main>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}


