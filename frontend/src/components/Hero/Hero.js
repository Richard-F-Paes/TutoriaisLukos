import React from 'react';
import './Hero.css';

const Hero = () => {
    // Função para rolar para uma seção específica
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = element.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Função para mostrar demonstração
    const showDemo = () => {
        console.log('Mostrando demonstração...');
        // Implementar lógica de demonstração
    };

    return (
        <section className="hero-section">
            {/* Background com gradiente animado */}
            <div className="hero-background"></div>
            
            {/* Conteúdo principal */}
            <div className="hero-content">
                {/* Badge de identificação */}
                <div className="hero-badge animate-pulse">
                    <i className="public\2.png"></i>
                    <span>Tutorial Lukos</span>
                </div>
                
                {/* Título principal */}
                <h1 className="hero-title">
                    Tutoriais Lukos
                </h1>
                
                {/* Descrição */}
                <p className="hero-description">
                    Tutoriais completos para PDV, retaguarda, faturamento e todas as funcionalidades do sistema Lukos
                </p>
                
                {/* Botões de ação */}
                <div className="hero-actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => scrollToSection('tutoriais')}
                    >
                        <i className="fas fa-book-open"></i>
                        Começar Agora
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={showDemo}
                    >
                        <i className="fas fa-play"></i>
                        Ver Demonstração
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
