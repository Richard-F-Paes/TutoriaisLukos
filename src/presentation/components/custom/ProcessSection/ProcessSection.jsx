import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
    const steps = [
        {
            id: "I",
            title: "Diagnóstico e Planejamento",
            description: "Analisamos profundamente a operação do seu posto para identificar gargalos e oportunidades de automação.",
            details: "Mapeamento de processos, levantamento de hardware e definição de cronograma personalizado."
        },
        {
            id: "II",
            title: "Implantação e Treinamento",
            description: "Nossa equipe técnica realiza a instalação e capacita sua equipe para extrair o máximo das ferramentas Lukos.",
            details: "Treinamentos práticos na pista e na retaguarda, configuração de periféricos e segurança de dados."
        },
        {
            id: "III",
            title: "Monitoramento e Consultoria",
            description: "Acompanhamos os primeiros dias de operação real para garantir que tudo flua com perfeição.",
            details: "Suporte assistido, análise de relatórios iniciais e ajustes finos de performance."
        },
        {
            id: "IV",
            title: "Evolução e Sucesso",
            description: "Parceria contínua com atualizações constantes e suporte 24/7 para que seu negócio nunca pare.",
            details: "Updates mensais, novos módulos e feedback constante para melhoria contínua."
        }
    ];

    return (
        <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-stretch">

                    {/* Left Column: Intro & Visual */}
                    <div className="flex flex-col justify-between lg:w-[40%]">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 rounded-full mb-6"
                            >
                                <Plus className="w-4 h-4 text-[#8B5CF6]" />
                                <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">Metodologia Lukos</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-8 tracking-tighter"
                            >
                                JORNADA DE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400">
                                    TRANSFORMAÇÃO
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-400 text-lg leading-relaxed mb-12 font-light max-w-md"
                            >
                                Nossa metodologia foi lapidada em milhares de implantações, garantindo uma transição suave e resultados imediatos na gestão do seu posto.
                            </motion.p>
                        </div>

                        {/* Featured Step Visual inspired by reference */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative rounded-3xl overflow-hidden group shadow-2xl"
                        >
                            <img
                                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=format&fit=crop&w=800"
                                alt="Methodology in Action"
                                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <h3 className="text-white text-2xl font-bold mb-2 uppercase tracking-tight">Presença & Compromisso</h3>
                                <p className="text-white/70 text-sm leading-relaxed">Não somos apenas um software; somos o parceiro estratégico para o crescimento do seu negócio.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: vertical Steps timeline */}
                    <div className="lg:w-[60%] space-y-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#111111] border border-white/5 p-8 md:p-10 rounded-[2rem] hover:shadow-2xl hover:border-[#8B5CF6]/20 transition-all duration-500 overflow-hidden"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>

                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                    {/* Step ID Indicator */}
                                    <div className="flex-shrink-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:rotate-6">
                                            <span className="text-xl font-black text-gray-600 group-hover:text-white transition-colors">{step.id}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-[#8B5CF6] transition-colors tracking-tight uppercase">
                                                {step.title}
                                            </h3>
                                            <div className="hidden md:block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                                <ArrowRight className="text-[#8B5CF6] w-6 h-6" />
                                            </div>
                                        </div>

                                        <p className="text-gray-400 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                                            {step.description}
                                        </p>

                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium group-hover:text-gray-400">
                                            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full group-hover:scale-150 transition-transform"></div>
                                            {step.details}
                                        </div>
                                    </div>
                                </div>

                                {/* Connecting line decor like in reference */}
                                {index !== steps.length - 1 && (
                                    <div className="absolute left-[3.5rem] bottom-0 w-px h-8 bg-white/5 hidden md:block"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Subtle decorative grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#8B5CF6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
            </div>
        </section>
    );
};

export default ProcessSection;
