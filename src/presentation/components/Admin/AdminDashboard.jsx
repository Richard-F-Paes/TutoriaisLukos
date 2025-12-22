// AdminDashboard - Dashboard com estatísticas administrativas
import React from 'react';
import { useAdminStats } from '../../../hooks/useAdminStats.js';
import { 
  BookOpen, 
  FolderOpen, 
  Eye, 
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  GraduationCap,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { formatDate } from '../../../shared/utils/index.js';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { stats, isLoading: statsLoading } = useAdminStats();
  
  const isLoading = statsLoading;

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
      title: 'Total de Treinamentos',
      value: stats?.totalTrainings || 0,
      icon: GraduationCap,
      color: 'purple',
      subtitle: `${stats?.publishedTrainings || 0} publicados`
    },
    {
      title: 'Total de Agendamentos',
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: 'teal',
      subtitle: `${stats?.pendingAppointments || 0} pendentes`
    },
    {
      title: 'Visualizações',
      value: stats?.totalViewsLast30Days || 0,
      icon: Eye,
      color: 'orange',
      subtitle: 'Últimos 30 dias'
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
        </div>
      </div>

      {/* Status dos Treinamentos */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Status dos Treinamentos</h3>
        <div className="dashboard-status-grid">
          <div className="status-card status-published">
            <CheckCircle size={20} />
            <div>
              <p className="status-value">{stats?.publishedTrainings || 0}</p>
              <p className="status-label">Publicados</p>
            </div>
          </div>
          <div className="status-card status-unpublished">
            <XCircle size={20} />
            <div>
              <p className="status-value">{stats?.unpublishedTrainings || 0}</p>
              <p className="status-label">Não Publicados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status dos Agendamentos */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Status dos Agendamentos</h3>
        <div className="dashboard-status-grid">
          <div className="status-card" style={{ backgroundColor: '#d1fae5', borderColor: '#10b981' }}>
            <CheckCircle size={20} style={{ color: '#059669' }} />
            <div>
              <p className="status-value">{stats?.completedAppointments || 0}</p>
              <p className="status-label">Concluídos</p>
            </div>
          </div>
          <div className="status-card" style={{ backgroundColor: '#dbeafe', borderColor: '#3b82f6' }}>
            <CheckCircle size={20} style={{ color: '#1e40af' }} />
            <div>
              <p className="status-value">{stats?.confirmedAppointments || 0}</p>
              <p className="status-label">Confirmados</p>
            </div>
          </div>
          <div className="status-card" style={{ backgroundColor: '#fef3c7', borderColor: '#fbbf24' }}>
            <AlertCircle size={20} style={{ color: '#f59e0b' }} />
            <div>
              <p className="status-value">{stats?.pendingAppointments || 0}</p>
              <p className="status-label">Pendentes</p>
            </div>
          </div>
          <div className="status-card" style={{ backgroundColor: '#fee2e2', borderColor: '#ef4444' }}>
            <XCircle size={20} style={{ color: '#991b1b' }} />
            <div>
              <p className="status-value">{stats?.cancelledAppointments || 0}</p>
              <p className="status-label">Cancelados</p>
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
            {stats.mostViewed.map((tutorial, index) => {
              const title = tutorial.title || tutorial.Title || 'Sem título';
              const viewCount = tutorial.viewCount || tutorial.ViewCount || 0;
              const categoryName = tutorial.category?.name || tutorial.Category?.Name || 'Sem categoria';
              const subcategoryName = tutorial.category?.parent?.name || tutorial.Category?.Parent?.Name;
              const updatedAt = tutorial.updatedAt || tutorial.UpdatedAt;
              const updatedDate = updatedAt ? formatDate(updatedAt) : 'Data não disponível';

              return (
                <div key={tutorial.id || tutorial.Id || index} className="dashboard-list-item">
                  <div className="list-item-number">{index + 1}</div>
                  <div className="list-item-content">
                    <h4>{title}</h4>
                    <p className="list-item-meta">
                      {viewCount.toLocaleString('pt-BR')} visualizações
                      {subcategoryName && ` • ${subcategoryName}`}
                      {categoryName && !subcategoryName && ` • ${categoryName}`}
                      {subcategoryName && categoryName && ` (${categoryName})`}
                      {` • Atualizado em ${updatedDate}`}
                    </p>
                  </div>
                </div>
              );
            })}
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
            {stats.recentTutorials.map((tutorial, index) => {
              const title = tutorial.title || tutorial.Title || 'Sem título';
              const updatedAt = tutorial.updatedAt || tutorial.UpdatedAt;
              const createdAt = tutorial.createdAt || tutorial.CreatedAt;
              const isPublished = tutorial.isPublished !== undefined ? tutorial.isPublished : tutorial.IsPublished;
              const categoryName = tutorial.category?.name || tutorial.Category?.Name || 'Sem categoria';
              const subcategoryName = tutorial.category?.parent?.name || tutorial.Category?.Parent?.Name;
              
              const updatedDate = updatedAt ? formatDate(updatedAt) : 'Data não disponível';
              const createdDate = createdAt ? formatDate(createdAt) : 'Data não disponível';

              // Montar string de categoria/subcategoria
              let categoryInfo = '';
              if (subcategoryName && categoryName) {
                categoryInfo = ` • ${subcategoryName} (${categoryName})`;
              } else if (subcategoryName) {
                categoryInfo = ` • ${subcategoryName}`;
              } else if (categoryName && categoryName !== 'Sem categoria') {
                categoryInfo = ` • ${categoryName}`;
              }

              return (
                <div key={tutorial.id || tutorial.Id || index} className="dashboard-list-item">
                  <div className="list-item-icon">
                    <FileText size={20} />
                  </div>
                  <div className="list-item-content">
                    <h4>{title}</h4>
                    <p className="list-item-meta">
                      Atualizado em {updatedDate}
                      {createdDate !== updatedDate && ` • Criado em ${createdDate}`}
                      {categoryInfo}
                      {` • `}
                      {isPublished ? (
                        <span className="status-badge published">Publicado</span>
                      ) : (
                        <span className="status-badge unpublished">Rascunho</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

