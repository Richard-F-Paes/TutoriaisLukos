// Configuração de autenticação JWT
import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  // Configurações do Access Token
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: 'HS256',
  },

  // Configurações do Refresh Token
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_change_in_production',
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },

  // Roles disponíveis no sistema
  roles: {
    ADMIN: 'admin',
    SUPORTE: 'suporte',
  },

  // Permissões por role
  permissions: {
    admin: [
      'create_tutorial',
      'edit_tutorial',
      'delete_tutorial',
      'publish_tutorial',
      'manage_categories',
      'manage_users',
      'view_audit_logs',
      'upload_media',
      'delete_media',
    ],
    suporte: [
      'create_tutorial',
      'edit_tutorial',
      'publish_tutorial',
      'view_categories',
      'upload_media',
    ],
  },
};

/**
 * Verifica se um role tem uma permissão específica
 * @param {string} role - Role do usuário
 * @param {string} permission - Permissão a verificar
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  const rolePermissions = authConfig.permissions[role];
  if (!rolePermissions) {
    return false;
  }
  return rolePermissions.includes(permission);
}

/**
 * Retorna todas as permissões de um role
 * @param {string} role - Role do usuário
 * @returns {string[]}
 */
export function getRolePermissions(role) {
  return authConfig.permissions[role] || [];
}

export default authConfig;




