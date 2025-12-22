import React from 'react';
import {
    CheckCircle2,
    TrendingUp,
    Users2,
    ShieldCheck,
    ChevronDown,
    PieChart,
    Lock
} from 'lucide-react';

import { motion } from 'framer-motion';

const ExpertiseSection = () => {
    const stats = [
        {
            value: "10+",
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
        <section id="expertise-section" className="relative py-24 bg-[#82aa7a]   overflow-hidden h-[500px] ">


            <div className="container mx-auto px-4 relative z-10 ">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ">

                    {/* Left Side: Content */}
                    <div className="flex-1 max-w-2xl">



                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter"
                        >
                            TECNOLOGIA COM <br />
                            <span className="text-transparent bg-clip-text bg-[#E7F3EC] ">
                                EXPERIÊNCIA
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white text-lg md:text-xl leading-relaxed mb-12 font-light"
                        >
                            Apaixonados por transformar o setor de combustíveis através de experiências digitais excepcionais. Com um olhar atento aos detalhes e foco total no cliente, transformamos desafios operacionais em resultados extraordinários.
                        </motion.p>

                        {/* Stats List */}

                    </div>

                    {/* Right Side: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 relative"
                    >
                        {/* Decorative Background Patterns inspired by reference */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>



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

export default ExpertiseSection;
