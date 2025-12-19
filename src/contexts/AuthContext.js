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

  // #region agent log
  const __agentLog = (payload) => {
    try {
      fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
    } catch (_) {}
  };
  // #endregion

  // Verificar se há token válido ao carregar a aplicação
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verificar accessToken em sessionStorage (nova API) ou token (compatibilidade)
        const accessToken = sessionStorage.getItem('accessToken');
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
        if (accessToken || token) {
          const userData = await authService.verifyToken();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        // Tentar refresh token
        try {
          await authService.refreshToken();
          const userData = await authService.verifyToken();
          setUser(userData);
        } catch (refreshError) {
          // Limpar tokens inválidos
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('token');
          localStorage.removeItem('token');
        }
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
      // #region agent log
      __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2',location:'src/contexts/AuthContext.js:login:entry',message:'AuthContext.login called',data:{hasUsername:!!username,usernameLength:(username||'').length,hasPassword:!!password,passwordLength:password?.length||0,existingUser:!!user},timestamp:Date.now()});
      // #endregion
      
      const response = await authService.login(username, password);
      const { user: userData, accessToken, refreshToken } = response;
      
      // Salvar tokens em sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      setUser(userData);
      // #region agent log
      __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H3',location:'src/contexts/AuthContext.js:login:success',message:'AuthContext.login success - user set + tokens stored',data:{hasUser:!!userData,userKeys:userData?Object.keys(userData):[],hasAccessToken:!!accessToken,hasRefreshToken:!!refreshToken,sessionHasAccessToken:!!sessionStorage.getItem('accessToken'),sessionHasRefreshToken:!!sessionStorage.getItem('refreshToken')},timestamp:Date.now()});
      // #endregion
      
      return { success: true, user: userData };
    } catch (error) {
      setError(error.message);
      // #region agent log
      __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2',location:'src/contexts/AuthContext.js:login:error',message:'AuthContext.login failed',data:{errorMessage:String(error?.message||''),errorName:String(error?.name||''),existingUser:!!user},timestamp:Date.now()});
      // #endregion
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
  const logout = async () => {
    await authService.logout();
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
    
    // Admin tem todas as permissões
    if (user.role === 'admin') return true;
    
    // Verificar permissões do usuário (vindas da API)
    return user.permissions?.includes(permission) || false;
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
