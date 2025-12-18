import React from 'react';
import { CheckCircle2, ChevronDown, Users, CreditCard, Target, Sparkles, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FidelitySection = () => {
    const stats = [
        {
            value: "Fidelize",
            label: "Retenção de Clientes",
            description: "Engajamento contínuo para transformar clientes ocasionais em advogados da sua marca.",
            icon: Heart
        },
        {
            value: "Cashback",
            label: "Recompensa Real",
            description: "Sistema de recompensas automáticas que impulsionam o consumo e aumentam o ticket médio.",
            icon: CreditCard
        },
        {
            value: "Precisão",
            label: "Marketing Direto",
            description: "Comunicação estratégica baseada no comportamento real de compra de cada cliente.",
            icon: Target
        }
    ];

    return (
        <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
            {/* Subtle Red Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.08)_0%,_transparent_70%)] z-0"></div>

            {/* Scroll Indicator - Top Center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block pt-[120px]">
                <div className="w-16 h-16 rounded-full bg-red-600 border-4 border-[#0a0a0f] flex items-center justify-center animate-bounce shadow-xl shadow-red-600/20">
                    <ChevronDown className="text-white w-8 h-8" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">

                    {/* Left Side: Content */}
                    <div className="flex-1 max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="block text-gray-400 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm"
                        >
                            EXPERIÊNCIA DO CLIENTE
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter"
                        >
                            LUKOS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                                FIDELIDADE
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-light"
                        >
                            A solução definitiva para criar conexões duradouras. O Lukos Fidelidade combina tecnologia de ponta com estratégias de gamificação para garantir que seu cliente sempre escolha o seu posto.
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
                                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-red-600/10 group-hover:rotate-12 transition-all duration-500 shadow-inner border border-white/5 group-hover:border-red-600/30">
                                            <stat.icon className="w-10 h-10 text-white group-hover:text-red-500 transition-colors" />
                                        </div>
                                        {/* Decorative check */}
                                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full border-4 border-[#0a0a0f] flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex flex-col mb-3">
                                            <span className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">{stat.value}</span>
                                            <h3 className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs">{stat.label}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] font-light italic">
                                            "{stat.description}"
                                        </p>
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent mt-6 group-hover:w-32 transition-all duration-700"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Video/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 relative w-full aspect-video max-w-[800px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border-[6px] border-white/5 shadow-[0_30px_60px_-15px_rgba(220,38,38,0.3),0_15px_30px_-10px_rgba(255,100,100,0.2)]"
                    >
                        {/* YouTube Embed */}
                        <iframe
                            className="w-full h-full scale-[1.01]"
                            src="https://www.youtube.com/embed/F_itCCQd0nk?start=34"
                            title="Lukos Fidelidade"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                        {/* Decorative Background Patterns - Red */}
                        <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] -z-10 animate-pulse transition-all duration-1000" style={{ animationDelay: '1s' }}></div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom decorative line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent origin-center"
            />
        </section>
    );
};

export default FidelitySection;
