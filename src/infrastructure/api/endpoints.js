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
    getById: (id) => `${API_VERSION}/categories/${id}`,
    getChildren: (id) => `${API_VERSION}/categories/${id}/children`,
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
    deletePermanent: (id) => `${API_VERSION}/users/${id}/permanent`,
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
  
  // Menus do Header
  headerMenus: {
    list: `${API_VERSION}/header-menus`,
    get: (id) => `${API_VERSION}/header-menus/${id}`,
    create: `${API_VERSION}/header-menus`,
    update: (id) => `${API_VERSION}/header-menus/${id}`,
    delete: (id) => `${API_VERSION}/header-menus/${id}`,
    reorder: `${API_VERSION}/header-menus/reorder`,
  },
  
  // Treinamentos
  trainings: {
    list: `${API_VERSION}/trainings`,
    get: (id) => `${API_VERSION}/trainings/${id}`,
    create: `${API_VERSION}/trainings`,
    update: (id) => `${API_VERSION}/trainings/${id}`,
    delete: (id) => `${API_VERSION}/trainings/${id}`,
  },
  
  // Vídeos de Treinamentos
  trainingVideos: {
    list: (trainingId) => `${API_VERSION}/trainings/${trainingId}/videos`,
    upload: (trainingId) => `${API_VERSION}/trainings/${trainingId}/videos`,
    delete: (trainingId, videoId) => `${API_VERSION}/trainings/${trainingId}/videos/${videoId}`,
    reorder: (trainingId) => `${API_VERSION}/trainings/${trainingId}/videos/reorder`,
  },
  
  // Agendamentos
  appointments: {
    list: `${API_VERSION}/appointments`,
    get: (id) => `${API_VERSION}/appointments/${id}`,
    create: `${API_VERSION}/appointments`,
    update: (id) => `${API_VERSION}/appointments/${id}`,
    delete: (id) => `${API_VERSION}/appointments/${id}`,
  },
  
  // Configurações de Treinamento
  trainingConfigs: {
    list: `${API_VERSION}/training-configs`,
    get: (id) => `${API_VERSION}/training-configs/${id}`,
    getByType: (type) => `${API_VERSION}/training-configs/type/${type}`,
    create: `${API_VERSION}/training-configs`,
    update: (id) => `${API_VERSION}/training-configs/${id}`,
    delete: (id) => `${API_VERSION}/training-configs/${id}`,
  },
  
  // Disponibilidade de Treinamentos
  availability: {
    list: `${API_VERSION}/availability`,
    get: (id) => `${API_VERSION}/availability/${id}`,
    availableSlots: `${API_VERSION}/availability/available-slots`,
    create: `${API_VERSION}/availability`,
    update: (id) => `${API_VERSION}/availability/${id}`,
    delete: (id) => `${API_VERSION}/availability/${id}`,
  },
  
  // Admin
  admin: {
    stats: `${API_VERSION}/admin/stats`,
  },
};

export default endpoints;
