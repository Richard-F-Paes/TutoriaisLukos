import React, { useState } from "react";
import { Search } from "lucide-react";

const InputSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Busca:", searchQuery);
    // Aqui você pode adicionar lógica de busca real
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Procure pelo Tutorial
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
         Busque pelo Tutorial, Retaguarda, PDV, Fatura, Cadastro...
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite sua busca... (ex: Cadastro, Entrada de nota fiscal, Relatório)"
              className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-0 shadow-2xl focus:ring-4 focus:ring-white/30 focus:outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["Smart Pos", "Frente caixa", "Abertura de caixa", "Produtos", "Dashboard"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-2 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputSearch;
