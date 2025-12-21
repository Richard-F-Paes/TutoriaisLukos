// Utilitários compartilhados
// Funções auxiliares reutilizáveis

/**
 * Formata data para exibição
 * @param {string|Date} date - Data para formatar
 * @param {string} format - Formato desejado (padrão: 'dd/MM/yyyy')
 * @returns {string} - Data formatada
 */
export const formatDate = (date, format = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  let day, month, year;
  
  // Se for uma string ISO (YYYY-MM-DD), parsear manualmente para evitar problemas de timezone
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
    const parts = date.split('T')[0].split('-');
    if (parts.length === 3) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
      
      // Validar se os valores são válidos
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return '';
      }
    } else {
      // Fallback para Date se não for formato ISO válido
      const d = new Date(date);
      if (isNaN(d.getTime())) return '';
      day = d.getDate();
      month = d.getMonth() + 1;
      year = d.getFullYear();
    }
  } else {
    // Para objetos Date ou outros formatos, usar o construtor Date
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    day = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
  }
  
  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const yearStr = String(year);
  
  return format
    .replace('dd', dayStr)
    .replace('MM', monthStr)
    .replace('yyyy', yearStr);
};

/**
 * Trunca texto para um tamanho máximo
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Tamanho máximo
 * @param {string} suffix - Sufixo a adicionar (padrão: '...')
 * @returns {string} - Texto truncado
 */
export const truncate = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};

/**
 * Debounce function
 * @param {Function} func - Função a executar
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Slugify - Converte string para formato URL-friendly
 * @param {string} text - Texto para converter
 * @returns {string} - Slug
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Valida email
 * @param {string} email - Email para validar
 * @returns {boolean} - true se válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Classe condicional - ajuda a construir classes CSS condicionalmente
 * @param {...any} classes - Classes CSS (strings, objetos, arrays)
 * @returns {string} - String de classes CSS
 */
export const cn = (...classes) => {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([_, condition]) => condition)
          .map(([className]) => className)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Exportar funções de rotas
export { isTutorialRoute, shouldShowCategoryNavbar, shouldShowPageNavbar } from './routeUtils';

export default {
  formatDate,
  truncate,
  debounce,
  slugify,
  isValidEmail,
  cn,
};


