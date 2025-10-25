import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // Efeito de rolagem
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lida com busca
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Fecha menu do usuário se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-4 md:py-6 shadow transition-all duration-300 
      ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'} 
      max-w-8xl rounded-full mx-auto mt-4`}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center justify-center gap-5 group hover:scale-105 transition-all duration-300">
        <img
          src="logo.png"
          alt="Logo Tutorial Lukos"
          className="w-10 h-10 group-hover:opacity-80 transition-all duration-300"
        />
        <span className="text-gray-900 font-bold text-lg bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-600 group-hover:to-purple-700 transition-all duration-500 ease-in-out">
          Tutorial Lukos
        </span>
      </Link>

      {/* MENU PRINCIPAL */}
      <nav
        id="menu"
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 text-gray-900 text-sm font-medium bg-white/70 backdrop-blur-lg transition-[width] duration-300
          ${menuOpen ? 'max-md:w-full max-md:h-full' : 'max-md:w-0 max-md:h-0'}
        `}
      >
        <Link
          to="/"
          className={`hover:text-indigo-600 ${location.pathname === '/' ? 'text-indigo-600 font-semibold' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Início
        </Link>
        <Link
          to="/tutoriais"
          className={`hover:text-indigo-600 ${location.pathname === '/tutoriais' ? 'text-indigo-600 font-semibold' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Tutoriais
        </Link>
        <Link
          to="/categorias"
          className={`hover:text-indigo-600 ${location.pathname === '/categorias' ? 'text-indigo-600 font-semibold' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Categorias
        </Link>
        <Link
          to="/sobre"
          className={`hover:text-indigo-600 ${location.pathname === '/sobre' ? 'text-indigo-600 font-semibold' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Sobre
        </Link>

        {/* Fechar menu mobile */}
        <button
          onClick={() => setMenuOpen(false)}
          className="md:hidden text-gray-700 absolute top-6 right-6"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Ações da direita */}
      <div className="flex items-center space-x-4">
        {/* 🔍 Campo de busca */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
          <i className="fas fa-search text-gray-500 mr-2 text-sm"></i>
          <input
          
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-sm text-gray-700 w-32"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* ☀️ Botão genérico */}
        <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
              stroke="#353535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 🔒 Autenticação / Usuário */}
        {isAuthenticated ? (
          <div className="relative user-menu">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
            >
              <i className="fas fa-user text-gray-700"></i>
              <span className="text-sm text-gray-700">{user?.name}</span>
              <i
                className={`fas fa-chevron-down transition-transform ${
                  showUserMenu ? 'rotate-180' : ''
                }`}
              ></i>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border">
                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Meu Perfil
                </Link>

                {(user?.role === 'admin' ||
                  user?.role === 'super_admin' ||
                  user?.role === 'editor') && (
                  <Link
                    to="/editor"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Editor Visual
                  </Link>
                )}

                {(user?.role === 'admin' || user?.role === 'super_admin') && (
                  <Link
                    to="/admin"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Administração
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
          >
            Entrar
          </Link>
        )}

        {/* ☰ Menu mobile */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
