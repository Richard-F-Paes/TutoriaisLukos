// Constantes compartilhadas da aplicação
// Uma única fonte de verdade para constantes

// Roles de usuários
export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

// Permissões
export const PERMISSIONS = {
  MANAGE_CONTENT: 'manage_content',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics',
  MODERATE_CONTENT: 'moderate_content',
  VIEW_CONTENT: 'view_content',
};

// Categorias de tutoriais
export const TUTORIAL_CATEGORIES = {
  PDV: 'pdv',
  RETAGUARDA: 'retaguarda',
  DASHBOARD: 'dashboard',
  CONVENIENCIA: 'conveniencia',
  PISTA: 'pista',
  FATURA_WEB: 'fatura-web',
};

// Níveis de dificuldade
export const DIFFICULTY_LEVELS = {
  INICIANTE: 'Iniciante',
  INTERMEDIARIO: 'Intermediário',
  AVANCADO: 'Avançado',
};

// Estados de carregamento
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default {
  USER_ROLES,
  PERMISSIONS,
  TUTORIAL_CATEGORIES,
  DIFFICULTY_LEVELS,
  LOADING_STATES,
};


