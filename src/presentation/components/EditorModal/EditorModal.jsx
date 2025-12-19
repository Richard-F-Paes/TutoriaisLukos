import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useEditorModal } from '../../../contexts/EditorModalContext';
import AdminDashboard from '../Admin/AdminDashboard.jsx';
import TutorialManager from '../Admin/TutorialManager.jsx';
import CategoryManager from '../Admin/CategoryManager.jsx';
import HeaderMenuManager from '../Admin/HeaderMenuManager.jsx';
import UserManager from '../Admin/UserManager.jsx';
import MediaLibrary from '../Admin/MediaLibrary.jsx';
import AuditLogs from '../Admin/AuditLogs.jsx';
import './EditorModal.css';

function TabButton({ isActive, onClick, children, disabled }) {
  return (
    <button
      type="button"
      className={`editor-modal-tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function EditorModal() {
  const { isAuthenticated, user, hasPermission } = useAuth();
  const { isOpen, initialTab, closeEditorModal } = useEditorModal();
  const [activeTab, setActiveTab] = useState(initialTab || 'tutorials');
  const [mode, setMode] = useState('edit'); // 'view' | 'edit'
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || 'tutorials');
    }
  }, [isOpen, initialTab]);

  // Foco inicial no modal quando abrir (melhora teclado/acessibilidade)
  useEffect(() => {
    if (!isOpen) return;
    // aguarda render do portal
    const t = window.setTimeout(() => containerRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) closeEditorModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeEditorModal]);

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

  if (!isOpen) return null;

  // Segurança extra: se abriu sem estar logado, bloqueia.
  if (!isAuthenticated) {
    return ReactDOM.createPortal(
      <div className="editor-modal-overlay" onClick={closeEditorModal}>
        <div
          className="editor-modal-container"
          role="dialog"
          aria-modal="true"
          aria-label="Acesso restrito"
          tabIndex={-1}
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="editor-modal-close" onClick={closeEditorModal} aria-label="Fechar modal">
            <X size={22} />
          </button>
          <div className="editor-modal-unauth">
            <h2>Você precisa estar logado</h2>
            <p>O modo de edição é exclusivo para a equipe.</p>
          </div>
        </div>
      </div>,
      document.body
    );
  }

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

  return ReactDOM.createPortal(
    <div className="editor-modal-overlay" onClick={closeEditorModal}>
      <div
        className="editor-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-modal-title"
        tabIndex={-1}
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="editor-modal-header">
          <div className="editor-modal-title">
            <div className="editor-modal-title-top" id="editor-modal-title">
              Edição do Site
            </div>
            <div className="editor-modal-title-sub">
              {user?.name} • {user?.role}
            </div>
          </div>

          <div className="editor-modal-header-actions">
            <div className="editor-modal-mode">
              <span className="editor-modal-mode-label">Modo</span>
              <button
                type="button"
                className={`editor-modal-mode-btn ${mode === 'view' ? 'active' : ''}`}
                onClick={() => setMode('view')}
              >
                Visualização
              </button>
              <button
                type="button"
                className={`editor-modal-mode-btn ${mode === 'edit' ? 'active' : ''}`}
                onClick={() => setMode('edit')}
              >
                Edição
              </button>
            </div>

            <button className="editor-modal-close" onClick={closeEditorModal} aria-label="Fechar modal">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="editor-modal-tabs" role="tablist" aria-label="Abas do editor">
          {tabs.map((tab) => (
            <TabButton key={tab.id} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </TabButton>
          ))}
        </div>

        <div className="editor-modal-content">{renderTab()}</div>
      </div>
    </div>,
    document.body
  );
}


