import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TrainingFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedFormat,
  onFormatChange,
  selectedModality,
  onModalityChange,
  categories,
  levels,
  formats,
  modalities,
  resultCount,
  onResetFilters
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const filterRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };

    if (activeFilter) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeFilter]);

  const hasActiveFilters = 
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedFormat !== 'all' ||
    selectedModality !== 'all';

  const handleFilterToggle = (filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => {
    const isActive = activeFilter === label.toLowerCase();
    const hasSelection = value !== 'all';
    const dropdownRef = useRef(null);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => handleFilterToggle(label.toLowerCase())}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all duration-200
            ${hasSelection
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
            }
          `}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span className="text-sm font-medium">{label}</span>
          {hasSelection && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {value}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isActive ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-full sm:w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto">
                <button
                  onClick={() => {
                    onChange('all');
                    setActiveFilter(null);
                  }}
                  className={`
                    w-full text-left px-4 py-3 flex items-center gap-3 transition-colors
                    ${value === 'all'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {value === 'all' && <Check className="w-4 h-4" />}
                  <span className={value === 'all' ? 'ml-0' : 'ml-7'}>Todos</span>
                </button>
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setActiveFilter(null);
                    }}
                    className={`
                      w-full text-left px-4 py-3 flex items-center gap-3 transition-colors
                      ${value === option
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {value === option && <Check className="w-4 h-4" />}
                    <span className={value === option ? 'ml-0' : 'ml-7'}>{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div ref={filterRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Barra de Busca */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar treinamentos..."
          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-700">Filtros</h3>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="ml-auto flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              <X className="w-3.5 h-3.5" />
              Limpar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <FilterDropdown
            label="Categoria"
            value={selectedCategory}
            options={categories}
            onChange={onCategoryChange}
            icon={Filter}
          />
          <FilterDropdown
            label="Nível"
            value={selectedLevel}
            options={levels}
            onChange={onLevelChange}
            icon={Filter}
          />
          <FilterDropdown
            label="Formato"
            value={selectedFormat}
            options={formats}
            onChange={onFormatChange}
            icon={Filter}
          />
          <FilterDropdown
            label="Modalidade"
            value={selectedModality}
            options={modalities}
            onChange={onModalityChange}
            icon={Filter}
          />
        </div>
      </div>

      {/* Contador de Resultados */}
      {resultCount !== null && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{resultCount}</span>
            {' '}
            {resultCount === 1 ? 'treinamento encontrado' : 'treinamentos encontrados'}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(TrainingFilters);

