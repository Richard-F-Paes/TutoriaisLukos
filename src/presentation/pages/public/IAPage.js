import React from 'react';
import { ChevronDown, CheckCircle, Brain, Zap, Target, TrendingUp, Sparkles, Cpu, Rocket, Shield, Globe, BarChart } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function IAPage() {
  return (
    <div>
      {/* Navbar */}
      <PageNavbar />
            <section className="relative -mt-[90px] flex items-center justify-center">
              <img 
                src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Inteligência Artificial" 
                className="w-full h-[800px] object-cover shadow-lg brightness-50 relative -mt-[10px]" 
              />
              <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center gap-8 px-8 md:px-16 w-full h-full">
                {/* Imagem LUKIA à esquerda */}
                <div className="flex-shrink-0 hidden md:block">
                  <img src="/images/branding/lu.png" alt="LUKIA" className="w-full max-w-[700px] h-auto object-contain opacity-100 " />
                </div>
                
                {/* Texto à direita */}
                <div className="flex-1 flex flex-col items-start justify-center gap-4 max-w-2xl">
                  <h2 className="text-white text-4xl md:text-6xl font-bold text-left drop-shadow-lg">Conheça nossa IA</h2>
                  <p className="text-white/90 text-lg md:text-xl text-left leading-relaxed drop-shadow-md">
                  Com a inteligência artifical da LUKOS você está pronto para otimizar sua operação, ter informação em tempo real e minimizar custos.
                  </p>
                </div>
              </div>
            </section>







      {/* Hero Section */}
      <div className="w-full h-[600px] bg-gradient-to-br from-purple-700 via-[#7f26b3] via-purple-800 to-indigo-950  flex items-center justify-between px-8 md:px-16 relative overflow-hidden shadow-2xl">
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center gap-4 w-full h-full"></div>
        
        {/* Efeito de brilho adicional */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        
        {/* Conteúdo com z-index para ficar acima do efeito */}
        <div className="relative z-10 w-full flex items-center justify-between">
          {/* Imagem à esquerda */}
          <div className="flex-shrink-0">
            <img src="LUK.png" alt="LUKIA" className="w-full max-w-[600px] h-auto object-contain ml-[200px] drop-shadow-2xl" />
          </div>
          
          {/* Texto à direita */}
          <div className="flex-1 flex flex-col items-center mr-[250px] justify-center ml-[250px] md:ml-16 max-w-2xl">
            <h2 className="text-white text-4xl md:text-9xl font-bold mb-6 text-left drop-shadow-lg">LUKIA</h2>
            <p className="text-white/90 text-lg md:text-xl text-left leading-relaxed drop-shadow-md">
         Este é o LUKIA, a inteligência artificial da LUKOS que pode ajudar e descomplicar sua operação.
            </p>
          </div>
        </div>
      </div>
      <section className="relative -mt-[90px] flex items-center justify-center mt-[10px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1678957949479-b1e876bee3f1?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Inteligência Artificial" 
          className="w-full h-[500px] object-cover shadow-2xl brightness-75 relative -mt-[10px] transition-transform duration-700 hover:scale-105" 
        />
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-purple-950/70"></div>
        
        {/* Conteúdo sobre a imagem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-full mb-2">
            <Brain className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Tecnologia Avançada
            </span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-2xl">
            Transforme seu Negócio
          </h2>
          <p className="text-white/95 text-xl text-center max-w-3xl leading-relaxed drop-shadow-lg">
            Com a inteligência artificial da LUKOS, você tem acesso a insights poderosos e automação inteligente para impulsionar seus resultados.
          </p>
        </div>
      </section>
      {/* Main Content */}
   
      {/* Hero Section */}
      <div className="w-full h-[600px] bg-gradient-to-br from-purple-700 via-[#7f26b3] mb-[2px] mt-[2px] via-purple-800 to-indigo-950  flex items-center justify-between px-8 md:px-16 relative overflow-hidden shadow-2xl">
        {/* Efeito de brilho adicional */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent  via-white/10 to-transparent opacity-50"></div>
        
        {/* Conteúdo com z-index para ficar acima do efeito */}
        <div className="relative z-10 w-full flex items-center justify-between">
          {/* Imagem à esquerda */}
          <div className="flex-shrink-0 ml-[400px]">
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/SMARTPHONE-FRONT-1-1.png" alt="LUKIA" className="w-full max-w-[400px]  h-auto object-contain  drop-shadow-2xl" />
          </div>
          
          {/* Texto à direita */}
          <div className="flex-1 flex flex-col items-start mr-[250px] justify-center ml-8 md:ml-16 max-w-2xl">
            <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 text-left drop-shadow-lg">IA aplicada ao
            seu negócio</h2>
            <p className="text-white/90 text-lg md:text-xl text-left leading-relaxed drop-shadow-md"> 
            Com a IA da LUKOS você solicita informações detalhadas a qualquer momento, via whatsapp, o LUK, devolve pra você informações como relatórios e painéis dashboards, bem como informações de cálculos de margens e preços.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default IAPage;

