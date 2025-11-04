// MOCKS APENAS PARA DESENVOLVIMENTO
// NUNCA usar em produção - verificação rigorosa de ambiente

/**
 * Serviço de autenticação mockado para desenvolvimento
 * ATENÇÃO: Este arquivo só deve ser usado quando VITE_USE_MOCK_DATA=true
 */
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

