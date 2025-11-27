/**
 * Helper para identificar rotas relacionadas a tutoriais
 * @param {string} pathname - O pathname da rota atual
 * @returns {boolean} - true se a rota é relacionada a tutoriais
 */
export function isTutorialRoute(pathname) {
  // Normalizar o pathname removendo barras finais
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  
  // Rotas exatas de tutoriais
  const exactTutorialRoutes = [
    '/tutoriais',
    '/retaguarda-tutoriais',
    '/conveniencia-tutoriais',
    '/dashboard-tutoriais',
    '/pista-tutoriais',
    '/video-tutoriais',
    '/PDV',
    '/Dashboard',
    '/prevenda',
    '/FaturaWeb',
    '/lukos-pay',
    '/Conveniencia',
    '/pista',
    '/paginatutorial',
    '/cadastros',
    '/Retaguarda',
    '/Fatura Web'
  ];
  
  // Verificar rotas exatas
  if (exactTutorialRoutes.includes(normalizedPath)) {
    return true;
  }
  
  // Padrões de rotas de tutoriais
  const tutorialPatterns = [
    /^\/tutoriais\//,           // /tutoriais/*
    /^\/tutorial\//,            // /tutorial/*
    /^\/categoria\//,           // /categoria/*
    /^\/video-tutorial\//,       // /video-tutorial/*
    /^\/tutorial\/.*\/executar/, // /tutorial/:id/executar
  ];
  
  // Verificar padrões
  for (const pattern of tutorialPatterns) {
    if (pattern.test(normalizedPath)) {
      return true;
    }
  }
  
  // Rotas de busca e autenticação quando acessadas de dentro de tutoriais
  // (isso será tratado no componente baseado no contexto)
  // Por enquanto, não incluímos /busca, /login, /register aqui
  // pois eles podem ser acessados de qualquer lugar
  
  return false;
}

/**
 * Verifica se uma rota deve mostrar a Navbarcategoria
 * @param {string} pathname - O pathname da rota atual
 * @returns {boolean} - true se deve mostrar Navbarcategoria
 */
export function shouldShowCategoryNavbar(pathname) {
  return isTutorialRoute(pathname);
}

/**
 * Verifica se uma rota deve mostrar a PageNavbar
 * @param {string} pathname - O pathname da rota atual
 * @returns {boolean} - true se deve mostrar PageNavbar
 */
export function shouldShowPageNavbar(pathname) {
  return !isTutorialRoute(pathname);
}

