// Cliente HTTP (Axios) Configurado
// Centraliza todas as requisições HTTP

import axios from 'axios';
import { appConfig } from '../config/app.config.js';
import { endpoints } from './endpoints.js';

// Criar instância do Axios com configuração base
const apiClient = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: appConfig.requestTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
apiClient.interceptors.request.use(
  (config) => {
    // #region agent log
    const __agentLog = (payload) => {
      try {
        fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
      } catch (_) {}
    };
    __agentLog({location:'src/infrastructure/api/client.js:request_interceptor',message:'API request interceptor - URL construction',data:{baseURL:String(config.baseURL||''),url:String(config.url||''),method:String(config.method||''),finalURL:String((config.baseURL||'')+(config.url||'')),baseURLEndsWithSlash:(config.baseURL||'').endsWith('/'),urlStartsWithSlash:(config.url||'').startsWith('/')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
    // #endregion
    // Obter access token de sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se token expirado ou inválido (401) e ainda não tentou refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Tentar renovar o access token
        const response = await axios.post(`${appConfig.apiUrl}${endpoints.auth.refresh}`, {
          refreshToken,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // Salvar novos tokens
        sessionStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          sessionStorage.setItem('refreshToken', newRefreshToken);
        }

        // Retry da requisição original com novo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, fazer logout
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Não redirecionar automaticamente - o usuário pode usar o modal de login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;


