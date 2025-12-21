// Serviço de Agendamentos
import apiClient from '../infrastructure/api/client.js';
import { endpoints } from '../infrastructure/api/endpoints.js';

export const appointmentService = {
  // Listar agendamentos
  async list(filters = {}) {
    const response = await apiClient.get(endpoints.appointments.list, { params: filters });
    return response.data;
  },

  // Obter agendamento por ID
  async get(id) {
    const response = await apiClient.get(endpoints.appointments.get(id));
    return response.data;
  },

  // Criar agendamento (público)
  async create(appointmentData) {
    const response = await apiClient.post(endpoints.appointments.create, appointmentData);
    return response.data;
  },

  // Atualizar agendamento
  async update(id, appointmentData) {
    const response = await apiClient.put(endpoints.appointments.update(id), appointmentData);
    return response.data;
  },

  // Excluir agendamento
  async delete(id) {
    const response = await apiClient.delete(endpoints.appointments.delete(id));
    return response.data;
  },
};

export default appointmentService;

