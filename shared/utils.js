// Utilitários compartilhados entre frontend e backend

/**
 * Formatar data para exibição
 * @param {Date|string} date - Data para formatar
 * @param {string} locale - Locale para formatação (padrão: pt-BR)
 * @returns {string} Data formatada
 */
export const formatDate = (date, locale = 'pt-BR') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Formatar data e hora para exibição
 * @param {Date|string} date - Data para formatar
 * @param {string} locale - Locale para formatação (padrão: pt-BR)
 * @returns {string} Data e hora formatadas
 */
export const formatDateTime = (date, locale = 'pt-BR') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

/**
 * Formatar tempo relativo (ex: "há 2 horas")
 * @param {Date|string} date - Data para calcular
 * @param {string} locale - Locale para formatação (padrão: pt-BR)
 * @returns {string} Tempo relativo formatado
 */
export const formatRelativeTime = (date, locale = 'pt-BR') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
};

/**
 * Formatar duração em minutos para texto legível
 * @param {number} minutes - Duração em minutos
 * @returns {string} Duração formatada
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes < 1) return 'Menos de 1 minuto';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    if (remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}min`;
    }
    return `${hours}h`;
  }
  
  return `${minutes}min`;
};

/**
 * Formatar número com separadores de milhares
 * @param {number} number - Número para formatar
 * @param {string} locale - Locale para formatação (padrão: pt-BR)
 * @returns {string} Número formatado
 */
export const formatNumber = (number, locale = 'pt-BR') => {
  if (typeof number !== 'number') return '0';
  
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Truncar texto com reticências
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Capitalizar primeira letra de cada palavra
 * @param {string} text - Texto para capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Gerar slug a partir de texto
 * @param {string} text - Texto para converter em slug
 * @returns {string} Slug gerado
 */
export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
};

/**
 * Validar email
 * @param {string} email - Email para validar
 * @returns {boolean} True se email é válido
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar senha forte
 * @param {string} password - Senha para validar
 * @returns {object} Resultado da validação
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    errors: []
  };
  
  if (!password) {
    result.errors.push('Senha é obrigatória');
    return result;
  }
  
  if (password.length < 6) {
    result.errors.push('Senha deve ter pelo menos 6 caracteres');
  }
  
  if (!/[a-z]/.test(password)) {
    result.errors.push('Senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/[A-Z]/.test(password)) {
    result.errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/\d/.test(password)) {
    result.errors.push('Senha deve conter pelo menos um número');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Debounce function
 * @param {Function} func - Função para debounce
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função com debounce
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
 * Throttle function
 * @param {Function} func - Função para throttle
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função com throttle
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Gerar ID único
 * @returns {string} ID único
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Verificar se é mobile
 * @returns {boolean} True se é mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Copiar texto para clipboard
 * @param {string} text - Texto para copiar
 * @returns {Promise<boolean>} True se copiado com sucesso
 */
export const copyToClipboard = async (text) => {
  if (!text) return false;
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('Erro ao copiar para clipboard:', error);
    return false;
  }
};
