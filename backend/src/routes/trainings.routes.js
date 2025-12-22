import express from 'express';
import { getPrisma } from '../config/database.js';
import slugify from 'slugify';
import { randomUUID } from 'crypto';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { uploadTrainingVideo } from '../config/upload.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper para serializar BigInt em objetos de vídeo
const serializeVideo = (video) => {
  if (!video) return null;
  if (Array.isArray(video)) {
    return video.map(serializeVideo);
  }
  
  const serialized = { ...video };
  
  // Converter BigInt em fileSize para string
  if (typeof serialized.fileSize === 'bigint') {
    serialized.fileSize = serialized.fileSize.toString();
  }
  
  return serialized;
};

// Helper para serializar BigInt em objetos de treinamento
const serializeTraining = (training) => {
  if (!training) return null;
  if (Array.isArray(training)) {
    return training.map(serializeTraining);
  }
  
  const serialized = { ...training };
  
  // Converter BigInt em fileSize dos vídeos para string
  if (serialized.videos && Array.isArray(serialized.videos)) {
    serialized.videos = serializeVideo(serialized.videos);
  }
  
  // Converter BigInt diretamente se houver (caso específico)
  if (typeof serialized.fileSize === 'bigint') {
    serialized.fileSize = serialized.fileSize.toString();
  }
  
  return serialized;
};

// Garantir que o diretório de treinamentos existe
const trainingsDir = join(__dirname, '../../uploads/trainings');
if (!fs.existsSync(trainingsDir)) {
  fs.mkdirSync(trainingsDir, { recursive: true });
}

// Helper function to get all category IDs including children (recursive)
async function getAllCategoryIds(prisma, categoryId) {
  const categoryIds = [categoryId];
  
  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
    select: { id: true },
  });
  
  for (const child of children) {
    const childIds = await getAllCategoryIds(prisma, child.id);
    categoryIds.push(...childIds);
  }
  
  return categoryIds;
}

// Helper function to generate a unique slug
async function generateUniqueSlug(prisma, baseTitle, excludeId = null) {
  let baseSlug = slugify(baseTitle, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await prisma.training.findFirst({
      where: {
        slug: slug,
        ...(excludeId && { id: { not: excludeId } })
      },
      select: { id: true }
    });
    
    if (!existing) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
    
    // Safety check to prevent infinite loop
    if (counter > 1000) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }
  
  return slug;
}

// Helper function to generate a unique shareHash
async function generateUniqueShareHash(prisma, excludeId = null) {
  let shareHash;
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    shareHash = randomUUID().replace(/-/g, '').substring(0, 32);
    
    const existing = await prisma.training.findFirst({
      where: {
        shareHash,
        ...(excludeId && { id: { not: excludeId } })
      },
      select: { id: true }
    });
    
    if (!existing) {
      return shareHash;
    }
    
    attempts++;
  }
  
  // Fallback: use timestamp if all attempts fail
  return `${randomUUID().replace(/-/g, '').substring(0, 24)}${Date.now().toString(36)}`.substring(0, 32);
}

// =========================
// Vídeos de Treinamento (CRUD)
// =========================

// Listar vídeos de um treinamento
router.get('/:trainingId/videos', async (req, res) => {
  try {
    const prisma = getPrisma();
    const trainingId = parseInt(req.params.trainingId);
    
    const videos = await prisma.trainingVideo.findMany({
      where: { trainingId },
      orderBy: { sortOrder: 'asc' },
    });
    
    res.json({ data: serializeVideo(videos) });
  } catch (error) {
    console.error('Erro ao listar vídeos:', error);
    res.status(500).json({ error: 'Erro ao listar vídeos' });
  }
});

