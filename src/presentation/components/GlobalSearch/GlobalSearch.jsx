import React, { useState, useEffect, useRef } from "react";
import { Search, X, Clock, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearchTutorials } from "../../../hooks/useTutorials.js";

const GlobalSearch = ({ placeholder = "Buscar tutoriais...", showSuggestions = true, className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { data: searchData, isLoading: isSearching } = useSearchTutorials(
    searchQuery.trim().length > 2 ? searchQuery : '',
    { limit: 8 }
  );

  const searchResults = searchData?.data || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 2 && showSuggestions) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery, showSuggestions]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTutorialClick = (tutorial) => {
    const tutorialId = tutorial.Id || tutorial.id
    const tutorialSlug = tutorial.Slug || tutorial.slug || tutorialId
    navigate(`/tutoriais/${tutorialSlug}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault();
      // Redirecionar para página de busca com query
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
          <div className="pl-4 pr-2">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 py-3 px-2 text-sm border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => searchQuery.trim() && navigate(`/busca?q=${encodeURIComponent(searchQuery)}`)}
            className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dropdown de resultados */}
        {showResults && showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
            {searchResults.length > 0 ? (
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                  {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                </div>
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Buscando...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((tutorial) => {
                    const tutorialTitle = tutorial.Title || tutorial.title
                    const tutorialDescription = tutorial.Description || tutorial.description
                    const tutorialCategory = tutorial.Category?.Name || tutorial.CategoryName || tutorial.category
                    const tutorialDuration = tutorial.EstimatedDuration 
                      ? `${tutorial.EstimatedDuration} min` 
                      : tutorial.duration || 'N/A'
                    const tutorialDifficulty = tutorial.Difficulty || tutorial.difficulty || 'Geral'
                    
                    return (
                      <div
                        key={tutorial.Id || tutorial.id}
                        onClick={() => handleTutorialClick(tutorial)}
                        className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs bg-purple-600">
                            <Search className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm truncate">{tutorialTitle}</h3>
                            <p className="text-xs text-gray-600 truncate mt-1">{tutorialDescription || 'Sem descrição'}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {tutorialCategory || 'Geral'}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {tutorialDuration}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {tutorialDifficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Nenhum tutorial encontrado
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/busca?q=${encodeURIComponent(searchQuery)}`)}
                      className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium py-2"
                    >
                      Ver todos os resultados
                    </button>
                  </div>
                )}
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
  );
};

export default GlobalSearch;
