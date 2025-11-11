# 📚 Guia: Como Adicionar/Editar Tutoriais

## 📍 Onde os Tutoriais Estão Armazenados

Os tutoriais estão armazenados em dois arquivos principais:

1. **`src/shared/data/__mocks__/retaguardaTutorials.js`** - Tutoriais da Retaguarda
2. **`src/shared/data/__mocks__/lukosTutorials.js`** - Tutoriais Gerais do Lukos

## 📋 Estrutura de um Tutorial

Cada tutorial precisa seguir esta estrutura:

```javascript
'id-do-tutorial': {
  // Informações básicas (OBRIGATÓRIO)
  id: 'id-do-tutorial',                    // ID único (mesmo nome da chave)
  title: 'Título do Tutorial',             // Título exibido
  category: 'Cadastros',                   // Categoria (Cadastros, PDV, etc.)
  subcategory: 'Subcategoria',            // Subcategoria opcional
  difficulty: 'Iniciante',                 // Iniciante, Intermediário, Avançado
  duration: '15min',                       // Duração total (ex: '15min', '1h 30min')
  description: 'Descrição do tutorial...', // Descrição curta
  
  // Mídia (RECOMENDADO)
  image: 'https://url-da-imagem.jpg',      // Imagem de capa
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID', // URL do vídeo do YouTube
  
  // Passos do Tutorial (OBRIGATÓRIO)
  steps: [
    {
      step: 1,                             // Número do passo
      title: 'Título do Passo',            // Título do passo
      description: 'Descrição detalhada...', // Descrição do que fazer
      duration: 120,                       // Duração em segundos OU '5min'
      image: 'https://url-imagem-passo.jpg', // Imagem do passo (opcional)
      tips: 'Dica importante',             // Dica para este passo (opcional)
      focusArea: 'Área de foco',          // Área de foco (opcional)
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID', // Vídeo específico (opcional)
      completed: false                    // Se já foi completado (opcional)
    },
    // ... mais passos
  ],
  
  // Informações adicionais (OPCIONAL)
  tips: [                                  // Dicas gerais do tutorial
    'Dica 1',
    'Dica 2'
  ],
  commonMistakes: [                        // Erros comuns
    'Erro comum 1',
    'Erro comum 2'
  ],
  timeMarkers: [                           // Marcadores de tempo do vídeo
    { time: '00:00', title: 'Introdução' },
    { time: '05:00', title: 'Passo 1' }
  ],
  quiz: {                                  // Quiz (opcional)
    question: 'Pergunta?',
    options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
    correct: 0                             // Índice da resposta correta
  },
  resources: [                             // Recursos para download
    { type: 'PDF', name: 'Manual', url: '#' },
    { type: 'DOCX', name: 'Checklist', url: '#' }
  ]
}
```

## ➕ Como Adicionar um Novo Tutorial

### Passo 1: Abrir o arquivo correto

- Para tutoriais de **Retaguarda**: `src/shared/data/__mocks__/retaguardaTutorials.js`
- Para tutoriais **Gerais**: `src/shared/data/__mocks__/lukosTutorials.js`

### Passo 2: Adicionar o tutorial no objeto

```javascript
export const retaguardaTutorials = {
  // ... tutoriais existentes ...
  
  'meu-novo-tutorial': {
    id: 'meu-novo-tutorial',
    title: 'Meu Novo Tutorial',
    category: 'Cadastros',
    difficulty: 'Iniciante',
    duration: '10min',
    description: 'Descrição do meu tutorial',
    image: 'https://via.placeholder.com/400x250?text=Meu+Tutorial',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    steps: [
      {
        step: 1,
        title: 'Primeiro Passo',
        description: 'Descrição do primeiro passo',
        duration: 120, // 2 minutos em segundos
        image: 'https://via.placeholder.com/300x200?text=Passo+1',
        tips: 'Dica importante',
        focusArea: 'Navegação'
      },
      {
        step: 2,
        title: 'Segundo Passo',
        description: 'Descrição do segundo passo',
        duration: 180, // 3 minutos
        image: 'https://via.placeholder.com/300x200?text=Passo+2'
      }
    ],
    tips: [
      'Dica geral 1',
      'Dica geral 2'
    ]
  }
}
```

### Passo 3: Acessar o tutorial

Após adicionar, o tutorial estará disponível em:
- URL: `http://localhost:3000/tutorial/meu-novo-tutorial`

## ✏️ Como Editar um Tutorial Existente

### Exemplo: Editar o tutorial "unidades-operacionais"

1. Abra `src/shared/data/__mocks__/retaguardaTutorials.js`
2. Encontre o tutorial `'unidades-operacionais'`
3. Edite os campos desejados:

