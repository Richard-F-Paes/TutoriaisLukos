# InteractiveLesson Component

Um componente React moderno e interativo para exibir tutoriais e lições com vídeos, instruções passo a passo, quizzes e recursos adicionais.

## 🚀 Características

- 🎥 **Player de vídeo integrado** com controles personalizados
- 📚 **Instruções passo a passo** com imagens e dicas
- 🎯 **Sistema de progresso** visual e tracking de conclusão
- ⭐ **Sistema de favoritos** para marcar lições importantes
- 🌙 **Modo escuro/claro** com transições suaves
- 📱 **Design responsivo** para todos os dispositivos
- 🎨 **Animações modernas** com Framer Motion
- 🏷️ **Sistema de categorias** para organizar conteúdo
- 📊 **Dashboards e relatórios** integrados
- 🔧 **Totalmente customizável** via props

## 📋 Tutoriais Integrados

O componente vem pré-configurado com tutoriais completos do **Sistema Lukos**, organizados por categoria:

### 📋 Retaguarda
- **Cadastro de Clientes** (CPF/CNPJ, Faturamento)
- **Cadastro de Produtos** (Código de barras, KITs, Promoções)
- **Gestão Financeira** (Contas a pagar/receber, Faturamento)
- **Estoque** (Inventário, Transferências, Medições)
- **Fiscal** (NFe, SPED, Impostos)
- **Relatórios** (Comerciais, Financeiros, Produtos)

### 🛒 PDV
- **Operações de Pista** (Aferição, Vendas de combustível)
- **Operações de Loja** (Produtos, Serviços, Códigos rápidos)
- **Encerramento de Turno** (Conciliação, Relatórios)

### 📊 Dashboard
- **Dashboard Principal** (Widgets, Alertas)
- **Relatórios Avançados** (Comerciais, Financeiros)
- **Análises** (Vendas, Lucratividade, Fluxo de caixa)

### 🌐 Fatura Web
- **Cadastro no Sistema** (Validação, Configuração)
- **Gestão de Frota** (Veículos, Documentos)
- **Requisições** (Abastecimento, Controle remoto)

### 📱 PDV Móvel
- **POS Móvel** (Vendas em campo)
- **Integração** (Maquininhas, Aplicativos)

## 📦 Instalação

```bash
npm install framer-motion lucide-react
```

## 🎯 Uso Básico

```jsx
import InteractiveLesson from './InteractiveLesson'

function MyTutorial() {
  return (
    <InteractiveLesson />
  )
}
```

## 🔧 Props Disponíveis

### Dados do Tutorial

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `tutorialData` | `object` | dados padrão | Informações do tutorial |
| `steps` | `array` | dados padrão | Array de passos do tutorial |
| `categories` | `array` | `['Todos', 'Configuração', ...]` | Categorias para filtro |

### Configuração

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `initialStep` | `number` | `0` | Passo inicial |
| `showSidebar` | `boolean` | `true` | Mostrar sidebar horizontal |
| `showDarkMode` | `boolean` | `true` | Mostrar toggle de modo escuro |

### Callbacks

| Prop | Tipo | Descrição |
|------|------|-----------|
| `onStepChange` | `function` | Chamado quando o passo muda |
| `onStepComplete` | `function` | Chamado quando passo é marcado como completo |
| `onFavoriteToggle` | `function` | Chamado quando favorito é toggleado |

### Estilo

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `className` | `string` | `""` | Classes CSS adicionais |
| `...props` | `object` | `{}` | Props adicionais para o container |

## 📋 Estrutura de Dados

### tutorialData

```jsx
const tutorialData = {
  title: 'Nome do Tutorial',
  instructor: 'Nome do Instrutor',
  duration: '2h 30min',
  rating: 4.8,
  studentsCount: 1250,
  difficulty: 'Intermediário',
  category: 'Categoria',
  benefits: ['Benefício 1', 'Benefício 2'],
  equipment: 'Equipamentos necessários',
  totalTime: 9000, // em segundos
  precautions: ['Precaução 1', 'Precaução 2'],
  contraindications: ['Contraindicação 1']
}
```

### steps

```jsx
const steps = [
  {
    id: 1,
    title: 'Nome do Passo',
    category: 'Categoria',
    difficulty: 'Iniciante',
    image: 'url-da-imagem',
    videoUrl: 'url-do-video',
    description: 'Descrição do passo',
    instructions: [
      {
        step: 1,
        title: 'Instrução',
        description: 'Descrição da instrução',
        duration: 60, // em segundos
        image: 'url-da-imagem',
        tips: ['Dica 1', 'Dica 2'],
        focusArea: 'Área de foco'
      }
    ],
    tips: ['Dica geral 1', 'Dica geral 2'],
    commonMistakes: ['Erro comum 1', 'Erro comum 2'],
    timeMarkers: [
      {
        time: 30,
        title: 'Marcador',
        description: 'Descrição do marcador'
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: 'Pergunta?',
          options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
          correct: 1, // índice da resposta correta
          explanation: 'Explicação da resposta'
        }
      ]
    },
    resources: [
      {
        name: 'Nome do Recurso',
        type: 'pdf',
        size: '1.2 MB'
      }
    ]
  }
]
```

