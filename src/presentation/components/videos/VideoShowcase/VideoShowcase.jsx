import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Clock, Eye, ThumbsUp, Share2, Download } from 'lucide-react';

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 1,
      title: "Lukos ERP - Visão Geral Completa",
      description: "Conheça todas as funcionalidades do sistema em uma demonstração completa de 5 minutos",
      duration: "5:23",
      views: "12.5k",
      likes: "892",
      category: "Overview",
      thumbnail: "https://img.youtube.com/vi/fz5Q0HNVsDE/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/sjWk3XpdH3s?si=Zv2L029tcGpfA30W",
      highlights: [
        "Interface moderna e intuitiva",
        "PDV integrado com bombas",
        "Relatórios em tempo real",
        "Gestão completa de estoque"
      ]
    },
    {
      id: 2,
      title: "PDV em Ação - Vendas de Combustível",
      description: "Veja como é simples e rápido realizar vendas de combustível no sistema PDV do Lukos",
      duration: "3:45",
      views: "8.2k",
      likes: "654",
      category: "PDV",
      thumbnail: "https://img.youtube.com/vi/XY2OcTZqvqs/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/XY2OcTZqvqs?si=z-_ga6EOq1PrQ2by",
      highlights: [
        "Processo de venda simplificado",
        "Múltiplas formas de pagamento",
        "Integração com bombas automática",
        "Emissão de cupom fiscal"
      ]
    },
    {
      id: 3,
      title: "Relatórios Gerenciais Avançados",
      description: "Dashboards interativos e relatórios que ajudam na tomada de decisões estratégicas",
      duration: "4:12",
      views: "6.8k",
      likes: "423",
      category: "Relatórios",
      thumbnail: "https://img.youtube.com/vi/fz5Q0HNVsDE/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/fz5Q0HNVsDE",
      highlights: [
        "Dashboards em tempo real",
        "Análise de vendas por período",
        "Controle de margem de lucro",
        "Previsões e tendências"
      ]
    },
    {
      id: 4,
      title: "Gestão de Estoque Inteligente",
      description: "Sistema automatizado de controle de estoque com alertas e reposição automática",
      duration: "3:28",
      views: "5.1k",
      likes: "312",
      category: "Estoque",
      thumbnail: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      highlights: [
        "Controle automático de tanques",
        "Alertas de baixo estoque",
        "Histórico de movimentações",
        "Relatórios de perdas"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: videos.length },
    { id: 'overview', name: 'Visão Geral', count: 1 },
    { id: 'pdv', name: 'PDV', count: 1 },
    { id: 'relatorios', name: 'Relatórios', count: 1 },
    { id: 'estoque', name: 'Estoque', count: 1 }
  ];

  const currentVideo = videos[selectedVideo];

  return (
    <section id="videos" className="py-32 bg-[#0a0a0f] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <span className="text-[#8B5CF6] text-sm font-bold uppercase tracking-[0.2em] mb-4 block border-l-2 border-[#8B5CF6] pl-4">
            Demonstrações
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter mb-6">
            LUKOS ERP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">EM AÇÃO</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
            Demonstrações práticas de como nosso sistema pode transformar a gestão do seu posto de gasolina com tecnologia de ponta.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Video Player */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-white/5">
              <div className="aspect-video relative">
                {isPlaying ? (
                  <iframe
                    src={`${currentVideo.videoUrl}&autoplay=1`}
                    title={currentVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={currentVideo.thumbnail}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 group-hover:bg-black/20">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all duration-500 group/btn"
                      >
                        <Play className="w-10 h-10 text-white ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{currentVideo.title}</h3>
                  <div className="flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Eye size={16} className="text-[#8B5CF6]" /> {currentVideo.views} views</span>
                    <span className="flex items-center gap-2"><Clock size={16} className="text-[#8B5CF6]" /> {currentVideo.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-4 bg-[#8B5CF6] hover:bg-purple-600 rounded-2xl text-white font-bold uppercase text-xs tracking-widest transition-all">
                    <Download className="w-4 h-4" /> Download App
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-lg font-light leading-relaxed mb-8 border-l-2 border-[#8B5CF6]/30 pl-6">
                {currentVideo.description}
              </p>

              {/* Video Highlights */}
              <div className="grid md:grid-cols-2 gap-4">
                {currentVideo.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.05]">
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                    <span className="text-sm text-gray-300 font-medium uppercase tracking-wide">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                <LayoutDashboard className="text-[#8B5CF6]" size={20} /> Playlist Completa
              </h3>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(index);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all group/item ${selectedVideo === index
                      ? 'bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 shadow-lg shadow-[#8B5CF6]/5'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/5'
                      }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="relative flex-shrink-0 w-24 h-16 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 truncate ${selectedVideo === index ? 'text-[#8B5CF6]' : 'text-white'}`}>
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                          <span>{video.duration}</span>
                          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                          <span>{video.category}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl text-center">
                    <div className="text-2xl font-black text-white">32K+</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Views</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl text-center">
                    <div className="text-2xl font-black text-[#8B5CF6]">2.3K</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Likes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
