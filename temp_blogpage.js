import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag, FileText, Cloud, CreditCard, Gift, Smartphone, Wallet, Receipt, ShoppingCart, BarChart3, Database, Package, DollarSign, TrendingUp, ChevronLeft, ChevronRight, HelpCircle, ChevronDown, ChevronUp, CheckCircle, ArrowUp, Percent, MessageCircle, Play, X } from 'lucide-react';
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
      `}</style>
      
      {/* Hero Section - Estilo TOTVS Melhorado */}
      <section className="relative min-h-[750px] md:min-h-[900px] flex items-center" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* Navbar dentro do hero com fundo transparente */}
        <PageNavbar transparent={true} />
        
        {/* Background com imagem do profissional */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://www.totvs.com/wp-content/uploads/2025/06/hero-banner-RH.jpg.webp")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        
        {/* Overlay roxo com degradê suave */}
        <div className="absolute inset-0 "></div>
        
        {/* Forma abstrata azul escura fluindo */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-30 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100,0 Q80,30 70,50 T50,80 Q30,90 0,100 L0,0 Z" fill="#1e3a8a" />
          </svg>
        </div>
        
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
             
            


          <section className="relative   flex items-center justify-center bg-white w-full h-[500px] -mt-[50px] rounded-3xl shadow-lg ">
            <div className="w-[1200px] h-[500px] -mt-[50px]  text-black flex items-center justify-center flex-col">
        
          <div className="flex items-center justify-center mt-2 h-[400px] w-full">
          {/* Conteúdo centralizado */}
          <div className="h-full w-full md:w-1/2 space-y-6 flex items-center justify-center flex-col mx-auto mb-[100px]">
            {/* Div interna com flex */}
            <div className="w-1/2 flex flex-col md:flex-row items-center gap-12">
              {/* Conteúdo da div interna */}
            </div>

            {/* Label pequeno */}
          

            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight text-start ">
            Seu posto automatizado por <span className="text-[#c44cf4]">IA</span>
            </h2>

            {/* Descrição */}
            <p className="text-lg text-gray-600 leading-relaxed text-start">
            Seu posto mais eficiente com IA: automação, redução de custos e decisões mais rápidas.
            </p>

           
          </div>

          {/* Imagem à direita */}
          <div className="w-[800px] h-[400px] md:w-[300px] flex items-center justify-center relative group">
            <img 
              src="IA.png" 
              alt="Treinamentos CS" 
              className="w-full h-[400px] object-cover ml-[-140px] ml-[-80px] flex items-center justify-center mb-[50px]" 
            />
          </div>
        </div>
            </div>
            
          </section>


          <section className="relative -mt-[90px] flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/6803551/pexels-photo-6803551.jpeg" 
                alt="Inteligência Artificial" 
                className="w-full h-[500px] object-cover shadow-lg brightness-90 relative " 
              />
               <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-8 px-8 md:px-16 w-full h-full">
                {/* Imagem LUKIA à esquerda */}
                <div className="flex-shrink-0 hidden md:block">
                  <img src="https://lukos.com.br/wp-content/uploads/2025/01/business-man-happy-with-phone-reading-email-notification-laughing-funny-text-message-employee-smile-person-with-smartphone-social-media-video-meme-with-studio-background-1.png" alt="LUKIA" className="w-full max-w-[420px] h-auto object-contain opacity-100 relative" />
                </div>
                
                {/* Texto à direita */}
                <div className="flex-1 flex flex-col items-start justify-center gap-4 max-w-3xl">
                  <img 
                    src="/DEPOIMENTOS.png"
                    alt="Depoimento" 
                    className="w-full max-w-[650px] h-auto object-contain opacity-100 relative" 
                  />
                </div>
              </div>
            </section>
          
          

      {/* End Features */}
        
      {/* Seção Problemas */}
      <div id="problemas" className="py-16 md:py-24 bg-white ]">
        <div 
          className="flex items-start relative border-0 m-0 p-0 align-baseline box-border shadow-lg "
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0',
            position: 'relative',
            width: '90%',
            maxWidth: '2000px',
            margin: '0px auto',
            border: '0px',
            fontStyle: 'inherit',
            fontVariant: 'inherit',
            fontWeight: 'inherit',
            fontStretch: 'inherit',
            lineHeight: 'inherit',
            fontFamily: 'inherit',
            fontOpticalSizing: 'inherit',
            fontSizeAdjust: 'inherit',
            fontKerning: 'inherit',
            fontFeatureSettings: 'inherit',
            fontVariationSettings: 'inherit',
            fontSize: '100%',
            padding: '0px',
            verticalAlign: 'baseline',
            boxSizing: 'inherit'
          }}
        >
          <div 
            className="border-0 m-0 p-0 align-baseline box-border"
            style={{
              width: '42%',
              border: '0px',
              fontStyle: 'inherit',
              fontVariant: 'inherit',
              fontWeight: 'inherit',
              fontStretch: 'inherit',
              lineHeight: 'inherit',
              fontFamily: 'inherit',
              fontOpticalSizing: 'inherit',
              fontSizeAdjust: 'inherit',
              fontKerning: 'inherit',
              fontFeatureSettings: 'inherit',
              fontVariationSettings: 'inherit',
              fontSize: '100%',
              margin: '0px',

              verticalAlign: 'baseline',
              boxSizing: 'inherit'
            }}
          >
            <img 
              decoding="async" 
              src="https://mistraltecnologia.com.br/wp-content/themes/mistral-tecnologia/tecnologia/cloud/mistral-cloud-01.webp" 
              alt="Cloud" 
              className="h-[500px]  border-4 border-gray-300 rounded-lg shadow-lg m-0 p-0 bg-blackalign-baseline block box-border "
              style={{
                marginLeft: '-0.5vw',
                height: 'auto',
                maxWidth: '60%',
                border: '0px',
                fontStyle: 'inherit',
                fontVariant: 'inherit',
                fontWeight: 'inherit',
                fontStretch: 'inherit',
                lineHeight: 'inherit',
                fontFamily: 'inherit',
                fontOpticalSizing: 'inherit',
                fontSizeAdjust: 'inherit',
                fontKerning: 'inherit',
                fontFeatureSettings: 'inherit',
                fontVariationSettings: 'inherit',
                fontSize: '100%',
                margin: '0px',
                padding: '0px',
                verticalAlign: 'baseline',
                display: 'block',
                boxSizing: 'inherit'
              }}
            />
          </div>
          <div className="w-[700px] h-[300px] relative text-problemas flex items-center justify-center flex-col mt-[100px]" style={{ marginLeft: '-3vw' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#c44cf4] leading-tight text-center">
              Qual a diferença entre a LUKOS 
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
              O LUKOS ERP e PDV é uma solução completa de gestão empresarial para postos de combustível.
            </p>
          </div>
        </div>
      </div>

      {/* Espaçamento */}
      <div className="h-[700px] bg-gradient-to-br from-[#690093] via-[#5a008f] to-[#4a007a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[200px] bg-gradient-to-br from-[#690093] via-[#5a008f] to-[#4a007a] pt-[50px]">  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
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
            </div> </div>

      </div>

      

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




