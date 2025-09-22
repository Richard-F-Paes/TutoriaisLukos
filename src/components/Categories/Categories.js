import React from 'react';
import './Categories.css';

const Categories = () => {
    // Dados das categorias
    const categories = [
        {
            id: 'sistema',
            title: 'Sistema De Retaguarda',
            count: '45 tutoriais',
            icon: '',
            description: 'Configurações gerais e administração'
        },
        {
            id: 'Pista',
            title: 'PDV Caixa',
            count: '32 tutoriais',
            icon: '',
            description: 'Ponto de venda e operações'
        },
         {
            id: 'Loja',
            title: 'PDV Loja',
            count: '32 tutoriais',
            icon: '',
            description: 'Ponto de venda e operações'
        },
        {
            id: 'Smart',
            title: 'Lukos Pay',
            count: '28 tutoriais',
            icon: '',
            description: 'Gestão de vendas e clientes'
        },
        {
            id: 'Pre',
            title: 'Pré Venda',
            count: '19 tutoriais',
            icon: '',
            description: 'Relatórios e análises'
        },
        {
            id: 'Dashboard',
            title: 'Dashboard',
            count: '15 tutoriais',
            icon: '',
            description: 'Documentos fiscais e impostos'
        }
         
    ];

    // Função para navegar para categoria
    const handleCategoryClick = (categoryId) => {
        console.log(`Navegando para categoria: ${categoryId}`);
        // Implementar navegação para categoria específica
    };

    return (
        <section id="categorias" className="categories-section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <div className="section-header">
                    <h2 className="section-title">Módulos do Sistema</h2>
                    <p className="section-description">
                        Aprenda cada módulo do Lukos com tutoriais especializados
                    </p>
                </div>
                
                {/* Grid de categorias */}
                <div className="categories-grid">
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            className={`category-card ${category.id} animate-in`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div className="category-icon">
                                {category.icon}
                            </div>
                            <div className="category-content">
                                <h3 className="category-title">{category.title}</h3>
                                <p className="category-count">{category.count}</p>
                                <p className="category-description">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
