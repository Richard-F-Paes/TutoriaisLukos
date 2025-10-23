import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Package, Target, Smartphone, Shirt, Home, Car, Gamepad2, Book, Heart, Utensils, Dumbbell, Baby, Briefcase, Palette } from 'lucide-react';

// Você pode mover a definição do ItemCard para um arquivo separado (ItemCard.js) 
// se quiser manter o código do componente principal mais limpo.
const ItemCard = ({ 
    item, 
    linkTexto, 
    linkRota, 
    showExtraButton,
    resultUnit
}) => {
    // Desestruturação de item para obter os dados específicos
    const { id, title, category, productCount, icon: IconComponent, color, description, hasNewProducts } = item;

    return (
        <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative">
                {/* Bloco Colorido */}
                <div className={`h-48 bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <IconComponent className="h-20 w-20 text-white" />
                </div>
                
                {/* Badge Novos Produtos */}
                {hasNewProducts && (
                    <div className="absolute top-2 left-2">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Novos {resultUnit}
                        </span>
                    </div>
                )}
                
                {/* Contagem de Produtos/Itens */}
                <div className="absolute top-2 right-2">
                    <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {productCount} {resultUnit}{productCount !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {productCount} itens
                    </div>
                    <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        {category}
                    </div>
                </div>

                <div className="flex space-x-2">
                    {/* Link Principal Personalizado via Props */}
                    <Link
                        to={`${linkRota}/${id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        {linkTexto}
                    </Link>
                    
                    {/* Botão Opcional Personalizado via Props */}
                    {showExtraButton && (
                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                            <Package className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


// Componente Principal Agora Aceitando Props
const FilterGridPage = ({
    // 🚨 PROPS DE DADOS (O que muda entre as páginas)
    data, 
    filterableCategories,
    
    // 🚨 PROPS DE TEXTO E CONFIGURAÇÃO (O que permite o ajuste visual)
    headerTitle = 'Gerenciamento de Itens',
    headerSubtitle = 'Organize e gerencie todos os itens do sistema.',
    searchPlaceholder = 'Buscar itens...',
    resultUnit = 'item', // Ex: 'categoria', 'tutorial', 'produto'
    linkButtonText = 'Acessar',
    linkButtonRoute = '/detalhes',
    showExtraButton = true,
}) => {
    
    // Hooks para o filtro e busca permanecem inalterados
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchTerm, setSearchTerm] = useState('');

    // A lógica de filtro agora usa o 'data' passado via prop
    const filteredItems = useMemo(() => {
        return data.filter(item => {
            const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [data, selectedCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header - Usa a prop 'headerTitle' e 'headerSubtitle' */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{headerTitle}</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{headerSubtitle}</p>
                </div>

                {/* Tutorial em Destaque (Mantido fixo) */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 mb-8 text-white">
                    {/* ... (conteúdo do tutorial, omitido para brevidade) ... */}
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="mb-6 lg:mb-0">
                          <h2 className="text-2xl font-bold mb-2">📚 Tutorial de Cadastro</h2>
                          <p className="text-lg opacity-90 mb-4">
                            Aprenda o passo a passo completo para cadastrar produtos no sistema
                          </p>
                          <div className="flex items-center space-x-4 text-sm opacity-80">
                            <span>• 6 etapas detalhadas</span>
                            <span>• Validações automáticas</span>
                            <span>• Dicas profissionais</span>
                          </div>
                        </div>
                        <Link
                          to="/aula-interativa"
                          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <BookOpen className="h-5 w-5 mr-2" />
                          Iniciar Tutorial
                        </Link>
                    </div>
                </div>

                {/* Search and Filters - Usa a prop 'searchPlaceholder' e 'filterableCategories' */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-400 h-5 w-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {filterableCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count - Usa a prop 'resultUnit' */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Mostrando {filteredItems.length} {resultUnit}{filteredItems.length !== 1 ? 's' : ''}
                        {selectedCategory !== 'Todas' && ` na categoria "${selectedCategory}"`}
                    </p>
                </div>

                {/* Grid - Renderiza ItemCard e passa props de customização */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <ItemCard 
                            key={item.id} 
                            item={item} 
                            linkTexto={linkButtonText}
                            linkRota={linkButtonRoute}
                            showExtraButton={showExtraButton}
                            resultUnit={resultUnit}
                        />
                    ))}
                </div>

                {/* No Results - Usa a prop 'resultUnit' */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Nenhum {resultUnit} encontrado
                        </h3>
                        <p className="text-gray-600">
                            Tente ajustar os filtros ou termos de busca
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterGridPage;