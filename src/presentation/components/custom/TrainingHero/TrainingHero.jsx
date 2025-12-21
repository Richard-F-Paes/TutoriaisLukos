import React from 'react';
import { motion } from 'framer-motion';
import TrainingFilters from '../TrainingFilters/TrainingFilters';

const TrainingHero = ({
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
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Título com Gradiente */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(147, 51, 234) 25%, rgb(79, 70, 229) 50%, rgb(37, 99, 235) 50%, rgb(147, 51, 234) 75%, rgb(79, 70, 229) 100%)'
              }}
            >
              Treinamentos
              <br />
              Lukos
            </span>
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Domine todas as funcionalidades do sistema Lukos com nossos treinamentos práticos,
            ministrados por especialistas do sistema.
          </motion.p>
        </div>

        {/* Filtros no rodapé do hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TrainingFilters
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            selectedLevel={selectedLevel}
            onLevelChange={onLevelChange}
            selectedTrainingType={selectedTrainingType}
            onTrainingTypeChange={onTrainingTypeChange}
            selectedModality={selectedModality}
            onModalityChange={onModalityChange}
            levels={levels}
            trainingTypes={trainingTypes}
            trainingTypeValueToLabel={trainingTypeValueToLabel}
            modalities={modalities}
            resultCount={resultCount}
            onResetFilters={onResetFilters}
            filteredTrainings={filteredTrainings}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(TrainingHero);

