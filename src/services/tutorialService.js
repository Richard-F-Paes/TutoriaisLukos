// Serviço de Tutoriais
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const tutorialService = {
  // Listar tutoriais
  async list(filters = {}) {
    // #region agent log
    const __agentLog = (payload) => {
      try {
        fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
      } catch (_) {}
    };
    const endpointValue = endpoints.tutorials.list;
    __agentLog({location:'src/services/tutorialService.js:list',message:'tutorialService.list called',data:{endpointValue},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
    // #endregion
    const response = await apiClient.get(endpointValue, { params: filters });
    return response.data;
  },

  // Obter tutorial por slug
  async getBySlug(slug) {
    const response = await apiClient.get(endpoints.tutorials.get(slug));
    return response.data;
  },

  // Obter tutorial por ID (para edição)
  async getById(id) {
    const response = await apiClient.get(endpoints.tutorials.get(id));
    return response.data;
  },

  // Criar tutorial
  async create(tutorialData) {
    const response = await apiClient.post(endpoints.tutorials.create, tutorialData);
    return response.data;
  },

  // Atualizar tutorial
  async update(id, tutorialData) {
    const response = await apiClient.put(endpoints.tutorials.update(id), tutorialData);
    return response.data;
  },

  // Excluir tutorial
  async delete(id) {
    const response = await apiClient.delete(endpoints.tutorials.delete(id));
    return response.data;
  },

  // Buscar tutoriais
  async search(query, options = {}) {
    const response = await apiClient.get(endpoints.tutorials.search, {
      params: { q: query, ...options },
    });
    return response.data;
  },

  // Listar por categoria
  async getByCategory(categorySlug) {
    const response = await apiClient.get(endpoints.tutorials.byCategory(categorySlug));
    return response.data;
  },

  // Publicar tutorial
  async publish(id) {
    const response = await apiClient.post(endpoints.tutorials.publish(id));
    return response.data;
  },

  // Despublicar tutorial
  async unpublish(id) {
    const response = await apiClient.post(endpoints.tutorials.unpublish(id));
    return response.data;
  },
};
