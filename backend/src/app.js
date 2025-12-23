// Servidor Express principal
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDatabase } from './config/database.js';
import { connectRedis } from './config/redis.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';
import { rateLimitByIP } from './middleware/rateLimit.middleware.js';

// Importar rotas
import authRoutes from './routes/auth.routes.js';
import tutorialsRoutes from './routes/tutorials.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import usersRoutes from './routes/users.routes.js';
import mediaRoutes from './routes/media.routes.js';
import auditRoutes from './routes/audit.routes.js';
import headerMenusRoutes from './routes/headerMenus.routes.js';
import searchRoutes from './routes/search.routes.js';
import adminRoutes from './routes/admin.routes.js';
import trainingsRoutes from './routes/trainings.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import trainingConfigsRoutes from './routes/training-configs.routes.js';
import availabilityRoutes from './routes/availability.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// #region agent log
const __agentLog = () => {};
// #endregion

// Configurar trust proxy para obter IP correto quando a requisição vem de outra máquina
// Isso é necessário para rate limiting e logs de auditoria funcionarem corretamente
app.set('trust proxy', true);

// Middlewares de segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS' || req.path.startsWith('/api/')) {
  }
  next();
});
const __agentAllowedOrigins = (() => {
  const raw = (process.env.CORS_ORIGIN || '').trim();
  const origins = raw
    ? raw.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  // Em dev, sempre permitir portas comuns do Vite/React e IPs da rede local
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    // Permitir localhost em várias portas
    ['3000', '5173', '5174', '8080'].forEach(port => {
      const localhost = `http://localhost:${port}`;
      if (!origins.includes(localhost)) origins.push(localhost);
    });
    
    // Em desenvolvimento, permitir qualquer IP da rede local (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    // Isso permite acesso de outros dispositivos na mesma rede
    // Em produção, isso deve ser desabilitado e usar apenas CORS_ORIGIN
  }

  // Fallback final (caso nada tenha sido adicionado)
  if (origins.length === 0) {
    origins.push('http://localhost:3000', 'http://localhost:5173');
  }

  return origins;
})();

