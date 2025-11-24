import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag, FileText, Cloud, CreditCard, Gift, Smartphone, Wallet, Receipt } from 'lucide-react';
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
  // Dados de tecnologias originais
  const technologies = [
    { name: 'Faturamento Express', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { name: 'Banco de Dados na Nuvem', icon: Cloud, color: 'bg-green-100 text-green-600' },
    { name: 'Conciliação de cartões', icon: CreditCard, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Programa Fidelidade', icon: Gift, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'PDV Móvel', icon: Smartphone, color: 'bg-blue-100 text-blue-700' },
    { name: 'Recebimento por Carteiras Digitais e Criptomoedas', icon: Wallet, color: 'bg-green-100 text-green-700' },
    { name: 'Fatura Web', icon: Receipt, color: 'bg-orange-100 text-orange-600' },
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
          minHeight: '804px',
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
        <div className="absolute inset-0 bg-gradient-to-b from via-black/60 to-black/70 flex flex-col items-center justify-center gap-4 w-full h-full z-10">
        

         
          <div className="inline-flex items-center mt-[100px] gtext-center mt-[100px]ap-2 mt-[120px] px-4 py-2 bg-purple-500/100 backdrop-blur-sm rounded-full mb-4">

         
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Lukos tecnologia
            </span>
          </div>
          <div className="w-[1200px] h-[600px] mb-[150px] text-black flex items-start justify-center flex-col ">  
            <h2 className="text-5xl text-start font-bold text-center drop-shadow-2xl -mt-[100px] w-[500px] ml-[150px] h-[168px] flex items-center" style={{ color: '#374151' }}>
            Potencialize a gestão do seu posto de combustível com a
            </h2>
            <div className="w-[500px] h-[168px]  flex items-center justify-start mt-[-55px]"> 
              <h2 className="font-bold text-center text-9xl text-[#690093] drop-shadow-3xl mt-[90px] ml-[150px] flex items-center">
            LUKOS 
              </h2>
            </div>
          </div>
        </div>
        
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
                <div className="flex-1 flex flex-col items-start justify-center gap-4 w-[500px] h-[500px]">
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
            Seu posto automatizado por IA
            </h2>

            {/* Descrição */}
            <p className="text-lg text-gray-600 leading-relaxed text-start">
            Seu posto mais eficiente com IA: automação, redução de custos e decisões mais rápidas.
            </p>

           
          </div>

          {/* Imagem à direita */}
          <div className="w-[800px] h-[400px] md:w-[300px] ">
            <img 
              src="https://lukos.com.br/wp-content/uploads/2025/01/Group-24.png" 
              alt="Treinamentos CS" 
              className="w-full h- object-cover ml-[-140px] " 
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
                  <img src="/DEPOIMENTOS.png"
                  alt="Depoimento" className="w-full max-w-[650px] h-auto object-contain opacity-100 relative" />
                </div>
              </div>
            </section>
          
          

      {/* End Features */}
        
      {/* Technologies Section - Div Separada */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid de Cards de Tecnologias */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="col-span-1">
                  <div className="card bg-transparent border-0 shadow-none hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[120px]">
                    <div className="card-icon flex items-center justify-center p-2 pb-1 flex-shrink-0">
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${tech.color || 'bg-gray-100 text-gray-600'} rounded-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="card-body p-2 pt-1 text-center flex-1 flex items-center justify-center">
                      <p className="card-title uppercase text-gray-900 font-semibold text-xs leading-tight">{tech.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Continua */}
      <div className="">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-col">

          {/* Brand Slider Section */}
          <section 
            className="relative overflow-hidden z-[1] w-[2000px] h-[200px] "
            style={{
              backgroundImage: 'url("https://gratech.coevs.com/assets/general/images/DDzFTPgp6U8QdcTjLGcT.jpg")',
              paddingTop: '100px',
              paddingBottom: '100px',
              paddingLeft: '0px',
              paddingRight: '0px',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              margin: '0px',
              outline: 'none',
            }}
          >
            {/* Overlay preto */}
            <div className="absolute inset-0 bg-black/80 z-0"></div>
            
            {/* Container */}
            <div className="container mx-auto px-4 relative z-10">
              {/* Brand Slider */}
              <div className="brand__slider overflow-hidden">
              
                
              </div>
            </div>

            {/* CSS for Animation */}
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .brand__slider-wrapper {
                animation: scroll 30s linear infinite;inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground mb-4
              }
              .brand__slider-wrapper:hover {
                animation-play-state: paused;
              }
              .brand__slider {
                width: 100%;
                overflow: hidden;
              }
            `}</style>
          </section>

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

