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

// ====================================================================
// DEFINIÇÃO DOS DADOS PADRÃO/DE EXEMPLO (MOVIDOS PARA FORA OU USADOS COMO PADRÃO NAS PROPS)
// Mantenha os dados aqui para ter um componente com fallback ou defina-os no componente pai.
// Para manter o componente reusável, é melhor passá-los como props.
// Vou manter os dados originais como padrão nas props, caso não sejam passados.
// ====================================================================

const defaultTutorial = {
    title: 'Tutorial: Cadastro de Produtos na Retaguarda (Padrão)',
    category: 'Sistema de Gestão',
    difficulty: 'Iniciante',
    duration: '20:45',
    instructor: 'Ana Silva - Supervisora de TI',
    description: 'Aprenda o processo completo de cadastro de produtos no sistema de retaguarda da empresa',
}

const defaultSteps = [
    // Passo 0 (CPF)
    {
        id: 0,
        title: 'Insira o CPF do cliente no campo "CNPJ/CPF"',
        duration: '1:00',
        videoUrl: 'https://www.youtube.com/embed/ZDu8o37BwH0',
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYjdNdfMCoT6sSvdi-Q9Q6HToJNdT4VwKbaK7rVKtcSFHBrVRkEuXC9ImmtWP09cizjkX_nqJQ5mtTcqzDIL9kUkIvBWSka9-B-37DhjC9F6F2ijNTVFa3mycfdvSPvZVzhrnio2160GdWX_8Jaa9PLO0JeBDVRFbiHWQJpPrLfk93yCXaqqotzDLmm5uEkMq3FXFi2ijngwZTnM-jImBd0xAh195CM3gyi=w1280',
        description: 'Faça login no sistema de retaguarda e navegue até o módulo de produtos.',
        instructions: ['Insira o CPF do cliente no campo "CNPJ/CPF" e aperte a tecla "TAB".'],
        tips: ['Sempre use suas credenciais pessoais, nunca compartilhe com colegas'],
        commonMistakes: ['Tentar usar credenciais de outro funcionário'],
    },
    // ... Adicione o resto dos seus passos aqui, se quiser um fallback completo
    {
        id: 1,
        title: 'Navegação para Novo Produto',
        duration: '2:30',
        videoUrl: '', // URL de vídeo de exemplo: 'https://www.youtube.com/embed/OutroVideo'
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYda-pgCCDDrvdnfLQ589q8nDkOPkoXc31CHw5IJ386HLHfLNp14-v1GsNtWfIYF3iFmV0ydnGjilUp061MpqFgJdNwNrNGxWqssm8fjcxo85EgOEcuhhRoglQqFY7G4HOQRKSCq2-uvIo_bYLBiW-ZFNiTjFkoDfYmtt2ew8g5EEr9t8bMgxftoVntSXnr4C2fuc7_tts0dK3GhSoBsGnxCq8Ix-a3onssZ8K4Y=w1280',
        description: 'Localize e acesse a tela de cadastro de novo produto.',
        instructions: ['Selecione "Física" em "Tipo de Pessoa" > preencha os campo "Razão Social/Nome" e "Fantasia" > Salvar"'],
        tips: ['O botão "Novo Produto" só aparece se você tiver permissão de cadastro'],
        commonMistakes: ['Confundir com o botão "Editar Produto"'],
    },
     // Mantenha os demais passos do seu código original (omiti aqui por brevidade)
     {
      id: 2,
      title: 'Preenchimento de Dados Básicos',
      duration: '5:00',
      videoUrl: '',
      image:
        'https://lh3.googleusercontent.com/sitesv/AICyYdbc9atDs3xYnoaFdo3UjcNDyopcE8ZoNiQQTb1X54GSpZVCCzoFCTlc76SWvVZHkReVBEbnBKm1Lptb-3LGrKbSzheztEHHvmC-K2EC4B0ubOo15XEr9oCOs3DH_rei4HMv1DbBrQS4d-KrIVJEiZerWcwzzvvSIt1v-Cm8rHiOVdRrk8Px2bQIzOOZXfU6yzQN8mxEJ6hUfH65TogMKz0eGRD4FyjsyeB_Vqg=w1280',
      description: 'Preencha as informações básicas do produto: nome, descrição e categoria.',
      instructions: [
        'Aba Endereços > Novo > Informe o "CEP" do cliente, e aperte a tecla "TAB" > Salvar',
      
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
      videoUrl: '',
      image:
        'https://lh3.googleusercontent.com/sitesv/AICyYdYsovDwpN0lAXaHNXfZOgERWJFLHqu_G05RB8AjR3zbism9lBSVR8mfXu2HvN8CTvz0fIdgs1PY0WT8-kYJ9sKH0MiKrEVFG02CAPt_H4CN8wLS8-Ca2V44bkm_iJqyI8MamAmJar2uBXmGBRXUOH69DvN17zdNL9XIcxU36FpVzXchRP1RSTFev4Ime-fO0li8Mlp1rDoSCw9TnQN5SgqUybyp_lCZf451=w1280',
      description: 'Configure preços, margem de lucro e informações de estoque.',
      instructions: [
        'Aba "Unidades Permitidas" > Selecione a unidade em que o cliente terá permissão para consumir > Clique na setinha para a direita e prontinho!',
 
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
      videoUrl: '',
      image:
        'https://lh3.googleusercontent.com/sitesv/AICyYdbc9atDs3xYnoaFdo3UjcNDyopcE8ZoNiQQTb1X54GSpZVCCzoFCTlc76SWvVZHkReVBEbnBKm1Lptb-3LGrKbSzheztEHHvmC-K2EC4B0ubOo15XEr9oCOs3DH_rei4HMv1DbBrQS4d-KrIVJEiZerWcwzzvvSIt1v-Cm8rHiOVdRrk8Px2bQIzOOZXfU6yzQN8mxEJ6hUfH65TogMKz0eGRD4FyjsyeB_Vqg=w1280',
      description: 'Adicione imagens do produto e finalize o cadastro.',
      instructions: [
        'Clique em "Adicionar Imagem" na seção de fotos',
   
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
]

// ====================================================================
// COMPONENTE InteractiveLesson COM PROPS
// ====================================================================

const InteractiveLesson = ({ tutorial = defaultTutorial, steps = defaultSteps, backLink = "/retaguarda" }) => {
    // Se o `steps` vier vazio, evite erros
    const safeSteps = Array.isArray(steps) && steps.length > 0 ? steps : defaultSteps;
    const safeTutorial = tutorial || defaultTutorial;

    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [completedSteps, setCompletedSteps] = useState([])
    const [showTips, setShowTips] = useState(false) // Mantido o state, mas sem uso no template ainda

    const videoRef = useRef(null)

    // Ajusta o state `currentStep` se o número de passos mudar dinamicamente
    useEffect(() => {
        if (currentStep >= safeSteps.length) {
            setCurrentStep(safeSteps.length > 0 ? safeSteps.length - 1 : 0);
        }
    }, [safeSteps.length, currentStep]);


    // Uso as variáveis de props e seus fallbacks
    const currentStepData = safeSteps[currentStep] || safeSteps[0];
    const isLastStep = currentStep === safeSteps.length - 1
    const isFirstStep = currentStep === 0

    // ... Resto das funções (mantidas idênticas, mas usando `safeSteps` e `currentStep`)

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

    const handleStepClick = (stepIndex) => {
        setCurrentStep(stepIndex)
        setIsPlaying(false)
    }

    const markStepAsCompleted = (stepIndex) => {
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

    const getStepStatus = (stepIndex) => {
        if (completedSteps.includes(stepIndex)) return 'completed'
        if (stepIndex === currentStep) return 'current'
        return 'pending'
    }

    const getStepStatusColor = (status) => {
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
                    <button className='bg-[#9333ea] rounded-xl w-[220px] h-[50px] mb-4 '>
                        {/* Usando a prop backLink */}
                        <Link
                            to={backLink}
                            className="flex items-center text-white font-medium justify-center"
                        >
                            <ArrowLeft className="h-5 w-5 mr-2 text-white  " />
                            Voltar aos Tutoriais
                        </Link>
                    </button>

                    <div className="flex flex-wrap items-center gap-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                                safeTutorial.difficulty,
                            )}`}
                        >
                            {safeTutorial.difficulty}
                        </span>
                        <div className="flex items-center text-gray-600">
                            <Timer className="h-4 w-4 mr-1" />
                            {safeTutorial.duration}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Database className="h-4 w-4 mr-1" />
                            {safeTutorial.category}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tutorial Title */}
                <div className="text-center mb-8 bg-[#f8f9fa]">
                    <div className="flex items-center justify-center mb-4 ">
                        <Package className="h-12 w-12 text-blue-600 mr-3 bg-[#f8f9fa]" />
                        <h1 className="text-3xl font-bold text-gray-900 ">
                            {safeTutorial.title}
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600">{safeTutorial.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Progresso do Tutorial
                        </h3>
                        <span className="text-sm text-gray-600">
                            {completedSteps.length} de {safeSteps.length} etapas concluídas
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                        {safeSteps.map((step, index) => {
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
                        {safeSteps.map((step, index) => {
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 "> {/* Removida a classe 'flex justify-center' para não quebrar o layout grid */}
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
                                            Etapa {currentStep + 1} de {safeSteps.length} •{' '}
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
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6"> {/* Removida a classe 'w-[1100px]' para ajustar-se ao grid */}
                            <div className="flex items-center justify-between mb-4"> {/* Alterado para 'justify-between' para alinhar titulo e duração */}
                                <h2 className="text-2xl font-bold text-gray-900 ">
                                    {currentStepData.title}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {currentStepData.duration}
                                </span>
                            </div>


                            {/* Step Image */}
                            <div className="flex justify-center mb-4 h-[400px] items-center">
                                <img
                                    src={currentStepData.image}
                                    alt={currentStepData.title}
                                    className="w-auto h-[400px] object-cover rounded-lg"
                                />
                            </div>

                            {/* Instructions */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 bg-[#f8f9fa]">
                                    Instruções Passo a Passo
                                </h3>
                                <ol className="space-y-3">
                                    {currentStepData.instructions.map((instruction, index) => (
                                        <li key={index} className="flex items-start"> {/* Alterado items-center para items-start para evitar desalinhamento em textos longos */}
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
                    {/* Exemplo de Sidebar de Dicas e Erros Comuns, movido para o grid lateral */}
                    <div className="lg:col-span-1">
                        {/* Dicas */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                                Dicas Úteis
                            </h3>
                            <ul className="space-y-3 list-disc list-inside text-gray-700">
                                {currentStepData.tips.map((tip, index) => (
                                    <li key={index} className="pl-2">{tip}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Erros Comuns */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                                Erros Comuns
                            </h3>
                            <ul className="space-y-3 list-disc list-inside text-gray-700">
                                {currentStepData.commonMistakes.map((mistake, index) => (
                                    <li key={index} className="pl-2">{mistake}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InteractiveLesson

// ====================================================================
// COMO USAR NO COMPONENTE PAI (EXEMPLO)
// ====================================================================

/*

import InteractiveLesson from './InteractiveLesson';

const MeuTutorialPersonalizado = {
    title: 'Meu Tutorial Personalizado',
    category: 'Financeiro',
    difficulty: 'Avançado',
    duration: '45:00',
    instructor: 'João Dev - Especialista',
    description: 'Um tutorial completamente novo.',
};

const MeusPassos = [
    {
        id: 0,
        title: 'Passo Personalizado 1',
        duration: '10:00',
        videoUrl: 'URL_DO_VIDEO_AQUI',
        image: 'URL_DA_IMAGEM_AQUI',
        instructions: ['Instrução 1', 'Instrução 2'],
        tips: ['Dica legal'],
        commonMistakes: ['Erro comum'],
    },
    // ... mais passos
];


const App = () => {
    return (
        <InteractiveLesson
            tutorial={MeuTutorialPersonalizado}
            steps={MeusPassos}
            backLink="/dashboard" // Opcional, se não passar, usa "/retaguarda"
        />
    );
};

// Ou para usar os dados padrão:
// const App = () => {
//     return <InteractiveLesson />;
// };

*/