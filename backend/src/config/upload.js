// Configuração de upload de arquivos
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tipos de arquivos permitidos
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

// Tamanho máximo de arquivo (10MB por padrão)
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024;

// Diretório de uploads
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, '../../uploads');

// Configuração de storage
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

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo nao permitido: ${file.mimetype}`), false);
  }
};

// Configuração do multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10, // Máximo de arquivos por requisição
  },
});

// Exportar configurações para uso em outros lugares
export const uploadConfig = {
  allowedImageTypes: ALLOWED_IMAGE_TYPES,
  allowedVideoTypes: ALLOWED_VIDEO_TYPES,
  allowedTypes: ALLOWED_TYPES,
  maxFileSize: MAX_FILE_SIZE,
  uploadPath: UPLOAD_PATH,
};

export default upload;






