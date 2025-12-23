// Configuração de Auto-Refresh
// Centraliza intervalos de atualização automática de dados

// Verificar se auto-refresh está habilitado
const isRefreshEnabled = import.meta.env.VITE_REFRESH_ENABLED !== 'false';

// Intervalos padrão (em milissegundos)
const CRITICAL_INTERVAL = parseInt(
  import.meta.env.VITE_REFRESH_CRITICAL_INTERVAL || '10000',
  10
); // 10 segundos - stats, agendamentos

const MODERATE_INTERVAL = parseInt(
  import.meta.env.VITE_REFRESH_MODERATE_INTERVAL || '30000',
  10
); // 30 segundos - tutoriais, treinamentos, mídia

const STATIC_INTERVAL = parseInt(
  import.meta.env.VITE_REFRESH_STATIC_INTERVAL || '300000',
  10
); // 5 minutos - categorias, menus

/**
 * Obtém o intervalo de refresh baseado no tipo de dado
 * @param {'critical'|'moderate'|'static'} type - Tipo de dado
 * @returns {number|false} Intervalo em ms ou false se refresh desabilitado
 */
export function getRefreshInterval(type = 'moderate') {
  if (!isRefreshEnabled) {
    return false;
  }

  switch (type) {
    case 'critical':
      return CRITICAL_INTERVAL;
    case 'moderate':
      return MODERATE_INTERVAL;
    case 'static':
      return STATIC_INTERVAL;
    default:
      return MODERATE_INTERVAL;
  }
}

/**
 * Configuração de refresh para queries React Query
 * @param {'critical'|'moderate'|'static'} type - Tipo de dado
 * @param {Object} options - Opções adicionais
 * @returns {Object} Configuração para useQuery
 */
export function getRefreshConfig(type = 'moderate', options = {}) {
  const interval = getRefreshInterval(type);
  
  if (!interval) {
    return {
      refetchInterval: false,
      ...options,
    };
  }

  return {
    refetchInterval: interval,
    refetchIntervalInBackground: false, // Pausar quando aba inativa
    ...options,
  };
}

export const refreshConfig = {
  enabled: isRefreshEnabled,
  intervals: {
    critical: CRITICAL_INTERVAL,
    moderate: MODERATE_INTERVAL,
    static: STATIC_INTERVAL,
  },
  getRefreshInterval,
  getRefreshConfig,
};

export default refreshConfig;

