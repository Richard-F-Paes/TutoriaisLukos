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
            level: 'intermediario',
            duration: '45min',
            steps: '8 passos',
            students: '1.250 usuários',
            rating: '4.9',
            image: 'C:\Users\Suporte\Downloads\teste em react\src\components\Tutorials\retaguarda.png',
            icons: ['sistema', 'video']
        },
        {
            id: 'pdv-caixa',
            title: 'PDV Caixa',
            description: 'Domine o sistema PDV Caixa para vendas eficientes, controle de pagamentos e emissão de cupons fiscais',
            category: 'PDV',
            level: 'iniciante',
            duration: '35min',
            steps: '6 passos',
            students: '2.340 usuários',
            rating: '4.8',
            image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=500',
            icons: ['pdv', 'video']
        },
        {
            id: 'smart-pos',
            title: 'PDV Smart Pos',
            description: 'Configure e utilize o PDV Smart Pos para vendas modernas com interface touch e integração completa',
            category: 'PDV',
            level: 'intermediario',
            duration: '40min',
            steps: '7 passos',
            students: '1.890 usuários',
            rating: '4.9',
            image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=500',
            icons: ['pdv', 'video']
        },
        {
            id: 'pre-venda',
            title: 'Pré Venda',
            description: 'Aprenda a usar o sistema de pré-venda para orçamentos, pedidos e gestão de vendas externas',
            category: 'Vendas',
            level: 'iniciante',
            duration: '30min',
            steps: '5 passos',
            students: '3.210 usuários',
            rating: '4.7',
            image: '"retaguarda.png"',
            icons: ['vendas', 'video']
        }
    ];

    // Função para navegar para tutorial
    const handleTutorialClick = (tutorialId) => {
        console.log(`Navegando para tutorial: ${tutorialId}`);
        // Implementar navegação para tutorial específico
    };

    // Função para obter ícone do FontAwesome baseado no tipo
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
                        <i className="fas fa-desktop"></i>
                        <span>TutorialLukos</span>
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
                                        {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                                    </span>
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <span>{tutorial.rating}</span>
                                    </div>
                                </div>
                                
                                <h3 className="tutorial-title">{tutorial.title}</h3>
                                <p className="tutorial-description">{tutorial.description}</p>
                                
                                <div className="tutorial-footer">
                                    <span className="students">
                                        <i className="fas fa-user"></i>
                                        {tutorial.students}
                                    </span>
                                    <span className="start-link">
                                        Iniciar <i className="fas fa-arrow-right"></i>
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
