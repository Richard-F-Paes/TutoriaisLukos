import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Smartphone, Layout, Monitor, LineChart, ShieldCheck, Zap, Users, Trophy, Clock, Play, CreditCard, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExpertiseSection from '../../components/custom/ExpertiseSection/ExpertiseSection';
import ProcessSection from '../../components/custom/ProcessSection/ProcessSection';

function ServicosPage() {
  const purpleColor = '#8B5CF6';

  const mainServices = [
    {
      title: "LUKOS ERP",
      subtitle: "Gestão Integrada",
      description: "O cérebro tecnológico do seu negócio. Integramos todos os processos da sua empresa em uma única plataforma robusta e intuitiva.",
      icon: LineChart,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      video: "https://www.youtube.com/embed/F_itCCQd0nk",
      link: "/erp"
    },
    {
      title: "LUKOS PDV",
      subtitle: "Agilidade na Pista",
      description: "Sistema de frente de caixa ultrarrápido, integrado e à prova de falhas. Desenvolvido especificamente para o fluxo intenso de postos e varejo.",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop",
      video: "https://www.youtube.com/embed/sjWk3XpdH3s",
      link: "/sistemas"
    },
    {
      title: "LUKOS CONCILIAÇÃO",
      subtitle: "Controle Financeiro",
      description: "Automatize a conferência de suas vendas em cartões. Identifique taxas abusivas e garanta que cada centavo chegue à sua conta.",
      icon: CreditCard,
      image: "/card_conciliation_dashboard_1766005546413.png",
      video: "https://www.youtube.com/embed/diPZayPotMU",
      link: "/conciliacao"
    },
    {
      title: "LUKOS FULLCHECK",
      subtitle: "Auditoria Total",
      description: "Segurança e transparência absoluta. Auditoria profunda de transações para prevenir fraudes e inconsistências sistêmicas.",
      icon: Search,
      image: "/fullcheck_security_audit_1766006734760.png",
      video: "https://www.youtube.com/embed/F_itCCQd0nk",
      link: "/fullcheck"
    },
    {
      title: "LUKOS FIDELIDADE",
      subtitle: "Retenção Premiada",
      description: "Engaje seus clientes com tecnologia de ponta. Cashbacks, pontos e marketing de precisão para aumentar sua recorrência.",
      icon: Heart,
      image: "/fidelidade_customer_experience_1766006754976.png",
      video: "https://www.youtube.com/embed/sjWk3XpdH3s",
      link: "/fidelidade"
    }
  ];

  const stats = [
    { label: 'Especialistas', value: '30+', icon: Users },
    { label: 'Clientes', value: '1.500+', icon: Trophy },
    { label: 'Inovação', value: '20+', icon: Zap },
    { label: 'Suporte', value: '24/7', icon: Clock },
  ];

  return (
    <div className="bg-[#0a0a0f] min-h-screen font-sans text-white">

      {/* Hero Section - Dark Corporate Style */}
      <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            className="w-full h-full object-cover opacity-20 hover:scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl">
            <span className="block text-[#8B5CF6] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base pl-1 border-l-4 border-[#8B5CF6]">
              Soluções Tecnológicas
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase leading-none mb-6 tracking-tighter">
              NOSSOS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400">
                SERVIÇOS
              </span>
            </h1>
            <div className="mb-8 border-l border-white/10 pl-6">
              <p className="text-gray-400 text-lg md:text-2xl leading-relaxed max-w-2xl font-light">
                Desenvolvemos o futuro da gestão para postos de combustíveis e varejo. Tecnologia que simplifica, otimiza e escala o seu negócio.
              </p>
            </div>
            <button className="px-10 py-5 bg-[#8B5CF6] text-white font-bold rounded-2xl hover:bg-[#7c4dff] transition-all transform hover:scale-105 shadow-2xl shadow-[#8B5CF6]/20 flex items-center gap-3 group">
              VAMOS CONVERSAR <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <ExpertiseSection />

      {/* Stats Band - Clean Style */}
      <section className="py-16 bg-[#0a0a0f] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white mb-1 group-hover:text-[#8B5CF6] transition-colors">{stat.value}</div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detailed Sections */}
      {mainServices.map((service, index) => (
        <section key={index} className={`py-32 relative overflow-hidden ${index % 2 !== 0 ? 'bg-[#111111]' : 'bg-[#0a0a0f]'}`}>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <span className="text-[#8B5CF6] text-sm uppercase tracking-widest font-bold mb-4 block border-l-2 border-[#8B5CF6] pl-3">
                  {service.subtitle}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 leading-tight tracking-tighter">
                  {service.title.split(' ')[0]} <br />
                  <span className="text-[#8B5CF6]">{service.title.split(' ')[1]}</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-light">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 shadow-sm hover:shadow-md hover:border-[#8B5CF6]/20 transition-all">
                    <service.icon className="w-8 h-8 text-[#8B5CF6] mb-4" />
                    <h4 className="text-white font-bold uppercase text-xs tracking-wider">Alta Performance</h4>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 shadow-sm hover:shadow-md hover:border-[#8B5CF6]/20 transition-all">
                    <ShieldCheck className="w-8 h-8 text-[#8B5CF6] mb-4" />
                    <h4 className="text-white font-bold uppercase text-xs tracking-wider">Segurança Total</h4>
                  </div>
                </div>

                <Link to={service.link} className="inline-flex items-center gap-2 text-[#8B5CF6] font-bold uppercase text-sm hover:underline">
                  Ver detalhes da solução <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className={`relative group ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="aspect-video bg-white/5 rounded-3xl overflow-hidden shadow-xl relative border border-white/5 group-hover:border-[#8B5CF6]/30 transition-all duration-500">
                  <iframe
                    className="w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-700"
                    src={service.video}
                    title={service.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B5CF6] -z-10 opacity-5 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <ProcessSection />

      {/* Final Branding / CTA */}
      <section className="py-40 text-center bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-[10rem] font-black text-white/5 uppercase leading-none select-none tracking-tighter mb-[-4rem]">
            TRANSFORM
          </h2>
          <div className="pt-20">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight">Pronto para elevar o nível da sua gestão?</h3>
            <button className="px-14 py-6 bg-[#8B5CF6] text-white font-black rounded-3xl hover:bg-[#7c4dff] hover:scale-105 transition-all shadow-[0_20px_50px_rgba(139,92,246,0.3)]">
              FALAR COM UM ESPECIALISTA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicosPage;