app.use(cors({
  origin: (origin, callback) => {
    // Requests sem Origin (ex.: curl/healthcheck) devem passar
    if (!origin) return callback(null, true);

    // Verificar se está na lista de origens permitidas
    let allowed = __agentAllowedOrigins.includes(origin);
    
    // Em desenvolvimento, permitir IPs da rede local (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction && !allowed) {
      // Verificar se é um IP da rede local
      const localNetworkPatterns = [
        /^http:\/\/192\.168\.\d+\.\d+:\d+$/,  // 192.168.x.x:port
        /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,   // 10.x.x.x:port
        /^http:\/\/172\.(1[6-9]|2[0-9]|3[01])\.\d+\.\d+:\d+$/, // 172.16-31.x.x:port
        /^http:\/\/127\.0\.0\.1:\d+$/,        // 127.0.0.1:port
      ];
      
      allowed = localNetworkPatterns.some(pattern => pattern.test(origin));
    }
    
    // #region agent log
    __agentLog({location:'backend/src/app.js:CORS_DECISION',message:'CORS origin decision',data:{origin,allowed,allowedOrigins:__agentAllowedOrigins,isProduction},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H4'});
    // #endregion

    return callback(null, allowed ? origin : false);
  },
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS' || req.path.startsWith('/api/')) {
    // #region agent log
    __agentLog({location:'backend/src/app.js:REQ_POST_CORS',message:'CORS headers after middleware',data:{method:req.method,path:req.path,origin:req.headers.origin||null,acao:String(res.getHeader('access-control-allow-origin')||''),acc:String(res.getHeader('access-control-allow-credentials')||''),acah:String(res.getHeader('access-control-allow-headers')||''),acam:String(res.getHeader('access-control-allow-methods')||'')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
    // #endregion
  }
  next();
});

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting global (aplicado a todas as rotas)
// Em desenvolvimento, aumentar limites para facilitar testes
const isProduction = process.env.NODE_ENV === 'production';
const rateLimitAuth = isProduction 
  ? parseInt(process.env.RATE_LIMIT_AUTH || '5', 10)
  : parseInt(process.env.RATE_LIMIT_AUTH || '20', 10); // 20 req/min em dev
const rateLimitAPI = parseInt(process.env.RATE_LIMIT_API || '100', 10);
const rateLimitUpload = parseInt(process.env.RATE_LIMIT_UPLOAD || '10', 10);

// Rate limiting para rotas de autenticação (mais restritivo)
// Em desenvolvimento, permitir mais tentativas para facilitar testes
app.use('/api/v1/auth', rateLimitByIP(rateLimitAuth, 60000)); // 5 req/min (prod) ou 20 req/min (dev)

// Rate limiting para rotas de upload (moderado)
app.use('/api/v1/media', rateLimitByIP(rateLimitUpload, 60000)); // 10 req/min
app.use('/uploads', rateLimitByIP(rateLimitUpload, 60000)); // 10 req/min

// Rate limiting geral para API (menos restritivo)
app.use('/api', rateLimitByIP(rateLimitAPI, 60000)); // 100 req/min

// Servir arquivos estáticos de uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = join(__dirname, '../uploads');
const trainingsDir = join(uploadsDir, 'trainings');

// Garantir que os diretórios de upload existam
import fs from 'fs';
const imagesDir = join(uploadsDir, 'images');
const videosDir = join(uploadsDir, 'videos');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Diretório de uploads criado:', uploadsDir);
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('📁 Diretório de imagens criado:', imagesDir);
}
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
  console.log('📁 Diretório de vídeos criado:', videosDir);
}
if (!fs.existsSync(trainingsDir)) {
  fs.mkdirSync(trainingsDir, { recursive: true });
  console.log('📁 Diretório de treinamentos criado:', trainingsDir);
}

// Middleware para adicionar headers CORS nos arquivos estáticos de uploads
app.use('/uploads', (req, res, next) => {
  // Adicionar headers CORS para permitir carregamento de imagens/vídeos de outras origens
  const origin = req.headers.origin || req.headers.referer;
  
  // Para requisições de recursos estáticos (imagens/vídeos), o navegador pode não enviar Origin
  // Nesse caso, tentar extrair da referer ou permitir acesso amplo em dev
  let allowedOrigin = null;
  
  if (origin) {
    // Tentar extrair origem do referer se origin não estiver presente
    let checkOrigin = origin;
    if (!req.headers.origin && origin) {
      try {
        const refererUrl = new URL(origin);
        checkOrigin = refererUrl.origin;
      } catch {
        // Ignorar se não conseguir parsear
      }
    }
    
    // Verificar se a origem é permitida
    if (__agentAllowedOrigins.includes(checkOrigin)) {
      allowedOrigin = checkOrigin;
    } else {
      // Em desenvolvimento, permitir IPs da rede local
      const isProduction = process.env.NODE_ENV === 'production';
      if (!isProduction) {
        const localNetworkPatterns = [
          /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/,
          /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/,
          /^http:\/\/172\.(1[6-9]|2[0-9]|3[01])\.\d+\.\d+(:\d+)?$/,
          /^http:\/\/127\.0\.0\.1(:\d+)?$/,
        ];
        if (localNetworkPatterns.some(pattern => pattern.test(checkOrigin))) {
          allowedOrigin = checkOrigin;
        }
      }
    }
  }
  
  // Adicionar headers CORS
  if (allowedOrigin) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    // Em desenvolvimento, permitir acesso amplo para recursos estáticos
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
      res.header('Access-Control-Allow-Origin', '*');
    }
  }
  
  // Adicionar header para permitir cross-origin
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  
  next();
});

// Servir arquivos estáticos de uploads
app.use('/uploads', express.static(uploadsDir, {
  index: false,
  // Express.static já trata arquivos não encontrados automaticamente (retorna 404)
  setHeaders: (res, path) => {
    // Adicionar headers adicionais se necessário
    // Por exemplo, cache control para arquivos de mídia
    if (path.match(/\.(jpg|jpeg|png|gif|webp|mp4|mov|avi|webm)$/i)) {
      res.set('Cache-Control', 'public, max-age=31536000'); // 1 ano
    }
  },
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas da API
const API_VERSION = '/api/v1';
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/tutorials`, tutorialsRoutes);
app.use(`${API_VERSION}/categories`, categoriesRoutes);
app.use(`${API_VERSION}/users`, usersRoutes);
app.use(`${API_VERSION}/media`, mediaRoutes);
app.use(`${API_VERSION}/audit`, auditRoutes);
app.use(`${API_VERSION}/header-menus`, headerMenusRoutes);
app.use(`${API_VERSION}/search`, searchRoutes);
app.use(`${API_VERSION}/admin`, adminRoutes);
app.use(`${API_VERSION}/trainings`, trainingsRoutes);
app.use(`${API_VERSION}/appointments`, appointmentsRoutes);
app.use(`${API_VERSION}/training-configs`, trainingConfigsRoutes);
app.use(`${API_VERSION}/availability`, availabilityRoutes);

// Middleware de erro 404
app.use(notFoundHandler);

// Middleware de tratamento de erros global
app.use(errorHandler);

// Inicializar servidor
async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDatabase();
    
    // Conectar ao Redis (não bloqueia se falhar)
    await connectRedis();
    
    // Escutar em 0.0.0.0 para aceitar conexões de outras máquinas na rede
    const HOST = process.env.HOST || '0.0.0.0';
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📡 API disponível em http://localhost:${PORT}${API_VERSION}`);
      if (HOST === '0.0.0.0') {
        console.log(`🌐 Servidor acessível na rede local (0.0.0.0:${PORT})`);
      }
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();

export default app;
