// Serviço de Vídeos de Treinamentos
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const trainingVideoService = {
  // Listar vídeos de um treinamento
  async list(trainingId) {
    const response = await apiClient.get(endpoints.trainingVideos.list(trainingId));
    return response.data;
  },

  // Upload de vídeo
  async upload(trainingId, file) {
    const formData = new FormData();
    formData.append('video', file);
    const response = await apiClient.post(endpoints.trainingVideos.upload(trainingId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Deletar vídeo
  async delete(trainingId, videoId) {
    const response = await apiClient.delete(endpoints.trainingVideos.delete(trainingId, videoId));
    return response.data;
  },

  // Reordenar vídeos
  async reorder(trainingId, videoIds) {
    const response = await apiClient.put(endpoints.trainingVideos.reorder(trainingId), { videoIds });
    return response.data;
  },
};

export default trainingVideoService;

