import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProviders } from './providers';
import Navbar from '../presentation/components/layout/Navbar/Navbar';
import Footer from '../presentation/components/layout/Footer/Footer';
import ProtectedRoute from '../presentation/components/layout/ProtectedRoute/ProtectedRoute';
import '../App.css';
import '../styles/design-system.css';
import '../styles/pages.css';


// Importar páginas públicas
import HomePage from '../presentation/pages/public/HomePage';
import CategoriesPage from '../presentation/pages/public/CategoriesPage';
import CategoryPage from '../presentation/pages/public/CategoryPage';
import TutorialsPage from '../presentation/pages/public/TutorialsPage';
import TutorialDetailPage from '../presentation/pages/public/TutorialDetailPage';
import TutorialPage from '../presentation/pages/public/TutorialPage';
import TutorialsHomePage from '../presentation/pages/public/TutorialsHomePage';
import Tutorials from '../presentation/pages/public/Tutorials';
import CategoryTutorialsPage from '../presentation/pages/public/CategoryTutorialsPage';
import AboutPage from '../presentation/pages/public/AboutPage';
import SearchPage from '../presentation/pages/public/SearchPage';
import LoginPage from '../presentation/pages/public/LoginPage';
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

// Importar páginas administrativas
import EditorPage from '../presentation/pages/admin/EditorPage';
import AdminPage from '../presentation/pages/admin/AdminPage';

// Importar componentes
import GlobalSearch from '../presentation/components/GlobalSearch/GlobalSearch';
import RetaguardaTutorial from '../presentation/components/tutorial/RetaguardaTutorial/RetaguardaTutorial';
import Navbarcategoria from '../presentation/components/Navbarcategoria/Navbarcategoria';
import Lukospay from '../presentation/components/Lukospay/Lukospay';








function App() {
  return (
    <AppProviders>
      <Router>
        <div className="App">
          
          <Navbar />
        
          <main>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/video-tutoriais" element={<VideoTutorialsPage />} />
                <Route path="/video-tutorial/:id" element={<VideoTutorialDetailPage />} />
                
                {/* Rotas dos Tutoriais Lukos */}
                <Route path="/tutoriais" element={<Tutorials />} />
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
                
                {/* Rotas administrativas */}
                <Route path="/admin" element={<AdminPage />} />
                
                {/* Rotas de autenticação */}
                <Route path="/login" element={<LoginPage />} />
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
        </Router>
    </AppProviders>
  );
}

export default App;
