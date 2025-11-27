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
  const videoId = 'W9LN83G4DCE'; // Substituir pelo ID do vídeo do YouTube da LUKOS

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
    <div className="bg-white min-h-screen overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
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
      `}</style>
      
      {/* Hero Section - Estilo TOTVS Melhorado */}
      <section className="relative min-h-[750px] md:min-h-[900px] flex items-center overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
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
             
            


          <section className="relative   flex items-center justify-center bg-white">
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
          <div className="w-[800px] h-[400px] md:w-[300px] flex items-center justify-center ">
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
        
      {/* Seção de Depoimentos */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden  ">
          <div className="pb-4 mt-12">
            <article className="w-full">
              <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold uppercase text-center text-gray-900 mb-4">
                As empresas que movem o país, confiam na <strong className="text-[#00D4FF]">LUKOS</strong>
              </h2>
            </article>
          </div>

          <div className=" flex justify-center items-center">
            {/* Card com imagem e botão de vídeo - col-lg-6 col-12 */}
            <div className="w-[800px] h-[500px] ">
              <div className="relative group cursor-pointer overflow-hidden rounded-[40px] shadow-xl h-full" onClick={() => setIsVideoModalOpen(true)}>
                {/* Card Image */}
                <div className="relative w-full h-full overflow-hidden bg-gray-100">
                  <img 
                    src={videoImageUrl} 
                    alt="Vídeo LUKOS" 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {/* Texto vertical "LUKOS" na borda direita */}
                  <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-2 md:pr-4 z-10 pointer-events-none">
                    <div 
                      className="text-purple-500/40 text-3xl md:text-4xl lg:text-5xl font-bold uppercase"
                      style={{ 
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                        letterSpacing: '0.15em'
                      }}
                    >
                      LUKOS
                    </div>
                  </div>
                  
                  {/* Card Body - Link com conteúdo */}
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setIsVideoModalOpen(true); }}
                    className="absolute inset-0 flex items-center justify-center h-full z-10 no-underline"
                  >
                    <div className="">
                      <div className="flex flex-col items-center justify-center w-full ">
                        {/* Ícone de play */}
                        <div className="mb-3">
                          <div className="bg-white rounded-full p-4 md:p-6 group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-2xl inline-block">
                            <Play className="w-10 h-10 md:w-14 md:h-14 text-[#690093] ml-1" fill="#690093" />
                          </div>
                        </div>
                        
                        {/* Texto "Assista ao Vídeo" */}
                   
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Texto descritivo - col-lg-6 col-12 pl-lg-5 pl-3 pt-lg-0 pt-4 d-flex align-items-center */}
         
          </div>
        </div>
      {/* Seção FAQ - Adaptada da TOTVS */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Tire suas dúvidas sobre o sistema LUKOS
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {item.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#690093] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#690093] flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background com gradiente roxo/violeta */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#690093] via-[#5a008f] to-[#4a007a]"></div>
        
        {/* Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Título */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Transforme a gestão do seu posto de combustível
            </h2>
            
            {/* Descrição */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Com o LUKOS ERP e PDV, você tem controle total sobre vendas, estoque, financeiro e operações. 
              Automatize processos, reduza custos e tome decisões mais inteligentes com relatórios em tempo real.
            </p>
            
            {/* Botão CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#690093] font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/demonstracao"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Solicitar demonstração
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Continua */}
      <div className="">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-col">


          {/* Seção de Blog Posts */}
          <section className="w-full py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              {/* Header da Seção */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    Blog LUKOS
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Conteúdos e Artigos
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Fique atualizado sobre o mercado de postos de combustíveis no Brasil e descubra como potencializar sua gestão
                </p>
              </div>

              {/* Grid de Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={post.link}
                    className="block group"
                  >
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col border border-gray-100">
                      {/* Imagem do Post */}
                      <div className="relative h-56 overflow-hidden bg-gray-200">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200?text=LUKOS';
                            e.target.onerror = null;
                          }}
                        />
                        {/* Overlay gradiente na imagem */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {/* Badge de categoria */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                            <Tag className="w-3 h-3" />
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Conteúdo do Post */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Meta informações */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Link para ler mais */}
                        <div className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:text-purple-700 transition-colors group/link mt-auto">
                          <span>Ler mais</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
       
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

