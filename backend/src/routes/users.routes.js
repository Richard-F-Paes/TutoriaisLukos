import express from 'express';
import { getPrisma } from '../config/database.js';
import bcrypt from 'bcryptjs';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

// Listar usuários
router.get('/', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Obter usuário por ID
router.get('/:id', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: 'Erro ao obter usuário' });
  }
});

// Criar usuário
router.post('/', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { username, password, name, role } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Username, senha e nome são obrigatórios' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        name,
        role: role || 'suporte',
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'CREATE',
      entityType: 'User',
      entityId: user.id,
      newValues: { username: user.username, name: user.name, role: user.role },
      ipAddress,
      userAgent,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Username já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/:id', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const userId = req.user?.id;
    const targetUserId = parseInt(req.params.id);
    const { username, password, name, role, isActive } = req.body;

    // Buscar valores antigos antes de atualizar
    const oldUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, username: true, name: true, role: true, isActive: true },
    });

    if (!oldUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updateData = { username, name, role, isActive };

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: targetUserId },
      data: updateData,
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'UPDATE',
      entityType: 'User',
      entityId: targetUserId,
      oldValues: oldUser,
      newValues: { username: user.username, name: user.name, role: user.role, isActive: user.isActive },
      ipAddress,
      userAgent,
    });

    res.json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Username já existe' });
    }
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Alterar senha do usuário
router.post('/:id/password', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { passwordHash },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
});

// Excluir usuário permanentemente (HARD DELETE)
// Observação: por segurança, só permite excluir se não houver relações (tutoriais/mídia/logs).
router.delete('/:id/permanent', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const userId = req.user?.id;
    const id = parseInt(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    // Evita deletar o próprio usuário logado
    if (req.user?.id === id) {
      return res.status(400).json({ error: 'Você não pode excluir seu próprio usuário' });
    }

    const existing = await prisma.user.findUnique({ where: { id }, select: { id: true, username: true, name: true, role: true } });
    if (!existing) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Bloquear exclusão se houver dados vinculados (evita erro de FK e perda de histórico)
    const [createdTutorials, updatedTutorials, uploadedMedia, auditLogs] = await Promise.all([
      prisma.tutorial.count({ where: { createdBy: id } }),
      prisma.tutorial.count({ where: { updatedBy: id } }),
      prisma.media.count({ where: { uploadedBy: id } }),
      prisma.auditLog.count({ where: { userId: id } }),
    ]);

    const totalRefs = createdTutorials + updatedTutorials + uploadedMedia + auditLogs;
    if (totalRefs > 0) {
      return res.status(400).json({
        error: 'Não é possível excluir: usuário possui registros vinculados. Use “Desativado”.',
        details: {
          createdTutorials,
          updatedTutorials,
          uploadedMedia,
          auditLogs,
        },
      });
    }

    await prisma.user.delete({ where: { id } });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'DELETE',
      entityType: 'User',
      entityId: id,
      oldValues: existing,
      ipAddress,
      userAgent,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir usuário permanentemente:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário permanentemente' });
  }
});

// Deletar usuário
router.delete('/:id', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: false },
    });

    res.json({ message: 'Usuário desativado com sucesso' });
  } catch (error) {
    console.error('Erro ao desativar usuário:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao desativar usuário' });
  }
});

export default router;
