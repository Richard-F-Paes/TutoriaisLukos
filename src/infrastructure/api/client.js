// Cliente HTTP (Axios) Configurado
// Centraliza todas as requisições HTTP

import axios from 'axios';
import { appConfig } from '../config/app.config.js';

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
    // Obter token de sessionStorage ou localStorage
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se token expirado ou inválido (401), redirecionar para login
    if (error.response?.status === 401) {
      // Limpar tokens
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      
      // Redirecionar para login (apenas se não estiver já na página de login)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;


