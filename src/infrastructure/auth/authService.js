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
    // #region agent log
    const __agentLog = (payload) => {
      try {
        fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
      } catch (_) {}
    };
    // #endregion
    try {
      const endpointValue = endpoints.auth.login;
      // #region agent log
      __agentLog({location:'src/infrastructure/auth/authService.js:login',message:'authService.login called',data:{endpointValue},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
      // #endregion
      // #region agent log
      __agentLog({location:'src/infrastructure/auth/authService.js:login:before_request',message:'Before API request',data:{username,hasPassword:!!password,passwordLength:password?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion
      const response = await apiClient.post(endpointValue, {
        username,
        password,
      });
      // #region agent log
      __agentLog({location:'src/infrastructure/auth/authService.js:login:response',message:'API response received',data:{status:response.status,hasData:!!response.data,dataKeys:response.data?Object.keys(response.data):[],dataStructure:JSON.stringify(response.data).substring(0,500)},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion

      // Verificar estrutura da resposta - pode ser response.data.data ou response.data
      const responseData = response.data?.data || response.data;
      const { user, accessToken, refreshToken, token } = responseData;
      
      // #region agent log
      __agentLog({location:'src/infrastructure/auth/authService.js:login:parsing',message:'Parsing response data',data:{hasUser:!!user,hasAccessToken:!!accessToken,hasRefreshToken:!!refreshToken,hasToken:!!token,userKeys:user?Object.keys(user):[]},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion
      
      // Se o backend retornar apenas 'token' (formato antigo), usar como accessToken
      const finalAccessToken = accessToken || token;
      const finalRefreshToken = refreshToken || token; // Fallback temporário

      // Salvar tokens em sessionStorage
      sessionStorage.setItem('accessToken', finalAccessToken);
      if (finalRefreshToken && finalRefreshToken !== finalAccessToken) {
        sessionStorage.setItem('refreshToken', finalRefreshToken);
      }
      // #region agent log
      __agentLog({location:'src/infrastructure/auth/authService.js:login:success',message:'Login successful',data:{userId:user?.id,username:user?.username,hasAccessToken:!!finalAccessToken,hasRefreshToken:!!finalRefreshToken},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion

      return {
        user,
        accessToken: finalAccessToken,
        refreshToken: finalRefreshToken,
      };
    } catch (error) {
      // #region agent log
      __agentLog({location:'src/infrastructure/auth/authService.js:login:error',message:'Login error',data:{errorMessage:String(error.message||''),errorStatus:error.response?.status||null,errorData:error.response?.data?JSON.stringify(error.response.data).substring(0,300):null,hasResponse:!!error.response},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion
      throw new Error(error.response?.data?.error || error.message || 'Erro ao fazer login');
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
