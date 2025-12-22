import express from 'express';
import { getPrisma } from '../config/database.js';
import slugify from 'slugify';
import { randomUUID } from 'crypto';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

// Helper function to get all category IDs including children (recursive)
async function getAllCategoryIds(prisma, categoryId) {
  const categoryIds = [categoryId];
  
  // Get direct children
  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
    select: { id: true },
  });
  
  // Recursively get children of children
  for (const child of children) {
    const childIds = await getAllCategoryIds(prisma, child.id);
    categoryIds.push(...childIds);
  }
  
  return categoryIds;
}

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
    const { categoryId, published, isPublished, featured } = req.query;

    const where = {};
    
    // If categoryId is provided, include tutorials from that category and all its subcategories
    if (categoryId) {
      const categoryIdInt = parseInt(categoryId);
      const allCategoryIds = await getAllCategoryIds(prisma, categoryIdInt);
      where.categoryId = { in: allCategoryIds };
    }
    
    // Aceitar tanto 'published' quanto 'isPublished' no query string
    const publishedParam = published !== undefined ? published : isPublished;
    if (publishedParam !== undefined) {
      where.isPublished = publishedParam === 'true' || publishedParam === true;
    }
    if (featured !== undefined) where.isFeatured = featured === 'true';

    // Calcular data de 30 dias atrás
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const tutorials = await prisma.tutorial.findMany({
      where,
      include: {
        category: {
          include: {
            parent: true,
          },
        },
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

    // Adicionar contagem de views dos últimos 30 dias para cada tutorial
    const tutorialsWithViews = await Promise.all(
      tutorials.map(async (tutorial) => {
        let viewsLast30Days = 0;
        try {
          viewsLast30Days = await prisma.tutorialView.count({
            where: {
              tutorialId: tutorial.id,
              createdAt: {
                gte: thirtyDaysAgo,
              },
            },
          });
        } catch (error) {
          // Se a tabela TutorialView não existir ainda, retorna 0
          console.warn(`Erro ao contar views dos últimos 30 dias para tutorial ${tutorial.id}:`, error.message);
        }
        return {
          ...tutorial,
          viewsLast30Days,
        };
      })
    );

    res.json({ data: tutorialsWithViews });
  } catch (error) {
    console.error('Erro ao listar tutoriais:', error);
    res.status(500).json({ error: 'Erro ao listar tutoriais' });
  }
});

