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
    
    if (query.trim()) {
      const results = allTutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.subcategory.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limitar a 5 resultados
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
    setIsExpanded(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Barra de pesquisa fixa */}
      <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isExpanded ? 'w-96' : 'w-64'
      }`}>
        <div className="relative">
          <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
            <div className="pl-4 pr-2">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleFocus}
              placeholder="Buscar tutoriais..."
              className="flex-1 py-2 px-2 text-sm border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dropdown de resultados */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto z-50">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                    {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                  </div>
                  {searchResults.map((tutorial) => (
                    <div
                      key={tutorial.id}
                      onClick={() => handleTutorialClick(tutorial.id)}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-50 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs ${tutorial.color}`}>
                          <tutorial.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{tutorial.title}</h3>
                          <p className="text-xs text-gray-600 truncate mt-1">{tutorial.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {tutorial.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tutorial.duration}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {tutorial.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Nenhum tutorial encontrado
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
