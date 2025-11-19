import React from 'react';
import { Card, CardContent } from '../../ui/card/card';
import { Badge } from '../../ui/badge/badge';

/**
 * Componente TechnologyCards - Renderiza cards de tecnologias com ícones
 * 
 * @param {Object} props
 * @param {Array} props.technologies - Array de objetos com { icon, name, color }
 * @param {string} props.badge - Texto do badge opcional
 * @param {string} props.title - Título da seção
 * @param {string} props.description - Descrição da seção
 * @param {string} props.bgColor - Cor de fundo (padrão: 'bg-white')
 * @param {number} props.columnsMobile - Colunas no mobile (padrão: 2)
 * @param {number} props.columnsTablet - Colunas no tablet (padrão: 4)
 * @param {number} props.columnsDesktop - Colunas no desktop (padrão: 6)
 */
const TechnologyCards = ({
  technologies = [],
  badge,
  title,
  description,
  bgColor = 'bg-white',
  columnsMobile = 2,
  columnsTablet = 4,
  columnsDesktop = 6,
}) => {
  // Mapear número de colunas para classes Tailwind
  const getGridCols = (mobile, tablet, desktop) => {
    const mobileMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };
    const tabletMap = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
    };
    const desktopMap = {
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
      8: 'lg:grid-cols-8',
    };

    return `grid ${mobileMap[mobile] || 'grid-cols-2'} ${tabletMap[tablet] || 'md:grid-cols-4'} ${desktopMap[desktop] || 'lg:grid-cols-6'} gap-4`;
  };

  const gridClass = getGridCols(columnsMobile, columnsTablet, columnsDesktop);

  return (
    <section className={`py-20 ${bgColor} flex items-center justify-center`}>
      <div className="max-w-7xl  w-[1700px] h-[500px] mx-auto px-4 sm:px-6 lg:px-8 mt-[-120px]">
        {/* Header */}
        {(badge || title || description) && (
          <div className="text-center mt-[100px]">
            {badge && (
              <Badge className="mb-4">{badge}</Badge>
            )}
            {title && (
              <h2 className="block bg-gradient-to-r from-blue-600 mb-12 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Technologies Grid */}
        <div className={gridClass}>
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${tech.color || 'bg-gray-100 text-gray-600'} rounded-lg mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyCards;

