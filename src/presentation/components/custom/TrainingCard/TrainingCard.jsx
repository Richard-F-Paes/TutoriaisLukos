import React from 'react';
import {
  Clock,
  Users,
  MapPin,
  Globe,
  Video,
  Monitor,
  Star,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const TrainingCard = ({ training, index = 0 }) => {
  const Icon = training.icon || Award;
  
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

  // Calcular progresso de vagas
  const enrollmentProgress = (training.enrolled / training.maxStudents) * 100;
  const spotsLeft = training.maxStudents - training.enrolled;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
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
              {training.format}
            </div>
          </div>

          {/* Ícone da categoria */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl">
              <Icon className="w-6 h-6 text-gray-800" />
            </div>
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">{training.rating}</span>
            <span className="text-xs text-gray-500">({training.reviews})</span>
          </div>
        </div>

        {/* Conteúdo do Card */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Categoria */}
          <div className="mb-3">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              {training.category}
            </span>
          </div>

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
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              <span>
                {training.modality} • {training.enrolled}/{training.maxStudents} inscritos
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>
                {training.availableDates.length} data{training.availableDates.length !== 1 ? 's' : ''} disponível{training.availableDates.length !== 1 ? 'eis' : ''}
              </span>
            </div>
          </div>

          {/* Barra de Progresso de Vagas */}
          {spotsLeft > 0 ? (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Vagas disponíveis</span>
                <span className="font-semibold text-emerald-600">{spotsLeft} restante{spotsLeft !== 1 ? 's' : ''}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${enrollmentProgress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Vagas esgotadas - Entre em contato para lista de espera
              </p>
            </div>
          )}

          {/* Benefícios */}
          <div className="mb-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {training.benefits.slice(0, 2).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <a
              href="#agendamento"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 group-hover:shadow-lg transform group-hover:scale-[1.02]"
            >
              <span>Agendar Treinamento</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TrainingCard);

