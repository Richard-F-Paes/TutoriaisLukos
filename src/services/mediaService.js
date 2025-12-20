// Serviço de Mídia
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const mediaService = {
  // Upload de arquivo
  async upload(file, userId = null) {
    const formData = new FormData();
    formData.append('file', file);
    if (userId) {
      formData.append('uploadedBy', userId.toString());
    }
    const response = await apiClient.post(endpoints.media.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Listar mídia
  async list(filters = {}) {
    const response = await apiClient.get(endpoints.media.list, { params: filters });
    return response.data;
  },

  // Excluir mídia
  async delete(id) {
    const response = await apiClient.delete(endpoints.media.delete(id));
    return response.data;
  },
};
