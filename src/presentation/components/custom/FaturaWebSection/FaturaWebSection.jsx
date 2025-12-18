import React from 'react';
import { CheckCircle2, ChevronDown, FileText, creditCard, Clock, Bell, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FaturaWebSection = () => {
    const stats = [
        {
            value: "Digital",
            label: "Fatura Online",
            description: "Envio automático de faturas e boletos via e-mail e WhatsApp, reduzindo o custo com papel.",
            icon: FileText
        },
        {
            value: "Auto",
            label: "Cobrança Ativa",
            description: "Régua de cobrança automatizada para reduzir a inadimplência e melhorar o fluxo de caixa.",
            icon: Bell
        },
        {
            value: "Gestão",
            label: "Controle Total",
            description: "Painel administrativo completo para monitorar pagamentos e vincular boletos ao ERP.",
            icon: ShieldCheck
        }
    ];

    return (
        <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
            {/* Subtle Orange Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.08)_0%,_transparent_70%)] z-0"></div>

            {/* Scroll Indicator - Top Center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block pt-[120px]">
                <div className="w-16 h-16 rounded-full bg-orange-500 border-4 border-[#0a0a0f] flex items-center justify-center animate-bounce shadow-xl shadow-orange-500/20">
                    <ChevronDown className="text-black w-8 h-8" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Content */}
                    <div className="flex-1 max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="block text-gray-500 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm"
                        >
                            FATURAMENTO DIGITAL
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter"
                        >
                            LUKOS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
                                FATURA WEB
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-light"
                        >
                            Modernize seu processo de faturamento. Com o Fatura Web, você automatiza o envio de cobranças, facilita o pagamento para seus clientes e tem controle absoluto sobre o contas a receber.
                        </motion.p>

                        {/* Stats List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex flex-col items-center text-center gap-6 group"
                                >
                                    <div className="flex-shrink-0 relative">
                                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-orange-500/10 group-hover:rotate-12 transition-all duration-500 shadow-inner border border-white/5 group-hover:border-orange-500/30">
                                            <stat.icon className="w-10 h-10 text-white group-hover:text-orange-400 transition-colors" />
                                        </div>
                                        {/* Decorative check */}
                                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-500 rounded-full border-4 border-[#0a0a0f] flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-black" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex flex-col mb-3">
                                            <span className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">{stat.value}</span>
                                            <h3 className="text-orange-400 font-bold uppercase tracking-[0.2em] text-xs">{stat.label}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] font-light italic">
                                            "{stat.description}"
                                        </p>
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mt-6 group-hover:w-32 transition-all duration-700"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Video/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 relative w-full aspect-video max-w-[800px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border-[6px] border-white/5 shadow-[0_30px_60px_-15px_rgba(251,146,60,0.3),0_15px_30px_-10px_rgba(217,119,6,0.2)]"
                    >
                        {/* YouTube Embed Placeholder */}
                        <iframe
                            className="w-full h-full scale-[1.01]"
                            src="https://www.youtube.com/embed/sjWk3XpdH3s"
                            title="Lukos Fatura Web"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                        {/* Decorative Background Patterns - Orange & Amber */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px] -z-10 animate-pulse transition-all duration-1000" style={{ animationDelay: '1s' }}></div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom decorative line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent origin-center"
            />
        </section>
    );
};

export default FaturaWebSection;
