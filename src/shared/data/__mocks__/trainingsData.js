import {
  Settings,
  Fuel,
  BarChart3,
  CreditCard,
  Users,
  Smartphone,
  Building,
  Globe,
  Video,
  UserCheck,
  Award,
  BookOpen,
  Clock,
  Monitor,
  MapPin,
  DollarSign,
  ShoppingCart
} from 'lucide-react';

// Dados dos Treinamentos Disponíveis
export const trainingsData = [
  {
    id: 'treinamento-retaguarda-completo',
    title: 'Treinamento Completo - Retaguarda',
    description: 'Domine todos os módulos do sistema de retaguarda: cadastros, estoque, produtos, relatórios e muito mais. Treinamento completo para gestores e operadores.',
    category: 'Retaguarda',
    level: 'Iniciante',
    format: 'Presencial',
    modality: 'Grupo',
    duration: '8 horas',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Especialistas Certificados',
    price: null, // Gratuito
    availableDates: ['2025-02-15', '2025-02-22', '2025-03-01'],
    maxStudents: 15,
    enrolled: 8,
    rating: 4.9,
    reviews: 47,
    benefits: [
      'Certificado de conclusão',
      'Material didático completo',
      'Suporte pós-treinamento',
      'Coffee break incluso'
    ],
    requirements: [
      'Acesso ao sistema Lukos',
      'Conhecimento básico de Windows',
      'Computador disponível'
    ],
    icon: Settings,
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'treinamento-pdv-pista',
    title: 'Treinamento PDV - Operações de Pista',
    description: 'Aprenda a operar o PDV para vendas de combustível: aferição, vendas, encerramento de turno, medição de tanques e relatórios operacionais.',
    category: 'PDV',
    level: 'Iniciante',
    format: 'Online',
    modality: 'Individual',
    duration: '4 horas',
    image: 'https://images.unsplash.com/photo-1602665742701-389671bc40c0?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Suporte Técnico',
    price: null,
    availableDates: ['2025-02-10', '2025-02-17', '2025-02-24'],
    maxStudents: 20,
    enrolled: 15,
    rating: 4.8,
    reviews: 32,
    benefits: [
      'Gravação disponível',
      'Material de consulta',
      'Certificado digital',
      'Acesso vitalício ao conteúdo'
    ],
    requirements: [
      'Computador com internet',
      'Acesso ao sistema Lukos',
      'Câmera e microfone (recomendado)'
    ],
    icon: Fuel,
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 'treinamento-dashboard-relatorios',
    title: 'Treinamento Dashboard e Relatórios Avançados',
    description: 'Explore recursos avançados do dashboard: criação de relatórios personalizados, análises gerenciais, KPIs e métricas de desempenho.',
    category: 'Dashboard',
    level: 'Intermediário',
    format: 'Híbrido',
    modality: 'Grupo',
    duration: '6 horas',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Analistas de Dados',
    price: null,
    availableDates: ['2025-02-20', '2025-03-06', '2025-03-13'],
    maxStudents: 12,
    enrolled: 10,
    rating: 5.0,
    reviews: 28,
    benefits: [
      'Templates de relatórios',
      'Biblioteca de KPIs',
      'Mentoria em grupo',
      'Projeto prático'
    ],
    requirements: [
      'Conhecimento básico do sistema',
      'Experiência com planilhas',
      'Conceitos de análise de dados'
    ],
    icon: BarChart3,
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'treinamento-fatura-web',
    title: 'Treinamento Fatura Web - Gestão de Frota',
    description: 'Aprenda a configurar e utilizar o Fatura Web para gestão completa de frotas: cadastro de veículos, controle de abastecimento e relatórios.',
    category: 'Fatura Web',
    level: 'Iniciante',
    format: 'Online',
    modality: 'Grupo',
    duration: '5 horas',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Especialistas em Frota',
    price: null,
    availableDates: ['2025-02-18', '2025-03-04', '2025-03-11'],
    maxStudents: 18,
    enrolled: 12,
    rating: 4.7,
    reviews: 19,
    benefits: [
      'Guia de configuração completo',
      'Casos de uso práticos',
      'Suporte durante o treinamento',
      'Material de referência'
    ],
    requirements: [
      'Acesso ao módulo Fatura Web',
      'Computador com internet',
      'Conhecimento básico de navegação web'
    ],
    icon: CreditCard,
    color: 'from-green-500 to-green-700'
  },
  {
    id: 'treinamento-prevenda',
    title: 'Treinamento Pré-Venda - Orçamentos e Pedidos',
    description: 'Domine o módulo de pré-venda: criação de orçamentos, conversão em pedidos, gestão de vendas externas e controle de comissões.',
    category: 'Pré-Venda',
    level: 'Intermediário',
    format: 'Presencial',
    modality: 'Empresa',
    duration: '6 horas',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Consultores de Vendas',
    price: null,
    availableDates: ['2025-02-25', '2025-03-08', '2025-03-15'],
    maxStudents: 10,
    enrolled: 0,
    rating: 4.9,
    reviews: 15,
    benefits: [
      'Treinamento personalizado',
      'Análise do processo atual',
      'Plano de implementação',
      'Suporte especializado'
    ],
    requirements: [
      'Equipe de vendas',
      'Acesso ao módulo Pré-Venda',
      'Processos definidos'
    ],
    icon: Users,
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 'treinamento-pdv-smart-pos',
    title: 'Treinamento PDV Smart POS - Vendas Móveis',
    description: 'Aprenda a utilizar o PDV móvel em dispositivos touch: interface otimizada, gestão de vendas, integração com loja física e relatórios em tempo real.',
    category: 'PDV-Smart POS',
    level: 'Iniciante',
    format: 'Híbrido',
    modality: 'Grupo',
    duration: '4 horas',
    image: 'https://images.unsplash.com/photo-1556742521-9713bf272865?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Especialistas Mobile',
    price: null,
    availableDates: ['2025-02-12', '2025-02-26', '2025-03-05'],
    maxStudents: 15,
    enrolled: 9,
    rating: 4.8,
    reviews: 24,
    benefits: [
      'Demo prática no dispositivo',
      'Checklist de configuração',
      'Troubleshooting comum',
      'Atualizações futuras'
    ],
    requirements: [
      'Dispositivo touch disponível',
      'Sistema instalado',
      'Conexão estável'
    ],
    icon: Smartphone,
    color: 'from-teal-500 to-teal-700'
  },
  {
    id: 'treinamento-conveniencia',
    title: 'Treinamento Conveniência - Gestão de Loja',
    description: 'Complete seu conhecimento sobre gestão de conveniência: controle de estoque, precificação, promoções, relatórios de loja e integração com pista.',
    category: 'Conveniência',
    level: 'Intermediário',
    format: 'Presencial',
    modality: 'Grupo',
    duration: '7 horas',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Gestores de Loja',
    price: null,
    availableDates: ['2025-03-03', '2025-03-10', '2025-03-17'],
    maxStudents: 12,
    enrolled: 7,
    rating: 4.9,
    reviews: 31,
    benefits: [
      'Simulação de operação',
      'Estratégias de precificação',
      'Gestão de estoque',
      'Certificado de conclusão'
    ],
    requirements: [
      'Experiência básica no sistema',
      'Conhecimento de loja física',
      'Acesso ao módulo Conveniência'
    ],
    icon: ShoppingCart,
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 'treinamento-conciliacao-bancaria',
    title: 'Treinamento Conciliação Bancária',
    description: 'Aprenda a realizar conciliações bancárias de forma eficiente: importação de extratos, conciliação automática, tratamento de divergências e fechamento.',
    category: 'Financeiro',
    level: 'Avançado',
    format: 'Online',
    modality: 'Individual',
    duration: '3 horas',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    instructor: 'Equipe Lukos - Contadores',
    price: null,
    availableDates: ['2025-02-14', '2025-02-21', '2025-02-28'],
    maxStudents: 25,
    enrolled: 18,
    rating: 4.9,
    reviews: 41,
    benefits: [
      'Fluxo completo documentado',
      'Checklist de verificação',
      'Troubleshooting avançado',
      'Melhores práticas'
    ],
    requirements: [
      'Conhecimento contábil',
      'Acesso ao módulo Financeiro',
      'Experiência com bancos'
    ],
    icon: DollarSign,
    color: 'from-emerald-500 to-emerald-700'
  }
];

