import React, { useState } from 'react';
import Button from '../Button/Button';
import './CTA.css';

const CTA = ({ variant = 'default' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Função para rolar para seção de tutoriais
    const scrollToTutorials = () => {
        const element = document.getElementById('tutoriais');
        if (element) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = element.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Função para buscar tutorial
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Aqui você pode implementar a busca
            console.log('Buscando tutorial:', searchTerm);
            // Exemplo: navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    // Renderização para variante de busca
    if (variant === 'search') {
        return (
            <div className="cta-container">
                <div className="cta-box">
                    <h2 className="cta-title">Lukos Tutoriais</h2>
                    <p className="cta-desc">Localize o tutorial</p>
                    
                    <form className="cta-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="cta-input"
                            placeholder="Nome do tutorial"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="cta-button">
                            Localizar
                        </button>
                    </form>

                    {/* SVG decorativo */}
                    <svg
                        viewBox="0 0 1024 1024"
                        className="cta-svg"
                        aria-hidden="true"
                    >
                        <circle
                            cx="512"
                            cy="512"
                            r="512"
                            fill="url(#gradient)"
                            fillOpacity="0.7"
                        />
                        <defs>
                            <radialGradient
                                id="gradient"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(512 512) rotate(90) scale(512)"
                            >
                                <stop stopColor="#7775D6" />
                                <stop offset="1" stopColor="#7ED321" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        );
    }

    // Renderização padrão
    return (
        <section className="cta-section">
            {/* Background da seção */}
            <div className="cta-background"></div>
            
            {/* Conteúdo da CTA */}
            <div className="cta-content">
                <div className="cta-icon">
                    <i className="fas fa-graduation-cap"></i>
                </div>
                
                <h2 className="cta-title">Tutoriais do sistema</h2>
                
                <p className="cta-description">
                    Junte-se a milhares de usuários que já otimizaram seus processos com nossos tutoriais especializados
                </p>
                
                <Button 
                    variant="cta" 
                    size="large"
                    onClick={scrollToTutorials}
                >
                    <i className="fas fa-desktop"></i>
                    Explorar Todos os Tutoriais
                </Button>
            </div>
        </section>
    );
};

export default CTA;
