import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TutorialProvider } from './contexts/TutorialContext';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute/ProtectedRoute';
import './App.css';
import './styles/design-system.css';
import './styles/pages.css';


// Importar páginas
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetailPage from './pages/TutorialDetailPage';
import TutorialPage from './pages/TutorialPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EditorPage from './pages/EditorPage';
import AdminPage from './pages/AdminPage';
import PaginaTutorial from "./pages/PaginaTutorial";
import RetaguardaTutorial from './components/tutorial/RetaguardaTutorial/RetaguardaTutorial';
import Dashboard from './pages/Dashboard';
import PDV from './pages/PDV';
import Prevenda from './pages/Prevenda';
import FaturaWeb from './pages/FaturaWeb';
import Home from './pages/Homedesigner/Home';
import Homedesigner from './pages/Homedesigner/Home';
import Navbarcategoria from './components/Navbarcategoria/Navbarcategoria';







function App() {
  return (
    <AuthProvider>
      <TutorialProvider>
        <Router>
          <div className="App">
            
            <Navbar />
          
            <main>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/Retaguarda" element={<CategoriesPage />} />
                <Route path="/categoria/:id" element={<CategoryPage />} />
                <Route path="/Fatura Web" element={<TutorialsPage />} />
                <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
                <Route path="/tutorial/:id/executar" element={<TutorialPage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/busca" element={<SearchPage />} />
                <Route path="/paginatutorial" element={<PaginaTutorial />} />
                <Route path="/Retaguarda" element={<RetaguardaTutorial />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/PDV" element={<PDV />} />
                <Route path="/prevenda" element={<Prevenda />} />
                <Route path="/FaturaWeb" element={<FaturaWeb />} />
                
                
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
      </TutorialProvider>
    </AuthProvider>
  );
}

export default App;
