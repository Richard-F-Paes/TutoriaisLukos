// Tutoriais da Retaguarda do Sistema Lukos
// Baseados na estrutura da RetaguardaTutorialsPage

export const retaguardaTutorials = {
  // CADASTROS
  'cadastro-clientes': {
    id: 'cadastro-clientes',
    title: 'Cadastro de Clientes',
    category: 'Cadastros',
    subcategory: 'Clientes',
    difficulty: 'Iniciante',
    duration: '10min',
    description: 'Cadastro completo de clientes com CPF, CNPJ e informações de faturamento.',
    image: 'https://via.placeholder.com/400x250?text=Cadastro+de+Clientes',
    videoUrl: 'https://example.com/video1.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro de Clientes',
        description: 'Navegue até o módulo de cadastros e selecione "Cadastro de Clientes"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Certifique-se de ter todas as informações do cliente em mãos',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados Básicos',
        description: 'Preencha nome, CPF/CNPJ e dados de contato do cliente',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Verifique se o CPF/CNPJ está correto antes de salvar',
        focusArea: 'Validação de dados'
      },
      {
        step: 3,
        title: 'Configurar Informações de Faturamento',
        description: 'Configure dados de faturamento e limites de crédito',
        duration: 180,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Defina limites apropriados baseados no histórico do cliente',
        focusArea: 'Configuração financeira'
      }
    ],
    tips: [
      'Sempre verifique se o cliente já existe no sistema antes de cadastrar',
      'Mantenha os dados de contato sempre atualizados',
      'Configure limites de crédito baseados no perfil do cliente'
    ],
    commonMistakes: [
      'Cadastrar cliente duplicado',
      'Informar dados incorretos de CPF/CNPJ',
      'Não configurar limites de crédito'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:30', title: 'Dados Básicos' },
      { time: '07:30', title: 'Faturamento' },
      { time: '10:30', title: 'Conclusão' }
    ],
    quiz: {
      question: 'Qual é o primeiro passo para cadastrar um cliente?',
      options: [
        'Verificar se já existe no sistema',
        'Preencher dados básicos',
        'Configurar faturamento',
        'Salvar o cadastro'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Cadastro de Clientes', url: '#' },
      { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
    ]
  },
  'cadastro-funcionarios': {
    id: 'cadastro-funcionarios',
    title: 'Cadastro de Funcionários',
    category: 'Cadastros',
    subcategory: 'Funcionários',
    difficulty: 'Iniciante',
    duration: '9min',
    description: 'Gestão de funcionários, grupos de comissão e fornecedores.',
    image: 'https://via.placeholder.com/400x250?text=Cadastro+de+Funcionarios',
    videoUrl: 'https://example.com/video2.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro de Funcionários',
        description: 'Navegue até o módulo de cadastros e selecione "Funcionários"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Tenha em mãos todos os documentos do funcionário',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados Pessoais',
        description: 'Preencha nome, CPF, RG e dados pessoais do funcionário',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Verifique se todos os documentos estão válidos',
        focusArea: 'Validação de documentos'
      },
      {
        step: 3,
        title: 'Configurar IdentFid',
        description: 'Configure o IdentFid e grupos de comissão',
        duration: 180,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'O IdentFid é único para cada funcionário',
        focusArea: 'Configuração de acesso'
      }
    ],
    tips: [
      'Cada funcionário deve ter um IdentFid único',
      'Configure grupos de comissão adequados',
      'Mantenha dados de contato sempre atualizados'
    ],
    commonMistakes: [
      'Usar IdentFid duplicado',
      'Não configurar grupos de comissão',
      'Esquecer de validar documentos'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Dados Pessoais' },
      { time: '06:00', title: 'IdentFid' },
      { time: '09:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'O que é o IdentFid?',
      options: [
        'Identificação única do funcionário',
        'Código do produto',
        'Número da nota fiscal',
        'Código do cliente'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Cadastro de Funcionários', url: '#' },
      { type: 'DOCX', name: 'Lista de Documentos Necessários', url: '#' }
    ]
  },
  'cadastro-fornecedores': {
    id: 'cadastro-fornecedores',
    title: 'Cadastro de Fornecedores',
    category: 'Cadastros',
    subcategory: 'Fornecedores',
    difficulty: 'Iniciante',
    duration: '11min',
    description: 'Cadastro de fornecedores por CNPJ e CPF com informações completas.',
    image: 'https://via.placeholder.com/400x250?text=Cadastro+de+Fornecedores',
    videoUrl: 'https://example.com/video3.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro de Fornecedores',
        description: 'Navegue até o módulo de cadastros e selecione "Fornecedores"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Verifique se o fornecedor já está cadastrado',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados da Empresa',
        description: 'Preencha razão social, CNPJ e dados da empresa',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Consulte a Receita Federal para validar CNPJ',
        focusArea: 'Validação de CNPJ'
      },
      {
        step: 3,
        title: 'Configurar Informações Comerciais',
        description: 'Configure condições de pagamento e dados bancários',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Configure condições que sejam viáveis para sua empresa',
        focusArea: 'Configuração comercial'
      }
    ],
    tips: [
      'Sempre valide o CNPJ na Receita Federal',
      'Configure condições de pagamento adequadas',
      'Mantenha dados bancários sempre atualizados'
    ],
    commonMistakes: [
      'Cadastrar fornecedor com CNPJ inválido',
      'Não configurar condições de pagamento',
      'Esquecer dados bancários'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Dados da Empresa' },
      { time: '07:00', title: 'Informações Comerciais' },
      { time: '11:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'Onde devemos validar o CNPJ do fornecedor?',
      options: [
        'Receita Federal',
        'Banco Central',
        'Ministério do Trabalho',
        'Prefeitura'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Cadastro de Fornecedores', url: '#' },
      { type: 'DOCX', name: 'Checklist de Validação CNPJ', url: '#' }
    ]
  },
  'unidades-operacionais': {
    id: 'unidades-operacionais',
    title: 'Unidades Operacionais',
    category: 'Cadastros',
    subcategory: 'Unidades',
    difficulty: 'Intermediário',
    duration: '11min',
    description: 'Gestão de unidades operacionais, contadores e abastecimentos.',
    image: 'https://via.placeholder.com/400x250?text=Unidades+Operacionais',
    videoUrl: 'https://example.com/video4.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Unidades Operacionais',
        description: 'Navegue até o módulo de cadastros e selecione "Unidades Operacionais"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Tenha em mãos os dados da unidade',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Cadastrar Nova Unidade',
        description: 'Preencha nome, endereço e dados da unidade operacional',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Use nomes descritivos para facilitar identificação',
        focusArea: 'Cadastro de dados'
      },
      {
        step: 3,
        title: 'Configurar Contadores',
        description: 'Configure contadores e equipamentos da unidade',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Configure todos os contadores disponíveis',
        focusArea: 'Configuração de equipamentos'
      }
    ],
    tips: [
      'Use nomes descritivos para as unidades',
      'Configure todos os contadores disponíveis',
      'Mantenha dados de contato atualizados'
    ],
    commonMistakes: [
      'Não configurar todos os contadores',
      'Usar nomes genéricos para unidades',
      'Esquecer dados de contato'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Cadastro da Unidade' },
      { time: '06:00', title: 'Configuração de Contadores' },
      { time: '11:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'Por que é importante configurar todos os contadores?',
      options: [
        'Para controle completo da unidade',
        'Para economizar espaço',
        'Para facilitar backup',
        'Para reduzir custos'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Unidades Operacionais', url: '#' },
      { type: 'DOCX', name: 'Checklist de Configuração', url: '#' }
    ]
  },
  'cadastro-vendedores': {
    id: 'cadastro-vendedores',
    title: 'Cadastro de Vendedores',
    category: 'Cadastros',
    subcategory: 'Vendedores',
    difficulty: 'Iniciante',
    duration: '11min',
    description: 'Cadastro de vendedores por CNPJ e CPF com comissões.',
    image: 'https://via.placeholder.com/400x250?text=Cadastro+de+Vendedores',
    videoUrl: 'https://example.com/video5.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro de Vendedores',
        description: 'Navegue até o módulo de cadastros e selecione "Vendedores"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Verifique se o vendedor já está cadastrado',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados do Vendedor',
        description: 'Preencha nome, CPF/CNPJ e dados pessoais',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Valide CPF/CNPJ antes de salvar',
        focusArea: 'Validação de dados'
      },
      {
        step: 3,
        title: 'Configurar Comissões',
        description: 'Configure percentuais de comissão por produto/categoria',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Configure comissões competitivas mas sustentáveis',
        focusArea: 'Configuração de comissões'
      }
    ],
    tips: [
      'Configure comissões adequadas para cada produto',
      'Mantenha dados de contato sempre atualizados',
      'Valide CPF/CNPJ antes de cadastrar'
    ],
    commonMistakes: [
      'Cadastrar vendedor com dados inválidos',
      'Não configurar comissões',
      'Esquecer dados de contato'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Dados do Vendedor' },
      { time: '06:00', title: 'Configuração de Comissões' },
      { time: '11:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'O que é importante configurar para vendedores?',
      options: [
        'Percentuais de comissão',
        'Cor da camisa',
        'Horário de trabalho',
        'Tipo de veículo'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Cadastro de Vendedores', url: '#' },
      { type: 'DOCX', name: 'Tabela de Comissões', url: '#' }
    ]
  },
  // PRODUTOS
  'cadastro-produtos': {
    id: 'cadastro-produtos',
    title: 'Cadastro de Produtos',
    category: 'Produtos',
    subcategory: 'Cadastro',
    difficulty: 'Iniciante',
    duration: '11min',
    description: 'Cadastro completo de produtos com código de barras e KITs.',
    image: 'https://via.placeholder.com/400x250?text=Cadastro+de+Produtos',
    videoUrl: 'https://example.com/video6.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro de Produtos',
        description: 'Navegue até o módulo de produtos e selecione "Cadastro de Produtos"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Tenha em mãos todos os dados do produto',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados Básicos',
        description: 'Preencha nome, código, descrição e categoria do produto',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Use códigos únicos para cada produto',
        focusArea: 'Cadastro de dados'
      },
      {
        step: 3,
        title: 'Configurar Código de Barras',
        description: 'Configure código de barras e informações de estoque',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Verifique se o código de barras está correto',
        focusArea: 'Configuração de códigos'
      }
    ],
    tips: [
      'Use códigos únicos para cada produto',
      'Configure códigos de barras corretos',
      'Mantenha informações de estoque atualizadas'
    ],
    commonMistakes: [
      'Usar códigos duplicados',
      'Código de barras incorreto',
      'Não configurar estoque mínimo'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Dados Básicos' },
      { time: '07:00', title: 'Código de Barras' },
      { time: '11:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'Por que é importante usar códigos únicos para produtos?',
      options: [
        'Para evitar duplicação',
        'Para economizar espaço',
        'Para facilitar backup',
        'Para reduzir custos'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Cadastro de Produtos', url: '#' },
      { type: 'DOCX', name: 'Lista de Códigos de Barras', url: '#' }
    ]
  },
  'ajustar-preco-produtos': {
    id: 'ajustar-preco-produtos',
    title: 'Ajustar Preço dos Produtos',
    category: 'Produtos',
    subcategory: 'Preços',
    difficulty: 'Iniciante',
    duration: '9min',
    description: 'Gestão e ajuste de preços de produtos e serviços.',
    image: 'https://via.placeholder.com/400x250?text=Ajustar+Preco+Produtos',
    videoUrl: 'https://example.com/video7.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Ajuste de Preços',
        description: 'Navegue até o módulo de produtos e selecione "Ajustar Preços"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Verifique se você tem permissão para alterar preços',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Selecionar Produtos',
        description: 'Selecione os produtos que terão preços ajustados',
        duration: 180,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Use filtros para facilitar a seleção',
        focusArea: 'Seleção de produtos'
      },
      {
        step: 3,
        title: 'Aplicar Novo Preço',
        description: 'Digite o novo preço e aplique aos produtos selecionados',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Verifique se o preço está correto antes de aplicar',
        focusArea: 'Aplicação de preços'
      }
    ],
    tips: [
      'Sempre verifique preços antes de aplicar',
      'Use filtros para facilitar seleção',
      'Mantenha histórico de alterações'
    ],
    commonMistakes: [
      'Aplicar preços incorretos',
      'Não verificar antes de salvar',
      'Esquecer de atualizar estoque'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Seleção de Produtos' },
      { time: '05:00', title: 'Aplicação de Preços' },
      { time: '09:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'O que é importante verificar antes de aplicar novos preços?',
      options: [
        'Se o preço está correto',
        'Se o produto existe',
        'Se o estoque está cheio',
        'Se o cliente gosta'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Ajuste de Preços', url: '#' },
      { type: 'DOCX', name: 'Tabela de Preços Sugeridos', url: '#' }
    ]
  },
  'cadastro-bombas': {
    id: 'cadastro-bombas',
    title: 'Cadastro de Bombas',
    category: 'Produtos',
    subcategory: 'Equipamentos',
    difficulty: 'Intermediário',
    duration: '11min',
    description: 'Cadastro de bombas, lacres e equipamentos.',
    image: 'https://via.placeholder.com/400x250?text=Cadastro+de+Bombas',
    videoUrl: 'https://example.com/video8.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Cadastro de Bombas',
        description: 'Navegue até o módulo de produtos e selecione "Cadastro de Bombas"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Tenha em mãos os dados técnicos das bombas',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Preencher Dados da Bomba',
        description: 'Preencha número da bomba, tipo de combustível e dados técnicos',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Verifique se o número da bomba está correto',
        focusArea: 'Cadastro técnico'
      },
      {
        step: 3,
        title: 'Configurar Lacres',
        description: 'Configure lacres e informações de segurança',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Configure lacres de acordo com normas de segurança',
        focusArea: 'Configuração de segurança'
      }
    ],
    tips: [
      'Configure lacres de acordo com normas',
      'Mantenha dados técnicos atualizados',
      'Verifique números das bombas'
    ],
    commonMistakes: [
      'Número de bomba incorreto',
      'Não configurar lacres',
      'Dados técnicos desatualizados'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Dados da Bomba' },
      { time: '07:00', title: 'Configuração de Lacres' },
      { time: '11:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'Por que é importante configurar lacres nas bombas?',
      options: [
        'Para segurança e controle',
        'Para economizar combustível',
        'Para facilitar limpeza',
        'Para reduzir ruído'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Cadastro de Bombas', url: '#' },
      { type: 'DOCX', name: 'Normas de Segurança', url: '#' }
    ]
  },
  // COMERCIAL
  'gestao-comercial': {
    id: 'gestao-comercial',
    title: 'Gestão Comercial',
    category: 'Comercial',
    subcategory: 'Gestão',
    difficulty: 'Intermediário',
    duration: '13min',
    description: 'Gestão completa do setor comercial e vendas.',
    image: 'https://via.placeholder.com/400x250?text=Gestao+Comercial',
    videoUrl: 'https://example.com/video9.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Gestão Comercial',
        description: 'Navegue até o módulo comercial e selecione "Gestão Comercial"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Verifique se você tem permissão de acesso',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Configurar Parâmetros',
        description: 'Configure parâmetros comerciais e regras de negócio',
        duration: 360,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Configure parâmetros adequados para seu negócio',
        focusArea: 'Configuração de parâmetros'
      },
      {
        step: 3,
        title: 'Gerenciar Vendas',
        description: 'Gerencie vendas, comissões e metas',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Monitore vendas e comissões regularmente',
        focusArea: 'Gestão de vendas'
      }
    ],
    tips: [
      'Configure parâmetros adequados',
      'Monitore vendas regularmente',
      'Mantenha metas realistas'
    ],
    commonMistakes: [
      'Parâmetros inadequados',
      'Não monitorar vendas',
      'Metas irreais'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Configuração de Parâmetros' },
      { time: '08:00', title: 'Gestão de Vendas' },
      { time: '13:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'O que é importante na gestão comercial?',
      options: [
        'Monitorar vendas e comissões',
        'Ter muitos produtos',
        'Usar cores bonitas',
        'Ter muitos funcionários'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Gestão Comercial', url: '#' },
      { type: 'DOCX', name: 'Parâmetros Sugeridos', url: '#' }
    ]
  },
  'orcamento': {
    id: 'orcamento',
    title: 'Orçamento',
    category: 'Comercial',
    subcategory: 'Orçamentos',
    difficulty: 'Iniciante',
    duration: '11min',
    description: 'Sistema de orçamentos e propostas comerciais.',
    image: 'https://via.placeholder.com/400x250?text=Orcamento',
    videoUrl: 'https://example.com/video10.mp4',
    steps: [
      {
        step: 1,
        title: 'Acessar Orçamentos',
        description: 'Navegue até o módulo comercial e selecione "Orçamentos"',
        duration: 120,
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Tenha em mãos os dados do cliente',
        focusArea: 'Navegação no sistema'
      },
      {
        step: 2,
        title: 'Criar Novo Orçamento',
        description: 'Crie novo orçamento e selecione cliente',
        duration: 240,
        image: 'https://via.placeholder.com/300x200?text=Passo+2',
        tips: 'Selecione cliente correto',
        focusArea: 'Criação de orçamento'
      },
      {
        step: 3,
        title: 'Adicionar Produtos',
        description: 'Adicione produtos e configure quantidades',
        duration: 300,
        image: 'https://via.placeholder.com/300x200?text=Passo+3',
        tips: 'Verifique preços e quantidades',
        focusArea: 'Adição de produtos'
      }
    ],
    tips: [
      'Selecione cliente correto',
      'Verifique preços e quantidades',
      'Mantenha orçamentos organizados'
    ],
    commonMistakes: [
      'Cliente incorreto',
      'Preços desatualizados',
      'Quantidades erradas'
    ],
    timeMarkers: [
      { time: '00:00', title: 'Introdução' },
      { time: '02:00', title: 'Criação de Orçamento' },
      { time: '06:00', title: 'Adição de Produtos' },
      { time: '11:00', title: 'Conclusão' }
    ],
    quiz: {
      question: 'O que é importante ao criar um orçamento?',
      options: [
        'Selecionar cliente correto',
        'Usar cores bonitas',
        'Ter muitos produtos',
        'Ser rápido'
      ],
      correct: 0
    },
    resources: [
      { type: 'PDF', name: 'Manual de Orçamentos', url: '#' },
      { type: 'DOCX', name: 'Modelo de Orçamento', url: '#' }
    ]
  }
}

// Função para buscar tutorial por ID
export const getRetaguardaTutorialById = (tutorialId) => {
  return retaguardaTutorials[tutorialId] || null
}

// Função para buscar todos os tutoriais
export const getAllRetaguardaTutorials = () => {
  return Object.values(retaguardaTutorials)
}

// Função para buscar tutoriais por categoria
export const getRetaguardaTutorialsByCategory = (category) => {
  return Object.values(retaguardaTutorials).filter(tutorial => tutorial.category === category)
}

// Função para buscar categorias
export const getRetaguardaCategories = () => {
  const categories = [...new Set(Object.values(retaguardaTutorials).map(tutorial => tutorial.category))]
  return categories
}