// Upload de vídeo para treinamento
router.post('/:trainingId/videos', authenticate, requirePermission('edit_training'), uploadTrainingVideo.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo de vídeo enviado' });
    }

    const prisma = getPrisma();
    const trainingId = parseInt(req.params.trainingId);
    
    // Verificar se o treinamento existe
    const training = await prisma.training.findUnique({
      where: { id: trainingId },
    });
    
    if (!training) {
      // Deletar arquivo se treinamento não existir
      const filePath = join(__dirname, '../../uploads/trainings', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(404).json({ error: 'Treinamento não encontrado' });
    }

    // Obter último sortOrder
    const lastVideo = await prisma.trainingVideo.findFirst({
      where: { trainingId },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });
    
    const sortOrder = (lastVideo?.sortOrder || 0) + 1;
    
    // Caminho relativo para salvar no banco
    const filePath = `/uploads/trainings/${req.file.filename}`;

    const video = await prisma.trainingVideo.create({
      data: {
        trainingId,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: filePath,
        fileSize: BigInt(req.file.size),
        sortOrder,
      },
    });

    res.status(201).json({ data: serializeVideo(video) });
  } catch (error) {
    console.error('Erro ao fazer upload de vídeo:', error);
    // Deletar arquivo em caso de erro
    if (req.file) {
      const filePath = join(__dirname, '../../uploads/trainings', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ error: 'Erro ao fazer upload de vídeo' });
  }
});

// Deletar vídeo de treinamento
router.delete('/:trainingId/videos/:videoId', authenticate, requirePermission('edit_training'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const trainingId = parseInt(req.params.trainingId);
    const videoId = parseInt(req.params.videoId);

    const video = await prisma.trainingVideo.findUnique({
      where: { id: videoId },
    });

    if (!video || video.trainingId !== trainingId) {
      return res.status(404).json({ error: 'Vídeo não encontrado' });
    }

    // Deletar arquivo físico
    const filePath = join(__dirname, '../../uploads/trainings', video.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Deletar do banco
    await prisma.trainingVideo.delete({
      where: { id: videoId },
    });

    res.json({ message: 'Vídeo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar vídeo:', error);
    res.status(500).json({ error: 'Erro ao deletar vídeo' });
  }
});

// Reordenar vídeos
router.put('/:trainingId/videos/reorder', authenticate, requirePermission('edit_training'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const trainingId = parseInt(req.params.trainingId);
    const { videoIds } = req.body;

    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      return res.status(400).json({ error: 'videoIds é obrigatório e deve ser um array' });
    }

    // Atualizar sortOrder de todos os vídeos
    await prisma.$transaction(
      videoIds.map((id, idx) =>
        prisma.trainingVideo.update({
          where: { id: parseInt(id) },
          data: { sortOrder: idx + 1 },
        })
      )
    );

    const updated = await prisma.trainingVideo.findMany({
      where: { trainingId },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({ data: serializeVideo(updated) });
  } catch (error) {
    console.error('Erro ao reordenar vídeos:', error);
    res.status(500).json({ error: 'Erro ao reordenar vídeos' });
  }
});

// =========================
// Treinamentos (CRUD)
// =========================

// Listar treinamentos
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const { categoryId, published, isPublished, featured } = req.query;

    const where = {};
    
    if (categoryId) {
      const categoryIdInt = parseInt(categoryId);
      const allCategoryIds = await getAllCategoryIds(prisma, categoryIdInt);
      where.categoryId = { in: allCategoryIds };
    }
    
    const publishedParam = published !== undefined ? published : isPublished;
    if (publishedParam !== undefined) {
      where.isPublished = publishedParam === 'true' || publishedParam === true;
    }
    if (featured !== undefined) where.isFeatured = featured === 'true';

    const trainings = await prisma.training.findMany({
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
        videos: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ data: serializeTraining(trainings) });
  } catch (error) {
    console.error('Erro ao listar treinamentos:', error);
    res.status(500).json({ error: 'Erro ao listar treinamentos' });
  }
});

// Obter treinamento por ID ou slug
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const param = req.params.id;
    
    const isNumeric = !isNaN(param) && !isNaN(parseInt(param));
    
    const training = await prisma.training.findUnique({
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
        videos: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!training) {
      return res.status(404).json({ error: 'Treinamento não encontrado' });
    }

    res.json({ data: serializeTraining(training) });
  } catch (error) {
    console.error('Erro ao obter treinamento:', error);
    res.status(500).json({ error: 'Erro ao obter treinamento' });
  }
});

