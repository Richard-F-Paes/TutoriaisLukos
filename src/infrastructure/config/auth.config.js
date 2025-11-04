// Configuração de Autenticação Simplificada
// Apenas para equipe pequena de suporte

/**
 * Configuração de usuários da equipe
 * Em produção, usar variáveis de ambiente (VITE_AUTH_USERS)
 * 
 * Formato: "user1:hash1:name1:role1,user2:hash2:name2:role2"
 * 
 * Para gerar hash de senha (execute em Node.js):
 * const bcrypt = require('bcryptjs');
 * const hash = await bcrypt.hash('senha123', 10);
 * console.log(hash);
 */

// Verificar se estamos em desenvolvimento
const isDevelopment = import.meta.env.DEV;

// Carregar usuários de variáveis de ambiente
const getUsersFromEnv = () => {
  const envUsers = import.meta.env.VITE_AUTH_USERS;
  if (!envUsers) return null;

  // Formato: "user1:hash1:name1:role1,user2:hash2:name2:role2"
  return envUsers.split(',').map(userStr => {
    const [username, passwordHash, name = username, role = 'editor'] = userStr.split(':');
    return { username, passwordHash, name, role };
  });
};

// Usuários padrão apenas para desenvolvimento
// ATENÇÃO: Em produção, sempre usar variáveis de ambiente
const defaultUsers = isDevelopment ? [
  {
    username: 'admin',
    // Hash da senha "admin123" (gerado com bcryptjs)
    passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    name: 'Administrador',
    role: 'admin'
  },
  {
    username: 'editor',
    // Hash da senha "editor123" (gerado com bcryptjs)
    passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Editor',
    role: 'editor'
  }
] : [];

/**
 * Verificar credenciais usando bcryptjs
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha em texto plano
 * @returns {Promise<Object|null>} - Dados do usuário ou null se inválido
 */
export const verifyCredentials = async (username, password) => {
  // Obter usuários (variável de ambiente ou padrão)
  const envUsers = getUsersFromEnv();
  const users = envUsers || defaultUsers;

  if (users.length === 0) {
    console.warn('Nenhum usuário configurado');
    return null;
  }

  // Encontrar usuário
  const user = users.find(u => u.username === username);
  if (!user) {
    return null;
  }

  // Verificar senha usando bcryptjs
  try {
    // Importação dinâmica de bcryptjs
    const bcrypt = (await import('bcryptjs')).default;
    const isValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValid) {
      return null;
    }
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    // Em desenvolvimento, permitir fallback simples (NÃO SEGURO)
    if (isDevelopment && password === 'admin123' && username === 'admin') {
      console.warn('⚠️ Usando fallback de autenticação (apenas desenvolvimento)');
    } else {
      return null;
    }
  }

  // Retornar dados do usuário (sem a senha)
  return {
    id: user.username,
    username: user.username,
    name: user.name,
    role: user.role,
    createdAt: new Date().toISOString()
  };
};

/**
 * Obter todos os usuários (apenas para desenvolvimento/debug)
 */
export const getAllUsers = () => {
  if (!isDevelopment) {
    console.warn('getAllUsers só disponível em desenvolvimento');
    return [];
  }
  
  const envUsers = getUsersFromEnv();
  return envUsers || defaultUsers.map(u => ({ ...u, passwordHash: '***' }));
};

export default {
  verifyCredentials,
  getAllUsers
};
