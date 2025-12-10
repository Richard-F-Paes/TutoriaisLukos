// AuditLogs - Logs de auditoria (apenas admin)
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditService } from '../../../services/auditService.js';
import { Filter } from 'lucide-react';

const AuditLogs = () => {
  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    userId: '',
  });

  const { data: logsData, isLoading } = useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: () => auditService.list(filters),
  });

  const logs = logsData?.data || [];

  return (
    <div className="audit-logs">
      <div className="manager-header">
        <h2>Logs de Auditoria</h2>
        <div className="logs-filters">
          <select
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
          >
            <option value="">Todas as ações</option>
            <option value="CREATE">Criar</option>
            <option value="UPDATE">Atualizar</option>
            <option value="DELETE">Excluir</option>
            <option value="LOGIN">Login</option>
          </select>
          <select
            value={filters.entityType}
            onChange={(e) => setFilters({ ...filters, entityType: e.target.value })}
          >
            <option value="">Todos os tipos</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Category">Categoria</option>
            <option value="User">Usuário</option>
            <option value="Media">Mídia</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Carregando logs...</div>
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
                <tr key={log.Id}>
                  <td>{new Date(log.CreatedAt).toLocaleString('pt-BR')}</td>
                  <td>{log.UserName || log.Username || '-'}</td>
                  <td>
                    <span className={`action-badge ${log.Action.toLowerCase()}`}>
                      {log.Action}
                    </span>
                  </td>
                  <td>{log.EntityType}</td>
                  <td>
                    {log.EntityId && (
                      <span className="entity-id">ID: {log.EntityId}</span>
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
