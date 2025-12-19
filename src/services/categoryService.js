// Serviço de Categorias
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const categoryService = {
  // Listar categorias
  async list() {
    // #region agent log
    const __agentLog = (payload) => {
      try {
        fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
      } catch (_) {}
    };
    const endpointValue = endpoints.categories.list;
    __agentLog({location:'src/services/categoryService.js:list',message:'categoryService.list called',data:{endpointValue},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
    // #endregion
    const response = await apiClient.get(endpointValue);
    return response.data;
  },

  // Obter categoria por slug
  async getBySlug(slug) {
    const response = await apiClient.get(endpoints.categories.get(slug));
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
