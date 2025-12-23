// Middleware de autenticação JWT
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.js';
import { isAccessTokenBlacklisted } from '../utils/tokenBlacklist.js';

/**
 * Middleware para verificar token JWT
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verificar se token está na blacklist
    const isBlacklisted = await isAccessTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        error: 'Token revoked',
      });
    }

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
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // Verificar blacklist apenas se token existe
      const isBlacklisted = await isAccessTokenBlacklisted(token);
      if (!isBlacklisted) {
        try {
          const decoded = jwt.verify(token, authConfig.jwt.secret);

          req.user = {
            id: decoded.userId,
            username: decoded.username,
            role: decoded.role,
            permissions: decoded.permissions || [],
          };
        } catch (error) {
          // Se token inválido, continua sem usuário
        }
      }
    }

    next();
  } catch (error) {
    // Se erro na verificação de blacklist, continua sem usuário
    next();
  }
};
