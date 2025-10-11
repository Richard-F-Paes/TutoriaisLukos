import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';

const Page = () => {
  const courses = [
    {
      title: 'Cadastro de Produtos',
      description: 'Aprenda a cadastrar produtos no sistema de forma rápida e organizada.',
      image: 'retaguarda.png',
      duration: '30 min',
      category: 'Cadastros'
    },
    {
      title: 'Cadastro de Funcionários',
      description: 'Como inserir e gerenciar informações de funcionários no sistema.',
      image: 'retaguarda.png',
      duration: '25 min',
      category: 'Cadastros'
    },
    {
      title: 'Cadastro de Clientes',
      description: 'Aprenda a registrar clientes e manter os dados atualizados.',
      image: 'retaguarda.png',
      duration: '20 min',
      category: 'Cadastros'
    },
    {
      title: 'Cadastro de Fornecedores',
      description: 'Gerencie os fornecedores e cadastre suas informações corretamente.',
      image: 'retaguarda.png',
      duration: '25 min',
      category: 'Cadastros'
    },
    {
      title: 'Cadastro de Produtos Fiscais',
      description: 'Configure produtos com impostos e alíquotas corretamente.',
      image: 'retaguarda.png',
      duration: '35 min',
      category: 'Fiscal'
    },
    {
      title: 'Cadastro de Bombas de Combustível',
      description: 'Controle e cadastre as bombas de combustível na pista.',
      image: 'retaguarda.png',
      duration: '30 min',
      category: 'Pista'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">
            Tutoriais de
            <span className="block bg-gradient-to-t from-blue-600 to-purple-600 bg-clip-text text-purple-600">
              Destaque
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore os tutoriais do sistema para aprender a usar cada módulo de forma eficiente.
          </p>
        </motion.div>

        {/* Grid de cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <motion.button
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                  >
                    <span>Ver Tutorial</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão ver todos */}
        <motion.div
          className="text-cente mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todos os Tutoriais
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
