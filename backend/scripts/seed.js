import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Tutorial from '../src/models/Tutorial.js';

// Configurar dotenv
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB conectado para seed');
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  console.log('👥 Criando usuários...');
  
  const users = [
    {
      name: 'Administrador',
      email: 'admin@lukos.com',
      password: 'admin123',
      role: 'super_admin',
      emailVerified: true,
      isActive: true
    },
    {
      name: 'Editor Principal',
      email: 'editor@lukos.com',
      password: 'editor123',
      role: 'editor',
      emailVerified: true,
      isActive: true
    },
    {
      name: 'Moderador',
      email: 'moderator@lukos.com',
      password: 'moderator123',
      role: 'moderator',
      emailVerified: true,
      isActive: true
    },
    {
      name: 'Usuário Teste',
      email: 'viewer@lukos.com',
      password: 'viewer123',
      role: 'viewer',
      emailVerified: true,
      isActive: true
    }
  ];

  for (const userData of users) {
    const existingUser = await User.findByEmail(userData.email);
    if (!existingUser) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Usuário criado: ${userData.email}`);
    } else {
      console.log(`⚠️ Usuário já existe: ${userData.email}`);
    }
  }
};

const seedTutorials = async () => {
  console.log('📚 Criando tutoriais...');
  
  // Buscar usuário admin para ser autor dos tutoriais
  const adminUser = await User.findByEmail('admin@lukos.com');
  if (!adminUser) {
    console.log('❌ Usuário admin não encontrado');
    return;
  }

  const tutorials = [
    {
      title: 'Introdução ao Sistema Lukos',
      description: 'Aprenda os conceitos básicos do sistema Lukos e como navegar pela interface principal.',
      category: 'sistema',
      difficulty: 'beginner',
      tags: ['introdução', 'básico', 'navegação'],
      author: adminUser._id,
      isPublished: true,
      publishedAt: new Date(),
      estimatedTime: 30,
      steps: [
        {
          title: 'Acessando o Sistema',
          content: 'Para acessar o sistema Lukos, abra seu navegador e digite o endereço fornecido pelo administrador.',
          order: 1,
          type: 'text',
          estimatedTime: 5
        },
        {
          title: 'Fazendo Login',
          content: 'Digite seu usuário e senha nos campos correspondentes e clique em "Entrar".',
          order: 2,
          type: 'text',
          estimatedTime: 3
        },
        {
          title: 'Conhecendo a Interface',
          content: 'A interface principal é composta por: menu lateral, área de trabalho e barra de status.',
          order: 3,
          type: 'text',
          estimatedTime: 10
        },
        {
          title: 'Navegando pelos Módulos',
          content: 'Use o menu lateral para navegar entre os diferentes módulos do sistema.',
          order: 4,
          type: 'text',
          estimatedTime: 12
        }
      ]
    },
    {
      title: 'Configuração do PDV',
      description: 'Configure seu terminal de vendas (PDV) para funcionar corretamente com o sistema.',
      category: 'pdv',
      difficulty: 'intermediate',
      tags: ['pdv', 'configuração', 'terminal'],
      author: adminUser._id,
      isPublished: true,
      publishedAt: new Date(),
      estimatedTime: 45,
      steps: [
        {
          title: 'Instalação do Software',
          content: 'Baixe e instale o software do PDV no terminal que será usado para vendas.',
          order: 1,
          type: 'text',
          estimatedTime: 15
        },
        {
          title: 'Configuração de Rede',
          content: 'Configure a conexão de rede para que o PDV se comunique com o servidor principal.',
          order: 2,
          type: 'text',
          estimatedTime: 10
        },
        {
          title: 'Configuração de Impressora',
          content: 'Configure a impressora fiscal e a impressora de cupom não fiscal.',
          order: 3,
          type: 'text',
          estimatedTime: 20
        }
      ]
    },
    {
      title: 'Gestão de Estoque na Retaguarda',
      description: 'Aprenda a gerenciar o estoque de produtos através do módulo de retaguarda.',
      category: 'retaguarda',
      difficulty: 'intermediate',
      tags: ['estoque', 'retaguarda', 'produtos'],
      author: adminUser._id,
      isPublished: true,
      publishedAt: new Date(),
      estimatedTime: 60,
      steps: [
        {
          title: 'Cadastro de Produtos',
          content: 'Cadastre novos produtos no sistema com todas as informações necessárias.',
          order: 1,
          type: 'text',
          estimatedTime: 20
        },
        {
          title: 'Controle de Entrada',
          content: 'Registre as entradas de produtos no estoque através de compras ou transferências.',
          order: 2,
          type: 'text',
          estimatedTime: 15
        },
        {
          title: 'Controle de Saída',
          content: 'Registre as saídas de produtos através de vendas ou transferências.',
          order: 3,
          type: 'text',
          estimatedTime: 15
        },
        {
          title: 'Relatórios de Estoque',
          content: 'Gere relatórios para acompanhar o movimento e saldo do estoque.',
          order: 4,
          type: 'text',
          estimatedTime: 10
        }
      ]
    }
  ];

  for (const tutorialData of tutorials) {
    const existingTutorial = await Tutorial.findOne({ title: tutorialData.title });
    if (!existingTutorial) {
      const tutorial = new Tutorial(tutorialData);
      await tutorial.save();
      console.log(`✅ Tutorial criado: ${tutorialData.title}`);
    } else {
      console.log(`⚠️ Tutorial já existe: ${tutorialData.title}`);
    }
  }
};

const seed = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Iniciando seed do banco de dados...');
    
    await seedUsers();
    await seedTutorials();
    
    console.log('✅ Seed concluído com sucesso!');
    console.log('\n📋 Contas criadas:');
    console.log('👑 Super Admin: admin@lukos.com / admin123');
    console.log('✏️ Editor: editor@lukos.com / editor123');
    console.log('🛡️ Moderador: moderator@lukos.com / moderator123');
    console.log('👤 Viewer: viewer@lukos.com / viewer123');
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexão com MongoDB fechada');
    process.exit(0);
  }
};

// Executar seed
seed();
