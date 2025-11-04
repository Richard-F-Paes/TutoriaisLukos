import React from 'react';
import { BookOpen, Fuel, ShoppingBag, Settings, BarChart3, CreditCard, FileText, Globe } from 'lucide-react';

const VideoTutorialCategories = ({ onCategorySelect }) => {
  const categories = [
    {
      name: 'Tutoriais',
      icon: BookOpen,
      count: 42,
      color: 'from-purple-400 to-purple-600',
      description: 'Tutoriais gerais do sistema'
    },
    {
      name: 'Pista',
      icon: Fuel,
      count: 28,
      color: 'from-orange-400 to-orange-600',
      description: 'Tutoriais do modulo Pista'
    },
    {
      name: 'Conveniencia',
      icon: ShoppingBag,
      count: 24,
      color: 'from-blue-400 to-blue-600',
      description: 'Tutoriais do modulo Conveniencia'
    },
    {
      name: 'Retaguarda',
      icon: Settings,
      count: 32,
      color: 'from-indigo-400 to-indigo-600',
      description: 'Tutoriais do modulo Retaguarda'
    },
    {
      name: 'Dashboard',
      icon: BarChart3,
      count: 18,
      color: 'from-green-400 to-green-600',
      description: 'Tutoriais do modulo Dashboard'
    },
    {
      name: 'Lukos Pay',
      icon: CreditCard,
      count: 15,
      color: 'from-pink-400 to-pink-600',
      description: 'Tutoriais do modulo Lukos Pay'
    },
    {
      name: 'Pre-Venda',
      icon: FileText,
      count: 12,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Tutoriais do modulo Pre-Venda'
    },
    {
      name: 'Fatura Web',
      icon: Globe,
      count: 20,
      color: 'from-yellow-400 to-yellow-600',
      description: 'Tutoriais do modulo Fatura Web'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          className="group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-[#181818] rounded-xl p-6 border border-[#272727] hover:border-[#383838] transition-all duration-200">
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <category.icon size={32} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {category.name}
            </h3>
            
            <p className="text-gray-不是为了-400 text-sm mb-3 leading-relaxed">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {category.count} tutoriais
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 transition-colors"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoTutorialCategories;
