// Configuração da Aplicação

export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Tutoriais Lukos',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Plataforma de tutoriais do sistema Lukos',
  
  // URLs
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  
  // Configurações de desenvolvimento
  devMode: import.meta.env.DEV,
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  
  // Configurações de upload
  maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10') * 1024 * 1024, // MB para bytes
  allowedFileTypes: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,video/mp4,video/webm').split(','),
  
  // Timeouts
  requestTimeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '10000'),
  maxRetryAttempts: parseInt(import.meta.env.VITE_MAX_RETRY_ATTEMPTS || '3'),
};

export default appConfig;


