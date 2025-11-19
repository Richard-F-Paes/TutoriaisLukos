import React from 'react';
import { Settings } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function ServicosPage() {

  return (
    <div>
      {/* Navbar */}
      <PageNavbar />
            
      {/* Hero Section */}
      <section className="relative -mt-[90px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Serviços" 
          className="w-full h-[600px] object-cover shadow-lg brightness-75 relative -mt-[10px]" 
        />
        <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center gap-4 w-full h-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-full mb-4">
            <Settings className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-2xl">
            Soluções Completas para seu Negócio
          </h2>
          <p className="text-white/90 text-xl text-center max-w-3xl px-4 leading-relaxed drop-shadow-lg">
            Oferecemos uma gama completa de serviços e soluções tecnológicas para transformar e otimizar a gestão do seu negócio.
          </p>
        </div>
      </section>

      {/* Main Content - Deixar em branco para preencher depois */}
      <div className="mt-[-10px] pt-16 pb-16 bg-white relative px-4">
        <div className="max-w-7xl mx-auto">
          {/* Conteúdo será adicionado aqui */}
        </div>
      </div>
      
    </div>
  );
}

export default ServicosPage;

