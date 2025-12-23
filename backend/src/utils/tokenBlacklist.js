// Utilitários para gerenciar blacklist de tokens JWT
import { getRedis, isRedisAvailable } from '../config/redis.js';
import crypto from 'crypto';

/**
 * Gera hash de um token para usar como chave no Redis
 * @param {string} token - Token JWT
 * @returns {string}
 */
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Adiciona um access token à blacklist
 * @param {string} token - Token JWT
 * @param {number} ttl - Time to live em segundos (tempo de expiração do token)
 * @returns {Promise<boolean>}
 */
export async function addAccessTokenToBlacklist(token, ttl) {
  try {
    if (!(await isRedisAvailable())) {
      // Se Redis não disponível, retornar true para não quebrar o fluxo
      console.warn('Redis indisponível - token não adicionado à blacklist');
      return true;
    }

    const redis = getRedis();
    if (!redis) {
      return true;
    }

    const tokenHash = hashToken(token);
    const key = `blacklist:access:${tokenHash}`;
    
    await redis.setex(key, ttl, '1');
    return true;
  } catch (error) {
    console.error('Erro ao adicionar access token à blacklist:', error.message);
    return false;
  }
}

/**
 * Adiciona um refresh token à blacklist
 * @param {string} token - Refresh token JWT
 * @param {number} ttl - Time to live em segundos (tempo de expiração do token)
 * @returns {Promise<boolean>}
 */
export async function addRefreshTokenToBlacklist(token, ttl) {
  try {
    if (!(await isRedisAvailable())) {
      console.warn('Redis indisponível - refresh token não adicionado à blacklist');
      return true;
    }

    const redis = getRedis();
    if (!redis) {
      return true;
    }

    const tokenHash = hashToken(token);
    const key = `blacklist:refresh:${tokenHash}`;
    
    await redis.setex(key, ttl, '1');
    return true;
  } catch (error) {
    console.error('Erro ao adicionar refresh token à blacklist:', error.message);
    return false;
  }
}

/**
 * Verifica se um access token está na blacklist
 * @param {string} token - Token JWT
 * @returns {Promise<boolean>} - true se está na blacklist
 */
export async function isAccessTokenBlacklisted(token) {
  try {
    if (!(await isRedisAvailable())) {
      // Se Redis não disponível, considerar token válido (modo offline)
      return false;
    }

    const redis = getRedis();
    if (!redis) {
      return false;
    }

    const tokenHash = hashToken(token);
    const key = `blacklist:access:${tokenHash}`;
    
    const exists = await redis.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Erro ao verificar blacklist de access token:', error.message);
    // Em caso de erro, considerar token válido para não quebrar o fluxo
    return false;
  }
}

/**
 * Verifica se um refresh token está na blacklist
 * @param {string} token - Refresh token JWT
 * @returns {Promise<boolean>} - true se está na blacklist
 */
export async function isRefreshTokenBlacklisted(token) {
  try {
    if (!(await isRedisAvailable())) {
      return false;
    }

    const redis = getRedis();
    if (!redis) {
      return false;
    }

    const tokenHash = hashToken(token);
    const key = `blacklist:refresh:${tokenHash}`;
    
    const exists = await redis.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Erro ao verificar blacklist de refresh token:', error.message);
    return false;
  }
}

/**
 * Calcula TTL baseado no tempo de expiração do token
 * @param {number} expiresIn - Tempo de expiração em segundos ou string (ex: '24h')
 * @returns {number} - TTL em segundos
 */
export function calculateTokenTTL(expiresIn) {
  if (typeof expiresIn === 'number') {
    return expiresIn;
  }

  // Parsear formato como '24h', '7d', etc.
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) {
    return 86400; // Default: 24 horas
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  return value * (multipliers[unit] || 1);
}

export default {
  addAccessTokenToBlacklist,
  addRefreshTokenToBlacklist,
  isAccessTokenBlacklisted,
  isRefreshTokenBlacklisted,
  calculateTokenTTL,
};

