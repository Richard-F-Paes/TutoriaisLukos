import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './ProfilePage.css';

const profileSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email('Email inválido')
});

const passwordSchema = z.object({
  currentPassword: z
    .string({ required_error: 'Senha atual é obrigatória' }),
  newPassword: z
    .string({ required_error: 'Nova senha é obrigatória' })
    .min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string({ required_error: 'Confirmação de senha é obrigatória' })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Senhas devem ser iguais',
  path: ['confirmPassword']
});

function ProfilePage() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const onProfileSubmit = async (data) => {
    const result = await updateProfile(data);
    
    if (result.success) {
      toast.success('Perfil atualizado com sucesso!');
    } else {
      toast.error(result.error || 'Erro ao atualizar perfil');
    }
  };

  const onPasswordSubmit = async (data) => {
    const { confirmPassword, ...passwordData } = data;
    
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      toast.success('Senha alterada com sucesso!');
      resetPassword();
    } else {
      toast.error(result.error || 'Erro ao alterar senha');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      super_admin: 'Super Administrador',
      admin: 'Administrador',
      editor: 'Editor',
      moderator: 'Moderador',
      viewer: 'Visualizador'
    };
    return roleNames[role] || role;
  };

  const getRoleBadgeClass = (role) => {
    const badgeClasses = {
      super_admin: 'badge-error',
      admin: 'badge-warning',
      editor: 'badge-primary',
      moderator: 'badge-success',
      viewer: 'badge-secondary'
    };
    return badgeClasses[role] || 'badge-secondary';
  };

  return (
    <div className="profile-page">
      <motion.div 
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais e configurações de conta</p>
        </motion.div>

        <div className="profile-content">
          <motion.div 
            className="profile-sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3>{user?.name}</h3>
              <span className={`badge ${getRoleBadgeClass(user?.role)}`}>
                {getRoleDisplayName(user?.role)}
              </span>
            </div>

            <nav className="profile-nav">
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informações Pessoais
              </button>
              <button
                className={`nav-item ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Segurança
              </button>
              <button
                className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferências
              </button>
            </nav>

            <div className="profile-actions">
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sair
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="profile-main"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeTab === 'profile' && (
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Informações Pessoais</h2>
                <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                  <div className="form-group">
                    <label htmlFor="name">Nome completo</label>
                    <input
                      id="name"
                      type="text"
                      {...registerProfile('name')}
                      className={`form-input ${profileErrors.name ? 'error' : ''}`}
                    />
                    {profileErrors.name && (
                      <span className="error-message">{profileErrors.name.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...registerProfile('email')}
                      className={`form-input ${profileErrors.email ? 'error' : ''}`}
                    />
                    {profileErrors.email && (
                      <span className="error-message">{profileErrors.email.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Status da conta</label>
                    <div className="account-status">
                      <span className={`status-badge ${user?.emailVerified ? 'verified' : 'unverified'}`}>
                        <i className={`fas ${user?.emailVerified ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {user?.emailVerified ? 'Email verificado' : 'Email não verificado'}
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i>
                    Salvar alterações
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'password' && (
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Alterar Senha</h2>
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                  <div className="form-group">
                    <label htmlFor="currentPassword">Senha atual</label>
                    <input
                      id="currentPassword"
                      type="password"
                      {...registerPassword('currentPassword')}
                      className={`form-input ${passwordErrors.currentPassword ? 'error' : ''}`}
                    />
                    {passwordErrors.currentPassword && (
                      <span className="error-message">{passwordErrors.currentPassword.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">Nova senha</label>
                    <input
                      id="newPassword"
                      type="password"
                      {...registerPassword('newPassword')}
                      className={`form-input ${passwordErrors.newPassword ? 'error' : ''}`}
                    />
                    {passwordErrors.newPassword && (
                      <span className="error-message">{passwordErrors.newPassword.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar nova senha</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...registerPassword('confirmPassword')}
                      className={`form-input ${passwordErrors.confirmPassword ? 'error' : ''}`}
                    />
                    {passwordErrors.confirmPassword && (
                      <span className="error-message">{passwordErrors.confirmPassword.message}</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-key"></i>
                    Alterar senha
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Preferências</h2>
                <div className="preferences-content">
                  <p>Configurações de preferências serão implementadas em breve.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
