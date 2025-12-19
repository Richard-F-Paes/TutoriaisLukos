// Hook useSteps - Gerencia passos (TutorialSteps) com React Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stepService } from '../services/stepService.js';

export const useSteps = (tutorialId) => {
  return useQuery({
    queryKey: ['steps', tutorialId],
    queryFn: () => stepService.list(tutorialId),
    enabled: !!tutorialId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateStep = (tutorialId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => stepService.create(tutorialId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps', tutorialId] });
      queryClient.invalidateQueries({ queryKey: ['tutorial', tutorialId] });
    },
  });
};

export const useUpdateStep = (tutorialId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stepId, data }) => stepService.update(tutorialId, stepId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps', tutorialId] });
      queryClient.invalidateQueries({ queryKey: ['tutorial', tutorialId] });
    },
  });
};

export const useDeleteStep = (tutorialId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (stepId) => stepService.delete(tutorialId, stepId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps', tutorialId] });
      queryClient.invalidateQueries({ queryKey: ['tutorial', tutorialId] });
    },
  });
};

export const useReorderSteps = (tutorialId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (stepIds) => stepService.reorder(tutorialId, stepIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps', tutorialId] });
      queryClient.invalidateQueries({ queryKey: ['tutorial', tutorialId] });
    },
  });
};


