// TutorialManager - Gerenciamento de tutoriais no admin
import React, { useState } from 'react';
import { useTutorials, useDeleteTutorial } from '../../../hooks/useTutorials.js';
import { useCategories } from '../../../hooks/useCategories.js';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import TutorialEditorPanel from './TutorialEditorPanel.jsx';

const TutorialManager = () => {
  const { openModal } = useTutorialModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState('list'); // 'list' | 'edit'
  const [editingId, setEditingId] = useState(null);

  const { data: tutorialsData, isLoading } = useTutorials({
    search: searchTerm || undefined,
    categorySlug: categoryFilter || undefined,
    isPublished: statusFilter === 'all' ? undefined : statusFilter === 'published',
  });

  const { data: categoriesData } = useCategories();
  const deleteMutation = useDeleteTutorial();

  const tutorials = tutorialsData?.data || [];
  const categories = categoriesData?.data || [];

  const openCreate = () => {
    setEditingId(null);
    setView('edit');
  };

  const openEdit = (id) => {
    setEditingId(id);
    setView('edit');
  };

  const openView = (slug) => {
    if (slug) openModal(slug);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Tem certeza que deseja excluir o tutorial "${title}"?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Tutorial excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir tutorial');
    }
  };

  if (view === 'edit') {
    return (
      <TutorialEditorPanel
        tutorialId={editingId}
        onCancel={() => setView('list')}
        onSaved={() => {
          setView('list');
          setEditingId(null);
        }}
      />
    );
  }

  return (
    <div className="tutorial-manager">
      <div className="manager-header">
        <h2>Gerenciar Tutoriais</h2>
        <button type="button" onClick={openCreate} className="btn-primary">
          <Plus size={18} />
          Novo Tutorial
        </button>
      </div>

      <div className="manager-filters">
        <div className="filter-group">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar tutoriais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(cat => (
              <option key={cat.Id} value={cat.Slug}>{cat.Name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Carregando tutoriais...</div>
      ) : (
        <div className="tutorials-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Visualizações</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Nenhum tutorial encontrado
                  </td>
                </tr>
              ) : (
                tutorials.map(tutorial => (
                  <tr key={tutorial.Id}>
                    <td>
                      <button
                        type="button"
                        className="btn-link"
                        onClick={() => openView(tutorial.Slug)}
                        title="Visualizar"
                      >
                        {tutorial.Title}
                      </button>
                    </td>
                    <td>{tutorial.CategoryName || '-'}</td>
                    <td>
                      <span className={`status-badge ${tutorial.IsPublished ? 'published' : 'draft'}`}>
                        {tutorial.IsPublished ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td>{tutorial.ViewCount || 0}</td>
                    <td>{new Date(tutorial.CreatedAt).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          onClick={() => openView(tutorial.Slug)}
                          className="btn-icon"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(tutorial.Id)}
                          className="btn-icon"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(tutorial.Id, tutorial.Title)}
                          className="btn-icon btn-danger"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TutorialManager;
