import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';

const router = express.Router();

// Listar logs de auditoria
router.get('/', authenticate, requirePermission('view_audit_logs'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { userId, entityType, entityId, action, startDate, endDate, limit = 100 } = req.query;

    const where = {};
    if (userId) where.userId = parseInt(userId);
    if (entityType) where.entityType = entityType;
    if (entityId) where.entityId = parseInt(entityId);
    if (action) where.action = action;
    
    // Filtros de data
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        // Adicionar 23:59:59 ao final do dia
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        where.createdAt.lte = endDateTime;
      }
    }

    const logs = await prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: { id: true, username: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
    });

    res.json(logs);
  } catch (error) {
    console.error('Erro ao listar logs:', error);
    res.status(500).json({ error: 'Erro ao listar logs de auditoria' });
  }
});

// Obter log por ID
router.get('/:id', authenticate, requirePermission('view_audit_logs'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const log = await prisma.auditLog.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: {
          select: { id: true, username: true, name: true },
        },
      },
    });

    if (!log) {
      return res.status(404).json({ error: 'Log não encontrado' });
    }

    res.json(log);
  } catch (error) {
    console.error('Erro ao obter log:', error);
    res.status(500).json({ error: 'Erro ao obter log de auditoria' });
  }
});

// Criar log de auditoria
router.post('/', authenticate, requirePermission('view_audit_logs'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      userId,
      action,
      entityType,
      entityId,
      oldValues,
      newValues,
      ipAddress,
      userAgent,
    } = req.body;

    const log = await prisma.auditLog.create({
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
      include: {
        user: {
          select: { id: true, username: true, name: true },
        },
      },
    });

    res.status(201).json(log);
  } catch (error) {
    console.error('Erro ao criar log:', error);
    res.status(500).json({ error: 'Erro ao criar log de auditoria' });
  }
});

export default router;
