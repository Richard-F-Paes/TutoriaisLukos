import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Note que esses ícones são componentes React de 'lucide-react'
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Timer,
  Database,
  Package,
} from 'lucide-react'

const InteractiveLesson = () => {
  // Removida a tipagem <number[]>
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])
  const [showTips, setShowTips] = useState(false)
  
  // videoRef não precisa de tipagem explícita em JS puro
  const videoRef = useRef(null)

  const tutorial = {
    title: 'Tutorial: Cadastro de Produtos na Retaguarda',
    category: 'Sistema de Gestão',
    difficulty: 'Iniciante',
    duration: '20:45',
    instructor: 'Ana Silva - Supervisora de TI',
    description: 'Aprenda o processo completo de cadastro de produtos no sistema de retaguarda da empresa',
  }

  // Seus dados de passos (steps) foram mantidos
  const steps = [
    // ... Seus objetos de passo (mantidos idênticos)
    {
      id: 0,
      title: 'Acesso ao Sistema e Login',
      duration: '3:00',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=0&end=180',
      image:
        'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Faça login no sistema de retaguarda e navegue até o módulo de produtos.',
      instructions: [
        'Abra o navegador e acesse o sistema de retaguarda da empresa',
        'Digite seu usuário e senha nos campos correspondentes',
        'Clique em "Entrar" para acessar o sistema',
        'No menu principal, localize e clique em "Gestão de Produtos"',
        'Verifique se você está no módulo correto observando o título da página',
      ],
      tips: [
        'Sempre use suas credenciais pessoais, nunca compartilhe com colegas',
        'Se esquecer a senha, use a opção "Esqueci minha senha"',
        'O sistema faz logout automático após 30 minutos de inatividade',
      ],
      commonMistakes: [
        'Tentar usar credenciais de outro funcionário',
        'Não verificar se está no módulo correto',
        'Deixar o sistema aberto em computador compartilhado',
      ],
    },
    {
      id: 1,
      title: 'Navegação para Novo Produto',
      duration: '2:30',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=180&end=330',
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Localize e acesse a tela de cadastro de novo produto.',
      instructions: [
        'Na tela principal de Gestão de Produtos, localize o botão "Novo Produto"',
        'Clique no botão verde "Novo Produto" no canto superior direito',
        'Aguarde o carregamento da tela de cadastro',
        'Verifique se todos os campos estão vazios e prontos para preenchimento',
        'Observe a estrutura do formulário antes de começar',
      ],
      tips: [
        'O botão "Novo Produto" só aparece se você tiver permissão de cadastro',
        'A tela pode demorar alguns segundos para carregar completamente',
        'Sempre verifique se está em uma nova tela de cadastro, não editando um produto existente',
      ],
      commonMistakes: [
        'Confundir com o botão "Editar Produto"',
        'Não aguardar o carregamento completo da página',
        'Começar a preencher antes de verificar se todos os campos estão vazios',
      ],
    },
    {
      id: 2,
      title: 'Preenchimento de Dados Básicos',
      duration: '5:00',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=330&end=630',
      image:
        'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Preencha as informações básicas do produto: nome, descrição e categoria.',
      instructions: [
        'No campo "Nome do Produto", digite o nome completo e claro',
        'Preencha a "Descrição" com detalhes relevantes do produto',
        'Selecione a "Categoria" apropriada no menu suspenso',
        'Escolha a "Subcategoria" correspondente',
        'Digite o "Código de Barras" se disponível',
        'Defina a "Marca" do produto',
      ],
      tips: [
        'Use nomes descritivos que facilitem a busca posterior',
        'A descrição deve ter entre 50 e 200 caracteres',
        'Sempre confirme a categoria antes de prosseguir',
        'O código de barras deve ter exatamente 13 dígitos',
      ],
      commonMistakes: [
        'Usar abreviações no nome do produto',
        'Deixar a descrição muito vaga ou muito extensa',
        'Selecionar categoria incorreta',
        'Digitar código de barras com número incorreto de dígitos',
      ],
    },
    {
      id: 3,
      title: 'Configuração de Preços e Estoque',
      duration: '4:15',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=630&end=885',
      image:
        'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Configure preços, margem de lucro e informações de estoque.',
      instructions: [
        'Digite o "Preço de Custo" sem incluir impostos',
        'Defina a "Margem de Lucro" em percentual',
        'O sistema calculará automaticamente o "Preço de Venda"',
        'Insira a "Quantidade em Estoque" atual',
        'Configure o "Estoque Mínimo" para alertas',
        'Selecione a "Unidade de Medida" (peça, kg, litro, etc.)',
      ],
      tips: [
        'Sempre use vírgula para separar decimais, não ponto',
        'A margem de lucro padrão da empresa é 30%',
        'Estoque mínimo recomendado: 10% do estoque inicial',
        'Confira se o preço de venda está coerente com o mercado',
      ],
      commonMistakes: [
        'Incluir impostos no preço de custo',
        'Usar ponto em vez de vírgula nos decimais',
        'Definir margem de lucro muito baixa ou muito alta',
        'Não configurar estoque mínimo',
      ],
    },
    {
      id: 4,
      title: 'Upload de Imagens e Finalização',
      duration: '3:30',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=885&end=1095',
      image:
        'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Adicione imagens do produto e finalize o cadastro.',
      instructions: [
        'Clique em "Adicionar Imagem" na seção de fotos',
        'Selecione uma imagem de boa qualidade do produto',
        'Aguarde o upload e verifique se a imagem apareceu corretamente',
        'Adicione até 3 imagens diferentes do produto',
        'Marque uma imagem como "Principal" para exibição',
        'Revise todos os dados preenchidos antes de salvar',
      ],
      tips: [
        'Use imagens com resolução mínima de 800x600 pixels',
        'Formatos aceitos: JPG, PNG (máximo 2MB cada)',
        'A primeira imagem adicionada se torna automaticamente a principal',
        'Sempre teste se as imagens estão sendo exibidas corretamente',
      ],
      commonMistakes: [
        'Usar imagens de baixa qualidade ou muito pequenas',
        'Não verificar se o upload foi concluído',
        'Adicionar imagens que não correspondem ao produto',
        'Não definir uma imagem principal',
      ],
    },
    {
      id: 5,
      title: 'Validação e Salvamento',
      duration: '2:30',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=1095&end=1245',
      image:
        'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Valide todas as informações e salve o produto no sistema.',
      instructions: [
        'Clique no botão "Validar Dados" para verificar erros',
        'Corrija qualquer erro apontado pelo sistema',
        'Revise mais uma vez todos os campos preenchidos',
        'Clique em "Salvar Produto" para finalizar o cadastro',
        'Aguarde a confirmação de que o produto foi salvo',
        'Anote o código do produto gerado pelo sistema',
      ],
      tips: [
        'O sistema sempre valida antes de salvar',
        'Campos obrigatórios são marcados com asterisco (*)',
        'O código do produto é gerado automaticamente',
        'Após salvar, o produto já fica disponível para venda',
      ],
      commonMistakes: [
        'Não aguardar a validação completa',
        'Ignorar mensagens de erro do sistema',
        'Não anotar o código do produto gerado',
        'Sair da tela antes da confirmação de salvamento',
      ],
    },
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNextStep = () => {
    if (!isLastStep) {
      markStepAsCompleted(currentStep)
      setCurrentStep(currentStep + 1)
      setIsPlaying(false)
    }
  }

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
      setIsPlaying(false)
    }
  }

  const handleStepClick = (stepIndex) => { // Removida a tipagem : number
    setCurrentStep(stepIndex)
    setIsPlaying(false)
  }

  const markStepAsCompleted = (stepIndex) => { // Removida a tipagem : number
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const restartLesson = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setIsPlaying(false)
  }

  const getDifficultyColor = (difficulty) => { // Removida a tipagem : string
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

  const getStepStatus = (stepIndex) => { // Removida a tipagem : number
    if (completedSteps.includes(stepIndex)) return 'completed'
    if (stepIndex === currentStep) return 'current'
    return 'pending'
  }

  const getStepStatusColor = (status) => { // Removida a tipagem : string
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'current':
        return 'bg-blue-500 text-white'
      case 'pending':
        return 'bg-gray-200 text-gray-600'
      default:
        return 'bg-gray-200 text-gray-600'
    }
  }

  useEffect(() => {
    // Reset video when step changes
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [currentStep])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/exercicios"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar aos Tutoriais
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                tutorial.difficulty,
              )}`}
            >
              {tutorial.difficulty}
            </span>
            <div className="flex items-center text-gray-600">
              <Timer className="h-4 w-4 mr-1" />
              {tutorial.duration}
            </div>
            <div className="flex items-center text-gray-600">
              <Database className="h-4 w-4 mr-1" />
              {tutorial.category}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tutorial Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              {tutorial.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600">{tutorial.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Progresso do Tutorial
            </h3>
            <span className="text-sm text-gray-600">
              {completedSteps.length} de {steps.length} etapas concluídas
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index)
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-green-500'
                      : status === 'current'
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                />
              )
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const status = getStepStatus(index)
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${getStepStatusColor(
                    status,
                  )} hover:opacity-80`}
                >
                  {index + 1}. {step.title}
                  {status === 'completed' && (
                    <CheckCircle className="inline h-3 w-3 ml-1" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={currentStepData.videoUrl}
                  title={currentStepData.title}
                  className="w-full h-64 md:h-96"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Controls */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    <span className="text-sm text-gray-600">
                      Etapa {currentStep + 1} de {steps.length} •{' '}
                      {currentStepData.duration}
                    </span>
                  </div>

                  <button
                    onClick={restartLesson}
                    className="text-gray-600 hover:text-blue-600 p-2 transition-colors"
                    title="Reiniciar tutorial"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStepData.title}
                </h2>
                <span className="text-sm text-gray-500">
                  {currentStepData.duration}
                </span>
              </div>

              <p className="text-gray-700 text-lg mb-6">
                {currentStepData.description}
              </p>

              {/* Step Image */}
              <div className="mb-6">
                <img
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Instruções Passo a Passo
                </h3>
                <ol className="space-y-3">
                  {currentStepData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  onClick={handlePrevStep}
                  disabled={isFirstStep}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isFirstStep
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Etapa Anterior
                </button>

                <button
                  onClick={() => markStepAsCompleted(currentStep)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    completedSteps.includes(currentStep)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  {completedSteps.includes(currentStep) ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2 inline" />
                      Concluído
                    </>
                  ) : (
                    'Marcar como Concluído'
                  )}
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={isLastStep}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isLastStep
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLastStep ? 'Última Etapa' : 'Próxima Etapa'}
                  {!isLastStep && <ArrowRight className="h-5 w-5 ml-2" />}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tips */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <button
                onClick={() => setShowTips(!showTips)}
                className="w-full flex items-center justify-between text-lg font-bold text-gray-900 mb-4"
              >
                Dicas Importantes
                <ArrowRight
                  className={`h-5 w-5 transition-transform ${
                    showTips ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {showTips && (
                <ul className="space-y-3">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Common Mistakes */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                Erros Comuns
              </h3>
              <ul className="space-y-3">
                {currentStepData.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tutorial Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Resumo do Tutorial
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Instrutor:</span>
                  <span className="font-medium">{tutorial.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração Total:</span>
                  <span className="font-medium">{tutorial.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Etapas:</span>
                  <span className="font-medium">{steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progresso:</span>
                  <span className="font-medium">
                    {Math.round((completedSteps.length / steps.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveLesson