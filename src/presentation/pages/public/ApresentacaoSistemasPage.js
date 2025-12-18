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
// import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

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
    <div className="bg-[#0a0a0f] min-h-screen font-sans text-white">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[800px] flex items-center overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lukos.com.br/wp-content/uploads/2025/01/S-TEXTO-1.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20 scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl">
            <span className="block text-[#8B5CF6] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-l-4 border-[#8B5CF6] pl-4">
              Soluções Tecnológicas LUKOS
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase leading-none mb-8 tracking-tighter">
              TECNOLOGIA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400">QUE IMPULSIONA</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl font-light border-l border-white/10 pl-6">
              Transforme a gestão do seu posto de combustível com sistemas integrados, modernos e escaláveis.
            </p>
          </div>
        </div>
      </section>

      {/* Seção ERP */}
      <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div>
              <span className="text-blue-400 text-sm uppercase tracking-[0.2em] font-bold mb-4 block border-l-2 border-blue-400 pl-4">
                LUKOS ERP
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 leading-tight tracking-tighter">
                GESTÃO COMPLETA <br />
                <span className="text-blue-400">DA RETAGUARDA</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-light">
                O LUKOS ERP é o coração do seu negócio. Controle estoque, financeiro e cadastros de forma integrada e em tempo real, com total segurança e precisão.
              </p>
              <a
                href="/retaguarda-tutoriais"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-blue-600/20 group"
              >
                Explorar Solução <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative group perspective-1000">
              <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-[100px]"></div>
              <img
                src="https://lukos.com.br/wp-content/uploads/2025/01/Group-24.png"
                alt="LUKOS ERP"
                className="relative w-full max-w-lg mx-auto h-auto object-contain transition-all duration-1000 group-hover:rotate-y-2 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {erpFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:rotate-12 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                  {feature.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção PDV */}
      <section className="py-32 bg-[#0d0d14] relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div className="order-2 lg:order-1 relative group perspective-1000">
              <div className="absolute -inset-10 bg-purple-500/5 rounded-full blur-[100px]"></div>
              <img
                src="https://lukos.com.br/wp-content/uploads/2025/01/Group-24.png"
                alt="LUKOS PDV"
                className="relative w-full max-w-lg mx-auto h-auto object-contain transition-all duration-1000 group-hover:rotate-y--2 group-hover:scale-105"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-[#8B5CF6] text-sm uppercase tracking-[0.2em] font-bold mb-4 block border-l-2 border-[#8B5CF6] pl-4">
                LUKOS PDV
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 leading-tight tracking-tighter">
                PONTO DE VENDA <br />
                <span className="text-[#8B5CF6]">INTELIGENTE</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-light">
                Agilidade na pista e controle na loja. O PDV Lukos é robusto, intuitivo e preparado para o alto volume de transações do seu posto.
              </p>
              <a
                href="/PDV"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#8B5CF6] hover:bg-purple-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-[#8B5CF6]/20 group"
              >
                Ver Detalhes PDV <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdvFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B5CF6] group-hover:rotate-12 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-purple-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                  {feature.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Integração */}
      <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter mb-8">
              ECOSSISTEMA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">UNIFICADO</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto font-light leading-relaxed">
              ERP e PDV trabalhando em sincronia absoluta para transformar dados em lucros e complexidade em simplicidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {integrationBenefits.map((benefit, index) => (
              <div
                key={index}
                className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:bg-white/[0.04] transition-all duration-500 group overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${benefit.color} opacity-5 rounded-full -mr-32 -mt-32 blur-[80px]`}></div>
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-3xl mb-8 relative z-10 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed font-light relative z-10 group-hover:text-gray-400 transition-colors">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center relative z-10">
              <div className="text-center">
                <div className="text-6xl font-black text-white mb-4 tracking-tighter">ERP</div>
                <div className="text-sm font-bold text-[#8B5CF6] uppercase tracking-[0.3em]">RETAGUARDA</div>
              </div>
              <div className="flex justify-center relative">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative z-20">
                  <LinkIcon className="w-10 h-10 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black text-white mb-4 tracking-tighter">PDV</div>
                <div className="text-sm font-bold text-blue-400 uppercase tracking-[0.3em]">OPERAÇÃO</div>
              </div>
            </div>
            <div className="mt-16 text-center max-w-3xl mx-auto">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
                Sincronização Ativa de Fluxo
              </h4>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Todas as vendas realizadas no PDV alimentam o ERP em milissegundos, mantendo seu estoque, financeiro e indicadores fiscais sempre impecáveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 relative overflow-hidden bg-black text-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase mb-10 tracking-tighter leading-none">
            TRANSFORME <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">SEU POSTO</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a
              href="/contato"
              className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#8B5CF6] hover:text-white transition-all transform hover:scale-105 shadow-2xl"
            >
              Começar Agora
            </a>
            <a
              href="/blog"
              className="px-16 py-8 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black transition-all"
            >
              Ver Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApresentacaoSistemasPage;

