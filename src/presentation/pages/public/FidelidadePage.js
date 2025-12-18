import React from 'react';
import { Heart, Gift, Users, Zap, Star, Smartphone, CheckCircle, ArrowRight, TrendingUp, MessageCircle } from 'lucide-react';

function FidelidadePage() {
    const loyaltyBenefits = [
        {
            title: 'Programas de Pontos',
            description: 'Configuração flexível de pontos por litro ou valor gasto. Fidelize seus clientes com facilidade.',
            icon: Star
        },
        {
            title: 'Resgate no PDV',
            description: 'O cliente troca seus pontos diretamente no caixa, sem precisar de validações externas.',
            icon: Gift
        },
        {
            title: 'App Personalizado',
            description: 'Tenha sua marca no smartphone do cliente com um aplicativo intuitivo de pontos.',
            icon: Smartphone
        },
        {
            title: 'Campanhas Direcionadas',
            description: 'Envie notificações e ofertas exclusivas baseadas no perfil de consumo de cada cliente.',
            icon: MessageCircle
        }
    ];

    return (
        <div className="bg-[#0a0a0f] min-h-screen font-sans text-white overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#8B5CF6]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/fidelidade_customer_experience_1766006754976.png"
                        alt="Customer Loyalty Experience"
                        className="w-full h-full object-cover opacity-20 scale-110 transition-transform duration-[20s]"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="max-w-3xl flex-1">
                            <span className="block text-pink-500 font-bold tracking-[0.2em] uppercase mb-6 text-sm border-l-4 border-pink-500 pl-6">
                                Fidelização de Clientes LUKOS
                            </span>
                            <h1 className="text-6xl md:text-9xl font-black text-white uppercase leading-none mb-8 tracking-tighter">
                                FIDELI<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">DADE</span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed mb-12 font-light max-w-2xl">
                                Transforme cada venda em um relacionamento duradouro. Tecnologia para engajar, recompensar e reter quem mais importa.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <button className="px-12 py-6 bg-pink-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-pink-600 transition-all transform hover:scale-110 shadow-2xl shadow-pink-500/20 flex items-center gap-4 group">
                                    COMEÇAR AGORA <Heart className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
                                </button>
                                <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all">
                                    VER DEMONSTRAÇÃO
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 hidden lg:block text-right">
                            <div className="relative group inline-block">
                                <div className="absolute -inset-10 bg-pink-500/20 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <img
                                    src="/fidelidade_ios_app_mockup_1766007136440.png"
                                    alt="Fidelidade App Mockup"
                                    className="relative h-[650px] w-auto mx-auto object-contain drop-shadow-[0_35px_35px_rgba(236,72,153,0.3)] transition-all duration-1000 group-hover:scale-105 group-hover:-rotate-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefícios Grid Moderno */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loyaltyBenefits.map((benefit, index) => (
                            <div key={index} className="group relative bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 hover:border-pink-500/30 transition-all text-center backdrop-blur-md">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/10 transition-colors"></div>
                                <div className="mb-10 relative">
                                    <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:rotate-12 transition-all duration-500">
                                        <benefit.icon className="w-10 h-10 text-pink-500 group-hover:text-white" />
                                    </div>
                                </div>
                                <h3 className="text-white font-black text-2xl mb-6 tracking-tight uppercase">{benefit.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção Estratégica */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-pink-500/10 rounded-[3rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                                    <img
                                        src="/customer_loyalty_app_1766005568202.png"
                                        alt="Loyalty App Preview"
                                        className="relative rounded-[2.8rem] opacity-70 group-hover:opacity-90 transition-opacity duration-700 shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2">
                            <span className="text-pink-500 text-sm uppercase tracking-[0.2em] font-bold mb-6 block border-l-4 border-pink-500 pl-6">Marketing Inteligente</span>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-10 leading-none tracking-tighter">
                                CONHEÇA SEU <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">CONSUMIDOR</span>
                            </h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light">
                                O maior ativo do seu posto são os dados. Com o Fidelidade, você entende quais dias o cliente mais abastece, qual produto ele mais compra na conveniência e pode agir proativamente para aumentar o ticket médio.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all group">
                                    <TrendingUp className="text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <div className="text-3xl font-black text-white mb-2">35%</div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Recorrência</div>
                                </div>
                                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all group">
                                    <Users className="text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <div className="text-3xl font-black text-white mb-2">+10k</div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Ativos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 relative text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-pink-500/[0.02] to-[#0a0a0f]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="inline-flex p-6 rounded-3xl bg-pink-500/10 border border-pink-500/20 mb-10 animate-pulse">
                        <Heart className="w-12 h-12 text-pink-500" />
                    </div>
                    <h2 className="text-5xl md:text-9xl font-black text-white uppercase mb-12 tracking-tighter leading-none">
                        ESPALHE AMOR, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">COLHA RESULTADOS</span>
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                        Transforme clientes ocasionais em verdadeiros fãs da sua marca. Comece sua estratégia de fidelização hoje mesmo.
                    </p>
                    <button className="px-20 py-10 bg-white text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-110 shadow-[0_0_50px_rgba(236,72,153,0.2)] text-lg">
                        SOLICITAR DEMONSTRAÇÃO
                    </button>
                </div>
            </section>
        </div>
    );
}

export default FidelidadePage;
