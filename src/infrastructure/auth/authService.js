// Serviço de Autenticação Simplificado
// Para equipe pequena de suporte - apenas login/senha

import { verifyCredentials } from '../config/auth.config.js';
import { generateToken, verifyToken as verifyTokenFromService } from './tokenService.js';

/**
 * Serviço de autenticação simplificado
 * Usa configuração local (auth.config.js) para verificar credenciais
 */
export const authService = {
  /**
   * Login - Verifica credenciais e retorna token
   * @param {string} username - Nome de usuário (ou email)
   * @param {string} password - Senha
   * @returns {Promise<{user: Object, token: string}>}
   */
  async login(username, password) {
    try {
      // Verificar credenciais usando configuração
      const user = await verifyCredentials(username, password);
      
      if (!user) {
        throw new Error('Usuário ou senha incorretos');
      }

      // Gerar token JWT
      const token = generateToken(user, 24); // 24 horas

      return {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        },
        token
      };
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  },

  /**
   * Verificar token - Valida e retorna dados do usuário
   * @param {string} token - Token JWT
   * @returns {Promise<Object>} - Dados do usuário
   */
  async verifyToken(token) {
    try {
      const payload = verifyTokenFromService(token);
      
      if (!payload) {
        throw new Error('Token inválido ou expirado');
      }

      // Retornar dados do usuário do token
      return {
        id: payload.userId,
        username: payload.username,
        role: payload.role
      };
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  },

  /**
   * Logout - Limpa token local
   */
  logout() {
    // Limpar token do localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }
};

// Exportar serviço real (padrão para produção)
// Mocks estão em ./__mocks__/authService.mock.js e só devem ser usados
// em desenvolvimento com VITE_USE_MOCK_DATA=true
export default authService;
