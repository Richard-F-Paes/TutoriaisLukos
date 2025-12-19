// Endpoints centralizados da API
// Uma única fonte de verdade para todos os endpoints

// #region agent log
const __agentLog = (payload) => {
  try {
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
  } catch (_) {}
};
// #endregion

const API_VERSION = '/api/v1';
// #region agent log
__agentLog({location:'src/infrastructure/api/endpoints.js:API_VERSION',message:'API_VERSION constant defined',data:{apiVersion:API_VERSION},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
// #endregion

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
  
  // Menus do Header
  headerMenus: {
    list: `${API_VERSION}/header-menus`,
    get: (id) => `${API_VERSION}/header-menus/${id}`,
    create: `${API_VERSION}/header-menus`,
    update: (id) => `${API_VERSION}/header-menus/${id}`,
    delete: (id) => `${API_VERSION}/header-menus/${id}`,
    reorder: `${API_VERSION}/header-menus/reorder`,
  },
};

export default endpoints;


