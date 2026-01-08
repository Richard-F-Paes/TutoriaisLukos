import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Check, Share2, ShieldCheck, Truck, Zap } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    // Dados sincronizados com a ProductsPage (Ultra-Premium)
    const products = [
        {
            id: 1,
            name: 'Lukos PDV Pro',
            category: 'Ponto de Venda',
            description: 'A revolução no checkout. Rápido, intuitivo e totalmente integrado.',
            fullDescription: 'O Lukos PDV Pro não é apenas um sistema de caixa; é o centro nervoso da sua operação. Projetado para suportar alto volume de transações com latência zero, ele integra fiscal, financeiro e estoque em uma interface que qualquer operador domina em minutos. Funciona online e offline, garantindo que suas vendas nunca parem.',
            price: 'R$ 2.500',
            rating: 4.9,
            reviews: 124,
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
            features: ['Emissão Fiscal Instantânea (NFC-e/SAT)', 'Modo Offline Robusto', 'Dashboard de Vendas em Tempo Real', 'Integração com principais TEFs', 'Controle de Sangria e Suprimento Digital']
        },
        {
            id: 2,
            name: 'Conciliador 360',
            category: 'Finanças',
            description: 'Automatize 100% da sua conciliação de cartões.',
            fullDescription: 'Pare de perder dinheiro com taxas indevidas. O Conciliador 360 audita cada centavo transacionado em suas maquininhas, confrontando automaticamente com o extrato das operadoras. Identifica divergências de taxas, cancelamentos não processados e aluguéis indevidos.',
            price: 'R$ 1.800',
            rating: 4.8,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
            features: ['Auditoria Automática de Taxas', 'Recuperação de Receita Perdida', 'Relatórios Financeiros Diários', 'Suporte a Multi-Adquirentes', 'Previsão de Fluxo de Caixa']
        },
        {
            id: 3,
            name: 'Smart Terminal',
            category: 'Hardware',
            description: 'Pagamento e gestão na palma da mão.',
            fullDescription: 'Hardware robusto com design elegante. O Smart Terminal Lukos combina impressora térmica de alta velocidade, bateria de longa duração e conectividade 5G para levar o caixa até o cliente. Ideal para pistas de abastecimento e atendimento na mesa.',
            price: 'R$ 850',
            rating: 4.7,
            reviews: 156,
            image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop',
            features: ['Android 12 Enterprise', 'Impressora Térmica Integrada', 'Conexão 5G + Wi-Fi Dual Band', 'Pagamento por Aproximação (NFC)', 'Leitor de Código de Barras 1D/2D']
        },
        {
            id: 4,
            name: 'Lukos Fidelity',
            category: 'Growth',
            description: 'Transforme clientes casuais em fãs leais da sua marca.',
            fullDescription: 'Crie programas de fidelidade que realmente engajam. O Lukos Fidelity permite configurar regras de cashback, pontuação por produto e campanhas segmentadas via SMS e WhatsApp. Acompanhe o LTV dos seus clientes e aumente a recorrência.',
            price: 'R$ 1.200',
            rating: 4.9,
            reviews: 78,
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop',
            features: ['App White Label Personalizado', 'Motor de Cashback Automático', 'Disparo de Campanhas SMS/WhatsApp', 'Segmentação de Clientes por Comportamento', 'Clube de Assinaturas']
        },
        {
            id: 5,
            name: 'Lukos AI',
            category: 'Intelligence',
            description: 'O futuro da gestão. Previsão de demanda e automação de compras.',
            fullDescription: 'A primeira IA generativa focada em varejo de combustível. O Lukos AI analisa seu histórico de vendas, sazonalidade e dados de mercado para prever quanto você vai vender e sugerir compras de estoque precisas, evitando rupturas e capital parado.',
            price: 'Sobre Consulta',
            rating: 5.0,
            reviews: 203,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
            features: ['Machine Learning Preditivo', 'Sugestão de Compras (Open to Buy)', 'Precificação Dinâmica Inteligente', 'Detecção de Anomalias e Fraudes', 'Assistente Virtual de Gestão']
        },
        {
            id: 6,
            name: 'Lukos Pay',
            category: 'Banking',
            description: 'Sua própria fintech. Receba, pague e gerencie.',
            fullDescription: 'Centralize sua operação financeira. Com Lukos Pay, você tem uma conta digital PJ integrada ao ERP, split de pagamentos automático e antecipação de recebíveis com as melhores taxas do mercado. Tudo em um único lugar.',
            price: 'Taxa Zero',
            rating: 4.8,
            reviews: 167,
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
            features: ['Split de Pagamento Automático', 'Antecipação de Recebíveis D+1', 'Conta PJ Digital Integrada', 'Pix com Conciliação Instantânea', 'Cartão Corporativo Virtual']
        },
    ];

    const product = products.find(p => p.id === parseInt(id));

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen font-['Outfit'] text-gray-900 selection:bg-black selection:text-white">
            <PageNavbar />

            {/* Background Ambience - Lighter for White Theme */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/60 blur-[100px] rounded-full mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/60 blur-[100px] rounded-full mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-6xl">
                    {/* Breadcrumb / Back */}
                    <button
                        onClick={() => navigate('/produtos')}
                        className="group flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"
                    >
                        <div className="p-2 rounded-full bg-gray-100 border border-gray-200 group-hover:border-gray-400 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium tracking-wide">Voltar para Soluções</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Left Column: Immersive Image */}
                        <div className="relative sticky top-32 mb-[120px]">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl shadow-gray-200/50">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                                {/* Light overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-40"></div>

                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all shadow-sm"
                                    >
                                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Security Badges */}
                            <div className="flex gap-6 mt-8 justify-center text-gray-500">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium">Garantia Vitalícia</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium">Suporte 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <span className="px-3 py-1 rounded-full bg-purple-50 text-xs font-bold uppercase tracking-widest text-[#8B5CF6] border border-[#8B5CF6]/20">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-none text-black">
                                {product.name}
                            </h1>

                            <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed font-light">
                                <p>{product.fullDescription}</p>
                            </div>

                            {/* Features Grid - Light Theme */}
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                    O que está incluído
                                </h3>
                                <ul className="space-y-4">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-sm lg:text-base font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pricing & CTA - Light Theme */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto pt-8 border-t border-gray-100">
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">A partir de</p>
                                    <p className="text-4xl font-bold text-gray-900">{product.price}</p>
                                </div>
                                <button className="w-full sm:flex-1 py-5 bg-black text-white font-bold text-lg rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
                                    <ShoppingCart className="w-5 h-5" />
                                    Adicionar ao Carrinho
                                </button>
                                <button className="p-5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all text-gray-700 hover:text-black">
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
