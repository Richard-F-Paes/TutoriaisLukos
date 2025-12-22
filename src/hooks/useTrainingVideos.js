// Hook useTrainingVideos - Gerencia vídeos de treinamentos com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainingVideoService } from '../services/trainingVideoService.js';

export const useTrainingVideos = (trainingId) => {
  return useQuery({
    queryKey: ['trainingVideos', trainingId],
    queryFn: () => trainingVideoService.list(trainingId),
    enabled: !!trainingId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUploadTrainingVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trainingId, file }) => trainingVideoService.upload(trainingId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainingVideos', variables.trainingId] });
      queryClient.invalidateQueries({ queryKey: ['training', variables.trainingId] });
    },
  });
};

export const useDeleteTrainingVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trainingId, videoId }) => trainingVideoService.delete(trainingId, videoId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainingVideos', variables.trainingId] });
      queryClient.invalidateQueries({ queryKey: ['training', variables.trainingId] });
    },
  });
};

export const useReorderTrainingVideos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trainingId, videoIds }) => trainingVideoService.reorder(trainingId, videoIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainingVideos', variables.trainingId] });
      queryClient.invalidateQueries({ queryKey: ['training', variables.trainingId] });
    },
  });
};

