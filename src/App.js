import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
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
import PaginaTutorial from "./pages/PaginaTutorial";






function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/categorias" element={<CategoriesPage />} />
              <Route path="/categoria/:id" element={<CategoryPage />} />
              <Route path="/tutoriais" element={<TutorialsPage />} />
              <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
              <Route path="/tutorial/:id/executar" element={<TutorialPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/busca" element={<SearchPage />} />
               <Route path="/pagina-tutorial" element={<PaginaTutorial />} />
           
              
              
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
              
              {/* Rotas administrativas (exemplo) */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <div className="page-container">
                      <h1>Painel Administrativo</h1>
                      <p>Esta página será implementada em breve.</p>
                      
                    </div>
                    
                  </ProtectedRoute>
                } 
              />
              
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
