import express from 'express';
import { getPrisma } from '../config/database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { upload } from '../config/upload.js'; // Usar configuração centralizada
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Listar mídias
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const { uploadedBy } = req.query;

    const where = {};
    if (uploadedBy) where.uploadedBy = parseInt(uploadedBy);

    const media = await prisma.media.findMany({
      where,
      include: {
        uploader: {
          select: { id: true, name: true, username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(media);
  } catch (error) {
    console.error('Erro ao listar mídias:', error);
    res.status(500).json({ error: 'Erro ao listar mídias' });
  }
});

// Obter mídia por ID
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const media = await prisma.media.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        uploader: {
          select: { id: true, name: true, username: true },
        },
      },
    });

    if (!media) {
      return res.status(404).json({ error: 'Mídia não encontrada' });
    }

    res.json(media);
  } catch (error) {
    console.error('Erro ao obter mídia:', error);
    res.status(500).json({ error: 'Erro ao obter mídia' });
  }
});

// Upload de mídia
router.post('/', authenticate, requirePermission('upload_media'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const prisma = getPrisma();
    const { uploadedBy } = req.body;
    // Usar req.user.id como fallback se uploadedBy não for fornecido
    const userId = uploadedBy ? parseInt(uploadedBy) : (req.user?.id || null);

    if (!userId) {
      return res.status(400).json({ error: 'Usuário não identificado' });
    }

    const media = await prisma.media.create({
      data: {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: BigInt(req.file.size),
        url: `/uploads/${req.file.filename}`,
        uploadedBy: userId,
      },
      include: {
        uploader: {
          select: { id: true, name: true, username: true },
        },
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'CREATE',
      entityType: 'Media',
      entityId: media.id,
      newValues: { fileName: media.fileName, originalName: media.originalName, mimeType: media.mimeType, size: media.size.toString() },
      ipAddress,
      userAgent,
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
});

// Compat: upload em /upload (frontend usa /media/upload)
router.post('/upload', authenticate, requirePermission('upload_media'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const prisma = getPrisma();
    const { uploadedBy } = req.body;
    // Usar req.user.id como fallback se uploadedBy não for fornecido
    const userId = uploadedBy ? parseInt(uploadedBy) : (req.user?.id || null);

    if (!userId) {
      return res.status(400).json({ error: 'Usuário não identificado' });
    }

    const media = await prisma.media.create({
      data: {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: BigInt(req.file.size),
        url: `/uploads/${req.file.filename}`,
        uploadedBy: userId,
      },
      include: {
        uploader: {
          select: { id: true, name: true, username: true },
        },
      },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'CREATE',
      entityType: 'Media',
      entityId: media.id,
      newValues: { fileName: media.fileName, originalName: media.originalName, mimeType: media.mimeType, size: media.size.toString() },
      ipAddress,
      userAgent,
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
});

// Deletar mídia
router.delete('/:id', authenticate, requirePermission('delete_media'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const media = await prisma.media.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!media) {
      return res.status(404).json({ error: 'Mídia não encontrada' });
    }

    // Deletar arquivo físico
    const filePath = join(__dirname, '../../uploads', media.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Deletar do banco
    await prisma.media.delete({
      where: { id: parseInt(req.params.id) },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'DELETE',
        entityType: 'Media',
        entityId: media.id,
        oldValues: { fileName: media.fileName, originalName: media.originalName, mimeType: media.mimeType, size: media.size.toString() },
        ipAddress,
        userAgent,
      });
    }

    res.json({ message: 'Mídia deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar mídia:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Mídia não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao deletar mídia' });
  }
});

export default router;
