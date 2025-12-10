import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag, FileText, Cloud, CreditCard, Gift, Smartphone, Wallet, Receipt, ShoppingCart, BarChart3, Database, Package, DollarSign, TrendingUp, ChevronLeft, ChevronRight, HelpCircle, ChevronDown, ChevronUp, CheckCircle, ArrowUp, Percent, MessageCircle, Play, X, Rocket, Users, Edit, Zap, Brain, Cpu, Eye } from 'lucide-react';
import VideoShowcase from '../../components/custom/VideoShowcase/VideoShowcase';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

// Componente Feature2 adaptado
const Feature2 = ({
  title = "Conheça mais sobre a LUKOS",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "https://lukos.com.br/wp-content/uploads/2025/01/IMG_0885-1.png",
  imageAlt = "placeholder hero",
  buttonPrimary = {
    label: "Get Started",
    href: "/",
  },
  buttonSecondary = {
    label: "Learn More",
    href: "/",
  },
}) => {
  return (
    <section className="py-16 md:py-32">
     
    </section>
  );
};

function BlogPage() {
  // Estado para FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Estado para controlar modal de vídeo
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Configurações do vídeo
  const videoImageUrl = 'back.png';
  const videoId = 'F_itCCQd0nk'; // Substituir pelo ID do vídeo do YouTube da LUKOS

  // Dados de tecnologias originais

  // Dados dos sistemas (carrossel)
  const systems = [
    {
      id: 'erp',
      name: 'LUKOS ERP',
      description: 'Sistema completo de gestão empresarial para postos de combustível',
      image: 'retaguarda.png',
    },
    {
      id: 'pdv',
      name: 'LUKOS PDV',
      description: 'Ponto de venda integrado com ERP para vendas na pista e loja',
      image: 'CaixaPDV.png',
    },
    {
      id: 'mobile',
      name: 'PDV Móvel',
      description: 'Solução mobile para vendas em qualquer lugar',
      image: 'Smartpos.jpg',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Business Intelligence e relatórios em tempo real',
      image: 'https://lukos.com.br/wp-content/uploads/2025/01/Group-24.png',
    },
  ];

  // FAQ
  const faqItems = [
    {
      question: 'O sistema LUKOS é adequado para postos de qualquer tamanho?',
      answer: 'Sim, o sistema LUKOS foi desenvolvido para atender desde pequenos postos até grandes redes. Nossa tecnologia é altamente configurável e escalável, permitindo que você comece com as funcionalidades essenciais e expanda conforme seu negócio cresce.',
    },
    {
      question: 'Como funciona a integração entre ERP e PDV?',
      answer: 'A integração entre ERP e PDV é totalmente automática e em tempo real. Todas as vendas realizadas no PDV são instantaneamente registradas no ERP, atualizando estoque, financeiro e gerando relatórios. Isso elimina a necessidade de processos manuais e garante dados sempre atualizados.',
    },
    {
      question: 'O sistema atende às obrigações fiscais brasileiras?',
      answer: 'Sim, o LUKOS está sempre atualizado com a legislação fiscal brasileira. O sistema gera automaticamente todas as obrigações acessórias necessárias, como ECF, ECD, SPED Fiscal, SPED Contábil, eSocial e REINF, garantindo conformidade total com o fisco.',
    },
    {
      question: 'Posso acessar o sistema de qualquer lugar?',
      answer: 'Sim, o LUKOS é uma solução cloud, o que significa que você pode acessar de qualquer dispositivo com internet, a qualquer momento. Isso permite gestão remota completa do seu posto de combustível.',
    },
    {
      question: 'Quanto tempo leva para implementar o sistema?',
      answer: 'O tempo de implementação varia conforme o tamanho e complexidade do seu negócio. Em média, a implementação completa leva de 30 a 60 dias, incluindo migração de dados, treinamento da equipe e configuração personalizada.',
    },
  ];

  // Dados de exemplo dos posts do blog
  const blogPosts = [
    {
      id: 1,
      title: 'Blog ',
      excerpt: 'Fique atualizado sobre o mercado de Postos de combustíveis no Brasil.',
      author: 'Equipe LUKOS',
      date: 'Blog LUKOS',
      readTime: 'Blog   ',
      category: 'Blog LUKOS',
      image: 'https://images.pexels.com/photos/4472873/pexels-photo-4472873.jpeg',
      link: '/blog-posts',
    },
    {
      id: 2,
      title: 'IA da LUKOS',
      excerpt: 'A Inteligência Artificial está revolucionando a gestão de postos de combustível.',
      author: 'Equipe LUKOS',
      date: 'IA da LUKOS',
      readTime: 'IA da LUKOS',
      category: 'IA da LUKOS',
      image: 'https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/ia',
    },
    {
      id: 3,
      title: 'Sobre nós',
      excerpt: 'Conheça a LUKOS Tecnologia e sua equipe de especialistas.',
      author: 'Equipe LUKOS',
      date: 'Sobre nós',
      readTime: 'Sobre nós',
      category: 'Sobre nós',
      image: 'https://lukos.com.br/wp-content/uploads/2025/01/BANNER-HOME-1.png',
      link: '/Nova-pagina',
    },
    {
      id: 4,
      title: 'Equipe CS LUKOS',
      excerpt: 'Conheça a equipe de especialistas da LUKOS Tecnologia.',
      author: 'Equipe LUKOS',
      date: 'Equipe CS LUKOS',
      readTime: 'Equipe CS LUKOS',
      category: 'Equipe CS LUKOS',
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/equipe',
    },
    {
      id: 5,
      title: 'Serviços LUKOS',
      excerpt: 'Conheça os serviços oferecidos pela LUKOS Tecnologia.',
      author: 'Equipe LUKOS',
      date: 'Serviços LUKOS',
      readTime: 'Serviços LUKOS',
      category: 'Serviços LUKOS',
      image: 'https://images.unsplash.com/photo-1602665742701-389671bc40c0?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/servicos',
    },
    
  ];

  return (
    <div className="bg-white min-h-screen" style={{ marginTop: 0, paddingTop: 0 }}>
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.8);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        @media screen and (max-width: 1440px) {
          /* Estilos para telas com largura máxima de 1440px */
        }
        @media screen and (min-width: 1441px) {
          #problemas .text-problemas {
            margin-left: -5vw !important;
          }
        }
        
        /* Ajuste da imagem de fundo para desktop */
        @media screen and (min-width: 1024px) {
          .hero-background {
            background-size: cover !important;
            background-position: center center !important;
            background-attachment: fixed;
          }
        }
      `}</style>
      
      {/* Hero Section - Estilo TOTVS Melhorado */}
      <section className="relative min-h-[750px] md:min-h-[900px] flex items-center" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* Navbar dentro do hero com fundo transparente */}
        <PageNavbar transparent={true} />
        
        {/* Background com imagem do profissional */}
        <div 
          className="hero-background absolute inset-0 bg-cover bg-center md:bg-contain lg:bg-cover"
          style={{
            backgroundImage: 'url("/banner.png")',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Filtro preto */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full max-w-7xl pt-[60px]"> 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Coluna Esquerda - Texto */}
            <div className="text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase font-bold mb-6 leading-tight">
               <div className="w-full max-w-3xl">
                <p className="m-0 mt-0 mb-0 text-3xl border-0 w-full max-w-3xl text-start box-border translate-x-0 translate-y-0 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100" style={{fontFamily: 'TOTVS !important'}}>
                 Lukos tecnologia para postos de combustível
                </p></div>
              </h1>
              
              <div className="text-lg md:text-xl lg:text-2xl text-white mb-8 leading-relaxed" style={{maxWidth: '560px'}}>
                <p className="w-full max-w-3xl text-start">
                Com mais de 10 anos de experiência, a LUKOS tecnologia transforma a gestão de postos de combustíveis e lojas de conveniência.
                </p>
              </div>
            
            </div>
            
           

        
          </div>
        </div>
      </section>

      {/* Seção: Recursos e Benefícios - Estilo Moderno */}
      <section className="py-16 md:py-24 relative" style={{ backgroundColor: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda - Texto */}
            <div className="space-y-8">
              {/* Títulos com navegação */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white relative pb-2">
                  <span className="relative">
                    Para Gestores
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#c44cf4] to-[#8b5cf6]"></span>
                  </span>
                </h2>
                <h3 className="text-xl md:text-2xl font-medium text-gray-400">
                  Para Operadores
                </h3>
              </div>

              {/* Lista de Recursos Numerados */}
              <div className="space-y-8">
                {/* Recurso 1 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-4">
                    <span className="text-gray-500 text-lg font-light">.01</span>
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        Plataforma Completa
                      </h4>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Sistema completo de gestão empresarial, análise em tempo real e estatísticas detalhadas. Interface intuitiva, integração com API e automação de processos para postos de combustível.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recurso 2 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-4">
                    <span className="text-gray-500 text-lg font-light">.02</span>
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        Redução de Custos
                      </h4>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Condições vantajosas para nossos parceiros, redução de custos operacionais acima da média do mercado, otimização de processos e aumento da rentabilidade do seu negócio.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recurso 3 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-4">
                    <span className="text-gray-500 text-lg font-light">.03</span>
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        Suporte 24/7
                      </h4>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Suporte amigável sempre disponível, ajudamos a configurar o sistema, escolher as melhores funcionalidades e sugerir estratégias para maximizar seus resultados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Imagem */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop" 
                  alt="Profissional trabalhando" 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-[90px] flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/6803551/pexels-photo-6803551.jpeg" 
                alt="Inteligência Artificial" 
                className="w-full h-[800px] object-cover shadow-lg brightness-90 relative " 
              />
              
              {/* Scroll SVG */}
              <div className="scroll scroll-gray-new">
                <a href="#">
                  <svg 
                    version="1.1" 
                    id="Layer_1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    x="0px" 
                    y="0px" 
                    viewBox="0 0 505.7 70.1" 
                    style={{enableBackground: 'new 0 0 505.7 70.1'}} 
                    xmlSpace="preserve"
                  >
                    <title>curve-hollow-grey-out</title>
                    <path 
                      className="d-block" 
                      d="M351,32.6c-55.9,30.1-71.4,32.7-98.2,32.7s-42.3-2.6-98.2-32.7S28,0,28,0H0v70.1h28h449.6h28.1V0h-28.1C477.6,0,407,2.5,351,32.6z"
                    />
                  </svg>
                </a>
              </div>
               <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-8 px-8 md:px-16 w-full h-full">
                {/* Imagem LUKIA à esquerda */}
                <div className="flex-shrink-0 hidden md:block">
                  <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0885-1.png" alt="LUKIA" className="w-full max-w-[500px] h-auto object-contain opacity-100 relative" />
                </div>
                
                {/* Texto à direita */}
                <div className="flex-1 flex flex-col items-center  justify-center gap-4 w-[500px] h-[500px]">
                  <h2 className="text-white text-4xl md:text-6xl font-bold text-left drop-shadow-lg">Conheça mais sobre a LUKOS</h2>
                  <p className="text-white/90 text-lg md:text-xl text-left leading-relaxed drop-shadow-md">
                  Com mais de 10 anos de experiência, a LUKOS tecnologia transforma a gestão de postos de combustíveis e lojas de conveniência com soluções completas e personalizadas. Nosso ERP eficiente é a escolha de centenas de empresas, otimizando milhões de transações mensais com segurança e precisão.


                  </p>
                </div>
              </div>
              

              
              
            </section>
             
      {/* Seção: Seu Posto Automatizado por IA */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#100e26' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Centralizado */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              <span className="block">SEU POSTO</span>
              <span className="block">AUTOMATIZADO POR <span className="text-[#c44cf4]">IA</span></span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Seu posto mais eficiente com IA: automação, redução de custos e decisões mais rápidas.
            </p>
          </div>

          {/* Container do Infográfico */}
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Coluna Central - Logo LUKOS */}
              <div className="relative flex items-center justify-center order-1 lg:order-2">
                <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                {/* Efeito glow animado com múltiplas camadas - Mais roxo */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-purple-600/50 to-purple-500/50 blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/40 via-purple-500/40 to-purple-700/40 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                
                {/* Anel rotativo externo - Dados/Neural - Mais roxo */}
                <div className="absolute inset-0 border-2 border-transparent rounded-full" style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.5), transparent, rgba(192, 132, 252, 0.5), transparent, rgba(168, 85, 247, 0.5), transparent)',
                  animation: 'spin 8s linear infinite',
                  mask: 'radial-gradient(circle, transparent 40%, black 42%, black 58%, transparent 60%)',
                  WebkitMask: 'radial-gradient(circle, transparent 40%, black 42%, black 58%, transparent 60%)'
                }}></div>
                
                {/* Anel interno rotativo - Sentido contrário - Mais roxo */}
                <div className="absolute inset-4 border border-transparent rounded-full" style={{
                  background: 'conic-gradient(from 180deg, transparent, rgba(192, 132, 252, 0.6), transparent, rgba(168, 85, 247, 0.6), transparent, rgba(192, 132, 252, 0.6), transparent)',
                  animation: 'spin 6s linear infinite reverse',
                  mask: 'radial-gradient(circle, transparent 45%, black 47%, black 53%, transparent 55%)',
                  WebkitMask: 'radial-gradient(circle, transparent 45%, black 47%, black 53%, transparent 55%)'
                }}></div>
                
                {/* Partículas flutuantes de dados - Mais roxo */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        left: `${50 + 45 * Math.cos((i * 30) * Math.PI / 180)}%`,
                        top: `${50 + 45 * Math.sin((i * 30) * Math.PI / 180)}%`,
                        background: i % 3 === 0 ? 'rgba(132, 204, 22, 0.6)' : 'rgba(168, 85, 247, 0.9)',
                        boxShadow: `0 0 10px ${i % 3 === 0 ? 'rgba(132, 204, 22, 0.8)' : 'rgba(168, 85, 247, 1)'}`,
                        animation: `float-${i} 3s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Efeito de scan/holograma - Roxo */}
                <div className="absolute inset-0 opacity-30" style={{
                  background: 'linear-gradient(0deg, transparent 0%, rgba(168, 85, 247, 0.5) 50%, transparent 100%)',
                  animation: 'scan 4s linear infinite',
                  clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 20%)'
                }}></div>
                
                {/* Logo Circular com efeito 3D e glitch sutil */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full" style={{
                    transform: 'perspective(1000px) rotateY(0deg)',
                    animation: 'float-3d 6s ease-in-out infinite'
                  }}>
                    <img 
                      src="/logo.png" 
                      alt="LUKOS Logo" 
                      className="w-full h-full object-contain relative z-10"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 1)) drop-shadow(0 0 40px rgba(192, 132, 252, 0.9)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.7)) drop-shadow(0 0 25px rgba(132, 204, 22, 0.6))',
                        animation: 'glow-pulse 3s ease-in-out infinite, subtle-glitch 8s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Efeito de profundidade - Sombra holográfica */}
                    <div className="absolute inset-0 w-full h-full object-contain opacity-20 blur-xl" style={{
                      backgroundImage: 'url(/logo.png)',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      transform: 'translateZ(-50px) scale(1.1)',
                      filter: 'blur(20px)'
                    }}></div>
                  </div>
                </div>
                
                {/* Linhas de conexão neural ao redor */}
                <svg className="absolute inset-0 w-full h-full opacity-40" style={{ pointerEvents: 'none' }}>
                  <defs>
                    <linearGradient id="neuralGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const radius = 45;
                    return (
                      <line
                        key={i}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + radius * Math.cos(angle)}%`}
                        y2={`${50 + radius * Math.sin(angle)}%`}
                        stroke="url(#neuralGradient1)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        style={{
                          animation: `neural-pulse 2s ease-in-out infinite`,
                          animationDelay: `${i * 0.25}s`
                        }}
                      />
                    );
                  })}
                </svg>
                
                {/* Partículas de energia pulsantes - Mais roxo */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 60) * Math.PI / 180;
                    const radius = 50;
                    return (
                      <div
                        key={`energy-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          left: `${50 + radius * Math.cos(angle)}%`,
                          top: `${50 + radius * Math.sin(angle)}%`,
                          background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgba(132, 204, 22, 0.8)' : 'rgba(168, 85, 247, 1)'}, transparent)`,
                          boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(132, 204, 22, 0.8)' : 'rgba(168, 85, 247, 1)'}`,
                          animation: `energy-pulse 2s ease-in-out infinite`,
                          animationDelay: `${i * 0.3}s`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                    );
                  })}
                </div>
                </div>
              </div>

              {/* Coluna Direita - Timeline Vertical */}
              <div className="relative order-3">
                {/* Linha vertical roxa */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-500"></div>
                
                <div className="space-y-12 pl-16">
                  {/* Step 1 - Análise de Dados */}
                  <div className="relative">
                    {/* Ícone circular na linha */}
                    <div className="absolute -left-10 top-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg z-10">
                      <BarChart3 className="text-white" size={20} />
                    </div>
                    
                    {/* Conteúdo */}
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Análise de Dados
                      </h4>
                      <p className="text-white/60 leading-relaxed text-base md:text-lg">
                        Processamento e interpretação de grandes volumes de dados em tempo real.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 - Machine Learning */}
                  <div className="relative">
                    {/* Ícone circular na linha */}
                    <div className="absolute -left-10 top-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg z-10">
                      <Brain className="text-white" size={20} />
                    </div>
                    
                    {/* Conteúdo */}
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Machine Learning
                      </h4>
                      <p className="text-white/60 leading-relaxed text-base md:text-lg">
                        Algoritmos que aprendem e melhoram continuamente com os dados.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 - Processamento de Linguagem Natural */}
                  <div className="relative">
                    {/* Ícone circular na linha */}
                    <div className="absolute -left-10 top-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg z-10">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    
                    {/* Conteúdo */}
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Processamento de Linguagem Natural
                      </h4>
                      <p className="text-white/60 leading-relaxed text-base md:text-lg">
                        Compreensão e geração de linguagem humana de forma inteligente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estilos de animação CSS */}
          <style>{`
            @keyframes float-3d {
              0%, 100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
              25% { transform: perspective(1000px) rotateY(5deg) rotateX(2deg); }
              50% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
              75% { transform: perspective(1000px) rotateY(-5deg) rotateX(-2deg); }
            }
            @keyframes glow-pulse {
              0%, 100% { filter: drop-shadow(0 0 30px rgba(168, 85, 247, 1)) drop-shadow(0 0 40px rgba(192, 132, 252, 0.9)) drop-shadow(0 0 25px rgba(132, 204, 22, 0.6)); }
              50% { filter: drop-shadow(0 0 50px rgba(168, 85, 247, 1)) drop-shadow(0 0 60px rgba(192, 132, 252, 1)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 30px rgba(132, 204, 22, 0.5)); }
            }
            @keyframes subtle-glitch {
              0%, 100% { transform: translate(0, 0); }
              98% { transform: translate(0, 0); }
              99% { transform: translate(-1px, 1px); }
            }
            @keyframes scan {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(400%); }
            }
            @keyframes neural-pulse {
              0%, 100% { opacity: 0.3; stroke-dashoffset: 0; }
              50% { opacity: 0.8; stroke-dashoffset: -8; }
            }
            @keyframes energy-pulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
              50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
            }
            ${[...Array(12)].map((_, i) => `
              @keyframes float-${i} {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(${Math.cos(i * 30 * Math.PI / 180) * 10}px, ${Math.sin(i * 30 * Math.PI / 180) * 10}px) scale(1.2); }
              }
            `).join('')}
          `}</style>
        </div>
      </section>

      {/* Seção: O que é LUKOS (Fundo Roxo) */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#c44cf4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                O QUE É A LUKOS?
            </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                Bem-vindo à plataforma LUKOS que vai redefinir sua experiência de gestão! Com mais de 10 anos de experiência, transformamos a gestão de postos de combustíveis e lojas de conveniência com soluções completas e personalizadas. Junte-se a centenas de empresas que confiam na LUKOS!
            </p>
              <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                SAIBA MAIS
              </button>
          </div>

            {/* Coluna Direita - Benefícios */}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">BENEFÍCIOS</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-white/90 text-lg">Nosso sistema é totalmente responsivo e funciona perfeitamente em qualquer dispositivo!</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-white/90 text-lg">Soluções completas de gestão empresarial para postos de combustível e lojas de conveniência.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-white/90 text-lg">Suporte premium e suporte ao vivo. Todas as suas dúvidas resolvidas rapidamente pela nossa equipe!</p>
                </li>
              </ul>
        </div>
      </div>
        </div>
      </section>

      {/* Seção do Vídeo */}
      <div 
        className="h-[700px] relative bg-gradient-to-br from-[#690093] via-[#5a008f] to-[#4a007a]"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/1200x/ab/d9/c4/abd9c48d4eb80e27af7efe3042853e6d.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay com gradiente para melhorar legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#690093]/80 via-[#5a008f]/80 to-[#4a007a]/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[50px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            Transforme a gestão do seu posto de combustível
          </h2> 
            
            {/* Vídeo */}
            <div className="mt-12 max-w-4xl mx-auto group">
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-3xl"
                  src="https://www.youtube.com/embed/F_itCCQd0nk"
                  title="Vídeo LUKOS"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
        </div>
      </div>

           
           
           

      {/* End Features */}
        
      {/* Seção How it works */}
      <section id="timeline" className="py-20 md:py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Coluna Esquerda - Título, Descrição e Botão */}
            <div className="sticky top-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-left">
                Como Funciona
              </h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed text-left mb-8">
                Seu site, construído por um Especialista LUKOS e lançado em um{' '}
                <a href="#pricing" className="text-blue-400 hover:text-blue-300 underline">
                  plano Scale
                </a>
                , pronto para crescer com você.
              </p>
              <a 
                href="#kickoff" 
                className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Agendar Kickoff
              </a>
            </div>

            {/* Coluna Direita - Timeline Vertical */}
            <div className="relative">
              {/* Linha vertical azul */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-500"></div>
              
              <div className="space-y-12 pl-16">
                {/* Step 1 - Análise de Dados */}
                <div className="relative">
                  {/* Ícone circular na linha */}
                  <div className="absolute -left-10 top-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-950 shadow-lg z-10">
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  
                  {/* Conteúdo */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-sm font-light">.01</span>
                      <h4 className="text-2xl md:text-3xl font-bold text-white">
                        Análise de Dados
                      </h4>
                    </div>
                    <p className="text-white/60 leading-relaxed text-base md:text-lg">
                      Processamento e interpretação de grandes volumes de dados em tempo real.
                    </p>
                  </div>
                </div>

                {/* Step 2 - Machine Learning */}
                <div className="relative">
                  {/* Ícone circular na linha */}
                  <div className="absolute -left-10 top-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-950 shadow-lg z-10">
                    <Brain className="text-white" size={20} />
                  </div>
                  
                  {/* Conteúdo */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-sm font-light">.02</span>
                      <h4 className="text-2xl md:text-3xl font-bold text-white">
                        Machine Learning
                      </h4>
                    </div>
                    <p className="text-white/60 leading-relaxed text-base md:text-lg">
                      Algoritmos que aprendem e melhoram continuamente com os dados.
                    </p>
                  </div>
                </div>

                {/* Step 3 - Processamento de Linguagem Natural */}
                <div className="relative">
                  {/* Ícone circular na linha */}
                  <div className="absolute -left-10 top-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-950 shadow-lg z-10">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                  
                  {/* Conteúdo */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-sm font-light">.03</span>
                      <h4 className="text-2xl md:text-3xl font-bold text-white">
                        Processamento de Linguagem Natural
                      </h4>
                    </div>
                    <p className="text-white/60 leading-relaxed text-base md:text-lg">
                      Compreensão e geração de linguagem humana de forma inteligente.
                    </p>
                  </div>
                </div>

                {/* Step 4 - Visão Computacional */}
                <div className="relative">
                  {/* Ícone circular na linha */}
                  <div className="absolute -left-10 top-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-950 shadow-lg z-10">
                    <Eye className="text-white" size={20} />
                  </div>
                  
                  {/* Conteúdo */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-sm font-light">.04</span>
                      <h4 className="text-2xl md:text-3xl font-bold text-white">
                        Visão Computacional
                      </h4>
                    </div>
                    <p className="text-white/60 leading-relaxed text-base md:text-lg">
                      Reconhecimento e análise de imagens e vídeos automatizados.
                    </p>
                  </div>
                </div>

                {/* Step 5 - Habilidade Técnica */}
                <div className="relative">
                  {/* Ícone circular na linha */}
                  <div className="absolute -left-10 top-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-950 shadow-lg z-10">
                    <Cpu className="text-white" size={20} />
                  </div>
                  
                  {/* Conteúdo */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-sm font-light">.05</span>
                      <h4 className="text-2xl md:text-3xl font-bold text-white">
                        Habilidade Técnica
                      </h4>
                    </div>
                    <p className="text-white/60 leading-relaxed text-base md:text-lg">
                      Domínio técnico em sistemas e tecnologias avançadas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Continua */}
      <div className="">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-col">


          {/* Seção de Blog Posts */}
         

          {/* Call to Action */}
       
        </div>
      </div>
    </div>
  );
}

export default BlogPage;




