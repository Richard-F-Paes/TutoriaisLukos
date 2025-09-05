import React from 'react';
import Button from '../Button/Button';
import './CTA.css';

const CTA = () => {
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

    return (
        <section className="cta-section">
            {/* Background da seção */}
            <div className="cta-background"></div>
            
            {/* Conteúdo da CTA */}
            <div className="cta-content">
                <div className="cta-icon">
                    <i className="C:\Desenvolvimento\src\components\CTA\2.png"></i>
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
