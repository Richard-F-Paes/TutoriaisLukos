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
import ScrollToHashElement from '../presentation/components/layout/ScrollToHashElement';

// Importar helper de rotas
import { isTutorialRoute, shouldShowCategoryNavbar, shouldShowPageNavbar } from '../shared/utils/routeUtils';

// Importar páginas públicas
import HomePage from '../presentation/pages/public/HomePage';
import CategoiresPage from '../presentation/pages/public/CategoriesPage';
import TutorialsUnified from '../presentation/pages/public/TutorialsUnified';
import CategoryTutorialsPage from '../presentation/pages/public/CategoryTutorialsPage';
import TreinamentosPage from '../presentation/pages/public/TreinamentosPage';
import RegisterPage from '../presentation/pages/public/RegisterPage';
import ProfilePage from '../presentation/pages/public/ProfilePage';
import GeradorSenha from '../presentation/pages/public/Dashboard/GeradorSenha';
import PrecoCombustivel from '../presentation/pages/public/Dashboard/PrecoCombustivel';
import CadastrosPage from '../presentation/pages/public/CadastrosPage';
import RetaguardaTutorialsPage from '../presentation/pages/public/RetaguardaTutorialsPage';
import ConvenienciaTutorialsPage from '../presentation/pages/public/ConvenienciaTutorialsPage';
import DashboardTutorialsPage from '../presentation/pages/public/DashboardTutorialsPage';
import PistaTutorialsPage from '../presentation/pages/public/PistaTutorialsPage';
import VideoTutorialsPage from '../presentation/pages/public/VideoTutorialsPage';
import VideoTutorialDetailPage from '../presentation/pages/public/VideoTutorialDetailPage';
import TutorialViewPage from '../presentation/pages/public/TutorialViewPage';
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
import SobreNos from '../presentation/pages/public/SobreNos';
import ConciliacaoPage from '../presentation/pages/public/ConciliacaoPage';
import FullcheckPage from '../presentation/pages/public/FullcheckPage';
import FidelidadePage from '../presentation/pages/public/FidelidadePage';



// Importar páginas administrativas
import EditorPage from '../presentation/pages/admin/EditorPage';
import AdminPage from '../presentation/pages/admin/AdminPage';
import TutorialEditPage from '../presentation/pages/admin/TutorialEditPage';

// Importar componentes
import GlobalSearch from '../presentation/components/GlobalSearch/GlobalSearch';
import Navbarcategoria from '../presentation/components/Navbarcategoria/Navbarcategoria';
import TutorialModal from '../presentation/components/TutorialModal/TutorialModal';
import TrainingModal from '../presentation/components/TrainingModal/TrainingModal';
import EditorModal from '../presentation/components/EditorModal/EditorModal';

function AppContent() {
  const location = useLocation();
  const isTutorial = isTutorialRoute(location.pathname);
  const showCategoryNavbar = shouldShowCategoryNavbar(location.pathname);
  const showPageNavbar = shouldShowPageNavbar(location.pathname);
  const isBlogPage = location.pathname === '/' || location.pathname === '/blog' || location.pathname === '/sobre-nos' || location.pathname === '/conciliacao' || location.pathname === '/fullcheck' || location.pathname === '/fidelidade' || location.pathname === '/servicos';



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
      <ScrollToHashElement />
      {/* Renderizar Navbarcategoria apenas em rotas de tutoriais */}
      {showCategoryNavbar && <Navbarcategoria />}

      {/* Renderizar PageNavbar em rotas principais (não tutoriais) */}
      {showPageNavbar && <PageNavbar transparent={isBlogPage} />}

      <main>
        <Routes>
          {/* Rotas públicas principais */}
          <Route path="/" element={<BlogPage />} />
          <Route path="/blog" element={<BlogPostsPage />} />
          <Route path="/sobre-nos" element={<SobreNos />} />

          {/* Rotas dos Tutoriais Lukos */}
          <Route path="/tutoriais" element={<TutorialsUnified />} />
          <Route path="/tutoriais/:slug" element={<TutorialViewPage />} />
          <Route path="/tutoriais/treinamentos" element={<TreinamentosPage />} />
          <Route path="/video-tutoriais" element={<VideoTutorialsPage />} />
          <Route path="/video-tutorial/:id" element={<VideoTutorialDetailPage />} />
          <Route path="/categoria/:category" element={<CategoryTutorialsPage />} />

          {/* Rotas Hierárquicas */}
          <Route path="/cadastros" element={<CadastrosPage />} />

          {/* Rotas Dashboard */}
          <Route path="/pages/GeradorSenha" element={<GeradorSenha />} />
          <Route path="/pages/PrecoCombustivel" element={<PrecoCombustivel />} />

          {/* Rotas de Tutoriais por Seção - Redirecionadas para filtros de URL */}
          <Route
            path="/retaguarda-tutoriais"
            element={<Navigate to="/tutoriais?categoria=retaguarda" replace />}
          />
          <Route
            path="/conveniencia-tutoriais"
            element={<Navigate to="/tutoriais?categoria=conveniencia" replace />}
          />
          <Route
            path="/dashboard-tutoriais"
            element={<Navigate to="/tutoriais?categoria=dashboard" replace />}
          />
          <Route
            path="/pista-tutoriais"
            element={<Navigate to="/tutoriais?categoria=pista" replace />}
          />

          {/* Nova Página */}
          <Route path="/nova-pagina" element={<NovaPagina />} />
          <Route path="/conciliacao" element={<ConciliacaoPage />} />
          <Route path="/fullcheck" element={<FullcheckPage />} />
          <Route path="/fidelidade" element={<FidelidadePage />} />



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
          <Route
            path="/admin/tutoriais/novo"
            element={
              <ProtectedRoute requiredPermission="create_tutorial">
                <TutorialEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tutoriais/:id/editar"
            element={
              <ProtectedRoute requiredPermission="edit_tutorial">
                <TutorialEditPage />
              </ProtectedRoute>
            }
          />

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
      <TutorialModal />
      <TrainingModal />
      <EditorModal />
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
