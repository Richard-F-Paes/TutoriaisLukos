import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProviders } from './providers';
import Navbar from '../presentation/components/layout/Navbar/Navbar';
import Footer from '../presentation/components/layout/Footer/Footer';
import ProtectedRoute from '../presentation/components/layout/ProtectedRoute/ProtectedRoute';
import PageNavbar from '../presentation/components/layout/PageNavbar/PageNavbar';
import '../App.css';
import '../styles/design-system.css';
import '../styles/pages.css';

// Importar helper de rotas
import { isTutorialRoute, shouldShowCategoryNavbar, shouldShowPageNavbar } from '../shared/utils/routeUtils';

// Importar páginas públicas
import HomePage from '../presentation/pages/public/HomePage';
import CategoriesPage from '../presentation/pages/public/CategoriesPage';
import CategoryPage from '../presentation/pages/public/CategoryPage';
import TutorialsPage from '../presentation/pages/public/TutorialsPage';
import TutorialDetailPage from '../presentation/pages/public/TutorialDetailPage';
import TutorialPage from '../presentation/pages/public/TutorialPage';
import TutorialsHomePage from '../presentation/pages/public/TutorialsHomePage';
import Tutorials from '../presentation/pages/public/Tutorials';
import TutorialsUnified from '../presentation/pages/public/TutorialsUnified';
import CategoryTutorialsPage from '../presentation/pages/public/CategoryTutorialsPage';
import TreinamentosPage from '../presentation/pages/public/TreinamentosPage';
import AboutPage from '../presentation/pages/public/AboutPage';
import SearchPage from '../presentation/pages/public/SearchPage';
import RegisterPage from '../presentation/pages/public/RegisterPage';
import ProfilePage from '../presentation/pages/public/ProfilePage';
import PaginaTutorial from '../presentation/pages/public/PaginaTutorial';
import Dashboard from '../presentation/pages/public/Dashboard';
import PDV from '../presentation/pages/public/PDV';
import Prevenda from '../presentation/pages/public/Prevenda';
import FaturaWeb from '../presentation/pages/public/FaturaWeb';
import Homedesigner from '../presentation/pages/public/Homedesigner/Home';
import Lukospos from '../presentation/pages/public/Lukospos';
import Conveniencia from '../presentation/pages/public/Conveniencia';
import Pista from '../presentation/pages/public/Pista';
import GeradorSenha from '../presentation/pages/public/Dashboard/GeradorSenha';
import PrecoCombustivel from '../presentation/pages/public/Dashboard/PrecoCombustivel';
import CadastrosPage from '../presentation/pages/public/CadastrosPage';
import RetaguardaTutorialsPage from '../presentation/pages/public/RetaguardaTutorialsPage';
import ConvenienciaTutorialsPage from '../presentation/pages/public/ConvenienciaTutorialsPage';
import DashboardTutorialsPage from '../presentation/pages/public/DashboardTutorialsPage';
import PistaTutorialsPage from '../presentation/pages/public/PistaTutorialsPage';
import VideoTutorialsPage from '../presentation/pages/public/VideoTutorialsPage';
import VideoTutorialDetailPage from '../presentation/pages/public/VideoTutorialDetailPage';
import NovaPagina from '../presentation/pages/public/NovaPagina';
import IAPage from '../presentation/pages/public/IAPage';
import ServicosPage from '../presentation/pages/public/ServicosPage';
import BlogPage from '../presentation/pages/public/BlogPage';
import BlogPostDetailPage from '../presentation/pages/public/BlogPostDetailPage';
import BlogPostsPage from '../presentation/pages/public/BlogPostsPage';
import BlogPostPage from '../presentation/pages/public/BlogPostPage';
import AppsPage from '../presentation/pages/public/AppsPage';
import VerPage from '../presentation/pages/public/VerPage';
import ApresentacaoSistemasPage from '../presentation/pages/public/ApresentacaoSistemasPage';
import ERPPage from '../presentation/pages/public/ERPPage';

// Importar páginas administrativas
import EditorPage from '../presentation/pages/admin/EditorPage';
import AdminPage from '../presentation/pages/admin/AdminPage';

// Importar componentes
import GlobalSearch from '../presentation/components/GlobalSearch/GlobalSearch';
import RetaguardaTutorial from '../presentation/components/tutorial/RetaguardaTutorial/RetaguardaTutorial';
import Navbarcategoria from '../presentation/components/Navbarcategoria/Navbarcategoria';
import Lukospay from '../presentation/components/Lukospay/Lukospay';








