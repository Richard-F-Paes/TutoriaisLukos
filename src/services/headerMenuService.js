// Serviço para gerenciar menus do header
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const headerMenuService = {
  // Listar menus do header
  async list() {
    try {
      const response = await apiClient.get(endpoints.headerMenus?.list || '/api/v1/header-menus');
      return response.data;
    } catch (error) {
      // Se o endpoint não existir, retornar menus padrão
      console.warn('Endpoint de menus do header não encontrado, usando menus padrão');
      return { data: [] };
    }
  },

  // Obter menu por ID
  async getById(id) {
    const response = await apiClient.get(endpoints.headerMenus?.get(id) || `/api/v1/header-menus/${id}`);
    return response.data;
  },

  // Criar menu
  async create(menuData) {
    const response = await apiClient.post(endpoints.headerMenus?.create || '/api/v1/header-menus', menuData);
    return response.data;
  },

  // Atualizar menu
  async update(id, menuData) {
    const response = await apiClient.put(endpoints.headerMenus?.update(id) || `/api/v1/header-menus/${id}`, menuData);
    return response.data;
  },

  // Excluir menu
  async delete(id) {
    const response = await apiClient.delete(endpoints.headerMenus?.delete(id) || `/api/v1/header-menus/${id}`);
    return response.data;
  },

  // Reordenar menus
  async reorder(menuIds) {
    const response = await apiClient.post(endpoints.headerMenus?.reorder || '/api/v1/header-menus/reorder', { menuIds });
    return response.data;
  },
};