## 🎨 Exemplos de Uso

### Uso Básico

```jsx
<InteractiveLesson />
```

### Com Dados Customizados

```jsx
<InteractiveLesson
  tutorialData={myTutorialData}
  steps={mySteps}
  categories={myCategories}
/>
```

### Com Callbacks

```jsx
<InteractiveLesson
  onStepChange={(stepIndex, stepData) => {
    console.log('Passo mudou:', stepIndex, stepData)
  }}
  onStepComplete={(stepIndex, isCompleted, allCompleted) => {
    console.log('Passo completo:', stepIndex, isCompleted)
  }}
  onFavoriteToggle={(stepIndex, isFavorite, allFavorites) => {
    console.log('Favorito:', stepIndex, isFavorite)
  }}
/>
```

### Com Configurações Específicas

```jsx
<InteractiveLesson
  initialStep={2}
  showSidebar={false}
  showDarkMode={false}
  className="my-custom-class"
/>
```

## 🎯 Callbacks Detalhados

### onStepChange

```jsx
const handleStepChange = (stepIndex, stepData) => {
  // stepIndex: número do passo atual
  // stepData: objeto completo do passo
  console.log('Passo atual:', stepIndex)
  console.log('Dados do passo:', stepData)
}
```

### onStepComplete

```jsx
const handleStepComplete = (stepIndex, isCompleted, allCompletedSteps) => {
  // stepIndex: índice do passo
  // isCompleted: boolean se foi marcado como completo
  // allCompletedSteps: array com todos os passos completos
  console.log('Passo completo:', stepIndex, isCompleted)
  console.log('Todos os completos:', allCompletedSteps)
}
```

### onFavoriteToggle

```jsx
const handleFavoriteToggle = (stepIndex, isFavorite, allFavoriteSteps) => {
  // stepIndex: índice do passo
  // isFavorite: boolean se foi marcado como favorito
  // allFavoriteSteps: array com todos os favoritos
  console.log('Favorito:', stepIndex, isFavorite)
  console.log('Todos os favoritos:', allFavoriteSteps)
}
```

## 🎨 Customização de Estilo

### Classes CSS

```jsx
<InteractiveLesson
  className="my-tutorial-container border-2 border-blue-200 rounded-lg"
/>
```

### Props Adicionais

```jsx
<InteractiveLesson
  data-testid="interactive-lesson"
  aria-label="Tutorial Interativo"
  role="main"
/>
```

## 📱 Responsividade

O componente é totalmente responsivo e se adapta a:

- **Desktop**: Layout completo com sidebar horizontal
- **Tablet**: Layout adaptado com cards empilhados
- **Mobile**: Interface otimizada para touch

## 🎬 Recursos de Vídeo

- **Controles customizados**: Play/pause, mute, fullscreen
- **Marcadores de tempo**: Navegação rápida para pontos específicos
- **Overlay de controles**: Interface moderna e intuitiva
- **Suporte a YouTube**: URLs de embed automáticas

## 🧩 Funcionalidades Avançadas

- **Sistema de quiz**: Perguntas com feedback imediato
- **Recursos downloadáveis**: PDFs, documentos, etc.
- **Timer de passo**: Contagem regressiva para instruções
- **Animações**: Transições suaves com Framer Motion
- **Modo escuro**: Toggle automático com persistência

## 🔧 Desenvolvimento

### Estrutura do Componente

```
InteractiveLesson/
├── InteractiveLesson.jsx          # Componente principal
├── InteractiveLessonExample.jsx   # Exemplo de uso
└── README.md                      # Esta documentação
```

### Dependências

- `react`: ^18.0.0
- `framer-motion`: ^10.0.0
- `lucide-react`: ^0.400.0
- `tailwindcss`: ^3.0.0

## 🚀 Próximos Passos

1. **Integre o componente** em sua aplicação
2. **Customize os dados** conforme sua necessidade
3. **Configure os callbacks** para tracking
4. **Ajuste o estilo** com classes CSS
5. **Teste a responsividade** em diferentes dispositivos

## 📞 Suporte

Para dúvidas sobre os tutoriais do Sistema Lukos, entre em contato:
- **Telefone:** (11) 4858-8429
- **Email:** suporte@lukos.com.br
- **Atendimento:** Segunda a sexta-feira das 08h30 às 17h30

Para dúvidas técnicas sobre o componente, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Este componente é parte do projeto Tutoriais Lukos e está sujeito aos termos de uso da Lukos Soluções em Tecnologia.
