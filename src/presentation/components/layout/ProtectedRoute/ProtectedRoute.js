import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import Loading from '../../ui/Loading/Loading';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermission = null,
  fallback = '/login' 
}) => {
  const { user, loading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <Loading size="large" text="Verificando permissões..." />
      </div>
    );
  }

  // Se não está autenticado, redirecionar para login
  if (!user) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // Se requer role específico
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h1>Acesso Negado</h1>
          <p>Você não tem permissão para acessar esta página.</p>
          <p>Role necessário: <strong>{requiredRole}</strong></p>
          <p>Seu role atual: <strong>{user.role}</strong></p>
        </div>
      </div>
    );
  }

  // Se requer permissão específica
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h1>Acesso Negado</h1>
          <p>Você não tem permissão para acessar esta página.</p>
          <p>Permissão necessária: <strong>{requiredPermission}</strong></p>
        </div>
      </div>
    );
  }

  // Se passou em todas as verificações, renderizar o componente
  return children;
};

export default ProtectedRoute;
