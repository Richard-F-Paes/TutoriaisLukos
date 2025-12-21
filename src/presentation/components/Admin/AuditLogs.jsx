// AuditLogs - Logs de auditoria (apenas admin)
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditService } from '../../../services/auditService.js';
import { userService } from '../../../services/userService.js';
import { Search, X } from 'lucide-react';
import { formatDate } from '../../../shared/utils/index.js';

const AuditLogs = () => {
  // Função para formatar data para input (YYYY-MM-DD)
  const formatDateToInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Calcular últimos 7 dias por padrão
  const getDefaultDates = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    return {
      startDate: formatDateToInput(startDate),
      endDate: formatDateToInput(endDate),
    };
  };

  const defaultDates = getDefaultDates();

  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    userId: '',
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
  });

  const [activeFilters, setActiveFilters] = useState({
    action: '',
    entityType: '',
    userId: '',
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
  });

  const [hasSearched, setHasSearched] = useState(true); // Iniciar como true para fazer busca automática com os últimos 7 dias

  // Função para formatar data e hora para exibição
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    const dateStr = formatDate(date);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${dateStr} ${hours}:${minutes}`;
  };

  // Função para formatar data para exibição (DD/MM/AAAA)
  const formatDateToDisplay = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  // Função para converter formato brasileiro para ISO
  const parseBrazilianDate = (dateStr) => {
    if (!dateStr) return '';
    // Remove tudo que não é número
    const numbers = dateStr.replace(/\D/g, '');
    if (numbers.length !== 8) return '';
    
    const day = numbers.substring(0, 2);
    const month = numbers.substring(2, 4);
    const year = numbers.substring(4, 8);
    
    // Validar
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    if (dayNum < 1 || dayNum > 31) return '';
    if (monthNum < 1 || monthNum > 12) return '';
    if (yearNum < 1900 || yearNum > 2100) return '';
    
    // Retornar no formato ISO (YYYY-MM-DD)
    return `${year}-${month}-${day}`;
  }

  // Função para aplicar máscara de data brasileira
  const applyDateMask = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.substring(0, 2)}/${numbers.substring(2)}`;
    return `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}/${numbers.substring(4, 8)}`;
  }

  // Handler para mudança de data
  const handleDateChange = (field, value) => {
    const masked = applyDateMask(value);
    setFilters(prev => ({ ...prev, [field]: masked }));
  };

  // Handler para blur de data (converte para formato ISO)
  const handleDateBlur = (field, value) => {
    if (!value) {
      setFilters(prev => ({ ...prev, [field]: '' }));
      return;
    }
    
    const isoDate = parseBrazilianDate(value);
    if (isoDate) {
      setFilters(prev => ({ ...prev, [field]: isoDate }));
    } else {
      // Se não conseguiu parsear, limpa o campo
      setFilters(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Buscar lista de usuários para o dropdown
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.list(),
  });

  const users = Array.isArray(usersData) ? usersData : [];

  // Buscar logs apenas quando clicar no botão de busca
  const { data: logsData, isLoading, refetch } = useQuery({
    queryKey: ['audit-logs', activeFilters],
    queryFn: () => auditService.list(activeFilters),
    enabled: hasSearched, // Só buscar após primeira busca
  });

  const logs = Array.isArray(logsData) ? logsData : [];

  const handleSearch = () => {
    // Converter datas do formato brasileiro para ISO antes de buscar (se necessário)
    const searchFilters = { ...filters };
    
    // Garantir que as datas estão no formato ISO (YYYY-MM-DD) para o backend
    // Se já estão no formato ISO (contém hífen), manter assim
    // Se estão no formato brasileiro (contém barra), converter
    if (searchFilters.startDate && searchFilters.startDate.includes('/')) {
      searchFilters.startDate = parseBrazilianDate(searchFilters.startDate) || searchFilters.startDate;
    }
    if (searchFilters.endDate && searchFilters.endDate.includes('/')) {
      searchFilters.endDate = parseBrazilianDate(searchFilters.endDate) || searchFilters.endDate;
    }
    
    // Limpar filtros vazios antes de buscar
    const cleanFilters = Object.fromEntries(
      Object.entries(searchFilters).filter(([_, value]) => value !== '')
    );
    setActiveFilters(cleanFilters);
    setHasSearched(true);
    refetch();
  };

  const handleClearFilters = () => {
    // Resetar para os últimos 7 dias
    const defaultDates = getDefaultDates();
    const resetFilters = {
      action: '',
      entityType: '',
      userId: '',
      startDate: defaultDates.startDate,
      endDate: defaultDates.endDate,
    };
    setFilters(resetFilters);
    setActiveFilters(resetFilters);
    refetch();
  };

  return (
    <div className="audit-logs">
      <div className="manager-header">
        <h2>Logs de Auditoria</h2>
      </div>

      <div className="logs-filters-container" style={{
        background: 'white',
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}>
        <style>{`
          .filters-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
          }
          
          /* Estilização dos inputs de data para melhor visibilidade */
          input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0;
            cursor: pointer;
            position: absolute;
            right: 0.75rem;
            width: 16px;
            height: 16px;
            z-index: 1;
          }
          
          input[type="date"]::-webkit-inner-spin-button,
          input[type="date"]::-webkit-clear-button {
            opacity: 0;
          }
          
          input[type="date"]::-webkit-datetime-edit-fields-wrapper {
            padding: 0;
          }
          
          input[type="date"]::-webkit-datetime-edit-text {
            color: #6b7280;
            padding: 0 0.25rem;
          }
          
          input[type="date"]::-webkit-datetime-edit-month-field,
          input[type="date"]::-webkit-datetime-edit-day-field,
          input[type="date"]::-webkit-datetime-edit-year-field {
            color: #1f2937;
            padding: 0 0.125rem;
            font-weight: 500;
          }
          
          input[type="date"]:focus::-webkit-datetime-edit-text,
          input[type="date"]:focus::-webkit-datetime-edit-month-field,
          input[type="date"]:focus::-webkit-datetime-edit-day-field,
          input[type="date"]:focus::-webkit-datetime-edit-year-field {
            background-color: rgba(59, 130, 246, 0.1);
            border-radius: 2px;
          }
          
          @media (max-width: 768px) {
            .filters-grid {
              grid-template-columns: 1fr !important;
            }
            .filter-period {
              grid-column: span 1 !important;
            }
            .filter-period > div {
              flex-direction: column !important;
              align-items: stretch !important;
            }
            .filter-period > div > span {
              display: none !important;
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .filter-period {
              grid-column: span 2 !important;
            }
          }
          
          @media (min-width: 1025px) {
            .filter-period {
              grid-column: span 2 !important;
            }
          }
        `}</style>
        <div className="filters-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}>
          <div className="filter-group">
            <label style={{
              display: 'block',
              marginBottom: '0.375rem',
              fontWeight: 500,
              fontSize: '0.8125rem',
              color: '#6b7280',
            }}>
              Ação
            </label>
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#1f2937',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: '36px',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Todas</option>
              <option value="CREATE">Criar</option>
              <option value="UPDATE">Atualizar</option>
              <option value="DELETE">Excluir</option>
              <option value="LOGIN">Login</option>
            </select>
          </div>

          <div className="filter-group">
            <label style={{
              display: 'block',
              marginBottom: '0.375rem',
              fontWeight: 500,
              fontSize: '0.8125rem',
              color: '#6b7280',
            }}>
              Tipo
            </label>
            <select
              value={filters.entityType}
              onChange={(e) => setFilters({ ...filters, entityType: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#1f2937',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: '36px',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Todos</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Training">Treinamento</option>
              <option value="Category">Categoria</option>
              <option value="User">Usuário</option>
              <option value="Media">Mídia</option>
              <option value="HeaderMenu">Menu do Cabeçalho</option>
              <option value="HeaderMenuItem">Item do Menu</option>
              <option value="TrainingConfiguration">Configuração de Treinamento</option>
              <option value="TrainingAvailability">Disponibilidade de Treinamento</option>
              <option value="TrainingAppointment">Agendamento de Treinamento</option>
            </select>
          </div>

          <div className="filter-group" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <label style={{
              fontWeight: 500,
              fontSize: '0.8125rem',
              color: '#6b7280',
              whiteSpace: 'nowrap',
            }}>
              Usuário:
            </label>
            <select
              value={filters.userId}
              onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#1f2937',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: '36px',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Todos</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.username})
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group filter-period" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            gridColumn: 'span 2',
          }}>
            <label style={{
              fontWeight: 500,
              fontSize: '0.8125rem',
              color: '#6b7280',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
            }}>
              Período:
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flex: 1,
              minWidth: 0,
            }}>
              <div style={{ position: 'relative', flex: '1 1 0', minWidth: '120px' }}>
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    setFilters(prev => ({ ...prev, startDate: dateValue }));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2.5rem 0.5rem 0.75rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: filters.startDate ? '#1f2937' : '#9ca3af',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s',
                    boxSizing: 'border-box',
                    height: '36px',
                    cursor: 'pointer',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '16px 16px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.backgroundColor = '#f8fafc';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = '#9ca3af';
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#ffffff';
                    }
                  }}
                />
              </div>
              <span style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                até
              </span>
              <div style={{ position: 'relative', flex: '1 1 0', minWidth: '120px' }}>
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    setFilters(prev => ({ ...prev, endDate: dateValue }));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2.5rem 0.5rem 0.75rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: filters.endDate ? '#1f2937' : '#9ca3af',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s',
                    boxSizing: 'border-box',
                    height: '36px',
                    cursor: 'pointer',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '16px 16px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.backgroundColor = '#f8fafc';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = '#9ca3af';
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#ffffff';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-actions" style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'flex-end',
          paddingTop: '0.5rem',
          borderTop: '1px solid #f3f4f6',
        }}>
          <button
            type="button"
            onClick={handleClearFilters}
            style={{
              padding: '0.5rem 1rem',
              background: '#ffffff',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s',
              height: '32px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#9ca3af';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#d1d5db';
              e.target.style.color = '#6b7280';
            }}
          >
            <X size={14} />
            Limpar
          </button>
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s',
              height: '32px',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(135deg, #5a008f 0%, #4a0073 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(135deg, #6c2396 0%, #5a008f 100%)';
              }
            }}
          >
            <Search size={14} />
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Carregando logs...</div>
      ) : logs.length === 0 ? (
        <div className="empty-state">Nenhum log encontrado. Use os filtros acima para buscar.</div>
      ) : (
        <div className="logs-table">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Usuário</th>
                <th>Ação</th>
                <th>Tipo</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id || log.Id}>
                  <td>{formatDateTime(log.createdAt || log.CreatedAt)}</td>
                  <td>{log.user?.name || log.user?.username || log.UserName || log.Username || '-'}</td>
                  <td>
                    <span className={`action-badge ${(log.action || log.Action || '').toLowerCase()}`}>
                      {log.action || log.Action}
                    </span>
                  </td>
                  <td>{log.entityType || log.EntityType}</td>
                  <td>
                    {log.entityId && (
                      <span className="entity-id">ID: {log.entityId || log.EntityId}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
