import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    // Estado para controlar se a navbar está com efeito de scroll
    const [isScrolled, setIsScrolled] = useState(false);

    // Estado para armazenar o termo de busca digitado
    const [searchTerm, setSearchTerm] = useState('');

    // Estado para exibir/esconder o menu do usuário
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Hooks do React Router
    const navigate = useNavigate();   // usado para redirecionar páginas
    const location = useLocation();   // pega o caminho atual da URL

    // Contexto de autenticação (usuário logado, logout, etc.)
    const { user, logout, isAuthenticated } = useAuth();

    // 📌 Efeito: verifica se o usuário rolou a página
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 100); // ativa scrolled quando passa 100px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 📌 Função: lida com a busca
    const handleSearch = (e) => {
        e.preventDefault(); // evita recarregar a página
        if (searchTerm.trim()) {
            // redireciona para a rota de busca passando o termo
            navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    // 📌 Função: logout do usuário
    const handleLogout = () => {
        logout(); // dispara função de logout do contexto
        setShowUserMenu(false); // fecha o menu
        navigate('/'); // redireciona para home
    };

    // 📌 Efeito: fecha o menu do usuário quando clica fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            // se clicar fora do menu, ele fecha
            if (showUserMenu && !event.target.closest('.user-menu')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserMenu]);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">

                {/* LOGO */}
                <Link to="/" className="nav-brand">
                    <div className="nav-brand-icon">
                        <img src="Logo512.png" alt="Logo" className="nav-logo-image" />
                    </div>
                    <span className="nav-brand-name">Tutoriais Lukos</span>
                </Link>
                
                {/* MENU PRINCIPAL */}
                <div className="nav-menu">
                    <Link 
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Início
                    </Link>
                    <Link 
                        to="/categorias"
                        className={`nav-link ${location.pathname === '/Tutoriais' ? 'active' : ''}`}
                    >
                        Tutoriais
                    </Link>
                    <Link 
                        to="/tutoriais"
                        className={`nav-link ${location.pathname === '/Categorias' ? 'active' : ''}`}
                    >
                        Categoriais
                    </Link>
                    <Link 
                        to="/sobre"
                        className={`nav-link ${location.pathname === '/sobre' ? 'active' : ''}`}
                    >
                        Sobre
                    </Link>
                    <Link 
                        to="/paginatutorial"
                        className={`nav-link ${location.pathname === '/paginatutorias' ? 'active' : ''}`}
                    >
                        Página de Tutoriais
                    </Link>
                </div>
                
                {/* BARRA DE PESQUISA */}
                <div className="nav-search">
                    <form onSubmit={handleSearch}>
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            className="Search-text"
                            type="text" 
                            placeholder="Buscar tutoriais" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>

                {/* MENU DO USUÁRIO */}
                <div className="nav-user">
                    {isAuthenticated ? (
                        <div className="user-menu">
                            {/* Botão que abre/fecha o menu */}
                            <button 
                                className="user-button"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <div className="user-avatar">
                                    <i className="fas fa-user"></i>
                                </div>
                                <span className="user-name">{user?.name}</span>
                                <i className={`fas fa-chevron-down ${showUserMenu ? 'rotated' : ''}`}></i>
                            </button>
                            
                            {/* DROPDOWN DO USUÁRIO */}
                            {showUserMenu && (
                                <div className="user-dropdown">
                                    {/* Info básica do usuário */}
                                    <div className="user-info">
                                        <div className="user-avatar-large">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div className="user-details">
                                            <h4>{user?.name}</h4>
                                            <p>{user?.email}</p>
                                            <span className={`user-role user-role-${user?.role}`}>
                                                {user?.role}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Ações do usuário */}
                                    <div className="user-actions">
                                        <Link 
                                            to="/profile" 
                                            className="user-action"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <i className="fas fa-user-cog"></i>
                                            Meu Perfil
                                        </Link>
                                        
                                        {/* Apenas roles específicos veem o Editor Visual */}
                                        {(user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'editor') && (
                                            <Link 
                                                to="/editor" 
                                                className="user-action"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <i className="fas fa-edit"></i>
                                                Editor Visual
                                            </Link>
                                        )}
                                        
                                        {/* Apenas admin/super_admin veem Administração */}
                                        {user?.role === 'admin' || user?.role === 'super_admin' ? (
                                            <Link 
                                                to="/admin" 
                                                className="user-action"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <i className="fas fa-cog"></i>
                                                Administração
                                            </Link>
                                        ) : null}
                                        
                                        {/* Botão de logout */}
                                        <button 
                                            className="user-action logout"
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-sign-out-alt"></i>
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Se não autenticado, mostra engrenagem discreta
                        <Link to="/login" className="auth-gear">
                            <i className="fas fa-cog"></i>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
