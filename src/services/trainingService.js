// Serviço de Treinamentos
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const trainingService = {
  // Listar treinamentos
  async list(filters = {}) {
    const response = await apiClient.get(endpoints.trainings.list, { params: filters });
    return response.data;
  },

  // Obter treinamento por ID ou slug
  async get(idOrSlug) {
    const response = await apiClient.get(endpoints.trainings.get(idOrSlug));
    return response.data;
  },

  // Criar treinamento
  async create(trainingData) {
    const response = await apiClient.post(endpoints.trainings.create, trainingData);
    return response.data;
  },

  // Atualizar treinamento
  async update(id, trainingData) {
    const response = await apiClient.put(endpoints.trainings.update(id), trainingData);
    return response.data;
  },

  // Excluir treinamento
  async delete(id) {
    const response = await apiClient.delete(endpoints.trainings.delete(id));
    return response.data;
  },
};

export default trainingService;

