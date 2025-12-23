// Hook useAdminStats - Busca estatísticas administrativas do banco de dados
import { useQuery } from '@tanstack/react-query';
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';
import { getRefreshConfig } from '../infrastructure/config/refresh.config.js';

export const useAdminStats = () => {
  // Buscar estatísticas agregadas da API (sempre do banco de dados)
  const statsQuery = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const response = await apiClient.get(endpoints.admin.stats);
      // A API retorna { success: true, data: { ... } }
      return response.data?.data || response.data || {};
    },
    staleTime: 0, // Sempre considerar stale para garantir dados atualizados
    cacheTime: 2 * 60 * 1000, // Manter no cache por 2 minutos
    refetchOnWindowFocus: true, // Refetch quando a janela ganha foco
    refetchOnMount: true, // Sempre refetch ao montar
    ...getRefreshConfig('critical'), // Auto-refresh a cada 10s (crítico)
  });

  const stats = statsQuery.data || {};

  return {
    ...statsQuery,
    stats,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
    error: statsQuery.error,
  };
};

export default useAdminStats;

