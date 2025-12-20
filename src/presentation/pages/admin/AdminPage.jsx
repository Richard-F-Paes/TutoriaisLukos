// AdminPage - Página principal do admin
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext.js';
import AdminDashboard from '../../components/Admin/AdminDashboard.jsx';
import TutorialManager from '../../components/Admin/TutorialManager.jsx';
import CategoryManager from '../../components/Admin/CategoryManager.jsx';
import UserManager from '../../components/Admin/UserManager.jsx';
import MediaLibrary from '../../components/Admin/MediaLibrary.jsx';
import AuditLogs from '../../components/Admin/AuditLogs.jsx';
import HeaderMenuManager from '../../components/Admin/HeaderMenuManager/HeaderMenuManager.jsx';
import './AdminPage.css';

const AdminPage = () => {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return (
      <div className="admin-page">
        <div className="admin-error">
          <h2>Acesso Negado</h2>
          <p>Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', permission: null }, // Sempre visível para usuários autenticados
    { id: 'tutorials', label: 'Tutoriais', permission: 'create_tutorial' },
    { id: 'categories', label: 'Categorias', permission: 'manage_categories' },
    { id: 'header-menus', label: 'Menus do Header', permission: 'manage_categories' },
    { id: 'users', label: 'Usuários', permission: 'manage_users' },
    { id: 'media', label: 'Mídia', permission: 'upload_media' },
    { id: 'logs', label: 'Logs', permission: 'view_audit_logs' },
  ].filter(tab => !tab.permission || hasPermission(tab.permission));

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Bem-vindo, {user.name}!</p>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'tutorials' && <TutorialManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'header-menus' && <HeaderMenuManager />}
        {activeTab === 'users' && <UserManager />}
        {activeTab === 'media' && <MediaLibrary />}
        {activeTab === 'logs' && <AuditLogs />}
      </div>
    </div>
  );
};

export default AdminPage;
