// GestaoSubmodulos.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Search, Filter, Target, Package, DollarSign, FileStack, ClipboardList, PackagePlus,
    // Ícones extras para os sub-módulos
    Layers, TrendingUp, Receipt, Truck, CornerDownRight
} from 'lucide-react';

// Dados dos sub-módulos (você pode colocar isso em um arquivo de dados separado depois)
const SUB_MODULOS_DATA = [
    // Sub-módulos para 'Financeiro' (ID 4)
    { id: 101, parentId: 4, title: 'Contas a Pagar', category: 'Financeiro', count: 45, icon: DollarSign, color: 'from-red-500 to-red-600', description: 'Registro e controle de obrigações financeiras.', link: '/financeiro/contas-a-pagar' },
    { id: 102, parentId: 4, title: 'Contas a Receber', category: 'Financeiro', count: 62, icon: Receipt, color: 'from-green-500 to-green-600', description: 'Acompanhamento de pagamentos de clientes e faturamento.', link: '/financeiro/contas-a-receber' },
    { id: 103, parentId: 4, title: 'Fluxo de Caixa', category: 'Financeiro', count: 15, icon: TrendingUp, color: 'from-yellow-500 to-yellow-600', description: 'Visualização da movimentação financeira em tempo real.', link: '/financeiro/fluxo-de-caixa' },
    
    // Sub-módulos para 'Estoque' (ID 5)
    { id: 201, parentId: 5, title: 'Inventário', category: 'Estoque', count: 18, icon: ClipboardList, color: 'from-purple-500 to-purple-600', description: 'Contagem física e conferência de itens no armazém.', link: '/estoque/inventario' },
    { id: 202, parentId: 5, title: 'Entrada de Produtos', category: 'Estoque', count: 30, icon: Truck, color: 'from-indigo-500 to-indigo-600', description: 'Registro de recebimento de mercadorias e fornecedores.', link: '/estoque/entrada' },

    // Sub-módulos para 'Cadastros' (ID 1)
    { id: 301, parentId: 1, title: 'Clientes', category: 'Cadastros', count: 500, icon: Users, color: 'from-cyan-500 to-cyan-600', description: 'Gerencie o banco de dados de clientes.', link: '/cadastros/clientes' },
    { id: 302, parentId: 1, title: 'Fornecedores', category: 'Cadastros', count: 80, icon: Truck, color: 'from-teal-500 to-teal-600', description: 'Gerencie o banco de dados de fornecedores.', link: '/cadastros/fornecedores' },
];

// Dados da primeira tela (para buscar o nome)
// *** IMPORTANTE: Você precisará exportar e importar o categoryData da tela principal aqui.
// Por enquanto, vamos simular a busca pelo nome do módulo
const getCategoryTitle = (id) => {
    // Simulando a busca dos dados originais
    const titles = { 1: 'Cadastros', 4: 'Financeiro', 5: 'Estoque' };
    return titles[id] || 'Módulo de Gestão';
}

const GestaoSubmodulos = () => {
    // 1. Captura o ID da URL
    const { moduleId } = useParams(); 
    const parentId = parseInt(moduleId);

    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchTerm, setSearchTerm] = useState('');

    const categoryTitle = getCategoryTitle(parentId);
    
    // 2. Filtra os sub-módulos
    const filteredData = SUB_MODULOS_DATA.filter(item => {
        const matchesParent = item.parentId === parentId;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Nesta tela não usaremos o filtro de categoria, apenas a busca e o filtro por Parent ID
        return matchesParent && matchesSearch;
    });

    const categories = ['Todas', 'Submódulos']; // Simplificando os filtros nesta tela

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Dinâmico */}
                <div className="text-left mb-12">
                    <Link to="/" className="text-blue-600 flex items-center mb-2 hover:underline">
                        <CornerDownRight className="h-4 w-4 transform rotate-180 mr-1" />
                        Voltar para Categorias
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Gerenciamento do Módulo: {categoryTitle}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-4xl">
                        Acesse as ferramentas e funções específicas de {categoryTitle}.
                    </p>
                </div>

                {/* Search e Resultado */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder={`Buscar ferramentas em ${categoryTitle}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid de Sub-Módulos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredData.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="relative">
                                    <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                        <IconComponent className="h-20 w-20 text-white" />
                                    </div>
                                    
                                    <div className="absolute top-2 right-2">
                                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            {item.count} processos
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {item.description}
                                    </p>
                                    
                                    <div className="flex space-x-2">
                                        <Link
                                            // Link final que leva à função específica (Contas a Pagar, etc.)
                                            to={item.link} 
                                            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Acessar
                                        </Link>
                                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                            <Package className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default GestaoSubmodulos;