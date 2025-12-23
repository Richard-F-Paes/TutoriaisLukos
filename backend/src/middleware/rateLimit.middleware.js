// Middleware de rate limiting usando Redis
import { getRedis, isRedisAvailable } from '../config/redis.js';

/**
 * Cria middleware de rate limiting
 * @param {object} options - Opções de configuração
 * @param {number} options.windowMs - Janela de tempo em milissegundos (padrão: 60000 = 1 minuto)
 * @param {number} options.max - Número máximo de requisições na janela (padrão: 100)
 * @param {string} options.keyGenerator - Função para gerar chave (padrão: usa IP)
 * @param {function} options.skip - Função para pular rate limiting (opcional)
 * @returns {function} Middleware Express
 */
export function rateLimit(options = {}) {
  const {
    windowMs = 60000, // 1 minuto padrão
    max = 100,
    keyGenerator = (req) => {
      // Por padrão, usar IP do cliente
      return req.ip || req.connection.remoteAddress || 'unknown';
    },
    skip = () => false,
  } = options;

  return async (req, res, next) => {
    // Verificar se deve pular rate limiting
    if (skip(req)) {
      return next();
    }

    // Em desenvolvimento, se RATE_LIMIT_DISABLED=true, pular rate limiting
    if (process.env.NODE_ENV !== 'production' && process.env.RATE_LIMIT_DISABLED === 'true') {
      return next();
    }

    try {
      // Se Redis não disponível, permitir requisição (modo offline)
      if (!(await isRedisAvailable())) {
        return next();
      }

      const redis = getRedis();
      if (!redis) {
        return next();
      }

      // Gerar chave única para este limite
      const key = `ratelimit:${keyGenerator(req)}`;
      
      // Obter contador atual
      const current = await redis.incr(key);
      
      // Se é a primeira requisição nesta janela, definir TTL
      if (current === 1) {
        await redis.pexpire(key, windowMs);
      }

      // Calcular tempo restante na janela
      const ttl = await redis.pttl(key);
      const resetTime = Date.now() + ttl;

      // Adicionar headers informativos
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current));
      res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString());

      // Verificar se excedeu o limite
      if (current > max) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${Math.ceil(ttl / 1000)} seconds.`,
          retryAfter: Math.ceil(ttl / 1000),
        });
      }

      next();
    } catch (error) {
      // Em caso de erro, permitir requisição para não quebrar o fluxo
      console.error('Erro no rate limiting:', error.message);
      next();
    }
  };
}

/**
 * Rate limiting por IP (padrão)
 * @param {number} max - Número máximo de requisições
 * @param {number} windowMs - Janela de tempo em milissegundos
 * @returns {function} Middleware Express
 */
export function rateLimitByIP(max = 100, windowMs = 60000) {
  return rateLimit({
    max,
    windowMs,
    keyGenerator: (req) => {
      return req.ip || req.connection.remoteAddress || 'unknown';
    },
  });
}

/**
 * Rate limiting por usuário autenticado
 * @param {number} max - Número máximo de requisições
 * @param {number} windowMs - Janela de tempo em milissegundos
 * @returns {function} Middleware Express
 */
export function rateLimitByUser(max = 100, windowMs = 60000) {
  return rateLimit({
    max,
    windowMs,
    keyGenerator: (req) => {
      if (req.user && req.user.id) {
        return `user:${req.user.id}`;
      }
      // Fallback para IP se não autenticado
      return req.ip || req.connection.remoteAddress || 'unknown';
    },
  });
}

/**
 * Rate limiting combinado (IP + User se autenticado)
 * @param {number} max - Número máximo de requisições
 * @param {number} windowMs - Janela de tempo em milissegundos
 * @returns {function} Middleware Express
 */
export function rateLimitCombined(max = 100, windowMs = 60000) {
  return rateLimit({
    max,
    windowMs,
    keyGenerator: (req) => {
      const ip = req.ip || req.connection.remoteAddress || 'unknown';
      if (req.user && req.user.id) {
        return `combined:${req.user.id}:${ip}`;
      }
      return `ip:${ip}`;
    },
  });
}

export default rateLimit;

