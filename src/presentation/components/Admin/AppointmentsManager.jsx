// AppointmentsManager - Gerenciamento de agendamentos no admin
import React, { useState, useMemo } from 'react';
import { useAppointments, useUpdateAppointment, useDeleteAppointment } from '../../../hooks/useAppointments.js';
import { useTrainingConfigsByType } from '../../../hooks/useTrainingConfigs.js';
import { Filter, Calendar, Clock, User, Mail, Phone, Building, MessageSquare, X, Settings, Edit, Trash2 } from 'lucide-react';
import AvailabilityCalendar from './AvailabilityCalendar.jsx';
import toast from 'react-hot-toast';
import { formatDate } from '../../../shared/utils/index.js';
import './AppointmentsManager.css';

const STATUS_COLORS = {
  pending: { bg: '#fef3c7', text: '#92400e', label: 'Pendente' },
  confirmed: { bg: '#dbeafe', text: '#1e40af', label: 'Confirmado' },
  cancelled: { bg: '#fee2e2', text: '#991b1b', label: 'Cancelado' },
  completed: { bg: '#d1fae5', text: '#065f46', label: 'Concluído' },
};

const AppointmentsManager = () => {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'availability'
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [notes, setNotes] = useState('');

  const filters = statusFilter !== 'all' ? { status: statusFilter } : {};
  const { data: appointmentsData, isLoading, refetch } = useAppointments(filters);
  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();
  const { data: trainingTypes = [] } = useTrainingConfigsByType('training_type');

  const appointments = appointmentsData?.data || [];

  // Função helper para obter o label do tipo de treinamento baseado no value
  const getTrainingTypeLabel = (value) => {
    if (!value || value === '-') return '-';
    const trainingType = trainingTypes.find(type => type.value === value);
    return trainingType ? trainingType.label : value;
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateMutation.mutateAsync({
        id: appointmentId,
        data: { status: newStatus },
      });
      
      // Se o filtro atual não incluir o novo status, mudar para "all" para mostrar todos
      if (statusFilter !== 'all' && statusFilter !== newStatus) {
        setStatusFilter('all');
      }
      
      toast.success('Status atualizado com sucesso!');
      // Forçar refetch imediato - aguardar um pouco para garantir que o filtro foi atualizado
      setTimeout(async () => {
        await refetch();
      }, 100);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar status';
      toast.error(errorMessage);
    }
  };

  const handleDeleteClick = (appointment) => {
    setAppointmentToDelete(appointment);
  };

  const handleConfirmDelete = async () => {
    if (!appointmentToDelete) return;

    try {
      const appointmentId = appointmentToDelete.id || appointmentToDelete.Id;
      await deleteMutation.mutateAsync(appointmentId);
      toast.success('Agendamento excluído com sucesso!');
      setAppointmentToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao excluir agendamento';
      toast.error(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setAppointmentToDelete(null);
  };

  const handleSaveNotes = async (appointmentId) => {
    try {
      await updateMutation.mutateAsync({
        id: appointmentId,
        data: { notes: notes.trim() || null },
      });
      toast.success('Notas salvas com sucesso!');
      setSelectedAppointment(null);
      setNotes('');
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao salvar notas';
      toast.error(errorMessage);
    }
  };

  const openDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.notes || appointment.Notes || '');
  };

  const formatDateTime = (dateString, timeString) => {
    if (!dateString) return '-';
    const dateStr = formatDate(dateString);
    return timeString ? `${dateStr} às ${timeString}` : dateStr;
  };

  return (
    <div className="appointments-manager">
      <div className="manager-header">
        <h2>Gerenciar Agendamentos</h2>
      </div>

      <div className="manager-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <Calendar size={18} />
          Agendamentos
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'availability' ? 'active' : ''}`}
          onClick={() => setActiveTab('availability')}
        >
          <Settings size={18} />
          Disponibilidade
        </button>
      </div>

      {activeTab === 'availability' ? (
        <AvailabilityCalendar />
      ) : (
        <>
          <div className="manager-filters">
            <div className="filter-group">
              <Filter size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: '#1f2937',
                }}
              >
                <option value="all">Todos os status</option>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="cancelled">Cancelado</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading">Carregando agendamentos...</div>
          ) : (
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Tipo de Treinamento</th>
                    <th>Data/Hora Agendada</th>
                    <th>Status</th>
                    <th>Criado em</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="empty-state">
                        Nenhum agendamento encontrado
                      </td>
                    </tr>
                  ) : (
                    appointments.map(appointment => {
                      const appointmentId = appointment.id || appointment.Id;
                      const name = appointment.name || appointment.Name || '';
                      const email = appointment.email || appointment.Email || '';
                      const phone = appointment.phone || appointment.Phone || '';
                      const trainingTypeValue = appointment.trainingType || appointment.TrainingType || '-';
                      const trainingTypeLabel = getTrainingTypeLabel(trainingTypeValue);
                      const scheduledDate = appointment.scheduledDate || appointment.ScheduledDate;
                      const scheduledTime = appointment.scheduledTime || appointment.ScheduledTime;
                      const status = appointment.status || appointment.Status || 'pending';
                      const createdAt = appointment.createdAt || appointment.CreatedAt;
                      const statusInfo = STATUS_COLORS[status] || STATUS_COLORS.pending;

                      return (
                        <tr key={appointmentId}>
                          <td>{name}</td>
                          <td>{email}</td>
                          <td>{phone}</td>
                          <td>{trainingTypeLabel}</td>
                          <td>{formatDateTime(scheduledDate, scheduledTime)}</td>
                          <td>
                            <span 
                              className="status-badge" 
                              style={{ 
                                backgroundColor: statusInfo.bg, 
                                color: statusInfo.text,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                display: 'inline-block',
                              }}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td>{formatDate(createdAt)}</td>
                          <td>
                            <div className="actions" style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}>
                              <button
                                type="button"
                                className="btn-icon"
                                onClick={() => openDetails(appointment)}
                                title="Ver detalhes"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '0.5rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '6px',
                                  color: '#6b7280',
                                  transition: 'all 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#f3f4f6';
                                  e.target.style.color = '#3b82f6';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                  e.target.style.color = '#6b7280';
                                }}
                              >
                                <Edit size={16} />
                              </button>
                              <select
                                value={status}
                                onChange={(e) => handleStatusChange(appointmentId, e.target.value)}
                                className="status-select"
                                title="Alterar status"
                                disabled={updateMutation.isPending}
                                style={{
                                  padding: '0.375rem 0.625rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  backgroundColor: 'white',
                                  cursor: updateMutation.isPending ? 'not-allowed' : 'pointer',
                                  color: '#1f2937',
                                }}
                              >
                                <option value="pending">Pendente</option>
                                <option value="confirmed">Confirmado</option>
                                <option value="cancelled">Cancelado</option>
                                <option value="completed">Concluído</option>
                              </select>
                              <button
                                type="button"
                                className="btn-icon btn-danger"
                                onClick={() => handleDeleteClick(appointment)}
                                title="Excluir"
                                disabled={deleteMutation.isPending}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                                  padding: '0.5rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '6px',
                                  color: '#6b7280',
                                  transition: 'all 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                  if (!deleteMutation.isPending) {
                                    e.target.style.backgroundColor = '#fef2f2';
                                    e.target.style.color = '#ef4444';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                  e.target.style.color = '#6b7280';
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal de Detalhes do Agendamento */}
          {selectedAppointment && (
            <div 
              className="category-form-modal" 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(4px)',
              }}
              onClick={() => {
                if (!updateMutation.isPending) {
                  setSelectedAppointment(null);
                  setNotes('');
                }
              }}
            >
              <div 
                className="form-container" 
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  maxWidth: '700px',
                  width: '90%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="form-header" 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '1.5rem', 
                    fontWeight: 600,
                    color: '#1f2937',
                    letterSpacing: '-0.025em',
                  }}>
                    Detalhes do Agendamento
                  </h3>
                  <button 
                    className="close-btn" 
                    onClick={() => {
                      if (!updateMutation.isPending) {
                        setSelectedAppointment(null);
                        setNotes('');
                      }
                    }}
                    disabled={updateMutation.isPending}
                    style={{
                      background: '#f3f4f6',
                      border: 'none',
                      cursor: updateMutation.isPending ? 'not-allowed' : 'pointer',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '6px',
                      color: '#6b7280',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!updateMutation.isPending) {
                        e.target.style.background = '#e5e7eb';
                        e.target.style.color = '#374151';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.color = '#6b7280';
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <User size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: 600, 
                        fontSize: '0.875rem', 
                        color: '#374151', 
                        marginBottom: '0.25rem' 
                      }}>
                        Nome
                      </label>
                      <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                        {selectedAppointment.name || selectedAppointment.Name}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Mail size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: 600, 
                        fontSize: '0.875rem', 
                        color: '#374151', 
                        marginBottom: '0.25rem' 
                      }}>
                        Email
                      </label>
                      <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                        {selectedAppointment.email || selectedAppointment.Email}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Phone size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: 600, 
                        fontSize: '0.875rem', 
                        color: '#374151', 
                        marginBottom: '0.25rem' 
                      }}>
                        Telefone
                      </label>
                      <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                        {selectedAppointment.phone || selectedAppointment.Phone}
                      </div>
                    </div>
                  </div>
                  {(selectedAppointment.company || selectedAppointment.Company) && (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <Building size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <label style={{ 
                          display: 'block', 
                          fontWeight: 600, 
                          fontSize: '0.875rem', 
                          color: '#374151', 
                          marginBottom: '0.25rem' 
                        }}>
                          Empresa
                        </label>
                        <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                          {selectedAppointment.company || selectedAppointment.Company}
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Calendar size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: 600, 
                        fontSize: '0.875rem', 
                        color: '#374151', 
                        marginBottom: '0.25rem' 
                      }}>
                        Tipo de Treinamento
                      </label>
                      <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                        {getTrainingTypeLabel(selectedAppointment.trainingType || selectedAppointment.TrainingType || '-')}
                      </div>
                    </div>
                  </div>
                  {(selectedAppointment.scheduledDate || selectedAppointment.ScheduledDate) && (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <Clock size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <label style={{ 
                          display: 'block', 
                          fontWeight: 600, 
                          fontSize: '0.875rem', 
                          color: '#374151', 
                          marginBottom: '0.25rem' 
                        }}>
                          Data/Hora Agendada
                        </label>
                        <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                          {formatDateTime(
                            selectedAppointment.scheduledDate || selectedAppointment.ScheduledDate,
                            selectedAppointment.scheduledTime || selectedAppointment.ScheduledTime
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {(selectedAppointment.message || selectedAppointment.Message) && (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <MessageSquare size={18} style={{ marginTop: '0.25rem', color: '#6b7280', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <label style={{ 
                          display: 'block', 
                          fontWeight: 600, 
                          fontSize: '0.875rem', 
                          color: '#374151', 
                          marginBottom: '0.25rem' 
                        }}>
                          Mensagem
                        </label>
                        <div style={{ color: '#1f2937', fontSize: '0.9375rem' }}>
                          {selectedAppointment.message || selectedAppointment.Message}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="form-group" style={{ marginTop: '0.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      fontWeight: 600, 
                      fontSize: '0.875rem', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Notas Administrativas
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Adicione notas sobre este agendamento..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '0.9375rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        color: '#1f2937',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.outline = 'none';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                <div 
                  className="form-actions" 
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e5e7eb',
                  }}
                >
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => {
                      if (!updateMutation.isPending) {
                        setSelectedAppointment(null);
                        setNotes('');
                      }
                    }}
                    disabled={updateMutation.isPending}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#ffffff',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: updateMutation.isPending ? 'not-allowed' : 'pointer',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!updateMutation.isPending) {
                        e.target.style.background = '#f9fafb';
                        e.target.style.borderColor = '#9ca3af';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ffffff';
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    Fechar
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={() => handleSaveNotes(selectedAppointment.id || selectedAppointment.Id)}
                    disabled={updateMutation.isPending}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: updateMutation.isPending ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: updateMutation.isPending ? 'not-allowed' : 'pointer',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxShadow: updateMutation.isPending ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    }}
                    onMouseEnter={(e) => {
                      if (!updateMutation.isPending) {
                        e.target.style.background = '#2563eb';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!updateMutation.isPending) {
                        e.target.style.background = '#3b82f6';
                        e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                      }
                    }}
                  >
                    {updateMutation.isPending ? 'Salvando...' : 'Salvar Notas'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Confirmação de Exclusão */}
          {appointmentToDelete && (
            <div
              className="category-form-modal"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(4px)',
              }}
              onClick={() => {
                if (!deleteMutation.isPending) {
                  handleCancelDelete();
                }
              }}
            >
              <div
                className="form-container"
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  maxWidth: '480px',
                  width: '92%',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="form-header"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#111827',
                      letterSpacing: '-0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Trash2 size={20} style={{ color: '#dc2626' }} />
                    Excluir agendamento?
                  </h3>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={handleCancelDelete}
                    disabled={deleteMutation.isPending}
                    style={{
                      background: '#f3f4f6',
                      border: 'none',
                      cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '6px',
                      color: '#6b7280',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!deleteMutation.isPending) {
                        e.target.style.background = '#e5e7eb';
                        e.target.style.color = '#374151';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.color = '#6b7280';
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div style={{ color: '#111827', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                  <p style={{ margin: '0 0 1.25rem 0', fontWeight: 500, letterSpacing: '0.01em', color: '#0f172a' }}>
                    Tem certeza que deseja excluir o agendamento de{' '}
                    <strong style={{ color: '#030712', fontWeight: 700, fontSize: '1.125rem' }}>
                      {appointmentToDelete.name || appointmentToDelete.Name}
                    </strong>
                    ?
                  </p>

                  <div
                    style={{
                      padding: '0.875rem',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ color: '#991b1b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      <strong>⚠️ Atenção:</strong>
                      <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
                        <li style={{ marginBottom: '0.25rem' }}>
                          Esta ação não pode ser desfeita.
                        </li>
                        <li>O agendamento será removido permanentemente do sistema.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="form-actions"
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb',
                  }}
                >
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCancelDelete}
                    disabled={deleteMutation.isPending}
                    style={{
                      padding: '0.7rem 1.25rem',
                      background: '#f3f4f6',
                      color: '#374151',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!deleteMutation.isPending) {
                        e.target.style.background = '#e5e7eb';
                        e.target.style.borderColor = '#d1d5db';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.borderColor = '#e5e7eb';
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={handleConfirmDelete}
                    disabled={deleteMutation.isPending}
                    style={{
                      padding: '0.7rem 1.25rem',
                      background: deleteMutation.isPending ? '#9ca3af' : '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!deleteMutation.isPending) {
                        e.target.style.background = '#b91c1c';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(220, 38, 38, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!deleteMutation.isPending) {
                        e.target.style.background = '#dc2626';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {deleteMutation.isPending ? 'Excluindo...' : 'Sim, excluir'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentsManager;

