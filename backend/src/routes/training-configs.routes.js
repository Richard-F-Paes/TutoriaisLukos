import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

// Listar todas as configurações (público - para uso em formulários)
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const type = req.query.type; // Filtrar por tipo se fornecido
    
    const where = {
      isActive: true,
      ...(type && { type }),
    };
    
    const configs = await prisma.trainingConfiguration.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { label: 'asc' },
      ],
    });
    
    res.json(configs);
  } catch (error) {
    console.error('Erro ao listar configurações de treinamento:', error);
    res.status(500).json({ error: 'Erro ao listar configurações de treinamento' });
  }
});

// Listar configurações por tipo (público - para uso em formulários)
router.get('/type/:type', async (req, res) => {
  try {
    const prisma = getPrisma();
    const { type } = req.params;
    
    const configs = await prisma.trainingConfiguration.findMany({
      where: {
        type,
        isActive: true,
      },
      orderBy: [
        { sortOrder: 'asc' },
        { label: 'asc' },
      ],
    });
    
    res.json(configs);
  } catch (error) {
    console.error('Erro ao listar configurações por tipo:', error);
    res.status(500).json({ error: 'Erro ao listar configurações por tipo' });
  }
});

// Obter configuração por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const config = await prisma.trainingConfiguration.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    
    if (!config) {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }
    
    res.json(config);
  } catch (error) {
    console.error('Erro ao obter configuração:', error);
    res.status(500).json({ error: 'Erro ao obter configuração' });
  }
});

// Criar configuração (requer autenticação)
router.post('/', authenticate, requirePermission('manage_training_configs'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { type, value, label, sortOrder, isActive, metadata } = req.body;
    
    // Validações
    if (!type || !type.trim()) {
      return res.status(400).json({ error: 'Tipo é obrigatório' });
    }
    if (!value || !value.trim()) {
      return res.status(400).json({ error: 'Valor é obrigatório' });
    }
    if (!label || !label.trim()) {
      return res.status(400).json({ error: 'Label é obrigatório' });
    }
    
    const config = await prisma.trainingConfiguration.create({
      data: {
        type: type.trim(),
        value: value.trim(),
        label: label.trim(),
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
        metadata: metadata || null,
      },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'CREATE',
        entityType: 'TrainingConfiguration',
        entityId: config.id,
        newValues: { type: config.type, value: config.value, label: config.label, sortOrder: config.sortOrder, isActive: config.isActive },
        ipAddress,
        userAgent,
      });
    }
    
    res.status(201).json(config);
  } catch (error) {
    console.error('Erro ao criar configuração:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Configuração duplicada' });
    }
    res.status(500).json({ error: 'Erro ao criar configuração' });
  }
});

// Atualizar configuração (requer autenticação)
router.put('/:id', authenticate, requirePermission('manage_training_configs'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const configId = parseInt(req.params.id);
    const { type, value, label, sortOrder, isActive, metadata } = req.body;
    
    // Verificar se existe
    const existingConfig = await prisma.trainingConfiguration.findUnique({
      where: { id: configId },
    });
    
    if (!existingConfig) {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }
    
    // Preparar dados para atualização
    const updateData = {};
    
    if (type !== undefined) updateData.type = type.trim();
    if (value !== undefined) updateData.value = value.trim();
    if (label !== undefined) updateData.label = label.trim();
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (metadata !== undefined) updateData.metadata = metadata || null;
    
    // Validações
    if (updateData.type && !updateData.type) {
      return res.status(400).json({ error: 'Tipo não pode ser vazio' });
    }
    if (updateData.value && !updateData.value) {
      return res.status(400).json({ error: 'Valor não pode ser vazio' });
    }
    if (updateData.label && !updateData.label) {
      return res.status(400).json({ error: 'Label não pode ser vazio' });
    }
    
    const config = await prisma.trainingConfiguration.update({
      where: { id: configId },
      data: updateData,
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'UPDATE',
        entityType: 'TrainingConfiguration',
        entityId: configId,
        oldValues: { type: existingConfig.type, value: existingConfig.value, label: existingConfig.label, sortOrder: existingConfig.sortOrder, isActive: existingConfig.isActive },
        newValues: { type: config.type, value: config.value, label: config.label, sortOrder: config.sortOrder, isActive: config.isActive },
        ipAddress,
        userAgent,
      });
    }
    
    res.json(config);
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao atualizar configuração' });
  }
});

// Excluir configuração (requer autenticação)
router.delete('/:id', authenticate, requirePermission('manage_training_configs'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const configId = parseInt(req.params.id);
    
    // Verificar se existe
    const existingConfig = await prisma.trainingConfiguration.findUnique({
      where: { id: configId },
    });
    
    if (!existingConfig) {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }
    
    await prisma.trainingConfiguration.delete({
      where: { id: configId },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'DELETE',
        entityType: 'TrainingConfiguration',
        entityId: configId,
        oldValues: { type: existingConfig.type, value: existingConfig.value, label: existingConfig.label, sortOrder: existingConfig.sortOrder, isActive: existingConfig.isActive },
        ipAddress,
        userAgent,
      });
    }
    
    res.json({ message: 'Configuração excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir configuração:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao excluir configuração' });
  }
});

export default router;

