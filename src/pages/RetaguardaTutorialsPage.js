import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Clock,
  Star,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Building,
  MapPin,
  UserCheck,
  UserPlus,
  Search,
  Globe,
  CheckCircle,
  Tag,
  Settings,
  Phone,
  Shield,
  Wrench,
  Truck,
  Fuel,
  Package,
  DollarSign,
  Calendar,
  Clock as ClockIcon,
  CreditCard,
  Building2,
  Download,
  Grid,
  Receipt,
  BarChart3,
  Calculator,
  FileSpreadsheet,
  Target,
  FileText,
  Plus,
  Upload,
  ArrowLeft,
  Zap,
  Sun,
  Moon
} from 'lucide-react'

const RetaguardaTutorialsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const tutorials = [
    // CADASTROS
    {
      id: 'cadastro-clientes',
      title: 'Cadastro de Clientes',
      category: 'Cadastros',
      subcategory: 'Clientes',
      difficulty: 'Iniciante',
      icon: Users,
      color: 'from-blue-500 to-blue-700',
      videoUrl: 'https://example.com/video1.mp4',
      description: 'Cadastro completo de clientes com CPF, CNPJ e informações de faturamento.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Cadastro de Clientes',
          description: 'Navegue até o módulo de cadastros e selecione "Cadastro de Clientes"',
          duration: '2 min',
          image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYO0TDe7SW5pg5Sjw0tD4YEaDeDfNwDL2mCjoC2-rX7i4Aan9Cgi8btWQ7Eo7zywexPmLJ039n_-arxSZBYN9ZBOQO94cdg4EJzcQ7ynQqfXXZMT7KweOgwjICFuTPXVbLf54e8h-XoxjkDqbfB47a29nOotaZjrX16dw8JB31S4LQ2mwKWDZ24dn2SojrZaqFgrTdi8p4aMYbIVJtG4mJ2X8AVidtWerQC=w1280',
          tips: 'Certifique-se de ter todas as informações do cliente em mãos',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados Básicos',
          description: 'Preencha nome, CPF/CNPJ e dados de contato do cliente',
          duration: '5 min',
          image: 'https://lh3.googleusercontent.com/sitesv/AICyYdalLaszvXk_AOahMlf1e_F0twroYDXf90PRmBGu_c-DDHKiW0IKmgUT_oRFdmPHsatojrqer290fLYmI-1ISbELoMuFPNE3-g5HLF9SqtktgaxmnckXqxHUcWS7NEIb2iE9OK1GcZZgA0W3GnWTMsL55mvuzSMmwXsKyfRFkw4IpvAFRxswK6hjIhzHiZncJknZrmXFzsV7xSmaoRPUxrNdvqUJl_N1l5mydoo=w1280',
          tips: 'Verifique se o CPF/CNPJ está correto antes de salvar',
          focusArea: 'Validação de dados'
        },
        {
          step: 3,
          title: 'Configurar Informações de Faturamento',
          description: 'Configure dados de faturamento e limites de crédito',
          duration: '3 min',
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
    {
      id: 'cadastro-funcionarios',
      title: 'Cadastro de Funcionários',
      category: 'Cadastros',
      subcategory: 'Funcionários',
      difficulty: 'Iniciante',
      icon: UserCheck,
      color: 'from-green-500 to-green-700',
      videoUrl: 'https://example.com/video2.mp4',
      description: 'Gestão de funcionários, grupos de comissão e fornecedores.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Cadastro de Funcionários',
          description: 'Navegue até o módulo de cadastros e selecione "Funcionários"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos todos os documentos do funcionário',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados Pessoais',
          description: 'Preencha nome, CPF, RG e dados pessoais do funcionário',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Verifique se todos os documentos estão válidos',
          focusArea: 'Validação de documentos'
        },
        {
          step: 3,
          title: 'Configurar IdentFid',
          description: 'Configure o IdentFid e grupos de comissão',
          duration: '3 min',
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
    {
      id: 'cadastro-fornecedores',
      title: 'Cadastro de Fornecedores',
      category: 'Cadastros',
      subcategory: 'Fornecedores',
      difficulty: 'Iniciante',
      icon: Building,
      color: 'from-purple-500 to-purple-700',
      videoUrl: 'https://example.com/video3.mp4',
      description: 'Cadastro de fornecedores por CNPJ e CPF com informações completas.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Cadastro de Fornecedores',
          description: 'Navegue até o módulo de cadastros e selecione "Fornecedores"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se o fornecedor já está cadastrado',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados da Empresa',
          description: 'Preencha razão social, CNPJ e dados da empresa',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Consulte a Receita Federal para validar CNPJ',
          focusArea: 'Validação de CNPJ'
        },
        {
          step: 3,
          title: 'Configurar Informações Comerciais',
          description: 'Configure condições de pagamento e dados bancários',
          duration: '4 min',
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
    {
      id: 'unidades-operacionais',
      title: 'Unidades Operacionais',
      category: 'Cadastros',
      subcategory: 'Unidades',
      difficulty: 'Intermediário',
      icon: MapPin,
      color: 'from-orange-500 to-orange-700',
      videoUrl: 'https://example.com/video4.mp4',
      description: 'Gestão de unidades operacionais, contadores e abastecimentos.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Unidades Operacionais',
          description: 'Navegue até o módulo de cadastros e selecione "Unidades Operacionais"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos os dados da unidade',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Cadastrar Nova Unidade',
          description: 'Preencha nome, endereço e dados da unidade operacional',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use nomes descritivos para facilitar identificação',
          focusArea: 'Cadastro de dados'
        },
        {
          step: 3,
          title: 'Configurar Contadores',
          description: 'Configure contadores e equipamentos da unidade',
          duration: '5 min',
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
    {
      id: 'cadastro-vendedores',
      title: 'Cadastro de Vendedores',
      category: 'Cadastros',
      subcategory: 'Vendedores',
      difficulty: 'Iniciante',
      icon: UserPlus,
      color: 'from-cyan-500 to-cyan-700',
      videoUrl: 'https://example.com/video5.mp4',
      description: 'Cadastro de vendedores por CNPJ e CPF com comissões.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Cadastro de Vendedores',
          description: 'Navegue até o módulo de cadastros e selecione "Vendedores"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se o vendedor já está cadastrado',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados do Vendedor',
          description: 'Preencha nome, CPF/CNPJ e dados pessoais',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Valide CPF/CNPJ antes de salvar',
          focusArea: 'Validação de dados'
        },
        {
          step: 3,
          title: 'Configurar Comissões',
          description: 'Configure percentuais de comissão por produto/categoria',
          duration: '5 min',
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
    {
      id: 'cadastro-produtos',
      title: 'Cadastro de Produtos',
      category: 'Produtos',
      subcategory: 'Cadastro',
      difficulty: 'Iniciante',
      icon: Package,
      color: 'from-indigo-500 to-indigo-700',
      videoUrl: 'https://example.com/video6.mp4',
      description: 'Cadastro completo de produtos com código de barras e KITs.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Cadastro de Produtos',
          description: 'Navegue até o módulo de produtos e selecione "Cadastro de Produtos"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos todos os dados do produto',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados Básicos',
          description: 'Preencha nome, código, descrição e categoria do produto',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use códigos únicos para cada produto',
          focusArea: 'Cadastro de dados'
        },
        {
          step: 3,
          title: 'Configurar Código de Barras',
          description: 'Configure código de barras e informações de estoque',
          duration: '4 min',
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
    {
      id: 'ajustar-preco-produtos',
      title: 'Ajustar Preço dos Produtos',
      category: 'Produtos',
      subcategory: 'Preços',
      difficulty: 'Iniciante',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-700',
      videoUrl: 'https://example.com/video7.mp4',
      description: 'Gestão e ajuste de preços de produtos e serviços.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Ajuste de Preços',
          description: 'Navegue até o módulo de produtos e selecione "Ajustar Preços"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão para alterar preços',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Selecionar Produtos',
          description: 'Selecione os produtos que terão preços ajustados',
          duration: '3 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use filtros para facilitar a seleção',
          focusArea: 'Seleção de produtos'
        },
        {
          step: 3,
          title: 'Aplicar Novo Preço',
          description: 'Digite o novo preço e aplique aos produtos selecionados',
          duration: '4 min',
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
    {
      id: 'cadastro-bombas',
      title: 'Cadastro de Bombas',
      category: 'Produtos',
      subcategory: 'Equipamentos',
      difficulty: 'Intermediário',
      icon: Fuel,
      color: 'from-red-500 to-red-700',
      videoUrl: 'https://example.com/video8.mp4',
      description: 'Cadastro de bombas, lacres e equipamentos.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Cadastro de Bombas',
          description: 'Navegue até o módulo de produtos e selecione "Cadastro de Bombas"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos os dados técnicos das bombas',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados da Bomba',
          description: 'Preencha número da bomba, tipo de combustível e dados técnicos',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Verifique se o número da bomba está correto',
          focusArea: 'Cadastro técnico'
        },
        {
          step: 3,
          title: 'Configurar Lacres',
          description: 'Configure lacres e informações de segurança',
          duration: '4 min',
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
    {
      id: 'gestao-comercial',
      title: 'Gestão Comercial',
      category: 'Comercial',
      subcategory: 'Gestão',
      difficulty: 'Intermediário',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-700',
      videoUrl: 'https://example.com/video9.mp4',
      description: 'Gestão completa do setor comercial e vendas.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Gestão Comercial',
          description: 'Navegue até o módulo comercial e selecione "Gestão Comercial"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Configurar Parâmetros',
          description: 'Configure parâmetros comerciais e regras de negócio',
          duration: '6 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Configure parâmetros adequados para seu negócio',
          focusArea: 'Configuração de parâmetros'
        },
        {
          step: 3,
          title: 'Gerenciar Vendas',
          description: 'Gerencie vendas, comissões e metas',
          duration: '5 min',
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
    {
      id: 'orcamento',
      title: 'Orçamento',
      category: 'Comercial',
      subcategory: 'Orçamentos',
      difficulty: 'Iniciante',
      icon: Calculator,
      color: 'from-orange-500 to-orange-700',
      videoUrl: 'https://example.com/video10.mp4',
      description: 'Sistema de orçamentos e propostas comerciais.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Orçamentos',
          description: 'Navegue até o módulo comercial e selecione "Orçamentos"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos os dados do cliente',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Criar Novo Orçamento',
          description: 'Crie novo orçamento e selecione cliente',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Selecione cliente correto',
          focusArea: 'Criação de orçamento'
        },
        {
          step: 3,
          title: 'Adicionar Produtos',
          description: 'Adicione produtos e configure quantidades',
          duration: '5 min',
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
    },
    // COMPRAS
    {
      id: 'entrada-nota-fiscal',
      title: 'Entrada de Nota Fiscal',
      category: 'Compras',
      subcategory: 'Entrada',
      difficulty: 'Intermediário',
      icon: FileText,
      color: 'from-teal-500 to-teal-700',
      videoUrl: 'https://example.com/video11.mp4',
      description: 'Entrada e processamento de notas fiscais de compra.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Entrada de NF',
          description: 'Navegue até o módulo de compras e selecione "Entrada de Nota Fiscal"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos a nota fiscal',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados da NF',
          description: 'Preencha número, série, fornecedor e data da nota fiscal',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Verifique se os dados estão corretos',
          focusArea: 'Preenchimento de dados'
        },
        {
          step: 3,
          title: 'Adicionar Produtos',
          description: 'Adicione produtos da nota fiscal e configure quantidades',
          duration: '6 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Verifique se todos os produtos estão corretos',
          focusArea: 'Adição de produtos'
        }
      ],
      tips: [
        'Verifique dados da nota fiscal',
        'Confirme todos os produtos',
        'Mantenha notas organizadas'
      ],
      commonMistakes: [
        'Dados incorretos da NF',
        'Produtos não conferidos',
        'Quantidades erradas'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Dados da NF' },
        { time: '07:00', title: 'Adição de Produtos' },
        { time: '13:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante ao processar uma nota fiscal?',
        options: [
          'Verificar todos os dados',
          'Ser rápido',
          'Usar cores bonitas',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Entrada de NF', url: '#' },
        { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
      ]
    },
    {
      id: 'entrada-simples',
      title: 'Entrada Simples',
      category: 'Compras',
      subcategory: 'Entrada',
      difficulty: 'Iniciante',
      icon: Plus,
      color: 'from-green-500 to-green-700',
      videoUrl: 'https://example.com/video12.mp4',
      description: 'Sistema de entrada simples de produtos e mercadorias.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Entrada Simples',
          description: 'Navegue até o módulo de compras e selecione "Entrada Simples"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Tenha em mãos os produtos a serem cadastrados',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Selecionar Produtos',
          description: 'Selecione produtos e configure quantidades',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use busca para facilitar seleção',
          focusArea: 'Seleção de produtos'
        },
        {
          step: 3,
          title: 'Confirmar Entrada',
          description: 'Confirme entrada e atualize estoque',
          duration: '3 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Verifique quantidades antes de confirmar',
          focusArea: 'Confirmação de entrada'
        }
      ],
      tips: [
        'Use busca para facilitar seleção',
        'Verifique quantidades',
        'Confirme antes de salvar'
      ],
      commonMistakes: [
        'Quantidades incorretas',
        'Produtos errados',
        'Não confirmar entrada'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Seleção de Produtos' },
        { time: '06:00', title: 'Confirmação' },
        { time: '09:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante na entrada simples?',
        options: [
          'Verificar quantidades',
          'Ser rápido',
          'Usar cores bonitas',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Entrada Simples', url: '#' },
        { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
      ]
    },
    // FINANCEIRO
    {
      id: 'contas-a-pagar',
      title: 'Contas a Pagar',
      category: 'Financeiro',
      subcategory: 'Contas',
      difficulty: 'Intermediário',
      icon: CreditCard,
      color: 'from-pink-500 to-pink-700',
      videoUrl: 'https://example.com/video13.mp4',
      description: 'Gestão de contas a pagar e fluxo de caixa.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Contas a Pagar',
          description: 'Navegue até o módulo financeiro e selecione "Contas a Pagar"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Cadastrar Nova Conta',
          description: 'Cadastre nova conta a pagar com fornecedor e valor',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Verifique dados do fornecedor',
          focusArea: 'Cadastro de conta'
        },
        {
          step: 3,
          title: 'Configurar Pagamento',
          description: 'Configure data de vencimento e forma de pagamento',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Configure datas adequadas',
          focusArea: 'Configuração de pagamento'
        }
      ],
      tips: [
        'Verifique dados do fornecedor',
        'Configure datas adequadas',
        'Mantenha contas organizadas'
      ],
      commonMistakes: [
        'Dados incorretos do fornecedor',
        'Datas de vencimento erradas',
        'Valores incorretos'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Cadastro de Conta' },
        { time: '07:00', title: 'Configuração de Pagamento' },
        { time: '11:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante ao cadastrar uma conta a pagar?',
        options: [
          'Verificar dados do fornecedor',
          'Usar cores bonitas',
          'Ser rápido',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Contas a Pagar', url: '#' },
        { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
      ]
    },
    {
      id: 'contas-a-receber',
      title: 'Contas a Receber',
      category: 'Financeiro',
      subcategory: 'Contas',
      difficulty: 'Intermediário',
      icon: DollarSign,
      color: 'from-lime-500 to-lime-700',
      videoUrl: 'https://example.com/video14.mp4',
      description: 'Gestão de contas a receber e controle de recebimentos.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Contas a Receber',
          description: 'Navegue até o módulo financeiro e selecione "Contas a Receber"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Cadastrar Nova Conta',
          description: 'Cadastre nova conta a receber com cliente e valor',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Verifique dados do cliente',
          focusArea: 'Cadastro de conta'
        },
        {
          step: 3,
          title: 'Configurar Recebimento',
          description: 'Configure data de vencimento e forma de recebimento',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Configure datas adequadas',
          focusArea: 'Configuração de recebimento'
        }
      ],
      tips: [
        'Verifique dados do cliente',
        'Configure datas adequadas',
        'Mantenha contas organizadas'
      ],
      commonMistakes: [
        'Dados incorretos do cliente',
        'Datas de vencimento erradas',
        'Valores incorretos'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Cadastro de Conta' },
        { time: '07:00', title: 'Configuração de Recebimento' },
        { time: '11:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante ao cadastrar uma conta a receber?',
        options: [
          'Verificar dados do cliente',
          'Usar cores bonitas',
          'Ser rápido',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Contas a Receber', url: '#' },
        { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
      ]
    },
    // ESTOQUE
    {
      id: 'controle-estoque',
      title: 'Controle de Estoque',
      category: 'Estoque',
      subcategory: 'Controle',
      difficulty: 'Intermediário',
      icon: Package,
      color: 'from-amber-500 to-amber-700',
      videoUrl: 'https://example.com/video15.mp4',
      description: 'Controle completo de estoque e movimentações.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Controle de Estoque',
          description: 'Navegue até o módulo de estoque e selecione "Controle de Estoque"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Consultar Estoque',
          description: 'Consulte estoque atual e movimentações',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use filtros para facilitar consulta',
          focusArea: 'Consulta de estoque'
        },
        {
          step: 3,
          title: 'Ajustar Estoque',
          description: 'Faça ajustes de estoque quando necessário',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Documente motivos dos ajustes',
          focusArea: 'Ajuste de estoque'
        }
      ],
      tips: [
        'Use filtros para facilitar consulta',
        'Documente motivos dos ajustes',
        'Mantenha estoque atualizado'
      ],
      commonMistakes: [
        'Não documentar ajustes',
        'Estoque desatualizado',
        'Movimentações incorretas'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Consulta de Estoque' },
        { time: '06:00', title: 'Ajuste de Estoque' },
        { time: '11:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'Por que é importante documentar ajustes de estoque?',
        options: [
          'Para controle e auditoria',
          'Para economizar espaço',
          'Para facilitar backup',
          'Para reduzir custos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Controle de Estoque', url: '#' },
        { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
      ]
    },
    // FISCAL
    {
      id: 'emissao-nfe',
      title: 'Emissão de NFe',
      category: 'Fiscal',
      subcategory: 'Emissão',
      difficulty: 'Avançado',
      icon: FileText,
      color: 'from-violet-500 to-violet-700',
      videoUrl: 'https://example.com/video16.mp4',
      description: 'Emissão de notas fiscais eletrônicas.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Emissão de NFe',
          description: 'Navegue até o módulo fiscal e selecione "Emissão de NFe"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Preencher Dados da NFe',
          description: 'Preencha dados do cliente e produtos',
          duration: '6 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Verifique todos os dados antes de emitir',
          focusArea: 'Preenchimento de dados'
        },
        {
          step: 3,
          title: 'Emitir NFe',
          description: 'Emita a NFe e envie para a SEFAZ',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Aguarde confirmação da SEFAZ',
          focusArea: 'Emissão da NFe'
        }
      ],
      tips: [
        'Verifique todos os dados antes de emitir',
        'Aguarde confirmação da SEFAZ',
        'Mantenha NFe organizadas'
      ],
      commonMistakes: [
        'Dados incorretos na NFe',
        'Não aguardar confirmação',
        'NFe duplicadas'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Preenchimento de Dados' },
        { time: '08:00', title: 'Emissão da NFe' },
        { time: '13:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante ao emitir uma NFe?',
        options: [
          'Verificar todos os dados',
          'Ser rápido',
          'Usar cores bonitas',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Emissão de NFe', url: '#' },
        { type: 'DOCX', name: 'Checklist de Validação', url: '#' }
      ]
    },
    // FERRAMENTAS
    {
      id: 'backup-sistema',
      title: 'Backup do Sistema',
      category: 'Ferramentas',
      subcategory: 'Backup',
      difficulty: 'Avançado',
      icon: Shield,
      color: 'from-gray-500 to-gray-700',
      videoUrl: 'https://example.com/video17.mp4',
      description: 'Realização de backup e restauração do sistema.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Backup',
          description: 'Navegue até o módulo de ferramentas e selecione "Backup"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Configurar Backup',
          description: 'Configure tipo de backup e destino',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Escolha destino adequado para backup',
          focusArea: 'Configuração de backup'
        },
        {
          step: 3,
          title: 'Executar Backup',
          description: 'Execute backup e aguarde conclusão',
          duration: '8 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Aguarde conclusão antes de fechar',
          focusArea: 'Execução de backup'
        }
      ],
      tips: [
        'Escolha destino adequado para backup',
        'Aguarde conclusão antes de fechar',
        'Faça backup regularmente'
      ],
      commonMistakes: [
        'Não aguardar conclusão',
        'Destino inadequado',
        'Backup incompleto'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Configuração de Backup' },
        { time: '07:00', title: 'Execução de Backup' },
        { time: '15:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'Por que é importante fazer backup regularmente?',
        options: [
          'Para proteger dados',
          'Para economizar espaço',
          'Para facilitar limpeza',
          'Para reduzir ruído'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Backup', url: '#' },
        { type: 'DOCX', name: 'Checklist de Backup', url: '#' }
      ]
    },
    // RELATÓRIOS
    {
      id: 'relatorios-vendas',
      title: 'Relatórios de Vendas',
      category: 'Relatórios',
      subcategory: 'Vendas',
      difficulty: 'Intermediário',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-700',
      videoUrl: 'https://example.com/video18.mp4',
      description: 'Geração de relatórios de vendas e performance.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Relatórios',
          description: 'Navegue até o módulo de relatórios e selecione "Vendas"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Configurar Filtros',
          description: 'Configure período, vendedor e outros filtros',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use filtros adequados para sua análise',
          focusArea: 'Configuração de filtros'
        },
        {
          step: 3,
          title: 'Gerar Relatório',
          description: 'Gere relatório e analise resultados',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Analise resultados cuidadosamente',
          focusArea: 'Geração de relatório'
        }
      ],
      tips: [
        'Use filtros adequados para sua análise',
        'Analise resultados cuidadosamente',
        'Mantenha relatórios organizados'
      ],
      commonMistakes: [
        'Filtros inadequados',
        'Não analisar resultados',
        'Período incorreto'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Configuração de Filtros' },
        { time: '06:00', title: 'Geração de Relatório' },
        { time: '11:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante ao gerar relatórios de vendas?',
        options: [
          'Usar filtros adequados',
          'Ser rápido',
          'Usar cores bonitas',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Relatórios de Vendas', url: '#' },
        { type: 'DOCX', name: 'Modelos de Relatórios', url: '#' }
      ]
    },
    // FIDELIDADE
    {
      id: 'programa-fidelidade',
      title: 'Programa de Fidelidade',
      category: 'Fidelidade',
      subcategory: 'Programa',
      difficulty: 'Intermediário',
      icon: Star,
      color: 'from-yellow-500 to-yellow-700',
      videoUrl: 'https://example.com/video19.mp4',
      description: 'Gestão do programa de fidelidade e pontos.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Programa de Fidelidade',
          description: 'Navegue até o módulo de fidelidade e selecione "Programa"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Configurar Regras',
          description: 'Configure regras de pontuação e resgate',
          duration: '6 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Configure regras adequadas para seu negócio',
          focusArea: 'Configuração de regras'
        },
        {
          step: 3,
          title: 'Gerenciar Clientes',
          description: 'Gerencie clientes e pontos acumulados',
          duration: '5 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Monitore pontos e resgates',
          focusArea: 'Gestão de clientes'
        }
      ],
      tips: [
        'Configure regras adequadas para seu negócio',
        'Monitore pontos e resgates',
        'Mantenha programa atrativo'
      ],
      commonMistakes: [
        'Regras inadequadas',
        'Não monitorar pontos',
        'Programa desatualizado'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Configuração de Regras' },
        { time: '08:00', title: 'Gestão de Clientes' },
        { time: '13:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante no programa de fidelidade?',
        options: [
          'Configurar regras adequadas',
          'Usar cores bonitas',
          'Ser rápido',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Programa de Fidelidade', url: '#' },
        { type: 'DOCX', name: 'Regras Sugeridas', url: '#' }
      ]
    },
    // INTEGRAÇÕES
    {
      id: 'integracao-whatsapp',
      title: 'Integração WhatsApp',
      category: 'Integrações',
      subcategory: 'WhatsApp',
      difficulty: 'Intermediário',
      icon: Phone,
      color: 'from-green-500 to-green-700',
      videoUrl: 'https://example.com/video20.mp4',
      description: 'Integração com WhatsApp para comunicação.',
      instructions: [
        {
          step: 1,
          title: 'Acessar Integração WhatsApp',
          description: 'Navegue até o módulo de integrações e selecione "WhatsApp"',
          duration: '2 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+1',
          tips: 'Verifique se você tem permissão de acesso',
          focusArea: 'Navegação no sistema'
        },
        {
          step: 2,
          title: 'Configurar API',
          description: 'Configure API do WhatsApp e credenciais',
          duration: '6 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+2',
          tips: 'Use credenciais corretas da API',
          focusArea: 'Configuração de API'
        },
        {
          step: 3,
          title: 'Testar Integração',
          description: 'Teste envio de mensagens e funcionalidades',
          duration: '4 min',
          image: 'https://via.placeholder.com/300x200?text=Passo+3',
          tips: 'Teste todas as funcionalidades',
          focusArea: 'Teste de integração'
        }
      ],
      tips: [
        'Use credenciais corretas da API',
        'Teste todas as funcionalidades',
        'Mantenha integração atualizada'
      ],
      commonMistakes: [
        'Credenciais incorretas',
        'Não testar funcionalidades',
        'Integração desatualizada'
      ],
      timeMarkers: [
        { time: '00:00', title: 'Introdução' },
        { time: '02:00', title: 'Configuração de API' },
        { time: '08:00', title: 'Teste de Integração' },
        { time: '12:00', title: 'Conclusão' }
      ],
      quiz: {
        question: 'O que é importante na integração com WhatsApp?',
        options: [
          'Usar credenciais corretas',
          'Ser rápido',
          'Usar cores bonitas',
          'Ter muitos produtos'
        ],
        correct: 0
      },
      resources: [
        { type: 'PDF', name: 'Manual de Integração WhatsApp', url: '#' },
        { type: 'DOCX', name: 'Checklist de Configuração', url: '#' }
      ]
    }
  ]

  const categories = [
    'Cadastros',
    'Produtos',
    'Comercial',
    'Compras',
    'Financeiro',
    'Estoque',
    'Fiscal',
    'Ferramentas',
    'Relatórios',
    'Fidelidade',
    'Integrações'
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800'
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800'
      case 'Avançado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filtrar tutoriais por categoria selecionada
  const filteredTutorials = selectedCategory 
    ? tutorials.filter(tutorial => tutorial.category === selectedCategory)
    : tutorials

  // Função para lidar com clique na categoria
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    // Scroll para a seção de tutoriais
    setTimeout(() => {
      document.getElementById('tutorials-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com botão de tema */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/tutoriais"
            className={`inline-flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-200`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Tutoriais
          </Link>
          
          {/* Botão de alternância de tema */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-200`}
            title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <h1 className={`text-5xl font-extrabold mb-6 text-center ${isDarkMode ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'}`}>
          Retaguarda - Tutoriais Completos
        </h1>
        <p className={`text-xl text-center mb-12 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore todos os tutoriais da Retaguarda do Sistema Lukos organizados por módulo.
        </p>

        {/* Seção de Categorias */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            <BookOpen className="w-8 h-8 text-blue-500" />
            Módulos da Retaguarda
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <button
                onClick={() => handleCategoryClick(cat)}
                key={cat}
                className={`block p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border group w-full text-left ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} ${selectedCategory === cat ? (isDarkMode ? 'ring-2 ring-blue-400 bg-blue-900' : 'ring-2 ring-blue-500 bg-blue-50') : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
                    {cat}
                  </h3>
                  <ArrowRight className={`w-6 h-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-500'}`} />
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tutorials.filter(t => t.category === cat).length} tutoriais disponíveis
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Seção de Tutoriais em Destaque */}
        <section id="tutorials-section" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              <TrendingUp className="w-8 h-8 text-purple-500" />
              {selectedCategory ? `Tutoriais de ${selectedCategory}` : 'Todos os Tutoriais da Retaguarda'}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Ver Todos
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial) => {
              const Icon = tutorial.icon
              return (
                <Link
                  to={`/tutorial/${tutorial.id}`}
                  key={tutorial.id}
                  className={`block rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border overflow-hidden group ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <div className={`relative h-48 w-full bg-gradient-to-br ${tutorial.color} flex items-center justify-center`}>
                    <Icon className="w-20 h-20 text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(tutorial.difficulty)}`}>
                      {tutorial.difficulty}
                    </span>
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-gray-900 bg-opacity-70 text-white text-xs font-semibold flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {tutorial.instructions.reduce((total, inst) => total + parseInt(inst.duration), 0)} min
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
                      {tutorial.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tutorial.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {tutorial.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {tutorial.instructions.length} passos
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Seção de Estatísticas */}
        <section className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {selectedCategory ? `Estatísticas de ${selectedCategory}` : 'Estatísticas dos Tutoriais'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl font-bold text-blue-500 mb-2">{filteredTutorials.length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedCategory ? 'Tutoriais na Categoria' : 'Total de Tutoriais'}
              </div>
            </div>
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl font-bold text-green-500 mb-2">{categories.length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Módulos Disponíveis</div>
            </div>
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {filteredTutorials.reduce((total, tutorial) => total + tutorial.instructions.reduce((sum, inst) => sum + parseInt(inst.duration), 0), 0)}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Minutos de Conteúdo</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default RetaguardaTutorialsPage