// Middleware de verificação de permissões
import { hasPermission } from '../config/auth.js';

/**
 * Middleware para verificar se usuário tem uma permissão específica
 * @param {string} permission - Permissão necessária
 */
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    const userRole = req.user.role;
    const userPermissions = req.user.permissions || [];

    // Verificar se tem a permissão específica ou é admin
    if (userRole === 'admin' || userPermissions.includes(permission) || hasPermission(userRole, permission)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: 'Insufficient permissions',
      required: permission,
    });
  };
};

/**
 * Middleware para verificar se usuário tem um role específico
 * @param {string[]} allowedRoles - Roles permitidos
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: 'Insufficient role',
      required: allowedRoles,
      current: req.user.role,
    });
  };
};
