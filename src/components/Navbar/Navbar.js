import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';



const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();

    // Efeito de scroll para mudar aparência da navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função para busca
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    // Função para logout
    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    // Fechar menu ao clicar fora
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
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Logo e marca */}
                <Link to="/" className="nav-brand">
                    <img src="logo.png" alt="Logo Tutorial Lukos" className="nav-logo" />
                    <span className="nav-title">Tutorial Lukos</span>
                </Link>
                
                
                {/* Menu de navegação */}
                <div className="nav-menu">
                    <Link 
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Início
                    </Link>
                    <Link 
                        to="/categorias"
                        className={`nav-link ${location.pathname === '/categorias' ? 'active' : ''}`}
                    >
                        Categorias
                    </Link>
                    <Link 
                        to="/tutoriais"
                        className={`nav-link ${location.pathname === '/tutoriais' ? 'active' : ''}`}
                    >
                        Tutoriais
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
                
                {/* Barra de pesquisa */}
                <div className="nav-search">
                    <form onSubmit={handleSearch}>
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Buscar tutoriais..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>

                {/* Menu do usuário */}
                <div className="nav-user">
                    {isAuthenticated ? (
                        <div className="user-menu">
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
                            
                            {showUserMenu && (
                                <div className="user-dropdown">
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
                                    
                                    <div className="user-actions">
                                        <Link 
                                            to="/profile" 
                                            className="user-action"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <i className="fas fa-user-cog"></i>
                                            Meu Perfil
                                        </Link>
                                        
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
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-ghost">
                                Entrar
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Criar conta
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
