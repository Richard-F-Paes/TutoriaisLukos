// Estrutura completa dos tutoriais Lukos baseada no site oficial
// https://sites.google.com/view/lukos-tutoriais/home

export const lukosTutorials = {
  // ========================================
  // RETAGUARDA - CADASTROS
  // ========================================
  
  // CADASTRO DE CLIENTES
  'cadastro-clientes-cpf': {
    id: 'cadastro-clientes-cpf',
    title: 'Cadastro de Clientes com CPF',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    duration: '25min',
    description: 'Aprenda a cadastrar clientes pessoa física com CPF no sistema Lukos.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=3',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Inserir CPF',
        description: 'Insira o CPF do cliente no campo "CNPJ/CPF" e aperte a tecla "TAB"',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=3',
        tips: ['Digite apenas números no CPF', 'Use a tecla TAB para avançar'],
        focusArea: 'Campo CPF'
      },
      {
        step: 2,
        title: 'Selecionar Tipo de Pessoa',
        description: 'Selecione "Física" em "Tipo de Pessoa" > preencha os campos "Razão Social/Nome" e "Fantasia" > Salvar',
        duration: 180,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Selecione \'Física\' para pessoa física', 'Preencha nome completo'],
        focusArea: 'Tipo de pessoa'
      },
      {
        step: 3,
        title: 'Cadastrar Endereço',
        description: 'Aba Endereços > Novo > Informe o "CEP" do cliente, e aperte a tecla "TAB" > Salvar',
        duration: 240,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Digite o CEP completo', 'Use TAB para preenchimento automático'],
        focusArea: 'Endereço'
      },
      {
        step: 4,
        title: 'Configurar Unidades Permitidas',
        description: 'Aba "Unidades Permitidas" > Selecione a unidade em que o cliente terá permissão para consumir > Clique na setinha para a direita',
        duration: 180,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Selecione todas as unidades necessárias', 'Use a setinha para mover'],
        focusArea: 'Permissões'
      },
      {
        step: 5,
        title: 'Configurações Adicionais',
        description: 'Para clientes FATURADOS: campo "Endereço Tipo" deve ser FISCAL. Para clientes com frota ou faturamento, configure as abas específicas',
        duration: 120,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Configure faturamento se necessário', 'Configure frota se aplicável'],
        focusArea: 'Configurações finais'
      }
    ],
    tips: [
      'Sempre valide o CPF antes de prosseguir com o cadastro',
      'Para clientes FATURADOS, o campo "Endereço Tipo" deve ser obrigatoriamente FISCAL',
      'Use a tecla TAB para navegação rápida entre os campos',
      'Configure as unidades permitidas corretamente para cada cliente',
      'Para clientes com frota, configure a aba específica de frota',
      'Mantenha os dados sempre atualizados e corretos'
    ],
    commonMistakes: [
      'Cadastrar CPF inválido ou já existente',
      'Não selecionar "Física" em Tipo de Pessoa',
      'Esquecer de configurar o endereço tipo FISCAL para clientes faturados',
      'Não configurar unidades permitidas corretamente',
      'Erros de digitação nos dados pessoais',
      'Não usar a tecla TAB para navegação rápida'
    ],
    resources: [
      { name: 'Site Oficial - Cadastro CPF', type: 'link', url: 'https://sites.google.com/view/lukos-tutoriais/retaguarda/cadastros/cliente/cliente_cpf' },
      { name: 'Manual de Cadastros', type: 'pdf', size: '2.1 MB' },
      { name: 'Validador CPF', type: 'xlsx', size: '150 KB' }
    ]
  },

  'cadastro-clientes': {
    id: 'cadastro-clientes',
    title: 'Cadastro de Clientes',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    duration: '25min',
    description: 'Aprenda a cadastrar clientes pessoa física com CPF no sistema Lukos.',
    image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Inserir CPF',
        description: 'Insira o CPF do cliente no campo "CNPJ/CPF" e aperte a tecla "TAB"',
        duration: 120,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Digite apenas números no CPF', 'Use a tecla TAB para avançar'],
        focusArea: 'Campo CPF'
      },
      {
        step: 2,
        title: 'Selecionar Tipo de Pessoa',
        description: 'Selecione "Física" em "Tipo de Pessoa" > preencha os campos "Razão Social/Nome" e "Fantasia" > Salvar',
        duration: 180,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Selecione "Física" para pessoa física', 'Preencha nome completo'],
        focusArea: 'Tipo de pessoa'
      },
      {
        step: 3,
        title: 'Cadastrar Endereço',
        description: 'Aba Endereços > Novo > Informe o "CEP" do cliente, e aperte a tecla "TAB" > Salvar',
        duration: 240,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Digite o CEP completo', 'Use TAB para preenchimento automático'],
        focusArea: 'Endereço'
      },
      {
        step: 4,
        title: 'Configurar Unidades Permitidas',
        description: 'Aba "Unidades Permitidas" > Selecione a unidade em que o cliente terá permissão para consumir > Clique na setinha para a direita',
        duration: 180,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Selecione todas as unidades necessárias', 'Use a setinha para mover'],
        focusArea: 'Permissões'
      },
      {
        step: 5,
        title: 'Configurações Adicionais',
        description: 'Para clientes FATURADOS: campo "Endereço Tipo" deve ser FISCAL. Para clientes com frota ou faturamento, configure as abas específicas',
        duration: 300,
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYTHIeuYUu_YcbU5NqSZtVjKBJSSQDDGUhXVmD1UzGbrHrIJyi9bGDAylKUf8e0Gdkv3AXRjrGbqT5nLiEpYhNRn7gBx1Ja3SNAhYxas3hrNF8-cTMfWH5z_7zU_iPSWQ0pzhWuQqCEVbwALK-y1OyNQblTTX2fBN731ChpJG4K5T71gCLyYkQfieHYf48q6WaBaE1D2XLzOKZVkDN52Leq4KzJxrQljt1K=w1280',
        tips: ['Configure faturamento se necessário', 'Configure frota se aplicável'],
        focusArea: 'Configurações finais'
      }
    ],
    tips: [
      'Sempre valide o CPF antes de prosseguir com o cadastro',
      'Para clientes FATURADOS, o campo "Endereço Tipo" deve ser obrigatoriamente FISCAL',
      'Use a tecla TAB para navegação rápida entre os campos',
      'Configure as unidades permitidas corretamente para cada cliente',
      'Para clientes com frota, configure a aba específica de frota',
      'Mantenha os dados sempre atualizados e corretos'
    ],
    commonMistakes: [
      'Cadastrar CPF inválido ou já existente',
      'Não selecionar "Física" em Tipo de Pessoa',
      'Esquecer de configurar o endereço tipo FISCAL para clientes faturados',
      'Não configurar unidades permitidas corretamente',
      'Erros de digitação nos dados pessoais',
      'Não usar a tecla TAB para navegação rápida'
    ],
    resources: [
      { name: 'Site Oficial - Cadastro CPF', type: 'link', url: 'https://sites.google.com/view/lukos-tutoriais/retaguarda/cadastros/cliente/cliente_cpf' },
      { name: 'Manual de Cadastros', type: 'pdf', size: '2.1 MB' },
      { name: 'Validador CPF', type: 'xlsx', size: '150 KB' }
    ]
  },

  'cadastro-clientes-cnpj': {
    id: 'cadastro-clientes-cnpj',
    title: 'Cadastro de Clientes com CNPJ',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    duration: '30min',
    description: 'Aprenda a cadastrar clientes pessoa jurídica com CNPJ no sistema Lukos.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=3',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Validação do CNPJ',
        description: 'Como validar e inserir o CNPJ corretamente',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center&v=3',
        tips: ['Consulte a Receita Federal', 'Verifique se está ativo'],
        focusArea: 'Validação'
      },
      {
        step: 2,
        title: 'Dados da Empresa',
        description: 'Preenchimento dos dados empresariais',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=5',
        tips: ['Use dados da Receita Federal', 'Verifique a razão social'],
        focusArea: 'Dados empresariais'
      },
      {
        step: 3,
        title: 'Configurações Financeiras',
        description: 'Configuração de limites e formas de pagamento',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=6',
        tips: ['Defina limites de crédito', 'Configure formas de pagamento'],
        focusArea: 'Financeiro'
      }
    ],
    tips: [
      'Consulte sempre a Receita Federal',
      'Mantenha dados atualizados',
      'Configure corretamente os limites'
    ],
    commonMistakes: [
      'CNPJ inválido ou inativo',
      'Dados desatualizados',
      'Limites mal configurados'
    ],
    resources: [
      { name: 'Manual CNPJ', type: 'pdf', size: '1.8 MB' },
      { name: 'Consulta Receita Federal', type: 'pdf', size: '200 KB' }
    ]
  },

  'cadastro-faturamento': {
    id: 'cadastro-faturamento',
    title: 'Cadastro de Faturamento',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Intermediário',
    duration: '35min',
    description: 'Configure as informações de faturamento do cliente no sistema.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Configuração de Limites',
        description: 'Definir limites de crédito e faturamento',
        duration: 200,
        image: 'https://picsum.photos/400/250?random=7',
        tips: ['Analise o histórico do cliente', 'Defina limites realistas'],
        focusArea: 'Limites'
      },
      {
        step: 2,
        title: 'Formas de Pagamento',
        description: 'Configurar formas de pagamento aceitas',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=8',
        tips: ['Configure todas as formas', 'Teste as configurações'],
        focusArea: 'Pagamentos'
      },
      {
        step: 3,
        title: 'Validação Final',
        description: 'Validar todas as configurações de faturamento',
        duration: 120,
        image: 'https://picsum.photos/400/250?random=9',
        tips: ['Teste o faturamento', 'Verifique os limites'],
        focusArea: 'Validação'
      }
    ],
    tips: [
      'Configure limites realistas',
      'Teste todas as configurações',
      'Monitore o uso dos limites'
    ],
    commonMistakes: [
      'Limites muito altos',
      'Formas de pagamento incorretas',
      'Não testar configurações'
    ],
    resources: [
      { name: 'Manual Faturamento', type: 'pdf', size: '2.5 MB' },
      { name: 'Tabela de Limites', type: 'xlsx', size: '300 KB' }
    ]
  },

  'cadastro-funcionarios': {
    id: 'cadastro-funcionarios',
    title: 'Cadastro de Funcionários',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    duration: '40min',
    description: 'Aprenda a cadastrar funcionários e configurar grupos de comissão.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Dados Pessoais',
        description: 'Cadastro dos dados pessoais do funcionário',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=10',
        tips: ['Use dados da carteira de trabalho', 'Verifique documentos'],
        focusArea: 'Dados pessoais'
      },
      {
        step: 2,
        title: 'Grupo de Comissão',
        description: 'Criar e configurar grupo de comissão',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=11',
        tips: ['Defina percentuais corretos', 'Configure grupos'],
        focusArea: 'Comissões'
      },
      {
        step: 3,
        title: 'IdentFid',
        description: 'Configurar identificação do funcionário',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=12',
        tips: ['Configure identificação única', 'Teste o acesso'],
        focusArea: 'Identificação'
      }
    ],
    tips: [
      'Mantenha dados atualizados',
      'Configure comissões corretamente',
      'Teste identificações'
    ],
    commonMistakes: [
      'Dados desatualizados',
      'Comissões incorretas',
      'Identificação duplicada'
    ],
    resources: [
      { name: 'Manual Funcionários', type: 'pdf', size: '2.0 MB' },
      { name: 'Tabela Comissões', type: 'xlsx', size: '250 KB' }
    ]
  },

  'cadastro-fornecedores': {
    id: 'cadastro-fornecedores',
    title: 'Cadastro de Fornecedores',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    difficulty: 'Iniciante',
    duration: '35min',
    description: 'Cadastre fornecedores por CPF ou CNPJ no sistema.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Tipo de Fornecedor',
        description: 'Escolher entre CPF ou CNPJ',
        duration: 120,
        image: 'https://picsum.photos/400/250?random=13',
        tips: ['Considere o tipo de pessoa', 'Use documento correto'],
        focusArea: 'Tipo'
      },
      {
        step: 2,
        title: 'Dados do Fornecedor',
        description: 'Preenchimento dos dados completos',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=14',
        tips: ['Use dados atualizados', 'Verifique documentos'],
        focusArea: 'Dados'
      },
      {
        step: 3,
        title: 'Configurações',
        description: 'Configurar formas de pagamento e condições',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=15',
        tips: ['Configure condições', 'Defina formas de pagamento'],
        focusArea: 'Configurações'
      }
    ],
    tips: [
      'Mantenha dados atualizados',
      'Configure condições corretas',
      'Verifique documentos'
    ],
    commonMistakes: [
      'Documentos inválidos',
      'Dados desatualizados',
      'Configurações incorretas'
    ],
    resources: [
      { name: 'Manual Fornecedores', type: 'pdf', size: '1.9 MB' },
      { name: 'Checklist Documentos', type: 'pdf', size: '180 KB' }
    ]
  },

  // ========================================
  // RETAGUARDA - PRODUTOS
  // ========================================

  'cadastro-produtos-sem-codigo': {
    id: 'cadastro-produtos-sem-codigo',
    title: 'Cadastro de Produtos sem Código de Barras',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    difficulty: 'Iniciante',
    duration: '30min',
    description: 'Cadastre produtos que não possuem código de barras.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center&v=3',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Código Interno',
        description: 'Criar código interno para o produto',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=16',
        tips: ['Use códigos únicos', 'Siga padrão da empresa'],
        focusArea: 'Código'
      },
      {
        step: 2,
        title: 'Dados do Produto',
        description: 'Preenchimento dos dados básicos',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=17',
        tips: ['Descrição clara', 'Preço correto'],
        focusArea: 'Dados'
      },
      {
        step: 3,
        title: 'Configurações',
        description: 'Configurar departamento e categoria',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=18',
        tips: ['Escolha categoria correta', 'Configure departamento'],
        focusArea: 'Categorização'
      }
    ],
    tips: [
      'Use códigos únicos',
      'Descrições claras',
      'Preços corretos'
    ],
    commonMistakes: [
      'Códigos duplicados',
      'Descrições confusas',
      'Preços incorretos'
    ],
    resources: [
      { name: 'Manual Produtos', type: 'pdf', size: '2.2 MB' },
      { name: 'Tabela Códigos', type: 'xlsx', size: '200 KB' }
    ]
  },

  'cadastro-produtos-com-codigo': {
    id: 'cadastro-produtos-com-codigo',
    title: 'Cadastro de Produtos com Código de Barras',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    difficulty: 'Intermediário',
    duration: '35min',
    description: 'Cadastre produtos com código de barras EAN13.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Validação EAN13',
        description: 'Validar código de barras EAN13',
        duration: 200,
        image: 'https://picsum.photos/400/250?random=19',
        tips: ['Verifique dígito verificador', 'Use código válido'],
        focusArea: 'Validação'
      },
      {
        step: 2,
        title: 'Cadastro do Produto',
        description: 'Preenchimento dos dados com código',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=20',
        tips: ['Código correto', 'Dados completos'],
        focusArea: 'Cadastro'
      },
      {
        step: 3,
        title: 'Teste do Código',
        description: 'Testar leitura do código de barras',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=21',
        tips: ['Teste com leitor', 'Verifique funcionamento'],
        focusArea: 'Teste'
      }
    ],
    tips: [
      'Valide códigos EAN13',
      'Teste com leitor',
      'Mantenha códigos únicos'
    ],
    commonMistakes: [
      'Códigos inválidos',
      'Não testar leitura',
      'Códigos duplicados'
    ],
    resources: [
      { name: 'Manual EAN13', type: 'pdf', size: '1.5 MB' },
      { name: 'Validador Códigos', type: 'xlsx', size: '150 KB' }
    ]
  },

  'cadastro-kit': {
    id: 'cadastro-kit',
    title: 'Cadastro de KIT',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    difficulty: 'Avançado',
    duration: '45min',
    description: 'Crie produtos KIT com múltiplos componentes.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Definir Componentes',
        description: 'Escolher produtos que compõem o KIT',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=22',
        tips: ['Selecione produtos existentes', 'Defina quantidades'],
        focusArea: 'Composição'
      },
      {
        step: 2,
        title: 'Configurar Preço',
        description: 'Definir preço total do KIT',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=23',
        tips: ['Calcule preço correto', 'Considere margem'],
        focusArea: 'Preço'
      },
      {
        step: 3,
        title: 'Testar KIT',
        description: 'Testar funcionamento do KIT',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=24',
        tips: ['Teste venda', 'Verifique componentes'],
        focusArea: 'Teste'
      }
    ],
    tips: [
      'Defina componentes corretos',
      'Calcule preços adequados',
      'Teste antes de ativar'
    ],
    commonMistakes: [
      'Componentes incorretos',
      'Preços mal calculados',
      'Não testar funcionamento'
    ],
    resources: [
      { name: 'Manual KITs', type: 'pdf', size: '2.8 MB' },
      { name: 'Calculadora Preços', type: 'xlsx', size: '400 KB' }
    ]
  },

  // ========================================
  // RETAGUARDA - FINANCEIRO
  // ========================================

  'contas-a-pagar': {
    id: 'contas-a-pagar',
    title: 'Contas a Pagar',
    category: 'Retaguarda',
    subcategory: 'Financeiro',
    difficulty: 'Intermediário',
    duration: '50min',
    description: 'Gerencie todas as contas a pagar da empresa.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Cadastro de Conta',
        description: 'Cadastrar nova conta a pagar',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=25',
        tips: ['Dados completos', 'Vencimento correto'],
        focusArea: 'Cadastro'
      },
      {
        step: 2,
        title: 'Configurar Pagamento',
        description: 'Definir forma e data de pagamento',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=26',
        tips: ['Escolha forma correta', 'Defina data'],
        focusArea: 'Pagamento'
      },
      {
        step: 3,
        title: 'Controle de Vencimentos',
        description: 'Monitorar contas próximas do vencimento',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=27',
        tips: ['Configure alertas', 'Monitore regularmente'],
        focusArea: 'Controle'
      }
    ],
    tips: [
      'Mantenha dados atualizados',
      'Configure alertas de vencimento',
      'Monitore fluxo de caixa'
    ],
    commonMistakes: [
      'Dados desatualizados',
      'Não configurar alertas',
      'Ignorar vencimentos'
    ],
    resources: [
      { name: 'Manual Financeiro', type: 'pdf', size: '3.2 MB' },
      { name: 'Planilha Controle', type: 'xlsx', size: '500 KB' }
    ]
  },

  'contas-a-receber': {
    id: 'contas-a-receber',
    title: 'Contas a Receber',
    category: 'Retaguarda',
    subcategory: 'Financeiro',
    difficulty: 'Intermediário',
    duration: '45min',
    description: 'Controle de recebimentos e cobrança.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Cadastro de Conta',
        description: 'Cadastrar nova conta a receber',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=28',
        tips: ['Dados do cliente', 'Valor correto'],
        focusArea: 'Cadastro'
      },
      {
        step: 2,
        title: 'Configurar Recebimento',
        description: 'Definir forma e prazo de recebimento',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=29',
        tips: ['Configure prazos', 'Defina formas'],
        focusArea: 'Recebimento'
      },
      {
        step: 3,
        title: 'Controle de Inadimplência',
        description: 'Monitorar contas em atraso',
        duration: 200,
        image: 'https://picsum.photos/400/250?random=30',
        tips: ['Configure alertas', 'Monitore inadimplência'],
        focusArea: 'Controle'
      }
    ],
    tips: [
      'Configure prazos adequados',
      'Monitore inadimplência',
      'Configure alertas'
    ],
    commonMistakes: [
      'Prazos inadequados',
      'Não monitorar inadimplência',
      'Não configurar alertas'
    ],
    resources: [
      { name: 'Manual Recebimentos', type: 'pdf', size: '2.8 MB' },
      { name: 'Controle Inadimplência', type: 'xlsx', size: '400 KB' }
    ]
  },

  'faturamento': {
    id: 'faturamento',
    title: 'Faturamento',
    category: 'Retaguarda',
    subcategory: 'Financeiro',
    difficulty: 'Avançado',
    duration: '60min',
    description: 'Processo completo de faturamento no sistema.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Preparação',
        description: 'Preparar dados para faturamento',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=31',
        tips: ['Verifique dados', 'Prepare documentos'],
        focusArea: 'Preparação'
      },
      {
        step: 2,
        title: 'Processamento',
        description: 'Processar faturamento',
        duration: 360,
        image: 'https://picsum.photos/400/250?random=32',
        tips: ['Verifique impostos', 'Processe corretamente'],
        focusArea: 'Processamento'
      },
      {
        step: 3,
        title: 'Finalização',
        description: 'Finalizar e gerar documentos',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=33',
        tips: ['Gere documentos', 'Envie por email'],
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Verifique dados antes',
      'Confirme impostos',
      'Gere todos os documentos'
    ],
    commonMistakes: [
      'Dados incorretos',
      'Impostos errados',
      'Documentos incompletos'
    ],
    resources: [
      { name: 'Manual Faturamento', type: 'pdf', size: '4.0 MB' },
      { name: 'Checklist Faturamento', type: 'pdf', size: '300 KB' }
    ]
  },

  // ========================================
  // PDV - PISTA
  // ========================================

  'afericao-bombas': {
    id: 'afericao-bombas',
    title: 'Aferição de Bombas',
    category: 'PDV',
    subcategory: 'Pista',
    difficulty: 'Iniciante',
    duration: '40min',
    description: 'Como realizar a aferição das bombas de combustível no sistema Lukos.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=4',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso ao Sistema',
        description: 'Acesse o menu PDV > Pista > Aferição de Bombas',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=4',
        tips: ['Use credenciais de administrador', 'Verifique conexão com bombas'],
        focusArea: 'Acesso ao sistema'
      },
      {
        step: 2,
        title: 'Seleção da Bomba',
        description: 'Selecione a bomba a ser aferida e configure os parâmetros',
        duration: 300,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=5',
        tips: ['Selecione bomba correta', 'Configure volume de teste'],
        focusArea: 'Configuração'
      },
      {
        step: 3,
        title: 'Execução da Aferição',
        description: 'Execute o processo de aferição e registre os valores obtidos',
        duration: 600,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=6',
        tips: ['Siga procedimento padrão', 'Registre valores precisos'],
        focusArea: 'Execução'
      },
      {
        step: 4,
        title: 'Validação e Ajuste',
        description: 'Valide os resultados e ajuste se necessário',
        duration: 240,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=7',
        tips: ['Compare com valores padrão', 'Ajuste se fora da tolerância'],
        focusArea: 'Validação'
      },
      {
        step: 5,
        title: 'Finalização',
        description: 'Salve os resultados e documente a aferição',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&v=8',
        tips: ['Salve no sistema', 'Imprima comprovante'],
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
    duration: '25min',
    description: 'Processo completo de venda de combustível no sistema Lukos.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=9',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso ao PDV Pista',
        description: 'Acesse o sistema PDV > Pista e selecione a bomba desejada',
        duration: 60,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=9',
        tips: ['Verifique status da bomba', 'Confirme disponibilidade'],
        focusArea: 'Acesso ao sistema'
      },
      {
        step: 2,
        title: 'Seleção do Combustível',
        description: 'Escolha o tipo de combustível e informe a quantidade desejada',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=10',
        tips: ['Confirme tipo de combustível', 'Verifique preço atual'],
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Identificação do Cliente',
        description: 'Identifique o cliente (se aplicável) e configure forma de pagamento',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=11',
        tips: ['Digite CPF/CNPJ se necessário', 'Selecione forma de pagamento'],
        focusArea: 'Identificação'
      },
      {
        step: 4,
        title: 'Processamento da Venda',
        description: 'Processe a venda e confirme os dados antes de finalizar',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=12',
        tips: ['Revise valores', 'Confirme dados do cliente'],
        focusArea: 'Processamento'
      },
      {
        step: 5,
        title: 'Finalização e Cupom',
        description: 'Finalize a venda e emita o cupom fiscal',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=13',
        tips: ['Emita cupom fiscal', 'Confirme pagamento'],
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
    duration: '35min',
    description: 'Como encerrar o turno corretamente no sistema Lukos.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=14',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Verificação de Vendas',
        description: 'Verifique todas as vendas realizadas no turno e confirme valores',
        duration: 300,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=14',
        tips: ['Confirme todas as vendas', 'Verifique valores totais'],
        focusArea: 'Verificação'
      },
      {
        step: 2,
        title: 'Conciliação Financeira',
        description: 'Concilie valores do caixa com vendas registradas',
        duration: 600,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=15',
        tips: ['Concilie valores do caixa', 'Identifique diferenças'],
        focusArea: 'Conciliação'
      },
      {
        step: 3,
        title: 'Relatórios do Turno',
        description: 'Gere e imprima relatórios de vendas e movimentação',
        duration: 240,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=16',
        tips: ['Imprima relatório de vendas', 'Confirme movimentação'],
        focusArea: 'Relatórios'
      },
      {
        step: 4,
        title: 'Sangrias e Recebimentos',
        description: 'Registre sangrias e recebimentos realizados no turno',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=17',
        tips: ['Registre sangrias', 'Confirme recebimentos'],
        focusArea: 'Movimentação'
      },
      {
        step: 5,
        title: 'Encerramento Final',
        description: 'Finalize o encerramento do turno no sistema',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=18',
        tips: ['Confirme todos os dados', 'Encerre turno'],
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

  // ========================================
  // PDV - LOJA
  // ========================================

  'venda-produtos-loja': {
    id: 'venda-produtos-loja',
    title: 'Venda de Produtos Loja',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    duration: '20min',
    description: 'Como realizar vendas de produtos na loja.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Seleção de Produtos',
        description: 'Escolher produtos para venda',
        duration: 120,
        image: 'https://picsum.photos/400/250?random=43',
        tips: ['Use códigos de barras', 'Verifique preços'],
        focusArea: 'Seleção'
      },
      {
        step: 2,
        title: 'Processamento',
        description: 'Processar venda no sistema',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=44',
        tips: ['Confirme dados', 'Processe corretamente'],
        focusArea: 'Processamento'
      },
      {
        step: 3,
        title: 'Finalização',
        description: 'Finalizar venda e emitir cupom',
        duration: 120,
        image: 'https://picsum.photos/400/250?random=45',
        tips: ['Emita cupom', 'Confirme pagamento'],
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Use códigos de barras',
      'Verifique preços',
      'Emita cupom corretamente'
    ],
    commonMistakes: [
      'Códigos incorretos',
      'Preços errados',
      'Cupom não emitido'
    ],
    resources: [
      { name: 'Manual Loja', type: 'pdf', size: '1.8 MB' },
      { name: 'Códigos Rápidos', type: 'xlsx', size: '120 KB' }
    ]
  },

  'codigo-rapido': {
    id: 'codigo-rapido',
    title: 'Código Rápido',
    category: 'PDV',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    duration: '15min',
    description: 'Usar códigos rápidos para produtos frequentes.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Configuração',
        description: 'Configurar códigos rápidos',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=46',
        tips: ['Configure códigos', 'Teste funcionamento'],
        focusArea: 'Configuração'
      },
      {
        step: 2,
        title: 'Uso',
        description: 'Usar códigos rápidos na venda',
        duration: 120,
        image: 'https://picsum.photos/400/250?random=47',
        tips: ['Digite código', 'Confirme produto'],
        focusArea: 'Uso'
      },
      {
        step: 3,
        title: 'Manutenção',
        description: 'Manter códigos atualizados',
        duration: 90,
        image: 'https://picsum.photos/400/250?random=48',
        tips: ['Atualize códigos', 'Remova obsoletos'],
        focusArea: 'Manutenção'
      }
    ],
    tips: [
      'Configure códigos únicos',
      'Teste funcionamento',
      'Mantenha atualizados'
    ],
    commonMistakes: [
      'Códigos duplicados',
      'Não testar',
      'Códigos desatualizados'
    ],
    resources: [
      { name: 'Manual Códigos', type: 'pdf', size: '1.5 MB' },
      { name: 'Lista Códigos', type: 'xlsx', size: '100 KB' }
    ]
  },

  // ========================================
  // DASHBOARD
  // ========================================

  'dashboard-principal': {
    id: 'dashboard-principal',
    title: 'Dashboard Principal',
    category: 'Dashboard',
    subcategory: 'Relatórios',
    difficulty: 'Intermediário',
    duration: '30min',
    description: 'Navegue pelo dashboard principal do sistema Lukos e configure indicadores.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=19',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso ao Dashboard',
        description: 'Acesse o menu Dashboard > Principal e visualize os indicadores principais',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=19',
        tips: ['Verifique conexão com sistema', 'Confirme permissões de acesso'],
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Visualização de Indicadores',
        description: 'Explore os widgets de vendas, estoque e financeiro disponíveis',
        duration: 300,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=20',
        tips: ['Analise indicadores de vendas', 'Monitore níveis de estoque'],
        focusArea: 'Indicadores'
      },
      {
        step: 3,
        title: 'Configuração Personalizada',
        description: 'Configure widgets personalizados e alertas importantes',
        duration: 360,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=21',
        tips: ['Configure alertas de estoque', 'Defina metas de vendas'],
        focusArea: 'Configuração'
      },
      {
        step: 4,
        title: 'Relatórios Rápidos',
        description: 'Acesse relatórios rápidos e exporte dados importantes',
        duration: 240,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=22',
        tips: ['Gere relatórios de vendas', 'Exporte dados para análise'],
        focusArea: 'Relatórios'
      },
      {
        step: 5,
        title: 'Monitoramento Contínuo',
        description: 'Configure monitoramento automático e notificações',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&v=23',
        tips: ['Configure notificações', 'Monitore indicadores regularmente'],
        focusArea: 'Monitoramento'
      }
    ],
    tips: [
      'Configure widgets personalizados para suas necessidades',
      'Defina alertas importantes para monitoramento',
      'Monitore indicadores regularmente',
      'Use relatórios rápidos para análise',
      'Mantenha dashboard atualizado'
    ],
    commonMistakes: [
      'Não configurar alertas importantes',
      'Ignorar indicadores críticos',
      'Dashboard não personalizado',
      'Não monitorar regularmente',
      'Alertas mal configurados'
    ],
    resources: [
      { name: 'Manual Dashboard', type: 'pdf', size: '2.8 MB' },
      { name: 'Guia Widgets', type: 'pdf', size: '400 KB' }
    ]
  },

  'relatorios-comerciais': {
    id: 'relatorios-comerciais',
    title: 'Relatórios Comerciais',
    category: 'Dashboard',
    subcategory: 'Relatórios',
    difficulty: 'Intermediário',
    duration: '45min',
    description: 'Gere relatórios de vendas e lucratividade no sistema Lukos.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=24',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso aos Relatórios',
        description: 'Acesse o menu Dashboard > Relatórios > Comerciais',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=24',
        tips: ['Verifique permissões de acesso', 'Confirme conexão com dados'],
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Seleção do Relatório',
        description: 'Escolha o tipo de relatório comercial desejado',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=25',
        tips: ['Selecione relatório de vendas', 'Escolha relatório de lucratividade'],
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Configuração de Filtros',
        description: 'Configure filtros de período, produtos e unidades',
        duration: 300,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=26',
        tips: ['Defina período de análise', 'Configure filtros de produtos'],
        focusArea: 'Filtros'
      },
      {
        step: 4,
        title: 'Geração do Relatório',
        description: 'Gere o relatório e analise os dados apresentados',
        duration: 240,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=27',
        tips: ['Analise dados de vendas', 'Verifique indicadores de lucratividade'],
        focusArea: 'Análise'
      },
      {
        step: 5,
        title: 'Exportação e Compartilhamento',
        description: 'Exporte o relatório em diferentes formatos e compartilhe',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=28',
        tips: ['Exporte em PDF/Excel', 'Compartilhe com equipe'],
        focusArea: 'Exportação'
      }
    ],
    tips: [
      'Configure filtros adequados para análise',
      'Escolha período correto para comparação',
      'Exporte em formato adequado para uso',
      'Analise tendências e padrões',
      'Compartilhe relatórios com equipe'
    ],
    commonMistakes: [
      'Filtros inadequados para análise',
      'Período incorreto selecionado',
      'Formato de exportação inadequado',
      'Não analisar dados apresentados',
      'Relatórios não compartilhados'
    ],
    resources: [
      { name: 'Manual Relatórios', type: 'pdf', size: '3.2 MB' },
      { name: 'Modelos Relatórios', type: 'xlsx', size: '600 KB' }
    ]
  },

  // ========================================
  // CONVENIÊNCIA
  // ========================================

  'venda-produtos-loja': {
    id: 'venda-produtos-loja',
    title: 'Venda de Produtos na Loja',
    category: 'Conveniência',
    subcategory: 'Loja',
    difficulty: 'Iniciante',
    duration: '20min',
    description: 'Processo completo de venda de produtos na loja de conveniência.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=29',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso ao PDV Loja',
        description: 'Acesse o sistema PDV > Loja e configure o terminal',
        duration: 60,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=29',
        tips: ['Verifique conexão com sistema', 'Confirme operador'],
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Seleção de Produtos',
        description: 'Selecione os produtos desejados pelo código de barras ou busca',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=30',
        tips: ['Use leitor de código de barras', 'Confirme produtos selecionados'],
        focusArea: 'Seleção'
      },
      {
        step: 3,
        title: 'Identificação do Cliente',
        description: 'Identifique o cliente e configure forma de pagamento',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=31',
        tips: ['Digite CPF/CNPJ se necessário', 'Selecione forma de pagamento'],
        focusArea: 'Identificação'
      },
      {
        step: 4,
        title: 'Processamento da Venda',
        description: 'Processe a venda e confirme os valores antes de finalizar',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=32',
        tips: ['Revise valores totais', 'Confirme dados do cliente'],
        focusArea: 'Processamento'
      },
      {
        step: 5,
        title: 'Finalização e Cupom',
        description: 'Finalize a venda e emita o cupom fiscal',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=33',
        tips: ['Emita cupom fiscal', 'Confirme pagamento'],
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
      { name: 'Manual Loja', type: 'pdf', size: '2.0 MB' },
      { name: 'Códigos de Barras', type: 'xlsx', size: '150 KB' }
    ]
  },

  'gestao-estoque-conveniencia': {
    id: 'gestao-estoque-conveniencia',
    title: 'Gestão de Estoque - Conveniência',
    category: 'Conveniência',
    subcategory: 'Estoque',
    difficulty: 'Intermediário',
    duration: '35min',
    description: 'Como gerenciar o estoque da loja de conveniência.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=34',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso ao Controle de Estoque',
        description: 'Acesse o menu Retaguarda > Estoque > Consulta Estoque',
        duration: 120,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=34',
        tips: ['Verifique permissões de acesso', 'Confirme unidade operacional'],
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Consulta de Produtos',
        description: 'Consulte produtos por categoria, departamento ou código',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=35',
        tips: ['Use filtros para busca', 'Verifique níveis de estoque'],
        focusArea: 'Consulta'
      },
      {
        step: 3,
        title: 'Controle de Validade',
        description: 'Monitore produtos próximos do vencimento',
        duration: 240,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=36',
        tips: ['Configure alertas de validade', 'Monitore produtos críticos'],
        focusArea: 'Validade'
      },
      {
        step: 4,
        title: 'Reposição Automática',
        description: 'Configure reposição automática para produtos essenciais',
        duration: 300,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=37',
        tips: ['Configure pontos de reposição', 'Defina quantidades mínimas'],
        focusArea: 'Reposição'
      },
      {
        step: 5,
        title: 'Relatórios de Estoque',
        description: 'Gere relatórios de movimentação e análise de estoque',
        duration: 180,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=38',
        tips: ['Gere relatório de movimentação', 'Analise produtos mais vendidos'],
        focusArea: 'Relatórios'
      }
    ],
    tips: [
      'Monitore níveis de estoque regularmente',
      'Configure alertas de validade',
      'Use reposição automática para produtos essenciais',
      'Analise relatórios de movimentação',
      'Mantenha estoque mínimo adequado'
    ],
    commonMistakes: [
      'Não monitorar níveis de estoque',
      'Ignorar alertas de validade',
      'Reposição automática mal configurada',
      'Não analisar relatórios',
      'Estoque mínimo inadequado'
    ],
    resources: [
      { name: 'Manual Estoque', type: 'pdf', size: '2.5 MB' },
      { name: 'Planilha Controle', type: 'xlsx', size: '200 KB' }
    ]
  },

  // ========================================
  // FATURA WEB
  // ========================================

  'fatura-web-cadastro': {
    id: 'fatura-web-cadastro',
    title: 'Cadastro no Fatura Web',
    category: 'Fatura Web',
    subcategory: 'Sistema',
    difficulty: 'Iniciante',
    duration: '25min',
    description: 'Como se cadastrar no sistema Fatura Web.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Acesso ao Sistema',
        description: 'Acessar página de cadastro',
        duration: 120,
        image: 'https://picsum.photos/400/250?random=55',
        tips: ['Use navegador atualizado', 'Acesse site oficial'],
        focusArea: 'Acesso'
      },
      {
        step: 2,
        title: 'Preenchimento de Dados',
        description: 'Preencher dados de cadastro',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=56',
        tips: ['Use dados corretos', 'Valide email'],
        focusArea: 'Dados'
      },
      {
        step: 3,
        title: 'Validação',
        description: 'Validar cadastro por email',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=57',
        tips: ['Verifique email', 'Confirme cadastro'],
        focusArea: 'Validação'
      }
    ],
    tips: [
      'Use dados corretos',
      'Valide email',
      'Confirme cadastro'
    ],
    commonMistakes: [
      'Dados incorretos',
      'Email não validado',
      'Cadastro incompleto'
    ],
    resources: [
      { name: 'Manual Fatura Web', type: 'pdf', size: '2.2 MB' },
      { name: 'Guia Cadastro', type: 'pdf', size: '300 KB' }
    ]
  },

  'fatura-web-frota': {
    id: 'fatura-web-frota',
    title: 'Cadastro de Frota WEB',
    category: 'Fatura Web',
    subcategory: 'Frota',
    difficulty: 'Intermediário',
    duration: '40min',
    description: 'Cadastre veículos da frota no sistema web.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Dados do Veículo',
        description: 'Cadastrar dados básicos do veículo',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=58',
        tips: ['Informações completas', 'Documentos válidos'],
        focusArea: 'Dados'
      },
      {
        step: 2,
        title: 'Configurações',
        description: 'Configurar limites e permissões',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=59',
        tips: ['Configure limites', 'Defina permissões'],
        focusArea: 'Configurações'
      },
      {
        step: 3,
        title: 'Validação',
        description: 'Validar cadastro da frota',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=60',
        tips: ['Valide dados', 'Teste funcionamento'],
        focusArea: 'Validação'
      }
    ],
    tips: [
      'Informações completas',
      'Documentos válidos',
      'Configure limites adequados'
    ],
    commonMistakes: [
      'Dados incompletos',
      'Documentos inválidos',
      'Limites inadequados'
    ],
    resources: [
      { name: 'Manual Frota', type: 'pdf', size: '2.5 MB' },
      { name: 'Checklist Frota', type: 'pdf', size: '250 KB' }
    ]
  },

  // ========================================
  // PRÉ-VENDA
  // ========================================

  'pre-venda-caixa': {
    id: 'pre-venda-caixa',
    title: 'Pré-Venda - Caixa',
    category: 'Pré-Venda',
    subcategory: 'Comandas',
    difficulty: 'Iniciante',
    duration: '30min',
    description: 'Sistema de pré-venda através do caixa.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Criação de Comanda',
        description: 'Criar nova comanda de pré-venda',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=61',
        tips: ['Crie comanda', 'Defina cliente'],
        focusArea: 'Criação'
      },
      {
        step: 2,
        title: 'Adição de Produtos',
        description: 'Adicionar produtos à comanda',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=62',
        tips: ['Adicione produtos', 'Verifique quantidades'],
        focusArea: 'Produtos'
      },
      {
        step: 3,
        title: 'Finalização',
        description: 'Finalizar pré-venda',
        duration: 180,
        image: 'https://picsum.photos/400/250?random=63',
        tips: ['Confirme dados', 'Finalize comanda'],
        focusArea: 'Finalização'
      }
    ],
    tips: [
      'Crie comandas corretamente',
      'Verifique produtos',
      'Confirme dados'
    ],
    commonMistakes: [
      'Comanda mal criada',
      'Produtos incorretos',
      'Dados não confirmados'
    ],
    resources: [
      { name: 'Manual Pré-Venda', type: 'pdf', size: '2.0 MB' },
      { name: 'Guia Comandas', type: 'pdf', size: '200 KB' }
    ]
  },

  // ========================================
  // PDV MÓVEL
  // ========================================

  'pdv-movel-pos': {
    id: 'pdv-movel-pos',
    title: 'POS Móvel',
    category: 'PDV Móvel',
    subcategory: 'Sistema',
    difficulty: 'Intermediário',
    duration: '35min',
    description: 'Sistema POS móvel para vendas em campo.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center&v=1',
    videoUrl: '',
    steps: [
      {
        step: 1,
        title: 'Configuração',
        description: 'Configurar aplicativo móvel',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=64',
        tips: ['Configure app', 'Teste conexão'],
        focusArea: 'Configuração'
      },
      {
        step: 2,
        title: 'Sincronização',
        description: 'Sincronizar dados com sistema principal',
        duration: 240,
        image: 'https://picsum.photos/400/250?random=65',
        tips: ['Sincronize dados', 'Verifique produtos'],
        focusArea: 'Sincronização'
      },
      {
        step: 3,
        title: 'Operação',
        description: 'Realizar vendas móveis',
        duration: 300,
        image: 'https://picsum.photos/400/250?random=66',
        tips: ['Realize vendas', 'Confirme pagamentos'],
        focusArea: 'Operação'
      }
    ],
    tips: [
      'Configure corretamente',
      'Sincronize dados',
      'Confirme vendas'
    ],
    commonMistakes: [
      'Configuração incorreta',
      'Dados não sincronizados',
      'Vendas não confirmadas'
    ],
    resources: [
      { name: 'Manual PDV Móvel', type: 'pdf', size: '2.8 MB' },
      { name: 'Guia Sincronização', type: 'pdf', size: '350 KB' }
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

// Função para obter tutoriais por subcategoria
export const getTutorialsBySubcategory = (category, subcategory) => {
  return Object.values(lukosTutorials).filter(tutorial => 
    tutorial.category === category && tutorial.subcategory === subcategory
  )
}

// Função para buscar tutoriais por título
export const searchTutorials = (query) => {
  const searchTerm = query.toLowerCase()
  return Object.values(lukosTutorials).filter(tutorial => 
    tutorial.title.toLowerCase().includes(searchTerm) ||
    tutorial.description.toLowerCase().includes(searchTerm) ||
    tutorial.category.toLowerCase().includes(searchTerm) ||
    tutorial.subcategory.toLowerCase().includes(searchTerm)
  )
}