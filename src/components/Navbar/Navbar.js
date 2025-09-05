import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Efeito de scroll para mudar aparência da navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função para navegação
    const handleNavigation = (destination) => {
        console.log(`Navegando para: ${destination}`);
        // Aqui você pode implementar a navegação real
    };

    // Função para busca
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Buscando por:', searchTerm);
        // Implementar lógica de busca
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Logo e marca */}
                <div className="nav-brand" onClick={() => handleNavigation('home')}>
                    <img src="/logo.png" alt="Logo" className="nav-logo" />
                    <span className="nav-title">Tutorial lukos</span>
                </div>
                
                {/* Menu de navegação */}
                <div className="nav-menu">
                    <a 
                        className="nav-link active" 
                        onClick={() => handleNavigation('home')}
                    >
                        Início
                    </a>
                    <a 
                        className="nav-link" 
                        onClick={() => handleNavigation('categorias')}
                    >
                        Categorias
                    </a>
                    <a 
                        className="nav-link" 
                        onClick={() => handleNavigation('tutoriais')}
                    >
                        Tutoriais
                    </a>
                    <a 
                        className="nav-link" 
                        onClick={() => handleNavigation('sobre')}
                    >
                        Sobre
                    </a>
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
            </div>
        </nav>
    );
};

export default Navbar;
