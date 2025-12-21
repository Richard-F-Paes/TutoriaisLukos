// Hook useAdminStats - Busca estatísticas administrativas
import { useQuery } from '@tanstack/react-query';
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';
import { useTutorials } from './useTutorials.js';
import { useCategories } from './useCategories.js';

export const useAdminStats = () => {
  // Buscar estatísticas agregadas da API
  const statsQuery = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/api/v1/admin/stats');
        return response.data;
      } catch (error) {
        // Se endpoint não existir, calcular localmente
        console.warn('Endpoint de estatísticas não disponível, calculando localmente');
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Buscar dados para calcular estatísticas localmente se necessário
  const { data: tutorialsData } = useTutorials();
  const { data: categoriesData } = useCategories();

  // Calcular data de 30 dias atrás
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Calcular estatísticas localmente se API não retornar
  const localStats = {
    totalTutorials: tutorialsData?.data?.length || 0,
    publishedTutorials: tutorialsData?.data?.filter(t => t.IsPublished)?.length || 0,
    unpublishedTutorials: tutorialsData?.data?.filter(t => !t.IsPublished)?.length || 0,
    totalCategories: categoriesData?.data?.length || 0,
    totalViews: tutorialsData?.data?.reduce((sum, t) => sum + (t.ViewCount || 0), 0) || 0,
    // Visualizações dos últimos 30 dias: considera tutoriais atualizados nos últimos 30 dias
    totalViewsLast30Days: tutorialsData?.data
      ?.filter(t => {
        const updatedAt = t.UpdatedAt ? new Date(t.UpdatedAt) : null;
        const publishedAt = t.PublishedAt ? new Date(t.PublishedAt) : null;
        // Considera se foi atualizado ou publicado nos últimos 30 dias
        return (updatedAt && updatedAt >= thirtyDaysAgo) || (publishedAt && publishedAt >= thirtyDaysAgo);
      })
      ?.reduce((sum, t) => sum + (t.ViewCount || 0), 0) || 0,
    mostViewed: tutorialsData?.data
      ?.sort((a, b) => (b.ViewCount || b.viewCount || 0) - (a.ViewCount || a.viewCount || 0))
      ?.slice(0, 5) || [],
    recentTutorials: tutorialsData?.data
      ?.sort((a, b) => {
        const dateA = new Date(a.UpdatedAt || a.updatedAt || a.CreatedAt || a.createdAt || 0);
        const dateB = new Date(b.UpdatedAt || b.updatedAt || b.CreatedAt || b.createdAt || 0);
        return dateB - dateA;
      })
      ?.slice(0, 5) || []
  };

  // Usar dados da API se disponíveis, senão usar cálculo local
  const stats = statsQuery.data?.data || localStats;

  return {
    ...statsQuery,
    data: {
      ...statsQuery.data,
      data: stats
    },
    stats
  };
};

export default useAdminStats;

