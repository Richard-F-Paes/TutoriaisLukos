import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Star,
  Clock
} from 'lucide-react';

const TrainingHero = ({ stats }) => {
  const statsItems = [
    {
      icon: GraduationCap,
      value: stats?.totalTrainings || 8,
      label: 'Treinamentos',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      value: stats?.totalEnrolled || 79,
      label: 'Alunos Inscritos',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      value: `${stats?.averageRating || '4.9'}`,
      label: 'Avaliação Média',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Star,
      value: stats?.totalReviews || 216,
      label: 'Avaliações',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Título com Gradiente */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Treinamentos Profissionais
            </span>
            <br />
            <span className="text-gray-800">Sistema Lukos</span>
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Domine todas as funcionalidades do sistema Lukos com nossos treinamentos práticos,
            ministrados por especialistas certificados. Aprenda no seu ritmo e eleve sua produtividade.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#treinamentos"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              Ver Treinamentos
            </a>
            <a
              href="#agendamento"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Agendar Treinamento
            </a>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {statsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(TrainingHero);

