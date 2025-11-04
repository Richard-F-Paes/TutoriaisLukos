import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PERMISSIONS } from '../shared/constants';

// Hook personalizado para gerenciamento de permissões
export function usePermissions() {
  const { user, isAuthenticated } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  // Carrega permissões do usuário
  useEffect(() => {
    if (user && user.permissions) {
      setPermissions(user.permissions);
    } else {
      setPermissions([]);
    }
  }, [user]);

  // Carrega roles do usuário
  useEffect(() => {
    if (user && user.role) {
      setRoles([user.role]);
    } else {
      setRoles([]);
    }
  }, [user]);

  // Verifica se usuário tem permissão específica
  const hasPermission = useCallback((permission) => {
    if (!isAuthenticated || !permissions) return false;
    return permissions.includes(permission);
  }, [isAuthenticated, permissions]);

  // Verifica se usuário tem qualquer uma das permissões
  const hasAnyPermission = useCallback((permissionList) => {
    if (!isAuthenticated || !permissions) return false;
    return permissionList.some(permission => permissions.includes(permission));
  }, [isAuthenticated, permissions]);

  // Verifica se usuário tem todas as permissões
  const hasAllPermissions = useCallback((permissionList) => {
    if (!isAuthenticated || !permissions) return false;
    return permissionList.every(permission => permissions.includes(permission));
  }, [isAuthenticated, permissions]);

  // Verifica se usuário tem role específica
  const hasRole = useCallback((role) => {
    if (!isAuthenticated || !roles) return false;
    return roles.includes(role);
  }, [isAuthenticated, roles]);

  // Verifica se usuário tem qualquer uma das roles
  const hasAnyRole = useCallback((roleList) => {
    if (!isAuthenticated || !roles) return false;
    return roleList.some(role => roles.includes(role));
  }, [isAuthenticated, roles]);

  // Verifica se usuário é admin
  const isAdmin = useCallback(() => {
    return hasAnyRole(['admin', 'super_admin']);
  }, [hasAnyRole]);

  // Verifica se usuário pode gerenciar conteúdo
  const canManageContent = useCallback(() => {
    return hasAnyPermission(['manage_content', 'edit_tutorials', 'create_tutorials']);
  }, [hasAnyPermission]);

  // Verifica se usuário pode gerenciar usuários
  const canManageUsers = useCallback(() => {
    return hasAnyPermission(['manage_users', 'admin']);
  }, [hasAnyPermission]);

  // Verifica se usuário pode acessar área administrativa
  const canAccessAdmin = useCallback(() => {
    return hasAnyRole(['admin', 'super_admin', 'moderator']);
  }, [hasAnyRole]);

  // Verifica se usuário pode editar tutoriais
  const canEditTutorials = useCallback(() => {
    return hasAnyPermission(['edit_tutorials', 'manage_content', 'admin']);
  }, [hasAnyPermission]);

  // Verifica se usuário pode criar tutoriais
  const canCreateTutorials = useCallback(() => {
    return hasAnyPermission(['create_tutorials', 'manage_content', 'admin']);
  }, [hasAnyPermission]);

  // Verifica se usuário pode deletar tutoriais
  const canDeleteTutorials = useCallback(() => {
    return hasAnyPermission(['delete_tutorials', 'manage_content', 'admin']);
  }, [hasAnyPermission]);

  // Verifica se usuário pode visualizar analytics
  const canViewAnalytics = useCallback(() => {
    return hasAnyPermission(['view_analytics', 'admin']);
  }, [hasAnyPermission]);

  // Verifica se usuário pode gerenciar configurações
  const canManageSettings = useCallback(() => {
    return hasAnyPermission(['manage_settings', 'admin']);
  }, [hasAnyPermission]);

  return {
    // Estado
    permissions,
    roles,
    isAuthenticated,
    
    // Verificações de permissão
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Verificações de role
    hasRole,
    hasAnyRole,
    isAdmin,
    
    // Verificações específicas
    canManageContent,
    canManageUsers,
    canAccessAdmin,
    canEditTutorials,
    canCreateTutorials,
    canDeleteTutorials,
    canViewAnalytics,
    canManageSettings
  };
}

