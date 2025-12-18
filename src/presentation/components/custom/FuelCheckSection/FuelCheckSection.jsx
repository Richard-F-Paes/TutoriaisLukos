import React from 'react';
import { CheckCircle2, TrendingUp, Users2, ShieldCheck, ChevronDown, Droplets, Gauge, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const FuelCheckSection = () => {
    const stats = [
        {
            value: "100%",
            label: "Precisão no Controle",
            description: "Monitoramento em tempo real de cada gota de combustível.",
            icon: Gauge
        },
        {
            value: "Zero",
            label: "Perdas Operacionais",
            description: "Tecnologia avançada para eliminar estoques não contabilizados.",
            icon: Shield
        },
        {
            value: "Automático",
            label: "LMC Integrado",
            description: "Geração automática do Livro de Movimentação de Combustíveis.",
            icon: Droplets
        }
    ];

    return (
        <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
            {/* Subtle Purple Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.08)_0%,_transparent_70%)] z-0"></div>

            {/* Scroll Indicator - Top Center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block pt-[120px]">
                <div className="w-16 h-16 rounded-full bg-[#8B5CF6] border-4 border-[#0a0a0f] flex items-center justify-center animate-bounce shadow-xl shadow-[#8B5CF6]/20">
                    <ChevronDown className="text-white w-8 h-8" />
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
                            SERVIÇOS EXCLUSIVOS
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter"
                        >
                            FUEL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400">
                                CHECK
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-light"
                        >
                            O sistema mais preciso do mercado para controle de estoque e monitoramento de tanques. Com o Fuel Check, você tem a segurança de que o que entra é exatamente o que sai, com relatórios precisos e integração total com seu ERP.
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
                                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 group-hover:rotate-12 transition-all duration-500 shadow-inner border border-white/5 group-hover:border-[#8B5CF6]/30">
                                            <stat.icon className="w-10 h-10 text-white group-hover:text-[#8B5CF6] transition-colors" />
                                        </div>
                                        {/* Decorative check */}
                                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#8B5CF6] rounded-full border-4 border-[#0a0a0f] flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex flex-col mb-3">
                                            <span className="text-5xl font-black text-white tracking-tighter mb-1">{stat.value}</span>
                                            <h3 className="text-[#8B5CF6] font-bold uppercase tracking-[0.2em] text-xs">{stat.label}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] font-light italic">
                                            "{stat.description}"
                                        </p>
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent mt-6 group-hover:w-32 transition-all duration-700"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Video/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 relative w-full aspect-[9/16] max-w-[500px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border-[6px] border-white/5 shadow-[0_30px_60px_-15px_rgba(139,92,246,0.2)]"
                    >
                        {/* YouTube Embed */}
                        <iframe
                            className="w-full h-full scale-[1.01]"
                            src="https://www.youtube.com/embed/qJ_-ZSBuIFY"
                            title="Fuel Check Short"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                        {/* Decorative Background Patterns - Purple */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -z-10 animate-pulse transition-all duration-1000" style={{ animationDelay: '1s' }}></div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom decorative line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent origin-center"
            />
        </section>
    );
};

export default FuelCheckSection;
