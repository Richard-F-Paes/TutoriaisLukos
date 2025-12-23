// Hook useTrainings - Gerencia treinamentos com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainingService } from '../services/trainingService.js';
import { getRefreshConfig } from '../infrastructure/config/refresh.config.js';

export const useTrainings = (filters = {}) => {
  return useQuery({
    queryKey: ['trainings', filters],
    queryFn: () => trainingService.list(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    ...getRefreshConfig('moderate'), // Auto-refresh a cada 30s (moderado)
  });
};

export const useTraining = (idOrSlug) => {
  return useQuery({
    queryKey: ['training', idOrSlug],
    queryFn: () => trainingService.get(idOrSlug),
    enabled: !!idOrSlug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trainingData) => trainingService.create(trainingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainings'] });
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => trainingService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainings'] });
      queryClient.invalidateQueries({ queryKey: ['training', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['training'] });
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => trainingService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainings'] });
    },
  });
};

