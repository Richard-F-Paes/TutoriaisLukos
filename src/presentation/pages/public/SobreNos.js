import { ArrowRight, Play, Quote, ShieldCheck, UserCheck, Lightbulb, Users, Smile, Heart, Leaf, Award, Calendar } from 'lucide-react';


function SobreNos() {
  const purpleColor = '#8B5CF6'; // Purple accent color

  return (
    <div className="bg-[#1a1a1a] min-h-screen font-sans text-gray-200">

      {/* Hero Section - "WHO WE ARE" Style */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            // Using a tech/modern office image but styled to be dark/moody
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            className="w-full h-full object-cover grayscale opacity-40 hover:scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl">
            <span className="block text-[#8B5CF6] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base pl-1 border-l-4 border-[#8B5CF6]">
              Sobre Nós
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-none mb-6 tracking-tighter">
              LUKOS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                TECNOLOGIA
              </span>
            </h1>
            <div className="mb-8 border-l border-gray-700 pl-6">
              <span className="block text-[#8B5CF6] font-bold uppercase tracking-widest text-sm mb-2">Nossa Missão</span>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl ">
                Desenvolver soluções de software inteligentes e inovadoras, que simplifiquem processos e melhorem a eficiência das pessoas e das empresas, sempre com foco na qualidade, personalização e suporte contínuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section - "READY FOR SOME SWEATING" Style */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <div className="relative z-10">
              <span className="text-[#8B5CF6] text-sm uppercase tracking-widest font-bold mb-2 block border-l-2 border-[#8B5CF6] pl-3">
                Visão Geral
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#8B5CF6] uppercase mb-8 leading-tight">
                PRONTOS PARA <br />
                <span className="text-white">O FUTURO</span>
              </h2>

              <div className="space-y-6 text-gray-400 leading-relaxed">
                <div>
                  <span className="block text-white font-bold uppercase tracking-widest text-sm mb-2">Nossa Visão</span>
                  <p>
                    Ser a principal referência no desenvolvimento de software para Postos de Combustíveis e Varejo, liderando a transformação digital do setor e promovendo o crescimento sustentável e o bem-estar de nossos clientes, parceiros, colaboradores e da comunidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Video/Image Placeholder */}
            <div className="relative group">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-2xl relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/F_itCCQd0nk"
                  title="Vídeo Institucional"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#8B5CF6] -z-10 opacity-20"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section - "MEMBER STORIES" Style */}
      <section className="py-24 relative bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gray-500 text-xs uppercase tracking-[0.3em] block mb-2">
              Histórias de Sucesso
            </span>
            <h2 className="text-4xl font-black text-[#8B5CF6] uppercase">
              A LUKOS aplicada
              ao seu negócio.
            </h2>
            <div className="w-16 h-1 bg-[#8B5CF6] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/sjWk3XpdH3s"
                title="Depoimento 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
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
      <section className="py-20 bg-[#0f0518] border-t border-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gray-500 text-xs uppercase tracking-widest mb-2 block">
            Nossa Cultura
          </span>
          <h2 className="text-3xl font-black text-[#8B5CF6] uppercase mb-16">
            NOSSOS VALORES
          </h2>

          <div className="flex flex-wrap justify-center items-start gap-x-12 gap-y-16 opacity-80 hover:opacity-100 transition-all duration-500">

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <ShieldCheck className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Respeito e Confiança</span>
            </div>

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <UserCheck className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Cliente em Primeiro Lugar</span>
            </div>

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <Lightbulb className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Inovação Constante</span>
            </div>

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <Users className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Trabalho em Equipe</span>
            </div>

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <Smile className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Ambiente Valorizado</span>
            </div>

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <Heart className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Paixão pelo que Fazemos</span>
            </div>

            <div className="flex flex-col items-center gap-3 group max-w-[150px]">
              <Leaf className="w-14 h-14 text-white group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">Sustentabilidade</span>
            </div>

          </div>
        </div>
      </section>

      {/* Events and Workshops Section */}
      <section className="py-24 bg-[#0f0518] border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gray-500 text-xs uppercase tracking-[0.3em] block mb-2">
              Conexões e Aprendizado
            </span>
            <h2 className="text-4xl font-black text-[#8B5CF6] uppercase">
              EVENTOS E WORKSHOPS
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Conheça mais sobre nossa participação em eventos e workshops.
            </p>
            <div className="w-16 h-1 bg-[#8B5CF6] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ACBR */}
            <div className="group relative overflow-hidden rounded-lg cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0592.png"
                  alt="ACBR Event"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider mb-2 block">Tecnologia</span>
                <h3 className="text-white text-2xl font-black uppercase mb-1">ACBR</h3>
                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Automação Comercial Brasil
                </p>
              </div>
            </div>

            {/* BXBRASIL */}
            <div className="group relative overflow-hidden rounded-lg cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0676.png"
                  alt="BXBRASIL Event"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider mb-2 block">Business</span>
                <h3 className="text-white text-2xl font-black uppercase mb-1">BXBRASIL</h3>
                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Business Exchange Brasil
                </p>
              </div>
            </div>

            {/* EXPOPOSTOS */}
            <div className="group relative overflow-hidden rounded-lg cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0839.png"
                  alt="EXPOPOSTOS Event"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider mb-2 block">Setor de Combustíveis</span>
                <h3 className="text-white text-2xl font-black uppercase mb-1">EXPOPOSTOS</h3>
                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Feira e Fórum Internacional
                </p>
              </div>
            </div>

          </div>
        </div>
        <div className="container mx-auto px-4 pt-8">


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0858.png" className="w-full h-48 object-cover rounded-sm hover:scale-105 transition-all duration-500" alt="Gallery 1" />
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0880.png" className="w-full h-48 object-cover rounded-sm hover:scale-105 transition-all duration-500" alt="Gallery 2" />
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_0971.png" className="w-full h-48 object-cover rounded-sm hover:scale-105 transition-all duration-500" alt="Gallery 3" />
            <img src="https://lukos.com.br/wp-content/uploads/2025/01/IMG_1010.png" className="w-full h-48 object-cover rounded-sm hover:scale-105 transition-all duration-500" alt="Gallery 4" />
          </div>
        </div>
      </section>



    </div >
  );
}

export default SobreNos;
