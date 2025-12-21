/**
 * Script de Seed - Cria disponibilidades padrão para treinamentos
 * 
 * Disponibilidades criadas:
 * - Segunda a Sexta: 08:30 às 16:30 (intervalo de 30 minutos)
 * 
 * O script cria múltiplas regras (uma por dia) baseado nos grupos definidos.
 * 
 * Uso: node backend/src/scripts/seed-availability.js
 */

import { connectDatabase, getPrisma } from '../config/database.js';

// Grupos de disponibilidade: cada grupo define uma regra que se aplica a múltiplos dias
const DEFAULT_AVAILABILITY_GROUPS = [
  {
    daysOfWeek: [1, 2, 3, 4, 5], // Segunda a Sexta
    startTime: '08:30',
    endTime: '16:30',
    slotInterval: 30,
    isActive: true,
  },
];

const DAY_NAMES = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

async function seedAvailability() {
  try {
    console.log('🌱 Iniciando seed de disponibilidades padrão...\n');

    // Conectar ao banco de dados
    console.log('📡 Conectando ao banco de dados...');
    await connectDatabase();
    const prisma = getPrisma();
    console.log('✅ Conexão estabelecida\n');

    let createdCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const group of DEFAULT_AVAILABILITY_GROUPS) {
      const dayNames = group.daysOfWeek.map(d => DAY_NAMES[d] || `Dia ${d}`).join(', ');
      console.log(`\n📅 Processando grupo: ${dayNames} - ${group.startTime} às ${group.endTime} (intervalo: ${group.slotInterval}min)`);
      
      for (const dayOfWeek of group.daysOfWeek) {
        try {
          // Verificar se já existe uma regra para este dia da semana com os mesmos horários
          const existing = await prisma.trainingAvailability.findFirst({
            where: {
              dayOfWeek: dayOfWeek,
              specificDate: null,
              startTime: group.startTime,
              endTime: group.endTime,
            },
          });

          if (existing) {
            const dayName = DAY_NAMES[dayOfWeek] || `Dia ${dayOfWeek}`;
            console.log(`  ⏭️  Já existe: ${dayName}`);
            skippedCount++;
            continue;
          }

          // Criar disponibilidade
          await prisma.trainingAvailability.create({
            data: {
              dayOfWeek: dayOfWeek,
              specificDate: null,
              startTime: group.startTime,
              endTime: group.endTime,
              slotInterval: group.slotInterval,
              isActive: group.isActive,
            },
          });

          const dayName = DAY_NAMES[dayOfWeek] || `Dia ${dayOfWeek}`;
          console.log(`  ✅ Criado: ${dayName}`);
          createdCount++;
        } catch (error) {
          const dayName = DAY_NAMES[dayOfWeek] || `Dia ${dayOfWeek}`;
          console.error(`  ❌ Erro ao criar disponibilidade para ${dayName}:`, error.message);
          errorCount++;
        }
      }
    }

    console.log('\n📊 Resumo:');
    console.log(`   ✅ Criados: ${createdCount}`);
    console.log(`   ⏭️  Ignorados (já existem): ${skippedCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log('\n✨ Seed concluído!\n');

    // Desconectar do banco
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro fatal no seed:', error);
    process.exit(1);
  }
}

seedAvailability();

