/**
 * Script de Seed - Cria usuário administrador inicial
 * 
 * Usuário criado:
 * - Username: Lukos
 * - Senha: lks@123241
 * - Email: lukos@lukos.com
 * - Role: admin
 * 
 * Uso: npm run seed
 */

import { connectDatabase, getPrisma } from '../config/database.js';
import bcrypt from 'bcryptjs';

const ADMIN_USER = {
  username: 'lukos',
  password: 'lks@123241',
  name: 'Lukos',
  role: 'admin',
};

async function seedAdminUser() {
  try {
    console.log('🌱 Iniciando seed de usuário administrador...\n');

    // Conectar ao banco de dados
    console.log('📡 Conectando ao banco de dados...');
    await connectDatabase();
    const prisma = getPrisma();
    console.log('✅ Conexão estabelecida\n');

    // Verificar se o usuário já existe
    console.log(`🔍 Verificando se o usuário "${ADMIN_USER.username}" já existe...`);
    const existingUser = await prisma.user.findUnique({
      where: { username: ADMIN_USER.username },
    });

    if (existingUser) {
      console.log(`⚠️  Usuário "${ADMIN_USER.username}" já existe no banco de dados.`);
      console.log(`   ID: ${existingUser.id}`);
      console.log(`   Role: ${existingUser.role}`);
      console.log(`   Status: ${existingUser.isActive ? 'Ativo' : 'Inativo'}\n`);
      
      // Perguntar se deseja atualizar a senha
      console.log('💡 Para atualizar a senha, você pode:');
      console.log('   1. Usar a API: PUT /api/users/:id');
      console.log('   2. Atualizar manualmente no banco de dados');
      console.log('   3. Deletar o usuário e executar o seed novamente\n');
      
      await prisma.$disconnect();
      process.exit(0);
    }

    // Gerar hash da senha
    console.log('🔐 Gerando hash da senha...');
    const passwordHash = await bcrypt.hash(ADMIN_USER.password, 10);
    console.log('✅ Hash gerado\n');

    // Criar o usuário
    console.log('👤 Criando usuário administrador...');
    const user = await prisma.user.create({
      data: {
        username: ADMIN_USER.username,
        passwordHash: passwordHash,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    console.log('✅ Usuário criado com sucesso!\n');
    console.log('📋 Detalhes do usuário:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Status: ${user.isActive ? 'Ativo' : 'Inativo'}`);
    console.log(`   Criado em: ${user.createdAt}\n`);
    console.log('🔑 Credenciais de acesso:');
    console.log(`   Usuário: ${ADMIN_USER.username}`);
    console.log(`   Senha: ${ADMIN_USER.password}\n`);
    console.log('⚠️  IMPORTANTE: Guarde essas credenciais com segurança!\n');

    // Desconectar do banco
    await prisma.$disconnect();
    console.log('👋 Conexão fechada. Seed concluído!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erro ao executar seed:', error.message);
    
    if (error.code === 'P2002') {
      console.error('\n💡 O usuário já existe no banco de dados.');
    } else if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      console.error('\n⚠️  As tabelas do banco de dados ainda não foram criadas!');
      console.error('\n📝 Execute as migrations primeiro:');
      console.error('   cd backend');
      console.error('   npm run prisma:migrate');
      console.error('\n   Ou se preferir usar db push (desenvolvimento):');
      console.error('   npm run prisma:push');
    } else if (error.message?.includes('not connected')) {
      console.error('\n💡 Erro de conexão com o banco de dados.');
      console.error('   Verifique se o DATABASE_URL está correto no arquivo .env');
    } else {
      console.error('\n💡 Verifique:');
      console.error('   - Se o banco de dados está rodando');
      console.error('   - Se as migrations foram executadas (npm run prisma:migrate)');
      console.error('   - Se o DATABASE_URL está correto no arquivo .env');
      console.error('\n   Detalhes do erro:', error.code || 'N/A');
    }
    
    process.exit(1);
  }
}

// Executar o seed
seedAdminUser();
