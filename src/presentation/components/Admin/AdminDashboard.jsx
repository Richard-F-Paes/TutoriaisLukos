// AdminDashboard - Dashboard com estatísticas administrativas
import React from 'react';
import { useAdminStats } from '../../../hooks/useAdminStats.js';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../../services/userService.js';
import { 
  BookOpen, 
  Users, 
  FolderOpen, 
  Eye, 
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { stats, isLoading: statsLoading } = useAdminStats();
  
  // Buscar usuários para estatísticas
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.list(),
    enabled: true,
  });

  const users = usersData?.data || [];
  const adminUsers = users.filter(u => u.Role === 'admin').length;
  const suporteUsers = users.filter(u => u.Role === 'suporte').length;
  const activeUsers = users.filter(u => u.IsActive).length;

  const isLoading = statsLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-loading">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total de Tutoriais',
      value: stats?.totalTutorials || 0,
      icon: BookOpen,
      color: 'blue',
      subtitle: `${stats?.publishedTutorials || 0} publicados`
    },
    {
      title: 'Total de Usuários',
      value: users.length,
      icon: Users,
      color: 'green',
      subtitle: `${adminUsers} admin, ${suporteUsers} suporte`
    },
    {
      title: 'Categorias',
      value: stats?.totalCategories || 0,
      icon: FolderOpen,
      color: 'purple',
      subtitle: 'Categorias ativas'
    },
    {
      title: 'Visualizações',
      value: stats?.totalViews || 0,
      icon: Eye,
      color: 'orange',
      subtitle: 'Total de visualizações'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Visão Geral</h2>
        <p>Estatísticas e informações do sistema</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="dashboard-stats-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`stat-card stat-card-${card.color}`}>
              <div className="stat-card-icon">
                <Icon size={24} />
              </div>
              <div className="stat-card-content">
                <h3 className="stat-card-title">{card.title}</h3>
                <p className="stat-card-value">{card.value.toLocaleString('pt-BR')}</p>
                <p className="stat-card-subtitle">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status dos Tutoriais */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Status dos Tutoriais</h3>
        <div className="dashboard-status-grid">
          <div className="status-card status-published">
            <CheckCircle size={20} />
            <div>
              <p className="status-value">{stats?.publishedTutorials || 0}</p>
              <p className="status-label">Publicados</p>
            </div>
          </div>
          <div className="status-card status-unpublished">
            <XCircle size={20} />
            <div>
              <p className="status-value">{stats?.unpublishedTutorials || 0}</p>
              <p className="status-label">Não Publicados</p>
            </div>
          </div>
          <div className="status-card status-users">
            <Users size={20} />
            <div>
              <p className="status-value">{activeUsers}</p>
              <p className="status-label">Usuários Ativos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutoriais Mais Visualizados */}
      {stats?.mostViewed && stats.mostViewed.length > 0 && (
        <div className="dashboard-section">
          <h3 className="dashboard-section-title">
            <TrendingUp size={20} />
            Tutoriais Mais Visualizados
          </h3>
          <div className="dashboard-list">
            {stats.mostViewed.map((tutorial, index) => (
              <div key={tutorial.Id || index} className="dashboard-list-item">
                <div className="list-item-number">{index + 1}</div>
                <div className="list-item-content">
                  <h4>{tutorial.Title}</h4>
                  <p className="list-item-meta">
                    {tutorial.ViewCount || 0} visualizações • {tutorial.Category?.Name || 'Sem categoria'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tutoriais Recentes */}
      {stats?.recentTutorials && stats.recentTutorials.length > 0 && (
        <div className="dashboard-section">
          <h3 className="dashboard-section-title">
            <Clock size={20} />
            Tutoriais Recentes
          </h3>
          <div className="dashboard-list">
            {stats.recentTutorials.map((tutorial, index) => (
              <div key={tutorial.Id || index} className="dashboard-list-item">
                <div className="list-item-icon">
                  <FileText size={20} />
                </div>
                <div className="list-item-content">
                  <h4>{tutorial.Title}</h4>
                  <p className="list-item-meta">
                    Criado em {new Date(tutorial.CreatedAt).toLocaleDateString('pt-BR')} • 
                    {tutorial.IsPublished ? (
                      <span className="status-badge published">Publicado</span>
                    ) : (
                      <span className="status-badge unpublished">Rascunho</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

