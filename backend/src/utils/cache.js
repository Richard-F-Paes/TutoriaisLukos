// Utilitários de cache usando Redis
import { getRedis, isRedisAvailable } from '../config/redis.js';
import crypto from 'crypto';

/**
 * Gera uma chave de cache baseada em prefixo e parâmetros
 * @param {string} prefix - Prefixo da chave (ex: 'tutorials', 'categories')
 * @param {object} params - Parâmetros para gerar a chave
 * @returns {string}
 */
export function generateCacheKey(prefix, params = {}) {
  const paramsStr = JSON.stringify(params);
  const hash = crypto.createHash('md5').update(paramsStr).digest('hex');
  return `cache:${prefix}:${hash}`;
}

/**
 * Obtém um valor do cache
 * @param {string} key - Chave do cache
 * @returns {Promise<any|null>}
 */
export async function getCache(key) {
  try {
    if (!(await isRedisAvailable())) {
      return null;
    }

    const redis = getRedis();
    if (!redis) {
      return null;
    }

    const value = await redis.get(key);
    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error('Erro ao obter cache:', error.message);
    return null;
  }
}

/**
 * Define um valor no cache
 * @param {string} key - Chave do cache
 * @param {any} value - Valor a ser cacheado
 * @param {number} ttl - Time to live em segundos (padrão: 300)
 * @returns {Promise<boolean>}
 */
export async function setCache(key, value, ttl = 300) {
  try {
    if (!(await isRedisAvailable())) {
      return false;
    }

    const redis = getRedis();
    if (!redis) {
      return false;
    }

    const serialized = JSON.stringify(value);
    await redis.setex(key, ttl, serialized);
    return true;
  } catch (error) {
    console.error('Erro ao definir cache:', error.message);
    return false;
  }
}

/**
 * Remove uma chave do cache
 * @param {string} key - Chave do cache
 * @returns {Promise<boolean>}
 */
export async function deleteCache(key) {
  try {
    if (!(await isRedisAvailable())) {
      return false;
    }

    const redis = getRedis();
    if (!redis) {
      return false;
    }

    await redis.del(key);
    return true;
  } catch (error) {
    console.error('Erro ao deletar cache:', error.message);
    return false;
  }
}

/**
 * Remove todas as chaves que correspondem a um padrão
 * @param {string} pattern - Padrão de chaves (ex: 'cache:tutorials:*')
 * @returns {Promise<number>} - Número de chaves removidas
 */
export async function invalidateCachePattern(pattern) {
  try {
    if (!(await isRedisAvailable())) {
      return 0;
    }

    const redis = getRedis();
    if (!redis) {
      return 0;
    }

    const keys = await redis.keys(pattern);
    if (keys.length === 0) {
      return 0;
    }

    await redis.del(...keys);
    return keys.length;
  } catch (error) {
    console.error('Erro ao invalidar cache por padrão:', error.message);
    return 0;
  }
}

/**
 * Remove todas as chaves de um prefixo específico
 * @param {string} prefix - Prefixo (ex: 'tutorials', 'categories')
 * @returns {Promise<number>} - Número de chaves removidas
 */
export async function invalidateCachePrefix(prefix) {
  return invalidateCachePattern(`cache:${prefix}:*`);
}

/**
 * Obtém TTL de uma chave
 * @param {string} key - Chave do cache
 * @returns {Promise<number>} - TTL em segundos (-1 se não expira, -2 se não existe)
 */
export async function getCacheTTL(key) {
  try {
    if (!(await isRedisAvailable())) {
      return -2;
    }

    const redis = getRedis();
    if (!redis) {
      return -2;
    }

    return await redis.ttl(key);
  } catch (error) {
    console.error('Erro ao obter TTL do cache:', error.message);
    return -2;
  }
}

/**
 * Obtém TTL padrão baseado no tipo de recurso
 * @param {string} resourceType - Tipo de recurso (ex: 'tutorials', 'categories')
 * @returns {number} - TTL em segundos
 */
export function getDefaultTTL(resourceType) {
  const ttlMap = {
    tutorials: parseInt(process.env.CACHE_TTL_TUTORIALS || '600', 10),
    categories: parseInt(process.env.CACHE_TTL_CATEGORIES || '1800', 10),
  };

  return ttlMap[resourceType] || parseInt(process.env.CACHE_TTL_DEFAULT || '300', 10);
}

export default {
  generateCacheKey,
  getCache,
  setCache,
  deleteCache,
  invalidateCachePattern,
  invalidateCachePrefix,
  getCacheTTL,
  getDefaultTTL,
};

