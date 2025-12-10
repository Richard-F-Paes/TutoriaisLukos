// Configuração de conexão com SQL Server
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'TutoriaisLukos',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Pool de conexões global
let pool = null;

/**
 * Conecta ao banco de dados SQL Server
 * @returns {Promise<sql.ConnectionPool>}
 */
export async function connectDatabase() {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect(dbConfig);
    console.log('Conectado ao SQL Server:', process.env.DB_NAME);
    return pool;
  } catch (error) {
    console.warn('⚠️ AVISO: Não foi possível conectar ao SQL Server. O servidor iniciará em modo offline/mock.', error.message);
    // Mock pool to prevent crash
    pool = {
      close: async () => { },
      request: () => ({
        input: () => ({ query: () => [] }),
        query: async () => { console.log('Mock DB Query executed'); return { recordset: [] }; },
        execute: async () => { console.log('Mock DB Execute executed'); return { recordset: [] }; }
      })
    };
    return pool;
  }
}

/**
 * Retorna o pool de conexões
 * @returns {sql.ConnectionPool}
 */
export function getPool() {
  if (!pool) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return pool;
}

/**
 * Fecha a conexão com o banco de dados
 */
export async function closeDatabase() {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Conexao com SQL Server fechada');
  }
}

// Exportar sql para uso de tipos
export { sql };

export default {
  connectDatabase,
  getPool,
  closeDatabase,
  sql,
};




