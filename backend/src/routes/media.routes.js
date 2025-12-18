import express from 'express';
import { getPrisma } from '../config/database.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

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
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const prisma = getPrisma();
    const { uploadedBy } = req.body;

    const media = await prisma.media.create({
      data: {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: BigInt(req.file.size),
        url: `/uploads/${req.file.filename}`,
        uploadedBy: parseInt(uploadedBy),
      },
      include: {
        uploader: {
          select: { id: true, name: true, username: true },
        },
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
});

// Deletar mídia
router.delete('/:id', async (req, res) => {
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
