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

  // Calcular estatísticas localmente se API não retornar
  const localStats = {
    totalTutorials: tutorialsData?.data?.length || 0,
    publishedTutorials: tutorialsData?.data?.filter(t => t.IsPublished)?.length || 0,
    unpublishedTutorials: tutorialsData?.data?.filter(t => !t.IsPublished)?.length || 0,
    totalCategories: categoriesData?.data?.length || 0,
    totalViews: tutorialsData?.data?.reduce((sum, t) => sum + (t.ViewCount || 0), 0) || 0,
    mostViewed: tutorialsData?.data
      ?.sort((a, b) => (b.ViewCount || 0) - (a.ViewCount || 0))
      ?.slice(0, 5) || [],
    recentTutorials: tutorialsData?.data
      ?.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
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

