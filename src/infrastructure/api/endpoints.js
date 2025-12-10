// Endpoints centralizados da API
// Uma única fonte de verdade para todos os endpoints

const API_VERSION = '/api/v1';

export const endpoints = {
  // Autenticação
  auth: {
    login: `${API_VERSION}/auth/login`,
    refresh: `${API_VERSION}/auth/refresh`,
    me: `${API_VERSION}/auth/me`,
    logout: `${API_VERSION}/auth/logout`,
  },
  
  // Tutoriais
  tutorials: {
    list: `${API_VERSION}/tutorials`,
    get: (slug) => `${API_VERSION}/tutorials/${slug}`,
    create: `${API_VERSION}/tutorials`,
    update: (id) => `${API_VERSION}/tutorials/${id}`,
    delete: (id) => `${API_VERSION}/tutorials/${id}`,
    search: `${API_VERSION}/tutorials/search`,
    byCategory: (categorySlug) => `${API_VERSION}/tutorials/category/${categorySlug}`,
    publish: (id) => `${API_VERSION}/tutorials/${id}/publish`,
    unpublish: (id) => `${API_VERSION}/tutorials/${id}/unpublish`,
  },
  
  // Passos dos Tutoriais
  steps: {
    list: (tutorialId) => `${API_VERSION}/tutorials/${tutorialId}/steps`,
    create: (tutorialId) => `${API_VERSION}/tutorials/${tutorialId}/steps`,
    update: (tutorialId, stepId) => `${API_VERSION}/tutorials/${tutorialId}/steps/${stepId}`,
    delete: (tutorialId, stepId) => `${API_VERSION}/tutorials/${tutorialId}/steps/${stepId}`,
    reorder: (tutorialId) => `${API_VERSION}/tutorials/${tutorialId}/steps/reorder`,
  },
  
  // Categorias
  categories: {
    list: `${API_VERSION}/categories`,
    get: (slug) => `${API_VERSION}/categories/${slug}`,
    create: `${API_VERSION}/categories`,
    update: (id) => `${API_VERSION}/categories/${id}`,
    delete: (id) => `${API_VERSION}/categories/${id}`,
  },
  
  // Usuários
  users: {
    list: `${API_VERSION}/users`,
    get: (id) => `${API_VERSION}/users/${id}`,
    create: `${API_VERSION}/users`,
    update: (id) => `${API_VERSION}/users/${id}`,
    delete: (id) => `${API_VERSION}/users/${id}`,
    changePassword: (id) => `${API_VERSION}/users/${id}/password`,
  },
  
  // Upload de Mídia
  media: {
    upload: `${API_VERSION}/media/upload`,
    list: `${API_VERSION}/media`,
    delete: (id) => `${API_VERSION}/media/${id}`,
  },
  
  // Auditoria
  audit: {
    logs: `${API_VERSION}/audit/logs`,
  },
};

export default endpoints;


