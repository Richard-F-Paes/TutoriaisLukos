import React from 'react';
import {
  Clock,
  MapPin,
  Globe,
  Video,
  Monitor,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTrainingModal } from '../../../../contexts/TrainingModalContext';

const TrainingCard = ({ training, index = 0 }) => {
  const { openModal } = useTrainingModal();
  
  // Determinar ícone de formato
  const getFormatIcon = (format) => {
    switch (format) {
      case 'Presencial':
        return MapPin;
      case 'Online':
        return Globe;
      case 'Híbrido':
        return Monitor;
      default:
        return Video;
    }
  };

  const FormatIcon = getFormatIcon(training.format);

  // Cores para níveis
  const getLevelColor = (level) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Intermediário':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Avançado':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Cores para formato
  const getFormatColor = (format) => {
    switch (format) {
      case 'Presencial':
        return 'bg-blue-50 text-blue-700';
      case 'Online':
        return 'bg-purple-50 text-purple-700';
      case 'Híbrido':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };


  const handleClick = (e) => {
    e.preventDefault();
    if (training.slug) {
      openModal(training.slug);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <div
        onClick={handleClick}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col block cursor-pointer"
      >
        {/* Imagem do Treinamento */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          <img
            src={training.image}
            alt={training.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&v=${index}`;
            }}
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badges superiores */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 ${getLevelColor(training.level)}`}>
              <Award className="w-3.5 h-3.5" />
              {training.level}
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 ${getFormatColor(training.format)}`}>
              <FormatIcon className="w-3.5 h-3.5" />
              {training.trainingTypeLabel || training.format}
            </div>
          </div>

        </div>

        {/* Conteúdo do Card */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {training.title}
          </h3>

          {/* Descrição */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {training.description}
          </p>

          {/* Informações do Treinamento */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{training.duration}</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TrainingCard);

