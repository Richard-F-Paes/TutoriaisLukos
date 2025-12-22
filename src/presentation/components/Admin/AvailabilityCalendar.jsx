import React, { useState } from 'react';
import { useAvailability, useCreateAvailability, useUpdateAvailability, useDeleteAvailability } from '../../../hooks/useAvailability.js';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Clock, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import TimePicker from './TimePicker.jsx';
import { formatDate } from '../../../shared/utils/index.js';
import './AvailabilityCalendar.css';

// Função para converter formato ISO (YYYY-MM-DD) para brasileiro (DD/MM/YYYY)
const formatDateToBrazilian = (isoDate) => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

// Função para converter formato brasileiro (DD/MM/YYYY) para ISO (YYYY-MM-DD)
const parseBrazilianDate = (dateStr) => {
  if (!dateStr) return '';
  // Remove tudo que não é número
  const numbers = dateStr.replace(/\D/g, '');
  
  // Aceitar 6 dígitos (DDMMYY) ou 8 dígitos (DDMMYYYY)
  if (numbers.length !== 6 && numbers.length !== 8) return '';
  
  let day, month, year;
  
  if (numbers.length === 6) {
    // Formato DDMMYY - assumir 20XX para anos de 2 dígitos
    day = numbers.substring(0, 2);
    month = numbers.substring(2, 4);
    const year2Digits = numbers.substring(4, 6);
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100;
    const yearNum = parseInt(year2Digits, 10);
    // Se o ano de 2 dígitos for maior que o ano atual, assume século anterior
    const fullYear = yearNum > (currentYear % 100) + 10 
      ? currentCentury - 100 + yearNum 
      : currentCentury + yearNum;
    year = String(fullYear);
  } else {
    // Formato DDMMYYYY
    day = numbers.substring(0, 2);
    month = numbers.substring(2, 4);
    year = numbers.substring(4, 8);
  }
  
  // Validar
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (dayNum < 1 || dayNum > 31) return '';
  if (monthNum < 1 || monthNum > 12) return '';
  if (yearNum < 1900 || yearNum > 2100) return '';
  
  // Retornar no formato ISO (YYYY-MM-DD)
  return `${year}-${month}-${day}`;
};

