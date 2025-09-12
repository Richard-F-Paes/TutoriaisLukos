// Constantes compartilhadas entre frontend e backend

export const USER_ROLES = {
  VIEWER: 'viewer',
  EDITOR: 'editor',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

export const USER_PERMISSIONS = {
  VIEW_CONTENT: 'view_content',
  MANAGE_CONTENT: 'manage_content',
  MODERATE_CONTENT: 'moderate_content',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(USER_PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    USER_PERMISSIONS.MANAGE_CONTENT,
    USER_PERMISSIONS.MANAGE_USERS,
    USER_PERMISSIONS.VIEW_ANALYTICS,
    USER_PERMISSIONS.MODERATE_CONTENT
  ],
  [USER_ROLES.EDITOR]: [
    USER_PERMISSIONS.MANAGE_CONTENT,
    USER_PERMISSIONS.VIEW_ANALYTICS
  ],
  [USER_ROLES.MODERATOR]: [
    USER_PERMISSIONS.MODERATE_CONTENT,
    USER_PERMISSIONS.VIEW_ANALYTICS
  ],
  [USER_ROLES.VIEWER]: [
    USER_PERMISSIONS.VIEW_CONTENT
  ]
};

export const TUTORIAL_CATEGORIES = {
  SISTEMA: 'sistema',
  PDV: 'pdv',
  RETAGUARDA: 'retaguarda',
  CONFIGURACAO: 'configuracao',
  TROUBLESHOOTING: 'troubleshooting',
  OUTROS: 'outros'
};

export const TUTORIAL_DIFFICULTIES = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

export const STEP_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  CODE: 'code',
  INTERACTIVE: 'interactive'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

export const LANGUAGES = {
  PT_BR: 'pt-BR',
  EN_US: 'en-US',
  ES_ES: 'es-ES'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    VERIFY: '/api/auth/verify',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password',
    DELETE_ACCOUNT: '/api/users/account',
    STATS: '/api/users/stats',
    TUTORIAL_PROGRESS: '/api/users/tutorials/progress'
  },
  TUTORIALS: {
    LIST: '/api/tutorials',
    DETAIL: '/api/tutorials/:id',
    STEPS: '/api/tutorials/:id/steps',
    CREATE: '/api/tutorials',
    UPDATE: '/api/tutorials/:id',
    DELETE: '/api/tutorials/:id'
  }
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou senha incorretos',
  USER_NOT_FOUND: 'Usuário não encontrado',
  USER_ALREADY_EXISTS: 'Usuário já existe com este email',
  INVALID_TOKEN: 'Token inválido ou expirado',
  ACCESS_DENIED: 'Acesso negado',
  RESOURCE_NOT_FOUND: 'Recurso não encontrado',
  VALIDATION_ERROR: 'Dados inválidos',
  INTERNAL_ERROR: 'Erro interno do servidor'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  REGISTER_SUCCESS: 'Usuário criado com sucesso',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso',
  PASSWORD_CHANGED: 'Senha alterada com sucesso',
  EMAIL_VERIFIED: 'Email verificado com sucesso',
  TUTORIAL_CREATED: 'Tutorial criado com sucesso',
  TUTORIAL_UPDATED: 'Tutorial atualizado com sucesso',
  TUTORIAL_DELETED: 'Tutorial deletado com sucesso'
};
