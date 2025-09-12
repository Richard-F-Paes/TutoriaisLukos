import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Registro
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar conta');
    }
  },

  // Verificar token
  async verifyToken(token) {
    try {
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.user;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  },

  // Atualizar perfil
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
    }
  },

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    try {
      await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao alterar senha');
    }
  },

  // Recuperar senha
  async resetPassword(email) {
    try {
      await api.post('/auth/reset-password', { email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao enviar email de recuperação');
    }
  },

  // Confirmar recuperação de senha
  async confirmResetPassword(token, newPassword) {
    try {
      await api.post('/auth/confirm-reset-password', {
        token,
        newPassword
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao redefinir senha');
    }
  },

  // Verificar email
  async verifyEmail(token) {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao verificar email');
    }
  },

  // Reenviar verificação de email
  async resendVerification(email) {
    try {
      await api.post('/auth/resend-verification', { email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao reenviar verificação');
    }
  },

  // Logout (limpar token local)
  logout() {
    localStorage.removeItem('token');
  }
};


// Usar serviço real (removendo dados mockados)
export default authService;
