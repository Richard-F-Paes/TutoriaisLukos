// Hook useMedia - Gerencia mídia com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaService } from '../services/mediaService.js';

export const useMedia = (filters = {}) => {
  return useQuery({
    queryKey: ['media', filters],
    queryFn: () => mediaService.list(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => mediaService.upload(file),
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
