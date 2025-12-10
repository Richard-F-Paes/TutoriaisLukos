// Serviço de Autenticação - Integrado com API
import apiClient from '../api/client.js';
import { endpoints } from '../api/endpoints.js';

/**
 * Serviço de autenticação integrado com API
 */
export const authService = {
  /**
   * Login - Autentica com API e retorna tokens
   * @param {string} username - Nome de usuário (ou email)
   * @param {string} password - Senha
   * @returns {Promise<{user: Object, accessToken: string, refreshToken: string}>}
   */
  async login(username, password) {
    try {
      const response = await apiClient.post(endpoints.auth.login, {
        username,
        password,
      });

      const { user, accessToken, refreshToken } = response.data.data;

      // Salvar tokens em sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
  },

  /**
   * Refresh token - Renova access token
   * @returns {Promise<string>} - Novo access token
   */
  async refreshToken() {
    try {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post(endpoints.auth.refresh, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      // Atualizar tokens
      sessionStorage.setItem('accessToken', accessToken);
      if (newRefreshToken) {
        sessionStorage.setItem('refreshToken', newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      // Limpar tokens se refresh falhar
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      throw new Error('Failed to refresh token');
    }
  },

  /**
   * Verificar token - Obtém usuário atual da API
   * @returns {Promise<Object>} - Dados do usuário
   */
  async verifyToken() {
    try {
      const response = await apiClient.get(endpoints.auth.me);
      return response.data.data.user;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  },

  /**
   * Logout - Limpa tokens e chama API
   */
  async logout() {
    try {
      // Tentar chamar API de logout (opcional)
      await apiClient.post(endpoints.auth.logout).catch(() => {
        // Ignorar erro se API não estiver disponível
      });
    } finally {
      // Sempre limpar tokens locais
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  },
};

export default authService;
