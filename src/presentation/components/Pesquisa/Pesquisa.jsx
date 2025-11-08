import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllTutorials } from "../../../shared/data/__mocks__/lukosTutorials.js";

const Pesquisa = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allTutorials, setAllTutorials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAllTutorials(getAllTutorials());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = allTutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = allTutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.subcategory.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleTutorialClick = (tutorialId) => {
    navigate(`/tutorial/${tutorialId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="pt-2 bg-white/95  border-b border-gray-300 pb-2 relative z-[9997]">
      <div className=" mx-auto px-4 sm:px-6 pt-2 ">
       

        <form onSubmit={handleSearch} className="w-[80vw] mx-auto relative z-[9998]">
          <div className="flex items-center gap-4 relative">
            <img src="logo.png" alt="Logo" 
            className="w-12 h-12 flex-shrink-0"
            />
            <h1 className="text-[20px] font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-600 group-hover:to-purple-700 transition-all duration-500 ease-in-out whitespace-nowrap text-center">
              Tutorial Lukos
            </h1>
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Digite sua busca... (ex: Cadastro, Entrada de nota fiscal, Relatório)"
                className="w-full h-full pl-6 pr-14 py-4 text-lg rounded-[30px]  focus:ring-4 focus:ring-white/30 focus:outline-none placeholder-gray-400"
                style={{ border: '1px solid oklch(0.6722 0.0355 279.77)' }}
              />
              <div className="absolute right-2 top-2 flex gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Search className="h-5 w-5" />
              </button>
              </div>

              {/* Resultados da busca */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-[9999]">
                  {searchResults.length > 0 ? (
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-3">
                        {searchResults.length} tutorial{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                      </div>
                      {searchResults.map((tutorial) => (
                    <div
                      key={tutorial.id}
                      onClick={() => handleTutorialClick(tutorial.id)}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${tutorial.color}`}>
                          <tutorial.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{tutorial.title}</h3>
                          <p className="text-sm text-gray-600 truncate">{tutorial.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tutorial.category}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tutorial.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">{tutorial.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Nenhum tutorial encontrado para "{searchQuery}"
                </div>
              )}
              </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


