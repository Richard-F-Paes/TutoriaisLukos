import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook personalizado para autenticação
export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Carrega dados do usuário do localStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Limpa dados inválidos
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Função de login
  const login = useCallback(async (email, password) => {
    setLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para demonstração
      const mockUser = {
        id: 1,
        email,
        name: 'Usuário Demo',
        role: 'user',
        permissions: ['view_tutorials', 'complete_tutorials'],
        avatar: null,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Salva dados no localStorage
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Função de registro
  const register = useCallback(async (userData) => {
    setLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        permissions: ['view_tutorials', 'complete_tutorials'],
        avatar: null,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Salva dados no localStorage
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(newUser));

      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: 'Erro ao criar conta' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Função de logout
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  }, [navigate]);

  // Função para atualizar perfil
  const updateProfile = useCallback(async (profileData) => {
    if (!user) return { success: false, error: 'Usuário não autenticado' };

    setLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        ...profileData,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { success: false, error: 'Erro ao atualizar perfil' };
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Função para alterar senha
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    if (!user) return { success: false, error: 'Usuário não autenticado' };

    setLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      return { success: false, error: 'Erro ao alterar senha' };
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Função para recuperar senha
  const resetPassword = useCallback(async (email) => {
    setLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      return { success: false, error: 'Erro ao recuperar senha' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Verifica se usuário tem permissão específica
  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

  // Verifica se usuário tem role específica
  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  // Verifica se usuário é admin
  const isAdmin = useCallback(() => {
    return hasRole('admin') || hasRole('super_admin');
  }, [hasRole]);

  return {
    // Estado
    user,
    loading,
    isAuthenticated,
    
    // Ações de autenticação
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    
    // Utilitários
    hasPermission,
    hasRole,
    isAdmin
  };
}

// Hook para gerenciar sessão
export function useSession() {
  const [sessionData, setSessionData] = useState({
    lastActivity: Date.now(),
    isActive: true,
    timeout: 30 * 60 * 1000 // 30 minutos
  });

  // Atualiza última atividade
  const updateActivity = useCallback(() => {
    setSessionData(prev => ({
      ...prev,
      lastActivity: Date.now(),
      isActive: true
    }));
  }, []);

  // Verifica se sessão expirou
  useEffect(() => {
    const checkSession = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - sessionData.lastActivity;
      
      if (timeSinceLastActivity > sessionData.timeout) {
        setSessionData(prev => ({
          ...prev,
          isActive: false
        }));
        
        // Opcional: logout automático
        // logout();
      }
    };

    const interval = setInterval(checkSession, 60000); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, [sessionData.lastActivity, sessionData.timeout]);

  // Event listeners para atividade do usuário
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [updateActivity]);

  return {
    sessionData,
    updateActivity,
    isSessionActive: sessionData.isActive
  };
}
