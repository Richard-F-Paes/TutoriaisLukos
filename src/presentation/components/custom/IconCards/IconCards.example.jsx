import React from 'react';
import IconCards from './IconCards';
import { 
  Code, Rocket, Users, Award, BookOpen, TrendingUp, 
  CheckCircle2, Star, PlayCircle, Shield, Zap, Globe, 
  Monitor, Laptop, Smartphone, Database, Cloud, Play, 
  Layout, Terminal, Sparkles 
} from 'lucide-react';

/**
 * Exemplo de uso do componente IconCards
 */
function IconCardsExample() {
  // Exemplo 1: Cards básicos com ícones
  const features = [
    {
      icon: Code,
      title: 'Cursos Práticos',
      description: 'Aprenda com projetos reais e aplicáveis no mercado de trabalho',
    },
    {
      icon: Users,
      title: 'Instrutores Experientes',
      description: 'Professores atuantes no mercado compartilhando conhecimento real',
    },
    {
      icon: Award,
      title: 'Certificação',
      description: 'Receba certificados reconhecidos ao concluir os cursos',
    },
    {
      icon: Rocket,
      title: 'Carreira Acelerada',
      description: 'Desenvolva habilidades para crescer rapidamente na área de TI',
    },
    {
      icon: PlayCircle,
      title: 'Aprenda no Seu Ritmo',
      description: 'Acesso vitalício aos cursos, estude quando e onde quiser',
    },
    {
      icon: Shield,
      title: 'Garantia de Qualidade',
      description: 'Conteúdo atualizado e revisado por especialistas da indústria',
    },
    {
      icon: Globe,
      title: 'Comunidade Global',
      description: 'Conecte-se com alunos e profissionais do mundo todo',
    },
    {
      icon: Zap,
      title: 'Atualizações Constantes',
      description: 'Novos conteúdos e recursos adicionados regularmente',
    },
  ];

  return (
    <div>
      {/* Exemplo 1: Uso completo com badge, título e descrição */}
      <IconCards
        badge="Por que escolher a TI Academy"
        title="Tudo que você precisa para ter sucesso"
        description="Oferecemos a melhor experiência de aprendizado online com conteúdo atualizado e metodologia comprovada"
        features={features}
        columns={4}
        bgColor="bg-white"
      />

      {/* Exemplo 2: Cards simples sem header */}
      <IconCards
        features={features.slice(0, 6)}
        columns={3}
        bgColor="bg-gray-50"
      />

      {/* Exemplo 3: Cards em 2 colunas */}
      <IconCards
        title="Nossos Diferenciais"
        description="Veja o que nos torna únicos"
        features={features.slice(0, 4)}
        columns={2}
        bgColor="bg-white"
      />
    </div>
  );
}

export default IconCardsExample;

