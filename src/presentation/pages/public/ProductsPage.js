import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ChevronRight, Search, Zap, Check, ArrowRight } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

export default function ProductsPage() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Todos');

    const categories = ['Todos', 'Ponto de Venda', 'Finanças', 'Hardware', 'Growth', 'Intelligence', 'Banking'];

    const products = [
        {
            id: 1,
            name: 'Lukos PDV Pro',
            category: 'Ponto de Venda',
            description: 'A revolução no checkout. Rápido, intuitivo e totalmente integrado.',
            price: 'R$ 2.500',
            rating: 4.9,
            reviews: 124,
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
            trending: true,
            features: ['Emissão Fiscal Instantânea', 'Offline First', 'Dashboard Tempo Real'],
            span: "md:col-span-2"
        },
        {
            id: 2,
            name: 'Conciliador 360',
            category: 'Finanças',
            description: 'Automatize 100% da sua conciliação de cartões.',
            price: 'R$ 1.800',
            rating: 4.8,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
            trending: true,
            features: ['Auditoria de Taxas', 'Recuperação de Receita', 'Relatórios Diários'],
            span: "col-span-1"
        },
        {
            id: 3,
            name: 'Smart Terminal',
            category: 'Hardware',
            description: 'Pagamento e gestão na palma da mão.',
            price: 'R$ 850',
            rating: 4.7,
            reviews: 156,
            image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop',
            trending: true,
            features: ['Android 12', 'Impressora Térmica', 'Conexão 5G'],
            span: "md:col-span-2"
        },
        {
            id: 4,
            name: 'Lukos Fidelity',
            category: 'Growth',
            description: 'Transforme clientes casuais em fãs leais da sua marca.',
            price: 'R$ 1.200',
            rating: 4.9,
            reviews: 78,
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop',
            trending: false,
            features: ['App White Label', 'Cashback Automático', 'Marketing Direto'],
            span: "md:col-span-2"
        },
        {
            id: 5,
            name: 'Lukos AI',
            category: 'Intelligence',
            description: 'O futuro da gestão. Previsão de demanda e automação de compras.',
            price: 'Sobre Consulta',
            rating: 5.0,
            reviews: 203,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
            trending: false,
            features: ['Machine Learning', 'Previsão de Estoque', ' precificação Dinâmica'],
            span: "col-span-1"
        },
        {
            id: 6,
            name: 'Lukos Pay',
            category: 'Banking',
            description: 'Sua própria fintech. Receba, pague e gerencie.',
            price: 'Taxa Zero',
            rating: 4.8,
            reviews: 167,
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
            trending: false,
            features: ['Split de Pagamento', 'Antecipação Auto', 'Conta PJ Digital'],
            span: "col-span-1"
        },
    ];

    const toggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-white min-h-screen font-['Outfit'] text-gray-900 selection:bg-[#8B5CF6] selection:text-white">
            <PageNavbar />

            {/* Spotlight Hero Section */}
            <section className="relative pt-32 pb-12 md:pb-20 px-4 overflow-hidden flex flex-col justify-center items-center min-h-[80vh]">

                {/* Light Theme Spotlight Gradient */}
                <div className="absolute top-0 center w-full h-[1200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/40 via-blue-50/20 to-white pointer-events-none blur-3xl"></div>

                {/* Additional Ambient Light */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[400px] bg-purple-200/20 blur-[80px] md:blur-[100px] rounded-full pointer-events-none mix-blend-multiply"></div>

                <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
                    <div className="mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                        <span className="px-4 py-2 border border-purple-200 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-purple-900 bg-white/50 backdrop-blur-md shadow-sm">
                            Serviços Lukos
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9] opacity-0 animate-[slideUp_1s_ease-out_0.2s_forwards] drop-shadow-sm">
                        <span className="block text-gray-900">Serviços</span>
                        <span className="block text-[#8B5CF6]">
                            Lukos
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed opacity-0 animate-[slideUp_1s_ease-out_0.4s_forwards]">
                        Desenvolvemos soluções que transformam negócios.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[slideUp_1s_ease-out_0.6s_forwards] w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 md:px-10 py-4 bg-[#8B5CF6] text-white rounded-full font-bold hover:bg-[#7c3aed] transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-1">
                            Explorar Soluções
                        </button>
                    </div>
                </div>

                {/* Ambient Decoration */}
                <div className="absolute top-1/2 left-10 w-40 md:w-64 h-40 md:h-64 border border-purple-200/50 rounded-full blur-[60px] bg-purple-100/40 pointer-events-none opacity-60"></div>
                <div className="absolute bottom-20 right-10 w-60 md:w-96 h-60 md:h-96 border border-blue-200/50 rounded-full blur-[80px] bg-blue-100/40 pointer-events-none opacity-60"></div>
            </section>

            {/* Category Filter - Sticky Light Bar */}
            <section className="sticky top-20 z-40 py-6 bg-white/80 backdrop-blur-xl border-y border-gray-100 shadow-sm">
                <div className="container mx-auto max-w-7xl px-4 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 md:justify-center min-w-max">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-lg shadow-purple-500/20'
                                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-[#8B5CF6] hover:border-purple-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen bg-white">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/produto/${product.id}`}
                                className={`group relative bg-[#0a0a0c] rounded-[2rem] overflow-hidden border border-gray-100/10 hover:border-[#8B5CF6]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#8B5CF6]/20 hover:-translate-y-2 flex flex-col cursor-pointer ${activeCategory === 'Todos' ? product.span : 'col-span-1'
                                    }`}
                            >
                                {/* Image Area with Zoom Effect */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 desaturate-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent opacity-90" />
                                </div>

                                {/* Floating Headers */}
                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#8B5CF6] border border-white/5 shadow-sm">
                                        {product.category}
                                    </span>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }}
                                        className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 hover:bg-white hover:text-[#8B5CF6] transition-all border border-white/5 group-hover:scale-110"
                                    >
                                        <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current text-[#8B5CF6]' : ''}`} />
                                    </button>
                                </div>

                                {/* Content Content - Always Visible but Expands on Desktop */}
                                <div className="relative z-10 mt-auto p-8 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight group-hover:text-[#8B5CF6] transition-colors">{product.name}</h3>

                                    <div className="w-12 h-1 bg-[#8B5CF6] rounded-full mb-4 opacity-50 group-hover:opacity-100 group-hover:w-20 transition-all duration-500" />

                                    <div className="block md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 overflow-hidden transition-all duration-500 origin-bottom">
                                        <p className="text-gray-300 text-sm mb-6 leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                                            {product.description}
                                        </p>

                                        {/* Features Pills */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {product.features.slice(0, 3).map((feat, i) => (
                                                <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-gray-300">
                                                    {feat}
                                                </span>
                                            ))}
                                            {product.features.length > 3 && (
                                                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-gray-300">
                                                    +{product.features.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between w-full pt-6 border-t border-white/10">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">A partir de</span>
                                                <span className="text-xl font-bold text-white">{product.price}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
