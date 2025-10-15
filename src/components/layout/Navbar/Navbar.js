import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);

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
        navigate('/');
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
        </nav>
    );
};

export default Navbar;
