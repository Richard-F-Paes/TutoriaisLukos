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
  XCircle,
  FileX,
  Printer,
  Percent,
  Archive,
  Key
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
        image: 'https://i.pinimg.com/736x/b4/07/d9/b407d97642d266013347c4855046fdb5.jpgimage.png',
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

  'venda-produtos-pista': {
    id: 'venda-produtos-pista',
    title: 'Venda de Produtos - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: ShoppingCart,
    color: 'from-green-500 to-green-700',
    videoUrl: '',
    description: 'Realize vendas de produtos na pista com diferentes formas de pagamento.',
    duration: '8 min',
    steps: [
      {
        step: 1,
        title: 'Acessar PDV Pista',
        description: 'Acesse o sistema PDV > Pista e selecione a operação de venda',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=19',
        tips: 'Verifique se o sistema está operacional',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Produtos',
        description: 'Escaneie códigos de barras ou digite códigos dos produtos',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=20',
        tips: 'Use código de barras quando possível',
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Confirmar Quantidades',
        description: 'Verifique quantidades e preços dos produtos',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=21',
        tips: 'Confirme sempre quantidades e preços',
        focusArea: 'Confirmação'
      },
      {
        step: 4,
        title: 'Processar Pagamento',
        description: 'Selecione forma de pagamento e finalize a venda',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=22',
        tips: 'Confirme forma de pagamento antes de finalizar',
        focusArea: 'Pagamento'
      }
    ],
    tips: [
      'Use código de barras quando possível',
      'Confirme sempre quantidades e preços',
      'Verifique forma de pagamento',
      'Emita cupom fiscal corretamente'
    ],
    commonMistakes: [
      'Quantidades incorretas',
      'Preços errados',
      'Forma de pagamento incorreta',
      'Cupom não emitido'
    ],
    resources: [
      { name: 'Manual Vendas Pista', type: 'pdf', size: '2.0 MB' },
      { name: 'Guia Formas Pagamento', type: 'pdf', size: '800 KB' }
    ]
  },

  'efetuar-servico-pista': {
    id: 'efetuar-servico-pista',
    title: 'Efetuar um Serviço - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Wrench,
    color: 'from-orange-500 to-orange-700',
    videoUrl: '',
    description: 'Registre serviços realizados na pista do posto.',
    duration: '6 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Serviços',
        description: 'Acesse o menu de serviços no PDV Pista',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=23',
        tips: 'Selecione o tipo de serviço correto',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Serviço',
        description: 'Escolha o serviço a ser realizado',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=24',
        tips: 'Confirme se o serviço está disponível',
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Registrar Serviço',
        description: 'Registre o serviço e confirme os dados',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=25',
        tips: 'Verifique preço e descrição do serviço',
        focusArea: 'Registro'
      },
      {
        step: 4,
        title: 'Finalizar Serviço',
        description: 'Finalize o registro e emita comprovante',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=26',
        tips: 'Emita comprovante para o cliente',
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Selecione o tipo de serviço correto',
      'Confirme se o serviço está disponível',
      'Verifique preço e descrição do serviço',
      'Emita comprovante para o cliente'
    ],
    commonMistakes: [
      'Serviço incorreto selecionado',
      'Preço não verificado',
      'Comprovante não emitido',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Serviços', type: 'pdf', size: '1.5 MB' },
      { name: 'Lista Serviços Disponíveis', type: 'xlsx', size: '300 KB' }
    ]
  },

  'lancar-sangria-pista': {
    id: 'lancar-sangria-pista',
    title: 'Lançar Sangria - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: DollarSign,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Registre retiradas de dinheiro do caixa da pista.',
    duration: '5 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Sangria',
        description: 'Acesse o menu de sangria no PDV Pista',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=27',
        tips: 'Confirme autorização para sangria',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Informar Valor',
        description: 'Digite o valor da sangria a ser retirada',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=28',
        tips: 'Confirme o valor antes de prosseguir',
        focusArea: 'Valor'
      },
      {
        step: 3,
        title: 'Justificar Sangria',
        description: 'Informe o motivo da sangria',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=29',
        tips: 'Seja específico no motivo',
        focusArea: 'Justificativa'
      },
      {
        step: 4,
        title: 'Confirmar Sangria',
        description: 'Confirme os dados e registre a sangria',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=30',
        tips: 'Verifique todos os dados antes de confirmar',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme autorização para sangria',
      'Confirme o valor antes de prosseguir',
      'Seja específico no motivo',
      'Verifique todos os dados antes de confirmar'
    ],
    commonMistakes: [
      'Valor incorreto',
      'Motivo não informado',
      'Sem autorização',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Sangria', type: 'pdf', size: '1.2 MB' },
      { name: 'Formulário Autorização', type: 'pdf', size: '150 KB' }
    ]
  },

  'lancar-despesa-pagamento-pista': {
    id: 'lancar-despesa-pagamento-pista',
    title: 'Lançar Despesa/Pagamento - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: CreditCard,
    color: 'from-pink-500 to-pink-700',
    videoUrl: '',
    description: 'Registre despesas e pagamentos realizados na pista.',
    duration: '7 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Despesas',
        description: 'Acesse o menu de despesas/pagamentos no PDV Pista',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=31',
        tips: 'Selecione o tipo correto de movimentação',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Tipo',
        description: 'Escolha entre despesa ou pagamento',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=32',
        tips: 'Confirme se é despesa ou pagamento',
        focusArea: 'Tipo'
      },
      {
        step: 3,
        title: 'Preencher Dados',
        description: 'Informe valor, descrição e categoria',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=33',
        tips: 'Seja detalhado na descrição',
        focusArea: 'Preenchimento'
      },
      {
        step: 4,
        title: 'Confirmar Registro',
        description: 'Confirme os dados e registre a movimentação',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=34',
        tips: 'Verifique todos os dados antes de confirmar',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Selecione o tipo correto de movimentação',
      'Confirme se é despesa ou pagamento',
      'Seja detalhado na descrição',
      'Verifique todos os dados antes de confirmar'
    ],
    commonMistakes: [
      'Tipo incorreto selecionado',
      'Valor incorreto',
      'Descrição incompleta',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Despesas', type: 'pdf', size: '1.8 MB' },
      { name: 'Categorias Despesas', type: 'xlsx', size: '200 KB' }
    ]
  },

  'lancar-recebimento-pista': {
    id: 'lancar-recebimento-pista',
    title: 'Lançar Recebimento - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: CheckCircle,
    color: 'from-green-400 to-green-600',
    videoUrl: '',
    description: 'Registre recebimentos realizados na pista.',
    duration: '6 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Recebimentos',
        description: 'Acesse o menu de recebimentos no PDV Pista',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=35',
        tips: 'Confirme o tipo de recebimento',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Origem',
        description: 'Escolha a origem do recebimento',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=36',
        tips: 'Selecione a origem correta',
        focusArea: 'Origem'
      },
      {
        step: 3,
        title: 'Informar Dados',
        description: 'Digite valor, descrição e forma de pagamento',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=37',
        tips: 'Confirme valor e forma de pagamento',
        focusArea: 'Dados'
      },
      {
        step: 4,
        title: 'Confirmar Recebimento',
        description: 'Confirme os dados e registre o recebimento',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=38',
        tips: 'Verifique todos os dados antes de confirmar',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme o tipo de recebimento',
      'Selecione a origem correta',
      'Confirme valor e forma de pagamento',
      'Verifique todos os dados antes de confirmar'
    ],
    commonMistakes: [
      'Origem incorreta',
      'Valor incorreto',
      'Forma de pagamento errada',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Recebimentos', type: 'pdf', size: '1.5 MB' },
      { name: 'Formas Pagamento', type: 'xlsx', size: '180 KB' }
    ]
  },

  'cancelar-venda-pista': {
    id: 'cancelar-venda-pista',
    title: 'Cancelar Venda - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Intermediário',
    icon: XCircle,
    color: 'from-purple-500 to-purple-700',
    videoUrl: '',
    description: 'Cancele vendas registradas na pista quando necessário.',
    duration: '10 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Cancelamento',
        description: 'Acesse o menu de cancelamento de vendas',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=39',
        tips: 'Confirme autorização para cancelamento',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Localizar Venda',
        description: 'Encontre a venda a ser cancelada',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=40',
        tips: 'Use filtros para localizar rapidamente',
        focusArea: 'Localização'
      },
      {
        step: 3,
        title: 'Justificar Cancelamento',
        description: 'Informe o motivo do cancelamento',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=41',
        tips: 'Seja específico no motivo',
        focusArea: 'Justificativa'
      },
      {
        step: 4,
        title: 'Confirmar Cancelamento',
        description: 'Confirme o cancelamento e processe',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=42',
        tips: 'Verifique dados antes de confirmar',
        focusArea: 'Confirmação'
      },
      {
        step: 5,
        title: 'Processar Estorno',
        description: 'Processe o estorno se necessário',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=43',
        tips: 'Confirme estorno com cliente',
        focusArea: 'Estorno'
      }
    ],
    tips: [
      'Confirme autorização para cancelamento',
      'Use filtros para localizar rapidamente',
      'Seja específico no motivo',
      'Verifique dados antes de confirmar',
      'Confirme estorno com cliente'
    ],
    commonMistakes: [
      'Sem autorização',
      'Venda incorreta selecionada',
      'Motivo não informado',
      'Estorno não processado',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Cancelamentos', type: 'pdf', size: '2.0 MB' },
      { name: 'Formulário Autorização', type: 'pdf', size: '200 KB' }
    ]
  },

  'cancelar-cupom-pista': {
    id: 'cancelar-cupom-pista',
    title: 'Cancelar Cupom - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Intermediário',
    icon: XCircle,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Cancele cupons fiscais emitidos na pista.',
    duration: '8 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Cancelamento',
        description: 'Acesse o menu de cancelamento de cupons',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=44',
        tips: 'Confirme autorização para cancelamento',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Localizar Cupom',
        description: 'Encontre o cupom a ser cancelado',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=45',
        tips: 'Use número do cupom para localizar',
        focusArea: 'Localização'
      },
      {
        step: 3,
        title: 'Justificar Cancelamento',
        description: 'Informe o motivo do cancelamento',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=46',
        tips: 'Seja específico no motivo',
        focusArea: 'Justificativa'
      },
      {
        step: 4,
        title: 'Confirmar Cancelamento',
        description: 'Confirme o cancelamento e processe',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=47',
        tips: 'Verifique dados antes de confirmar',
        focusArea: 'Confirmação'
      },
      {
        step: 5,
        title: 'Emitir Comprovante',
        description: 'Emite comprovante de cancelamento',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=48',
        tips: 'Guarde comprovante para arquivo',
        focusArea: 'Comprovante'
      }
    ],
    tips: [
      'Confirme autorização para cancelamento',
      'Use número do cupom para localizar',
      'Seja específico no motivo',
      'Verifique dados antes de confirmar',
      'Guarde comprovante para arquivo'
    ],
    commonMistakes: [
      'Sem autorização',
      'Cupom incorreto selecionado',
      'Motivo não informado',
      'Comprovante não emitido',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Cancelamento Cupons', type: 'pdf', size: '1.8 MB' },
      { name: 'Formulário Autorização', type: 'pdf', size: '180 KB' }
    ]
  },

  'consultar-vendas-pista': {
    id: 'consultar-vendas-pista',
    title: 'Consultar Vendas - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: FileText,
    color: 'from-blue-400 to-blue-600',
    videoUrl: '',
    description: 'Consulte vendas realizadas na pista com filtros e relatórios.',
    duration: '12 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Consulta',
        description: 'Acesse o menu de consulta de vendas',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=49',
        tips: 'Selecione o período desejado',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Aplicar Filtros',
        description: 'Configure filtros de data, produto, vendedor',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=50',
        tips: 'Use filtros para resultados mais precisos',
        focusArea: 'Filtros'
      },
      {
        step: 3,
        title: 'Visualizar Resultados',
        description: 'Analise os resultados da consulta',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=51',
        tips: 'Use ordenação para melhor visualização',
        focusArea: 'Visualização'
      },
      {
        step: 4,
        title: 'Exportar Relatório',
        description: 'Exporte relatório se necessário',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=52',
        tips: 'Escolha formato adequado para exportação',
        focusArea: 'Exportação'
      },
      {
        step: 5,
        title: 'Imprimir Relatório',
        description: 'Imprima relatório se necessário',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=53',
        tips: 'Configure impressão antes de imprimir',
        focusArea: 'Impressão'
      }
    ],
    tips: [
      'Selecione o período desejado',
      'Use filtros para resultados mais precisos',
      'Use ordenação para melhor visualização',
      'Escolha formato adequado para exportação',
      'Configure impressão antes de imprimir'
    ],
    commonMistakes: [
      'Período incorreto',
      'Filtros mal configurados',
      'Formato de exportação inadequado',
      'Impressão não configurada',
      'Dados não verificados'
    ],
    resources: [
      { name: 'Manual Consultas', type: 'pdf', size: '2.2 MB' },
      { name: 'Guia Filtros', type: 'pdf', size: '800 KB' }
    ]
  },

  'reimprimir-cupom-pista': {
    id: 'reimprimir-cupom-pista',
    title: 'Reimprimir Cupom - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Printer,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Reimprima cupons fiscais já emitidos na pista.',
    duration: '5 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Reimpressão',
        description: 'Acesse o menu de reimpressão de cupons',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=54',
        tips: 'Confirme se impressora está funcionando',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Localizar Cupom',
        description: 'Encontre o cupom a ser reimpresso',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=55',
        tips: 'Use número do cupom ou data',
        focusArea: 'Localização'
      },
      {
        step: 3,
        title: 'Confirmar Reimpressão',
        description: 'Confirme os dados e reimprima',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=56',
        tips: 'Verifique dados antes de reimprimir',
        focusArea: 'Confirmação'
      },
      {
        step: 4,
        title: 'Verificar Impressão',
        description: 'Confirme se cupom foi impresso corretamente',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=57',
        tips: 'Verifique qualidade da impressão',
        focusArea: 'Verificação'
      }
    ],
    tips: [
      'Confirme se impressora está funcionando',
      'Use número do cupom ou data',
      'Verifique dados antes de reimprimir',
      'Verifique qualidade da impressão'
    ],
    commonMistakes: [
      'Impressora não funcionando',
      'Cupom não encontrado',
      'Dados incorretos',
      'Qualidade de impressão ruim'
    ],
    resources: [
      { name: 'Manual Reimpressão', type: 'pdf', size: '1.0 MB' },
      { name: 'Guia Impressora', type: 'pdf', size: '500 KB' }
    ]
  },

  'desconto-pista': {
    id: 'desconto-pista',
    title: 'Desconto - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Tag,
    color: 'from-red-400 to-red-600',
    videoUrl: '',
    description: 'Aplique desconto geral na venda da pista.',
    duration: '6 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Desconto',
        description: 'Acesse o menu de desconto durante a venda',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=58',
        tips: 'Confirme autorização para desconto',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Tipo',
        description: 'Escolha entre desconto percentual ou valor fixo',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=59',
        tips: 'Selecione o tipo mais adequado',
        focusArea: 'Tipo'
      },
      {
        step: 3,
        title: 'Informar Valor',
        description: 'Digite o valor ou percentual do desconto',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=60',
        tips: 'Confirme valor antes de aplicar',
        focusArea: 'Valor'
      },
      {
        step: 4,
        title: 'Aplicar Desconto',
        description: 'Aplique o desconto e confirme',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=61',
        tips: 'Verifique valor final antes de confirmar',
        focusArea: 'Aplicação'
      },
      {
        step: 5,
        title: 'Confirmar Venda',
        description: 'Confirme a venda com desconto aplicado',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=62',
        tips: 'Emita cupom com desconto aplicado',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme autorização para desconto',
      'Selecione o tipo mais adequado',
      'Confirme valor antes de aplicar',
      'Verifique valor final antes de confirmar',
      'Emita cupom com desconto aplicado'
    ],
    commonMistakes: [
      'Sem autorização',
      'Tipo incorreto selecionado',
      'Valor incorreto',
      'Desconto não aplicado',
      'Cupom não emitido'
    ],
    resources: [
      { name: 'Manual Descontos', type: 'pdf', size: '1.5 MB' },
      { name: 'Tabela Limites', type: 'xlsx', size: '200 KB' }
    ]
  },

  'desconto-item-pista': {
    id: 'desconto-item-pista',
    title: 'Desconto no Item - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Tag,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Aplique desconto em um item específico da venda.',
    duration: '7 min',
    steps: [
      {
        step: 1,
        title: 'Selecionar Item',
        description: 'Selecione o item que receberá desconto',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=63',
        tips: 'Confirme se item pode receber desconto',
        focusArea: 'Seleção'
      },
      {
        step: 2,
        title: 'Acessar Desconto',
        description: 'Acesse opção de desconto do item',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=64',
        tips: 'Confirme autorização para desconto',
        focusArea: 'Acesso'
      },
      {
        step: 3,
        title: 'Configurar Desconto',
        description: 'Configure tipo e valor do desconto',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=65',
        tips: 'Selecione tipo e valor adequados',
        focusArea: 'Configuração'
      },
      {
        step: 4,
        title: 'Aplicar Desconto',
        description: 'Aplique desconto no item selecionado',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=66',
        tips: 'Verifique valor final do item',
        focusArea: 'Aplicação'
      },
      {
        step: 5,
        title: 'Confirmar Alteração',
        description: 'Confirme alteração no item',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=67',
        tips: 'Verifique total da venda',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme se item pode receber desconto',
      'Confirme autorização para desconto',
      'Selecione tipo e valor adequados',
      'Verifique valor final do item',
      'Verifique total da venda'
    ],
    commonMistakes: [
      'Item incorreto selecionado',
      'Sem autorização',
      'Tipo incorreto',
      'Valor incorreto',
      'Desconto não aplicado'
    ],
    resources: [
      { name: 'Manual Desconto Item', type: 'pdf', size: '1.3 MB' },
      { name: 'Tabela Limites Item', type: 'xlsx', size: '150 KB' }
    ]
  },

  'abrir-gaveta-pista': {
    id: 'abrir-gaveta-pista',
    title: 'Abrir Gaveta - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: Key,
    color: 'from-indigo-400 to-indigo-600',
    videoUrl: '',
    description: 'Abra a gaveta do caixa da pista quando necessário.',
    duration: '3 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Função',
        description: 'Acesse a função de abrir gaveta',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=68',
        tips: 'Confirme se gaveta está travada',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Confirmar Abertura',
        description: 'Confirme a abertura da gaveta',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=69',
        tips: 'Aguarde abertura completa',
        focusArea: 'Confirmação'
      },
      {
        step: 3,
        title: 'Verificar Abertura',
        description: 'Confirme se gaveta abriu corretamente',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=70',
        tips: 'Verifique se gaveta está funcionando',
        focusArea: 'Verificação'
      }
    ],
    tips: [
      'Confirme se gaveta está travada',
      'Aguarde abertura completa',
      'Verifique se gaveta está funcionando'
    ],
    commonMistakes: [
      'Gaveta já aberta',
      'Falha na abertura',
      'Não verificar funcionamento'
    ],
    resources: [
      { name: 'Manual Gaveta', type: 'pdf', size: '800 KB' },
      { name: 'Guia Manutenção', type: 'pdf', size: '400 KB' }
    ]
  },

  'relatorio-parcial-caixa-pista': {
    id: 'relatorio-parcial-caixa-pista',
    title: 'Relatório Parcial de Caixa - Pista',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    icon: FileText,
    color: 'from-blue-500 to-blue-700',
    videoUrl: '',
    description: 'Visualize relatório parcial de movimentação do caixa da pista.',
    duration: '8 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Relatório',
        description: 'Acesse o menu de relatórios parciais',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=71',
        tips: 'Selecione período desejado',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Configurar Filtros',
        description: 'Configure filtros de data e tipo de movimentação',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=72',
        tips: 'Use filtros para dados mais precisos',
        focusArea: 'Filtros'
      },
      {
        step: 3,
        title: 'Gerar Relatório',
        description: 'Gere o relatório com os filtros aplicados',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=73',
        tips: 'Aguarde processamento completo',
        focusArea: 'Geração'
      },
      {
        step: 4,
        title: 'Visualizar Dados',
        description: 'Analise os dados do relatório',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=74',
        tips: 'Verifique totais e movimentações',
        focusArea: 'Visualização'
      },
      {
        step: 5,
        title: 'Imprimir Relatório',
        description: 'Imprima relatório se necessário',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=75',
        tips: 'Configure impressão antes de imprimir',
        focusArea: 'Impressão'
      }
    ],
    tips: [
      'Selecione período desejado',
      'Use filtros para dados mais precisos',
      'Aguarde processamento completo',
      'Verifique totais e movimentações',
      'Configure impressão antes de imprimir'
    ],
    commonMistakes: [
      'Período incorreto',
      'Filtros mal configurados',
      'Dados não verificados',
      'Impressão não configurada',
      'Relatório incompleto'
    ],
    resources: [
      { name: 'Manual Relatórios', type: 'pdf', size: '2.0 MB' },
      { name: 'Guia Filtros Relatórios', type: 'pdf', size: '600 KB' }
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
    description: 'Configure códigos rápidos para produtos mais vendidos na loja, permitindo acesso instantâneo aos itens mais procurados pelos clientes.',
    duration: '7 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=247',
        tips: 'Configure códigos para produtos mais vendidos como refrigerantes, salgadinhos e doces',
        focusArea: 'Configuração'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=248',
        tips: 'Use códigos simples e fáceis de lembrar, como REFRI01, SALG01, DOCE01',
        focusArea: 'Cadastro'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=249',
        tips: 'Confirme se o código foi salvo corretamente',
        focusArea: 'Salvamento'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=250',
        tips: 'O campo de código rápido ficará disponível na tela de vendas',
        focusArea: 'Uso'
      }
    ],
    tips: [
      'Use códigos simples e fáceis de lembrar',
      'Configure para produtos mais vendidos',
      'Teste sempre após cadastrar',
      'Mantenha uma lista dos códigos criados',
      'Salve as alterações após cada configuração'
    ],
    commonMistakes: [
      'Códigos muito complexos',
      'Produtos incorretos',
      'Não salvar alterações',
      'Códigos duplicados',
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
    description: 'Realize vendas de produtos na loja com diferentes formas de pagamento, incluindo dinheiro, cartão e PIX.',
    duration: '8 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=251',
        tips: 'Use código de barras quando possível para maior agilidade',
        focusArea: 'Seleção'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=252',
        tips: 'Confirme sempre quantidades e preços com o cliente',
        focusArea: 'Confirmação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=253',
        tips: 'Confirme forma de pagamento antes de finalizar',
        focusArea: 'Pagamento'
      }
    ],
    tips: [
      'Use código de barras quando possível',
      'Confirme sempre quantidades e preços',
      'Verifique forma de pagamento',
      'Emita cupom fiscal corretamente'
    ],
    commonMistakes: [
      'Quantidades incorretas',
      'Preços errados',
      'Forma de pagamento incorreta',
      'Cupom não emitido'
    ],
    resources: [
      { name: 'Manual Vendas Loja', type: 'pdf', size: '2.0 MB' },
      { name: 'Guia Formas Pagamento', type: 'pdf', size: '800 KB' }
    ]
  },

  'efetuar-servico-loja': {
    id: 'efetuar-servico-loja',
    title: 'Efetuar um Serviço - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: Wrench,
    color: 'from-orange-500 to-orange-700',
    videoUrl: '',
    description: 'Registre serviços realizados na loja como lavagem de carro, troca de óleo e outros serviços oferecidos.',
    duration: '6 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Serviços',
        description: 'No PDV Loja, acesse o menu Serviços > Novo Serviço',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=400&h=250&fit=crop&crop=center&v=189',
        tips: 'Selecione o tipo de serviço correto (lavagem, troca de óleo, etc.)',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=400&h=250&fit=crop&crop=center&v=190',
        tips: 'Confirme se o serviço está disponível e ativo',
        focusArea: 'Seleção'
      },
      
      {
        image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=400&h=250&fit=crop&crop=center&v=191',
        tips: 'Verifique preço e descrição do serviço antes de confirmar',
        focusArea: 'Registro'
      },
      {
        image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=400&h=250&fit=crop&crop=center&v=192',
        tips: 'Emita comprovante para o cliente guardar',
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Selecione o tipo de serviço correto',
      'Confirme se o serviço está disponível',
      'Verifique preço e descrição do serviço',
      'Emita comprovante para o cliente'
    ],
    commonMistakes: [
      'Serviço incorreto selecionado',
      'Preço não verificado',
      'Comprovante não emitido',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Serviços Loja', type: 'pdf', size: '1.5 MB' },
      { name: 'Lista Serviços Disponíveis', type: 'xlsx', size: '300 KB' }
    ]
  },

  'lancar-sangria-loja': {
    id: 'lancar-sangria-loja',
    title: 'Lançar Sangria - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: DollarSign,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Registre retiradas de dinheiro do caixa da loja para troco, despesas ou outros fins operacionais.',
    duration: '5 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=193',
        tips: 'Confirme autorização para sangria antes de prosseguir',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=194',
        tips: 'Confirme o valor antes de prosseguir',
        focusArea: 'Valor'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=195',
        tips: 'Seja específico no motivo da sangria',
        focusArea: 'Justificativa'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=196',
        tips: 'Verifique todos os dados antes de confirmar',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme autorização para sangria',
      'Confirme o valor antes de prosseguir',
      'Seja específico no motivo',
      'Verifique todos os dados antes de confirmar'
    ],
    commonMistakes: [
      'Valor incorreto',
      'Motivo não informado',
      'Sem autorização',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Sangria Loja', type: 'pdf', size: '1.2 MB' },
      { name: 'Formulário Autorização', type: 'pdf', size: '150 KB' }
    ]
  },

  'lancar-despesa-pagamento-loja': {
    id: 'lancar-despesa-pagamento-loja',
    title: 'Lançar Despesa/Pagamento - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: CreditCard,
    color: 'from-pink-500 to-pink-700',
    videoUrl: '',
    description: 'Registre despesas e pagamentos realizados na loja como contas de luz, água, fornecedores e outras despesas operacionais.',
    duration: '7 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=197',
        tips: 'Selecione o tipo correto de movimentação (despesa ou pagamento)',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=198',
        tips: 'Confirme se é despesa ou pagamento',
        focusArea: 'Tipo'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=199',
        tips: 'Seja detalhado na descrição para controle financeiro',
        focusArea: 'Preenchimento'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=200',
        tips: 'Verifique todos os dados antes de confirmar',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Selecione o tipo correto de movimentação',
      'Confirme se é despesa ou pagamento',
      'Seja detalhado na descrição',
      'Verifique todos os dados antes de confirmar'
    ],
    commonMistakes: [
      'Tipo incorreto selecionado',
      'Valor incorreto',
      'Descrição incompleta',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Despesas Loja', type: 'pdf', size: '1.8 MB' },
      { name: 'Categorias Despesas', type: 'xlsx', size: '200 KB' }
    ]
  },

  'lancar-recebimento-loja': {
    id: 'lancar-recebimento-loja',
    title: 'Lançar Recebimento - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: CheckCircle,
    color: 'from-green-400 to-green-600',
    videoUrl: '',
    description: 'Registre recebimentos realizados na loja como vendas a prazo, recebimentos de clientes e outras entradas de dinheiro.',
    duration: '6 min',
    steps: [
      {
        step: 1,
        title: 'Acessar Recebimentos',
        description: 'Acesse o menu de recebimentos no PDV Loja',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=201',
        tips: 'Confirme o tipo de recebimento antes de prosseguir',
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Selecionar Origem',
        description: 'Escolha a origem do recebimento',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=202',
        tips: 'Selecione a origem correta do recebimento',
        focusArea: 'Origem'
      },
      {
        step: 3,
        title: 'Informar Dados',
        description: 'Digite valor, descrição e forma de pagamento',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=203',
        tips: 'Confirme valor e forma de pagamento com o cliente',
        focusArea: 'Dados'
      },
      {
        step: 4,
        title: 'Confirmar Recebimento',
        description: 'Confirme os dados e registre o recebimento no sistema',
        duration: '1 min',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=204',
        tips: 'Verifique todos os dados antes de confirmar',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme o tipo de recebimento',
      'Selecione a origem correta',
      'Confirme valor e forma de pagamento',
      'Verifique todos os dados antes de confirmar'
    ],
    commonMistakes: [
      'Origem incorreta',
      'Valor incorreto',
      'Forma de pagamento errada',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Recebimentos Loja', type: 'pdf', size: '1.5 MB' },
      { name: 'Formas Pagamento', type: 'xlsx', size: '180 KB' }
    ]
  },

  'cancelar-venda-loja': {
    id: 'cancelar-venda-loja',
    title: 'Cancelar Venda - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Intermediário',
    icon: XCircle,
    color: 'from-purple-500 to-purple-700',
    videoUrl: '',
    description: 'Cancele vendas registradas na loja quando necessário, com processo de estorno e justificativa adequada.',
    duration: '10 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=205',
        tips: 'Confirme autorização para cancelamento antes de prosseguir',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=206',
        tips: 'Use filtros para localizar rapidamente a venda',
        focusArea: 'Localização'
      },
      {
        
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=207',
        tips: 'Seja específico no motivo do cancelamento',
        focusArea: 'Justificativa'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=208',
        tips: 'Confirme estorno com cliente antes de processar',
        focusArea: 'Estorno'
      }
    ],
    tips: [
      'Confirme autorização para cancelamento',
      'Use filtros para localizar rapidamente',
      'Seja específico no motivo',
      'Verifique dados antes de confirmar',
      'Confirme estorno com cliente'
    ],
    commonMistakes: [
      'Sem autorização',
      'Venda incorreta selecionada',
      'Motivo não informado',
      'Estorno não processado',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Cancelamentos Loja', type: 'pdf', size: '2.0 MB' },
      { name: 'Formulário Autorização', type: 'pdf', size: '200 KB' }
    ]
  },

  'cancelar-cupom-loja': {
    id: 'cancelar-cupom-loja',
    title: 'Cancelar Cupom - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Intermediário',
    icon: XCircle,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Cancele cupons fiscais emitidos na loja quando necessário, com processo de cancelamento fiscal adequado.',
    duration: '8 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=210',
        tips: 'Confirme autorização para cancelamento antes de prosseguir',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=211',
        tips: 'Use número do cupom para localizar rapidamente',
        focusArea: 'Localização'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=212',
        tips: 'Seja específico no motivo do cancelamento',
        focusArea: 'Justificativa'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=213',
        tips: 'Verifique dados antes de confirmar o cancelamento',
        focusArea: 'Confirmação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=214',
        tips: 'Guarde comprovante para arquivo fiscal',
        focusArea: 'Comprovante'
      }
    ],
    tips: [
      'Confirme autorização para cancelamento',
      'Use número do cupom para localizar',
      'Seja específico no motivo',
      'Verifique dados antes de confirmar',
      'Guarde comprovante para arquivo'
    ],
    commonMistakes: [
      'Sem autorização',
      'Cupom incorreto selecionado',
      'Motivo não informado',
      'Comprovante não emitido',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Cancelamento Cupons Loja', type: 'pdf', size: '1.8 MB' },
      { name: 'Formulário Autorização', type: 'pdf', size: '180 KB' }
    ]
  },

  'consultar-vendas-loja': {
    id: 'consultar-vendas-loja',
    title: 'Consultar Vendas - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: FileText,
    color: 'from-blue-400 to-blue-600',
    videoUrl: '',
    description: 'Consulte vendas realizadas na loja com filtros e relatórios.',
    duration: '12 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=215',
        tips: 'Selecione o período desejado',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=216',
        tips: 'Use filtros para resultados mais precisos',
        focusArea: 'Filtros'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=217',
        tips: 'Use ordenação para melhor visualização',
        focusArea: 'Visualização'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=218',
        tips: 'Escolha formato adequado para exportação',
        focusArea: 'Exportação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=219',
        tips: 'Configure impressão antes de imprimir',
        focusArea: 'Impressão'
      }
    ],
    tips: [
      'Selecione o período desejado',
      'Use filtros para resultados mais precisos',
      'Use ordenação para melhor visualização',
      'Escolha formato adequado para exportação',
      'Configure impressão antes de imprimir'
    ],
    commonMistakes: [
      'Período incorreto',
      'Filtros mal configurados',
      'Formato de exportação inadequado',
      'Impressão não configurada',
      'Dados não verificados'
    ],
    resources: [
      { name: 'Manual Consultas Loja', type: 'pdf', size: '2.2 MB' },
      { name: 'Guia Filtros', type: 'pdf', size: '800 KB' }
    ]
  },

  'reimprimir-cupom-loja': {
    id: 'reimprimir-cupom-loja',
    title: 'Reimprimir Cupom - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: Printer,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Reimprima cupons fiscais já emitidos na loja.',
    duration: '5 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=220',
        tips: 'Confirme se impressora está funcionando',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=221',
        tips: 'Use número do cupom ou data',
        focusArea: 'Localização'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=222',
        tips: 'Verifique dados antes de reimprimir',
        focusArea: 'Confirmação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=223',
        tips: 'Verifique qualidade da impressão',
        focusArea: 'Verificação'
      }
    ],
    tips: [
      'Confirme se impressora está funcionando',
      'Use número do cupom ou data',
      'Verifique dados antes de reimprimir',
      'Verifique qualidade da impressão'
    ],
    commonMistakes: [
      'Impressora não funcionando',
      'Cupom não encontrado',
      'Dados incorretos',
      'Qualidade de impressão ruim'
    ],
    resources: [
      { name: 'Manual Reimpressão Loja', type: 'pdf', size: '1.0 MB' },
      { name: 'Guia Impressora', type: 'pdf', size: '500 KB' }
    ]
  },

  'encerrar-turno-loja': {
    id: 'encerrar-turno-loja',
    title: 'Encerrar o Turno - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Intermediário',
    icon: CheckCircle2,
    color: 'from-green-500 to-green-700',
    videoUrl: '',
    description: 'Como encerrar o turno corretamente na loja.',
    duration: '25 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=224',
        tips: 'Confirme todas as vendas e verifique valores totais',
        focusArea: 'Verificação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=225',
        tips: 'Concilie valores do caixa e identifique diferenças',
        focusArea: 'Conciliação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=226',
        tips: 'Imprima relatório de vendas e confirme movimentação',
        focusArea: 'Relatórios'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=227',
        tips: 'Registre sangrias e confirme recebimentos',
        focusArea: 'Movimentação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=228',
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
      { name: 'Manual Encerramento Loja', type: 'pdf', size: '2.2 MB' },
      { name: 'Checklist Turno', type: 'pdf', size: '180 KB' }
    ]
  },

  'desconto-loja': {
    id: 'desconto-loja',
    title: 'Desconto - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: Tag,
    color: 'from-red-400 to-red-600',
    videoUrl: '',
    description: 'Aplique desconto geral na venda da loja.',
    duration: '6 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=229',
        tips: 'Confirme autorização para desconto',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=230',
        tips: 'Selecione o tipo mais adequado',
        focusArea: 'Tipo'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=231',
        tips: 'Confirme valor antes de aplicar',
        focusArea: 'Valor'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=232',
        tips: 'Verifique valor final antes de confirmar',
        focusArea: 'Aplicação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=233',
        tips: 'Emita cupom com desconto aplicado',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme autorização para desconto',
      'Selecione o tipo mais adequado',
      'Confirme valor antes de aplicar',
      'Verifique valor final antes de confirmar',
      'Emita cupom com desconto aplicado'
    ],
    commonMistakes: [
      'Sem autorização',
      'Tipo incorreto selecionado',
      'Valor incorreto',
      'Desconto não aplicado',
      'Cupom não emitido'
    ],
    resources: [
      { name: 'Manual Descontos Loja', type: 'pdf', size: '1.5 MB' },
      { name: 'Tabela Limites', type: 'xlsx', size: '200 KB' }
    ]
  },

  'desconto-item-loja': {
    id: 'desconto-item-loja',
    title: 'Desconto no Item - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: Tag,
    color: 'from-red-500 to-red-700',
    videoUrl: '',
    description: 'Aplique desconto em um item específico da venda.',
    duration: '7 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=234',
        tips: 'Confirme se item pode receber desconto',
        focusArea: 'Seleção'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=235',
        tips: 'Confirme autorização para desconto',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=236',
        tips: 'Selecione tipo e valor adequados',
        focusArea: 'Configuração'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=237',
        tips: 'Verifique valor final do item',
        focusArea: 'Aplicação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=238',
        tips: 'Verifique total da venda',
        focusArea: 'Confirmação'
      }
    ],
    tips: [
      'Confirme se item pode receber desconto',
      'Confirme autorização para desconto',
      'Selecione tipo e valor adequados',
      'Verifique valor final do item',
      'Verifique total da venda'
    ],
    commonMistakes: [
      'Item incorreto selecionado',
      'Sem autorização',
      'Tipo incorreto',
      'Valor incorreto',
      'Desconto não aplicado'
    ],
    resources: [
      { name: 'Manual Desconto Item Loja', type: 'pdf', size: '1.3 MB' },
      { name: 'Tabela Limites Item', type: 'xlsx', size: '150 KB' }
    ]
  },

  'abrir-gaveta-loja': {
    id: 'abrir-gaveta-loja',
    title: 'Abrir Gaveta - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: Key,
    color: 'from-indigo-400 to-indigo-600',
    videoUrl: '',
    description: 'Abra a gaveta do caixa da loja quando necessário.',
    duration: '3 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=239',
        tips: 'Confirme se gaveta está travada',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=240',
        tips: 'Aguarde abertura completa',
        focusArea: 'Confirmação'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=241',
        tips: 'Verifique se gaveta está funcionando',
        focusArea: 'Verificação'
      }
    ],
    tips: [
      'Confirme se gaveta está travada',
      'Aguarde abertura completa',
      'Verifique se gaveta está funcionando'
    ],
    commonMistakes: [
      'Gaveta já aberta',
      'Falha na abertura',
      'Não verificar funcionamento'
    ],
    resources: [
      { name: 'Manual Gaveta Loja', type: 'pdf', size: '800 KB' },
      { name: 'Guia Manutenção', type: 'pdf', size: '400 KB' }
    ]
  },

  'relatorio-parcial-caixa-loja': {
    id: 'relatorio-parcial-caixa-loja',
    title: 'Relatório Parcial de Caixa - Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    icon: FileText,
    color: 'from-blue-500 to-blue-700',
    videoUrl: '',
    description: 'Visualize relatório parcial de movimentação do caixa da loja.',
    duration: '8 min',
    steps: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=242',
        tips: 'Selecione período desejado',
        focusArea: 'Acesso'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=243',
        tips: 'Use filtros para dados mais precisos',
        focusArea: 'Filtros'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=244',
        tips: 'Aguarde processamento completo',
        focusArea: 'Geração'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=245',
        tips: 'Verifique totais e movimentações',
        focusArea: 'Visualização'
      },
      {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=246',
        tips: 'Configure impressão antes de imprimir',
        focusArea: 'Impressão'
      }
    ],
    tips: [
      'Selecione período desejado',
      'Use filtros para dados mais precisos',
      'Aguarde processamento completo',
      'Verifique totais e movimentações',
      'Configure impressão antes de imprimir'
    ],
    commonMistakes: [
      'Período incorreto',
      'Filtros mal configurados',
      'Dados não verificados',
      'Impressão não configurada',
      'Relatório incompleto'
    ],
    resources: [
      { name: 'Manual Relatórios Loja', type: 'pdf', size: '2.0 MB' },
      { name: 'Guia Filtros Relatórios', type: 'pdf', size: '600 KB' }
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
