// Servidor Express principal
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { connectDatabase } from './config/database.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';

// Importar rotas
import authRoutes from './routes/auth.routes.js';
import tutorialsRoutes from './routes/tutorials.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import usersRoutes from './routes/users.routes.js';
import mediaRoutes from './routes/media.routes.js';
import auditRoutes from './routes/audit.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// #region agent log
// Fallback para ambientes Node sem fetch: grava NDJSON diretamente em .cursor/debug.log (raiz do repo)
const __agentFilename = fileURLToPath(import.meta.url);
const __agentDirname = dirname(__agentFilename);
const __agentDebugLogPath = join(__agentDirname, '../../.cursor/debug.log');
const __agentLog = (payload) => {
  try {
    if (typeof fetch === 'function') {
      fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
      return;
    }
    fs.appendFileSync(__agentDebugLogPath, `${JSON.stringify(payload)}\n`, 'utf8');
  } catch (_) {}
};
__agentLog({location:'backend/src/app.js:AGENT_LOG_INIT',message:'Agent logging initialized',data:{hasFetch:typeof fetch==='function',debugLogPath:__agentDebugLogPath},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H0'});
// #endregion

// Middlewares de segurança
app.use(helmet());
// #region agent log
__agentLog({location:'backend/src/app.js:PRE_CORS',message:'Backend starting - env CORS/PORT',data:{PORT:String(PORT),ENV_PORT:process.env.PORT||null,CORS_ORIGIN:process.env.CORS_ORIGIN||null,NODE_ENV:process.env.NODE_ENV||null},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
// #endregion
app.use((req, res, next) => {
  if (req.method === 'OPTIONS' || req.path.startsWith('/api/')) {
    // #region agent log
    __agentLog({location:'backend/src/app.js:REQ_PRE_CORS',message:'Incoming request (pre-cors)',data:{method:req.method,path:req.path,origin:req.headers.origin||null,host:req.headers.host||null,referer:req.headers.referer||null,acrm:req.headers['access-control-request-method']||null,acrh:req.headers['access-control-request-headers']||null},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
    // #endregion
  }
  next();
});
const __agentAllowedOrigins = (() => {
  const raw = (process.env.CORS_ORIGIN || '').trim();
  const origins = raw
    ? raw.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  // Em dev, sempre permitir portas comuns do Vite/React (mesmo se CORS_ORIGIN estiver setado)
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    if (!origins.includes('http://localhost:3000')) origins.push('http://localhost:3000');
    if (!origins.includes('http://localhost:5173')) origins.push('http://localhost:5173');
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

    const allowed = __agentAllowedOrigins.includes(origin);
    // #region agent log
    __agentLog({location:'backend/src/app.js:CORS_DECISION',message:'CORS origin decision',data:{origin,allowed,allowedOrigins:__agentAllowedOrigins},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H4'});
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

// Servir arquivos estáticos de uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, '../uploads')));

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

// Middleware de erro 404
app.use(notFoundHandler);

// Middleware de tratamento de erros global
app.use(errorHandler);

// Inicializar servidor
async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📡 API disponível em http://localhost:${PORT}${API_VERSION}`);
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
