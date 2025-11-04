import React from 'react';
import { Link } from 'react-router-dom';

// Componente de Categories Section
const ExerciseCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Retaguarda',
      image: 'retaguarda.png',
      exercises: 12
    },
    {
      id: 2,
      name: 'PDV',
      image: 'https://i.pinimg.com/1200x/59/74/0c/59740c01a792b5cd02b9ab0a819915f1.jpg',
      exercises: 15
    },
    {
      id: 3,
      name: 'Dashboard',
      image: 'https://i.pinimg.com/1200x/14/06/bd/1406bd2f617ebb1513d22693038a259b.jpg',
      exercises: 18
    },
    {
      id: 4,
      name: 'Fatura Web',
      image: 'https://lh3.googleusercontent.com/sitesv/AICyYdaH64VsezwQiDytshyL0Y5eZtK2g041-AbiYLlHzonLBfih_vbuog_AHpPepAjXxmkzv7hSsgT1daCBdjjApT9BNXepgXl2Z5Gfhvojmr7m-R1YHDdlA-PZws6AaQFFflFcuH5YhQP7fpStiKtff9f-U63uX6pn9lRuboGKARwdxedIpauLZ3I7r7--I4ySfynA_avzZk_zBfOKQfvRzpV0T2jaOOVzcla3wDM=w1280',
      exercises: 10
    }
    
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorias de Exercícios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossa biblioteca completa de exercícios organizados por grupos musculares
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/exercicios"
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-gray-300">{category.exercises} exercícios</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/exercicios"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-700 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            Ver Todos os Tutoriais
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExerciseCategories;
