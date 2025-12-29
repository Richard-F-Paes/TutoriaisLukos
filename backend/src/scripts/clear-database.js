/**
 * Script para limpar o banco de dados completamente
 * 
 * ATENÇÃO: Este script deleta TODOS os dados do banco de dados!
 * Use apenas em desenvolvimento ou quando quiser resetar completamente.
 * 
 * Uso: npm run clear:database
 */

import { connectDatabase, getPrisma } from '../config/database.js';

async function clearDatabase() {
  try {
    console.log('🗑️  Iniciando limpeza do banco de dados...\n');
    console.log('⚠️  ATENÇÃO: Todos os dados serão deletados!\n');

    // Conectar ao banco de dados
    console.log('📡 Conectando ao banco de dados...');
    await connectDatabase();
    const prisma = getPrisma();
    console.log('✅ Conexão estabelecida\n');

    // Ordem de deleção respeitando foreign keys
    const tables = [
      'TutorialViews',
      'TutorialSteps',
      'Tutorials',
      'TrainingVideos',
      'TrainingAppointments',
      'Trainings',
      'HeaderMenuItems',
      'HeaderMenus',
      'AuditLog',
      'Media',
      'Categories',
      'TrainingConfigurations',
      'TrainingAvailabilities',
      'Users',
    ];

    console.log('🧹 Deletando dados das tabelas...\n');

    // Desabilitar verificação de foreign keys temporariamente
    try {
      await prisma.$executeRawUnsafe(`EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"`);
      console.log('🔓 Foreign keys desabilitadas temporariamente\n');
    } catch (error) {
      console.log('⚠️  Não foi possível desabilitar foreign keys (pode ser normal)\n');
    }

    let totalDeleted = 0;
    for (const table of tables) {
      try {
        // Usar Prisma para deletar todos os registros
        const result = await prisma.$executeRawUnsafe(`DELETE FROM ${table}`);
        totalDeleted += result;
        if (result > 0) {
          console.log(`✅ ${table}: ${result} registro(s) deletado(s)`);
        }
      } catch (error) {
        // Se a tabela não existir ou estiver vazia, continuar
        if (error.message?.includes('Invalid object name') || error.message?.includes('does not exist')) {
          console.log(`⏭️  ${table}: Tabela não existe`);
        } else {
          console.error(`❌ ${table}: Erro - ${error.message}`);
        }
      }
    }

    // Reabilitar verificação de foreign keys
    try {
      await prisma.$executeRawUnsafe(`EXEC sp_MSforeachtable "ALTER TABLE ? CHECK CONSTRAINT all"`);
      console.log('\n🔒 Foreign keys reabilitadas');
    } catch (error) {
      console.log('\n⚠️  Não foi possível reabilitar foreign keys (pode ser normal)');
    }

    console.log(`\n📊 Total de registros deletados: ${totalDeleted}`);

    // Resetar identity columns (auto-increment)
    console.log('\n🔄 Resetando contadores de ID...\n');
    const identityTables = [
      'TutorialViews',
      'TutorialSteps',
      'Tutorials',
      'TrainingVideos',
      'TrainingAppointments',
      'Trainings',
      'HeaderMenuItems',
      'HeaderMenus',
      'AuditLog',
      'Media',
      'Categories',
      'TrainingConfigurations',
      'TrainingAvailabilities',
      'Users',
    ];

    for (const table of identityTables) {
      try {
        await prisma.$executeRawUnsafe(`DBCC CHECKIDENT('${table}', RESEED, 0)`);
        console.log(`✅ ${table}: Contador resetado`);
      } catch (error) {
        // Ignorar se a tabela não existir ou não tiver identity
        if (!error.message?.includes('Invalid object name') && !error.message?.includes('does not exist')) {
          console.log(`⏭️  ${table}: Sem contador para resetar`);
        }
      }
    }

    console.log('\n✨ Limpeza do banco de dados concluída!\n');
    console.log('💡 Próximos passos:');
    console.log('   1. Execute as migrations: npm run prisma:migrate');
    console.log('   2. Execute o seed: npm run seed');
    console.log('   3. Execute o webscrape: cd ../WebScrape && python run_scraper.py\n');

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao limpar banco de dados:', error.message);
    
    if (error.message?.includes('not connected')) {
      console.error('\n💡 Erro de conexão com o banco de dados.');
      console.error('   Verifique se o DATABASE_URL está correto no arquivo .env');
    } else {
      console.error('\n💡 Verifique:');
      console.error('   - Se o banco de dados está rodando');
      console.error('   - Se o DATABASE_URL está correto no arquivo .env');
      console.error('\n   Detalhes do erro:', error.code || 'N/A');
    }
    
    process.exit(1);
  }
}

// Executar a limpeza
clearDatabase();

