import express from 'express';
import { getPrisma } from '../config/database.js';
import slugify from 'slugify';

const router = express.Router();

// Listar tutoriais
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const { categoryId, published, featured } = req.query;

    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (published !== undefined) where.isPublished = published === 'true';
    if (featured !== undefined) where.isFeatured = featured === 'true';

    const tutorials = await prisma.tutorial.findMany({
      where,
      include: {
        category: true,
        creator: {
          select: { id: true, name: true, username: true },
        },
        updater: {
          select: { id: true, name: true, username: true },
        },
        tutorialSteps: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(tutorials);
  } catch (error) {
    console.error('Erro ao listar tutoriais:', error);
    res.status(500).json({ error: 'Erro ao listar tutoriais' });
  }
});

// Obter tutorial por ID
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const tutorial = await prisma.tutorial.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        category: true,
        creator: {
          select: { id: true, name: true, username: true },
        },
        updater: {
          select: { id: true, name: true, username: true },
        },
        tutorialSteps: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial não encontrado' });
    }

    // Incrementar view count
    await prisma.tutorial.update({
      where: { id: tutorial.id },
      data: { viewCount: { increment: 1 } },
    });

    res.json(tutorial);
  } catch (error) {
    console.error('Erro ao obter tutorial:', error);
    res.status(500).json({ error: 'Erro ao obter tutorial' });
  }
});

// Criar tutorial
router.post('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      title,
      description,
      content,
      categoryId,
      thumbnailUrl,
      videoUrl,
      difficulty,
      estimatedDuration,
      tags,
      metaTitle,
      metaDescription,
      createdBy,
      updatedBy,
      tutorialSteps,
    } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const tutorial = await prisma.tutorial.create({
      data: {
        title,
        slug,
        description,
        content,
        categoryId: categoryId ? parseInt(categoryId) : null,
        thumbnailUrl,
        videoUrl,
        difficulty,
        estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
        tags: tags ? JSON.stringify(tags) : null,
        metaTitle,
        metaDescription,
        createdBy: parseInt(createdBy),
        updatedBy: parseInt(updatedBy),
        tutorialSteps: tutorialSteps
          ? {
              create: tutorialSteps.map((step, index) => ({
                title: step.title,
                content: step.content,
                videoUrl: step.videoUrl,
                imageUrl: step.imageUrl,
                sortOrder: step.sortOrder || index + 1,
                duration: step.duration,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        tutorialSteps: true,
      },
    });

    res.status(201).json(tutorial);
  } catch (error) {
    console.error('Erro ao criar tutorial:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar tutorial' });
  }
});

// Atualizar tutorial
router.put('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      title,
      description,
      content,
      categoryId,
      thumbnailUrl,
      videoUrl,
      difficulty,
      estimatedDuration,
      isPublished,
      isFeatured,
      tags,
      metaTitle,
      metaDescription,
      updatedBy,
      tutorialSteps,
    } = req.body;

    const updateData = {
      description,
      content,
      categoryId: categoryId ? parseInt(categoryId) : null,
      thumbnailUrl,
      videoUrl,
      difficulty,
      estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
      isPublished,
      isFeatured,
      tags: tags ? JSON.stringify(tags) : null,
      metaTitle,
      metaDescription,
      updatedBy: parseInt(updatedBy),
    };

    if (title) {
      updateData.title = title;
      updateData.slug = slugify(title, { lower: true, strict: true });
    }

    if (isPublished && !req.body.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const tutorial = await prisma.tutorial.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
      include: {
        category: true,
        tutorialSteps: true,
      },
    });

    res.json(tutorial);
  } catch (error) {
    console.error('Erro ao atualizar tutorial:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tutorial não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar tutorial' });
  }
});

// Deletar tutorial
router.delete('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    await prisma.tutorial.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: 'Tutorial deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar tutorial:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tutorial não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar tutorial' });
  }
});

export default router;
