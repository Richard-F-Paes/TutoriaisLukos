// Middleware de cache para respostas HTTP
import { generateCacheKey, getCache, setCache, getDefaultTTL } from '../utils/cache.js';

/**
 * Middleware de cache opcional
 * Cacheia respostas GET bem-sucedidas
 * 
 * @param {object} options - Opções de configuração
 * @param {string} options.prefix - Prefixo para chaves de cache (ex: 'tutorials')
 * @param {number} options.ttl - Time to live em segundos (opcional, usa padrão se não fornecido)
 * @param {function} options.keyGenerator - Função customizada para gerar chave (opcional)
 * @param {function} options.shouldCache - Função para determinar se deve cachear (opcional)
 * @returns {function} Middleware Express
 */
export function cacheMiddleware(options = {}) {
  const {
    prefix = 'default',
    ttl,
    keyGenerator,
    shouldCache = () => true,
  } = options;

  return async (req, res, next) => {
    // Apenas cachear requisições GET
    if (req.method !== 'GET') {
      return next();
    }

    // Verificar se deve cachear esta requisição
    if (!shouldCache(req)) {
      return next();
    }

    try {
      // Gerar chave de cache
      let cacheKey;
      if (keyGenerator) {
        cacheKey = keyGenerator(req);
      } else {
        const params = {
          path: req.path,
          query: req.query,
          userId: req.user?.id, // Incluir userId se autenticado
        };
        cacheKey = generateCacheKey(prefix, params);
      }

      // Tentar obter do cache
      const cached = await getCache(cacheKey);
      if (cached) {
        // Cache hit - retornar resposta cacheada
        res.setHeader('X-Cache', 'HIT');
        return res.json(cached);
      }

      // Cache miss - interceptar resposta para cachear
      res.setHeader('X-Cache', 'MISS');
      
      // Salvar função original de json
      const originalJson = res.json.bind(res);
      
      // Sobrescrever res.json para cachear antes de enviar
      res.json = function(data) {
        // Apenas cachear respostas bem-sucedidas (2xx)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const cacheTTL = ttl || getDefaultTTL(prefix);
          setCache(cacheKey, data, cacheTTL).catch(err => {
            console.error('Erro ao cachear resposta:', err.message);
          });
        }
        
        // Chamar função original
        return originalJson(data);
      };

      next();
    } catch (error) {
      // Em caso de erro, continuar sem cache
      console.error('Erro no middleware de cache:', error.message);
      next();
    }
  };
}

/**
 * Helper para gerar chave de cache baseada em query params
 * @param {object} req - Request object
 * @param {string} prefix - Prefixo
 * @returns {string}
 */
export function generateKeyFromQuery(req, prefix) {
  return generateCacheKey(prefix, {
    path: req.path,
    query: req.query,
    userId: req.user?.id,
  });
}

export default cacheMiddleware;

