import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import TrainingHero from '../../components/custom/TrainingHero/TrainingHero';
import TrainingBenefits from '../../components/custom/TrainingBenefits/TrainingBenefits';
import TrainingFilters from '../../components/custom/TrainingFilters/TrainingFilters';
import TrainingCard from '../../components/custom/TrainingCard/TrainingCard';
import TrainingScheduler from '../../components/custom/TrainingScheduler/TrainingScheduler';
import {
  getAllTrainings,
  getTrainingCategories,
  getTrainingLevels,
  getTrainingFormats,
  getTrainingModalities,
  getTrainingStats
} from '../../../shared/data/__mocks__/trainingsData.js';

const TreinamentosPage = () => {
  const allTrainings = getAllTrainings();
  const stats = getTrainingStats();
  
  // Scroll suave para âncoras
  useEffect(() => {
    const handleAnchorClick = (e) => {
      let anchor = e.target;
      while (anchor && anchor.tagName !== 'A') {
        anchor = anchor.parentElement;
      }
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  // Estados para filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedModality, setSelectedModality] = useState('all');

  // Obter opções de filtros
  const categories = getTrainingCategories();
  const levels = getTrainingLevels();
  const formats = getTrainingFormats();
  const modalities = getTrainingModalities();

  // Filtrar treinamentos
  const filteredTrainings = useMemo(() => {
    return allTrainings.filter(training => {
      // Busca por texto
      const matchesSearch = 
        searchTerm === '' ||
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por categoria
      const matchesCategory = 
        selectedCategory === 'all' || training.category === selectedCategory;

      // Filtro por nível
      const matchesLevel = 
        selectedLevel === 'all' || training.level === selectedLevel;

      // Filtro por formato
      const matchesFormat = 
        selectedFormat === 'all' || training.format === selectedFormat;

      // Filtro por modalidade
      const matchesModality = 
        selectedModality === 'all' || training.modality === selectedModality;

      return matchesSearch && matchesCategory && matchesLevel && matchesFormat && matchesModality;
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedFormat, selectedModality, allTrainings]);

  // Reset de filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedFormat('all');
    setSelectedModality('all');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <TrainingHero stats={stats} />

      {/* Seção de Benefícios */}
      <TrainingBenefits />

      {/* Seção de Treinamentos */}
      <section id="treinamentos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da Seção */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Treinamentos{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Disponíveis
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o treinamento ideal para suas necessidades e desenvolva suas habilidades
              com o sistema Lukos.
            </p>
          </motion.div>

          {/* Filtros e Busca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <TrainingFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
              selectedModality={selectedModality}
              onModalityChange={setSelectedModality}
              categories={categories}
              levels={levels}
              formats={formats}
              modalities={modalities}
              resultCount={filteredTrainings.length}
              onResetFilters={handleResetFilters}
            />
          </motion.div>

          {/* Grid de Treinamentos */}
          {filteredTrainings.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTrainings.map((training, index) => (
                <TrainingCard
                  key={training.id}
                  training={training}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nenhum treinamento encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou fazer uma nova busca.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Formulário de Agendamento */}
      <TrainingScheduler />
    </div>
  );
};

export default TreinamentosPage;