// Hook para controle de acesso a rotas
export function useRouteAccess() {
  const { isAuthenticated } = useAuth();
  const { hasPermission, hasRole, isAdmin } = usePermissions();

  // Verifica se usuário pode acessar rota específica
  const canAccessRoute = useCallback((route, requiredPermission = null, requiredRole = null) => {
    // Rotas públicas
    const publicRoutes = ['/', '/categorias', '/tutoriais', '/sobre', '/busca', '/login', '/register'];
    if (publicRoutes.includes(route)) {
      return true;
    }

    // Verifica autenticação para rotas protegidas
    if (!isAuthenticated) {
      return false;
    }

    // Verifica permissão específica
    if (requiredPermission && !hasPermission(requiredPermission)) {
      return false;
    }

    // Verifica role específica
    if (requiredRole && !hasRole(requiredRole)) {
      return false;
    }

    return true;
  }, [isAuthenticated, hasPermission, hasRole]);

  // Verifica acesso a rotas administrativas
  const canAccessAdminRoute = useCallback((route) => {
    if (!isAuthenticated) return false;
    
    const adminRoutes = {
      '/admin': ['admin', 'super_admin'],
      '/admin/users': ['admin', 'super_admin'],
      '/admin/content': ['admin', 'super_admin', 'moderator'],
      '/admin/analytics': ['admin', 'super_admin'],
      '/admin/settings': ['admin', 'super_admin']
    };

    const requiredRoles = adminRoutes[route];
    if (!requiredRoles) return false;

    return hasAnyRole(requiredRoles);
  }, [isAuthenticated, hasAnyRole]);

  return {
    canAccessRoute,
    canAccessAdminRoute
  };
}

// Hook para gerenciamento de permissões (apenas para admins)
export function usePermissionManagement() {
  const { isAdmin } = usePermissions();
  const [allPermissions, setAllPermissions] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  // Carrega todas as permissões disponíveis
  useEffect(() => {
    const permissions = [
      // Permissões de conteúdo
      'view_tutorials',
      'create_tutorials',
      'edit_tutorials',
      'delete_tutorials',
      'manage_content',
      
      // Permissões de usuário
      'view_users',
      'create_users',
      'edit_users',
      'delete_users',
      'manage_users',
      
      // Permissões administrativas
      'view_analytics',
      'manage_settings',
      'manage_system',
      'admin'
    ];

    setAllPermissions(permissions);
  }, []);

  // Carrega todas as roles disponíveis
  useEffect(() => {
    const roles = [
      {
        id: 'viewer',
        name: 'Visualizador',
        description: 'Pode apenas visualizar tutoriais',
        permissions: ['view_tutorials']
      },
      {
        id: 'user',
        name: 'Usuário',
        description: 'Pode visualizar e completar tutoriais',
        permissions: ['view_tutorials', 'complete_tutorials']
      },
      {
        id: 'editor',
        name: 'Editor',
        description: 'Pode criar e editar tutoriais',
        permissions: ['view_tutorials', 'create_tutorials', 'edit_tutorials', 'manage_content']
      },
      {
        id: 'moderator',
        name: 'Moderador',
        description: 'Pode moderar conteúdo e usuários',
        permissions: ['view_tutorials', 'create_tutorials', 'edit_tutorials', 'delete_tutorials', 'manage_content', 'view_users', 'edit_users']
      },
      {
        id: 'admin',
        name: 'Administrador',
        description: 'Acesso completo ao sistema',
        permissions: ['view_tutorials', 'create_tutorials', 'edit_tutorials', 'delete_tutorials', 'manage_content', 'view_users', 'create_users', 'edit_users', 'delete_users', 'manage_users', 'view_analytics', 'manage_settings']
      },
      {
        id: 'super_admin',
        name: 'Super Administrador',
        description: 'Acesso total incluindo configurações do sistema',
        permissions: ['view_tutorials', 'create_tutorials', 'edit_tutorials', 'delete_tutorials', 'manage_content', 'view_users', 'create_users', 'edit_users', 'delete_users', 'manage_users', 'view_analytics', 'manage_settings', 'manage_system', 'admin']
      }
    ];

    setAllRoles(roles);
  }, []);

  // Atualiza permissões de um usuário
  const updateUserPermissions = useCallback(async (userId, newPermissions) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem gerenciar permissões');
    }

    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  }, [isAdmin]);

  // Atualiza role de um usuário
  const updateUserRole = useCallback(async (userId, newRole) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem gerenciar roles');
    }

    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  }, [isAdmin]);

  // Cria nova role personalizada
  const createCustomRole = useCallback(async (roleData) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem criar roles');
    }

    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, role: { id: Date.now().toString(), ...roleData } };
  }, [isAdmin]);

  return {
    allPermissions,
    allRoles,
    updateUserPermissions,
    updateUserRole,
    createCustomRole,
    canManagePermissions: isAdmin
  };
}
