import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward,
  CheckCircle, Star, Clock, BookOpen, Sun, Moon, Menu, X,
  GraduationCap, FileText, Lightbulb, Target, AlertCircle, Heart,
  Filter, PlayCircle, Activity, RotateCcw
} from 'lucide-react'

const InteractiveLesson = ({ 
  tutorialData: propTutorialData,
  steps: propSteps,
  categories: propCategories,
  initialStep = 0,
  showSidebar = true,
  showDarkMode = true,
  onStepChange,
  onStepComplete,
  onFavoriteToggle,
  className = "",
  ...props 
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSidebarState, setShowSidebarState] = useState(showSidebar)
  const [completedSteps, setCompletedSteps] = useState([])
  const [favoriteSteps, setFavoriteSteps] = useState([])
  const [stepTimer, setStepTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showVideoControls, setShowVideoControls] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Dados do tutorial (usa props ou dados padrão)
  const tutorialData = propTutorialData || {
    title: 'Sistema Lukos - Tutoriais Completos',
    instructor: 'Equipe Lukos - Suporte Técnico',
    duration: '2h 30min',
    rating: 4.9,
    studentsCount: 2500,
    difficulty: 'Intermediário',
    category: 'Sistema de Gestão',
    benefits: [
      'Domínio completo do sistema Lukos',
      'Aumento da produtividade operacional',
      'Redução de erros e otimização de processos',
      'Gestão eficiente de postos e lojas',
      'Controle total de estoque e vendas',
      'Relatórios avançados e análises'
    ],
    equipment: 'Computador com acesso à internet, Sistema Lukos instalado',
    totalTime: 9000, // 2h 30min em segundos
    precautions: [
      'Faça backup dos dados antes de qualquer alteração',
      'Teste em ambiente de desenvolvimento primeiro',
      'Consulte a documentação oficial',
      'Entre em contato com suporte em caso de dúvidas',
      'Mantenha o sistema sempre atualizado'
    ],
    contraindications: [
      'Usuários sem treinamento básico em sistemas',
      'Ambiente de produção sem backup',
      'Sistemas com versões desatualizadas',
      'Sem acesso à internet para atualizações'
    ]
  }

  // Dados dos steps e categories (usa props ou dados padrão)
  const steps = propSteps || [
    // RETAGUARDA - CADASTROS
    {
      id: 1,
      title: 'Cadastro de Clientes',
      category: 'Retaguarda',
      difficulty: 'Iniciante',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Aprenda a cadastrar clientes com CPF e CNPJ no sistema Lukos.',
      instructions: [
        {
          step: 1,
          title: 'Cadastro com CPF',
          description: 'Como cadastrar clientes pessoa física com CPF',
          duration: 300,
          image: 'https://picsum.photos/400/250?random=1',
          tips: ['Verifique se o CPF é válido', 'Preencha todos os campos obrigatórios'],
          focusArea: 'Dados pessoais'
        },
        {
          step: 2,
          title: 'Cadastro com CNPJ',
          description: 'Como cadastrar clientes pessoa jurídica com CNPJ',
          duration: 360,
          image: 'https://picsum.photos/400/250?random=2',
          tips: ['Consulte a Receita Federal', 'Cadastre dados da empresa'],
          focusArea: 'Dados empresariais'
        },
        {
          step: 3,
          title: 'Cadastro de Faturamento',
          description: 'Configure as informações de faturamento do cliente',
          duration: 240,
          image: 'https://picsum.photos/400/250?random=3',
          tips: ['Defina limites de crédito', 'Configure formas de pagamento'],
          focusArea: 'Financeiro'
        }
      ],
      tips: [
        'Mantenha os dados sempre atualizados',
        'Verifique a documentação antes do cadastro',
        'Configure corretamente os limites de crédito'
      ],
      commonMistakes: [
        'Cadastrar CPF/CNPJ inválidos',
        'Não preencher campos obrigatórios',
        'Esquecer de configurar limites'
      ],
      timeMarkers: [
        { time: 60, title: 'Validação de CPF', description: 'Como validar CPF' },
        { time: 180, title: 'Dados da Empresa', description: 'Informações empresariais' },
        { time: 300, title: 'Configurações', description: 'Limites e pagamentos' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qual é o primeiro passo para cadastrar um cliente?',
            options: ['Validar CPF/CNPJ', 'Preencher nome', 'Definir limite', 'Escolher categoria'],
            correct: 0,
            explanation: 'Sempre valide o CPF ou CNPJ antes de prosseguir com o cadastro.'
          }
        ]
      },
      resources: [
        { name: 'Manual de Cadastros', type: 'pdf', size: '2.1 MB' },
        { name: 'Validador CPF/CNPJ', type: 'xlsx', size: '150 KB' }
      ]
    },
    {
      id: 2,
      title: 'Cadastro de Produtos',
      category: 'Retaguarda',
      difficulty: 'Intermediário',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Configure produtos com e sem código de barras, KITs e promoções.',
      instructions: [
        {
          step: 1,
          title: 'Produto sem Código de Barras',
          description: 'Cadastre produtos que não possuem código de barras',
          duration: 180,
          image: 'https://picsum.photos/400/250?random=4',
          tips: ['Use códigos internos', 'Defina preços corretos'],
          focusArea: 'Identificação'
        },
        {
          step: 2,
          title: 'Produto com Código de Barras',
          description: 'Cadastre produtos com código de barras EAN13',
          duration: 240,
          image: 'https://picsum.photos/400/250?random=5',
          tips: ['Verifique o código EAN13', 'Configure preços'],
          focusArea: 'Código de barras'
        },
        {
          step: 3,
          title: 'Cadastro de KIT',
          description: 'Crie produtos KIT com múltiplos itens',
          duration: 300,
          image: 'https://picsum.photos/400/250?random=6',
          tips: ['Defina componentes do KIT', 'Configure preço total'],
          focusArea: 'Composição'
        }
      ],
      tips: [
        'Mantenha códigos únicos para cada produto',
        'Configure corretamente os preços',
        'Teste os KITs antes de ativar'
      ],
      commonMistakes: [
        'Usar códigos duplicados',
        'Preços incorretos',
        'KITs mal configurados'
      ],
      timeMarkers: [
        { time: 90, title: 'Código Interno', description: 'Criando código interno' },
        { time: 180, title: 'Preços', description: 'Definindo preços' },
        { time: 300, title: 'Validação', description: 'Testando produto' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'O que é obrigatório no cadastro de produtos?',
            options: ['Código único', 'Preço', 'Descrição', 'Todas as opções'],
            correct: 3,
            explanation: 'Todos os campos são obrigatórios para um cadastro completo.'
          }
        ]
      },
      resources: [
        { name: 'Guia de Produtos', type: 'pdf', size: '1.8 MB' },
        { name: 'Tabela de Códigos', type: 'xlsx', size: '300 KB' }
      ]
    },
    {
      id: 3,
      title: 'Gestão Financeira',
      category: 'Retaguarda',
      difficulty: 'Avançado',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Controle completo de contas a pagar, receber e faturamento.',
      instructions: [
        {
          step: 1,
          title: 'Contas a Pagar',
          description: 'Gerencie todas as contas a pagar da empresa',
          duration: 420,
          image: 'https://picsum.photos/400/250?random=7',
          tips: ['Configure vencimentos', 'Defina formas de pagamento'],
          focusArea: 'Fluxo de caixa'
        },
        {
          step: 2,
          title: 'Contas a Receber',
          description: 'Controle de recebimentos e cobrança',
          duration: 360,
          image: 'https://picsum.photos/400/250?random=8',
          tips: ['Configure prazos', 'Monitore inadimplência'],
          focusArea: 'Recebimentos'
        },
        {
          step: 3,
          title: 'Faturamento',
          description: 'Processo completo de faturamento',
          duration: 480,
          image: 'https://picsum.photos/400/250?random=9',
          tips: ['Verifique impostos', 'Gere relatórios'],
          focusArea: 'Fiscal'
        }
      ],
      tips: [
        'Mantenha o fluxo de caixa atualizado',
        'Configure alertas de vencimento',
        'Monitore inadimplência regularmente'
      ],
      commonMistakes: [
        'Não atualizar fluxo de caixa',
        'Esquecer de cobrar vencidos',
        'Erros no faturamento'
      ],
      timeMarkers: [
        { time: 120, title: 'Configurações', description: 'Configurando sistema' },
        { time: 300, title: 'Lançamentos', description: 'Lançando contas' },
        { time: 480, title: 'Relatórios', description: 'Gerando relatórios' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qual é a importância do fluxo de caixa?',
            options: ['Controle financeiro', 'Planejamento', 'Análise', 'Todas as opções'],
            correct: 3,
            explanation: 'O fluxo de caixa é fundamental para todas essas atividades.'
          }
        ]
      },
      resources: [
        { name: 'Manual Financeiro', type: 'pdf', size: '3.2 MB' },
        { name: 'Planilha Fluxo de Caixa', type: 'xlsx', size: '500 KB' }
      ]
    },
    // PDV - PISTA
    {
      id: 4,
      title: 'Operações de Pista',
      category: 'PDV',
      difficulty: 'Iniciante',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Operações essenciais do PDV na pista de combustíveis.',
      instructions: [
        {
          step: 1,
          title: 'Aferição de Bombas',
          description: 'Como realizar a aferição das bombas de combustível',
          duration: 300,
          image: 'https://picsum.photos/400/250?random=10',
          tips: ['Use equipamentos calibrados', 'Registre os valores'],
          focusArea: 'Calibração'
        },
        {
          step: 2,
          title: 'Venda de Combustível',
          description: 'Processo completo de venda de combustível',
          duration: 180,
          image: 'https://picsum.photos/400/250?random=11',
          tips: ['Verifique o preço', 'Confirme o volume'],
          focusArea: 'Vendas'
        },
        {
          step: 3,
          title: 'Encerramento de Turno',
          description: 'Como encerrar o turno corretamente',
          duration: 240,
          image: 'https://picsum.photos/400/250?random=12',
          tips: ['Concilie valores', 'Imprima relatórios'],
          focusArea: 'Fechamento'
        }
      ],
      tips: [
        'Sempre aferir as bombas antes do turno',
        'Verificar preços antes das vendas',
        'Concilie valores ao final do turno'
      ],
      commonMistakes: [
        'Não aferir bombas',
        'Preços incorretos',
        'Fechamento sem conciliação'
      ],
      timeMarkers: [
        { time: 60, title: 'Preparação', description: 'Preparando equipamentos' },
        { time: 180, title: 'Aferição', description: 'Aferindo bombas' },
        { time: 300, title: 'Validação', description: 'Validando valores' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Quando deve ser feita a aferição das bombas?',
            options: ['No início do turno', 'Durante o turno', 'No final', 'Sempre que necessário'],
            correct: 3,
            explanation: 'A aferição deve ser feita sempre que necessário para garantir precisão.'
          }
        ]
      },
      resources: [
        { name: 'Manual PDV Pista', type: 'pdf', size: '2.5 MB' },
        { name: 'Checklist Aferição', type: 'pdf', size: '200 KB' }
      ]
    },
    {
      id: 5,
      title: 'Operações de Loja',
      category: 'PDV',
      difficulty: 'Iniciante',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Operações do PDV na loja de conveniência.',
      instructions: [
        {
          step: 1,
          title: 'Venda de Produtos',
          description: 'Como realizar vendas de produtos na loja',
          duration: 180,
          image: 'https://picsum.photos/400/250?random=13',
          tips: ['Use códigos de barras', 'Verifique preços'],
          focusArea: 'Vendas'
        },
        {
          step: 2,
          title: 'Serviços',
          description: 'Efetuar serviços diversos na loja',
          duration: 240,
          image: 'https://picsum.photos/400/250?random=14',
          tips: ['Cadastre serviços', 'Defina preços'],
          focusArea: 'Serviços'
        },
        {
          step: 3,
          title: 'Código Rápido',
          description: 'Usar códigos rápidos para produtos frequentes',
          duration: 120,
          image: 'https://picsum.photos/400/250?random=15',
          tips: ['Configure códigos', 'Treine operadores'],
          focusArea: 'Agilidade'
        }
      ],
      tips: [
        'Mantenha produtos organizados',
        'Use códigos rápidos para agilizar',
        'Treine operadores regularmente'
      ],
      commonMistakes: [
        'Produtos mal organizados',
        'Códigos incorretos',
        'Falta de treinamento'
      ],
      timeMarkers: [
        { time: 60, title: 'Organização', description: 'Organizando produtos' },
        { time: 120, title: 'Códigos', description: 'Configurando códigos' },
        { time: 180, title: 'Treinamento', description: 'Treinando operadores' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qual a vantagem dos códigos rápidos?',
            options: ['Agilidade', 'Precisão', 'Facilidade', 'Todas as opções'],
            correct: 3,
            explanation: 'Os códigos rápidos oferecem todas essas vantagens.'
          }
        ]
      },
      resources: [
        { name: 'Manual PDV Loja', type: 'pdf', size: '2.0 MB' },
        { name: 'Lista Códigos Rápidos', type: 'xlsx', size: '150 KB' }
      ]
    },
    // DASHBOARD
    {
      id: 6,
      title: 'Dashboard e Relatórios',
      category: 'Dashboard',
      difficulty: 'Intermediário',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Acesse dashboards e gere relatórios avançados.',
      instructions: [
        {
          step: 1,
          title: 'Dashboard Principal',
          description: 'Navegue pelo dashboard principal do sistema',
          duration: 180,
          image: 'https://picsum.photos/400/250?random=16',
          tips: ['Explore os widgets', 'Configure alertas'],
          focusArea: 'Visão geral'
        },
        {
          step: 2,
          title: 'Relatórios Comerciais',
          description: 'Gere relatórios de vendas e lucratividade',
          duration: 300,
          image: 'https://picsum.photos/400/250?random=17',
          tips: ['Configure filtros', 'Exporte dados'],
          focusArea: 'Análise'
        },
        {
          step: 3,
          title: 'Relatórios Financeiros',
          description: 'Acesse relatórios financeiros detalhados',
          duration: 360,
          image: 'https://picsum.photos/400/250?random=18',
          tips: ['Monitore fluxo de caixa', 'Analise resultados'],
          focusArea: 'Financeiro'
        }
      ],
      tips: [
        'Configure dashboards personalizados',
        'Use filtros para análises específicas',
        'Exporte relatórios regularmente'
      ],
      commonMistakes: [
        'Não configurar alertas',
        'Ignorar relatórios importantes',
        'Não exportar dados'
      ],
      timeMarkers: [
        { time: 90, title: 'Configuração', description: 'Configurando dashboard' },
        { time: 180, title: 'Filtros', description: 'Aplicando filtros' },
        { time: 300, title: 'Exportação', description: 'Exportando dados' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qual a importância dos dashboards?',
            options: ['Visão geral', 'Tomada de decisão', 'Monitoramento', 'Todas as opções'],
            correct: 3,
            explanation: 'Dashboards são fundamentais para todas essas atividades.'
          }
        ]
      },
      resources: [
        { name: 'Manual Dashboard', type: 'pdf', size: '2.8 MB' },
        { name: 'Modelos de Relatórios', type: 'xlsx', size: '800 KB' }
      ]
    },
    // FATURA WEB
    {
      id: 7,
      title: 'Fatura Web',
      category: 'Fatura Web',
      difficulty: 'Intermediário',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
      description: 'Sistema web para faturamento e gestão de frotas.',
      instructions: [
        {
          step: 1,
          title: 'Cadastro no Fatura Web',
          description: 'Como se cadastrar no sistema Fatura Web',
          duration: 240,
          image: 'https://picsum.photos/400/250?random=19',
          tips: ['Use dados corretos', 'Valide e-mail'],
          focusArea: 'Cadastro'
        },
        {
          step: 2,
          title: 'Cadastro de Frota',
          description: 'Cadastre veículos da frota no sistema',
          duration: 300,
          image: 'https://picsum.photos/400/250?random=20',
          tips: ['Informações completas', 'Documentos válidos'],
          focusArea: 'Frota'
        },
        {
          step: 3,
          title: 'Requisição de Abastecimento',
          description: 'Como solicitar abastecimentos via web',
          duration: 180,
          image: 'https://picsum.photos/400/250?random=21',
          tips: ['Selecione posto', 'Confirme dados'],
          focusArea: 'Abastecimento'
        }
      ],
      tips: [
        'Mantenha dados atualizados',
        'Use requisições com antecedência',
        'Monitore abastecimentos'
      ],
      commonMistakes: [
        'Dados desatualizados',
        'Requisições em cima da hora',
        'Não monitorar uso'
      ],
      timeMarkers: [
        { time: 120, title: 'Validação', description: 'Validando dados' },
        { time: 240, title: 'Configuração', description: 'Configurando sistema' },
        { time: 360, title: 'Teste', description: 'Testando funcionalidades' }
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qual a vantagem do Fatura Web?',
            options: ['Controle remoto', 'Gestão de frota', 'Relatórios', 'Todas as opções'],
            correct: 3,
            explanation: 'O Fatura Web oferece todas essas funcionalidades.'
          }
        ]
      },
      resources: [
        { name: 'Manual Fatura Web', type: 'pdf', size: '2.2 MB' },
        { name: 'Guia de Cadastro', type: 'pdf', size: '400 KB' }
      ]
    }
  ]
  
  const categories = propCategories || [
    'Todos', 
    'Retaguarda', 
    'PDV', 
    'Dashboard', 
    'Pré-Venda', 
    'Fatura Web', 
    'PDV Móvel'
  ]
  
  const filteredSteps = selectedCategory === 'Todos' 
    ? steps 
    : steps.filter(step => step.category === selectedCategory)

  const currentStepData = filteredSteps[currentStep]

  const getStepProgressPercentage = () => {
    return filteredSteps.length > 0 ? ((completedSteps.length / filteredSteps.length) * 100) : 0
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'text-emerald-700 bg-emerald-100 border-emerald-200'
      case 'Intermediário': return 'text-amber-700 bg-amber-100 border-amber-200'
      case 'Avançado': return 'text-red-700 bg-red-100 border-red-200'
      default: return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getStepProgress = () => {
    if (!currentStepData || !currentStepData.instructions) return 0
    const currentInstruction = currentStepData.instructions[0]
    if (!currentInstruction) return 0
    return (stepTimer / currentInstruction.duration) * 100
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNextStep = () => {
    if (currentStep < filteredSteps.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      setStepTimer(0)
      setIsTimerRunning(false)
      onStepChange?.(newStep, filteredSteps[newStep])
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      setStepTimer(0)
      setIsTimerRunning(false)
      onStepChange?.(newStep, filteredSteps[newStep])
    }
  }

  const markStepAsCompleted = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompletedSteps = [...completedSteps, stepIndex]
      setCompletedSteps(newCompletedSteps)
      onStepComplete?.(stepIndex, true, newCompletedSteps)
    } else {
      const newCompletedSteps = completedSteps.filter(step => step !== stepIndex)
      setCompletedSteps(newCompletedSteps)
      onStepComplete?.(stepIndex, false, newCompletedSteps)
    }
  }

  const toggleFavorite = (stepIndex) => {
    if (!favoriteSteps.includes(stepIndex)) {
      const newFavoriteSteps = [...favoriteSteps, stepIndex]
      setFavoriteSteps(newFavoriteSteps)
      onFavoriteToggle?.(stepIndex, true, newFavoriteSteps)
    } else {
      const newFavoriteSteps = favoriteSteps.filter(step => step !== stepIndex)
      setFavoriteSteps(newFavoriteSteps)
      onFavoriteToggle?.(stepIndex, false, newFavoriteSteps)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentStep(0)
    setStepTimer(0)
    setIsTimerRunning(false)
  }

  // Timer para os passos
  useEffect(() => {
    let interval = null
    if (isTimerRunning && currentStepData && currentStepData.instructions) {
      const currentInstruction = currentStepData.instructions[0]
      if (currentInstruction) {
        interval = setInterval(() => {
          setStepTimer(timer => {
            if (timer >= currentInstruction.duration) {
              setIsTimerRunning(false)
              return currentInstruction.duration
            }
            return timer + 1
          })
        }, 1000)
      }
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, currentStepData])

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      <div className={`min-h-screen relative overflow-hidden font-sans ${className} ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`} {...props}>
      {/* BACKGROUND PATTERN */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode 
          ? 'bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent' 
          : 'bg-gradient-radial from-blue-500/5 via-purple-500/3 to-transparent'
      }`}></div>
      
      {/* FLOATING ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
        } animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/10'
        } animate-pulse delay-1000`}></div>
        <div className={`absolute bottom-20 left-1/4 w-40 h-40 rounded-full blur-3xl ${
          isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-500/10'
        } animate-pulse delay-2000`}></div>
      </div>

      {/* HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 px-8 py-6 backdrop-blur-2xl border-b ${
          isDarkMode 
            ? 'bg-gray-900/80 border-white/20 shadow-2xl shadow-black/40' 
            : 'bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-900/10'
        }`}
      >
        <div className="flex items-center justify-center max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white text-3xl relative overflow-hidden cursor-pointer group ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-2xl shadow-indigo-500/40' 
                  : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/40'
              }`}
            >
              <GraduationCap className="w-8 h-8" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl font-bold m-0 tracking-wide bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-white to-gray-300' 
                    : 'from-gray-900 to-gray-600'
                }`}
              >
                {tutorialData.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-sm m-0 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {tutorialData.instructor}
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.3 }}
                className={`px-3 py-1 rounded-full border ${
                  isDarkMode 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-emerald-500/10 border-emerald-500/20'
                }`}
              >
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {tutorialData.rating} ⭐
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.3 }}
                className={`px-3 py-1 rounded-full border ${
                  isDarkMode 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-emerald-500/10 border-emerald-500/20'
                }`}
              >
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  ({tutorialData.studentsCount} alunos)
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.3 }}
                className={`px-3 py-1 rounded-full border ${
                  isDarkMode 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-emerald-500/10 border-emerald-500/20'
                }`}
              >
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {tutorialData.difficulty}
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSidebarState(!showSidebarState)}
              className={`w-14 h-14 rounded-2xl backdrop-blur-sm cursor-pointer flex items-center justify-center text-xl border-2 transition-all duration-300 group ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10' 
                  : 'bg-gray-100/80 border-gray-200/50 text-gray-600 hover:bg-gray-200/80 hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-900/10'
              }`}
            >
              <motion.span
                animate={{ rotate: showSidebarState ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="group-hover:scale-110 transition-transform duration-300"
              >
                {showSidebarState ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-14 h-14 rounded-2xl backdrop-blur-sm cursor-pointer flex items-center justify-center text-xl border-2 transition-all duration-300 group ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10' 
                  : 'bg-gray-100/80 border-gray-200/50 text-gray-600 hover:bg-gray-200/80 hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-900/10'
              }`}
            >
              <motion.span
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="group-hover:scale-110 transition-transform duration-300"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* BARRA DE PROGRESSO */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`mt-6 h-4 rounded-2xl border-2 overflow-hidden backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-white/10 border-white/20' 
              : 'bg-gray-200/50 border-gray-300/50'
          }`}
        >
          <motion.div 
            className={`h-full rounded-2xl bg-gradient-to-r ${
              isDarkMode 
                ? 'from-indigo-500 via-purple-500 to-pink-500' 
                : 'from-blue-500 via-indigo-500 to-purple-500'
            } shadow-lg relative overflow-hidden`}
            style={{ width: `${getStepProgressPercentage()}%` }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* SIDEBAR HORIZONTAL NO TOPO */}
      <section className={`px-8 py-8 backdrop-blur-xl border-b ${
        isDarkMode 
          ? 'bg-gray-900/95 border-white/10' 
          : 'bg-white/95 border-black/10'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <div className={`p-2 rounded-xl mr-3 ${
              isDarkMode 
                ? 'bg-indigo-500/10' 
                : 'bg-indigo-500/10'
            }`}>
              <BookOpen className={`w-5 h-5 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
            </div>
            <h3 className={`text-lg font-semibold tracking-wide ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Passos do Tutorial ({completedSteps.length}/{filteredSteps.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {filteredSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index)
              const isCurrent = currentStep === index
              const isFavorite = favoriteSteps.includes(index)
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(index)}
                  className={`p-4 rounded-2xl cursor-pointer relative overflow-hidden backdrop-blur-sm transition-all duration-300 group min-w-[200px] ${
                    isCurrent 
                      ? (isDarkMode 
                          ? 'border-2 border-indigo-400/60 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 shadow-xl shadow-indigo-500/30' 
                          : 'border-2 border-blue-400/60 bg-gradient-to-r from-blue-500/20 to-indigo-500/10 shadow-xl shadow-blue-500/30')
                      : (isDarkMode 
                          ? 'border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10' 
                          : 'border-2 border-gray-200/50 bg-gray-50/80 hover:bg-gray-100/80 hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-900/10')
                  }`}
                >
                  {/* HOVER EFFECT */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    isCurrent 
                      ? (isDarkMode 
                          ? 'bg-gradient-to-r from-indigo-500/5 to-transparent' 
                          : 'bg-gradient-to-r from-blue-500/5 to-transparent')
                      : (isDarkMode 
                          ? 'bg-gradient-to-r from-white/2 to-transparent' 
                          : 'bg-gradient-to-r from-black/1 to-transparent')
                  }`}></div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isCompleted 
                        ? (isDarkMode 
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                            : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30')
                        : isCurrent 
                          ? (isDarkMode 
                              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30')
                          : (isDarkMode 
                              ? 'bg-white/10 text-gray-400' 
                              : 'bg-black/10 text-gray-500')
                    }`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-semibold m-0 mb-1 tracking-normal truncate ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-lg border flex items-center gap-1 ${
                          isDarkMode 
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                            : 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </span>
                        {isFavorite && (
                          <span className={`text-xs px-2 py-1 rounded-lg border flex items-center gap-1 ${
                            isDarkMode 
                              ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' 
                              : 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20'
                          }`}>
                            <Star className="w-3 h-3 fill-current" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="min-h-[calc(100vh-120px)]">
        {/* ÁREA PRINCIPAL CENTRALIZADA */}
        <div className="max-w-6xl mx-auto px-8 py-8">
            {/* PLAYER DE VÍDEO PROFISSIONAL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-3xl overflow-hidden mb-8 relative ${
                isDarkMode 
                  ? 'bg-gray-900/95 border border-white/10 shadow-2xl shadow-black/40' 
                  : 'bg-white/95 border border-black/10 shadow-2xl shadow-black/10'
              } backdrop-blur-xl`}
            >
              {/* VIDEO BACKGROUND PATTERN */}
              <div className={`absolute inset-0 pointer-events-none z-10 ${
                isDarkMode 
                  ? 'bg-gradient-radial from-indigo-500/5 via-transparent to-transparent' 
                  : 'bg-gradient-radial from-black/2 via-transparent to-transparent'
              }`}></div>
              
              <div className="relative z-20">
                {/* VÍDEO OU IMAGEM */}
                <div className="relative bg-black rounded-t-3xl">
                  {currentStepData?.videoUrl && currentStepData.videoUrl !== '' ? (
                    <iframe
                      src={currentStepData.videoUrl}
                      title="Tutorial Video"
                      width="100%"
                      height="450"
                      className="rounded-t-3xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="relative w-full h-[450px] rounded-t-3xl overflow-hidden">
                      <img
                        src={currentStepData?.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center"}
                        alt={currentStepData?.title || "Tutorial Image"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center";
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* CUSTOM VIDEO CONTROLS OVERLAY */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 flex items-end p-6 ${
                    showVideoControls ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-white hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center group"
                        >
                          {isVideoPlaying ? <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" /> : <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />}
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsMuted(!isMuted)}
                          className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-white hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center group"
                        >
                          {isMuted ? <VolumeX className="w-6 h-6 group-hover:scale-110 transition-transform" /> : <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />}
                        </motion.button>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-white hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center group"
                      >
                        <Maximize className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                {/* CONTROLES DO VÍDEO */}
                <div className={`p-6 backdrop-blur-sm border-t ${
                  isDarkMode 
                    ? 'bg-gray-900/80 border-white/10' 
                    : 'bg-white/80 border-black/10'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-black/80 text-white' 
                        : 'bg-black/80 text-white'
                    } backdrop-blur-sm`}>
                      Passo {currentStep + 1} de {filteredSteps.length}
                    </div>
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(currentStep)}
                        className={`rounded-2xl w-16 h-16 flex items-center justify-center text-2xl backdrop-blur-sm border-2 transition-all duration-300 group ${
                          favoriteSteps.includes(currentStep) 
                            ? (isDarkMode 
                                ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-yellow-400/50 shadow-xl shadow-yellow-500/30' 
                                : 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-yellow-400/50 shadow-xl shadow-yellow-500/30')
                            : (isDarkMode 
                                ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10' 
                                : 'bg-gray-100/80 text-gray-600 border-gray-200/50 hover:bg-gray-200/80 hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-900/10')
                        }`}
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">
                          <Star className={`w-6 h-6 ${favoriteSteps.includes(currentStep) ? 'fill-current' : ''}`} />
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TÍTULO DO TUTORIAL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`rounded-xl p-6 mb-8 shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold m-0 mb-4 tracking-wide ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentStepData?.title || 'Nenhum passo selecionado'}
                </h2>
                <p className={`text-lg m-0 leading-relaxed tracking-normal ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {currentStepData?.description || 'Selecione uma categoria para ver os passos disponíveis.'}
                </p>
              </div>

              {/* NAVEGAÇÃO */}
              <div className={`flex justify-between items-center pt-6 border-t ${
                isDarkMode 
                  ? 'border-white/20' 
                  : 'border-gray-200/50'
              }`}>
                <motion.button
                  disabled={currentStep === 0}
                  whileHover={currentStep === 0 ? {} : { scale: 1.05, y: -2 }}
                  whileTap={currentStep === 0 ? {} : { scale: 0.95 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 tracking-wide ${
                    currentStep === 0 
                      ? 'bg-gray-200/50 text-gray-400 cursor-not-allowed border-gray-200/50' 
                      : (isDarkMode 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500/50 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500/50 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30')
                  }`}
                  onClick={handlePrevStep}
                >
                  <SkipBack className="w-5 h-5" />
                  Passo Anterior
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => markStepAsCompleted(currentStep)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 tracking-wide ${
                    completedSteps.includes(currentStep) 
                      ? (isDarkMode 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-400/50 shadow-xl shadow-emerald-500/30' 
                          : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-400/50 shadow-xl shadow-emerald-500/30')
                      : (isDarkMode 
                          ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white border-gray-500/50 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl hover:shadow-gray-500/30' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white border-gray-500/50 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl hover:shadow-gray-500/30')
                  }`}
                >
                  {completedSteps.includes(currentStep) ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Concluído
                    </>
                  ) : (
                    'Marcar como Concluído'
                  )}
                </motion.button>
                
                <motion.button
                  disabled={currentStep === filteredSteps.length - 1}
                  whileHover={currentStep === filteredSteps.length - 1 ? {} : { scale: 1.05, y: -2 }}
                  whileTap={currentStep === filteredSteps.length - 1 ? {} : { scale: 0.95 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 tracking-wide ${
                    currentStep === filteredSteps.length - 1 
                      ? 'bg-gray-200/50 text-gray-400 cursor-not-allowed border-gray-200/50' 
                      : (isDarkMode 
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-500/50 hover:from-emerald-700 hover:to-green-700 hover:shadow-xl hover:shadow-emerald-500/30' 
                          : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-500/50 hover:from-emerald-700 hover:to-green-700 hover:shadow-xl hover:shadow-emerald-500/30')
                  }`}
                  onClick={handleNextStep}
                >
                  Próximo Passo
                  <SkipForward className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
        </div>
      </main>
      </div>
    </>
  )
}

export default InteractiveLesson
