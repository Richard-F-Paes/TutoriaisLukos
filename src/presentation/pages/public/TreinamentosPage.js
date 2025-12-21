import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import TrainingHero from '../../components/custom/TrainingHero/TrainingHero';
import TrainingCard from '../../components/custom/TrainingCard/TrainingCard';
import TrainingScheduler from '../../components/custom/TrainingScheduler/TrainingScheduler';
import { useTrainings } from '../../../hooks/useTrainings.js';
import { useTrainingConfigsByType } from '../../../hooks/useTrainingConfigs.js';

const TreinamentosPage = () => {
  // Buscar treinamentos e configurações da API
  const { data: trainingsData, isLoading: trainingsLoading } = useTrainings({ isPublished: true });
  const { data: difficultyLevelsData } = useTrainingConfigsByType('difficulty_level');
  const { data: modalitiesData } = useTrainingConfigsByType('modality');
  const { data: trainingTypesData } = useTrainingConfigsByType('training_type');
  
  const isLoading = trainingsLoading;
  
  // Converter treinamentos da API para formato esperado pelos componentes
  const allTrainings = useMemo(() => {
    if (!trainingsData?.data) return [];
    
    // Criar mapas para lookup rápido das configurações
    const difficultyMap = new Map();
    const difficultyConfigs = difficultyLevelsData || [];
    if (Array.isArray(difficultyConfigs)) {
      difficultyConfigs.forEach(config => {
        difficultyMap.set(config.value, config.label);
      });
    }
    
    const trainingTypeMap = new Map();
    let trainingTypeConfigs = trainingTypesData || [];
    
    // Garantir que é array
    if (!Array.isArray(trainingTypeConfigs)) {
      trainingTypeConfigs = [];
    }
    
    if (Array.isArray(trainingTypeConfigs)) {
      trainingTypeConfigs.forEach(config => {
        if (config.value && config.label) {
          trainingTypeMap.set(config.value, config.label);
        }
      });
    }
    
    // Criar mapa de modalidades
    const modalityMap = new Map();
    let modalityConfigs = modalitiesData || [];
    // Garantir que é array
    if (!Array.isArray(modalityConfigs)) {
      modalityConfigs = [];
    }
    if (Array.isArray(modalityConfigs)) {
      modalityConfigs.forEach(config => {
        if (config.value && config.label) {
          modalityMap.set(config.value, config.label);
        }
      });
    }
    
    return trainingsData.data.map(training => {
      // Mapear difficulty para label usando configurações ou fallback
      const difficultyLabel = difficultyMap.get(training.difficulty) || 
                            (training.difficulty === 'iniciante' ? 'Iniciante' : 
                             training.difficulty === 'intermediario' ? 'Intermediário' : 
                             training.difficulty === 'avancado' ? 'Avançado' : 'Iniciante');
      
      // Determinar format baseado em trainingType usando configurações
      const trainingTypeValue = training.trainingType;
      const trainingTypeLabel = trainingTypeMap.get(trainingTypeValue);
      // Sempre usar label se disponível, caso contrário formatar o value se for técnico
      let format = 'Online'; // fallback padrão
      if (trainingTypeValue) {
        if (trainingTypeLabel) {
          format = trainingTypeLabel;
        } else if (trainingTypeValue.includes('_')) {
          // Formatar value técnico para label legível
          format = trainingTypeValue
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        } else {
          format = trainingTypeValue; // Usar value como está se não for técnico
        }
      }
      
      // Determinar modality usando configurações do banco
      // Se training.modality existe, usar o mapa para converter value->label
      // Caso contrário, usar fallback baseado em vídeos
      let modality = 'Online'; // fallback padrão
      if (training.modality) {
        modality = modalityMap.get(training.modality) || training.modality;
      } else {
        // Fallback: se tem vídeos, é gravado, senão pode ser ao vivo
        const hasVideos = training.videos && training.videos.length > 0;
        modality = hasVideos ? 'Gravado' : 'Ao Vivo';
      }
      
      return {
        id: training.id,
        title: training.title,
        description: training.description || '',
        category: training.category?.name || 'Geral',
        categoryId: training.categoryId,
        level: difficultyLabel,
        difficulty: training.difficulty,
        format: format,
        trainingType: training.trainingType,
        trainingTypeLabel: trainingTypeLabel || format, // Garantir que sempre temos um label
        modality: modality,
        duration: training.estimatedDuration ? `${training.estimatedDuration} min` : '1h',
        modules: training.videos?.length || 1,
        image: training.thumbnailUrl || training.category?.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        thumbnail: training.thumbnailUrl || training.category?.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
        rating: 4.8,
        reviews: 0,
        enrolled: 0,
        maxStudents: 100,
        availableDates: [],
        benefits: ['Certificado de conclusão', 'Material de apoio', 'Suporte durante o curso'],
        icon: 'ShoppingCart',
        slug: training.slug
      };
    });
  }, [trainingsData, difficultyLevelsData, trainingTypesData, modalitiesData]);
  
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
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTrainingType, setSelectedTrainingType] = useState('all');
  const [selectedModality, setSelectedModality] = useState('all');

  // Obter opções de filtros do banco de dados
  const levels = useMemo(() => {
    // React Query retorna { data, isLoading, ... }, então acessamos .data
    // O service já retorna o array diretamente, então difficultyLevelsData já é o array
    const configs = difficultyLevelsData || [];
    if (Array.isArray(configs) && configs.length > 0) {
      return configs
        .filter(config => config.isActive !== false)
        .map(config => config.label)
        .sort((a, b) => {
          const order = ['Iniciante', 'Intermediário', 'Avançado'];
          const indexA = order.indexOf(a);
          const indexB = order.indexOf(b);
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return a.localeCompare(b);
        });
    }
    // Fallback: extrair níveis únicos dos treinamentos
    return [...new Set(allTrainings.map(t => t.level).filter(Boolean))];
  }, [difficultyLevelsData, allTrainings]);
  
  const trainingTypes = useMemo(() => {
    // React Query retorna { data, isLoading, ... }
    // O service já retorna o array diretamente, então trainingTypesData já é o array
    let configs = trainingTypesData || [];
    
    // Garantir que é array
    if (!Array.isArray(configs)) {
      configs = [];
    }
    
    if (configs.length > 0) {
      // Filtrar e mapear apenas labels, garantindo que temos a propriedade label
      // Se label não existir ou for igual ao value (que pode ser um value técnico), usar o value como fallback
      const labels = configs
        .filter(config => {
          // Filtrar apenas ativos
          if (config.isActive === false) return false;
          // Garantir que temos pelo menos label ou value
          return config.label || config.value;
        })
        .map(config => {
          // Priorizar label, mas se não existir ou for igual ao value (e value parece ser técnico), formatar o value
          if (config.label && config.label !== config.value) {
            return config.label;
          }
          // Se label não existe ou é igual ao value, e value parece ser técnico (tem underscore), formatar
          if (config.value) {
            // Se value parece ser técnico (tem underscore), formatar para label legível
            if (config.value.includes('_')) {
              return config.value
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            }
            // Caso contrário, usar o value como está (pode já ser um label)
            return config.value;
          }
          return null;
        })
        .filter(Boolean) // Remover nulls
        .sort((a, b) => a.localeCompare(b));
      
      if (labels.length > 0) {
        return labels;
      }
    }
    
    // Fallback: extrair tipos únicos dos treinamentos (já são labels porque format é convertido)
    const uniqueFormats = [...new Set(allTrainings.map(t => t.format).filter(Boolean))];
    return uniqueFormats.sort((a, b) => a.localeCompare(b));
  }, [trainingTypesData, allTrainings]);

  // Mapeamento de value para label para tipos de treinamento
  const trainingTypeValueToLabel = useMemo(() => {
    // O service já retorna o array diretamente, então trainingTypesData já é o array
    let configs = trainingTypesData || [];
    
    // Garantir que é array
    if (!Array.isArray(configs)) {
      configs = [];
    }
    
    const map = new Map();
    configs.forEach(config => {
      if (config.value) {
        // Determinar o label a ser usado
        let labelToUse = config.label;
        
        // Se label não existe ou é igual ao value, e value parece ser técnico, formatar
        if (!labelToUse || labelToUse === config.value) {
          if (config.value.includes('_')) {
            // Formatar value técnico para label legível
            labelToUse = config.value
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          } else {
            // Usar o value como label
            labelToUse = config.value;
          }
        }
        
        // Mapear value -> label
        map.set(config.value, labelToUse);
        // Também mapear label -> label (para casos onde o value já é um label)
        map.set(labelToUse, labelToUse);
      }
    });
    return map;
  }, [trainingTypesData]);
  
  const modalities = useMemo(() => {
    // React Query retorna { data, isLoading, ... }, então acessamos .data
    // O service já retorna o array diretamente, então modalitiesData já é o array
    let configs = modalitiesData || [];
    
    // Garantir que é array
    if (!Array.isArray(configs)) {
      configs = [];
    }
    
    if (configs.length > 0) {
      const labels = configs
        .filter(config => config.isActive !== false && config.label)
        .map(config => config.label)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
      
      if (labels.length > 0) {
        return labels;
      }
    }
    
    // Fallback: extrair modalidades únicas dos treinamentos
    const uniqueModalities = [...new Set(allTrainings.map(t => t.modality).filter(Boolean))];
    
    return uniqueModalities.sort((a, b) => a.localeCompare(b));
  }, [modalitiesData, allTrainings]);

  // Filtrar treinamentos
  const filteredTrainings = useMemo(() => {
    return allTrainings.filter(training => {
      // Busca por texto
      const matchesSearch = 
        searchTerm === '' ||
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por nível (comparar por label formatado ou difficulty)
      const matchesLevel = 
        selectedLevel === 'all' || 
        training.level === selectedLevel ||
        training.difficulty === selectedLevel.toLowerCase();

      // Filtro por tipo de treinamento (comparar por format que é o label)
      // selectedTrainingType sempre é um label quando selecionado pelo usuário
      const matchesTrainingType = 
        selectedTrainingType === 'all' || 
        training.format === selectedTrainingType;

      // Filtro por modalidade (comparar por label)
      const matchesModality = 
        selectedModality === 'all' || training.modality === selectedModality;

      return matchesSearch && matchesLevel && matchesTrainingType && matchesModality;
    });
  }, [searchTerm, selectedLevel, selectedTrainingType, selectedModality, allTrainings]);

  // Reset de filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLevel('all');
    setSelectedTrainingType('all');
    setSelectedModality('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando treinamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section com Filtros e Resultados Unificados */}
      <TrainingHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedTrainingType={selectedTrainingType}
        onTrainingTypeChange={setSelectedTrainingType}
        selectedModality={selectedModality}
        onModalityChange={setSelectedModality}
        levels={levels}
        trainingTypes={trainingTypes}
        trainingTypeValueToLabel={trainingTypeValueToLabel}
        modalities={modalities}
        resultCount={filteredTrainings.length}
        onResetFilters={handleResetFilters}
        filteredTrainings={filteredTrainings}
      />

      {/* Formulário de Agendamento */}
      <TrainingScheduler />
    </div>
  );
};

export default TreinamentosPage;
