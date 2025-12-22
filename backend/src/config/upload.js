// Configuração de upload de arquivos
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tipos de arquivos permitidos
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
  'image/tiff',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/heic',
  'image/heif',
  'image/avif'
];
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
  'video/x-ms-wmv', // .wmv
  'video/webm',
  'video/ogg',
  'video/x-matroska', // .mkv
  'video/x-flv', // .flv
  'video/3gpp', // .3gp
  'video/3gpp2', // .3g2
  'video/x-m4v' // .m4v
];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

// Tamanho máximo de arquivo (50MB por padrão)
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 50 * 1024 * 1024;

// Diretório de uploads
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, '../../uploads');

// Configuração de storage padrão (para mídia geral)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Separar por tipo (images ou videos)
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.mimetype);
    const subFolder = isImage ? 'images' : 'videos';
    const fullPath = path.join(UPLOAD_PATH, subFolder);
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome único: uuid + extensão original
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

// Configuração de storage para vídeos de treinamentos
const trainingVideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = path.join(UPLOAD_PATH, 'trainings');
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo nao permitido: ${file.mimetype}`), false);
  }
};

// Filtro de arquivos para vídeos (apenas vídeos)
const videoFileFilter = (req, file, cb) => {
  if (ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo nao permitido. Apenas vídeos são permitidos: ${file.mimetype}`), false);
  }
};

// Configuração do multer padrão
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10, // Máximo de arquivos por requisição
  },
});

// Configuração do multer para vídeos de treinamentos (apenas vídeos)
export const uploadTrainingVideo = multer({
  storage: trainingVideoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1, // Um vídeo por vez
  },
});

// Exportar configurações para uso em outros lugares
export const uploadConfig = {
  allowedImageTypes: ALLOWED_IMAGE_TYPES,
  allowedVideoTypes: ALLOWED_VIDEO_TYPES,
  allowedTypes: ALLOWED_TYPES,
  maxFileSize: MAX_FILE_SIZE,
  uploadPath: UPLOAD_PATH,
  trainingVideosPath: path.join(UPLOAD_PATH, 'trainings'),
};

export default upload;






