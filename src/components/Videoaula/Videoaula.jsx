import React, { useState } from "react";
import { Fuel, ShoppingCart, BookOpen, ArrowDown, Search } from "lucide-react";

// --- Hero Section ---
const HeroTutorial = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.08)_1px,_transparent_0)] bg-[size:24px_24px] opacity-10"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-300">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg transform rotate-6 hover:-rotate-6 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            LUKOS{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TUTORIAL CADASTROS
            </span>
          </h1>

      
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {[
            { icon: <Fuel className="h-6 w-6 text-blue-600" />, title: "Pista de Combustível", desc: "Gestão completa das operações de combustível", bg: "bg-blue-100" },
            { icon: <ShoppingCart className="h-6 w-6 text-purple-600" />, title: "Conveniência", desc: "Controle e vendas dos produtos da loja", bg: "bg-purple-100" },
            { icon: <BookOpen className="h-6 w-6 text-green-600" />, title: "Sistema Geral", desc: "Relatórios, cadastros e configurações", bg: "bg-green-100" },
          ].map((item, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className={`${item.bg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400 mx-auto" />
        </div>
      </div>
    </section>
  );
};

// --- Video Section ---
const Videoaula = () => {
  const [search, setSearch] = useState("");

  const videosList = Array(6).fill({
    title: "Cadastro de Produtos",
    link: "https://www.youtube.com/embed/KioYMUZxrSE?rel=0",
  });

  const filteredVideos = videosList.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <HeroTutorial />

      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Título e barra de busca */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎥 Videoaula</h2>
            <p className="text-gray-600 mb-6">Encontre tutoriais passo a passo para aprender cada módulo.</p>

            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Pesquisar videoaula..."
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>

          {/* Grid de vídeos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={video.link}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{video.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">Clique para assistir a videoaula completa.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videoaula;
