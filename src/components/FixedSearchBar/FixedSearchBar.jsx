import React, { useState, useEffect, useRef } from "react";
import { Search, X, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllTutorials } from "../../data/lukosTutorials";

const FixedSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allTutorials, setAllTutorials] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    setAllTutorials(getAllTutorials());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedIndex(-1);
    
    if (query.trim()) {
      const results = allTutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.subcategory.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limitar a 8 resultados
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleTutorialClick(searchResults[selectedIndex].id);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setIsExpanded(false);
        setSearchQuery('');
        setSelectedIndex(-1);
        break;
    }
  };

  const handleTutorialClick = (tutorialId) => {
    navigate(`/tutorial/${tutorialId}`);
    setShowResults(false);
    setSearchQuery("");
    setIsExpanded(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsExpanded(false);
  };

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Barra de pesquisa minimalista */}
      <div className={`fixed top-16 z-50 transition-all duration-300 ${
        isExpanded ? 'left-1/2 transform -translate-x-1/2' : 'right-4'
      }`}>
        <div className="relative pt-12 pr-2">
          {!isExpanded ? (
            // Ícone minimalista
            <button
              onClick={handleIconClick}
              className="w-16 h-16 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>
          ) : (
            // Barra expandida centralizada
            <div className="bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden w-[28rem] max-w-[90vw]">
              <div className="flex items-center">
                <div className="pl-5 pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar tutoriais..."
                  className="flex-1 py-4 px-3 text-base border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Dropdown de resultados */}
          {showResults && isExpanded && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50 w-[32rem] max-w-[90vw]">
              {searchResults.length > 0 ? (
                <div className="p-1">
                  <div className="text-sm text-gray-600 px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-gray-500">Pressione Enter para pesquisar</span>
                    </div>
                  </div>
                  <div className="py-2">
                    {searchResults.map((tutorial, index) => {
                      const IconComponent = tutorial.icon;
                      return (
                        <div
                          key={tutorial.id}
                          onClick={() => handleTutorialClick(tutorial.id)}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-200 mx-2 my-1 group ${
                            index === selectedIndex 
                              ? 'bg-gradient-to-r from-blue-100 to-purple-100 ring-2 ring-blue-300' 
                              : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 ${tutorial.color}`}>
                              <IconComponent className="w-6 h-6 text-black" />
                            </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className={`font-semibold text-base transition-colors duration-200 line-clamp-2 ${
                                index === selectedIndex 
                                  ? 'text-blue-700' 
                                  : 'text-gray-900 group-hover:text-blue-600'
                              }`}>
                                {tutorial.title}
                              </h3>
                              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{tutorial.duration}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                              {tutorial.description}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                                {tutorial.category}
                              </span>
                              {tutorial.subcategory && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  {tutorial.subcategory}
                                </span>
                              )}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{tutorial.difficulty}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum tutorial encontrado</h3>
                  <p className="text-sm text-gray-500">
                    Tente usar palavras-chave diferentes ou verifique a ortografia
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixedSearchBar;
