import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Eye, BookOpen, Fuel, ShoppingBag, Settings, BarChart3, CreditCard, FileText, Globe } from 'lucide-react';

const VideoTutorialCard = ({ tutorial }) => {
  // Mapear categorias para ícones
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Tutoriais': BookOpen,
      'Pista': Fuel,
      'Conveniencia': ShoppingBag,
      'Retaguarda': Settings,
      'Dashboard': BarChart3,
      'Lukos Pay': CreditCard,
      'Pre-Venda': FileText,
      'Fatura Web': Globe,
    };
    return iconMap[category] || BookOpen;
  };

  // Mapear categorias para cores
  const getCategoryColor = (category) => {
    const colorMap = {
      'Tutoriais': 'from-purple-500 to-purple-700',
      'Pista': 'from-orange-500 to-orange-700',
      'Conveniencia': 'from-blue-500 to-blue-700',
      'Retaguarda': 'from-indigo-500 to-indigo-700',
      'Dashboard': 'from-green-500 to-green-700',
      'Lukos Pay': 'from-pink-500 to-pink-700',
      'Pre-Venda': 'from-cyan-500 to-cyan-700',
      'Fatura Web': 'from-yellow-500 to-yellow-700',
    };
    return colorMap[category] || 'from-gray-600 to-gray-800';
  };

  const CategoryIcon = getCategoryIcon(tutorial.category);
  const categoryColor = getCategoryColor(tutorial.category);

  return (
    <Link to={`/video-tutorial/${tutorial.id}`}>
    <div className="bg-[#181818] rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="relative">
        <div className={`w-full h-48 bg-gradient-to-br ${categoryColor} rounded-t-lg flex items-center justify-center`}>
          <CategoryIcon size={64} className="text-white opacity-90" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {tutorial.duration}
        </div>
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
          <CategoryIcon size={12} />
          <span>{tutorial.category}</span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-t-lg flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={48} />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
          {tutorial.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-2">
          {tutorial.channel}
        </p>
        
        <div className="flex items-center text-gray-500 text-xs space-x-4">
          <div className="flex items-center space-x-1">
            <Eye size={12} />
            <span>{tutorial.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{tutorial.publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default VideoTutorialCard;

