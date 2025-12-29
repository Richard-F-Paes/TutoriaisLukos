/**
 * Script completo para resetar banco de dados, executar seed e rodar scraper
 * 
 * Este script automatiza o processo completo:
 * 1. Limpa o banco de dados
 * 2. Executa migrations (opcional)
 * 3. Executa seed
 * 4. Executa scraper
 * 
 * Uso: npm run reset:all
 * 
 * Opções via variáveis de ambiente:
 * - SKIP_MIGRATIONS=true: Pula as migrations
 * - SKIP_SEED=true: Pula o seed
 * - SKIP_SCRAPER=true: Pula o scraper
 * - SCRAPER_LIMIT=N: Limita o número de páginas do scraper
 * - FORCE_EXTRACT=true: Força extração no scraper
 * - USE_DB_PUSH=false: Usa 'prisma migrate dev' em vez de 'prisma db push' (padrão: true)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obter diretórios
const backendDir = join(__dirname, '../..');
const rootDir = join(backendDir, '..');
const webScrapeDir = join(rootDir, 'WebScrape');

// Opções via variáveis de ambiente
const skipMigrations = process.env.SKIP_MIGRATIONS === 'true';
const skipSeed = process.env.SKIP_SEED === 'true';
const skipScraper = process.env.SKIP_SCRAPER === 'true';
const scraperLimit = process.env.SCRAPER_LIMIT ? parseInt(process.env.SCRAPER_LIMIT) : 0;
const forceExtract = process.env.FORCE_EXTRACT === 'true';
const useDbPush = process.env.USE_DB_PUSH !== 'false'; // Por padrão usa db push após limpar

async function runCommand(command, cwd = backendDir) {
  console.log(`\n📝 Executando: ${command}`);
  console.log(`📁 Diretório: ${cwd}\n`);
  
  try {
    const { stdout, stderr } = await execAsync(command, { 
      cwd,
      encoding: 'utf8',
      shell: process.platform === 'win32' ? 'powershell.exe' : '/bin/bash'
    });
    
    if (stdout) {
      console.log(stdout);
    }
    if (stderr && !stderr.includes('npm warn')) {
      console.error(stderr);
    }
    
    return { success: true };
  } catch (error) {
    console.error(`❌ Erro ao executar comando: ${error.message}`);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return { success: false, error };
  }
}

async function main() {
  console.log('🚀 Iniciando processo completo de reset do banco de dados...\n');
  console.log('⚠️  ATENÇÃO: Este processo irá deletar todos os dados do banco!\n');

  // Verificar se o diretório WebScrape existe
  if (!existsSync(webScrapeDir)) {
    console.error(`❌ Diretório WebScrape não encontrado: ${webScrapeDir}`);
    process.exit(1);
  }

  // 1. Limpar banco de dados
  console.log('📦 Passo 1/4: Limpando banco de dados...');
  const clearResult = await runCommand('npm run clear:database');
  if (!clearResult.success) {
    console.error('❌ Falha ao limpar banco de dados');
    process.exit(1);
  }
  console.log('✅ Banco de dados limpo com sucesso!\n');

  // 2. Executar migrations (se não for pulado)
  if (!skipMigrations) {
    console.log('📦 Passo 2/4: Sincronizando schema do banco de dados...');
    
    // Usar db push por padrão após limpar o banco (mais adequado para desenvolvimento)
    // db push não requer shadow database e funciona melhor com banco vazio
    let migrationCommand = 'npm run prisma:push';
    let migrationType = 'db push';
    
    // Se explicitamente solicitado, usar migrate dev
    if (process.env.USE_DB_PUSH === 'false') {
      migrationCommand = 'npm run prisma:migrate';
      migrationType = 'migrate dev';
    }
    
    console.log(`   Usando: ${migrationType}`);
    const migrateResult = await runCommand(migrationCommand);
    
    if (!migrateResult.success) {
      // Se db push falhar, tentar migrate dev como fallback
      if (useDbPush && migrationType === 'db push') {
        console.log('\n⚠️  db push falhou, tentando migrate dev como fallback...');
        const migrateDevResult = await runCommand('npm run prisma:migrate');
        if (!migrateDevResult.success) {
          console.error('❌ Falha ao executar migrations (tentativas: db push e migrate dev)');
          console.error('\n💡 Dica: Verifique se o banco de dados está acessível e se o schema está correto.');
          process.exit(1);
        }
        console.log('✅ Migrations executadas com sucesso (via migrate dev)!\n');
      } else {
        console.error('❌ Falha ao executar migrations');
        console.error('\n💡 Dica: Tente usar USE_DB_PUSH=true para usar db push em vez de migrate dev.');
        process.exit(1);
      }
    } else {
      console.log(`✅ Schema sincronizado com sucesso (via ${migrationType})!\n`);
    }
  } else {
    console.log('⏭️  Passo 2/4: Pulando migrations...\n');
  }

  // 3. Executar seed (se não for pulado)
  if (!skipSeed) {
    console.log('📦 Passo 3/4: Executando seed...');
    const seedResult = await runCommand('npm run seed');
    if (!seedResult.success) {
      console.error('❌ Falha ao executar seed');
      process.exit(1);
    }
    console.log('✅ Seed executado com sucesso!\n');
  } else {
    console.log('⏭️  Passo 3/4: Pulando seed...\n');
  }

  // 4. Executar scraper (se não for pulado)
  if (!skipScraper) {
    console.log('📦 Passo 4/4: Executando scraper...');
    
    // Construir comando do scraper
    let scraperCommand = 'python run_scraper.py';
    if (forceExtract) {
      scraperCommand += ' --force-extract';
    }
    if (scraperLimit > 0) {
      scraperCommand += ` --limit ${scraperLimit}`;
    }
    
    const scraperResult = await runCommand(scraperCommand, webScrapeDir);
    if (!scraperResult.success) {
      console.error('❌ Falha ao executar scraper');
      process.exit(1);
    }
    console.log('✅ Scraper executado com sucesso!\n');
  } else {
    console.log('⏭️  Passo 4/4: Pulando scraper...\n');
  }

  // Resumo final
  console.log('✨ Processo completo finalizado com sucesso!\n');
  console.log('📋 Resumo:');
  console.log('   ✅ Banco de dados limpo');
  if (!skipMigrations) {
    console.log('   ✅ Migrations executadas');
  }
  if (!skipSeed) {
    console.log('   ✅ Seed executado');
  }
  if (!skipScraper) {
    console.log('   ✅ Scraper executado');
  }
  console.log('');
}

// Executar o script
main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

