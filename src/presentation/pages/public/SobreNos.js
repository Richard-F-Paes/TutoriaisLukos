import { ArrowRight, Play, Quote, ShieldCheck, UserCheck, Lightbulb, Users, Smile, Heart, Leaf, Award, Calendar } from 'lucide-react';


function SobreNos() {
  const purpleColor = '#8B5CF6'; // Purple accent color

  return (
    <div className="bg-[#0a0a0f] min-h-screen font-sans text-white">

      {/* Hero Section - Dark Corporate Style */}
      <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-[#0a0a0f]">
        {/* Background Image with Dark Overlay */}
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
          <div className="max-w-3xl">
            <span className="block text-[#8B5CF6] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base pl-1 border-l-4 border-[#8B5CF6]">
              Sobre Nós
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-none mb-6 tracking-tighter">
              LUKOS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400">
                TECNOLOGIA
              </span>
            </h1>
            <div className="mb-8 border-l border-white/10 pl-6">
              <span className="block text-[#8B5CF6] font-bold uppercase tracking-widest text-sm mb-2">Nossa Missão</span>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                Desenvolver soluções de software inteligentes e inovadoras, que simplifiquem processos e melhorem a eficiência das pessoas e das empresas, sempre com foco na qualidade, personalização e suporte contínuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section - Dark Corporate Style */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <div className="relative z-10">
              <span className="text-[#8B5CF6] text-sm uppercase tracking-widest font-bold mb-2 block border-l-2 border-[#8B5CF6] pl-3">
                Visão Geral
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-8 leading-tight tracking-tighter">
                PRONTOS PARA <br />
                <span className="text-[#8B5CF6]">O FUTURO</span>
              </h2>

              <div className="space-y-6 text-gray-400 leading-relaxed font-light">
                <div>
                  <span className="block text-white font-bold uppercase tracking-widest text-sm mb-2">Nossa Visão</span>
                  <p>
                    Ser a principal referência no desenvolvimento de software para Postos de Combustíveis e Varejo, liderando a transformação digital do setor e promovendo o crescimento sustentável e o bem-estar de nossos clientes, parceiros, colaboradores e da comunidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Content */}
            <div className="relative group">
              <div className="aspect-video bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl relative border border-white/5 group-hover:border-[#8B5CF6]/30 transition-all duration-500">
                <iframe
                  className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  src="https://www.youtube.com/embed/F_itCCQd0nk"
                  title="Vídeo Institucional"
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

      {/* Testimonials Section - Success Stories */}
      <section className="py-24 relative bg-[#0a0a0f] overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gray-500 text-xs uppercase tracking-[0.3em] block mb-2">
              Histórias de Sucesso
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              A LUKOS APLICADA <br />
              <span className="text-[#8B5CF6]">AO SEU NEGÓCIO</span>
            </h2>
            <div className="w-16 h-1.5 bg-[#8B5CF6] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-white/5">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/sjWk3XpdH3s"
                title="Depoimento 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-white/5">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/diPZayPotMU"
                title="Depoimento 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gray-500 text-xs uppercase tracking-widest mb-2 block">
            Nossa Cultura
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-20 tracking-tight">
            NOSSOS <span className="text-[#8B5CF6]">VALORES</span>
          </h2>

          <div className="flex flex-wrap justify-center items-start gap-x-16 gap-y-20">

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <ShieldCheck className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Respeito e Confiança</span>
            </div>

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <UserCheck className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Cliente em Primeiro Lugar</span>
            </div>

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <Lightbulb className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Inovação Constante</span>
            </div>

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <Users className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Trabalho em Equipe</span>
            </div>

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <Smile className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Ambiente Valorizado</span>
            </div>

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <Heart className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Paixão pelo que Fazemos</span>
            </div>

            <div className="flex flex-col items-center gap-4 group max-w-[150px]">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-colors">
                <Leaf className="w-10 h-10 text-gray-500 group-hover:text-[#8B5CF6] transition-colors" />
              </div>
              <span className="text-white font-bold uppercase tracking-wide text-xs">Sustentabilidade</span>
            </div>

          </div>
        </div>
      </section>

      {/* Events and Workshops Section */}
      <section className="py-32 bg-[#0a0a0f] relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gray-500 text-xs uppercase tracking-[0.3em] block mb-2">
              Conexões e Aprendizado
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">
              EVENTOS E <span className="text-[#8B5CF6]">WORKSHOPS</span>
            </h2>
            <div className="w-16 h-1.5 bg-[#8B5CF6] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* ACBR */}
            <div className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg border border-white/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0592.png"
                  alt="ACBR Event"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider mb-2 block">Tecnologia</span>
                <h3 className="text-white text-2xl font-black uppercase mb-1">ACBR</h3>
              </div>
            </div>

            {/* BXBRASIL */}
            <div className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg border border-white/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0676.png"
                  alt="BXBRASIL Event"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider mb-2 block">Business</span>
                <h3 className="text-white text-2xl font-black uppercase mb-1">BXBRASIL</h3>
              </div>
            </div>

            {/* EXPOPOSTOS */}
            <div className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg border border-white/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0839.png"
                  alt="EXPOPOSTOS Event"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider mb-2 block">Setor de Combustíveis</span>
                <h3 className="text-white text-2xl font-black uppercase mb-1">EXPOPOSTOS</h3>
              </div>
            </div>

          </div>
        </div>
        <div className="container mx-auto px-4 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0858.png" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-all duration-500 border border-white/5" alt="Gallery 1" />
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0880.png" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-all duration-500 border border-white/5" alt="Gallery 2" />
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0971.png" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-all duration-500 border border-white/5" alt="Gallery 3" />
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_1010.png" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-all duration-500 border border-white/5" alt="Gallery 4" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreNos;
