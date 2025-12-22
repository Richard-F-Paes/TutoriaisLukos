import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, User, ArrowRight, ArrowDown, BookOpen, Tag, FileText, Cloud,
  CreditCard, Gift, Smartphone, Wallet, Receipt, ShoppingCart, BarChart3, Database,
  Package, DollarSign, TrendingUp, ChevronLeft, ChevronRight, HelpCircle, ChevronDown,
  ChevronUp, CheckCircle, ArrowUp, Percent, MessageCircle, Play, X, Rocket, Users,
  Edit, Zap, Brain, Cpu, Eye, ShieldCheck, Users2, CheckCircle2, LineChart, Target,
  Sparkles, PieChart, Lock, Activity, Instagram, Facebook, Youtube, Mail, Phone,
  MapPin, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoShowcase from '../../components/custom/VideoShowcase/VideoShowcase';
import BentoGrid from '../../components/custom/BentoGrid/BentoGrid';
// Componente Feature2 adaptado
const Feature2 = ({
  title = "Conheça mais sobre a LUKOS",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "https://lukos.com.br/wp-content/uploads/2025/01/BANNER-HOME-1.png",
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

  // Ref para o container de scroll
  const containerRef = useRef(null);

  // Estado para controlar modal de vídeo
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Estado para botão Scroll to Top
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
      image: '',
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

  // Stats for Hero
  const stats = [
    {
      value: "10+",
      label: "Anos de Experiência",
      description: "Liderando a inovação em tecnologia para postos.",
      icon: ShieldCheck
    },
    {
      value: "1500+",
      label: "Postos Atendidos",
      description: "Presença consolidada nacional.",
      icon: Users2
    },
    {
      value: "24/7",
      label: "Suporte Especializado",
      description: "Atendimento de alta performance.",
      icon: CheckCircle2
    }
  ];

  // Seções para DotNavigation
  const pageSections = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'funcionalidades', label: 'Funcionalidades' },
    { id: 'ia', label: 'IA Lukos' },
    { id: 'sistemas', label: 'Nossos Sistemas' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'automacao', label: 'Automação' },
    { id: 'o-que-e-lukos', label: 'Benefícios' }
  ];

  return (
    <div
      ref={containerRef}
      className="bg-[#0a0a0f] h-screen overflow-y-auto text-white scroll-smooth scrollbar-hide"
      style={{
        marginTop: 0,
        paddingTop: 0,
        scrollSnapType: 'y mandatory',
        scrollPaddingTop: '80px',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none' /* IE and Edge */
      }}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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
        
        /* Animação de brilho para borda superior */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.2);
          }
        }
        
        /* Gradiente radial */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        /* Animação de neon flicker */
        @keyframes neon-flicker {
          0%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 10px rgba(168, 85, 247, 0.8),
              0 0 20px rgba(168, 85, 247, 0.6),
              0 0 30px rgba(168, 85, 247, 0.4),
              0 0 40px rgba(168, 85, 247, 0.3),
              0 0 70px rgba(168, 85, 247, 0.2),
              0 0 100px rgba(168, 85, 247, 0.1);
          }
          50% {
            opacity: 0.9;
            text-shadow: 
              0 0 5px rgba(168, 85, 247, 0.6),
              0 0 10px rgba(168, 85, 247, 0.4),
              0 0 15px rgba(168, 85, 247, 0.3),
              0 0 20px rgba(168, 85, 247, 0.2),
              0 0 35px rgba(168, 85, 247, 0.1),
              0 0 50px rgba(168, 85, 247, 0.05);
          }
        }
      `}</style>

      {/* Hero Section - Estilo TOTVS Melhorado */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]" style={{ marginTop: 0, paddingTop: 0, scrollSnapAlign: 'start' }}>
        {/* Banner Image - W-Full Background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("imagemdefundo.png")',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>

        {/* Subtle gradient to maintain text readability without a dark background */}


        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl pt-[80px]">
          <div className="flex flex-col items-start gap-12">
            {/* Left Side: Content */}
            <div className="max-w-2xl text-left">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="block text-purple-400/80 font-bold tracking-[0.3em] uppercase mb-4 text-[10px] md:text-sm"
              >

              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] mb-8 tracking-[0.05em] drop-shadow-2xl"
              >
                <br />
                <span className="text-[#8B5CF6] drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  LUKOS
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#a78bfa] text-lg md:text-2xl lg:text-2xl font-black uppercase leading-tight mb-12 tracking-[0.1em] drop-shadow-2xl max-w-sm md:max-w-none"
              >
                Potencialize a gestão do seu posto de combustível com a
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-12 w-full sm:w-auto"
              >
                <Link
                  to="/contato"
                  className="inline-flex items-center justify-center bg-[#85a97d] hover:bg-[#76986e] text-white font-semibold rounded-xl px-10 h-14 text-lg transition-all active:scale-95 shadow-lg shadow-black/10 w-full sm:w-auto text-center"
                >
                  Falar com Especialista
                </Link>

                {/* Botão Scroll Down Explícito */}
                <a
                  href="#sobre"
                  className="inline-flex items-center justify-center text-white/60 hover:text-white font-medium transition-all group"
                >
                  Saiba mais
                  <ArrowDown className="ml-2 w-4 h-4 animate-bounce group-hover:text-[#8B5CF6]" />
                </a>
              </motion.div>

              {/* Stats List - Horizontal layout for desktop */}


            </div>
          </div>
        </div>


        {/* Scroll Down Indicator - Centered at bottom with green background */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-20 bg-[#82aa7a] py-8"
        >
          <a
            href="#sobre"
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <span className="text-white text-xs font-bold tracking-[0.15em] uppercase group-hover:text-white/80 transition-colors">
              Conheça mais sobre a Lukos
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all animate-bounce">
              <ChevronDown className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            </div>
          </a>
        </motion.div>
      </section>




      <section id="sobre" className="relative min-h-screen py-24 bg-[#82aa7a] overflow-hidden rounded-b-[20px]" style={{ scrollSnapAlign: 'start' }}>
        {/* Scroll Indicator - Top Center */}


        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left */}
            <div className="flex-1 max-w-2xl">


              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter"
              >
                Sobre a  <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                  LUKOS
                </span>
              </motion.h2>


              {/* Stats */}
              {/* Stats */}


            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex-1 relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10 animate-pulse" />


            </motion.div>
          </div>



        </div>
        <a href="#funcionalidades" className="absolute top-[250px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block pt-[120px]">
          <div className="w-16 h-16 rounded-full bg-[#82aa7a] border-4 border-white flex items-center justify-center animate-bounce shadow-xl hover:scale-110 transition-transform cursor-pointer">
            <ChevronDown className="text-white w-8 h-8" />
          </div>
        </a>
      </section>







      <section id="funcionalidades" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/6803551/pexels-photo-6803551.jpeg"
            alt="Inteligência Artificial Background"
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f] opacity-80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <div className="flex flex-col items-center justify-center">

            {/* Card de Texto com Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full max-w-[850px] backdrop-blur-xl bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] text-center"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-6 tracking-tighter">
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4]">
                  SOBRE A LUKOS
                </span>
              </h2>

              <div className="w-20 h-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4] mx-auto mb-8 rounded-full"></div>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium">
                Com mais de <span className="text-white font-bold">10 anos de experiência</span>, a LUKOS tecnologia transforma a gestão de postos de combustíveis e lojas de conveniência com soluções completas e personalizadas.
                <br /><br />
                Nosso <span className="text-[#8B5CF6] font-bold">ERP eficiente</span> é a escolha de centenas de empresas, otimizando milhões de transações mensais com segurança e precisão absoluta.
              </p>

              <motion.div
                className="mt-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="#sistemas"
                  className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7c4dff] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-purple-500/20"
                >
                  Ver Nossas Soluções
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>












      <section id="ia" className="relative min-h-screen flex items-center bg-[#0a0a0f] overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        {/* Background Decorative Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-purple-800/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10 py-10 md:py-20">
          {/* Título Restaurado */}
          <div className="text-center mb-12 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-8 h-[2px] bg-[#8B5CF6]"></div>
              <span className="text-[#8B5CF6] font-black tracking-[0.3em] uppercase text-xs">
                NOSSOS DIFERENCIAIS
              </span>
              <div className="w-8 h-[2px] bg-[#8B5CF6]"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-tight tracking-tighter mb-6"
            >
              SEU POSTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4]">
                AUTOMATIZADO POR IA
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#a78bfa] text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Seu posto mais eficiente com IA: automação, redução de custos e decisões mais rápidas.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Coluna Esquerda: Logo Orbital */}
            <div className="relative flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] flex items-center justify-center">
                {/* Glow Central */}
                <div className="absolute inset-0 bg-purple-600/30 blur-[60px] md:blur-[100px] animate-pulse"></div>

                {/* Anéis Orbitais */}
                <div className="absolute inset-0 border-2 border-transparent rounded-full shadow-[0_0_50px_rgba(139,92,246,0.2)]" style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.4), transparent)',
                  animation: 'spin 10s linear infinite',
                  mask: 'radial-gradient(circle, transparent 48%, black 50%, black 52%, transparent 54%)',
                  WebkitMask: 'radial-gradient(circle, transparent 48%, black 50%, black 52%, transparent 54%)'
                }}></div>
                <div className="absolute inset-8 border border-transparent rounded-full shadow-[0_0_30px_rgba(196,76,244,0.2)]" style={{
                  background: 'conic-gradient(from 180deg, transparent, rgba(196, 76, 244, 0.4), transparent)',
                  animation: 'spin 7s linear infinite reverse',
                  mask: 'radial-gradient(circle, transparent 48%, black 50%, black 52%, transparent 54%)',
                  WebkitMask: 'radial-gradient(circle, transparent 48%, black 50%, black 52%, transparent 54%)'
                }}></div>

                {/* Partículas */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                      style={{
                        left: `${50 + 40 * Math.cos((i * 45) * Math.PI / 180)}%`,
                        top: `${50 + 40 * Math.sin((i * 45) * Math.PI / 180)}%`,
                        animation: `pulse 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>

                {/* Logo Central */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64"
                >
                  <img
                    src="logo.png"
                    alt="LUKOS IA Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                  />
                </motion.div>
              </div>
            </div>

            {/* Coluna Direita: Timeline de Features */}
            <div className="relative pl-8 md:pl-20 order-1 lg:order-2">
              {/* Linha Vertical */}
              <div className="absolute left-0 lg:left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent opacity-40"></div>

              <div className="space-y-16">
                {[
                  {
                    title: "FIDELIDADE",
                    subtitle: "Programa de fidelidade",
                    description: "Com identificação pela placa do veículo e ofertas personalizadas.",
                    icon: Users
                  },
                  {
                    title: "INTELIGÊNCIA",
                    subtitle: "Gestão completa do seu posto",
                    description: "Troca de preço de combustível, resumo de caixa, comparativo de vendas, resultados operacionais, nível dos tanques, top 10 produtos, top 10 vendedores e muito mais!",
                    icon: LineChart,
                    link: "saiba mais"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Indicador na Linha */}
                    <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.5)] z-20 group-hover:scale-125 transition-transform duration-300"></div>

                    {/* Conteúdo */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                          <item.icon className="w-6 h-6 text-[#8B5CF6]" />
                        </div>
                        <div>
                          <span className="text-[#8B5CF6] font-black text-xs tracking-widest uppercase">{item.title}</span>
                          <h3 className="text-white text-2xl md:text-3xl font-bold">{item.subtitle}</h3>
                        </div>
                      </div>
                      <p className="text-white/60 text-lg leading-relaxed max-w-lg mt-2 pl-2 border-l border-white/5 group-hover:border-purple-500/30 transition-all">
                        {item.description}
                        {item.link && (
                          <Link to="/ia" className="text-[#8B5CF6] hover:text-[#c44cf4] ml-2 font-bold underline decoration-2 underline-offset-4 transition-colors lowercase">
                            {item.link}
                          </Link>
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>




















      {/* Seção: Soluções para potencializar seu negócio */}
      <section id="solucoes-lista" className="py-24 bg-[#0a0a0f] relative overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        {/* Modern Mesh Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#8B5CF6]/15 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#c44cf4]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.05)_0%,_transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#a78bfa] font-black tracking-[0.4em] uppercase text-xs md:text-sm mb-4 block"
            >
              NOSSOs DIFERENCIAIS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
            >
              SOLUÇÕES PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4]">POTENCIALIZAR</span> SEU NEGÓCIO
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Faturamento Express", description: "Visualize recebimentos reais, taxas e descontos, otimizando o tempo da sua equipe.", icon: TrendingUp },
              { title: "Banco de Dados na Nuvem", description: "Suas informações com segurança e acesso remoto.", icon: Cloud },
              { title: "Conciliação de cartões", description: "Visualize recebimentos reais, taxas e descontos, otimizando o tempo da sua equipe.", icon: CreditCard },
              { title: "Programa Fidelidade", description: "Crie vínculo com seus clientes, oferecendo descontos exclusivos utilizando o Whatsapp", icon: MessageCircle },
              { title: "PDV Móvel", description: "Receba pagamentos com segurança e agilidade, sem o cliente sair do carro!", icon: Smartphone },
              { title: "Carteiras Digitais & Cripto", description: "Recebimento por Carteiras Digitais e Criptomoedas. Inovação em pagamentos.", icon: Wallet },
              { title: "Fatura Web", description: "Controle total de faturas e acesso, com liberação e bloqueio de placas para abastecimento.", icon: FileText },
            ].map((solucao, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[2.5rem] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-700 text-center flex flex-col items-center border border-white/5 hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md"
              >
                {/* Icon with Permanent Subtle Glow */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-2xl rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <solucao.icon className="w-12 h-12 text-[#a78bfa] group-hover:text-white transition-colors duration-500 relative z-10" />
                </div>

                <h3 className="text-white text-lg font-black uppercase tracking-[0.2em] mb-4 group-hover:text-[#a78bfa] transition-colors">
                  {solucao.title}
                </h3>

                {/* Separator Dot with Glow */}
                <div className="w-2 h-2 bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4] rounded-full mb-6 shadow-[0_0_15px_rgba(139,92,246,0.6)]"></div>

                <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium max-w-[280px]">
                  {solucao.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <motion.a
              href="#sistemas"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7c4dff] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-500/20"
            >
              CONHECER TODOS OS SISTEMAS
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </motion.a>
          </div>
        </div>
      </section>

      <section id="sistemas" className="min-h-screen flex items-center bg-[#0a0a0f]" style={{ scrollSnapAlign: 'start' }}>
        <BentoGrid />
      </section>

      {/* Seção: Recursos e Benefícios - Estilo Moderno */}
      <section id="recursos" className="py-16 md:py-24 min-h-screen relative flex items-center" style={{ backgroundColor: '#0a0a0f', scrollSnapAlign: 'start' }}>
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



      {/* Seção: Seu Posto Automatizado por IA */}
      <section id="automacao" style={{ backgroundColor: '#100e26', scrollSnapAlign: 'start' }}>
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
      <section id="o-que-e-lukos" className="py-24 min-h-screen relative overflow-hidden flex items-center" style={{ backgroundColor: '#0a0a0f', scrollSnapAlign: 'start' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#c44cf4]/10 to-transparent"></div>
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






      {/* Seção: FAQ (Dúvidas Frequentes) */}
      <section id="faq" className="py-24 bg-[#0a0a0f] relative overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">Dúvidas Frequentes</h2>
            <p className="text-[#a78bfa] text-lg max-w-2xl mx-auto">Tudo o que você precisa saber sobre a Lukos e como podemos transformar seu posto.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "A Lukos atende postos de bandeira branca?",
                a: "Sim! Atendemos tanto postos de bandeira (Petrobras, Ipiranga, Shell, etc) quanto postos de bandeira branca com a mesma excelência e ferramentas personalizadas."
              },
              {
                q: "O sistema funciona sem internet?",
                a: "Sim, nosso PDV possui contingência offline garantindo que suas vendas não parem mesmo se a internet oscilar. Os dados são sincronizados automaticamente assim que a conexão retorna."
              },
              {
                q: "Quanto tempo leva a implantação?",
                a: "A implantação padrão leva em média de 3 a 7 dias úteis, dependendo da complexidade e do número de bicos/PDVs. Nossa equipe cuida de todo o processo para você."
              },
              {
                q: "Existe integração com medidores de tanque?",
                a: "Sim! Temos integração nativa com os principais medidores de tanque do mercado, permitindo controle real do estoque e detecção de perdas diretamente no sistema."
              }
            ].map((item, index) => (
              <div key={index} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <span className="text-white font-bold text-lg">{item.q}</span>
                  <ChevronDown className={`text-[#8B5CF6] transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-white/70 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: CTA Final */}
      <section id="ctafinal" className="py-24 bg-[#0a0a0f] relative overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group">
            {/* Efeito de brilho fundo */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 leading-tight">Pronto para o próximo <br /> nível de gestão?</h2>
            <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-medium">Junte-se a centenas de postos que já automatizaram seus processos com a Lukos.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contato" className="bg-white text-[#8B5CF6] font-black py-5 px-10 rounded-2xl text-xl hover:scale-105 transition-transform shadow-2xl">
                FALAR COM ESPECIALISTA
              </Link>
              <button className="bg-transparent border-2 border-white/30 hover:border-white text-white font-black py-5 px-10 rounded-2xl text-xl transition-all">
                VER DEMONSTRAÇÃO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Botão Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.5 }}
        onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#8B5CF6] text-white shadow-2xl hover:bg-[#7c4dff] transition-all ${showScrollTop ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div >
  );
}

export default BlogPage;




