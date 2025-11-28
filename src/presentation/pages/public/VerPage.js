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
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '600px',
          width: '100%',
          maxWidth: 'min(100%, 2000px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '10px',
          position: 'relative',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70 flex flex-col items-center justify-center gap-4 w-full h-full z-10">
          <div className="inline-flex items-center mt-[100px] gap-2 px-4 py-2 bg-purple-500/100 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Página de Visualização
            </span>
          </div>
          <div className="w-[1200px] text-center flex items-center justify-center flex-col">  
            <h2 className="text-5xl font-bold text-white drop-shadow-2xl mb-6">
              Bem-vindo à Nova Rota
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Esta é uma página criada especialmente para visualização e testes.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Conteúdo da Página
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Esta página foi criada para você visualizar e testar novas funcionalidades.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Funcionalidade 1</h3>
              <p className="text-gray-600">
                Descrição da primeira funcionalidade desta página de visualização.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Funcionalidade 2</h3>
              <p className="text-gray-600">
                Descrição da segunda funcionalidade desta página de visualização.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Funcionalidade 3</h3>
              <p className="text-gray-600">
                Descrição da terceira funcionalidade desta página de visualização.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#690093] to-[#5a008f] text-white font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span>Explorar Mais</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerPage;





