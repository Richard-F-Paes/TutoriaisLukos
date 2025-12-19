import express from 'express';
import { getPrisma } from '../config/database.js';
import bcrypt from 'bcryptjs';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';

const router = express.Router();

// Listar usuários
router.get('/', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
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
        email: true,
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
    const { username, email, password, name, role } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        name,
        role: role || 'suporte',
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Username ou email já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/:id', authenticate, requirePermission('manage_users'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { username, email, password, name, role, isActive } = req.body;

    const updateData = { username, email, name, role, isActive };

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Username ou email já existe' });
    }
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
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
