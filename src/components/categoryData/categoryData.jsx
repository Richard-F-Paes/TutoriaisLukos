// Exemplo em outro arquivo, onde você o usa, como App.js ou sua rota:

import FilterGridPage from './FilterGridPage'; 
import { Smartphone, Shirt, Home, /* ... outros ícones */ } from 'lucide-react';

const DADOS_CATEGORIAS_ORIGINAIS = [
    // Seu array 'categoryData' original, agora fora do componente:
    { id: 1, title: 'Eletrônicos', category: 'Eletrônicos', productCount: 145, icon: Smartphone, color: 'from-blue-500 to-blue-600', description: 'Smartphones...', hasNewProducts: true },
    { id: 2, title: 'Roupas e Moda', category: 'Roupas', productCount: 89, icon: Shirt, color: 'from-pink-500 to-rose-600', description: 'Vestuário...', hasNewProducts: false },
    // ... todos os 12 itens
];

const FILTROS_CATEGORIAS_ORIGINAIS = ['Todas', 'Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros', 'Saúde', 'Alimentação'];


function PaginaPrincipal() {
    return (
        <FilterGridPage 
            // 🚨 PASSANDO OS DADOS VIA PROPS
            data={DADOS_CATEGORIAS_ORIGINAIS}
            filterableCategories={FILTROS_CATEGORIAS_ORIGINAIS}
            
            // 🚨 AJUSTANDO OS TEXTOS VIA PROPS (Se omitir, ele usa o valor padrão)
            headerTitle="Gerenciamento de Categorias"
            headerSubtitle="Organize e gerencie todas as categorias de produtos do sistema"
            resultUnit="categoria"
            linkButtonText="Gerenciar"
            linkButtonRoute="/video" 
        />
    );
}

// export default PaginaPrincipal;