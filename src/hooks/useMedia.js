// Hook useMedia - Gerencia mídia com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaService } from '../services/mediaService.js';
import { getRefreshConfig } from '../infrastructure/config/refresh.config.js';

export const useMedia = (filters = {}) => {
  return useQuery({
    queryKey: ['media', filters],
    queryFn: () => mediaService.list(filters),
    staleTime: 5 * 60 * 1000,
    ...getRefreshConfig('moderate'), // Auto-refresh a cada 30s (moderado)
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, userId = null }) => mediaService.upload(file, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => mediaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};
