// Serviço de Tokens JWT Simplificado
// Para autenticação da equipe de suporte

/**
 * Gera um token JWT simples para autenticação
 * @param {Object} user - Dados do usuário
 * @param {number} expiresInHours - Horas até expiração (padrão: 24)
 * @returns {string} - Token JWT
 */
export const generateToken = (user, expiresInHours = 24) => {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (expiresInHours * 60 * 60)
  };

  // Token simples usando base64 (em produção, usar biblioteca JWT adequada)
  const token = btoa(JSON.stringify(payload));
  return token;
};

/**
 * Verifica e decodifica um token
 * @param {string} token - Token JWT
 * @returns {Object|null} - Payload decodificado ou null se inválido
 */
export const verifyToken = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    
    // Verificar expiração
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Token expirado
    }

    return payload;
  } catch (error) {
    return null; // Token inválido
  }
};

// Renomear para evitar conflito com função verifyToken
export const decodeToken = verifyToken;

/**
 * Verifica se um token está expirado
 * @param {string} token - Token JWT
 * @returns {boolean} - true se expirado
 */
export const isTokenExpired = (token) => {
  const payload = verifyToken(token);
  if (!payload || !payload.exp) return true;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};

export default {
  generateToken,
  verifyToken,
  isTokenExpired
};


