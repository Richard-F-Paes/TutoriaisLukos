import React from 'react';
import { ShieldCheck, Search, BarChart3, Database, Shield, Lock, CheckCircle, ArrowRight } from 'lucide-react';

function FullcheckPage() {
    const auditFeatures = [
        {
            title: 'Auditoria em Tempo Real',
            description: 'Monitore cada transação no exato momento em que ela ocorre, garantindo integridade total.',
            icon: Search
        },
        {
            title: 'Prevenção contra Fraudes',
            description: 'Algoritmos inteligentes que detectam padrões suspeitos e protegem seu financeiro.',
            icon: Shield
        },
        {
            title: 'Conciliação Bancária',
            description: 'Conferência automática entre o sistema, adquirentes e extratos bancários.',
            icon: Database
        },
        {
            title: 'Segurança Certificada',
            description: 'Dados protegidos pelos mais altos padrões de segurança da indústria financeira.',
            icon: Lock
        }
    ];

    return (
        <div className="bg-[#0a0a0f] min-h-screen font-sans text-white overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#8B5CF6]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/fullcheck_security_audit_1766006734760.png"
                        alt="Fullcheck Security Audit"
                        className="w-full h-full object-cover opacity-20 scale-105 transition-transform duration-[20s]"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 max-w-3xl">
                            <span className="block text-[#8B5CF6] font-bold tracking-[0.2em] uppercase mb-6 text-sm border-l-4 border-[#8B5CF6] pl-6">
                                Auditoria de Transações LUKOS
                            </span>
                            <h1 className="text-6xl md:text-9xl font-black text-white uppercase leading-none mb-8 tracking-tighter">
                                FULL<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">CHECK</span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed mb-12 font-light max-w-2xl">
                                Onde cada centavo encontra seu destino. Auditoria profunda, detecção de fraudes e transparência financeira absoluta.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <button className="px-12 py-6 bg-white text-[#0a0a0f] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#8B5CF6] hover:text-white transition-all transform hover:scale-110 shadow-2xl flex items-center gap-4 group">
                                    COMEÇAR AGORA <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all">
                                    VER DEMONSTRAÇÃO
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 hidden lg:block">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-[#8B5CF6] rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img
                                    src="/fullcheck_fraud_detection_ui_1766007115937.png"
                                    alt="Fraud Detection Dashboard"
                                    className="relative rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-700 hover:rotate-1 hover:scale-105 backdrop-blur-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid de Auditoria Moderna */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {auditFeatures.map((feature, index) => (
                            <div key={index} className="group relative bg-white/[0.03] p-10 rounded-[2rem] border border-white/5 hover:border-[#8B5CF6]/30 transition-all overflow-hidden backdrop-blur-md">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#8B5CF6]/10 transition-colors"></div>
                                <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] group-hover:scale-110 transition-all duration-500">
                                    <feature.icon className="w-8 h-8 text-[#8B5CF6] group-hover:text-white" />
                                </div>
                                <h3 className="text-white font-black text-2xl mb-6 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Por que o Fullcheck? */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1">
                            <span className="text-[#8B5CF6] text-sm uppercase tracking-[0.2em] font-bold mb-6 block border-l-4 border-[#8B5CF6] pl-6">Transparência</span>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-10 leading-none tracking-tighter">
                                SEGURANÇA E <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">AUDITORIA INTEGRAL</span>
                            </h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light">
                                O Fullcheck não é apenas um relatório; é um vigia digital para suas finanças. Ele compara o que foi vendido no PDV com o que foi registrado pelas operadoras e o que efetivamente caiu na sua conta.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    'Divergências Financeiras',
                                    'Recuperação de Valores',
                                    'Taxas Abusivas',
                                    'Proteção de Dados'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                                        <div className="w-2 h-2 bg-[#8B5CF6] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                                        <span className="text-gray-300 font-bold uppercase text-xs tracking-widest">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-[#8B5CF6]/20 rounded-[3rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
                                        alt="Audit Data"
                                        className="rounded-[2.8rem] opacity-70 group-hover:opacity-90 transition-opacity duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-32 relative text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-white/[0.02] to-[#0a0a0f]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase mb-10 tracking-tighter leading-none">
                        PRONTO PARA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">O CONTROLE TOTAL?</span>
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                        Centenas de postos já recuperaram milhares de reais usando o Fullcheck. Seja o próximo a ter segurança absoluta sobre seus recebíveis.
                    </p>
                    <button className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#8B5CF6] hover:text-white transition-all transform hover:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                        FALAR COM UM ESPECIALISTA
                    </button>
                </div>
            </section>
        </div>
    );
}

export default FullcheckPage;
