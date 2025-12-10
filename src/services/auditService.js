// Serviço de Auditoria
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const auditService = {
  // Listar logs
  async list(filters = {}) {
    const response = await apiClient.get(endpoints.audit.logs, { params: filters });
    return response.data;
  },
};
