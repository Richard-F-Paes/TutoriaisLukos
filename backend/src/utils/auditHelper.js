// Helper para criar logs de auditoria automaticamente
import { getPrisma } from '../config/database.js';

/**
 * Cria um log de auditoria
 * @param {Object} options - Opções do log
 * @param {number} options.userId - ID do usuário que realizou a ação
 * @param {string} options.action - Ação realizada (CREATE, UPDATE, DELETE, LOGIN)
 * @param {string} options.entityType - Tipo da entidade (Tutorial, Training, User, Category, etc.)
 * @param {number} options.entityId - ID da entidade (opcional)
 * @param {Object} options.oldValues - Valores antigos (opcional)
 * @param {Object} options.newValues - Valores novos (opcional)
 * @param {string} options.ipAddress - Endereço IP (opcional)
 * @param {string} options.userAgent - User Agent (opcional)
 */
export async function createAuditLog({
  userId,
  action,
  entityType,
  entityId = null,
  oldValues = null,
  newValues = null,
  ipAddress = null,
  userAgent = null,
}) {
  try {
    const prisma = getPrisma();
    
    // Verificar se o prisma está disponível (não está em modo offline)
    if (!prisma || !prisma.auditLog || typeof prisma.auditLog.create !== 'function') {
      console.warn('Audit log não disponível (banco offline ou não configurado)');
      return null;
    }

    await prisma.auditLog.create({
      data: {
        userId: userId ? parseInt(userId) : null,
        action,
        entityType,
        entityId: entityId ? parseInt(entityId) : null,
        oldValues: oldValues ? JSON.stringify(oldValues) : null,
        newValues: newValues ? JSON.stringify(newValues) : null,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    // Não quebrar a aplicação se houver erro ao criar log
    console.error('Erro ao criar log de auditoria:', error);
  }
}

/**
 * Helper para obter IP e User Agent da requisição
 */
export function getRequestInfo(req) {
  const ipAddress = req.ip || req.connection?.remoteAddress || req.headers['x-forwarded-for'] || null;
  const userAgent = req.headers['user-agent'] || null;
  return { ipAddress, userAgent };
}

