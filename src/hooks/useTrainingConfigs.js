import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainingConfigService } from '../services/trainingConfigService.js';

// Query key factory
const trainingConfigKeys = {
  all: ['trainingConfigs'],
  lists: () => [...trainingConfigKeys.all, 'list'],
  list: (type) => [...trainingConfigKeys.lists(), { type }],
  details: () => [...trainingConfigKeys.all, 'detail'],
  detail: (id) => [...trainingConfigKeys.details(), id],
  byType: (type) => [...trainingConfigKeys.all, 'type', type],
};

// Hook para buscar todas as configurações (opcionalmente filtradas por tipo)
export function useTrainingConfigs(type = null) {
  return useQuery({
    queryKey: trainingConfigKeys.list(type),
    queryFn: () => trainingConfigService.list(type),
  });
}

// Hook para buscar configurações por tipo
export function useTrainingConfigsByType(type) {
  return useQuery({
    queryKey: trainingConfigKeys.byType(type),
    queryFn: () => trainingConfigService.getByType(type),
    enabled: !!type,
  });
}

// Hook para buscar uma configuração específica
export function useTrainingConfig(id) {
  return useQuery({
    queryKey: trainingConfigKeys.detail(id),
    queryFn: () => trainingConfigService.getById(id),
    enabled: !!id,
  });
}

// Hook para criar configuração
export function useCreateTrainingConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (configData) => trainingConfigService.create(configData),
    onSuccess: () => {
      // Invalidar todas as queries relacionadas
      queryClient.invalidateQueries({ queryKey: trainingConfigKeys.all });
    },
  });
}

// Hook para atualizar configuração
export function useUpdateTrainingConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => trainingConfigService.update(id, data),
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: trainingConfigKeys.all });
      queryClient.invalidateQueries({ queryKey: trainingConfigKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: trainingConfigKeys.byType(data.type) });
    },
  });
}

// Hook para excluir configuração
export function useDeleteTrainingConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => trainingConfigService.delete(id),
    onSuccess: () => {
      // Invalidar todas as queries relacionadas
      queryClient.invalidateQueries({ queryKey: trainingConfigKeys.all });
    },
  });
}

