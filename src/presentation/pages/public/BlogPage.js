import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, User, ArrowRight, ArrowDown, BookOpen, Tag, FileText, Cloud,
  CreditCard, Gift, Smartphone, Wallet, Receipt, ShoppingCart, BarChart3, Database,
  Package, DollarSign, TrendingUp, ChevronLeft, ChevronRight, HelpCircle, ChevronDown,
  ChevronUp, CheckCircle, ArrowUp, Percent, MessageCircle, Play, X, Rocket, Users,
  Edit, Zap, Brain, Cpu, Eye, ShieldCheck, Users2, CheckCircle2, LineChart, Target,
  Sparkles, PieChart, Lock, Activity, Instagram, Facebook, Youtube, Mail, Phone,
  MapPin, MessageSquare, LayoutDashboard
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
    { id: 'o-que-e-lukos', label: 'Benefícios' },
    { id: 'blog-preview', label: 'Novidades' }
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


        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-8xl pt-[40px]">
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
          className="absolute bottom-0 left-0 right-0 z-20 bg-[#82aa7a] py-8 rounded-t-[20px] lg:py-[-40px]"
        >
          <a
            href="#sobre"
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <span className="text-white text-lg md:text-2xl lg:text-2xl font-black uppercase leading-tight mb-12 tracking-[0.1em] drop-shadow-2xl max-w-sm md:max-w-none">
              Conheça mais sobre a Lukos
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all animate-bounce">
              <ChevronDown className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            </div>
          </a>
        </motion.div>
      </section>








      <section id="funcionalidades" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/6803551/pexels-photo-6803551.jpeg"
            alt="Inteligência Artificial Background"
            className=""
          />

        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <div className="flex flex-col items-center justify-center">

            {/* Card de Texto com Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full max-w-[850px] backdrop-blur-xl bg-black/50 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] text-center"
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












      <section id="ia" className="relative min-h-screen flex items-center overflow-hidden" style={{ scrollSnapAlign: 'start', background: 'linear-gradient(135deg, #0a0a0f 0%, #13131f 50%, #0a0a0f 100%)' }}>
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
                {/* Glow Central - Equilibrado */}


                {/* Anéis Orbitais - Mais Definidos */}
                <div className="absolute inset-0 border border-white/10 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.25)]" style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
                  animation: 'spin 15s linear infinite',
                  mask: 'radial-gradient(circle, transparent 58%, black 60%, black 62%, transparent 64%)',
                  WebkitMask: 'radial-gradient(circle, transparent 58%, black 60%, black 62%, transparent 64%)'
                }}></div>
                <div className="absolute inset-12 border border-white/10 rounded-full shadow-[0_0_25px_rgba(196,76,244,0.25)]" style={{
                  background: 'conic-gradient(from 180deg, transparent, rgba(196, 76, 244, 0.5), transparent)',
                  animation: 'spin 10s linear infinite reverse',
                  mask: 'radial-gradient(circle, transparent 58%, black 60%, black 62%, transparent 64%)',
                  WebkitMask: 'radial-gradient(circle, transparent 58%, black 60%, black 62%, transparent 64%)'
                }}></div>



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
                    className="w-full h-full object-contain "
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
      <section id="solucoes-lista" className="py-20 relative overflow-hidden" style={{ scrollSnapAlign: 'start', background: 'linear-gradient(135deg, #0a0a12 0%, #12121a 50%, #0a0a12 100%)' }}>
        {/* Efeitos de luz de fundo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/8 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#82aa7a]/6 blur-[120px] rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#a78bfa] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block"
            >
              NOSSOS DIFERENCIAIS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white"
            >
              Soluções para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#c44cf4] to-[#8B5CF6]">potencializar</span> seu negócio
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Faturamento Express", description: "Visualize recebimentos reais, taxas e descontos, otimizando o tempo da sua equipe.", icon: TrendingUp, highlighted: false },
              { title: "Banco de Dados na Nuvem", description: "Suas informações com segurança e acesso remoto.", icon: Cloud, highlighted: false },
              { title: "Conciliação de Cartões", description: "Visualize recebimentos reais, taxas e descontos, otimizando o tempo da sua equipe.", icon: CreditCard, highlighted: false },
              { title: "Programa Fidelidade", description: "Crie vínculo com seus clientes, oferecendo descontos exclusivos utilizando o Whatsapp", icon: MessageCircle, highlighted: true },
              { title: "PDV Móvel", description: "Receba pagamentos com segurança e agilidade, sem o cliente sair do carro!", icon: Smartphone, highlighted: false },
              { title: "Carteiras Digitais & Cripto", description: "Recebimento por Carteiras Digitais e Criptomoedas. Inovação em pagamentos.", icon: Wallet, highlighted: false },
              { title: "Fatura Web", description: "Controle total de faturas e acesso, com liberação e bloqueio de placas para abastecimento.", icon: FileText, highlighted: false },
            ].map((solucao, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`group p-6 rounded-2xl transition-all duration-300 flex flex-col items-start text-left ${solucao.highlighted
                  ? 'bg-gradient-to-br from-[#8B5CF6] to-[#7c4dff] hover:from-[#7c4dff] hover:to-[#6d3de8]'
                  : 'bg-[#16161c] hover:bg-[#1e1e26] border border-[#2a2a35] hover:border-[#8B5CF6]/30'
                  }`}
              >
                {/* Icon */}
                <div className={`mb-5 p-3 rounded-xl ${solucao.highlighted
                  ? 'bg-white/20'
                  : 'bg-[#8B5CF6]/10 border border-[#8B5CF6]/20'
                  }`}>
                  <solucao.icon className={`w-6 h-6 ${solucao.highlighted ? 'text-white' : 'text-[#a78bfa]'
                    }`} />
                </div>

                <h3 className={`text-lg font-bold mb-3 ${solucao.highlighted ? 'text-white' : 'text-white'
                  }`}>
                  {solucao.title}
                </h3>

                <p className={`text-sm leading-relaxed ${solucao.highlighted ? 'text-white/90' : 'text-gray-400'
                  }`}>
                  {solucao.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Nossos Sistemas (Estilo Game Cards) */}
      <section id="sistemas" className="py-24 relative overflow-hidden" style={{ scrollSnapAlign: 'start', background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0a0a0f 100%)' }}>
        {/* Background Grid Pattern just for texture */}
        <div className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
        </div>
        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#a78bfa] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block"
            >
              TECNOLOGIA DE PONTA
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ecossistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4]">LUKOS</span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Soluções integradas para gestão completa do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systems.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[360px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#8B5CF6]/50 transition-all duration-500 bg-[#16161c] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img
                    src={system.image}
                    alt={system.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'; // Hide if fails
                    }}
                  />
                  {/* Fallback pattern if image fails or while loading */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.1)_0%,_transparent_70%)] opacity-50" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Active/Hover Glow Effect (Blue/Purple line at bottom) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B5CF6] to-[#c44cf4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_20px_rgba(139,92,246,0.8)]" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Top Quote Icon or Tag */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Date/Tag Line */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#8B5CF6] text-[10px] font-black tracking-widest uppercase bg-[#8B5CF6]/10 px-2 py-1 rounded border border-[#8B5CF6]/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                        SISTEMA
                      </span>
                      <span className="text-white/40 text-[10px] font-medium uppercase tracking-wider group-hover:text-white/60 transition-colors">
                        {system.id}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-[#a78bfa] transition-colors uppercase tracking-tight">
                      {system.name}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed group-hover:text-white/90 transition-colors duration-300 font-medium border-l-2 border-transparent group-hover:border-[#8B5CF6] pl-0 group-hover:pl-3">
                      {system.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/sistemas"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#8B5CF6] font-bold text-sm tracking-widest uppercase transition-colors group"
            >
              VER TODOS OS SISTEMAS
              <span className="group-hover:translate-x-1 transition-transform">&gt;&gt;&gt;</span>
            </Link>
          </div>
        </div>
      </section>







      {/* Seção: Blog / Updates - Premium Style */}
      <section id="blog-preview" className="py-24 relative overflow-hidden" style={{ scrollSnapAlign: 'start', background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0a0a0f 100%)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#8B5CF6] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block"
            >
              Fique por Dentro
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-white uppercase mb-4"
            >
              Novidades <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c44cf4] to-[#8B5CF6]">LUKOS</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-[#16161c] border border-white/5 hover:border-[#8B5CF6]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161c] to-transparent opacity-60 z-10" />
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-white/20" />
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/20 backdrop-blur-md border border-[#8B5CF6]/30 text-[#a78bfa] text-xs font-bold uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-gray-500 text-xs font-medium mb-3 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#a78bfa] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>


                  <Link
                    to={post.link}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm uppercase tracking-wide group/link"
                  >
                    Ler artigo
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 hover:border-[#8B5CF6]/50 bg-white/5 hover:bg-[#8B5CF6]/10 text-white font-bold transition-all"
            >
              VER TODOS OS POSTS
            </Link>
          </div>
        </div>
      </section>

      {/* Seção: FAQ (Dúvidas Frequentes) */}
      <section id="faq" className="py-24 relative overflow-hidden" style={{ scrollSnapAlign: 'start', background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0a0a0f 100%)' }}>
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
        </div>

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




