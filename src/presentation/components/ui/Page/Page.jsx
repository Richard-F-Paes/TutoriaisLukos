import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const Page = () => {
  const courses = [
    {
      title: 'Cadastro de Produtos',
      description: 'Aprenda a cadastrar produtos no sistema de forma rápida e organizada.',
      image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYIreKRSKu658OxuPaRYAHlwH1V3q31_tbDEMxdfer1iFo3iGvlcWuHvnU7Vhu33c7iHznzweJrbXErMSIv9qooVH2-wwRwywz3LwlYL9r2d6Dr2Fgv9_l9Gt74my5S58v3igYdwHdyzVCBp7s485vNGaiz9UkfcD_ghrIJKz5QyUW-qBVamWBfWKB_LNuxZM2E_n7Hanq7tHUI2YvdQhO9kMf1Q7TI_maB=w1280',
      duration: '30 min',
      category: 'Cadastros'
    },
    {
      title: 'Cadastro de Funcionários',
      description: 'Como inserir e gerenciar informações de funcionários no sistema.',
      image: 'https://lh3.googleusercontent.com/sitesv/AICyYdZsptDUKekNOZvQK8Bm4cHd2rcM4gjpg6_b-9Hy9Fuq--HO4rRf5lrAVyNpDE5SFTuLS1QaiTDLsBtPV2N-5S32HS8CKGhUianTtunvtKXvb0XmpUeqG93Y8I0DEhcyXuELqIOMlyDSIhYWMNUPatrUoOSR8isQ_O3CEPaCNyAwLXCNoAeddtEwrWP0I8adEQfmmcL5eqNWdw-DPrAiVXh1jVDW7yDShpLz=w1280',
      duration: '25 min',
      category: 'Cadastros'
    },
    {
      title: 'Cadastro de Clientes',
      description: 'Aprenda a registrar clientes e manter os dados atualizados.',
      image: 'https://lh3.googleusercontent.com/sitesv/AICyYdajNAsqPPXoHIXcaLOkhGiAoVow4fNVMu-IAutJJwBmtIQcfDgorN2dYjyqiQ5kRktJaJo-EL_PAG0ij_6O2K8JvN1aZ_FIvbwUSSdu34lkesI9-DGrI1lUSKSb1rQVJsDTyBNtnAweil1USikOMBx2T1zr6peNl3SFCKosGPhGkGuUxFrw-kixYMULBsKwN6Dv7qGGzUPaKDLCQJarBbVYmbWsMA0URMHmBN4=w1280',
      duration: '20 min',
      category: 'Cadastros'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-700 mb-4">
            Tutoriais de
            <span className="block bg-gradient-to-t from-blue-600 to-purple-600 bg-clip-text text-purple-600">
              Destaque
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore os tutoriais do sistema para aprender a usar cada módulo de forma eficiente.
          </p>
        </motion.div>

        {/* Grid de cursos com largura máxima menor */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center bg-white w-[px]" >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="relative overflow-hidden p-4">
                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-600 mb-3 leading-relaxed text-sm">{course.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <motion.button
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-md font-medium hover:shadow-md transition-all flex items-center space-x-1 text-xs"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Ver Tutorial</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão ver todos */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-base hover:bg-blue-600 hover:text-white transition-all"
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
