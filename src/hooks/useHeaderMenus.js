// Hook para gerenciar menus do header
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { headerMenuService } from '../services/headerMenuService';
import { getRefreshConfig } from '../infrastructure/config/refresh.config.js';

export const useHeaderMenus = () => {
  return useQuery({
    queryKey: ['headerMenus'],
    queryFn: () => headerMenuService.list(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    ...getRefreshConfig('static'), // Auto-refresh a cada 5min (estático)
  });
};

export const useCreateHeaderMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menuData) => headerMenuService.create(menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerMenus'] });
    },
  });
};

export const useUpdateHeaderMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => headerMenuService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerMenus'] });
    },
  });
};

export const useDeleteHeaderMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => headerMenuService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerMenus'] });
    },
  });
};

export const useReorderHeaderMenus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menuIds) => headerMenuService.reorder(menuIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerMenus'] });
    },
  });
};

