// UserManager - Gerenciamento de usuários (apenas admin)
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/userService.js';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManager = () => {
  const queryClient = useQueryClient();
  
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.list(),
  });

  // Backend retorna array direto, não precisa de .data
  const users = Array.isArray(usersData) ? usersData : [];

  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: 'suporte',
    password: '',
    isActive: true,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (userData) => userService.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário criado com sucesso!');
      setShowUserForm(false);
      setFormData({ name: '', username: '', role: 'suporte', password: '', isActive: true });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Erro ao criar usuário';
      toast.error(errorMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário atualizado com sucesso!');
      setShowUserForm(false);
      setEditingUser(null);
      setFormData({ name: '', username: '', role: 'suporte', password: '', isActive: true });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar usuário';
      toast.error(errorMessage);
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }) => userService.update(id, { isActive }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(variables.isActive ? 'Usuário ativado!' : 'Usuário desativado!');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar status do usuário';
      toast.error(errorMessage);
    },
  });

  const deletePermanentMutation = useMutation({
    mutationFn: (id) => userService.deletePermanent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário excluído permanentemente.');
      setConfirmDeleteUser(null);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Erro ao excluir usuário permanentemente';
      toast.error(errorMessage);
    },
  });

  const handleNew = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      username: '',
      role: 'suporte',
      password: '',
      isActive: true,
    });
    setShowUserForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      username: user.username || '',
      role: user.role || 'suporte',
      password: '', // Não pré-preencher senha
      isActive: user.isActive !== undefined ? user.isActive : true,
    });
    setShowUserForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.username) {
      toast.error('Nome e username são obrigatórios');
      return;
    }

    // Se está criando, senha é obrigatória
    if (!editingUser && !formData.password) {
      toast.error('Senha é obrigatória para novos usuários');
      return;
    }

    try {
      if (editingUser) {
        // Para editar, só enviar password se foi preenchido
        const updatePayload = {
          name: formData.name,
          username: formData.username,
          role: formData.role,
          isActive: formData.isActive,
        };
        if (formData.password) {
          updatePayload.password = formData.password;
        }
        await updateMutation.mutateAsync({
          id: editingUser.id,
          data: updatePayload,
        });
      } else {
        await createMutation.mutateAsync({
          name: formData.name,
          username: formData.username,
          role: formData.role,
          password: formData.password,
        });
      }
    } catch (error) {
      // Erro já tratado no onError da mutation
    }
  };

  const handleToggleActive = async (user) => {
    if (toggleActiveMutation.isPending) return;
    await toggleActiveMutation.mutateAsync({ id: user.id, isActive: !user.isActive });
  };

  const handleAskPermanentDelete = (user) => {
    setConfirmDeleteUser(user);
  };

  const handleConfirmPermanentDelete = async () => {
    if (!confirmDeleteUser) return;
    await deletePermanentMutation.mutateAsync(confirmDeleteUser.id);
  };

  return (
    <div className="user-manager">
      <div className="manager-header">
        <h2>Gerenciar Usuários</h2>
        <button 
          onClick={handleNew}
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
          }}
        >
          <Plus size={18} />
          Novo Usuário
        </button>
      </div>

      {/* Modal de Criar/Editar Usuário */}
      {showUserForm && (
        <div className="category-form-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}>
          <div className="form-container" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}>
            <div className="form-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: 600,
                color: '#1f2937',
                letterSpacing: '-0.025em',
              }}>
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
              </h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowUserForm(false);
                  setEditingUser(null);
                  setFormData({ name: '', username: '', role: 'suporte', password: '', isActive: true });
                }}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e5e7eb';
                  e.target.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.color = '#6b7280';
                }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Nome <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Digite o nome completo"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Username <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  placeholder="Digite o username"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Role <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="suporte">Suporte</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Senha {editingUser ? (
                    <span style={{ 
                      fontWeight: 400, 
                      fontSize: '0.8125rem',
                      color: '#6b7280',
                      fontStyle: 'italic',
                    }}>(deixe em branco para não alterar)</span>
                  ) : (
                    <span style={{ color: '#ef4444' }}>*</span>
                  )}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  placeholder={editingUser ? "Deixe em branco para manter a senha atual" : "Mínimo 6 caracteres"}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {editingUser && (
                <div className="form-group" style={{ 
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#374151',
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      style={{ 
                        cursor: 'pointer',
                        width: '18px',
                        height: '18px',
                        accentColor: '#3b82f6',
                      }}
                    />
                    <span>Usuário ativo</span>
                  </label>
                </div>
              )}
              <div className="form-actions" style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e5e7eb',
              }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => {
                    setShowUserForm(false);
                    setEditingUser(null);
                    setFormData({ name: '', username: '', role: 'suporte', password: '', isActive: true });
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: (createMutation.isPending || updateMutation.isPending) ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (createMutation.isPending || updateMutation.isPending) ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    boxShadow: (createMutation.isPending || updateMutation.isPending) ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = '#2563eb';
                      e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = '#3b82f6';
                      e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Salvando...' : (editingUser ? 'Atualizar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmação de exclusão permanente */}
      {confirmDeleteUser && (
        <div
          className="category-form-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => {
            if (!deletePermanentMutation.isPending) setConfirmDeleteUser(null);
          }}
        >
          <div
            className="form-container"
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.75rem',
              maxWidth: '460px',
              width: '92%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="form-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.02em',
                }}
              >
                Excluir usuário?
              </h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setConfirmDeleteUser(null)}
                disabled={deletePermanentMutation.isPending}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: deletePermanentMutation.isPending ? 'not-allowed' : 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ color: '#374151', fontSize: '0.95rem', lineHeight: 1.45 }}>
              Você está prestes a excluir permanentemente o usuário{' '}
              <strong style={{ color: '#111827' }}>{confirmDeleteUser.name}</strong> (
              <strong style={{ color: '#111827' }}>{confirmDeleteUser.username}</strong>).
              <div style={{ marginTop: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                Isso remove o registro do banco. Se houver vínculos (tutoriais, mídia, logs), o sistema vai bloquear e
                você pode usar “Desativado”.
              </div>
            </div>

            <div
              className="form-actions"
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setConfirmDeleteUser(null)}
                disabled={deletePermanentMutation.isPending}
                style={{
                  padding: '0.7rem 1.25rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: deletePermanentMutation.isPending ? 'not-allowed' : 'pointer',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                Não
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleConfirmPermanentDelete}
                disabled={deletePermanentMutation.isPending}
                style={{
                  padding: '0.7rem 1.25rem',
                  background: deletePermanentMutation.isPending ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: deletePermanentMutation.isPending ? 'not-allowed' : 'pointer',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                }}
              >
                {deletePermanentMutation.isPending ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Carregando usuários...</div>
      ) : users.length === 0 ? (
        <div className="empty-state">Nenhum usuário encontrado</div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      type="button"
                      className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}
                      title={user.isActive ? 'Clique para desativar' : 'Clique para ativar'}
                      onClick={() => handleToggleActive(user)}
                      disabled={toggleActiveMutation.isPending}
                      style={{
                        border: 'none',
                        cursor: toggleActiveMutation.isPending ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {user.isActive ? 'Ativo' : 'Desativado'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon" 
                        title="Editar"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        title="Excluir permanentemente"
                        onClick={() => handleAskPermanentDelete(user)}
                        disabled={deletePermanentMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManager;
