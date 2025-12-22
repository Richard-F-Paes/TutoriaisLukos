# 📚 Guia Completo do Sistema de Tutoriais

Este guia reúne todas as informações necessárias para trabalhar com o sistema de tutoriais Lukos, incluindo como adicionar tutoriais, ajustar imagens e elementos visuais.

## 📑 Índice

1. [Como Adicionar/Editar Tutoriais](#como-adicionareditar-tutoriais)
2. [Como Ajustar Imagens e Elementos Visuais](#como-ajustar-imagens-e-elementos-visuais)
3. [Estrutura do Sistema](#estrutura-do-sistema)

---

## Como Adicionar/Editar Tutoriais

### 📍 Onde os Tutoriais Estão Armazenados

Os tutoriais estão armazenados no banco de dados através da API backend. Para desenvolvimento local, os tutoriais podem ser encontrados em:

- **Backend**: Banco de dados através do Prisma ORM
- **Frontend**: Gerenciados através do painel administrativo

### 📋 Estrutura de um Tutorial

Cada tutorial precisa seguir esta estrutura:

```javascript
{
  // Informações básicas (OBRIGATÓRIO)
  id: 'id-do-tutorial',                    // ID único
  title: 'Título do Tutorial',             // Título exibido
  slug: 'slug-do-tutorial',                // Slug para URL
  categoryId: 1,                           // ID da categoria
  description: 'Descrição do tutorial...', // Descrição curta
  difficulty: 'iniciante',                 // iniciante, intermediario, avancado
  estimatedDuration: 15,                   // Duração em minutos
  thumbnailUrl: 'https://url-da-imagem.jpg', // Imagem de capa
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID', // URL do vídeo do YouTube
  content: '<p>Conteúdo HTML do TipTap...</p>', // Conteúdo HTML do editor
  
  // Informações de publicação
  isPublished: true,                       // Se está publicado
  isFeatured: false,                       // Se está em destaque
  viewCount: 0,                           // Contador de visualizações
  
  // Metadados
  metaTitle: 'Meta Title',                // Para SEO
  metaDescription: 'Meta Description',    // Para SEO
  tags: '["tag1", "tag2"]',              // Tags em JSON
  
  // Relações
  createdBy: 1,                           // ID do usuário criador
  updatedBy: 1,                           // ID do usuário que atualizou
  
  // Passos do Tutorial (TutorialStep)
  tutorialSteps: [
    {
      step: 1,                             // Número do passo
      title: 'Título do Passo',            // Título do passo
      content: '<p>Descrição HTML...</p>', // Conteúdo do passo
      sortOrder: 1,                        // Ordem de exibição
      duration: 120,                       // Duração em minutos
      imageUrl: 'https://url-imagem-passo.jpg', // Imagem do passo (opcional)
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID', // Vídeo específico (opcional)
    },
    // ... mais passos
  ]
}
```

### ➕ Como Adicionar um Novo Tutorial

#### Via Interface Administrativa

1. Acesse o painel administrativo
2. Navegue até "Tutoriais" → "Novo Tutorial"
3. Preencha os campos obrigatórios:
   - Título
   - Slug (será gerado automaticamente se não fornecido)
   - Categoria
   - Descrição
   - Conteúdo (usando o editor TipTap)
4. Adicione passos do tutorial
5. Configure imagens e vídeos
6. Defina dificuldade e duração estimada
7. Publique quando estiver pronto

#### Via API/Backend

Use a rota `POST /api/tutorials` com os dados do tutorial:

```javascript
const novoTutorial = {
  title: 'Meu Novo Tutorial',
  slug: 'meu-novo-tutorial',
  categoryId: 1,
  description: 'Descrição do tutorial',
  content: '<p>Conteúdo HTML...</p>',
  difficulty: 'iniciante',
  estimatedDuration: 15,
  thumbnailUrl: 'https://url-da-imagem.jpg',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  tutorialSteps: [
    {
      title: 'Primeiro Passo',
      content: '<p>Descrição do primeiro passo</p>',
      sortOrder: 1,
      duration: 5
    }
  ]
}
```

### ✏️ Como Editar um Tutorial Existente

1. Acesse o painel administrativo
2. Navegue até "Tutoriais" → Selecione o tutorial
3. Edite os campos desejados
4. Adicione, edite ou remova passos
5. Salve as alterações

### 🎥 Como Adicionar Vídeo do YouTube

#### Vídeo Principal (para todo o tutorial)

```javascript
videoUrl: 'https://www.youtube.com/embed/sjWk3XpdH3s?si=Zv2L029tcGpfA30W'
```

#### Vídeo por Passo

```javascript
tutorialSteps: [
  {
    step: 1,
    title: 'Passo 1',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1', // ← Vídeo específico
    // ...
  }
]
```

**Como obter a URL do YouTube:**
1. Vá ao vídeo no YouTube
2. Clique em "Compartilhar" → "Incorporar"
3. Copie o código do iframe
4. Extraia a URL do `src`, exemplo: `https://www.youtube.com/embed/VIDEO_ID`

### 💡 Dicas Importantes

1. **Slug único**: Use sempre slugs únicos e descritivos
2. **Duração**: Especifique em minutos (número inteiro)
3. **Imagens**: Use URLs válidas ou faça upload via API de mídia
4. **Vídeos**: Prefira vídeos do YouTube (formato embed)
5. **Passos**: Mínimo de 1 passo, idealmente 3-10 passos
6. **Categorias**: Use categorias existentes ou crie novas no sistema

---

## Como Ajustar Imagens e Elementos Visuais

### 📍 Onde Ajustar Imagens

#### 1. **Imagem Principal do Tutorial (Thumbnail)**

**Onde definir:**
- No campo `thumbnailUrl` do tutorial
- Via upload de mídia através da API

**Como ajustar:**

```javascript
{
  thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  // ou URL da imagem hospedada
  thumbnailUrl: 'https://exemplo.com/imagens/tutorial.jpg',
  // ou caminho relativo se hospedado no projeto
  thumbnailUrl: '/imagens/tutorial.jpg'
}
```

**Onde é exibida:**
- Cards de tutoriais na listagem
- Banner superior da página do tutorial
- Compartilhamento em redes sociais (via meta tags)

#### 2. **Imagens dos Passos/Steps**

**Onde definir:**
- No campo `imageUrl` de cada passo do tutorial

**Como ajustar:**

```javascript
tutorialSteps: [
  {
    step: 1,
    title: 'Acessar Unidades Operacionais',
    imageUrl: 'https://via.placeholder.com/300x200?text=Passo+1',
    // ou
    imageUrl: '/imagens/passo1-unidades.jpg',
  }
]
```

#### 3. **Thumbnails de Vídeos do YouTube**

**Como obter automaticamente:**

Se você usar um vídeo do YouTube, a thumbnail é gerada automaticamente:

```javascript
videoUrl: 'https://www.youtube.com/embed/sjWk3XpdH3s'
// Thumbnail automática: https://img.youtube.com/vi/sjWk3XpdH3s/maxresdefault.jpg
```

**Formatos disponíveis:**
- `maxresdefault.jpg` - Máxima resolução (1280x720)
- `hqdefault.jpg` - Alta qualidade (480x360)
- `mqdefault.jpg` - Média qualidade (320x180)
- `sddefault.jpg` - Qualidade padrão (640x480)

**Exemplo:**

```javascript
thumbnailUrl: 'https://img.youtube.com/vi/sjWk3XpdH3s/maxresdefault.jpg'
```

### 🎨 Personalização de Estilos

Os estilos do sistema são gerenciados principalmente através de:

1. **Tailwind CSS**: Classes utilitárias para estilização
2. **Componentes UI**: Baseados em shadcn/ui e Radix UI
3. **Design System**: Arquivo `src/styles/design-system.css`

Para ajustes de cores e estilos globais, edite:
- `src/styles/design-system.css` - Variáveis CSS e estilos base
- `src/index.css` - Estilos globais
- Componentes individuais em `src/presentation/components/`

### 📁 Onde Colocar Imagens Locais

#### Opção 1: Pasta `public`

1. Crie a pasta: `public/imagens/`
2. Coloque suas imagens lá: `public/imagens/unidades-operacionais.jpg`
3. Use no tutorial:
```javascript
thumbnailUrl: '/imagens/unidades-operacionais.jpg'
```

#### Opção 2: Upload via API de Mídia

1. Faça upload da imagem através da API `/api/media/upload`
2. Use a URL retornada pela API no campo `thumbnailUrl` ou `imageUrl`

**Recomendação:** Use o sistema de upload de mídia para melhor organização e gerenciamento.

### 🖼️ Tamanhos Recomendados de Imagens

#### Imagem Principal (Thumbnail)
- **Recomendado:** 1280x720px (16:9)
- **Mínimo:** 800x450px
- **Formato:** JPG ou PNG
- **Peso:** Máximo 500KB

#### Imagens dos Passos
- **Recomendado:** 800x600px (4:3)
- **Mínimo:** 400x300px
- **Formato:** JPG ou PNG
- **Peso:** Máximo 200KB

### 💡 Dicas

1. **Use imagens do YouTube:** Se o tutorial tem vídeo do YouTube, use a thumbnail automática
2. **Otimize imagens:** Comprima antes de adicionar (use TinyPNG ou similar)
3. **Nomes descritivos:** Use nomes claros para imagens locais
4. **Teste responsividade:** Verifique como as imagens aparecem em mobile
5. **Fallback:** O sistema já tem fallback automático se a imagem não carregar

---

## Estrutura do Sistema

### 🗂️ Arquitetura

O sistema é composto por:

#### Frontend
- **React 18** com **Vite**
- **React Router** para navegação
- **TipTap** para editor de conteúdo rich text
- **TanStack Query** para gerenciamento de estado servidor
- **Tailwind CSS** para estilização

#### Backend
- **Express.js** - Framework web Node.js
- **Prisma ORM** - Gerenciamento de banco de dados
- **SQL Server** - Banco de dados
- **JWT** - Autenticação
- **Multer** - Upload de arquivos

### 📂 Estrutura de Arquivos Principais

```
src/
├── presentation/
│   ├── pages/           # Páginas da aplicação
│   └── components/      # Componentes React
├── services/            # Serviços de API
├── contexts/            # Contextos React (Auth, Tutorial, etc.)
├── hooks/               # Custom hooks
└── infrastructure/      # Configurações e infraestrutura

backend/
├── src/
│   ├── routes/          # Rotas da API
│   ├── middleware/      # Middlewares
│   └── config/          # Configurações
└── prisma/
    └── schema.prisma    # Schema do banco de dados
```

### 🔗 Rotas Principais

- `/` - Página inicial
- `/tutoriais` - Lista de tutoriais
- `/tutorial/:slug` - Página individual do tutorial
- `/categoria/:slug` - Tutoriais por categoria
- `/admin` - Painel administrativo (requer autenticação)
- `/login` - Página de login

### 🎯 Funcionalidades Principais

1. **Sistema de Tutoriais**
   - Criação e edição de tutoriais
   - Passos interativos
   - Suporte a vídeos do YouTube
   - Sistema de progresso

2. **Categorias e Subcategorias**
   - Organização hierárquica
   - Filtros e busca
   - Metadados (ícones, cores)

3. **Autenticação e Autorização**
   - Login com JWT
   - Controle de permissões
   - Auditoria de ações

4. **Upload de Mídia**
   - Upload de imagens
   - Gerenciamento de arquivos
   - URLs públicas

5. **Sistema de Menus**
   - Menus do cabeçalho
   - Itens hierárquicos
   - Navegação dinâmica

---

## 📞 Suporte

Para dúvidas sobre o sistema de tutoriais:

- **Telefone**: (11) 4858-8429
- **Email**: suporte@lukos.com.br
- **Atendimento**: Segunda a sexta-feira das 08h30 às 17h30

---

**Última atualização**: 2025-01-20

