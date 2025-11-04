import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { tutorials } from '../../../../shared/data/__mocks__/videoTutorialsData.js';

const VideoTutorialHeader = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = tutorials.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, 5)); // Limitar a 5 resultados
      setShowResults(true);
    } else {
      setFilteredResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result) => {
    setSearchTerm('');
    setShowResults(false);
    // Aqui você pode navegar para o tutorial ou filtrar
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0f0f0f] border-b border-[#272727] z-50 transition-colors">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center space-x-4">
          <button onClick={onMenuClick} className="p-2 hover:bg-[#272727] rounded-full transition-colors">
            <Menu size={20} className="text-gray-300" />
          </button>
          <div className="flex items-center space-x-2">
            <img 
              src="/LukosTube.png" 
              alt="LukosTube" 
              className="w-10 h-10 rounded"
            />
            <span className="font-semibold text-xl hidden sm:block text-white">LukosTube</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
          <div className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Pesquisar tutoriais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowResults(true)}
                className="w-full px-4 py-2 border border-[#272727] rounded-l-full focus:outline-none focus:border-blue-500 bg-[#181818] text-white transition-colors"
              />
              {showResults && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#181818] border border-[#272727] rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#272727] transition-colors border-b border-[#272727] last:border-b-0"
                    >
                      <div className="flex-1 text-left">
                        <p className="text-white text-sm font-medium">{result.title}</p>
                        <p className="text-gray-400 text-xs">{result.category} • {result.views} visualizações</p>
                      </div>
                      <div className="text-gray-500 text-xs">{result.duration}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="px-6 py-2 bg-[#272727] border border-l-0 border-[#272727] rounded-r-full hover:bg-[#3f3f3f] transition-colors">
              <Search size={20} className="text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={toggleTheme} className="p-2 hover:bg-[#272727] rounded-full transition-colors">
            {theme === 'light' ? <Moon size={20} className="text-gray-300" /> : <Sun size={20} className="text-gray-300" />}
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
            <Bell size={20} className="text-gray-300" />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
            <User size={20} className="text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default VideoTutorialHeader;
