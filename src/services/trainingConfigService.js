// Serviço de Configurações de Treinamento
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const trainingConfigService = {
  // Listar todas as configurações
  async list(type = null) {
    const params = type ? { type } : {};
    const response = await apiClient.get(endpoints.trainingConfigs.list, { params });
    return response.data;
  },

  // Obter configurações por tipo
  async getByType(type) {
    const response = await apiClient.get(endpoints.trainingConfigs.getByType(type));
    // A API retorna os dados diretamente como array
    return Array.isArray(response.data) ? response.data : response.data?.data || response.data || [];
  },

  // Obter configuração por ID
  async getById(id) {
    const response = await apiClient.get(endpoints.trainingConfigs.get(id));
    return response.data;
  },

  // Criar configuração
  async create(configData) {
    const response = await apiClient.post(endpoints.trainingConfigs.create, configData);
    return response.data;
  },

  // Atualizar configuração
  async update(id, configData) {
    const response = await apiClient.put(endpoints.trainingConfigs.update(id), configData);
    return response.data;
  },

  // Excluir configuração
  async delete(id) {
    const response = await apiClient.delete(endpoints.trainingConfigs.delete(id));
    return response.data;
  },
};

