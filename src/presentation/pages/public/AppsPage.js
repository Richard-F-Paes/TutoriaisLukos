import React, { useState } from 'react';
import { ExternalLink, Star, Download, Smartphone, Play, Shield, Lock, Users, CheckCircle, BarChart3, Apple, TrendingUp, Search, ChevronLeft, ChevronRight, Zap, Award, Globe, Clock, MessageCircle, ArrowRight, X } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function AppsPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Dados dos aplicativos na Play Store
  const apps = [
    {
      id: 1,
      name: 'Lukos PDV',
      description: 'Sistema de ponto de venda completo para postos de combustíveis. Gerencie vendas, estoque e relatórios em tempo real.',
      icon: 'https://via.placeholder.com/512x512?text=LUKOS+PDV',
      rating: 4.8,
      downloads: '10K+',
      category: 'Negócios',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.lukos.pdv',
      image: 'https://images.pexels.com/photos/7583935/pexels-photo-7583935.jpeg',
    },
    {
      id: 2,
      name: 'Lukos Retaguarda',
      description: 'Gerencie toda a operação do seu posto de combustível. Controle de estoque, fornecedores, clientes e muito mais.',
      icon: 'https://via.placeholder.com/512x512?text=LUKOS+RET',
      rating: 4.7,
      downloads: '5K+',
      category: 'Produtividade',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.lukos.retaguarda',
      image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg',
    },
    {
      id: 3,
      name: 'Lukos Conveniência',
      description: 'Aplicativo para gestão de lojas de conveniência. Controle de produtos, vendas e inventário de forma simples.',
      icon: 'https://via.placeholder.com/512x512?text=LUKOS+CONV',
      rating: 4.6,
      downloads: '3K+',
      category: 'Negócios',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.lukos.conveniencia',
      image: 'https://images.pexels.com/photos/5816299/pexels-photo-5816299.jpeg',
    },
    {
      id: 4,
      name: 'Lukos Dashboard',
      description: 'Visualize métricas e indicadores do seu negócio em tempo real. Dashboards interativos e relatórios detalhados.',
      icon: 'https://via.placeholder.com/512x512?text=LUKOS+DASH',
      rating: 4.9,
      downloads: '8K+',
      category: 'Negócios',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.lukos.dashboard',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
    },
    {
      id: 5,
      name: 'Lukos Pista',
      description: 'Controle completo da operação da pista de abastecimento. Gestão de bombas, abastecimentos e frentistas.',
      icon: 'https://via.placeholder.com/512x512?text=LUKOS+PISTA',
      rating: 4.5,
      downloads: '2K+',
      category: 'Produtividade',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.lukos.pista',
      image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg',
    },
    {
      id: 6,
      name: 'Lukos Pay',
      description: 'Solução de pagamento integrada. Aceite pagamentos digitais e gerencie transações de forma segura.',
      icon: 'https://via.placeholder.com/512x512?text=LUKOS+PAY',
      rating: 4.7,
      downloads: '15K+',
      category: 'Financeiro',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.lukos.pay',
      image: 'https://i.pinimg.com/1200x/5b/b1/da/5bb1da6cf8532c7951de99a371ac0f59.jpg',
    },
  ];

  return (
    <div className="bg-white min-h-screen ">
      {/* Navbar */}
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative -mt-[90px] flex items-center justify-center min-h-[600px]">
        
        <div 
          className="absolute flex flex-row items-center justify-between gap-8 w-[95%] mx-auto mt-40 rounded-3xl h-[85%] p-8 md:p-12 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg)'
          }}
        >
          <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
          <div className="relative z-10 w-full flex flex-row items-center justify-between gap-8">
            {/* Conteúdo à Esquerda */}
            <div className="flex flex-col justify-center gap-4 flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 rounded-full w-fit">
              <Smartphone className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                Nossos Aplicativos
              </span>
            </div>

            {/* Título */}
            <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Tenha a conveniência de gerenciar com{' '}
              <span className="relative">
                <span className="text-purple-600">LUKOS</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                  <path d="M0 3C50 0 100 6 150 3C175 1.5 200 4 200 3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            {/* Descrição */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Obtenha muitos benefícios ao usar os aplicativos LUKOS no seu celular
            </p>

            {/* Estatísticas */}
            <div className="flex flex-wrap gap-6 mt-2">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-black">31+</span>
                <span className="text-xs text-gray-600">Parceiros confiáveis</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-black">200k+</span>
                <span className="text-xs text-gray-600">Usuários ativos</span>
              </div>
            </div>

            {/* Botões de Download */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <Apple className="w-5 h-5" />
                <span>App Store</span>
              </a>
              <a 
                href="https://play.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Play Store</span>
              </a>
            </div>
          </div>

          {/* Imagem do Celular à Direita */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative">
              {/* Celular mockup */}
              <div className="relative w-[240px] h-[480px] bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-purple-600 h-10 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">LUKOS</span>
                  </div>
                  {/* Conteúdo do app */}
                  <div className="p-4 h-full bg-gradient-to-b from-purple-50 to-white">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">R$ 3.700,00</div>
                      <div className="text-xs text-gray-600">Saldo disponível</div>
                    </div>
                    {/* Gráfico placeholder */}
                    <div className="h-24 bg-gray-200 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-10 bg-gray-100 rounded-lg"></div>
                      <div className="h-10 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-xl"></div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Seção de Features */}
      <section className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Por que escolher a LUKOS?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Obtenha os dados mais precisos do mercado, alertas, conversões, ferramentas e muito mais – tudo em um único aplicativo.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Segurança por Padrão</h3>
              <p className="text-gray-600 leading-relaxed">
                Ative o modo privacidade e bloqueio de aplicativo para proteger seus dados.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Mais Foco na Interface</h3>
              <p className="text-gray-600 leading-relaxed">
                Insira suas informações e garanta que seus dados estejam seguros e mais protegidos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <Lock className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Mantendo Confidencialidade</h3>
              <p className="text-gray-600 leading-relaxed">
                Privacidade total dos seus dados e informações comerciais protegidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Download Mobile App */}
      <section className="w-full py-20 px-4 md:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo à Esquerda */}
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Baixe o aplicativo móvel
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Baixe o aplicativo móvel LUKOS para iOS e Android. Ele ajuda você a gerenciar seu negócio de forma mais rápida e inteligente.
              </p>
              
              {/* Botões de Download */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <Apple className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Baixar na</span>
                    <span className="text-base">App Store</span>
                  </div>
                </a>
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Baixar na</span>
                    <span className="text-base">Play Store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Mockup à Direita */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[240px] h-[480px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo ao</div>
                      <div className="text-3xl font-bold text-purple-600">LUKOS</div>
                    </div>
                    <div className="w-32 h-32 bg-purple-200 rounded-full mb-6 flex items-center justify-center">
                      <Smartphone className="w-16 h-16 text-purple-600" />
                    </div>
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold">
                      Começar agora
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Seção de Aplicativos */}
      <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mockup à Esquerda */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-[240px] h-[480px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo ao</div>
                      <div className="text-3xl font-bold text-purple-600">LUKOS</div>
                    </div>
                    <div className="w-32 h-32 bg-purple-200 rounded-full mb-6 flex items-center justify-center">
                      <Smartphone className="w-16 h-16 text-purple-600" />
                    </div>
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold">
                      Começar agora
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo à Direita */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Baixe o aplicativo móvel
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Baixe o aplicativo móvel LUKOS para iOS e Android. Ele ajuda você a gerenciar seu negócio de forma mais rápida e inteligente.
              </p>
              
              {/* Botões de Download */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <Apple className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Baixar na</span>
                    <span className="text-base">App Store</span>
                  </div>
                </a>
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Baixar na</span>
                    <span className="text-base">Play Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Seção de Vídeo */}
      <section className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nossos Aplicativos Disponíveis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Assista ao vídeo e conheça nossos aplicativos
            </p>
          </div>
          
          {/* Grid com 2 Colunas */}
          <div className="grid grid-cols-2 gap-8 items-start">
            {/* Coluna 1 - Card de Vídeo */}
            <div className="w-[570px] h-[350px]">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group w-full h-full">
                <div className="card-image relative w-full h-full">
                  <img 
                    className="w-full h-full object-cover"
                    src="https://play-lh.googleusercontent.com/r3Ff1yORI6qUgAnPNVCkpUAcsDnqi6HBLbzV7G77cxDgOY2IRnB0L538fNh8_xuBV1TT8vm4dIz0e56_fdsVua4=w2560-h1440-rw"
                    alt="Vídeo LUKOS"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <a 
                  className="w-full h-full absolute inset-0 text-decoration-none z-10"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsVideoModalOpen(true);
                  }}
                  title="Assistir vídeo"
                ></a>
              </div>
            </div>

            {/* Coluna 2 - Conteúdo */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                Veja como funciona
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Neste vídeo, você vai conhecer todas as funcionalidades dos nossos aplicativos e como eles podem transformar a gestão do seu negócio.
              </p>
              
              {/* Lista de Funcionalidades */}
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Interface Intuitiva</h4>
                    <p className="text-gray-600 text-sm">Design moderno e fácil de usar para qualquer pessoa</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sincronização em Tempo Real</h4>
                    <p className="text-gray-600 text-sm">Dados atualizados instantaneamente em todos os dispositivos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Relatórios Detalhados</h4>
                    <p className="text-gray-600 text-sm">Análises completas para melhor tomada de decisão</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Segurança Avançada</h4>
                    <p className="text-gray-600 text-sm">Proteção de dados com criptografia de ponta</p>
                  </div>
                </div>
              </div>

              {/* Botão CTA */}
              <div className="mt-6">
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Baixar Agora</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">31+</div>
              <div className="text-purple-100 text-sm md:text-base">Parceiros Confiáveis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">200k+</div>
              <div className="text-purple-100 text-sm md:text-base">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">4.8</div>
              <div className="text-purple-100 text-sm md:text-base">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-100 text-sm md:text-base">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios Adicionais */}
      <section className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Vantagens Exclusivas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra por que milhares de empresas confiam na LUKOS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefício 1 */}
            <div className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sincronização em Tempo Real</h3>
              <p className="text-gray-600">
                Seus dados sincronizados instantaneamente em todos os dispositivos
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certificações de Segurança</h3>
              <p className="text-gray-600">
                Certificações internacionais garantem a segurança dos seus dados
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Disponível em Qualquer Lugar</h3>
              <p className="text-gray-600">
                Acesse seus dados de qualquer lugar do mundo, a qualquer momento
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Atualizações Constantes</h3>
              <p className="text-gray-600">
                Novas funcionalidades e melhorias lançadas regularmente
              </p>
            </div>

            {/* Benefício 5 */}
            <div className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Suporte Dedicado</h3>
              <p className="text-gray-600">
                Equipe especializada pronta para ajudar quando você precisar
              </p>
            </div>

            {/* Benefício 6 */}
            <div className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Relatórios Avançados</h3>
              <p className="text-gray-600">
                Análises detalhadas para tomar decisões mais inteligentes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja a opinião de quem já usa nossos aplicativos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Os aplicativos LUKOS transformaram completamente a gestão do meu posto. Interface intuitiva e funcionalidades poderosas!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">João Silva</div>
                  <div className="text-sm text-gray-500">Gerente de Posto</div>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "A sincronização em tempo real é incrível! Consigo acompanhar tudo mesmo estando fora do estabelecimento."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria Santos</div>
                  <div className="text-sm text-gray-500">Proprietária</div>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "O suporte é excepcional e os relatórios me ajudam muito na tomada de decisões estratégicas."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Carlos Oliveira</div>
                  <div className="text-sm text-gray-500">Diretor Comercial</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA Final */}
      <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Baixe nossos aplicativos agora e transforme a gestão do seu negócio
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Apple className="w-6 h-6" />
              <span>App Store</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Play className="w-6 h-6" />
              <span>Play Store</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal de Vídeo */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Vídeo */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/BdF41Ne2cnQ?autoplay=1"
                title="LUKOS Aplicativos"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppsPage;

