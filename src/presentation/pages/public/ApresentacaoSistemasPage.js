import React from 'react';
import { 
  Database, 
  ShoppingCart, 
  BarChart, 
  Users, 
  Package, 
  CreditCard, 
  FileText, 
  Smartphone, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Shield,
  Zap,
  Link as LinkIcon,
  Cloud,
  Receipt
} from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function ApresentacaoSistemasPage() {
  // Funcionalidades do ERP
  const erpFeatures = [
    {
      name: 'Gestão de Estoque',
      description: 'Controle completo de entrada, saída e movimentação de produtos em tempo real.',
      icon: Package,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Controle Financeiro',
      description: 'Gestão de contas a pagar e receber, fluxo de caixa e conciliação bancária.',
      icon: CreditCard,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Cadastros Completos',
      description: 'Clientes, fornecedores, produtos e funcionários com validação de documentos.',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Relatórios e Analytics',
      description: 'Dashboards interativos e relatórios detalhados para tomada de decisão.',
      icon: BarChart,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      name: 'Integração com PDV',
      description: 'Sincronização automática de vendas, estoque e dados financeiros.',
      icon: LinkIcon,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'Banco de Dados na Nuvem',
      description: 'Seus dados seguros e acessíveis de qualquer lugar, a qualquer momento.',
      icon: Cloud,
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  // Funcionalidades do PDV
  const pdvFeatures = [
    {
      name: 'Vendas na Pista',
      description: 'Controle completo de abastecimentos, bombas e operações na pista.',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Vendas na Loja',
      description: 'Sistema completo para vendas de produtos e serviços na loja de conveniência.',
      icon: Receipt,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Faturamento Express',
      description: 'Emissão rápida de notas fiscais e cupons fiscais eletrônicos.',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'PDV Móvel',
      description: 'Realize vendas de qualquer lugar com o aplicativo móvel integrado.',
      icon: Smartphone,
      color: 'bg-pink-100 text-pink-600'
    },
    {
      name: 'Integração com ERP',
      description: 'Dados sincronizados automaticamente com a retaguarda em tempo real.',
      icon: Database,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'Conciliação de Cartões',
      description: 'Automatize a conciliação de cartões de crédito e débito.',
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  // Benefícios da integração
  const integrationBenefits = [
    {
      title: 'Sincronização em Tempo Real',
      description: 'Dados atualizados instantaneamente entre ERP e PDV, eliminando retrabalho.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Controle Total',
      description: 'Visão completa do negócio: desde a venda até o controle financeiro.',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Decisões Inteligentes',
      description: 'Relatórios integrados que ajudam a tomar decisões estratégicas mais rápidas.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Eficiência Operacional',
      description: 'Automatize processos e reduza erros manuais, aumentando a produtividade.',
      icon: CheckCircle,
      color: 'from-orange-500 to-red-500'
    }
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
          minHeight: '700px',
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
              Soluções LUKOS
            </span>
          </div>
          <div className="w-[1200px] text-center flex items-center justify-center flex-col">  
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl mb-6">
              Soluções LUKOS ERP e PDV
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transforme a gestão do seu posto de combustível com sistemas integrados, 
              completos e modernos para otimizar todas as operações do seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Seção ERP */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Conteúdo à Esquerda */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <Database className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  LUKOS ERP
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Gestão Completa da Retaguarda
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                O LUKOS ERP é a solução completa para gerenciar toda a operação do seu posto de combustível. 
                Controle estoque, financeiro, cadastros e relatórios de forma integrada e em tempo real.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Com interface intuitiva e recursos avançados, você tem controle total sobre todas as áreas 
                do seu negócio, desde o cadastro de produtos até a análise de resultados.
              </p>
              <a
                href="/retaguarda-tutoriais"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#690093] text-white font-semibold rounded-lg hover:bg-[#5a008f] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Saiba mais sobre ERP
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Imagem à Direita */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://lukos.com.br/wp-content/uploads/2025/01/Group-24.png" 
                alt="LUKOS ERP" 
                className="w-full max-w-lg h-auto object-contain rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Grid de Funcionalidades ERP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {erpFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção PDV */}
      <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Imagem à Esquerda */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <img 
                src="https://lukos.com.br/wp-content/uploads/2025/01/Group-24.png" 
                alt="LUKOS PDV" 
                className="w-full max-w-lg h-auto object-contain rounded-2xl shadow-xl"
              />
            </div>

            {/* Conteúdo à Direita */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  LUKOS PDV
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ponto de Venda Inteligente
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                O LUKOS PDV é o sistema de ponto de venda mais completo para postos de combustível. 
                Gerencie vendas na pista e na loja com agilidade, precisão e controle total.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Com recursos avançados de faturamento, integração móvel e sincronização em tempo real, 
                você tem tudo que precisa para operar com eficiência máxima.
              </p>
              <a
                href="/PDV"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#690093] text-white font-semibold rounded-lg hover:bg-[#5a008f] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Saiba mais sobre PDV
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Grid de Funcionalidades PDV */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdvFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção de Benefícios Integrados */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ERP e PDV Trabalhando Juntos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A integração completa entre ERP e PDV oferece vantagens únicas que transformam 
              a forma como você gerencia seu posto de combustível.
            </p>
          </div>

          {/* Grid de Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrationBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradiente de fundo */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl mb-6 relative z-10`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Seção de Integração Visual */}
          <div className="mt-16 bg-gradient-to-r from-[#690093] to-[#5a008f] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-2">ERP</div>
                <div className="text-lg opacity-90">Retaguarda Completa</div>
              </div>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <LinkIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-bold mb-2">PDV</div>
                <div className="text-lg opacity-90">Ponto de Venda</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xl font-semibold mb-4">
                Sincronização Automática em Tempo Real
              </p>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Todas as vendas realizadas no PDV são automaticamente registradas no ERP, 
                atualizando estoque, financeiro e relatórios instantaneamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background com gradiente roxo/violeta */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#690093] via-[#5a008f] to-[#4a007a]"></div>
        
        {/* Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Título */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para transformar seu negócio?
            </h2>
            
            {/* Descrição */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Conheça todas as funcionalidades do LUKOS ERP e PDV e descubra como podemos 
              otimizar a gestão do seu posto de combustível.
            </p>
            
            {/* Botões CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#690093] font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Solicitar Demonstração
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Ver Mais Informações
              </a>
            </div>
          </div>
        </div>

        {/* SVG decorativo */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#radial-gradient-cta)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="radial-gradient-cta">
              <stop stopColor="#690093" />
              <stop offset="1" stopColor="#5a008f" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </section>
    </div>
  );
}

export default ApresentacaoSistemasPage;

