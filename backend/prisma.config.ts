import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { defineConfig } from 'prisma/config';

// Load backend/.env to match backend runtime config (backend/src/config/database.js).
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error(
    'Missing required environment variable: DATABASE_URL. Make sure backend/.env exists and contains DATABASE_URL.'
  );
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    provider: 'sqlserver',
    url: dbUrl,
  },
});
