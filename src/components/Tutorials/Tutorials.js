import React from 'react';
import './Tutorials.css';

const Tutorials = () => {
    // Dados dos tutoriais
    const tutorials = [
        {
            id: 'retaguarda',
            title: 'Sistema de Retaguarda',
            description: 'Aprenda a configurar e gerenciar o sistema de retaguarda completo para controle de estoque, produtos e relatórios',
            category: 'Sistema',
            level: '',
            duration: '45min',
            steps: '20 Tutoriais',
            image: 'retaguarda.png',
            icons: ['sistema', 'video'],
            footerIcon: 'logo.png'
        },
        {
            id: 'pdv-caixa',
            title: 'PDV Caixa',
            description: 'Domine o sistema PDV Caixa para vendas eficientes, controle de pagamentos e emissão de cupons fiscais',
            category: 'PDV',
            level: '',
            duration: '35min',
            steps: '20 Tutoriais',
            image: 'CaixaPDV.png',
            icons: ['pdv', 'video'],
            footerIcon: 'bombagasolina.png'
        },
        {
            id: 'smart-pos',
            title: 'PDV Smart Pos',
            description: 'Configure e utilize o PDV Smart Pos para vendas modernas com interface touch e integração completa',
            category: 'PDV',
            level: '',
            duration: '40min',
            steps: '20 Tutoriais',
            image: 'Smartpos.jpg',
            icons: ['pdv', 'video'],
            footerIcon: 'loja.png'
        },
        {
            id: 'pre-venda',
            title: 'Pré Venda',
            description: 'Aprenda a usar o sistema de pré-venda para orçamentos, pedidos e gestão de vendas externas',
            category: 'Vendas',
            level: '',
            duration: '30min',
            steps: '5 passos',
            image: 'retaguarda.png',
            icons: ['vendas', 'video'],
            footerIcon: 'loja.'
        }
    ];

    // Navegação
    const handleTutorialClick = (tutorialId) => {
        console.log(`Navegando para tutorial: ${tutorialId}`);
        // implementar navegação
    };

    // Ícones
    const getIconClass = (iconType) => {
        const iconMap = {
            'sistema': 'fas fa-desktop',
            'pdv': 'fas fa-credit-card',
            'vendas': 'fas fa-shopping-cart',
            'analise': 'fas fa-chart-bar',
            'fiscal': 'fas fa-file-invoice',
            'video': 'fas fa-video'
        };
        return iconMap[iconType] || 'fas fa-circle';
    };

    return (
        <section id="tutoriais" className="tutorials-section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <div className="section-header">
                    <div className="section-badge">
                        <img src="/logo.png" alt="Logo Tutorial Lukos" className="nav-logo" />
                        <span>Tutorial Lukos</span>
                    </div>
                    <h2 className="section-title">Tutoriais Especializados</h2>
                    <p className="section-description">
                        Guias completos para cada módulo do sistema Lukos
                    </p>
                </div>
                
                {/* Grid de tutoriais */}
                <div className="tutorials-grid">
                    {tutorials.map((tutorial) => (
                        <div 
                            key={tutorial.id}
                            className="tutorial-card animate-in"
                            onClick={() => handleTutorialClick(tutorial.id)}
                        >
                            {/* Imagem do tutorial */}
                            <div className="tutorial-image">
                                <img src={tutorial.image} alt={tutorial.title} />
                                <div className="tutorial-overlay"></div>
                                
                                {/* Badges e ícones */}
                                <div className="tutorial-badges">
                                    <span className="category-badge">{tutorial.category}</span>
                                    <div className="tutorial-icons">
                                        {tutorial.icons.map((iconType, index) => (
                                            <span key={index} className={`icon-badge ${iconType}`}>
                                                <i className={getIconClass(iconType)}></i>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Meta informações */}
                                <div className="tutorial-meta">
                                    <span className="meta-item">
                                        <i className="fas fa-clock"></i>
                                        {tutorial.duration}
                                    </span>
                                    <span className="meta-item">
                                        <i className="fas fa-book-open"></i>
                                        {tutorial.steps}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Conteúdo do tutorial */}
                            <div className="tutorial-content">
                                <div className="tutorial-header">
                                    <span className={`level-badge ${tutorial.level}`}>
                                        {tutorial.level ? tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1) : ''}
                                    </span>
                                    <div className="rating">
                                        <i className=""></i>
                                        <span>{tutorial.rating}</span>
                                    </div>
                                </div>
                                
                                <h3 className="tutorial-title">{tutorial.title}</h3>
                                <p className="tutorial-description">{tutorial.description}</p>
                                
                                <div className="tutorial-footer">
                                    <span className="">
                                        <i className=""></i> {tutorial.students}
                                    </span>
                                    <span className="footer-icon">
                                        <img src={tutorial.footerIcon} alt="Iniciar" className="footer-icon" />
                                        
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tutorials;
