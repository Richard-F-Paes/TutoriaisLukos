import React from 'react';
import TechnologyCards from './TechnologyCards';
import { 
  Code, Terminal, Database, Cloud, Smartphone, Layout,
  Monitor, Laptop 
} from 'lucide-react';

/**
 * Exemplo de uso do componente TechnologyCards
 */
function TechnologyCardsExample() {
  // Exemplo de tecnologias com cores personalizadas
  const technologies = [
    { name: 'React', icon: Code, color: 'bg-blue-100 text-blue-600' },
    { name: 'Python', icon: Terminal, color: 'bg-green-100 text-green-600' },
    { name: 'Node.js', icon: Database, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'JavaScript', icon: Code, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'TypeScript', icon: Code, color: 'bg-blue-100 text-blue-700' },
    { name: 'MongoDB', icon: Database, color: 'bg-green-100 text-green-700' },
    { name: 'AWS', icon: Cloud, color: 'bg-orange-100 text-orange-600' },
    { name: 'React Native', icon: Smartphone, color: 'bg-purple-100 text-purple-600' },
    { name: 'Docker', icon: Cloud, color: 'bg-blue-100 text-blue-600' },
    { name: 'Git', icon: Code, color: 'bg-red-100 text-red-600' },
    { name: 'PostgreSQL', icon: Database, color: 'bg-blue-100 text-blue-800' },
    { name: 'Next.js', icon: Layout, color: 'bg-gray-100 text-gray-800' },
  ];

  return (
    <div>
      {/* Exemplo 1: Uso completo com badge, título e descrição */}
      <TechnologyCards
        badge="Tecnologias"
        title="Domine as tecnologias mais requisitadas"
        description="Aprenda as ferramentas e linguagens que as empresas mais procuram"
        technologies={technologies}
        columnsMobile={2}
        columnsTablet={4}
        columnsDesktop={6}
        bgColor="bg-gray-50"
      />

      {/* Exemplo 2: Grid menor (3 colunas no desktop) */}
      <TechnologyCards
        title="Tecnologias Principais"
        technologies={technologies.slice(0, 6)}
        columnsMobile={2}
        columnsTablet={3}
        columnsDesktop={3}
        bgColor="bg-white"
      />

      {/* Exemplo 3: Apenas cards sem header */}
      <TechnologyCards
        technologies={technologies}
        columnsMobile={2}
        columnsTablet={4}
        columnsDesktop={6}
        bgColor="bg-gray-50"
      />
    </div>
  );
}

export default TechnologyCardsExample;