```javascript
'unidades-operacionais': {
  id: 'unidades-operacionais',
  title: 'Unidades Operacionais - ATUALIZADO', // ← Edite aqui
  // ... resto do tutorial
  steps: [
    {
      step: 1,
      title: 'Novo Título do Passo', // ← Edite aqui
      description: 'Nova descrição...', // ← Edite aqui
      duration: 150, // ← Edite aqui
      // ... resto do passo
    }
  ]
}
```

## 🎥 Como Adicionar Vídeo do YouTube

### Opção 1: Vídeo Principal (para todo o tutorial)

```javascript
videoUrl: 'https://www.youtube.com/embed/sjWk3XpdH3s?si=Zv2L029tcGpfA30W'
```

### Opção 2: Vídeo por Passo

```javascript
steps: [
  {
    step: 1,
    title: 'Passo 1',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1', // ← Vídeo específico
    // ...
  },
  {
    step: 2,
    title: 'Passo 2',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2', // ← Vídeo diferente
    // ...
  }
]
```

**Como obter a URL do YouTube:**
1. Vá ao vídeo no YouTube
2. Clique em "Compartilhar" → "Incorporar"
3. Copie o código do iframe
4. Extraia a URL do `src`, exemplo: `https://www.youtube.com/embed/VIDEO_ID`

## 📝 Exemplo Completo

```javascript
'cadastro-produtos': {
  id: 'cadastro-produtos',
  title: 'Cadastro de Produtos',
  category: 'Cadastros',
  subcategory: 'Produtos',
  difficulty: 'Iniciante',
  duration: '20min',
  description: 'Aprenda a cadastrar produtos no sistema Lukos com códigos de barras, preços e estoque.',
  image: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  steps: [
    {
      step: 1,
      title: 'Acessar Cadastro de Produtos',
      description: 'Navegue até o módulo de cadastros e selecione "Produtos"',
      duration: 60,
      image: 'https://via.placeholder.com/300x200?text=Passo+1',
      tips: 'Certifique-se de ter permissão de cadastro',
      focusArea: 'Navegação'
    },
    {
      step: 2,
      title: 'Preencher Dados do Produto',
      description: 'Preencha nome, código de barras, preço e informações do produto',
      duration: 300,
      image: 'https://via.placeholder.com/300x200?text=Passo+2',
      tips: 'Use códigos de barras únicos',
      focusArea: 'Cadastro'
    },
    {
      step: 3,
      title: 'Configurar Estoque',
      description: 'Configure quantidade inicial e alertas de estoque',
      duration: 180,
      image: 'https://via.placeholder.com/300x200?text=Passo+3',
      tips: 'Configure alertas para evitar falta de estoque',
      focusArea: 'Configuração'
    }
  ],
  tips: [
    'Sempre verifique se o produto já existe antes de cadastrar',
    'Use códigos de barras padronizados',
    'Configure preços e margens corretamente'
  ],
  commonMistakes: [
    'Cadastrar produtos duplicados',
    'Esquecer de configurar estoque inicial',
    'Usar códigos de barras inválidos'
  ],
  timeMarkers: [
    { time: '00:00', title: 'Introdução' },
    { time: '02:00', title: 'Acessar Cadastro' },
    { time: '05:00', title: 'Preencher Dados' },
    { time: '10:00', title: 'Configurar Estoque' },
    { time: '15:00', title: 'Conclusão' }
  ],
  quiz: {
    question: 'Qual é a importância de usar códigos de barras únicos?',
    options: [
      'Evitar duplicação de produtos',
      'Facilitar a busca',
      'Melhorar a organização',
      'Todas as alternativas'
    ],
    correct: 3
  },
  resources: [
    { type: 'PDF', name: 'Manual de Cadastro de Produtos', url: '#' },
    { type: 'XLSX', name: 'Planilha de Importação', url: '#' }
  ]
}
```

## 🔍 Verificar se o Tutorial Funciona

1. Salve o arquivo
2. Acesse: `http://localhost:3000/tutorial/id-do-tutorial`
3. Verifique se:
   - O título aparece corretamente
   - Os passos estão listados
   - As imagens carregam
   - Os vídeos funcionam (se adicionados)

## 💡 Dicas Importantes

1. **ID único**: Use sempre o mesmo ID na chave e no objeto
2. **Duração**: Pode ser número (segundos) ou string ('5min', '1h 30min')
3. **Imagens**: Use URLs válidas ou placeholders
4. **Vídeos**: Prefira vídeos do YouTube (formato embed)
5. **Steps**: Mínimo de 1 passo, idealmente 3-10 passos
6. **Categorias**: Use categorias existentes ou crie novas consistentes

## 🚀 Próximos Passos

Após adicionar o tutorial, ele será automaticamente:
- Exibido no componente `CourseDetail`
- Organizado em módulos (se tiver mais de 5 passos)
- Acessível pela URL `/tutorial/id-do-tutorial`
- Convertido para o formato correto pelo `TutorialPage`

