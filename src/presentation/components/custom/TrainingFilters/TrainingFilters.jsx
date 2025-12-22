import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TrainingCard from '../TrainingCard/TrainingCard';

const TrainingFilters = ({
  searchTerm,
  onSearchChange,
  selectedLevel,
  onLevelChange,
  selectedTrainingType,
  onTrainingTypeChange,
  selectedModality,
  onModalityChange,
  levels,
  trainingTypes,
  trainingTypeValueToLabel,
  modalities,
  resultCount,
  onResetFilters,
  filteredTrainings = []
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
    selectedLevel !== 'all' ||
    selectedTrainingType !== 'all' ||
    selectedModality !== 'all';

  const handleFilterToggle = (filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const FilterDropdown = ({ label, value, options, onChange, icon: Icon, valueToLabelMap }) => {
    const isActive = activeFilter === label.toLowerCase();
    const hasSelection = value !== 'all';
    const dropdownRef = useRef(null);

    // Encontrar o label correspondente ao value
    // Prioridade: 1) Se está nas options (já é label), 2) Tentar converter via map, 3) Usar value original
    let displayValue = value;
    if (hasSelection && value !== 'all') {
      // Primeiro, tentar usar o mapeamento (funciona para value e label)
      if (valueToLabelMap && valueToLabelMap instanceof Map && valueToLabelMap.has(value)) {
        displayValue = valueToLabelMap.get(value);
      }
      // Se não encontrou no map, verificar se está nas options (já é um label válido)
      else if (options.includes(value)) {
        displayValue = value;
      }
      // Caso contrário, manter o value original (pode ser um label que não está nas options filtradas)
    }

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
              {displayValue}
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
                {options.map((option) => {
                  // Garantir que option é sempre um label válido
                  const displayOption = option;
                  // Verificar se o value atual corresponde a esta option (pode ser label ou value)
                  const isSelected = value === option || 
                    (valueToLabelMap && valueToLabelMap.has(value) && valueToLabelMap.get(value) === option) ||
                    (valueToLabelMap && valueToLabelMap.has(option) && valueToLabelMap.get(option) === value);
                  
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        onChange(option); // Sempre passar o label
                        setActiveFilter(null);
                      }}
                      className={`
                        w-full text-left px-4 py-3 flex items-center gap-3 transition-colors
                        ${isSelected
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {isSelected && <Check className="w-4 h-4" />}
                      <span className={isSelected ? 'ml-0' : 'ml-7'}>{displayOption}</span>
                    </button>
                  );
                })}
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
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar treinamentos..."
          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            aria-label="Limpar busca"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="space-y-4">
        {hasActiveFilters && (
          <div className="flex justify-end mb-4">
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              <X className="w-3.5 h-3.5" />
              Limpar filtros
            </button>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <FilterDropdown
            label="Nível"
            value={selectedLevel}
            options={levels || []}
            onChange={onLevelChange}
            icon={Filter}
          />
          <FilterDropdown
            label="Tipo de Treinamento"
            value={selectedTrainingType}
            options={trainingTypes || []}
            onChange={onTrainingTypeChange}
            icon={Filter}
            valueToLabelMap={trainingTypeValueToLabel}
          />
          <FilterDropdown
            label="Modalidade"
            value={selectedModality}
            options={modalities || []}
            onChange={onModalityChange}
            icon={Filter}
          />
        </div>
      </div>

      {/* Grid de Treinamentos */}
      {filteredTrainings.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="max-h-[950px] overflow-y-auto overflow-x-hidden pr-2" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainings.map((training, index) => (
                <TrainingCard
                  key={training.id}
                  training={training}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando não há resultados */}
      {filteredTrainings.length === 0 && resultCount === 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200 text-center py-12">
          <p className="text-lg text-gray-600">
            Nenhum treinamento encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(TrainingFilters);