// Criar treinamento
router.post('/', authenticate, requirePermission('create_training'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      title,
      description,
      categoryId,
      trainingType,
      thumbnailUrl,
      difficulty,
      estimatedDuration,
      tags,
      metaTitle,
      metaDescription,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Gerar slug único e shareHash único
    const slug = await generateUniqueSlug(prisma, title);
    const shareHash = await generateUniqueShareHash(prisma);

    const training = await prisma.training.create({
      data: {
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        trainingType: trainingType?.trim() || null,
        thumbnailUrl: thumbnailUrl?.trim() || null,
        difficulty: difficulty || null,
        estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
        tags: tags ? (Array.isArray(tags) ? JSON.stringify(tags) : tags) : null,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        shareHash,
        createdBy: userId,
        updatedBy: userId,
      },
      include: {
        category: true,
        videos: true,
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'CREATE',
      entityType: 'Training',
      entityId: training.id,
      newValues: { title: training.title, slug: training.slug },
      ipAddress,
      userAgent,
    });

    res.status(201).json({ data: serializeTraining(training) });
  } catch (error) {
    console.error('Erro ao criar treinamento:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Categoria ou usuário inválido' });
    }
    res.status(500).json({ 
      error: 'Erro ao criar treinamento',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Atualizar treinamento
router.put('/:id', authenticate, requirePermission('edit_training'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      title,
      description,
      categoryId,
      trainingType,
      thumbnailUrl,
      difficulty,
      estimatedDuration,
      isPublished,
      isFeatured,
      tags,
      metaTitle,
      metaDescription,
    } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const existingTraining = await prisma.training.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { shareHash: true, title: true, isPublished: true, categoryId: true },
    });

    if (!existingTraining) {
      return res.status(404).json({ error: 'Treinamento não encontrado' });
    }

    const updateData = {
      description: description?.trim() || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      trainingType: trainingType !== undefined ? (trainingType?.trim() || null) : undefined,
      thumbnailUrl: thumbnailUrl?.trim() || null,
      difficulty: difficulty || null,
      estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
      tags: tags ? (Array.isArray(tags) ? JSON.stringify(tags) : tags) : null,
      metaTitle: metaTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      updatedBy: userId,
    };

    if (isPublished !== undefined) {
      updateData.isPublished = Boolean(isPublished);
    }
    if (isFeatured !== undefined) {
      updateData.isFeatured = Boolean(isFeatured);
    }

    if (!existingTraining.shareHash) {
      const trainingId = parseInt(req.params.id);
      updateData.shareHash = await generateUniqueShareHash(prisma, trainingId);
    }

    if (title) {
      updateData.title = title.trim();
      // Gerar slug único, excluindo o ID atual do treinamento
      updateData.slug = await generateUniqueSlug(prisma, title, parseInt(req.params.id));
    }

    if (isPublished !== undefined) {
      if (isPublished && !req.body.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const training = await prisma.training.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
      include: {
        category: true,
        videos: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'UPDATE',
      entityType: 'Training',
      entityId: training.id,
      oldValues: existingTraining,
      newValues: { title: training.title, isPublished: training.isPublished, categoryId: training.categoryId },
      ipAddress,
      userAgent,
    });

    res.json({ data: serializeTraining(training) });
  } catch (error) {
    console.error('Erro ao atualizar treinamento:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Treinamento não encontrado' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Categoria ou usuário inválido' });
    }
    res.status(500).json({ 
      error: 'Erro ao atualizar treinamento',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Deletar treinamento
router.delete('/:id', authenticate, requirePermission('delete_training'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const userId = req.user?.id;
    const trainingId = parseInt(req.params.id);

    // Buscar treinamento antes de deletar para o log
    const training = await prisma.training.findUnique({
      where: { id: trainingId },
      select: { id: true, title: true },
    });

    if (!training) {
      return res.status(404).json({ error: 'Treinamento não encontrado' });
    }

    // Buscar todos os vídeos do treinamento para deletar arquivos
    const videos = await prisma.trainingVideo.findMany({
      where: { trainingId },
    });

    // Deletar arquivos físicos dos vídeos
    for (const video of videos) {
      const filePath = join(__dirname, '../../uploads/trainings', video.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Deletar treinamento (cascata vai deletar os vídeos do banco)
    await prisma.training.delete({
      where: { id: trainingId },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'DELETE',
      entityType: 'Training',
      entityId: trainingId,
      oldValues: training,
      ipAddress,
      userAgent,
    });

    res.json({ message: 'Treinamento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar treinamento:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Treinamento não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar treinamento' });
  }
});

export default router;

