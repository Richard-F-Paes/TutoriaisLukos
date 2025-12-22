// Script para limpar chaves de rate limiting do Redis
import { connectRedis, getRedis } from '../config/redis.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: join(__dirname, '../../.env') });

async function clearRateLimit() {
  try {
    console.log('🔄 Conectando ao Redis...');
    await connectRedis();
    
    const redis = getRedis();
    if (!redis) {
      console.error('❌ Redis não está disponível');
      process.exit(1);
    }

    // Buscar todas as chaves de rate limiting
    console.log('🔍 Buscando chaves de rate limiting...');
    const keys = await redis.keys('ratelimit:*');
    
    if (keys.length === 0) {
      console.log('✅ Nenhuma chave de rate limiting encontrada');
      await redis.quit();
      process.exit(0);
    }

    console.log(`📋 Encontradas ${keys.length} chave(s) de rate limiting:`);
    keys.forEach(key => console.log(`   - ${key}`));

    // Deletar todas as chaves
    console.log('🗑️  Removendo chaves...');
    const deleted = await redis.del(...keys);
    
    console.log(`✅ Limpeza concluída: ${deleted} chave(s) removida(s)`);
    
    await redis.quit();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao limpar rate limiting:', error.message);
    process.exit(1);
  }
}

clearRateLimit();

