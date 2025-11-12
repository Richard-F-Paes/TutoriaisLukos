import React, { useState } from 'react';

export default function LandingHero() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="flex flex-col items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat pb-40">
                <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-[#4F39F6] to-[#FDFEFF]">
                 
                </div>

                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
                    <a href="https://prebuiltui.com">
                       
                    </a>

                

                    <div className="hidden md:block space-x-3">
                     
                        <button className="hover:bg-slate-100 transition px-6 py-2 border border-indigo-600 rounded-md">
                            Login
                        </button>
                    </div>

                    <button 
                        onClick={() => setMenuOpen(true)} 
                        className="md:hidden active:scale-90 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu">
                            <path d="M4 5h16"/>
                            <path d="M4 12h16"/>
                            <path d="M4 19h16"/>
                        </svg>
                    </button>
                </nav>

                <div 
                    className={`fixed inset-0 z-[100] bg-white/60 text-slate-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
                        menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/stories">Stories</a>
                    <a href="/pricing">Home</a>
                    <button 
                        onClick={() => setMenuOpen(false)} 
                        className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>

                <main className="flex flex-col items-center max-md:px-2 w-full">
                    <div className="mt-32 flex items-center justify-center w-full">
                        <img src="logo.png" alt="logo" className='w-16 h-14' />
                    </div>

                    <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900">
                       Lukos Tutoriais
                    </h1>
                    <p className="text-center text-base text-slate-700 max-w-lg mt-2">
                      Plataforma com tutoriais erp e pdv com videos aulas 
                    </p>
                    <div className="flex items-center gap-4 mt-8">
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11" href="/tutoriais">
                            Tutoriais
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          
                        </button>
                        <button className="border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-lg px-8 h-11">
                            Home
                        </button>
                    </div>
                    
                  
                </main>
            </section>
        </>
    );
}
