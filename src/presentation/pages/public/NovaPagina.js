import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search, Moon, Globe, Target, Eye, Heart, Users, Award, TrendingUp, CheckCircle, BookOpen, Play, PlayCircle } from 'lucide-react';

function NovaPagina() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const navItems = [
    { label: 'Blog', hasDropdown: true, key: 'solucoes' },
    { label: 'IA', hasDropdown: true, key: 'jornadas' },
    { label: 'Sobre nós', href: '/cases', hasDropdown: false },
    { label: 'Serviços', href: '/insights', hasDropdown: true, key: 'insights' },
    { label: 'Contato', href: '/contato', isButton: true, hasDropdown: false },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white w-[1300px] h-[75px] mt-6 flex items-center justify-center rounded-full shadow-lg sticky top-0 z-50 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/">
              <div className="flex items-center space-x-2 py-2 mr-8">
                <img 
                  src="logo.png" 
                  alt="Lukos"   
                  className="w-1 h-12 transition-all duration-200 ease-in-out" 
                  style={{ height: '50px', width: '55px' }}
                />
              </div>
            </a>

    

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.isButton) {
                  return (
                    <div key={item.label} className="relative">
                      <a href={item.href}>
                        <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-white hover:bg-blue-700 shadow-sm bg-[#0b57f4]">
                          {item.label}
                        </button>
                      </a>
                    </div>
                  );
                }

                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center text-black"
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="relative">
                    <a 
                      href={item.href} 
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-black hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                        {item.label}
                      </button>
                    </a>
                  </div>
                );
              })}
            </nav>
              
            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-2 ml-auto">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 text-gray-700 h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 text-gray-700 h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Switch to dark mode"
              >
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="relative">
                <button 
                  className="justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 text-gray-700 h-8 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center space-x-1 min-w-0"
                  type="button"
                >
                  <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">PT</span>
                  <ChevronDown className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden overflow-hidden">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => {
                  if (item.isButton) {
                    return (
                      <a key={item.label} href={item.href}>
                        <button className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-white bg-[#0b57f4] hover:bg-blue-700">
                          {item.label}
                        </button>
                      </a>
                    );
                  }

                  if (item.hasDropdown) {
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => toggleDropdown(item.key)}
                          className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 font-medium text-black hover:text-blue-600 hover:bg-gray-100"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[item.key] ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg transition-all duration-200 font-medium text-black hover:text-blue-600 hover:bg-gray-100"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </nav>
            
      {/* Hero Section */}
      <div className="relative -mt-[90px]">
        <img 
          src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg" 
          alt="" 
          className="w-full h-[500px] object-cover rounded-3xl shadow-lg brightness-50 relative" 
        />  
        <div className="absolute inset-0 bg-black opacity-40 rounded-3xl flex flex-col items-center justify-center gap-4 w-full h-full">
          <h2 className="text-white text-4xl font-bold text-center">Sobre Nós</h2>
          <p className="text-white/90 text-[16px] text-center max-w-2xl px-4">
            Conheça a história, missão e valores da Lukos Tecnologia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-[-10px] pt-16 pb-16 bg-white relative rounded-3xl px-4">
        <div className="max-w-7xl mx-auto">
          {/* Nossa História */}
          <section className="mb-20">
            <div className="flex items-center justify-center">
              {/* Imagem à esquerda */}
              <div className="w-full md:w-[500px]">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image.png" 
                  alt="Nossa História" 
                  className="w-full h-[500px] rounded-2xl object-cover shadow-lg mr-14" 
                />
              </div>

              {/* Conteúdo à direita */}
              <div className="w-full md:w-1/2 space-y-6 ml-10">
                {/* Label pequeno */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      Nossa História
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center">
                  Nossa História
                </h2>

                {/* Descrição */}
                <p className="text-lg text-black leading-relaxed text-center">
                  Desenvolver soluções de software inteligentes e inovadoras, que simplifiquem processos e melhorem a eficiência das pessoas e das empresas, sempre com foco na qualidade, personalização e suporte contínuo.
                </p>

                {/* Lista de benefícios */}
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Mais de 10 anos de experiência</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Milhares de clientes atendidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Inovação constante</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Nossa Visão - Layout Invertido */}
          <section className="mb-20">
            <div className="flex items-center justify-center mt-20">
              {/* Conteúdo à esquerda */}
              <div className="w-full md:w-1/2 space-y-6 mr-10">
                {/* Label pequeno */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                      Nossa Visão
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center">
                  Nossa Visão
                </h2>

                {/* Descrição */}
                <p className="text-lg text-black leading-relaxed text-center">
                  Ser a principal referência no desenvolvimento de software para Postos de Combustíveis e Varejo, liderando a transformação digital do setor e promovendo o crescimento sustentável e o bem-estar de nossos clientes, parceiros, colaboradores e da comunidade.
                </p>

                {/* Lista de benefícios */}
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Liderança em transformação digital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Crescimento sustentável</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Bem-estar de todos os stakeholders</span>
                  </li>
                </ul>
              </div>

              {/* Imagem à direita */}
              <div className="w-full md:w-[500px]">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image-1.png" 
                  alt="Nossa Visão" 
                  className="w-full h-[500px] rounded-2xl object-cover shadow-lg" 
                />
              </div>
            </div>
          </section>

          {/* Nossos Valores */}
          <section className="mb-20">
            <div className="flex items-center justify-center mt-20">
              {/* Conteúdo à esquerda */}
              <div className="w-full md:w-1/2 space-y-6 mr-10">
                {/* Label pequeno */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                      Nossos Valores
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center">
                  Nossos Valores
                </h2>

                {/* Lista de valores */}
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Respeito e Confiança</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Cliente em Primeiro Lugar</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Inovação Constante</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Trabalho em Equipe</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Ambiente de Trabalho Valorizado</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Paixão pelo que Fazemos</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Compromisso com a Sustentabilidade</span>
                  </li>
                </ul>
              </div>

              {/* Imagem à direita */}
              <div className="w-full md:w-[500px]">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image-2.png" 
                  alt="Nossos Valores" 
                  className="w-full h-[500px] rounded-2xl object-cover shadow-lg" 
                />
              </div>
            </div>
          </section>

         
          

          {/* Por que escolher a Lukos */}
         
        </div>
      </div>
      {/* Seção de Vídeos */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white mt-20 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Play className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Vídeos Demonstrativos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            A LUKOS aplicada
            ao seu negócio
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Uma ferramenta poderosa e intuitiva, pronta para te auxiliar  24 horas, 7 dias por semana. Veja o que os clientes da LUKOS estão dizendo sobre nossa ferramenta.
            </p>
            
          </div>

      {/* Vídeo Destaque */}
      <div className="max-w-4xl mx-auto relative mb-10  overflow-hidden  px-4" style={{ zIndex: 900 }}>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
          <iframe
            src="https://www.youtube.com/embed/fz5Q0HNVsDE"
            title="Meta - Jornada do Cliente"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vídeo 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-video relative bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/sjWk3XpdH3s?si=Zv2L029tcGpfA30W"
                  title="Lukos ERP - Visão Geral Completa"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
          
            </div>

            {/* Vídeo 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-video relative bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/XY2OcTZqvqs?si=z-_ga6EOq1PrQ2by"
                  title="PDV em Ação - Vendas de Combustível"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Vídeo 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-video relative bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/fz5Q0HNVsDE"
                  title="Relatórios Gerenciais Avançados"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-black mb-6">
              Quer ver mais demonstrações ou tem dúvidas sobre o sistema?
            </p>
            <a 
              href="/contato" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Entre em Contato
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default NovaPagina;
