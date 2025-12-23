// Configuração de conexão com Redis
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obter o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env do diretório backend
dotenv.config({ path: join(__dirname, '../../.env') });

// Cliente Redis singleton
let redis = null;
let redisEnabled = true;
let redisConnectionFailed = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

/**
 * Conecta ao Redis
 * @returns {Promise<Redis|null>}
 */
export async function connectRedis() {
  try {
    // Verificar se Redis está habilitado
    redisEnabled = (process.env.REDIS_ENABLED || 'true').toLowerCase() === 'true';
    
    if (!redisEnabled) {
      console.log('⚠️ Redis desabilitado via REDIS_ENABLED=false');
      return null;
    }

    // Se já existe uma instância conectada, retornar
    if (redis && redis.status === 'ready') {
      return redis;
    }

    // Se já tentamos reconectar muitas vezes, não tentar mais
    if (redisConnectionFailed && reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn('⚠️ Redis: Muitas tentativas de reconexão falharam. Modo offline permanente até reiniciar o servidor.');
      // Fechar conexão existente se houver
      if (redis) {
        try {
          redis.disconnect(false); // Desconectar sem tentar reconectar
        } catch (e) {
          // Ignorar erros
        }
        redis = null;
      }
      return null;
    }

    // Se já existe uma instância tentando conectar, não criar nova
    if (redis && (redis.status === 'connecting' || redis.status === 'reconnecting')) {
      return redis;
    }

    // Se existe uma instância mas está em erro, fechar antes de criar nova
    if (redis && redis.status === 'end') {
      try {
        redis.disconnect(false);
      } catch (e) {
        // Ignorar erros
      }
      redis = null;
    }

    const config = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      db: parseInt(process.env.REDIS_DB || '0', 10),
      retryStrategy: (times) => {
        reconnectAttempts = times;
        // Limitar tentativas de reconexão
        if (times > MAX_RECONNECT_ATTEMPTS) {
          console.warn(`⚠️ Redis: Limite de ${MAX_RECONNECT_ATTEMPTS} tentativas de reconexão atingido. Modo offline.`);
          redisConnectionFailed = true;
          // Desconectar completamente para parar tentativas
          if (redis) {
            try {
              redis.disconnect(false);
            } catch (e) {
              // Ignorar erros
            }
          }
          return null; // Para reconexão
        }
        const delay = Math.min(times * 100, 2000);
        return delay;
      },
      maxRetriesPerRequest: 1, // Reduzir tentativas por requisição
      enableReadyCheck: true,
      lazyConnect: false, // Conectar imediatamente para detectar problemas cedo
      connectTimeout: 10000, // Timeout de 10 segundos (aumentado para evitar timeouts)
      commandTimeout: 5000, // Timeout para comandos individuais
      enableOfflineQueue: false, // Não enfileirar comandos quando offline
      showFriendlyErrorStack: false, // Reduzir verbosidade de erros
    };

    // Adicionar senha se configurada
    if (process.env.REDIS_PASSWORD) {
      config.password = process.env.REDIS_PASSWORD;
    }

    redis = new Redis(config);

    // Event listeners
    redis.on('connect', () => {
      console.log('🔄 Conectando ao Redis...');
    });

    redis.on('ready', () => {
      console.log('✅ Conectado ao Redis:', `${config.host}:${config.port}`);
    });

    redis.on('error', (error) => {
      const errorMsg = error.message || String(error);
      if (errorMsg.includes('ECONNREFUSED') || errorMsg.includes('connect')) {
        if (reconnectAttempts === 0) {
          console.warn('⚠️ Redis não disponível. Sistema funcionará em modo offline.');
        }
      } else {
        console.error('❌ Erro no Redis:', errorMsg);
      }
      redisConnectionFailed = true;
    });

    redis.on('close', () => {
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        console.log('⚠️ Conexão Redis fechada');
      }
    });

    redis.on('reconnecting', (delay) => {
      // reconnectAttempts é atualizado pelo retryStrategy
      if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
        console.log(`🔄 Reconectando ao Redis... (tentativa ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
      }
    });

    // Tentar conectar com timeout
    // O Redis com lazyConnect=false conecta automaticamente, mas vamos aguardar para verificar
    try {
      await Promise.race([
        new Promise((resolve, reject) => {
          if (redis.status === 'ready') {
            resolve();
            return;
          }
          // Aguardar evento ready ou error
          const timeout = setTimeout(() => {
            reject(new Error('Timeout ao conectar ao Redis'));
          }, 5000);
          
          redis.once('ready', () => {
            clearTimeout(timeout);
            resolve();
          });
          
          redis.once('error', (err) => {
            clearTimeout(timeout);
            reject(err);
          });
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        )
      ]);
      
      // Verificar conexão com ping
      await redis.ping();
      // Resetar contadores em caso de sucesso
      redisConnectionFailed = false;
      reconnectAttempts = 0;
    } catch (error) {
      // Se falhar na conexão inicial, marcar como falha mas não bloquear
      redisConnectionFailed = true;
      reconnectAttempts++;
      const errorMsg = error.message || String(error);
      if (!errorMsg.includes('Timeout') && !errorMsg.includes('ECONNREFUSED')) {
        console.warn('⚠️ Não foi possível conectar ao Redis na inicialização:', errorMsg);
      } else {
        console.warn('⚠️ Redis não disponível na inicialização. Sistema funcionará em modo offline.');
      }
      // Deixar o retryStrategy gerenciar reconexões futuras (limitadas)
    }
    
    return redis;
  } catch (error) {
    const errorMsg = error.message || String(error);
    if (!errorMsg.includes('Timeout')) {
      console.error('❌ Erro ao conectar ao Redis:', errorMsg);
    }
    console.warn('⚠️ AVISO: Redis indisponível. Sistema funcionará em modo offline.');
    redisConnectionFailed = true;
    reconnectAttempts++;
    // Não definir redis como null aqui, deixar o cliente tentar reconectar
    return null;
  }
}

/**
 * Retorna o cliente Redis
 * @returns {Redis|null}
 */
export function getRedis() {
  if (!redisEnabled) {
    return null;
  }
  return redis;
}

/**
 * Verifica se Redis está disponível
 * @returns {Promise<boolean>}
 */
export async function isRedisAvailable() {
  if (!redisEnabled || !redis || redisConnectionFailed) {
    return false;
  }
  
  try {
    // Verificar status sem fazer ping se já sabemos que está offline
    if (redis.status !== 'ready' && redis.status !== 'connecting') {
      return false;
    }
    await redis.ping();
    return redis.status === 'ready';
  } catch (error) {
    redisConnectionFailed = true;
    return false;
  }
}

/**
 * Fecha a conexão com Redis
 */
export async function closeRedis() {
  if (redis) {
    try {
      await redis.quit();
    } catch (error) {
      // Ignorar erros ao fechar
    }
    redis = null;
    redisConnectionFailed = false;
    reconnectAttempts = 0;
    console.log('Conexão com Redis fechada');
  }
}

export default {
  connectRedis,
  getRedis,
  isRedisAvailable,
  closeRedis,
};

