// Endpoints centralizados da API
// Uma única fonte de verdade para todos os endpoints

const API_BASE = '/api';

export const endpoints = {
  // Autenticação
  auth: {
    login: `${API_BASE}/auth/login`,
    register: `${API_BASE}/auth/register`,
    verify: `${API_BASE}/auth/verify`,
    logout: `${API_BASE}/auth/logout`,
    profile: `${API_BASE}/auth/profile`,
    changePassword: `${API_BASE}/auth/change-password`,
    resetPassword: `${API_BASE}/auth/reset-password`,
  },
  
  // Tutoriais
  tutorials: {
    list: `${API_BASE}/tutorials`,
    get: (id) => `${API_BASE}/tutorials/${id}`,
    create: `${API_BASE}/tutorials`,
    update: (id) => `${API_BASE}/tutorials/${id}`,
    delete: (id) => `${API_BASE}/tutorials/${id}`,
    search: `${API_BASE}/tutorials/search`,
    byCategory: (category) => `${API_BASE}/tutorials/category/${category}`,
  },
  
  // Categorias
  categories: {
    list: `${API_BASE}/categories`,
    get: (id) => `${API_BASE}/categories/${id}`,
    create: `${API_BASE}/categories`,
    update: (id) => `${API_BASE}/categories/${id}`,
    delete: (id) => `${API_BASE}/categories/${id}`,
  },
  
  // Upload
  upload: {
    image: `${API_BASE}/upload/image`,
    video: `${API_BASE}/upload/video`,
    file: `${API_BASE}/upload/file`,
  },
};

export default endpoints;


