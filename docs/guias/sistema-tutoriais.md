# Sistema de Tutoriais Lukos - Guia de Uso

## 🎯 Visão Geral

O sistema de tutoriais Lukos foi criado para fornecer uma experiência de aprendizado completa e interativa para usuários do sistema Lukos. Cada tutorial é uma página individual que utiliza o componente `InteractiveLesson` para oferecer uma experiência rica em vídeos, instruções passo a passo, quizzes e recursos.

## 🗂️ Estrutura do Sistema

### 1. **Página Principal de Tutoriais** (`/tutoriais`)
- Lista todas as categorias disponíveis
- Mostra tutoriais em destaque
- Estatísticas da plataforma
- Navegação fácil para cada categoria

### 2. **Página de Categoria** (`/categoria/:category`)
- Lista todos os tutoriais de uma categoria específica
- Filtros por subcategoria
- Estatísticas da categoria
- Cards interativos para cada tutorial

### 3. **Página Individual do Tutorial** (`/tutorial/:tutorialId`)
- Tutorial completo usando o componente `InteractiveLesson`
- Navegação entre passos
- Sistema de progresso
- Recursos downloadáveis

## 📋 Tutoriais Disponíveis

### **Retaguarda**
- **Cadastro de Clientes** (`/tutorial/cadastro-clientes`)
  - Cadastro com CPF e CNPJ
  - Configuração de faturamento
  - Validação de documentos

- **Cadastro de Produtos** (`/tutorial/cadastro-produtos`)
  - Produtos com e sem código de barras
  - Criação de KITs
  - Configuração de preços

- **Gestão Financeira** (`/tutorial/gestao-financeira`)
  - Contas a pagar e receber
  - Faturamento
  - Fluxo de caixa

### **PDV**
- **Operações de Pista** (`/tutorial/operacoes-pista`)
  - Aferição de bombas
  - Venda de combustível
  - Encerramento de turno

- **Operações de Loja** (`/tutorial/operacoes-loja`)
  - Venda de produtos
  - Serviços
  - Códigos rápidos

### **Dashboard**
- **Dashboard e Relatórios** (`/tutorial/dashboard-relatorios`)
  - Dashboard principal
  - Relatórios comerciais
  - Relatórios financeiros

### **Fatura Web**
- **Fatura Web** (`/tutorial/fatura-web`)
  - Cadastro no sistema
  - Gestão de frota
  - Requisições de abastecimento

## 🔗 Como Criar Links para os Tutoriais

### 1. **Links Diretos para Tutoriais**
```jsx
// Link para tutorial específico
<Link to="/tutorial/cadastro-clientes">
  Cadastro de Clientes
</Link>

// Link para categoria
<Link to="/categoria/Retaguarda">
  Tutoriais de Retaguarda
</Link>

// Link para página principal
<Link to="/tutoriais">
  Todos os Tutoriais
</Link>
```

### 2. **Navegação Programática**
```jsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// Navegar para tutorial específico
const goToTutorial = (tutorialId) => {
  navigate(`/tutorial/${tutorialId}`)
}

// Navegar para categoria
const goToCategory = (category) => {
  navigate(`/categoria/${category}`)
}
```

### 3. **Cards de Tutorial**
```jsx
import { Link } from 'react-router-dom'

const TutorialCard = ({ tutorial }) => (
  <Link 
    to={`/tutorial/${tutorial.id}`}
    className="tutorial-card"
  >
    <img src={tutorial.image} alt={tutorial.title} />
    <h3>{tutorial.title}</h3>
    <p>{tutorial.description}</p>
    <span className="difficulty">{tutorial.difficulty}</span>
    <span className="duration">{tutorial.duration}</span>
  </Link>
)
```

## 🎨 Personalização

### 1. **Adicionar Novos Tutoriais**
Para adicionar um novo tutorial, edite o arquivo `src/data/lukosTutorials.js`:

```javascript
export const lukosTutorials = {
  // ... tutoriais existentes
  
  'novo-tutorial': {
    id: 'novo-tutorial',
    title: 'Novo Tutorial',
    category: 'Categoria',
    subcategory: 'Subcategoria',
    difficulty: 'Iniciante',
    duration: '30min',
    description: 'Descrição do tutorial',
    image: 'url-da-imagem',
    videoUrl: 'url-do-video',
    steps: [
      {
        step: 1,
        title: 'Primeiro Passo',
        description: 'Descrição do passo',
        duration: 180,
        image: 'url-da-imagem',
        tips: ['Dica 1', 'Dica 2'],
        focusArea: 'Área de foco'
      }
    ],
    tips: ['Dica geral 1', 'Dica geral 2'],
    commonMistakes: ['Erro comum 1', 'Erro comum 2'],
    resources: [
      { name: 'Manual', type: 'pdf', size: '1.2 MB' }
    ]
  }
}
```

### 2. **Personalizar Componente InteractiveLesson**
```jsx
<InteractiveLesson
  tutorialData={customTutorialData}
  steps={customSteps}
  categories={customCategories}
  initialStep={0}
  showSidebar={true}
  showDarkMode={true}
  onStepChange={(stepIndex, stepData) => {
    // Lógica personalizada quando o passo muda
  }}
  onStepComplete={(stepIndex, isCompleted, completedSteps) => {
    // Lógica personalizada quando passo é concluído
  }}
  onFavoriteToggle={(stepIndex, isFavorite, favoriteSteps) => {
    // Lógica personalizada quando favorito é toggleado
  }}
  className="custom-tutorial-class"
/>
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Layout completo com sidebar horizontal
- **Tablet**: Layout adaptado com cards empilhados
- **Mobile**: Interface otimizada para touch

## 🎯 Funcionalidades Avançadas

### 1. **Sistema de Progresso**
- Tracking automático de passos concluídos
- Barra de progresso visual
- Persistência do estado

### 2. **Sistema de Favoritos**
- Marcar tutoriais como favoritos
- Lista de favoritos persistente
- Indicadores visuais

### 3. **Modo Escuro/Claro**
- Toggle automático
- Persistência da preferência
- Transições suaves

### 4. **Sistema de Quiz**
- Perguntas interativas
- Feedback imediato
- Explicações detalhadas

## 🔧 Desenvolvimento

### Estrutura de Arquivos
```
src/
├── data/
│   └── lukosTutorials.js          # Dados dos tutoriais
├── pages/
│   ├── TutorialsHomePage.js        # Página principal
│   ├── CategoryTutorialsPage.js   # Página de categoria
│   └── TutorialPage.js            # Página individual
├── components/
│   └── InteractiveLesson/
│       ├── InteractiveLesson.jsx  # Componente principal
│       ├── InteractiveLessonExample.jsx
│       └── README.md
└── App.js                         # Rotas configuradas
```

### Dependências
- `react-router-dom`: Navegação entre páginas
- `framer-motion`: Animações
- `lucide-react`: Ícones
- `tailwindcss`: Estilização

## 📞 Suporte

Para dúvidas sobre os tutoriais do Sistema Lukos:
- **Telefone:** (11) 4858-8429
- **Email:** suporte@lukos.com.br
- **Atendimento:** Segunda a sexta-feira das 08h30 às 17h30

## 🚀 Próximos Passos

1. **Teste o sistema** navegando pelos tutoriais
2. **Personalize** conforme suas necessidades
3. **Adicione novos tutoriais** conforme necessário
4. **Integre** com seu sistema de autenticação
5. **Monitore** o progresso dos usuários

---

**Referência:** [Tutoriais Lukos - Site Oficial](https://sites.google.com/view/lukos-tutoriais/retaguarda)

