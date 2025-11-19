import React from 'react';
import { Card, CardContent } from '../../ui/card/card';

/**
 * Componente IconCards - Renderiza cards com ícones
 * 
 * @param {Object} props
 * @param {Array} props.features - Array de objetos com { icon, title, description }
 * @param {string} props.badge - Texto do badge opcional
 * @param {string} props.title - Título da seção
 * @param {string} props.description - Descrição da seção
 * @param {string} props.bgColor - Cor de fundo (padrão: 'bg-white')
 * @param {number} props.columns - Número de colunas no grid (padrão: 4)
 */
const IconCards = ({
  features = [],
  badge,
  title,
  description,
  bgColor = 'bg-white',
  columns = 4,
}) => {
  // Mapear número de colunas para classes Tailwind
  const gridCols = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const gridClass = `grid grid-cols-1 ${gridCols[columns] || gridCols[4]} gap-6`;

  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(badge || title || description) && (
          <div className="text-center mb-12">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  {badge}
                </span>
              </div>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className={gridClass}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IconCards;

