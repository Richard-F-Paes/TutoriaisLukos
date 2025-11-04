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
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year);
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

export default {
  formatDate,
  truncate,
  debounce,
  slugify,
  isValidEmail,
  cn,
};


