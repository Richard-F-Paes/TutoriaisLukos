import React, { useState } from 'react';
import { useCategoriesHierarchical } from '../../../hooks/useCategories.js';
import ExpandableCategoryCard from '../ExpandableCategoryCard/ExpandableCategoryCard.jsx';
import './Categories.css';

const Categories = () => {
    const { data: categoriesData, isLoading } = useCategoriesHierarchical();
    const [expandedCategories, setExpandedCategories] = useState(new Set());
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = categoriesData || [];

    // Função para contar tutoriais (mock - deve ser implementada com dados reais)
    const getTutorialCount = (category) => {
        // Esta função deve buscar a contagem real de tutoriais
        // Por enquanto retorna um valor mockado baseado no nome
        return category.children ? category.children.length * 5 : 10;
    };

    // Função para toggle de expansão
    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    // Função para selecionar categoria
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const slug = category.slug || category.Slug || category.id;
        window.location.href = `/tutoriais?categoria=${slug}`;
    };

    if (isLoading) {
        return (
            <section id="categorias" className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Módulos do Sistema</h2>
                        <p className="section-description">
                            Carregando categorias...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

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
                
                {/* Lista de categorias expansíveis */}
                {categories.length > 0 ? (
                    <div className="categories-expandable-list">
                        {categories.map((category) => (
                            <ExpandableCategoryCard
                                key={category.id}
                                category={category}
                                isExpanded={expandedCategories.has(category.id)}
                                onToggle={toggleCategory}
                                onSelect={handleCategorySelect}
                                isSelected={selectedCategory?.id === category.id}
                                getTutorialCount={getTutorialCount}
                                expandedCategories={expandedCategories}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="categories-grid">
                        <p>Nenhuma categoria disponível.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;
