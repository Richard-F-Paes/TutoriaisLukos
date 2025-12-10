// Script de Migração de Tutoriais
// Migra dados dos arquivos __mocks__ para o banco de dados via API

import axios from 'axios';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração da API
const API_URL = process.env.VITE_API_URL || 'http://localhost:3001';
const API_VERSION = '/api/v1';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''; // Token de autenticação

// Cliente HTTP
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    ...(ACCESS_TOKEN && { Authorization: `Bearer ${ACCESS_TOKEN}` }),
  },
});

// Função para ler e parsear arquivos de mock
function loadMockData() {
  try {
    // Tentar importar dinamicamente os mocks
    // Nota: Em produção, você pode precisar converter os arquivos para JSON primeiro
    const lukosTutorialsPath = join(__dirname, '../src/shared/data/__mocks__/lukosTutorials.js');
    const retaguardaTutorialsPath = join(__dirname, '../src/shared/data/__mocks__/retaguardaTutorials.js');
    
    console.log('⚠️  Nota: Este script requer que os dados dos mocks sejam convertidos para JSON primeiro.');
    console.log('   Ou você pode executar a migração manualmente através do Admin Panel.');
    console.log('');
    console.log('Para migrar os dados:');
    console.log('1. Acesse o Admin Panel (/admin)');
    console.log('2. Use a interface de criação de tutoriais');
    console.log('3. Ou use a API diretamente com um script personalizado');
    console.log('');
    console.log('Endpoints disponíveis:');
    console.log(`- POST ${API_URL}${API_VERSION}/tutorials`);
    console.log(`- POST ${API_URL}${API_VERSION}/categories`);
    console.log('');
    
    return { tutorials: [], categories: [] };
  } catch (error) {
    console.error('Erro ao carregar dados dos mocks:', error.message);
    return { tutorials: [], categories: [] };
  }
}

// Função para criar categoria
async function createCategory(categoryData) {
  try {
    const response = await apiClient.post(`${API_VERSION}/categories`, {
      Name: categoryData.name || categoryData.Name,
      Slug: categoryData.slug || categoryData.Slug || categoryData.name?.toLowerCase().replace(/\s+/g, '-'),
      Description: categoryData.description || categoryData.Description || '',
      Icon: categoryData.icon || categoryData.Icon || '',
      Color: categoryData.color || categoryData.Color || '#3b82f6',
      IsActive: true,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 409 || error.response?.status === 400) {
      console.log(`  ⚠️  Categoria já existe ou erro: ${error.response?.data?.message || error.message}`);
      return null;
    }
    throw error;
  }
}

// Função para criar tutorial
async function createTutorial(tutorialData, categoryId = null) {
  try {
    // Converter steps do formato antigo para o novo
    const steps = (tutorialData.steps || tutorialData.Steps || []).map((step, index) => ({
      Title: step.title || step.Title || `Passo ${index + 1}`,
      Content: step.description || step.Content || step.content || '',
      VideoUrl: step.videoUrl || step.VideoUrl || '',
      ImageUrl: step.image || step.ImageUrl || step.imageUrl || '',
      SortOrder: step.step || step.SortOrder || index + 1,
      Duration: step.duration ? parseInt(step.duration.replace(' min', '')) : null,
    }));

    const payload = {
      Title: tutorialData.title || tutorialData.Title,
      Slug: tutorialData.id || tutorialData.Slug || tutorialData.title?.toLowerCase().replace(/\s+/g, '-'),
      Description: tutorialData.description || tutorialData.Description || '',
      Content: tutorialData.content || tutorialData.Content || '',
      CategoryId: categoryId,
      ThumbnailUrl: tutorialData.image || tutorialData.ThumbnailUrl || tutorialData.thumbnailUrl || '',
      VideoUrl: tutorialData.videoUrl || tutorialData.VideoUrl || '',
      Difficulty: tutorialData.difficulty || tutorialData.Difficulty || 'iniciante',
      EstimatedDuration: tutorialData.duration ? parseInt(tutorialData.duration.replace(' min', '')) : null,
      IsPublished: true,
      IsFeatured: false,
      Tags: JSON.stringify(tutorialData.tags || []),
    };

    const response = await apiClient.post(`${API_VERSION}/tutorials`, payload);
    
    // Se houver steps, criar eles
    if (steps.length > 0 && response.data?.data?.Id) {
      const tutorialId = response.data.data.Id;
      for (const step of steps) {
        try {
          await apiClient.post(`${API_VERSION}/tutorials/${tutorialId}/steps`, step);
        } catch (stepError) {
          console.log(`    ⚠️  Erro ao criar step: ${stepError.message}`);
        }
      }
    }
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 409 || error.response?.status === 400) {
      console.log(`  ⚠️  Tutorial já existe ou erro: ${error.response?.data?.message || error.message}`);
      return null;
    }
    throw error;
  }
}

// Função principal de migração
async function migrate() {
  console.log('🚀 Iniciando migração de tutoriais...\n');
  console.log(`📡 API URL: ${API_URL}`);
  console.log(`🔑 Token: ${ACCESS_TOKEN ? 'Fornecido' : 'Não fornecido (algumas operações podem falhar)'}\n`);

  const { tutorials, categories } = loadMockData();

  // Criar categorias primeiro
  console.log('📁 Criando categorias...');
  const categoryMap = new Map();
  
  for (const category of categories) {
    try {
      const result = await createCategory(category);
      if (result?.data) {
        categoryMap.set(category.name || category.Name, result.data.Id);
        console.log(`  ✅ Categoria criada: ${category.name || category.Name}`);
      }
    } catch (error) {
      console.error(`  ❌ Erro ao criar categoria ${category.name || category.Name}:`, error.message);
    }
  }

  // Criar tutoriais
  console.log('\n📚 Criando tutoriais...');
  let successCount = 0;
  let errorCount = 0;
  let skipCount = 0;

  for (const tutorial of tutorials) {
    try {
      const categoryName = tutorial.category || tutorial.Category?.Name;
      const categoryId = categoryName ? categoryMap.get(categoryName) : null;
      
      const result = await createTutorial(tutorial, categoryId);
      if (result?.data) {
        successCount++;
        console.log(`  ✅ Tutorial criado: ${tutorial.title || tutorial.Title}`);
      } else {
        skipCount++;
      }
    } catch (error) {
      errorCount++;
      console.error(`  ❌ Erro ao criar tutorial ${tutorial.title || tutorial.Title}:`, error.message);
    }
    
    // Pequeno delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Resumo da migração:');
  console.log(`  ✅ Sucesso: ${successCount}`);
  console.log(`  ⏭️  Ignorados: ${skipCount}`);
  console.log(`  ❌ Erros: ${errorCount}`);
  console.log('\n✨ Migração concluída!');
}

// Executar migração
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate().catch(error => {
    console.error('❌ Erro fatal na migração:', error);
    process.exit(1);
  });
}

export { migrate, createTutorial, createCategory };

