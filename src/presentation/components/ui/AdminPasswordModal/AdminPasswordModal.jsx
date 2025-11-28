import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { X, Lock, AlertCircle } from 'lucide-react';
import './AdminPasswordModal.css';

const AdminPasswordModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const result = await login(username.trim(), password);
      
      if (result.success) {
        setPassword('');
        setUsername('');
        onClose();
      } else {
        setError(result.error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setUsername('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay" onClick={handleClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title-wrapper">
            <Lock className="admin-modal-icon" />
            <h3 className="admin-modal-title">Acesso Administrativo</h3>
          </div>
          <button
            className="admin-modal-close"
            onClick={handleClose}
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="admin-modal-form-group">
            <label htmlFor="admin-username" className="admin-modal-label">
              Usuário
            </label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-modal-input"
              placeholder="Digite seu usuário"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="admin-modal-form-group">
            <label htmlFor="admin-password" className="admin-modal-label">
              Senha
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-modal-input"
              placeholder="Digite sua senha"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="admin-modal-error">
              <AlertCircle className="admin-modal-error-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={handleClose}
              className="admin-modal-button admin-modal-button-cancel"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="admin-modal-button admin-modal-button-submit"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordModal;

