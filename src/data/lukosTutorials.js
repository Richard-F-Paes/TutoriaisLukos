import {
  Settings,
  Fuel,
  BarChart3,
  CreditCard,
  Users,
  Smartphone,
  Clock,
  Star,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Award,
  Building,
  MapPin,
  UserCheck,
  UserPlus,
  Search,
  Globe,
  CheckCircle,
  Tag,
  Phone,
  Shield,
  Wrench,
  Truck,
  Package,
  DollarSign,
  Calendar,
  Clock as ClockIcon,
  Building2,
  Download,
  Grid,
  Receipt,
  Calculator,
  FileSpreadsheet,
  Target,
  FileText,
  Plus,
  Upload,
  Zap,
  Sun,
  Moon,
  ShoppingCart,
  Store,
  Package2,
  TrendingDown,
  Monitor,
  PieChart,
  Activity,
  Gauge,
  Zap as ZapIcon,
  CheckCircle2,
  X,
  FileX,
  Printer,
  Percent,
  Archive
} from 'lucide-react'

// Tutoriais do Sistema Lukos
export const lukosTutorials = {
  // TUTORIAIS BÁSICOS
  'cadastro-clientes-cpf': {
    id: 'cadastro-clientes-cpf',
    title: 'Cadastro de Clientes com CPF',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    icon: UserPlus,
    color: 'from-blue-500 to-blue-700',
    videoUrl: '',
    description: 'Como cadastrar clientes pessoa física no sistema Lukos.',
    duration: '10 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro',
        description: 'Acesse o menu Retaguarda > Cadastros > Clientes',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
        tips: 'Use credenciais de administrador',
        focusArea: 'Acesso ao sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados',
        description: 'Digite nome, CPF e dados de contato',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=2',
        tips: 'Verifique CPF antes de salvar',
        focusArea: 'Preenchimento'
      },
      {
        step: 3,
        title: 'Salvar Cadastro',
        description: 'Confirme dados e salve o cadastro',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=3',
        tips: 'Confirme todos os dados antes de salvar',
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Verifique CPF antes de salvar',
      'Confirme todos os dados',
      'Use dados atualizados'
    ],
    commonMistakes: [
      'CPF incorreto',
      'Dados incompletos',
      'Não confirmar dados'
    ],
    resources: [
      { name: 'Manual Cadastro Clientes', type: 'pdf', size: '2.0 MB' },
      { name: 'Validador CPF', type: 'xlsx', size: '100 KB' }
    ]
  },

  'cadastro-clientes': {
    id: 'cadastro-clientes',
    title: 'Cadastro de Clientes',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    icon: UserPlus,
    color: 'from-blue-500 to-blue-700',
    videoUrl: '',
    description: 'Como cadastrar clientes no sistema Lukos.',
    duration: '10 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro',
        description: 'Acesse o menu Retaguarda > Cadastros > Clientes',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
        tips: 'Use credenciais de administrador',
        focusArea: 'Acesso ao sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados',
        description: 'Digite nome, CPF e dados de contato',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=2',
        tips: 'Verifique CPF antes de salvar',
        focusArea: 'Preenchimento'
      },
      {
        step: 3,
        title: 'Salvar Cadastro',
        description: 'Confirme dados e salve o cadastro',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=3',
        tips: 'Confirme todos os dados antes de salvar',
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Verifique CPF antes de salvar',
      'Confirme todos os dados',
      'Use dados atualizados'
    ],
    commonMistakes: [
      'CPF incorreto',
      'Dados incompletos',
      'Não confirmar dados'
    ],
    resources: [
      { name: 'Manual Cadastro Clientes', type: 'pdf', size: '2.0 MB' },
      { name: 'Validador CPF', type: 'xlsx', size: '100 KB' }
    ]
  },

  // TUTORIAIS DA PISTA (PDV)
  'medicao-tanques': {
    id: 'medicao-tanques',
    title: 'Medição de Tanques',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Fuel,
    color: 'from-blue-500 to-blue-700',
    videoUrl: '',
    description: 'Realize medição de tanques para controle de estoque de combustíveis.',
    duration: '10 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Medição',
        description: 'Acesse o menu de medição de tanques',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=74',
        tips: 'Confirme autorização para medição',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Tanque',
        description: 'Escolha o tanque a ser medido',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=75',
        tips: 'Verifique se é o tanque correto',
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Registrar Medição',
        description: 'Digite o valor da medição encontrada',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=76',
        tips: 'Use valores precisos',
        focusArea: 'Registro'
      },
      {
        step: 4,
        title: 'Confirmar Medição',
        description: 'Confirme os dados e salve a medição',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=77',
        tips: 'Verifique dados antes de confirmar',
        focusArea: 'Confirmação'
      },
      {
        step: 5,
        title: 'Gerar Relatório',
        description: 'Gere relatório de medição se necessário',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=78',
        tips: 'Imprima para arquivo',
        focusArea: 'Relatório'
      }
    ],
    tips: [
      'Confirme autorização para medição',
      'Verifique se é o tanque correto',
      'Use valores precisos',
      'Verifique dados antes de confirmar',
      'Imprima para arquivo'
    ],
    commonMistakes: [
      'Tanque incorreto',
      'Valores imprecisos',
      'Dados não confirmados',
      'Sem autorização'
    ],
    resources: [
      { name: 'Manual Medição Tanques', type: 'pdf', size: '1.8 MB' },
      { name: 'Tabela Conversão', type: 'xlsx', size: '200 KB' }
    ]
  },

  'afericao-bombas': {
    id: 'afericao-bombas',
    title: 'Aferição de Bombas',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Gauge,
    color: 'from-orange-500 to-orange-700',
    videoUrl: '',
    description: 'Como realizar a aferição das bombas de combustível no sistema Lukos.',
    duration: '24 min',
    steps: [
      {
        step: 1,
        title: 'Acesso ao Sistema',
        description: 'Acesse o menu PDV > Pista > Aferição de Bombas',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=4',
        tips: 'Use credenciais de administrador e verifique conexão com bombas',
        focusArea: 'Acesso ao sistema'
      },
      {
        step: 2,
        title: 'Seleção da Bomba',
        description: 'Selecione a bomba a ser aferida e configure os parâmetros',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=5',
        tips: 'Selecione bomba correta e configure volume de teste',
        focusArea: 'Configuração'
      },
      {
        step: 3,
        title: 'Execução da Aferição',
        description: 'Execute o processo de aferição e registre os valores obtidos',
        duration: '10 min',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=6',
        tips: 'Siga procedimento padrão e registre valores precisos',
        focusArea: 'Execução'
      },
      {
        step: 4,
        title: 'Validação e Ajuste',
        description: 'Valide os resultados e ajuste se necessário',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=7',
        tips: 'Compare com valores padrão e ajuste se fora da tolerância',
        focusArea: 'Validação'
      },
      {
        step: 5,
        title: 'Finalização',
        description: 'Salve os resultados e documente a aferição',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=8',
        tips: 'Salve no sistema e imprima comprovante',
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Realize aferição com equipamentos calibrados',
      'Siga procedimento padrão da ANP',
      'Registre todos os valores obtidos',
      'Valide resultados antes de finalizar',
      'Documente todas as aferições realizadas'
    ],
    commonMistakes: [
      'Usar equipamentos descalibrados',
      'Não seguir procedimento padrão',
      'Valores não registrados corretamente',
      'Não validar resultados',
      'Documentação incompleta'
    ],
    resources: [
      { name: 'Manual Aferição', type: 'pdf', size: '2.5 MB' },
      { name: 'Checklist Aferição', type: 'pdf', size: '200 KB' }
    ]
  },

  'venda-combustivel': {
    id: 'venda-combustivel',
    title: 'Venda de Combustível',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Fuel,
    color: 'from-blue-500 to-blue-700',
    videoUrl: '',
    description: 'Processo completo de venda de combustível no sistema Lukos.',
    duration: '11 min',
    steps: [
      {
        step: 1,
        title: 'Acesso ao PDV Pista',
        description: 'Acesse o sistema PDV > Pista e selecione a bomba desejada',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=9',
        tips: 'Verifique status da bomba e confirme disponibilidade',
        focusArea: 'Acesso ao sistema'
      },
      {
        step: 2,
        title: 'Seleção do Combustível',
        description: 'Escolha o tipo de combustível e informe a quantidade desejada',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=10',
        tips: 'Confirme tipo de combustível e verifique preço atual',
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Identificação do Cliente',
        description: 'Identifique o cliente (se aplicável) e configure forma de pagamento',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=11',
        tips: 'Digite CPF/CNPJ se necessário e selecione forma de pagamento',
        focusArea: 'Identificação'
      },
      {
        step: 4,
        title: 'Processamento da Venda',
        description: 'Processe a venda e confirme os dados antes de finalizar',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=12',
        tips: 'Revise valores e confirme dados do cliente',
        focusArea: 'Processamento'
      },
      {
        step: 5,
        title: 'Finalização e Cupom',
        description: 'Finalize a venda e emita o cupom fiscal',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=13',
        tips: 'Emita cupom fiscal e confirme pagamento',
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Sempre verifique preços antes da venda',
      'Confirme dados do cliente quando necessário',
      'Emita cupom fiscal corretamente',
      'Valide forma de pagamento',
      'Mantenha controle de estoque atualizado'
    ],
    commonMistakes: [
      'Preços não atualizados',
      'Dados do cliente incorretos',
      'Cupom fiscal não emitido',
      'Forma de pagamento não confirmada',
      'Estoque não atualizado'
    ],
    resources: [
      { name: 'Manual Vendas', type: 'pdf', size: '2.0 MB' },
      { name: 'Tabela Preços', type: 'xlsx', size: '150 KB' }
    ]
  },

  'encerramento-turno': {
    id: 'encerramento-turno',
    title: 'Encerramento de Turno',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Intermediário',
    icon: CheckCircle2,
    color: 'from-green-500 to-green-700',
    videoUrl: '',
    description: 'Como encerrar o turno corretamente no sistema Lukos.',
    duration: '25 min',
    steps: [
      {
        step: 1,
        title: 'Verificação de Vendas',
        description: 'Verifique todas as vendas realizadas no turno e confirme valores',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=14',
        tips: 'Confirme todas as vendas e verifique valores totais',
        focusArea: 'Verificação'
      },
      {
        step: 2,
        title: 'Conciliação Financeira',
        description: 'Concilie valores do caixa com vendas registradas',
        duration: '10 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=15',
        tips: 'Concilie valores do caixa e identifique diferenças',
        focusArea: 'Conciliação'
      },
      {
        step: 3,
        title: 'Relatórios do Turno',
        description: 'Gere e imprima relatórios de vendas e movimentação',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=16',
        tips: 'Imprima relatório de vendas e confirme movimentação',
        focusArea: 'Relatórios'
      },
      {
        step: 4,
        title: 'Sangrias e Recebimentos',
        description: 'Registre sangrias e recebimentos realizados no turno',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=17',
        tips: 'Registre sangrias e confirme recebimentos',
        focusArea: 'Movimentação'
      },
      {
        step: 5,
        title: 'Encerramento Final',
        description: 'Finalize o encerramento do turno no sistema',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=18',
        tips: 'Confirme todos os dados e encerre turno',
        focusArea: 'Encerramento'
      }
    ],
    tips: [
      'Sempre concilie valores antes do encerramento',
      'Imprima todos os relatórios necessários',
      'Confirme dados antes de finalizar',
      'Registre todas as movimentações',
      'Mantenha backup dos relatórios'
    ],
    commonMistakes: [
      'Valores não conciliados corretamente',
      'Relatórios não impressos',
      'Dados incorretos no encerramento',
      'Movimentações não registradas',
      'Encerramento prematuro'
    ],
    resources: [
      { name: 'Manual Encerramento', type: 'pdf', size: '2.2 MB' },
      { name: 'Checklist Turno', type: 'pdf', size: '180 KB' }
    ]
  },

  // TUTORIAIS DA LOJA (PDV)
  'codigo-rapido-loja': {
    id: 'codigo-rapido-loja',
    title: 'Código Rápido - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-700',
    videoUrl: '',
    description: 'Configure códigos rápidos para produtos mais vendidos na loja.',
    duration: '7 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Configuração',
        description: 'Acesse o menu de configuração de códigos rápidos',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=125',
        tips: 'Configure códigos para produtos mais vendidos',
        focusArea: 'Configuração'
      },
      {
        step: 2,
        title: 'Cadastrar Código',
        description: 'Digite o código e selecione o produto correspondente',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=126',
        tips: 'Use códigos simples e fáceis de lembrar',
        focusArea: 'Cadastro'
      },
      {
        step: 3,
        title: 'Testar Código',
        description: 'Teste o código rápido para confirmar funcionamento',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=127',
        tips: 'Confirme se o produto correto aparece',
        focusArea: 'Teste'
      }
    ],
    tips: [
      'Use códigos simples e fáceis de lembrar',
      'Configure para produtos mais vendidos',
      'Teste sempre após cadastrar'
    ],
    commonMistakes: [
      'Códigos muito complexos',
      'Produtos incorretos',
      'Não testar após cadastro'
    ],
    resources: [
      { name: 'Manual Código Rápido', type: 'pdf', size: '1.2 MB' },
      { name: 'Lista Códigos Sugeridos', type: 'xlsx', size: '200 KB' }
    ]
  },

  'venda-produtos-loja': {
    id: 'venda-produtos-loja',
    title: 'Venda de Produtos - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: ShoppingCart,
    color: 'from-purple-500 to-purple-700',
    videoUrl: '',
    description: 'Realize vendas de produtos na loja com diferentes formas de pagamento.',
    duration: '8 min',
    steps: [
      {
        step: 1,
        title: 'Selecionar Produtos',
        description: 'Escaneie códigos de barras ou digite códigos dos produtos',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=128',
        tips: 'Use código de barras quando possível',
        focusArea: 'Seleção'
      },
      {
        step: 2,
        title: 'Confirmar Quantidades',
        description: 'Verifique quantidades e preços dos produtos',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=129',
        tips: 'Confirme sempre quantidades e preços',
        focusArea: 'Confirmação'
      },
      {
        step: 3,
        title: 'Processar Pagamento',
        description: 'Selecione forma de pagamento e finalize a venda',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=130',
        tips: 'Confirme forma de pagamento antes de finalizar',
        focusArea: 'Pagamento'
      }
    ],
    tips: [
      'Use código de barras quando possível',
      'Confirme sempre quantidades e preços',
      'Verifique forma de pagamento'
    ],
    commonMistakes: [
      'Quantidades incorretas',
      'Preços errados',
      'Forma de pagamento incorreta'
    ],
    resources: [
      { name: 'Manual Vendas Loja', type: 'pdf', size: '2.0 MB' },
      { name: 'Guia Formas Pagamento', type: 'pdf', size: '800 KB' }
    ]
  },

  // TUTORIAIS DO DASHBOARD
  'dashboard-principal': {
    id: 'dashboard-principal',
    title: 'Dashboard Principal',
    category: 'Dashboard',
    subcategory: 'Principal',
    difficulty: 'Iniciante',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-700',
    videoUrl: '',
    description: 'Navegue e utilize o dashboard principal do sistema Lukos.',
    duration: '15 min',
    steps: [
      {
        step: 1,
        title: 'Acesso ao Dashboard',
        description: 'Acesse o dashboard principal do sistema',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center&v=19',
        tips: 'Use credenciais de administrador',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Navegação',
        description: 'Explore os menus e funcionalidades disponíveis',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center&v=20',
        tips: 'Familiarize-se com a interface',
        focusArea: 'Navegação'
      },
      {
        step: 3,
        title: 'Configurações',
        description: 'Configure preferências e parâmetros do sistema',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center&v=21',
        tips: 'Configure conforme suas necessidades',
        focusArea: 'Configuração'
      },
      {
        step: 4,
        title: 'Relatórios',
        description: 'Acesse e configure relatórios disponíveis',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center&v=22',
        tips: 'Configure relatórios essenciais',
        focusArea: 'Relatórios'
      }
    ],
    tips: [
      'Use credenciais de administrador',
      'Familiarize-se com a interface',
      'Configure conforme suas necessidades',
      'Configure relatórios essenciais'
    ],
    commonMistakes: [
      'Credenciais incorretas',
      'Não explorar funcionalidades',
      'Configurações inadequadas',
      'Relatórios não configurados'
    ],
    resources: [
      { name: 'Manual Dashboard', type: 'pdf', size: '2.5 MB' },
      { name: 'Guia Configuração', type: 'pdf', size: '1.2 MB' }
    ]
  }
}

// Função para obter tutorial por ID
export const getTutorialById = (id) => {
  return lukosTutorials[id] || null
}

// Função para obter todos os tutoriais de uma categoria
export const getTutorialsByCategory = (category) => {
  return Object.values(lukosTutorials).filter(tutorial => tutorial.category === category)
}

// Função para obter todos os tutoriais
export const getAllTutorials = () => {
  return Object.values(lukosTutorials)
}

// Função para obter categorias disponíveis
export const getCategories = () => {
  const categories = [...new Set(Object.values(lukosTutorials).map(tutorial => tutorial.category))]
  return categories
}

// Função para obter subcategorias de uma categoria
export const getSubcategories = (category) => {
  const tutorials = getTutorialsByCategory(category)
  const subcategories = [...new Set(tutorials.map(tutorial => tutorial.subcategory))]
  return subcategories
}

export default lukosTutorials