// Função para obter todos os treinamentos
export const getAllTrainings = () => {
  return trainingsData;
};

// Função para obter treinamento por ID
export const getTrainingById = (id) => {
  return trainingsData.find(training => training.id === id);
};

// Função para obter treinamentos por categoria
export const getTrainingsByCategory = (category) => {
  return trainingsData.filter(training => training.category === category);
};

// Função para obter categorias disponíveis
export const getTrainingCategories = () => {
  const categories = [...new Set(trainingsData.map(training => training.category))];
  return categories;
};

// Função para obter níveis disponíveis
export const getTrainingLevels = () => {
  return ['Iniciante', 'Intermediário', 'Avançado'];
};

// Função para obter formatos disponíveis
export const getTrainingFormats = () => {
  return ['Presencial', 'Online', 'Híbrido'];
};

// Função para obter modalidades disponíveis
export const getTrainingModalities = () => {
  return ['Individual', 'Grupo', 'Empresa'];
};

// Estatísticas dos treinamentos
export const getTrainingStats = () => {
  return {
    totalTrainings: trainingsData.length,
    totalEnrolled: trainingsData.reduce((sum, t) => sum + t.enrolled, 0),
    totalCapacity: trainingsData.reduce((sum, t) => sum + t.maxStudents, 0),
    averageRating: (trainingsData.reduce((sum, t) => sum + t.rating, 0) / trainingsData.length).toFixed(1),
    totalReviews: trainingsData.reduce((sum, t) => sum + t.reviews, 0),
    categories: getTrainingCategories().length
  };
};

