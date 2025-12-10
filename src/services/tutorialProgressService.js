// Serviço de Progresso de Tutoriais
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const tutorialProgressService = {
  // Salvar progresso de um tutorial
  async saveProgress(tutorialId, progressData) {
    try {
      const response = await apiClient.post(
        `/api/v1/tutorials/${tutorialId}/progress`,
        progressData
      );
      return response.data;
    } catch (error) {
      // Se API não estiver disponível, retornar null para usar fallback
      console.warn('Erro ao salvar progresso na API:', error);
      return null;
    }
  },

  // Carregar progresso de um tutorial
  async getProgress(tutorialId) {
    try {
      const response = await apiClient.get(
        `/api/v1/tutorials/${tutorialId}/progress`
      );
      return response.data;
    } catch (error) {
      // Se API não estiver disponível, retornar null para usar fallback
      console.warn('Erro ao carregar progresso da API:', error);
      return null;
    }
  },

  // Salvar progresso no localStorage como fallback
  saveProgressLocal(tutorialId, progressData) {
    try {
      const key = `tutorial_progress_${tutorialId}`;
      localStorage.setItem(key, JSON.stringify({
        ...progressData,
        tutorialId,
        savedAt: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Erro ao salvar progresso no localStorage:', error);
      return false;
    }
  },

  // Carregar progresso do localStorage como fallback
  getProgressLocal(tutorialId) {
    try {
      const key = `tutorial_progress_${tutorialId}`;
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Erro ao carregar progresso do localStorage:', error);
      return null;
    }
  },

  // Sincronizar progresso local com API
  async syncProgress(tutorialId) {
    const localProgress = this.getProgressLocal(tutorialId);
    if (localProgress) {
      try {
        await this.saveProgress(tutorialId, localProgress);
        // Remover do localStorage após sincronização bem-sucedida
        localStorage.removeItem(`tutorial_progress_${tutorialId}`);
        return true;
      } catch (error) {
        console.warn('Erro ao sincronizar progresso:', error);
        return false;
      }
    }
    return false;
  }
};

export default tutorialProgressService;

