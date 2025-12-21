// Serviço de Disponibilidade de Treinamentos
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const availabilityService = {
  // Listar disponibilidades
  async list() {
    const response = await apiClient.get(endpoints.availability.list);
    return response.data;
  },

  // Obter disponibilidade por ID
  async get(id) {
    const response = await apiClient.get(endpoints.availability.get(id));
    return response.data;
  },

  // Obter slots disponíveis para uma data
  async getAvailableSlots(date) {
    const response = await apiClient.get(endpoints.availability.availableSlots, {
      params: { date },
    });
    return response.data;
  },

  // Criar disponibilidade
  async create(availabilityData) {
    const response = await apiClient.post(endpoints.availability.create, availabilityData);
    return response.data;
  },

  // Atualizar disponibilidade
  async update(id, availabilityData) {
    const response = await apiClient.put(endpoints.availability.update(id), availabilityData);
    return response.data;
  },

  // Excluir disponibilidade
  async delete(id) {
    const response = await apiClient.delete(endpoints.availability.delete(id));
    return response.data;
  },
};

export default availabilityService;

