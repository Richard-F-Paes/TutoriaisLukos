// Serviço de Usuários
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const userService = {
  // Listar usuários
  async list() {
    const response = await apiClient.get(endpoints.users.list);
    return response.data;
  },

  // Obter usuário por ID
  async getById(id) {
    const response = await apiClient.get(endpoints.users.get(id));
    return response.data;
  },

  // Criar usuário
  async create(userData) {
    const response = await apiClient.post(endpoints.users.create, userData);
    return response.data;
  },

  // Atualizar usuário
  async update(id, userData) {
    const response = await apiClient.put(endpoints.users.update(id), userData);
    return response.data;
  },

  // Excluir usuário
  async delete(id) {
    const response = await apiClient.delete(endpoints.users.delete(id));
    return response.data;
  },

  // Alterar senha
  async changePassword(id, password) {
    const response = await apiClient.post(endpoints.users.changePassword(id), { password });
    return response.data;
  },
};
