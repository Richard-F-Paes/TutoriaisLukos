import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  BookOpen,
  Clock,
  Video,
  CheckCircle2,
  Headphones,
  Certificate,
  Zap,
  Shield
} from 'lucide-react';

const TrainingBenefits = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Certificado Reconhecido',
      description: 'Receba certificado de conclusão válido para comprovar suas habilidades no sistema Lukos.',
      color: 'from-amber-400 to-amber-600'
    },
    {
      icon: Users,
      title: 'Instrutores Especialistas',
      description: 'Aprenda com profissionais certificados que trabalham diariamente com o sistema Lukos.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Material Didático Completo',
      description: 'Acesso a manuais, guias práticos e recursos complementares para consulta permanente.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Horários Flexíveis',
      description: 'Treinamentos presenciais, online ou híbridos, com múltiplas datas disponíveis.',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: Video,
      title: 'Gravações Disponíveis',
      description: 'Acesse as gravações dos treinamentos online para revisar o conteúdo quando quiser.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Suporte Pós-Treinamento',
      description: 'Suporte especializado após o treinamento para esclarecer dúvidas e aplicar o conhecimento.',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: Certificate,
      title: 'Atualizações Futuras',
      description: 'Receba atualizações sobre novos recursos e funcionalidades do sistema Lukos.',
      color: 'from-teal-400 to-teal-600'
    },
    {
      icon: Zap,
      title: 'Aprendizado Prático',
      description: 'Treinamentos focados em casos reais de uso, com exercícios práticos e simulações.',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher nossos{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Treinamentos?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma experiência completa de aprendizado com benefícios exclusivos
            para garantir seu sucesso com o sistema Lukos.
          </p>
        </motion.div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Ícone */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${benefit.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>

                {/* Descrição */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TrainingBenefits);

