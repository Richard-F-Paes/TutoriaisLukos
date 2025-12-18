import React from 'react';
import { CheckCircle2, TrendingUp, Users2, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ExpertiseSection = () => {
    const stats = [
        {
            value: "20+",
            label: "Anos de Experiência",
            description: "Liderando a inovação em tecnologia para postos.",
            icon: ShieldCheck
        },
        {
            value: "1500+",
            label: "Postos Atendidos",
            description: "Presença consolidada em todo o território nacional.",
            icon: Users2
        },
        {
            value: "24/7",
            label: "Suporte Especializado",
            description: "Atendimento de alta performance quando você mais precisa.",
            icon: CheckCircle2
        }
    ];

    return (
        <section className="relative py-24 bg-[#0a0a0f]  overflow-hidden">
            {/* Scroll Indicator - Top Center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block pt-[120px]">
                <div className="w-16 h-16 rounded-full bg-[#8B5CF6] border-4 border-[#0a0a0f] flex items-center justify-center animate-bounce shadow-xl">
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
                            OLÁ, SOMOS A LUKOS
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter"
                        >
                            TECNOLOGIA COM <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400">
                                EXPERIÊNCIA
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-light"
                        >
                            Apaixonados por transformar o setor de combustíveis através de experiências digitais excepcionais. Com um olhar atento aos detalhes e foco total no cliente, transformamos desafios operacionais em resultados extraordinários.
                        </motion.p>

                        {/* Stats List */}
                        <div className="space-y-10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="flex-shrink-0 relative">
                                        <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors shadow-inner">
                                            <stat.icon className="w-7 h-7 text-white group-hover:text-[#8B5CF6] transition-colors" />
                                        </div>
                                        {/* Decorative check from reference */}
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B5CF6] rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                                            <h3 className="text-white font-bold uppercase tracking-wider text-sm">{stat.label}</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm">{stat.description}</p>
                                        <div className="w-12 h-0.5 bg-white/10 mt-3 group-hover:w-full transition-all duration-500"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 relative"
                    >
                        {/* Decorative Background Patterns inspired by reference */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                            {/* Abstract grid/dots pattern */}
                            <div className="grid grid-cols-4 gap-4 opacity-5">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 bg-slate-900 rounded-sm"></div>
                                ))}
                            </div>
                        </div>


                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
