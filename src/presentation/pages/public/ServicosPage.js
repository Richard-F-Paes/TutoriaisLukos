import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Trophy, Clock } from 'lucide-react';
import ExpertiseSection from '../../components/custom/ExpertiseSection/ExpertiseSection';
import ERPSection from '../../components/custom/ERPSection/ERPSection';
import PDVSection from '../../components/custom/PDVSection/PDVSection';
import FuelCheckSection from '../../components/custom/FuelCheckSection/FuelCheckSection';
import FidelitySection from '../../components/custom/FidelitySection/FidelitySection';
import ConciliationSection from '../../components/custom/ConciliationSection/ConciliationSection';
import FaturaWebSection from '../../components/custom/FaturaWebSection/FaturaWebSection';
import SmartPosSection from '../../components/custom/SmartPosSection/SmartPosSection';
import IASection from '../../components/custom/IASection/IASection';
import PixLukosSection from '../../components/custom/PixLukosSection/PixLukosSection';
import ProcessSection from '../../components/custom/ProcessSection/ProcessSection';

function ServicosPage() {
  const purpleColor = '#8B5CF6';

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


      <ERPSection />
      <PDVSection />
      <FuelCheckSection />
      <FidelitySection />
      <ConciliationSection />
      <FaturaWebSection />
      <SmartPosSection />
      <IASection />
      <PixLukosSection />

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

