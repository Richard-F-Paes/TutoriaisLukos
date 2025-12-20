import express from 'express';
import { getPrisma } from '../config/database.js';

const router = express.Router();

// Helper para extrair texto de HTML (remover tags)
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Helper para criar snippet do texto
function createSnippet(text, query, maxLength = 150) {
  if (!text) return '';
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  
  if (index === -1) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 100);
  let snippet = text.substring(start, end);
  
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  
  return snippet;
}

// Helper para calcular score de relevância
function calculateScore(item, query, type) {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  if (type === 'step') {
    // Passos têm prioridade maior
    score += 100;
  } else if (type === 'tutorial') {
    score += 50;
  } else if (type === 'category') {
    score += 30;
  } else {
    score += 10;
  }
  
  // Score por campo
  if (item.title) {
    const titleLower = item.title.toLowerCase();
    if (titleLower === lowerQuery) score += 50;
    else if (titleLower.startsWith(lowerQuery)) score += 30;
    else if (titleLower.includes(lowerQuery)) score += 20;
  }
  
  if (item.description) {
    const descLower = item.description.toLowerCase();
    if (descLower.includes(lowerQuery)) score += 15;
  }
  
  if (item.content) {
    const contentLower = item.content.toLowerCase();
    if (contentLower.includes(lowerQuery)) score += 10;
  }
  
  return score;
}

// GET /api/v1/search?q=...&limit=...
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const query = req.query.q || '';
    const limit = parseInt(req.query.limit) || 10;
    
    if (!query || query.trim().length < 2) {
      return res.json({
        answer: 'Digite pelo menos 2 caracteres para buscar.',
        results: []
      });
    }
    
    const searchTerm = query.trim();
    const results = [];
    
    // 1. Buscar em Tutoriais
    // SQL Server não suporta mode: 'insensitive', então usamos contains que é case-insensitive por padrão
    const tutorials = await prisma.tutorial.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { description: { contains: searchTerm } },
          { content: { contains: searchTerm } },
          { tags: { contains: searchTerm } },
        ],
        isPublished: true,
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          }
        },
        tutorialSteps: {
          orderBy: { sortOrder: 'asc' },
        }
      },
      take: 50, // Buscar mais para depois ranquear
    });
    
    tutorials.forEach(tutorial => {
      const snippet = createSnippet(
        tutorial.description || stripHtml(tutorial.content || ''),
        searchTerm
      );
      
      results.push({
        type: 'tutorial',
        title: tutorial.title,
        snippet,
        tutorialSlug: tutorial.slug,
        categoryName: tutorial.category?.name,
        score: calculateScore({
          title: tutorial.title,
          description: tutorial.description,
          content: tutorial.content,
        }, searchTerm, 'tutorial')
      });
    });
    
    // 2. Buscar em Passos (TutorialStep)
    const steps = await prisma.tutorialStep.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { content: { contains: searchTerm } },
        ],
      },
      include: {
        tutorial: {
          select: {
            slug: true,
            title: true,
            isPublished: true,
            category: {
              select: {
                name: true,
              }
            }
          }
        }
      },
      take: 50,
    });
    
    steps.forEach(step => {
      if (!step.tutorial || !step.tutorial.isPublished) return; // Pular se tutorial não estiver publicado
      
      const snippet = createSnippet(
        step.title + ' ' + stripHtml(step.content || ''),
        searchTerm
      );
      
      results.push({
        type: 'step',
        title: step.title,
        snippet,
        tutorialSlug: step.tutorial.slug,
        tutorialTitle: step.tutorial.title,
        stepId: step.id,
        stepSortOrder: step.sortOrder,
        categoryName: step.tutorial.category?.name,
        score: calculateScore({
          title: step.title,
          content: step.content,
        }, searchTerm, 'step')
      });
    });
    
    // 3. Buscar em Categorias
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { slug: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
        isActive: true,
      },
      take: 20,
    });
    
    categories.forEach(category => {
      results.push({
        type: 'category',
        title: category.name,
        snippet: category.description || `Categoria: ${category.name}`,
        categorySlug: category.slug,
        score: calculateScore({
          title: category.name,
          description: category.description,
        }, searchTerm, 'category')
      });
    });
    
    // 4. Buscar em HeaderMenu e HeaderMenuItem
    const headerMenus = await prisma.headerMenu.findMany({
      where: {
        label: { contains: searchTerm },
      },
      include: {
        items: {
          where: {
            OR: [
              { label: { contains: searchTerm } },
              { tutorialSlug: { contains: searchTerm } },
            ]
          }
        }
      },
      take: 20,
    });
    
    headerMenus.forEach(menu => {
      results.push({
        type: 'headerMenu',
        title: menu.label,
        snippet: `Menu: ${menu.label}`,
        score: calculateScore({
          title: menu.label,
        }, searchTerm, 'headerMenu')
      });
      
      menu.items.forEach(item => {
        if (item.tutorialSlug) {
          results.push({
            type: 'headerMenuItem',
            title: item.label,
            snippet: `Item do menu: ${item.label}`,
            tutorialSlug: item.tutorialSlug,
            score: calculateScore({
              title: item.label,
            }, searchTerm, 'headerMenuItem')
          });
        }
      });
    });
    
    // Ranquear e limitar resultados
    results.sort((a, b) => b.score - a.score);
    const topResults = results.slice(0, limit);
    
    // Gerar resposta do Luk baseada no melhor resultado
    let answer = 'Encontrei alguns resultados que podem ajudar:';
    if (topResults.length === 0) {
      answer = 'Não encontrei nada assim. Pode usar outras palavras?';
    } else if (topResults[0].type === 'step') {
      answer = `Encontrei "${topResults[0].title}" no tutorial "${topResults[0].tutorialTitle}".`;
    } else if (topResults[0].type === 'tutorial') {
      answer = `Encontrei o tutorial "${topResults[0].title}" que pode ajudar.`;
    } else {
      answer = `Encontrei ${topResults.length} resultado${topResults.length > 1 ? 's' : ''} relacionado${topResults.length > 1 ? 's' : ''} à sua busca.`;
    }
    
    res.json({
      answer,
      results: topResults
    });
  } catch (error) {
    console.error('Erro ao buscar:', error);
    res.status(500).json({
      error: 'Erro ao realizar busca',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;