// Função para aplicar máscara de data brasileira
const applyDateMask = (value) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length === 0) return '';
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.substring(0, 2)}/${numbers.substring(2)}`;
  if (numbers.length <= 6) return `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}/${numbers.substring(4, 6)}`;
  return `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}/${numbers.substring(4, 8)}`;
};

const DAYS_OF_WEEK = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
  { value: 6, label: 'Sábado' },
];

// Função para agrupar regras semanais por parâmetros
const groupWeeklyRules = (rules) => {
  const groups = new Map();
  
  rules.forEach(rule => {
    // Criar chave única baseada nos parâmetros
    const key = `${rule.startTime}-${rule.endTime}-${rule.slotInterval}-${rule.isActive}`;
    
    if (!groups.has(key)) {
      groups.set(key, {
        rules: [],
        startTime: rule.startTime,
        endTime: rule.endTime,
        slotInterval: rule.slotInterval,
        isActive: rule.isActive,
      });
    }
    
    groups.get(key).rules.push(rule);
  });
  
  // Converter Map para Array e ordenar os dias dentro de cada grupo
  return Array.from(groups.values()).map(group => ({
    ...group,
    rules: group.rules.sort((a, b) => a.dayOfWeek - b.dayOfWeek),
    daysOfWeek: group.rules.map(r => r.dayOfWeek).sort((a, b) => a - b),
  }));
};

const AvailabilityCalendar = () => {
  const { data: availabilityData, isLoading } = useAvailability();
  const createMutation = useCreateAvailability();
  const updateMutation = useUpdateAvailability();
  const deleteMutation = useDeleteAvailability();

  const availabilities = availabilityData?.data || [];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIds, setEditingIds] = useState(null); // Array de IDs quando editando grupo
  const [formData, setFormData] = useState({
    daysOfWeek: [], // Array de dias selecionados
    specificDate: '',
    startTime: '09:00',
    endTime: '17:00',
    slotInterval: 30,
    isActive: true,
    isFullDay: false, // Para bloquear dia inteiro
    repeatUntil: false, // Repetir até data
    repeatUntilDate: '', // Data limite para repetir
  });

  const resetForm = () => {
    setFormData({
      daysOfWeek: [],
      specificDate: '',
      startTime: '09:00',
      endTime: '17:00',
      slotInterval: 30,
      isActive: true,
      isFullDay: false,
      repeatUntil: false,
      repeatUntilDate: '',
    });
    setEditingIds(null);
    setIsFormOpen(false);
  };

  const handleEdit = (group) => {
    // Se for um grupo (array de regras), editar todas
    if (Array.isArray(group.rules)) {
      const firstRule = group.rules[0];
      setFormData({
        daysOfWeek: group.daysOfWeek.map(d => String(d)),
        specificDate: '',
        startTime: firstRule.startTime || '09:00',
        endTime: firstRule.endTime || '17:00',
        slotInterval: firstRule.slotInterval || 30,
        isActive: firstRule.isActive !== undefined ? firstRule.isActive : true,
        isFullDay: false,
        repeatUntil: false,
        repeatUntilDate: '',
      });
      setEditingIds(group.rules.map(r => r.id));
    } else {
      // Se for uma regra individual (data específica)
      const availability = group;
      const isFullDayBlock = availability.specificDate && !availability.isActive && availability.slotInterval === 1440;
      
      setFormData({
        daysOfWeek: [],
        specificDate: availability.specificDate ? new Date(availability.specificDate).toISOString().split('T')[0] : '',
        startTime: availability.startTime || '09:00',
        endTime: availability.endTime || '17:00',
        slotInterval: availability.slotInterval || 30,
        isActive: availability.isActive !== undefined ? availability.isActive : true,
        isFullDay: isFullDayBlock,
        repeatUntil: false,
        repeatUntilDate: '',
      });
      setEditingIds([availability.id]);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Se for dia inteiro bloqueado, não precisa de horários
      // Se for data específica com horário, permite agendamento no horário especificado
      // Se for data específica com isFullDay, bloqueia o dia inteiro
      const baseData = {
        startTime: formData.isFullDay ? '00:00' : formData.startTime,
        endTime: formData.isFullDay ? '23:59' : formData.endTime,
        slotInterval: formData.isFullDay ? 1440 : parseInt(formData.slotInterval), // Dia inteiro = 1440, caso contrário usa o intervalo informado
        isActive: formData.isFullDay ? false : formData.isActive, // Dia inteiro bloqueado = inativo, caso contrário usa o valor do checkbox
      };

      if (editingIds && editingIds.length > 0) {
        // Ao editar, atualizar todos os registros do grupo
        if (formData.specificDate) {
          // Editar data específica (apenas uma regra)
          const submitData = {
            ...baseData,
            dayOfWeek: null,
            specificDate: formData.specificDate || null,
          };
          await updateMutation.mutateAsync({ id: editingIds[0], data: submitData });
          toast.success('Disponibilidade atualizada com sucesso!');
        } else {
          // Editar grupo de regras semanais - manter o dayOfWeek de cada regra
          const updatePromises = editingIds.map(id => {
            // Buscar a regra original para manter seu dayOfWeek
            const originalRule = availabilities.find(r => r.id === id);
            const submitData = {
              ...baseData,
              dayOfWeek: originalRule ? originalRule.dayOfWeek : null,
              specificDate: null,
            };
            return updateMutation.mutateAsync({ id, data: submitData });
          });
          
          await Promise.all(updatePromises);
          toast.success(`${editingIds.length} disponibilidade(s) atualizada(s) com sucesso!`);
        }
      } else {
        // Se for data específica com "Repetir até"
        if (formData.specificDate && formData.repeatUntil) {
          const startDate = new Date(formData.specificDate);
          startDate.setHours(0, 0, 0, 0);
          
          let endDate = null;
          if (formData.repeatUntilDate) {
            endDate = new Date(formData.repeatUntilDate);
            endDate.setHours(0, 0, 0, 0);
          } else {
            // Se não tem data, repetir indefinidamente (até 1 ano no futuro como limite prático)
            endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);
            endDate.setHours(0, 0, 0, 0);
          }

          // Validar que a data final é depois da inicial
          if (endDate < startDate) {
            toast.error('A data final deve ser posterior à data inicial');
            return;
          }

          // Criar uma regra para cada dia
          const datesToCreate = [];
          const currentDate = new Date(startDate);
          
          while (currentDate <= endDate) {
            datesToCreate.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          // Limitar a 365 dias para evitar sobrecarga
          if (datesToCreate.length > 365) {
            toast.error('Não é possível criar mais de 365 dias de uma vez. Use uma data final mais próxima.');
            return;
          }

          // Criar todas as regras sequencialmente
          let createdCount = 0;
          let errorCount = 0;
          
          for (const date of datesToCreate) {
            const submitData = {
              ...baseData,
              specificDate: date.toISOString().split('T')[0],
            };
            try {
              await createMutation.mutateAsync(submitData);
              createdCount++;
            } catch (err) {
              console.error(`Erro ao criar regra para ${date.toISOString().split('T')[0]}:`, err);
              errorCount++;
            }
          }

          if (createdCount > 0) {
            if (errorCount > 0) {
              toast.success(`${createdCount} disponibilidade(s) criada(s), ${errorCount} erro(s).`, { duration: 4000 });
            } else {
              toast.success(`${createdCount} disponibilidade(s) criada(s) com sucesso!`);
            }
          } else {
            toast.error('Erro ao criar disponibilidades');
          }
        } else {
          // Criar regra(s)
          if (formData.specificDate) {
            // Criar data específica
            const submitData = {
              ...baseData,
              dayOfWeek: null,
              specificDate: formData.specificDate || null,
            };
            await createMutation.mutateAsync(submitData);
            toast.success('Disponibilidade criada com sucesso!');
          } else {
            // Criar regras semanais para múltiplos dias
            if (formData.daysOfWeek.length === 0) {
              toast.error('Selecione pelo menos um dia da semana');
              return;
            }
            
            const createPromises = formData.daysOfWeek.map(dayOfWeek => {
              const submitData = {
                ...baseData,
                dayOfWeek: parseInt(dayOfWeek),
                specificDate: null,
              };
              return createMutation.mutateAsync(submitData);
            });
            
            const results = await Promise.allSettled(createPromises);
            const successCount = results.filter(r => r.status === 'fulfilled').length;
            const errorCount = results.filter(r => r.status === 'rejected').length;
            
            if (successCount > 0) {
              if (errorCount > 0) {
                toast.success(`${successCount} disponibilidade(s) criada(s), ${errorCount} erro(s).`, { duration: 4000 });
              } else {
                toast.success(`${successCount} disponibilidade(s) criada(s) com sucesso!`);
              }
            } else {
              toast.error('Erro ao criar disponibilidades');
            }
          }
        }
      }

      resetForm();
    } catch (error) {
      console.error('Erro ao salvar disponibilidade:', error);
      toast.error(error.response?.data?.error || 'Erro ao salvar disponibilidade');
    }
  };

  const [availabilityToDelete, setAvailabilityToDelete] = useState(null);

  const handleDeleteClick = (group) => {
    setAvailabilityToDelete(group);
  };

  const handleConfirmDelete = async () => {
    if (!availabilityToDelete) return;

    try {
      // Se for um grupo, excluir todas as regras
      const idsToDelete = Array.isArray(availabilityToDelete.rules) 
        ? availabilityToDelete.rules.map(r => r.id)
        : [availabilityToDelete.id];
      
      const deletePromises = idsToDelete.map(id => deleteMutation.mutateAsync(id));
      await Promise.all(deletePromises);
      
      const count = idsToDelete.length;
      toast.success(`${count} disponibilidade(s) excluída(s) com sucesso!`);
      setAvailabilityToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir disponibilidade:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao excluir disponibilidade';
      toast.error(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setAvailabilityToDelete(null);
  };

  const weeklyRules = availabilities.filter(a => a.dayOfWeek !== null && a.specificDate === null);
  const specificRules = availabilities.filter(a => a.specificDate !== null && a.dayOfWeek === null);
  const weeklyGroups = groupWeeklyRules(weeklyRules);

  if (isLoading) {
    return <div className="loading">Carregando disponibilidades...</div>;
  }

  return (
    <div className="availability-calendar">
      <div className="availability-header">
        <div>
          <h3>Gerenciar Disponibilidade</h3>
          <p>Configure os dias e horários disponíveis para agendamento de treinamentos</p>
        </div>
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
          }}
        >
          <Plus size={18} />
          Adicionar Disponibilidade
        </button>
      </div>

      {/* Modal de Criar/Editar Disponibilidade */}
      {isFormOpen && (
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
            if (!createMutation.isPending && !updateMutation.isPending) {
              resetForm();
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
              }}              >
                {editingIds && editingIds.length > 0 ? 'Editar' : 'Nova'} Disponibilidade
              </h3>
              <button 
                className="close-btn" 
                onClick={resetForm}
                disabled={createMutation.isPending || updateMutation.isPending}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: (createMutation.isPending || updateMutation.isPending) ? 'not-allowed' : 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!createMutation.isPending && !updateMutation.isPending) {
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
            <form onSubmit={handleSubmit}>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  letterSpacing: '0.025em',
                }}>
                  Tipo de Regra <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.specificDate ? 'specific' : 'weekly'}
                    onChange={(e) => {
                      if (e.target.value === 'specific') {
                        // Ao mudar para data específica, sempre bloqueia (isActive = false)
                        setFormData(prev => ({ ...prev, daysOfWeek: [], specificDate: new Date().toISOString().split('T')[0], isFullDay: false, isActive: false, repeatUntil: false, repeatUntilDate: '' }));
                      } else {
                        setFormData(prev => ({ ...prev, daysOfWeek: [], specificDate: '', isFullDay: false, isActive: true, repeatUntil: false, repeatUntilDate: '' }));
                      }
                    }}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
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
                >
                  <option value="weekly">Regra Semanal (repetir toda semana)</option>
                  <option value="specific">Data Específica (exceção - sobrepõe regra semanal)</option>
                </select>
                {formData.specificDate && (
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', marginBottom: 0 }}>
                    Use para bloquear agendamentos em uma data específica, sobrepondo a regra semanal. Você pode bloquear o dia inteiro ou apenas um horário específico.
                  </p>
                )}
              </div>

              {formData.specificDate ? (
                <>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: formData.repeatUntil && !editingIds ? '1fr 1fr' : '1fr',
                    gap: '1rem',
                    marginBottom: '1.5rem' 
                  }}>
                    <div className="form-group">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#374151',
                        letterSpacing: '0.025em',
                      }}>
                        Data Específica <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="DD/MM/AAAA"
                          value={formatDateToBrazilian(formData.specificDate)}
                          onChange={(e) => {
                            const masked = applyDateMask(e.target.value);
                            setFormData(prev => ({ ...prev, specificDate: masked }));
                          }}
                          onBlur={(e) => {
                            const isoDate = parseBrazilianDate(e.target.value);
                            if (isoDate) {
                              setFormData(prev => ({ ...prev, specificDate: isoDate }));
                            } else if (e.target.value && e.target.value.trim() !== '') {
                              // Se não conseguiu parsear mas tem valor, mantém o valor formatado
                              // Não limpa para evitar fechar o formulário
                              const masked = applyDateMask(e.target.value);
                              setFormData(prev => ({ ...prev, specificDate: masked }));
                              // Mostrar erro visual mas não limpar
                              e.target.style.borderColor = '#ef4444';
                            } else {
                              e.target.style.borderColor = '#d1d5db';
                            }
                            e.target.style.boxShadow = 'none';
                          }}
                          onKeyDown={(e) => {
                            // Prevenir submit do formulário ao pressionar Enter
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              e.target.blur();
                            }
                          }}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            paddingRight: '2.5rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '0.9375rem',
                            color: '#1f2937',
                            backgroundColor: '#ffffff',
                            transition: 'all 0.2s',
                            boxSizing: 'border-box',
                            cursor: 'text',
                            position: 'relative',
                            zIndex: 2,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.outline = 'none';
                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                          }}
                        />
                        <input
                          type="date"
                          value={formData.specificDate}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, specificDate: e.target.value }));
                          }}
                          style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            width: '80px',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer',
                            zIndex: 2,
                            pointerEvents: 'auto',
                          }}
                          title="Selecionar data"
                          onClick={(e) => {
                            // Quando clicar no input de data, não propagar para o input de texto
                            e.stopPropagation();
                          }}
                        />
                        <CalendarIcon
                          size={18}
                          style={{
                            position: 'absolute',
                            right: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#6b7280',
                            zIndex: 3,
                          }}
                        />
                      </div>
                    </div>
                    {!editingIds && formData.repeatUntil && (
                      <div className="form-group">
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem', 
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          color: '#374151',
                          letterSpacing: '0.025em',
                        }}>
                          Data Final
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="text"
                            placeholder="DD/MM/AAAA (opcional)"
                            value={formatDateToBrazilian(formData.repeatUntilDate)}
                            onChange={(e) => {
                              const masked = applyDateMask(e.target.value);
                              setFormData(prev => ({ ...prev, repeatUntilDate: masked }));
                            }}
                            onBlur={(e) => {
                              const isoDate = parseBrazilianDate(e.target.value);
                              if (isoDate) {
                                setFormData(prev => ({ ...prev, repeatUntilDate: isoDate }));
                              } else if (e.target.value) {
                                // Se não conseguiu parsear e tem valor, limpa
                                setFormData(prev => ({ ...prev, repeatUntilDate: '' }));
                              }
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                            style={{ 
                              width: '100%',
                              padding: '0.75rem 1rem',
                              paddingRight: '2.5rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              fontSize: '0.9375rem',
                              color: '#1f2937',
                              backgroundColor: '#ffffff',
                              transition: 'all 0.2s',
                              boxSizing: 'border-box',
                              cursor: 'text',
                              position: 'relative',
                              zIndex: 2,
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.outline = 'none';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                          />
                          <input
                            type="date"
                            value={formData.repeatUntilDate}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, repeatUntilDate: e.target.value }));
                            }}
                            style={{
                              position: 'absolute',
                              right: '0',
                              top: '0',
                              width: '80px',
                              height: '100%',
                              opacity: 0,
                              cursor: 'pointer',
                              zIndex: 2,
                              pointerEvents: 'auto',
                            }}
                            title="Selecionar data"
                            onClick={(e) => {
                              // Quando clicar no input de data, não propagar para o input de texto
                              e.stopPropagation();
                            }}
                          />
                          <CalendarIcon
                            size={18}
                            style={{
                              position: 'absolute',
                              right: '0.75rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#6b7280',
                              zIndex: 3,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {!editingIds && (
                    <div className="form-group" style={{ 
                      marginBottom: '1.5rem',
                      padding: '1rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                    }}>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem', 
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginBottom: formData.repeatUntil ? '0.75rem' : 0,
                      }}>
                        <input
                          type="checkbox"
                          checked={formData.repeatUntil}
                          onChange={(e) => setFormData(prev => ({ ...prev, repeatUntil: e.target.checked }))}
                          style={{ 
                            cursor: 'pointer',
                            width: '18px',
                            height: '18px',
                            accentColor: '#3b82f6',
                          }}
                        />
                        <span>Repetir até</span>
                      </label>
                      {formData.repeatUntil && (
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', marginBottom: 0 }}>
                          {formData.repeatUntilDate 
                            ? `Repetirá esta exceção todos os dias de ${formatDate(formData.specificDate)} até ${formatDate(formData.repeatUntilDate)}.`
                            : 'Repetirá esta exceção todos os dias indefinidamente (até 1 ano no futuro). Deixe a data em branco para repetir sem limite.'
                          }
                        </p>
                      )}
                    </div>
                  )}
                  <div className="form-group" style={{ 
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#374151',
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.isFullDay}
                        onChange={(e) => {
                          const isFullDay = e.target.checked;
                          setFormData(prev => ({
                            ...prev,
                            isFullDay,
                            isActive: isFullDay ? false : prev.isActive,
                          }));
                        }}
                        style={{ 
                          cursor: 'pointer',
                          width: '18px',
                          height: '18px',
                          accentColor: '#3b82f6',
                        }}
                      />
                      <span>Bloquear dia inteiro (sem agendamentos neste dia)</span>
                    </label>
                  </div>
                </>
              ) : (
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.75rem', 
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#374151',
                    letterSpacing: '0.025em',
                  }}>
                    Dias da Semana <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '0.625rem',
                    padding: '0.875rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s',
                  }}>
                    {DAYS_OF_WEEK.map(day => {
                      const isSelected = formData.daysOfWeek.includes(String(day.value));
                      return (
                        <label
                          key={day.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: isSelected ? '#1e40af' : '#4b5563',
                            padding: '0.625rem 0.875rem',
                            borderRadius: '8px',
                            backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                            border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                            transition: 'all 0.2s ease',
                            boxShadow: isSelected ? '0 2px 4px rgba(59, 130, 246, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '#f3f4f6';
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '#ffffff';
                              e.currentTarget.style.borderColor = '#e5e7eb';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  daysOfWeek: [...prev.daysOfWeek, String(day.value)],
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  daysOfWeek: prev.daysOfWeek.filter(d => d !== String(day.value)),
                                }));
                              }
                            }}
                            style={{
                              cursor: 'pointer',
                              width: '18px',
                              height: '18px',
                              accentColor: '#3b82f6',
                              margin: 0,
                            }}
                          />
                          <span style={{ 
                            userSelect: 'none',
                            fontWeight: isSelected ? 600 : 500,
                          }}>
                            {day.label.replace('-feira', '').replace('Domingo', 'Dom').replace('Sábado', 'Sáb')}
                          </span>
                          {isSelected && (
                            <span style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#3b82f6',
                            }} />
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {formData.daysOfWeek.length === 0 && (
                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.625rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span>⚠️</span>
                      <span>Selecione pelo menos um dia da semana</span>
                    </p>
                  )}
                  {formData.daysOfWeek.length > 0 && (
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.625rem', marginBottom: 0 }}>
                      {formData.daysOfWeek.length} dia{formData.daysOfWeek.length > 1 ? 's' : ''} selecionado{formData.daysOfWeek.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              )}

              {!formData.isFullDay && (
                <div style={{ display: 'grid', gridTemplateColumns: formData.specificDate ? '1fr 1fr' : '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#374151',
                      letterSpacing: '0.025em',
                    }}>
                      Horário Inicial <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <TimePicker
                      value={formData.startTime}
                      onChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
                      disabled={formData.isFullDay}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#374151',
                      letterSpacing: '0.025em',
                    }}>
                      Horário Final <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <TimePicker
                      value={formData.endTime}
                      onChange={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
                      disabled={formData.isFullDay}
                    />
                  </div>
                  {!formData.specificDate && (
                    <div className="form-group">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#374151',
                        letterSpacing: '0.025em',
                      }}>
                        Intervalo em minutos <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="1440"
                        value={formData.slotInterval}
                        onChange={(e) => setFormData(prev => ({ ...prev, slotInterval: e.target.value }))}
                        required={!formData.specificDate}
                        disabled={formData.isFullDay}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '0.9375rem',
                          color: '#1f2937',
                          backgroundColor: formData.isFullDay ? '#f3f4f6' : '#ffffff',
                          transition: 'all 0.2s',
                          boxSizing: 'border-box',
                          cursor: formData.isFullDay ? 'not-allowed' : 'text',
                          opacity: formData.isFullDay ? 0.6 : 1,
                        }}
                        onFocus={(e) => {
                          if (!formData.isFullDay) {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.outline = 'none';
                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

            {!formData.isFullDay && !formData.specificDate && (
              <div className="form-group" style={{ 
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    style={{ 
                      cursor: 'pointer',
                      width: '18px',
                      height: '18px',
                      accentColor: '#3b82f6',
                    }}
                  />
                  <span>Ativa</span>
                </label>
              </div>
            )}
            {formData.specificDate && !formData.isFullDay && (
              <div style={{
                padding: '0.875rem',
                backgroundColor: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.875rem', 
                  color: '#92400e',
                  fontWeight: 500,
                }}>
                  ⚠️ Esta data específica bloqueará agendamentos no horário configurado, sobrepondo a regra semanal.
                </p>
              </div>
            )}

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
                  onClick={resetForm}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#ffffff',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: (createMutation.isPending || updateMutation.isPending) ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = '#f9fafb';
                      e.target.style.borderColor = '#9ca3af';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ffffff';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: (createMutation.isPending || updateMutation.isPending) 
                      ? '#9ca3af' 
                      : 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (createMutation.isPending || updateMutation.isPending) ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    boxShadow: (createMutation.isPending || updateMutation.isPending) 
                      ? 'none' 
                      : '0 2px 4px rgba(108, 35, 150, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
                      e.target.style.boxShadow = '0 4px 6px rgba(108, 35, 150, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!createMutation.isPending && !updateMutation.isPending) {
                      e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
                      e.target.style.boxShadow = '0 2px 4px rgba(108, 35, 150, 0.2)';
                    }
                  }}
                >
                  <Save size={18} />
                  {createMutation.isPending || updateMutation.isPending 
                    ? 'Salvando...' 
                    : (editingIds && editingIds.length > 0 ? 'Atualizar' : 'Criar')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="availability-sections">
        <div className="availability-section">
          <h4>
            <CalendarIcon size={20} />
            Regras Semanais
          </h4>
          {weeklyGroups.length === 0 ? (
            <div className="empty-state">Nenhuma regra semanal configurada</div>
          ) : (
            <div className="availability-list">
              {weeklyGroups.map((group, index) => (
                <div key={`group-${index}`} className={`availability-item ${!group.isActive ? 'inactive' : ''}`}>
                  <div className="availability-info">
                    <div className="availability-day">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                        {group.daysOfWeek.map((dayOfWeek) => (
                          <span
                            key={dayOfWeek}
                            className="day-badge"
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.5rem',
                              backgroundColor: group.isActive ? '#dbeafe' : '#fee2e2',
                              color: group.isActive ? '#1e40af' : '#991b1b',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            {DAYS_OF_WEEK.find(d => d.value === dayOfWeek)?.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="availability-time">
                      <Clock size={16} />
                      {group.startTime} - {group.endTime} (intervalo: {group.slotInterval}min)
                    </div>
                  </div>
                  <div className="availability-actions">
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => handleEdit(group)}
                      title="Editar"
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
                    <button
                      type="button"
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteClick(group)}
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="availability-section">
          <h4>
            <CalendarIcon size={20} />
            Exceções (Datas Específicas)
          </h4>
          {specificRules.length === 0 ? (
            <div className="empty-state">Nenhuma exceção configurada</div>
          ) : (
            <div className="availability-list">
              {specificRules.map(rule => {
                // Detectar bloqueio de dia inteiro: slotInterval 1440 E (isActive false OU horário 00:00-23:59)
                const isFullDayBlock = rule.slotInterval === 1440 && (!rule.isActive || (rule.startTime === '00:00' && rule.endTime === '23:59'));
                return (
                  <div key={rule.id} className={`availability-item ${!rule.isActive ? 'inactive' : ''}`}>
                    <div className="availability-info">
                      <div className="availability-day">
                        {formatDate(rule.specificDate)}
                        {isFullDayBlock && <span style={{ marginLeft: '0.5rem', color: '#dc2626', fontSize: '0.75rem' }}>(Dia bloqueado)</span>}
                      </div>
                      <div className="availability-time">
                        <Clock size={16} />
                        {isFullDayBlock ? 'Dia inteiro bloqueado' : `${rule.startTime} - ${rule.endTime}`}
                      </div>
                    </div>
                  <div className="availability-actions">
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => handleEdit(rule)}
                      title="Editar"
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
                    <button
                      type="button"
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteClick(rule)}
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
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {availabilityToDelete && (
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
                {Array.isArray(availabilityToDelete?.rules) && availabilityToDelete.rules.length > 1
                  ? `Excluir ${availabilityToDelete.rules.length} disponibilidades?`
                  : 'Excluir disponibilidade?'}
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
                {Array.isArray(availabilityToDelete?.rules) && availabilityToDelete.rules.length > 1
                  ? `Tem certeza que deseja excluir ${availabilityToDelete.rules.length} disponibilidades?`
                  : 'Tem certeza que deseja excluir esta disponibilidade?'}
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
                    <li>Os agendamentos futuros podem ser afetados.</li>
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
    </div>
  );
};

export default AvailabilityCalendar;

