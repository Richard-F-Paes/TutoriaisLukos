import express from 'express';
import { getPrisma } from '../config/database.js';
import slugify from 'slugify';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';

const router = express.Router();

// =========================
// Passos do Tutorial (CRUD)
// =========================

// Listar passos de um tutorial
router.get('/:tutorialId/steps', async (req, res) => {
  try {
    const prisma = getPrisma();
    const tutorialId = parseInt(req.params.tutorialId);
    const steps = await prisma.tutorialStep.findMany({
      where: { tutorialId },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ data: steps });
  } catch (error) {
    console.error('Erro ao listar passos:', error);
    res.status(500).json({ error: 'Erro ao listar passos' });
  }
});

// Criar passo
router.post('/:tutorialId/steps', authenticate, requirePermission('edit_tutorial'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const tutorialId = parseInt(req.params.tutorialId);
    const { title, content, videoUrl, imageUrl, sortOrder, duration } = req.body;

    // sortOrder default: last
    let finalSortOrder = sortOrder ? parseInt(sortOrder) : null;
    if (!finalSortOrder) {
      const last = await prisma.tutorialStep.findFirst({
        where: { tutorialId },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true },
      });
      finalSortOrder = (last?.sortOrder || 0) + 1;
    }

    const step = await prisma.tutorialStep.create({
      data: {
        tutorialId,
        title,
        content,
        videoUrl,
        imageUrl,
        sortOrder: finalSortOrder,
        duration: duration ? parseInt(duration) : null,
      },
    });

    res.status(201).json({ data: step });
  } catch (error) {
    console.error('Erro ao criar passo:', error);
    res.status(500).json({ error: 'Erro ao criar passo' });
  }
});

// Atualizar passo
router.put('/:tutorialId/steps/:stepId', authenticate, requirePermission('edit_tutorial'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const tutorialId = parseInt(req.params.tutorialId);
    const stepId = parseInt(req.params.stepId);
    const { title, content, videoUrl, imageUrl, sortOrder, duration } = req.body;

    const step = await prisma.tutorialStep.update({
      where: { id: stepId },
      data: {
        title,
        content,
        videoUrl,
        imageUrl,
        sortOrder: sortOrder ? parseInt(sortOrder) : undefined,
        duration: duration === null || duration === undefined ? undefined : parseInt(duration),
      },
    });

    // Safety: ensure belongs to tutorial
    if (step.tutorialId !== tutorialId) {
      return res.status(400).json({ error: 'Step does not belong to tutorial' });
    }

    res.json({ data: step });
  } catch (error) {
    console.error('Erro ao atualizar passo:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Passo não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar passo' });
  }
});

// Deletar passo
router.delete('/:tutorialId/steps/:stepId', authenticate, requirePermission('edit_tutorial'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const tutorialId = parseInt(req.params.tutorialId);
    const stepId = parseInt(req.params.stepId);

    const step = await prisma.tutorialStep.findUnique({ where: { id: stepId } });
    if (!step || step.tutorialId !== tutorialId) {
      return res.status(404).json({ error: 'Passo não encontrado' });
    }

    await prisma.tutorialStep.delete({ where: { id: stepId } });
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar passo:', error);
    res.status(500).json({ error: 'Erro ao deletar passo' });
  }
});

// Reordenar passos
router.post('/:tutorialId/steps/reorder', authenticate, requirePermission('edit_tutorial'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const tutorialId = parseInt(req.params.tutorialId);
    const { stepIds, steps } = req.body;

    let orderedIds = stepIds;
    if (!orderedIds && Array.isArray(steps)) {
      orderedIds = steps.map((s) => s.id);
    }

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({ error: 'stepIds is required' });
    }

    // Transaction: update sortOrder based on order
    await prisma.$transaction(
      orderedIds.map((id, idx) =>
        prisma.tutorialStep.update({
          where: { id: parseInt(id) },
          data: { sortOrder: idx + 1 },
        })
      )
    );

    const updated = await prisma.tutorialStep.findMany({
      where: { tutorialId },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({ data: updated });
  } catch (error) {
    console.error('Erro ao reordenar passos:', error);
    res.status(500).json({ error: 'Erro ao reordenar passos' });
  }
});

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
router.post('/', authenticate, requirePermission('create_tutorial'), async (req, res) => {
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
router.put('/:id', authenticate, requirePermission('edit_tutorial'), async (req, res) => {
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
router.delete('/:id', authenticate, requirePermission('delete_tutorial'), async (req, res) => {
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
