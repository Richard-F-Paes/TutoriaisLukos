// Hook useAvailability - Gerencia disponibilidades com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { availabilityService } from '../services/availabilityService.js';

export const useAvailability = () => {
  return useQuery({
    queryKey: ['availability'],
    queryFn: () => availabilityService.list(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useAvailabilityItem = (id) => {
  return useQuery({
    queryKey: ['availability', id],
    queryFn: () => availabilityService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAvailableSlots = (date) => {
  return useQuery({
    queryKey: ['availableSlots', date],
    queryFn: () => availabilityService.getAvailableSlots(date),
    enabled: !!date,
    staleTime: 1 * 60 * 1000, // 1 minuto (dados mais dinâmicos)
  });
};

export const useCreateAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (availabilityData) => availabilityService.create(availabilityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
};

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => availabilityService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      queryClient.invalidateQueries({ queryKey: ['availability', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
};

export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => availabilityService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
};



