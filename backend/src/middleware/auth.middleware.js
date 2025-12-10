// Middleware de autenticação JWT
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.js';

/**
 * Middleware para verificar token JWT
 */
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verificar token
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    // Adicionar dados do usuário ao request
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role,
      permissions: decoded.permissions || [],
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }
};

/**
 * Middleware opcional - autentica se houver token, mas não bloqueia
 */
export const optionalAuthenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, authConfig.jwt.secret);

      req.user = {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role,
        permissions: decoded.permissions || [],
      };
    }

    next();
  } catch (error) {
    // Se token inválido, continua sem usuário
    next();
  }
};
