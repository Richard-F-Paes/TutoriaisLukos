import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        setShowMobileMenu(false);
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        setShowUserMenu(false);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

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

                {/* LOGO */}
                <Link to="/" className="nav-brand">
                    <div className="nav-brand-icon">
                        <img src="Logo512.png" alt="Logo" className="nav-logo-image" />
                    </div>
                    <span className="nav-brand-name">Tutoriais Lukos</span>
                </Link>

                {/* HAMBURGER MENU */}
                <button 
                    className={`nav-hamburger ${showMobileMenu ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* BARRA DE PESQUISA */}
                <div className="nav-search">
                    <form onSubmit={handleSearch}>
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            className="Search-text"
                            type="text" 
                            placeholder="Buscar" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>

                {/* MENU DO USUÁRIO */}
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

                                        {(user?.role === 'admin' || user?.role === 'super_admin') && (
                                            <Link 
                                                to="/admin" 
                                                className="user-action"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <i className="fas fa-cog"></i>
                                                Administração
                                            </Link>
                                        )}

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
                        <Link to="/login" className="auth-gear">
                            <i className="fas fa-cog"></i>
                        </Link>
                    )}
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            {showMobileMenu && (
                <div 
                    className={`nav-mobile-overlay ${showMobileMenu ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* MOBILE MENU */}
            <div className={`nav-mobile-menu ${showMobileMenu ? 'active' : ''}`}>
                <div className="nav-mobile-header">
                    <Link to="/" className="nav-mobile-brand" onClick={closeMobileMenu}>
                        <div className="nav-brand-icon">
                            <img src="Logo512.png" alt="Logo" className="nav-logo-image" />
                        </div>
                        <span className="nav-mobile-brand-name">Tutoriais Lukos</span>
                    </Link>
                    <button 
                        className="nav-mobile-close"
                        onClick={closeMobileMenu}
                        aria-label="Fechar menu"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* MOBILE SEARCH */}
                <div className="nav-mobile-search">
                    <form onSubmit={handleSearch}>
                        <i className="fas fa-search nav-mobile-search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Buscar tutoriais..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>

                {/* MOBILE NAVIGATION LINKS */}
                <nav className="nav-mobile-links">
                    <Link to="/" className="nav-mobile-link" onClick={closeMobileMenu}>
                        <i className="fas fa-home"></i>
                        Início
                    </Link>
                    <Link to="/tutoriais" className="nav-mobile-link" onClick={closeMobileMenu}>
                        <i className="fas fa-book"></i>
                        Tutoriais
                    </Link>
                    <Link to="/categorias" className="nav-mobile-link" onClick={closeMobileMenu}>
                        <i className="fas fa-folder"></i>
                        Categorias
                    </Link>
                    <Link to="/sobre" className="nav-mobile-link" onClick={closeMobileMenu}>
                        <i className="fas fa-info-circle"></i>
                        Sobre
                    </Link>
                </nav>

                {/* MOBILE USER SECTION */}
                {isAuthenticated ? (
                    <div className="nav-mobile-links" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '1rem' }}>
                        <div style={{ padding: '1rem', color: '#ffffff', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{user?.name}</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{user?.email}</div>
                        </div>
                        
                        <Link to="/profile" className="nav-mobile-link" onClick={closeMobileMenu}>
                            <i className="fas fa-user-cog"></i>
                            Meu Perfil
                        </Link>

                        {(user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'editor') && (
                            <Link to="/editor" className="nav-mobile-link" onClick={closeMobileMenu}>
                                <i className="fas fa-edit"></i>
                                Editor Visual
                            </Link>
                        )}

                        {(user?.role === 'admin' || user?.role === 'super_admin') && (
                            <Link to="/admin" className="nav-mobile-link" onClick={closeMobileMenu}>
                                <i className="fas fa-cog"></i>
                                Administração
                            </Link>
                        )}

                        <button 
                            className="nav-mobile-link"
                            onClick={handleLogout}
                            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', color: '#ff6b6b' }}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            Sair
                        </button>
                    </div>
                ) : (
                    <div className="nav-mobile-links" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '1rem' }}>
                        <Link to="/login" className="nav-mobile-link" onClick={closeMobileMenu}>
                            <i className="fas fa-sign-in-alt"></i>
                            Entrar
                        </Link>
                        <Link to="/register" className="nav-mobile-link" onClick={closeMobileMenu}>
                            <i className="fas fa-user-plus"></i>
                            Cadastrar
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
