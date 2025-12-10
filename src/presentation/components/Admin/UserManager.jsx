// UserManager - Gerenciamento de usuários (apenas admin)
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../../services/userService.js';
import { Plus, Edit, Trash2, Key } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManager = () => {
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.list(),
  });

  const users = usersData?.data || [];

  return (
    <div className="user-manager">
      <div className="manager-header">
        <h2>Gerenciar Usuários</h2>
        <button className="btn-primary">
          <Plus size={18} />
          Novo Usuário
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Carregando usuários...</div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.Id}>
                  <td>{user.Name}</td>
                  <td>{user.Username}</td>
                  <td>{user.Email}</td>
                  <td>{user.Role}</td>
                  <td>
                    <span className={`status-badge ${user.IsActive ? 'active' : 'inactive'}`}>
                      {user.IsActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon" title="Alterar senha">
                        <Key size={16} />
                      </button>
                      <button className="btn-icon btn-danger" title="Excluir">
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
