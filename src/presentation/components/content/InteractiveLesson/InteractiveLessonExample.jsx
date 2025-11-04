import React from 'react'
import InteractiveLesson from './InteractiveLesson'

const InteractiveLessonExample = () => {
  // Dados do tutorial personalizados
  const customTutorialData = {
    title: 'Sistema Lukos - Treinamento Completo',
    instructor: 'Equipe de Suporte Lukos',
    duration: '3h 15min',
    rating: 4.9,
    studentsCount: 3200,
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
    totalTime: 11700, // 3h 15min em segundos
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

  // Tutoriais específicos da Lukos organizados por categoria
  const lukosSteps = [
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
    // PDV - PISTA
    {
      id: 3,
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
    // DASHBOARD
    {
      id: 4,
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
    }
  ]

  // Categorias específicas da Lukos
  const lukosCategories = [
    'Todos', 
    'Retaguarda', 
    'PDV', 
    'Dashboard', 
    'Pré-Venda', 
    'Fatura Web', 
    'PDV Móvel'
  ]

  // Callbacks para interação
  const handleStepChange = (stepIndex, stepData) => {
    console.log('Step changed:', stepIndex, stepData)
  }

  const handleStepComplete = (stepIndex, isCompleted, completedSteps) => {
    console.log('Step completed:', stepIndex, isCompleted, completedSteps)
  }

  const handleFavoriteToggle = (stepIndex, isFavorite, favoriteSteps) => {
    console.log('Favorite toggled:', stepIndex, isFavorite, favoriteSteps)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InteractiveLesson
        tutorialData={customTutorialData}
        steps={lukosSteps}
        categories={lukosCategories}
        initialStep={0}
        showSidebar={true}
        showDarkMode={true}
        onStepChange={handleStepChange}
        onStepComplete={handleStepComplete}
        onFavoriteToggle={handleFavoriteToggle}
        className="custom-lesson"
      />
    </div>
  )
}

export default InteractiveLessonExample