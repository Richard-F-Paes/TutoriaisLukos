import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function LandingHero() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToExpertise = () => {
        const element = document.getElementById('expertise-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="flex flex-col items-center text-sm bg-[#0a0a0f] bg-[url('https://lukos.com.br/wp-content/uploads/2025/01/BANNER-HOME-1.png')] bg-contain bg-top bg-no-repeat pb-40 relative min-h-screen">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]"></div>
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur-md bg-black/5 text-white text-sm border-b border-white/5">
                    <a href="https://prebuiltui.com">

                    </a>



                    <div className="hidden md:block space-x-3">

                    </div>

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden active:scale-90 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu">
                            <path d="M4 5h16" />
                            <path d="M4 12h16" />
                            <path d="M4 19h16" />
                        </svg>
                    </button>
                </nav>

                <div
                    className={`fixed inset-0 z-[100] bg-black/80 text-white backdrop-blur-xl flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/stories">Stories</a>
                    <a href="/pricing">Home</a>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-white/10 hover:bg-white/20 transition text-white rounded-md flex"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <main className="flex flex-col items-center max-md:px-2 w-full">

                    <h1 className="text-center text-4xl leading-tight md:text-5xl lg:text-7xl font-black max-w-6xl text-white relative z-10 uppercase tracking-[0.05em] drop-shadow-2xl">
                        Lukos tecnologia para <br className="hidden md:block" />
                        <span className="text-[#8B5CF6] font-black block mt-2 text-6xl md:text-8xl lg:text-9xl tracking-[0.1em] drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">postos de combustível</span>
                    </h1>

                    <p className="text-center text-lg md:text-2xl text-gray-700 max-w-3xl mt-8 relative z-10 font-medium leading-relaxed px-4">
                        Com mais de 10 anos de experiência, a LUKOS tecnologia transforma a gestão de postos de combustíveis e lojas de conveniência.
                    </p>
                    <div className="flex items-center gap-4 mt-12">
                        <button className="flex items-center justify-center bg-[#85a97d] hover:bg-[#76986e] text-white font-semibold rounded-xl px-12 h-14 min-w-[200px] text-lg transition-all active:scale-95 shadow-lg shadow-black/5" href="/contato">
                            Contato
                        </button>
                    </div>


                </main>

                {/* Scroll Down Button */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                    <button
                        onClick={scrollToExpertise}
                        className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors animate-bounce"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Descobrir Mais</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    );
}
