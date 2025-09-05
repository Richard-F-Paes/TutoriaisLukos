import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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

// Simulação de dados para desenvolvimento (quando não há backend)
export const mockAuthService = {
  async login(email, password) {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dados mockados para desenvolvimento
    const mockUsers = [
      {
        id: 1,
        email: 'admin@lukos.com',
        password: 'admin123',
        name: 'Administrador',
        role: 'super_admin',
        avatar: null,
        emailVerified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        email: 'editor@lukos.com',
        password: 'editor123',
        name: 'Editor',
        role: 'editor',
        avatar: null,
        emailVerified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        email: 'viewer@lukos.com',
        password: 'viewer123',
        name: 'Visualizador',
        role: 'viewer',
        avatar: null,
        emailVerified: true,
        createdAt: new Date().toISOString()
      }
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    // Simular token JWT
    const token = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    }));

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        emailVerified: user.emailVerified
      },
      token
    };
  },

  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular criação de usuário
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      role: 'viewer', // Role padrão
      avatar: null,
      emailVerified: false,
      createdAt: new Date().toISOString()
    };

    const token = btoa(JSON.stringify({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      exp: Date.now() + (24 * 60 * 60 * 1000)
    }));

    return {
      user: newUser,
      token
    };
  },

  async verifyToken(token) {
    try {
      const decoded = JSON.parse(atob(token));
      
      if (decoded.exp < Date.now()) {
        throw new Error('Token expirado');
      }

      // Simular busca do usuário
      const mockUsers = [
        {
          id: 1,
          email: 'admin@lukos.com',
          name: 'Administrador',
          role: 'super_admin',
          avatar: null,
          emailVerified: true
        },
        {
          id: 2,
          email: 'editor@lukos.com',
          name: 'Editor',
          role: 'editor',
          avatar: null,
          emailVerified: true
        },
        {
          id: 3,
          email: 'viewer@lukos.com',
          name: 'Visualizador',
          role: 'viewer',
          avatar: null,
          emailVerified: true
        }
      ];

      const user = mockUsers.find(u => u.id === decoded.userId);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  },

  async updateProfile(profileData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular atualização
    return {
      ...profileData,
      updatedAt: new Date().toISOString()
    };
  },

  async changePassword(currentPassword, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular validação
    if (currentPassword === 'wrong') {
      throw new Error('Senha atual incorreta');
    }
  },

  async resetPassword(email) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular envio de email
    console.log(`Email de recuperação enviado para: ${email}`);
  }
};

// Usar serviço mockado em desenvolvimento
export default process.env.NODE_ENV === 'development' ? mockAuthService : authService;