function AppContent() {
  const location = useLocation();
  const isTutorial = isTutorialRoute(location.pathname);
  const showCategoryNavbar = shouldShowCategoryNavbar(location.pathname);
  const showPageNavbar = shouldShowPageNavbar(location.pathname);
  // Não mostrar PageNavbar na rota "/" (blog) pois ele está dentro do BlogPage
  const isBlogPage = location.pathname === '/' || location.pathname === '/blog';

  // Remover padding-top do body quando estiver na rota do blog
  useEffect(() => {
    if (isBlogPage) {
      document.body.classList.add('no-padding-top');
    } else {
      document.body.classList.remove('no-padding-top');
    }
    // Cleanup ao desmontar
    return () => {
      document.body.classList.remove('no-padding-top');
    };
  }, [isBlogPage]);

  return (
    <div className="App">
      {/* Renderizar Navbarcategoria apenas em rotas de tutoriais */}
      {showCategoryNavbar && <Navbarcategoria />}
      
      {/* Renderizar PageNavbar apenas em rotas principais (não tutoriais e não blog) */}
      {showPageNavbar && !isBlogPage && <PageNavbar />}
    
      <main>
        <Routes>
                {/* Rotas públicas principais */}
                <Route path="/" element={<BlogPage />} />
                <Route path="/blog" element={<BlogPostsPage />} />
                
                {/* Rotas dos Tutoriais Lukos */}
                <Route path="/tutoriais" element={<TutorialsUnified />} />
                <Route path="/tutoriais/treinamentos" element={<TreinamentosPage />} />
                <Route path="/video-tutoriais" element={<VideoTutorialsPage />} />
                <Route path="/video-tutorial/:id" element={<VideoTutorialDetailPage />} />
                <Route path="/categoria/:category" element={<CategoryTutorialsPage />} />
                <Route path="/tutorial/:tutorialId" element={<TutorialPage />} />
                
                {/* Rotas Hierárquicas */}
                <Route path="/cadastros" element={<CadastrosPage />} />
                
                {/* Rotas antigas (mantidas para compatibilidade) */}
                <Route path="/Retaguarda" element={<CategoriesPage />} />
                <Route path="/categoria/:id" element={<CategoryPage />} />
                <Route path="/Fatura Web" element={<TutorialsPage />} />
                <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
                <Route path="/tutorial/:id/executar" element={<TutorialPage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/busca" element={<SearchPage />} />
                <Route path="/paginatutorial" element={<PaginaTutorial />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/PDV" element={<PDV />} />
                <Route path="/prevenda" element={<Prevenda />} />
                <Route path="/FaturaWeb" element={<FaturaWeb />} />
                <Route path="/lukos-pay" element={<Lukospos />} />
                <Route path="/Conveniencia" element={<Conveniencia />} />
                <Route path="/pista" element={<Pista />} />

                {/* Rotas Dashboard */}
                <Route path="/pages/GeradorSenha" element={<GeradorSenha />} />
                <Route path="/pages/PrecoCombustivel" element={<PrecoCombustivel />} />                    
                
                {/* Rotas de Tutoriais por Seção */}
                <Route path="/retaguarda-tutoriais" element={<RetaguardaTutorialsPage />} />
                <Route path="/conveniencia-tutoriais" element={<ConvenienciaTutorialsPage />} />
                <Route path="/dashboard-tutoriais" element={<DashboardTutorialsPage />} />
                <Route path="/pista-tutoriais" element={<PistaTutorialsPage />} />
                
                {/* Nova Página */}
                <Route path="/nova-pagina" element={<NovaPagina />} />
                
                {/* Página de IA */}
                <Route path="/ia" element={<IAPage />} />
                
                {/* Página de Serviços */}
                <Route path="/servicos" element={<ServicosPage />} />
                
                {/* Página do Blog */}
                <Route path="/blog/:id" element={<BlogPostDetailPage />} />
                <Route path="/blog-posts" element={<BlogPostsPage />} />
                <Route path="/artigo/:id" element={<BlogPostPage />} />
                
                {/* Página de Aplicativos */}
                <Route path="/apps" element={<AppsPage />} />
                
                {/* Página de Visualização */}
                <Route path="/ver" element={<VerPage />} />
                
                {/* Página de Apresentação dos Sistemas */}
                <Route path="/apresentacao-sistemas" element={<ApresentacaoSistemasPage />} />
                <Route path="/sistemas" element={<ApresentacaoSistemasPage />} />
                <Route path="/erp" element={<ERPPage />} />
                
                {/* Rotas administrativas */}
                <Route path="/admin" element={<AdminPage />} />
                
                {/* Rotas de autenticação */}
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Rotas protegidas */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Editor Visual */}
                <Route 
                  path="/editor" 
                  element={
                    <ProtectedRoute requiredPermission="manage_content">
                      <EditorPage />
                    </ProtectedRoute>
                  } 
                />
                
              </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProviders>
      <Router>
        <AppContent />
      </Router>
    </AppProviders>
  );
}

export default App;
