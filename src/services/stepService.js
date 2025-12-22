// Serviço de Passos do Tutorial (TutorialSteps)
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const stepService = {
  async list(tutorialId) {
    const response = await apiClient.get(endpoints.steps.list(tutorialId));
    return response.data;
  },

  async create(tutorialId, data) {
    const response = await apiClient.post(endpoints.steps.create(tutorialId), data);
    return response.data;
  },

  async update(tutorialId, stepId, data) {
    const response = await apiClient.put(endpoints.steps.update(tutorialId, stepId), data);
    return response.data;
  },

  async delete(tutorialId, stepId) {
    const response = await apiClient.delete(endpoints.steps.delete(tutorialId, stepId));
    return response.data;
  },

  async reorder(tutorialId, stepIds) {
    const response = await apiClient.post(endpoints.steps.reorder(tutorialId), { stepIds });
    return response.data;
  },
};

export default stepService;


