// Hook useTutorials - Gerencia tutoriais com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tutorialService } from '../services/tutorialService.js';
import { getRefreshConfig } from '../infrastructure/config/refresh.config.js';

export const useTutorials = (filters = {}) => {
  return useQuery({
    queryKey: ['tutorials', filters],
    queryFn: () => {
      // Se houver categorySlug, usar getByCategory
      if (filters.categorySlug) {
        return tutorialService.getByCategory(filters.categorySlug);
      }
      // categoryId é suportado diretamente pelo service.list
      return tutorialService.list(filters);
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    ...getRefreshConfig('moderate'), // Auto-refresh a cada 30s (moderado)
  });
};

export const useTutorial = (slugOrId) => {
  return useQuery({
    queryKey: ['tutorial', slugOrId],
    queryFn: () => {
      // Se for número, buscar por ID, senão por slug
      const isNumeric = !isNaN(slugOrId) && !isNaN(parseFloat(slugOrId));
      if (isNumeric) {
        return tutorialService.getById(slugOrId);
      }
      return tutorialService.getBySlug(slugOrId);
    },
    enabled: !!slugOrId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tutorialData) => tutorialService.create(tutorialData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutorials'] });
    },
  });
};

export const useUpdateTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => tutorialService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tutorials'] });
      // Invalidar tanto por ID quanto por slug (caso tenha mudado)
      queryClient.invalidateQueries({ queryKey: ['tutorial', variables.id] });
      // Invalidar todas as queries de tutorial para garantir atualização
      queryClient.invalidateQueries({ queryKey: ['tutorial'] });
    },
  });
};

export const useDeleteTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => tutorialService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutorials'] });
    },
  });
};

export const useSearchTutorials = (query, options = {}) => {
  return useQuery({
    queryKey: ['tutorials', 'search', query, options],
    queryFn: () => tutorialService.search(query, options),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
  });
};
