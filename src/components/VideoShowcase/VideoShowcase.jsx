import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Clock, Eye, ThumbsUp, Share2, Download } from 'lucide-react';

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'Lukos ERP - Visão Geral Completa',
      description: 'Conheça todas as funcionalidades do sistema em uma demonstração completa de 5 minutos',
      duration: '5:23',
      views: '12.5k',
      likes: '892',
      category: 'Overview',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Interface moderna e intuitiva',
        'PDV integrado com bombas',
        'Relatórios em tempo real',
        'Gestão completa de estoque',
      ],
    },
    {
      id: 2,
      title: 'PDV em Ação - Vendas de Combustível',
      description: 'Veja como é simples e rápido realizar vendas de combustível no sistema PDV do Lukos',
      duration: '3:45',
      views: '8.2k',
      likes: '654',
      category: 'PDV',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Processo de venda simplificado',
        'Múltiplas formas de pagamento',
        'Integração com bombas automática',
        'Emissão de cupom fiscal',
      ],
    },
    {
      id: 3,
      title: 'Relatórios Gerenciais Avançados',
      description: 'Dashboards interativos e relatórios que ajudam na tomada de decisões estratégicas',
      duration: '4:12',
      views: '6.8k',
      likes: '423',
      category: 'Relatórios',
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Dashboards em tempo real',
        'Análise de vendas por período',
        'Controle de margem de lucro',
        'Previsões e tendências',
      ],
    },
    {
      id: 4,
      title: 'Gestão de Estoque Inteligente',
      description: 'Sistema automatizado de controle de estoque com alertas e reposição automática',
      duration: '3:28',
      views: '5.1k',
      likes: '312',
      category: 'Estoque',
      thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Controle automático de tanques',
        'Alertas de baixo estoque',
        'Histórico de movimentações',
        'Relatórios de perdas',
      ],
    },
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: videos.length },
    { id: 'overview', name: 'Visão Geral', count: 1 },
    { id: 'pdv', name: 'PDV', count: 1 },
    { id: 'relatorios', name: 'Relatórios', count: 1 },
    { id: 'estoque', name: 'Estoque', count: 1 },
  ];

  const currentVideo = videos[selectedVideo];

  return (
    <section id="videos" className="py-16 md:py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-slate-900">Veja o Lukos ERP em Ação</h2>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Demonstrações práticas de como nosso sistema pode transformar a gestão do seu posto de gasolina
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 md:w-8 md:h-8 text-slate-100" />
                    ) : (
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-slate-100 ml-1" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-4">
                      <button className="text-slate-100 hover:text-blue-300 transition-colors">
                        <Play className="w-5 h-5" />
                      </button>
                      <div className="flex-1 bg-white/20 rounded-full h-1">
                        <div className="bg-blue-400 h-1 rounded-full w-1/3"></div>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-100 text-sm">
                        <Volume2 className="w-4 h-4" />
                        <Maximize className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-6">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-slate-900">{currentVideo.title}</h3>
              <p className="text-slate-600 mb-4">{currentVideo.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{currentVideo.views} visualizações</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{currentVideo.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentVideo.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-slate-700" />
                  </button>
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>

              <div className="mt-5 md:mt-6 bg-slate-50 rounded-xl p-5 md:p-6">
                <h4 className="font-semibold mb-3 text-slate-900">Destaques deste vídeo:</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {currentVideo.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6 text-slate-900">Playlist Completa</h3>

              <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                {categories.slice(0, 3).map((category) => (
                  <button
                    key={category.id}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="space-y-3.5 md:space-y-4">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(index)}
                    className={`w-full text-left p-3.5 md:p-4 rounded-xl transition-all border ${
                      selectedVideo === index
                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex space-x-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                          <Play className="w-4 h-4 text-slate-100" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 text-slate-100 text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">{video.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{video.description}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.category}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">32k+</div>
                    <div className="text-xs text-slate-500">Total de Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">2.3k</div>
                    <div className="text-xs text-slate-500">Likes</div>
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


