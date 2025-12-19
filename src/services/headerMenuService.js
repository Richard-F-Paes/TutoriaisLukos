// Serviço para gerenciar menus do header
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const headerMenuService = {
  // Listar menus do header
  async list() {
    try {
      // #region agent log
      const __agentLog = (payload) => {
        try {
          fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
        } catch (_) {}
      };
      const endpointValue = endpoints.headerMenus?.list || '/api/v1/header-menus';
      __agentLog({location:'src/services/headerMenuService.js:list',message:'headerMenuService.list called',data:{endpointValue,hasEndpoints:!!endpoints.headerMenus},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
      // #endregion
      const response = await apiClient.get(endpointValue);
      return response.data;
    } catch (error) {
      // #region agent log
      const __agentLog = (payload) => {
        try {
          fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
        } catch (_) {}
      };
      __agentLog({location:'src/services/headerMenuService.js:list:error',message:'headerMenuService.list error',data:{errorMessage:String(error.message||''),errorStatus:error.response?.status||null,errorURL:String(error.config?.url||'')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'});
      // #endregion
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

