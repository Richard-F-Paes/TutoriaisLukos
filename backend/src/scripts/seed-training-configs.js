/**
 * Script de Seed - Cria configurações iniciais de treinamento
 * 
 * Configurações criadas:
 * - Tipos de Treinamento
 * - Níveis de Dificuldade
 * - Modalidades
 * 
 * Uso: node backend/src/scripts/seed-training-configs.js
 */

import { connectDatabase, getPrisma } from '../config/database.js';

const TRAINING_CONFIGS = [
  // Tipos de Treinamento
  {
    type: 'training_type',
    value: 'Conciliação Bancária',
    label: 'Conciliação Bancária',
    sortOrder: 0,
    isActive: true,
  },
  {
    type: 'training_type',
    value: 'Atendimento ao Cliente',
    label: 'Atendimento ao Cliente',
    sortOrder: 1,
    isActive: true,
  },
  {
    type: 'training_type',
    value: 'Sistema ERP',
    label: 'Sistema ERP',
    sortOrder: 2,
    isActive: true,
  },
  {
    type: 'training_type',
    value: 'Sistema PDV',
    label: 'Sistema PDV',
    sortOrder: 3,
    isActive: true,
  },
  {
    type: 'training_type',
    value: 'Processos Operacionais',
    label: 'Processos Operacionais',
    sortOrder: 4,
    isActive: true,
  },
  
  // Níveis de Dificuldade
  {
    type: 'difficulty_level',
    value: 'iniciante',
    label: 'Iniciante',
    sortOrder: 0,
    isActive: true,
  },
  {
    type: 'difficulty_level',
    value: 'intermediario',
    label: 'Intermediário',
    sortOrder: 1,
    isActive: true,
  },
  {
    type: 'difficulty_level',
    value: 'avancado',
    label: 'Avançado',
    sortOrder: 2,
    isActive: true,
  },
  
  // Modalidades
  {
    type: 'modality',
    value: 'presencial',
    label: 'Presencial',
    sortOrder: 0,
    isActive: true,
  },
  {
    type: 'modality',
    value: 'online',
    label: 'Online',
    sortOrder: 1,
    isActive: true,
  },
  {
    type: 'modality',
    value: 'hibrido',
    label: 'Híbrido',
    sortOrder: 2,
    isActive: true,
  },
];

async function seedTrainingConfigs() {
  try {
    console.log('🌱 Iniciando seed de configurações de treinamento...\n');

    // Conectar ao banco de dados
    console.log('📡 Conectando ao banco de dados...');
    await connectDatabase();
    const prisma = getPrisma();
    console.log('✅ Conexão estabelecida\n');

    let createdCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const config of TRAINING_CONFIGS) {
      try {
        // Verificar se já existe
        const existing = await prisma.trainingConfiguration.findFirst({
          where: {
            type: config.type,
            value: config.value,
          },
        });

        if (existing) {
          console.log(`⏭️  Já existe: ${config.type} - ${config.label}`);
          skippedCount++;
          continue;
        }

        // Criar configuração
        await prisma.trainingConfiguration.create({
          data: config,
        });

        console.log(`✅ Criado: ${config.type} - ${config.label}`);
        createdCount++;
      } catch (error) {
        console.error(`❌ Erro ao criar ${config.type} - ${config.label}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Resumo:');
    console.log(`   ✅ Criados: ${createdCount}`);
    console.log(`   ⏭️  Ignorados (já existem): ${skippedCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log('\n✨ Seed concluído!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro fatal no seed:', error);
    process.exit(1);
  }
}

seedTrainingConfigs();

