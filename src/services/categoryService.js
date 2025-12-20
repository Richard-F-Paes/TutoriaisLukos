// Serviço de Categorias
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const categoryService = {
  // Listar categorias
  async list(includeChildren = false) {
    const endpointValue = endpoints.categories.list;
    const response = await apiClient.get(endpointValue, {
      params: { includeChildren: includeChildren.toString() },
    });
    return response.data;
  },

  // Obter categoria por slug
  async getBySlug(slug) {
    const response = await apiClient.get(endpoints.categories.get(slug));
    return response.data;
  },

  // Obter categoria por ID
  async getById(id) {
    const response = await apiClient.get(endpoints.categories.getById(id));
    return response.data;
  },

  // Obter categoria com subcategorias
  async getWithChildren(id) {
    const response = await apiClient.get(endpoints.categories.getById(id));
    return response.data;
  },

  // Listar subcategorias de uma categoria
  async getChildren(id) {
    const response = await apiClient.get(endpoints.categories.getChildren(id));
    return response.data;
  },

  // Criar categoria
  async create(categoryData) {
    const response = await apiClient.post(endpoints.categories.create, categoryData);
    return response.data;
  },

  // Atualizar categoria
  async update(id, categoryData) {
    const response = await apiClient.put(endpoints.categories.update(id), categoryData);
    return response.data;
  },

  // Excluir categoria
  async delete(id) {
    const response = await apiClient.delete(endpoints.categories.delete(id));
    return response.data;
  },
};
