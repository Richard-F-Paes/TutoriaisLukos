import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../infrastructure/auth/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se há token válido ao carregar a aplicação
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verificar sessionStorage primeiro, depois localStorage (para compatibilidade)
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
          const userData = await authService.verifyToken(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        // Limpar tokens inválidos
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login - Aceita username ou email
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(username, password);
      const { user: userData, token } = response;
      
      // Salvar token em sessionStorage (mais seguro que localStorage)
      sessionStorage.setItem('token', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Registro - Removido (não necessário para equipe pequena)
  // Apenas login é necessário
  const register = async (userData) => {
    setError('Registro não disponível. Entre em contato com o administrador.');
    return { success: false, error: 'Registro não disponível' };
  };

  // Logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  // Atualizar perfil - Simplificado (apenas atualiza estado local)
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Atualizar apenas no estado local (sem backend ainda)
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Alterar senha - Não implementado (gerenciado por admin)
  const changePassword = async (currentPassword, newPassword) => {
    setError('Alteração de senha não disponível. Entre em contato com o administrador.');
    return { success: false, error: 'Alteração de senha não disponível' };
  };

  // Recuperar senha - Não implementado (equipe pequena)
  const resetPassword = async (email) => {
    setError('Recuperação de senha não disponível. Entre em contato com o administrador.');
    return { success: false, error: 'Recuperação de senha não disponível' };
  };

  // Verificar se usuário tem permissão
  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Super Admin tem todas as permissões
    if (user.role === 'super_admin') return true;
    
    // Verificar permissões específicas do role
    const rolePermissions = {
      admin: ['manage_content', 'manage_users', 'view_analytics'],
      editor: ['manage_content', 'view_analytics'],
      moderator: ['moderate_content', 'view_analytics'],
      viewer: ['view_content']
    };
    
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  // Verificar se usuário tem role específico
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    hasPermission,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
