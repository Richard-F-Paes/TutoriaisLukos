import React from 'react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function VerPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <PageNavbar />
      
      {/* Hero Section */}
      <section 
        className="relative -mt-[100px] flex flex-col items-center justify-center overflow-visible"
        style={{
          backgroundImage: 'url("https://lukos.com.br/wp-content/uploads/2025/01/S-TEXTO-1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '600px'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Ver Page
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Página em desenvolvimento
          </p>
        </div>
      </section>
    </div>
  );
}

export default VerPage;
