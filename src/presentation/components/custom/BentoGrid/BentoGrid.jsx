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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 cursor-pointer ${className} ${!className.includes('h-') ? 'h-[300px]' : ''}`}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                        <p className="text-gray-300 text-sm">{card.description}</p>
                    </div>
                    <div className="shrink-0 bg-white hover:bg-gray-200 text-black p-2.5 rounded-full transition-colors">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BentoGrid;