// Buscar tutorial por hash de compartilhamento (deve vir antes de /:id)
router.get('/by-hash/:hash', async (req, res) => {
  try {
    const prisma = getPrisma();
    const hash = req.params.hash;
    
    const tutorial = await prisma.tutorial.findUnique({
      where: { shareHash: hash },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
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

    res.json({ data: tutorial });
  } catch (error) {
    console.error('Erro ao obter tutorial por hash:', error);
    res.status(500).json({ error: 'Erro ao obter tutorial' });
  }
});

// Obter tutorial por ID ou slug
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const param = req.params.id;
    
    // Tentar determinar se é ID numérico ou slug
    const isNumeric = !isNaN(param) && !isNaN(parseInt(param));
    
    // Buscar por ID ou slug
    const tutorial = await prisma.tutorial.findUnique({
      where: isNumeric ? { id: parseInt(param) } : { slug: param },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
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

    // Obter IP e User Agent da requisição
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    // Incrementar view count e registrar visualização
    // Fazer de forma independente para garantir que o tutorial seja retornado mesmo se houver erro
    try {
      await prisma.tutorial.update({
        where: { id: tutorial.id },
        data: { viewCount: { increment: 1 } },
      });
    } catch (err) {
      console.warn('Erro ao incrementar view count:', err.message);
    }

    // Tentar registrar visualização se o modelo TutorialView estiver disponível
    if (prisma.tutorialView && typeof prisma.tutorialView.create === 'function') {
      try {
        await prisma.tutorialView.create({
          data: {
            tutorialId: tutorial.id,
            ipAddress: ipAddress ? ipAddress.split(',')[0].trim() : null,
            userAgent: userAgent,
          },
        });
      } catch (err) {
        // Se a tabela TutorialView não existir ainda (migration não rodada), apenas loga o erro
        console.warn('Erro ao registrar visualização (tabela pode não existir ainda):', err.message);
      }
    } else {
      console.warn('Prisma TutorialView model não está disponível. Execute: npx prisma generate');
    }

    res.json({ data: tutorial });
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
      tutorialSteps,
    } = req.body;

    // Validar título obrigatório
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    // Usar o ID do usuário autenticado
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const slug = slugify(title, { lower: true, strict: true });
    const shareHash = randomUUID().replace(/-/g, '').substring(0, 32); // Hash único de 32 caracteres

    const tutorial = await prisma.tutorial.create({
      data: {
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        content: content?.trim() || '', // Conteúdo pode ser vazio se tutorial usa passos
        categoryId: categoryId ? parseInt(categoryId) : null,
        thumbnailUrl: thumbnailUrl?.trim() || null,
        videoUrl: videoUrl?.trim() || null,
        difficulty: difficulty || null,
        estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
        tags: tags ? (Array.isArray(tags) ? JSON.stringify(tags) : tags) : null,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        shareHash,
        createdBy: userId,
        updatedBy: userId,
        tutorialSteps: tutorialSteps
          ? {
              create: tutorialSteps.map((step, index) => ({
                title: step.title,
                content: step.content || null,
                videoUrl: step.videoUrl || null,
                imageUrl: step.imageUrl || null,
                sortOrder: step.sortOrder || index + 1,
                duration: step.duration ? parseInt(step.duration) : null,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        tutorialSteps: true,
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'CREATE',
      entityType: 'Tutorial',
      entityId: tutorial.id,
      newValues: { title: tutorial.title, slug: tutorial.slug },
      ipAddress,
      userAgent,
    });

    res.status(201).json({ data: tutorial });
  } catch (error) {
    console.error('Erro ao criar tutorial:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Categoria ou usuário inválido' });
    }
    res.status(500).json({ 
      error: 'Erro ao criar tutorial',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
      tutorialSteps,
    } = req.body;

    // Usar o ID do usuário autenticado
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Verificar se tutorial já tem shareHash, se não, gerar
    const existingTutorial = await prisma.tutorial.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { shareHash: true },
    });

    const updateData = {
      description: description?.trim() || null,
      content: content?.trim() || '',
      categoryId: categoryId ? parseInt(categoryId) : null,
      thumbnailUrl: thumbnailUrl?.trim() || null,
      videoUrl: videoUrl?.trim() || null,
      difficulty: difficulty || null,
      estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
      tags: tags ? (Array.isArray(tags) ? JSON.stringify(tags) : tags) : null,
      metaTitle: metaTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      updatedBy: userId,
    };

    // Adicionar isPublished e isFeatured apenas se foram enviados
    if (isPublished !== undefined) {
      updateData.isPublished = Boolean(isPublished);
    }
    if (isFeatured !== undefined) {
      updateData.isFeatured = Boolean(isFeatured);
    }

    // Se não tem shareHash, gerar um novo
    if (!existingTutorial?.shareHash) {
      updateData.shareHash = randomUUID().replace(/-/g, '').substring(0, 32);
    }

    if (title) {
      updateData.title = title;
      updateData.slug = slugify(title, { lower: true, strict: true });
    }

    // Atualizar publishedAt baseado em isPublished
    if (isPublished !== undefined) {
      if (isPublished && !req.body.publishedAt) {
        // Se está sendo publicado e não tem publishedAt, definir agora
        updateData.publishedAt = new Date();
      } else if (!isPublished) {
        // Se está sendo despublicado, limpar publishedAt (opcional)
        // updateData.publishedAt = null; // Descomente se quiser limpar ao despublicar
      }
    }

    // Buscar valores antigos antes de atualizar
    const oldTutorial = await prisma.tutorial.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { title: true, isPublished: true, categoryId: true },
    });

    const tutorial = await prisma.tutorial.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
      include: {
        category: true,
        tutorialSteps: true,
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'UPDATE',
      entityType: 'Tutorial',
      entityId: tutorial.id,
      oldValues: oldTutorial,
      newValues: { title: tutorial.title, isPublished: tutorial.isPublished, categoryId: tutorial.categoryId },
      ipAddress,
      userAgent,
    });

    res.json({ data: tutorial });
  } catch (error) {
    console.error('Erro ao atualizar tutorial:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tutorial não encontrado' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Categoria ou usuário inválido' });
    }
    res.status(500).json({ 
      error: 'Erro ao atualizar tutorial',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Deletar tutorial
router.delete('/:id', authenticate, requirePermission('delete_tutorial'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const userId = req.user?.id;
    const tutorialId = parseInt(req.params.id);

    // Buscar tutorial antes de deletar para o log
    const tutorial = await prisma.tutorial.findUnique({
      where: { id: tutorialId },
      select: { id: true, title: true },
    });

    await prisma.tutorial.delete({
      where: { id: tutorialId },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'DELETE',
      entityType: 'Tutorial',
      entityId: tutorialId,
      oldValues: tutorial,
      ipAddress,
      userAgent,
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
