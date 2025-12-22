import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BentoGrid = () => {
    const cards = [
        {
            id: 1,
            title: "LUKOS ERP",
            description: "Gestão completa e integrada para o seu posto, do financeiro ao estoque.",
            image: "imagemretaguarda.png",
        },
        {
            id: 2,
            title: "LUKOS PDV",
            description: "Agilidade e segurança nas vendas de pista e loja com sistema intuitivo.",
            image: "imagempdv.jpg",
        },
        {
            id: 3,
            title: "Smart POS",
            description: "Mobilidade total para vender e receber pagamentos diretamente na pista.",
            image: "smartpos.jpg",
        },
        {
            id: 4,
            title: "Conveniência",
            description: "Controle preciso de estoque e vendas para sua loja de conveniência.",
            image: "conveniencialoja.jpg",
        },
        {
            id: 5,
            title: "LUKOS Dashboard",
            description: "Dashboards em tempo real para tomada de decisões estratégicas.",
            image: "dashboardpainel.jpg",
        }
    ];

    return (
        <section className="py-20 px-4 md:px-8" style={{ backgroundColor: '#0a0a0f' }}>
            <div className="max-w-7xl mx-auto">
                {/* Mobile: 1 col, md: 3 cols. auto-rows defines base height */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-6">
                        <BentoCardFixed card={cards[0]} />
                        <BentoCardFixed card={cards[3]} />
                    </div>

                    {/* Column 2 (Tall Item) */}
                    <div className="md:col-span-1">
                        <BentoCardFixed card={cards[1]} className="h-[300px] md:h-[624px]" />
                        {/* 624px = 300*2 + 24px gap approx */}
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-6">
                        <BentoCardFixed card={cards[2]} />
                        <BentoCardFixed card={cards[4]} />
                    </div>

                </div>
            </div>
        </section>
    );
};

const BentoCardFixed = ({ card, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className={`relative group overflow-hidden rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 cursor-pointer shadow-2xl transition-all duration-500 ${className} ${!className.includes('h-') ? 'h-[320px]' : ''}`}
        >
            {/* Background Image with Deep Overlay */}
            <div className="absolute inset-0">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.6] group-hover:brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-90" />
            </div>

            {/* Premium Border Glow on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#8B5CF6]/30 rounded-[2.5rem] transition-colors duration-500 z-10 pointer-events-none" />

            {/* Content with Glassmorphism Effect */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter group-hover:text-[#8B5CF6] transition-colors duration-300">
                            {card.title}
                        </h3>
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                            <ArrowUpRight size={20} className="text-white" />
                        </div>
                    </div>

                    <div className="w-12 h-1 bg-[#8B5CF6] rounded-full group-hover:w-20 transition-all duration-500" />

                    <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-[90%] font-medium">
                        {card.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default BentoGrid;
