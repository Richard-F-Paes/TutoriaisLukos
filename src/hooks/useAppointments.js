// Hook useAppointments - Gerencia agendamentos com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '../services/appointmentService.js';

export const useAppointments = (filters = {}) => {
  return useQuery({
    queryKey: ['appointments', filters],
    queryFn: () => appointmentService.list(filters),
    staleTime: 0, // Sempre considerar os dados como stale para permitir refetch imediato
    cacheTime: 5 * 60 * 1000, // Manter no cache por 5 minutos
  });
};

export const useAppointment = (id) => {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentService.get(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentData) => appointmentService.create(appointmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => appointmentService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancelar queries em andamento para evitar sobrescrever nossa atualização otimista
      await queryClient.cancelQueries({ queryKey: ['appointments'], exact: false });
      await queryClient.cancelQueries({ queryKey: ['admin', 'stats'] });
      
      // Snapshot do valor anterior
      const previousAppointments = queryClient.getQueriesData({ 
        queryKey: ['appointments'], 
        exact: false 
      });
      
      // Atualização otimista: atualizar o cache imediatamente
      queryClient.setQueriesData(
        { queryKey: ['appointments'], exact: false },
        (oldData) => {
          if (!oldData?.data) return oldData;
          
          return {
            ...oldData,
            data: oldData.data.map((apt) => {
              const aptId = apt.id || apt.Id;
              if (aptId === id) {
                return {
                  ...apt,
                  status: data.status,
                  Status: data.status,
                };
              }
              return apt;
            }),
          };
        }
      );
      
      return { previousAppointments };
    },
    onError: (err, variables, context) => {
      // Reverter para o valor anterior em caso de erro
      if (context?.previousAppointments) {
        context.previousAppointments.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: (response, variables) => {
      const updatedAppointment = response?.data || response;
      
      // Atualizar o cache com os dados reais do servidor
      queryClient.setQueriesData(
        { queryKey: ['appointments'], exact: false },
        (oldData) => {
          if (!oldData?.data) return oldData;
          
          return {
            ...oldData,
            data: oldData.data.map((apt) => {
              const aptId = apt.id || apt.Id;
              if (aptId === variables.id) {
                return {
                  ...apt,
                  ...updatedAppointment,
                  status: updatedAppointment.status || variables.data.status,
                  Status: updatedAppointment.status || variables.data.status,
                };
              }
              return apt;
            }),
          };
        }
      );
      
      // Invalidar todas as queries de appointments para garantir sincronização
      queryClient.invalidateQueries({ 
        queryKey: ['appointments'],
        exact: false
      });
      
      // Invalidar estatísticas do admin para atualizar contadores
      queryClient.invalidateQueries({ 
        queryKey: ['admin', 'stats']
      });
      
      // Invalidar a query específica do appointment
      queryClient.invalidateQueries({ 
        queryKey: ['appointment', variables.id] 
      });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => appointmentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

