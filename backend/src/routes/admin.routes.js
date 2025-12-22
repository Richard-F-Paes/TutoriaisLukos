import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';

const router = express.Router();

// Estatísticas administrativas - Acessível para todos os usuários autenticados
router.get('/stats', authenticate, async (req, res) => {
  try {
    const prisma = getPrisma();
    
    // Calcular data de 30 dias atrás
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Buscar estatísticas de tutoriais
    const [totalTutorials, publishedTutorials, unpublishedTutorials, totalCategories] = await Promise.all([
      prisma.tutorial.count(),
      prisma.tutorial.count({ where: { isPublished: true } }),
      prisma.tutorial.count({ where: { isPublished: false } }),
      prisma.category.count({ where: { isActive: true } }),
    ]);

    // Buscar estatísticas de treinamentos
    const [totalTrainings, publishedTrainings, unpublishedTrainings, featuredTrainings] = await Promise.all([
      prisma.training.count(),
      prisma.training.count({ where: { isPublished: true } }),
      prisma.training.count({ where: { isPublished: false } }),
      prisma.training.count({ where: { isFeatured: true } }),
    ]);

    // Buscar estatísticas de agendamentos
    const [totalAppointments, pendingAppointments, confirmedAppointments, completedAppointments, cancelledAppointments] = await Promise.all([
      prisma.trainingAppointment.count(),
      prisma.trainingAppointment.count({ where: { status: 'pending' } }),
      prisma.trainingAppointment.count({ where: { status: 'confirmed' } }),
      prisma.trainingAppointment.count({ where: { status: 'completed' } }),
      prisma.trainingAppointment.count({ where: { status: 'cancelled' } }),
    ]);

    // Buscar visualizações dos últimos 30 dias
    let totalViewsLast30Days = 0;
    try {
      const viewsCount = await prisma.tutorialView.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      });
      totalViewsLast30Days = viewsCount;
    } catch (error) {
      // Se a tabela TutorialView não existir ainda, retorna 0
      console.warn('Tabela TutorialView não encontrada, retornando 0 para visualizações dos últimos 30 dias');
      totalViewsLast30Days = 0;
    }

    // Buscar total de visualizações (soma de todos os viewCount)
    const tutorials = await prisma.tutorial.findMany({
      select: { viewCount: true },
    });
    const totalViews = tutorials.reduce((sum, t) => sum + (t.viewCount || 0), 0);

    // Função para normalizar tutorial (compatibilidade com frontend)
    const normalizeTutorial = (tutorial) => ({
      ...tutorial,
      Id: tutorial.id,
      Title: tutorial.title,
      ViewCount: tutorial.viewCount,
      UpdatedAt: tutorial.updatedAt,
      CreatedAt: tutorial.createdAt,
      IsPublished: tutorial.isPublished,
      Category: tutorial.category ? {
        ...tutorial.category,
        Id: tutorial.category.id,
        Name: tutorial.category.name,
        Parent: tutorial.category.parent ? {
          ...tutorial.category.parent,
          Id: tutorial.category.parent.id,
          Name: tutorial.category.parent.name,
        } : null,
      } : null,
    });

    // Buscar tutoriais mais visualizados
    const mostViewedRaw = await prisma.tutorial.findMany({
      where: { isPublished: true },
      orderBy: { viewCount: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        viewCount: true,
        updatedAt: true,
        isPublished: true,
        category: {
          select: {
            id: true,
            name: true,
            parent: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // Buscar tutoriais recentes (ordenados por última atualização)
    const recentTutorialsRaw = await prisma.tutorial.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        viewCount: true,
        updatedAt: true,
        createdAt: true,
        isPublished: true,
        category: {
          select: {
            id: true,
            name: true,
            parent: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // Normalizar dados para compatibilidade com frontend
    const mostViewed = mostViewedRaw.map(normalizeTutorial);
    const recentTutorials = recentTutorialsRaw.map(normalizeTutorial);

    res.json({
      success: true,
      data: {
        totalTutorials,
        publishedTutorials,
        unpublishedTutorials,
        totalCategories,
        totalViews,
        totalViewsLast30Days,
        mostViewed,
        recentTutorials,
        // Estatísticas de treinamentos
        totalTrainings,
        publishedTrainings,
        unpublishedTrainings,
        featuredTrainings,
        // Estatísticas de agendamentos
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas administrativas' });
  }
});

export default router;

