// Providers da Aplicação
// Centraliza todos os providers React

import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { TutorialProvider } from '../contexts/TutorialContext';
import { TutorialModalProvider } from '../contexts/TutorialModalContext';
import { TrainingModalProvider } from '../contexts/TrainingModalContext';
import { EditorModalProvider } from '../contexts/EditorModalContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

// Configurar React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
      // Configuração padrão para auto-refresh
      // refetchInterval será configurado individualmente em cada hook
      refetchIntervalInBackground: false, // Pausar polling quando aba inativa
    },
  },
});

// Componente de erro fallback
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Algo deu errado</h2>
      <pre style={{ color: 'red', margin: '1rem 0' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  );
}

/**
 * Providers da aplicação
 * Envolve a aplicação com todos os providers necessários
 */
export function AppProviders({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TutorialProvider>
              <TutorialModalProvider>
                <TrainingModalProvider>
                  <EditorModalProvider>
                    {children}
                  </EditorModalProvider>
                </TrainingModalProvider>
              </TutorialModalProvider>
            </TutorialProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default AppProviders;


