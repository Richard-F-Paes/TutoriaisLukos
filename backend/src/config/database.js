// Configuração de conexão com SQL Server usando Prisma
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import sql from 'mssql';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obter o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env do diretório backend
dotenv.config({ path: join(__dirname, '../../.env') });

// Cliente Prisma singleton
let prisma = null;

async function ensureDatabaseExists(poolConfig) {
  // Dev-friendly: optionally create missing database to avoid connection failures when DB isn't provisioned yet.
  // Disable with DB_AUTO_CREATE=false or in production.
  const autoCreateEnabled = (process.env.DB_AUTO_CREATE || '').toLowerCase() !== 'false' && process.env.NODE_ENV !== 'production';
  if (!autoCreateEnabled) return;

  const targetDb = poolConfig?.database;
  if (!targetDb) return;

  // Safety: only allow simple identifiers (avoid SQL injection in CREATE DATABASE).
  if (!/^[A-Za-z0-9_]+$/.test(targetDb)) return;

  const masterCfg = { ...poolConfig, database: 'master' };
  const pool = await new sql.ConnectionPool(masterCfg).connect();
  try {
    const result = await pool
      .request()
      .input('db', sql.NVarChar, targetDb)
      .query(`SELECT 1 AS exists_flag FROM sys.databases WHERE name = @db;`);

    const exists = (result?.recordset?.length || 0) > 0;
    if (!exists) {
      await pool.request().query(`CREATE DATABASE [${targetDb}]`);
      console.warn(`⚠️ Banco '${targetDb}' não existia e foi criado automaticamente (DB_AUTO_CREATE).`);
    }
  } finally {
    await pool.close();
  }
}

/**
 * Conecta ao banco de dados usando Prisma
 * @returns {Promise<PrismaClient>}
 */
export async function connectDatabase() {
  try {
    if (prisma) {
      return prisma;
    }

    // Converter DATABASE_URL do Prisma para configuração do mssql
    // Formato Prisma: sqlserver://server\\instance:port;database=db;user=user;password=pass;trustServerCertificate=true
    const dbUrl = process.env.DATABASE_URL;

    const urlMatch = dbUrl.match(/sqlserver:\/\/([^:]+):(\d+);database=([^;]+);user=([^;]+);password=([^;]+);/);

    if (!urlMatch) {
      throw new Error('Invalid DATABASE_URL format for SQL Server');
    }

    let [, serverPart, port, database, user, password] = urlMatch;
    const trustServerCert = dbUrl.includes('trustServerCertificate=true');

    // Tentar decodificar senha (pode estar URL-encoded)
    // Se falhar, usar senha original
    // (NUNCA logar senha ou derivados)
    try {
      const decodedPassword = decodeURIComponent(password);
      if (decodedPassword !== password) password = decodedPassword;
    } catch (e) {
      // keep original
    }

    // Lidar com instância nomeada (server\instance)
    // Na URL, \\ representa um único backslash, então serverPart contém um backslash literal
    let server, instanceName;
    if (serverPart.includes('\\')) {
      [server, instanceName] = serverPart.split('\\');
    } else {
      server = serverPart;
      instanceName = null;
    }

    // Normalizar URL para o adapter:
    // - `server\instance:port` é ambíguo/incompatível com alguns drivers; se há porta explícita,
    //   preferimos conexão direta por TCP na porta e removemos a instância da URL.
    // - Se a senha estiver URL-encoded no .env (ex: %40), reconstruímos a URL com a senha decodificada,
    //   pois nem todo parser do adapter decodifica esse formato com ';'.
    const adapterServerPart = (instanceName && port) ? server : serverPart;
    const adapterUrl =
      `sqlserver://${adapterServerPart}:${port};` +
      `database=${database};user=${user};password=${password};` +
      (trustServerCert ? 'trustServerCertificate=true' : '');

    // Criar pool de conexão mssql usando objeto de configuração
    // Quando user e password são fornecidos, mssql usa autenticação SQL Server automaticamente
    // Não precisamos especificar authentication explicitamente

    const poolConfig = {
      server: "localhost",
      database: "tutoriaislukos",
      user: "sa",
      password: "Katana@2121", // Senha passada diretamente (mssql trata caracteres especiais automaticamente)
      options: {
        encrypt: false,
        trustServerCertificate: trustServerCert,
        enableArithAbort: true,
        useUTC: true,
        abortTransactionOnError: true,
      },
    };

    // Para instâncias nomeadas, tentar formato combinado primeiro (como sqlcmd usa)
    // Se isso não funcionar, podemos tentar options.instanceName
    if (instanceName && !port) {
      // Instância nomeada - usar formato combinado server\instance (como sqlcmd)
      // Isso é mais compatível e funciona melhor com a maioria dos drivers
      poolConfig.server = `${server}\\${instanceName}`;
      // NÃO definir porta quando há instanceName (SQL Server Browser resolve)
      // NÃO usar options.instanceName quando usar formato combinado
    } else if (port) {
      // Sem instância nomeada mas com porta explícita - usar porta diretamente
      poolConfig.port = parseInt(port, 10);
    }

    await ensureDatabaseExists(poolConfig);

    // Criar adapter do Prisma para SQL Server
    // PrismaMssql aceita connection string diretamente (formato padrão do Prisma)
    // Isso é mais simples e evita problemas de parsing/transformação

    // Usar connection string diretamente (formato que Prisma usa normalmente)
    // O PrismaMssql vai fazer o parsing interno e criar o pool corretamente
    const adapter = new PrismaMssql(adapterUrl);

    // Criar instância do Prisma Client com adapter
    const prismaConfig = {
      adapter: adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    };

    prisma = new PrismaClient(prismaConfig);

    // Testar conexão
    await prisma.$connect();

    console.log('✅ Conectado ao SQL Server via Prisma:', process.env.DB_NAME || 'tutoriaislukos');

    return prisma;
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    console.warn('⚠️ AVISO: Não foi possível conectar ao SQL Server. O servidor iniciará em modo offline/mock.', error.message);

    // Retornar cliente mock para não quebrar a aplicação
    prisma = {
      $connect: async () => { },
      $disconnect: async () => { },
      $transaction: async (ops) => Promise.all(ops),
      user: {},
      category: {},
      tutorial: {},
      tutorialStep: {},
      media: {},
      auditLog: {},
      headerMenu: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async () => {
          throw new Error('Database offline: headerMenu.create unavailable');
        },
        update: async () => {
          throw new Error('Database offline: headerMenu.update unavailable');
        },
        delete: async () => {
          throw new Error('Database offline: headerMenu.delete unavailable');
        },
      },
      headerMenuItem: {
        deleteMany: async () => ({ count: 0 }),
        createMany: async () => ({ count: 0 }),
      },
    };

    return prisma;
  }
}

/**
 * Retorna o cliente Prisma
 * @returns {PrismaClient}
 */
export function getPrisma() {
  if (!prisma) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return prisma;
}

/**
 * Fecha a conexão com o banco de dados
 */
export async function closeDatabase() {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
    console.log('Conexão com SQL Server fechada');
  }
}

// Exportar Prisma Client para uso direto (após connectDatabase)
export { PrismaClient };

export default {
  connectDatabase,
  getPrisma,
  closeDatabase,
  PrismaClient,
};
