import express from 'express';
import { getPrisma } from '../config/database.js';
import slugify from 'slugify';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';

const router = express.Router();

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ error: 'Erro ao listar categorias' });
  }
});

// Obter categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const category = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        tutorials: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error('Erro ao obter categoria:', error);
    res.status(500).json({ error: 'Erro ao obter categoria' });
  }
});

// Criar categoria
router.post('/', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { name, description, icon, color, imageUrl, sortOrder } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon,
        color,
        imageUrl,
        sortOrder: sortOrder || 0,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

// Atualizar categoria
router.put('/:id', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { name, description, icon, color, imageUrl, sortOrder, isActive } = req.body;

    const updateData = { description, icon, color, imageUrl, sortOrder, isActive };

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true, strict: true });
    }

    const category = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
    });

    res.json(category);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});

// Deletar categoria
router.delete('/:id', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
});

export default router;
