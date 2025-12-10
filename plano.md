# 📋 Plano de Migração: Sistema de Tutoriais Integrado ao Banco de Dados

> **Versão:** 1.0  
> **Data:** Dezembro 2025  
> **Status:** Planejamento

---

## 📌 Sumário Executivo

Este documento descreve o plano completo para migrar o sistema de tutoriais atualmente baseado em arquivos estáticos (`__mocks__`) para uma arquitetura integrada com API e banco de dados SQL Server. O sistema incluirá um **Viewer Universal de Tutoriais** com suporte a rich content (imagens, vídeos, textos) e um **Sistema de Autenticação** com dois níveis de acesso (Administrador e Suporte).

---

## 🎯 Objetivos do Projeto

### Objetivos Principais
1. **Migrar tutoriais estáticos para banco de dados SQL Server**
2. **Criar Viewer Universal** - Um único componente que renderiza todos os tutoriais dinamicamente
3. **Implementar autenticação integrada à API** com níveis de acesso
4. **Unificar todas as rotas `/tutoriais/*`** para usar o Viewer Universal
5. **Suporte completo a mídia**: textos formatados, imagens e vídeos

### Resultados Esperados
- Eliminação de arquivos de mock (`__mocks__/*.js`)
- Interface administrativa para CRUD de tutoriais
- Sistema de busca e navegação dinâmicos
- Performance otimizada com caching

---

## 🏗️ Arquitetura Proposta

### Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Vite)                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │
│  │   Viewer     │  │   Editor     │  │    Admin Panel           │   │
│  │  Universal   │  │   TipTap     │  │  (CRUD Tutoriais/Users)  │   │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘   │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Services Layer (API Client + Auth)               │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS/REST
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API EXTERNA (Existente)                     │
├─────────────────────────────────────────────────────────────────────┤
│  Endpoints:                                                         │
│  • /api/auth/* - Autenticação JWT                                   │
│  • /api/tutorials/* - CRUD Tutoriais                                │
│  • /api/categories/* - Categorias                                   │
│  • /api/users/* - Gestão de Usuários                                │
│  • /api/upload/* - Upload de Mídia                                  │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SQL SERVER (Banco de Dados)                  │
├─────────────────────────────────────────────────────────────────────┤
│  Tabelas: Users, Tutorials, Categories, Media, AuditLog             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Modelo de Dados

### Estrutura das Tabelas (SQL Server)

#### Tabela: `Users`
```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Role NVARCHAR(50) NOT NULL CHECK (Role IN ('admin', 'suporte')),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    LastLoginAt DATETIME2
);
```

#### Tabela: `Categories`
```sql
CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Slug NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(500),
    Icon NVARCHAR(50),
    Color NVARCHAR(20),
    ImageUrl NVARCHAR(500),
    SortOrder INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);
```

#### Tabela: `Tutorials`
```sql
CREATE TABLE Tutorials (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(300) NOT NULL,
    Slug NVARCHAR(300) NOT NULL UNIQUE,
    Description NVARCHAR(1000),
    Content NVARCHAR(MAX) NOT NULL,  -- Conteúdo HTML do TipTap
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
    ThumbnailUrl NVARCHAR(500),
    VideoUrl NVARCHAR(500),
    Difficulty NVARCHAR(20) CHECK (Difficulty IN ('iniciante', 'intermediario', 'avancado')),
    EstimatedDuration INT,  -- minutos
    ViewCount INT DEFAULT 0,
    IsPublished BIT DEFAULT 0,
    IsFeatured BIT DEFAULT 0,
    Tags NVARCHAR(500),  -- JSON array
    MetaTitle NVARCHAR(200),
    MetaDescription NVARCHAR(300),
    CreatedBy INT FOREIGN KEY REFERENCES Users(Id),
    UpdatedBy INT FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    PublishedAt DATETIME2
);
```

#### Tabela: `TutorialSteps`
```sql
CREATE TABLE TutorialSteps (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TutorialId INT FOREIGN KEY REFERENCES Tutorials(Id) ON DELETE CASCADE,
    Title NVARCHAR(300) NOT NULL,
    Content NVARCHAR(MAX),  -- Conteúdo HTML
    VideoUrl NVARCHAR(500),
    ImageUrl NVARCHAR(500),
    SortOrder INT NOT NULL,
    Duration INT,  -- minutos
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);
```

#### Tabela: `Media`
```sql
CREATE TABLE Media (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FileName NVARCHAR(255) NOT NULL,
    OriginalName NVARCHAR(255) NOT NULL,
    MimeType NVARCHAR(100) NOT NULL,
    Size BIGINT NOT NULL,
    Url NVARCHAR(500) NOT NULL,
    ThumbnailUrl NVARCHAR(500),
    UploadedBy INT FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
```

#### Tabela: `AuditLog`
```sql
CREATE TABLE AuditLog (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT FOREIGN KEY REFERENCES Users(Id),
    Action NVARCHAR(100) NOT NULL,
    EntityType NVARCHAR(50) NOT NULL,
    EntityId INT,
    OldValues NVARCHAR(MAX),  -- JSON
    NewValues NVARCHAR(MAX),  -- JSON
    IpAddress NVARCHAR(50),
    UserAgent NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
```

---

## 🔐 Sistema de Autenticação e Permissões

### Níveis de Acesso

| Nível | Permissões |
|-------|------------|
| **Administrador** | • Criar, editar, excluir tutoriais<br>• Gerenciar categorias<br>• Gerenciar usuários (criar, editar, excluir)<br>• Acessar logs de auditoria<br>• Configurações do sistema |
| **Suporte** | • Criar e editar tutoriais<br>• Upload de mídia<br>• Visualizar categorias<br>• **NÃO PODE**: excluir tutoriais, gerenciar usuários |

### Fluxo de Autenticação

```
1. Usuário acessa /admin ou clica em "Login"
2. Modal de Login é exibido
3. Credenciais enviadas para API: POST /api/auth/login
4. API valida no SQL Server e retorna JWT + Refresh Token
5. Frontend armazena tokens em sessionStorage (mais seguro)
6. Todas requisições incluem Bearer Token no header
7. Token expira em 24h, refresh token em 7 dias
8. Logout limpa tokens e redireciona
```

### Estrutura JWT Payload
```json
{
  "userId": 1,
  "username": "admin",
  "role": "admin",
  "permissions": ["create_tutorial", "edit_tutorial", "delete_tutorial", "manage_users"],
  "iat": 1701792000,
  "exp": 1701878400
}
```

---

## 🖼️ Viewer Universal de Tutoriais

### Conceito
Um único componente React que renderiza qualquer tutorial do banco de dados, substituindo as múltiplas páginas estáticas atuais.

### Características

1. **Renderização Dinâmica de Conteúdo**
   - HTML sanitizado do editor TipTap
   - Suporte a markdown convertido
   - Code blocks com syntax highlighting

2. **Suporte a Mídia**
   - Imagens responsivas com lazy loading
   - Vídeos embed (YouTube, Vimeo) e self-hosted
   - Galeria de imagens com lightbox

3. **Navegação**
   - Breadcrumbs dinâmicos
   - Navegação entre passos (se houver steps)
   - Links relacionados

4. **Modo de Edição Inline**
   - Usuários logados veem botão "Editar"
   - Editor TipTap abre no local
   - Salvamento automático (autosave)

### Estrutura do Componente

```
src/
└── presentation/
    └── components/
        └── TutorialViewer/
            ├── TutorialViewer.jsx          # Componente principal
            ├── TutorialViewer.css          # Estilos
            ├── TutorialContent.jsx         # Renderiza conteúdo HTML/Markdown
            ├── TutorialHeader.jsx          # Título, meta, breadcrumbs
            ├── TutorialMedia.jsx           # Player de vídeo, galeria
            ├── TutorialSteps.jsx           # Navegação entre passos
            ├── TutorialSidebar.jsx         # Índice, relacionados
            ├── TutorialActions.jsx         # Botões de ação (editar, compartilhar)
            └── TutorialEditor/             # Sub-componentes de edição
                ├── InlineEditor.jsx        # Editor TipTap inline
                ├── MediaUploader.jsx       # Upload de imagens/vídeos
                └── EditorToolbar.jsx       # Barra de ferramentas
```

---

## ✏️ Editor de Conteúdo (TipTap)

### Por que TipTap?

| Critério | TipTap | React Quill (atual) | Draft.js |
|----------|--------|---------------------|----------|
| Moderno (2025) | ✅ | ⚠️ Legado | ⚠️ Legado |
| Extensível | ✅ Excelente | ⚠️ Limitado | ⚠️ Complexo |
| TypeScript | ✅ Nativo | ❌ | ⚠️ |
| Colaboração | ✅ Yjs | ❌ | ❌ |
| Performance | ✅ ProseMirror | ⚠️ | ⚠️ |
| Imagens/Vídeos | ✅ Extensões | ⚠️ | ⚠️ |
| Comunidade | ✅ Ativa | ⚠️ Declínio | ⚠️ |

### Instalação

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-youtube @tiptap/extension-placeholder @tiptap/extension-link @tiptap/extension-table
```

### Extensões Necessárias

```javascript
const extensions = [
  StarterKit,              // Básico: bold, italic, headings, lists
  Image.configure({        // Imagens
    allowBase64: false,
    HTMLAttributes: {
      class: 'tutorial-image',
    },
  }),
  Youtube.configure({      // Vídeos YouTube
    width: 840,
    height: 472,
  }),
  Link.configure({         // Links
    openOnClick: false,
  }),
  Placeholder.configure({
    placeholder: 'Comece a escrever seu tutorial...',
  }),
  Table.configure({        // Tabelas
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
  CodeBlockLowlight,       // Code blocks com highlight
  TextAlign,               // Alinhamento de texto
  Underline,               // Sublinhado
  Highlight,               // Destaque/marca-texto
];
```

---

## 🛣️ Estrutura de Rotas

### Rotas Públicas (Antes → Depois)

| Rota Atual | Nova Rota | Componente |
|------------|-----------|------------|
| `/tutoriais` | `/tutoriais` | `TutorialsPage` (lista dinâmica) |
| `/retaguarda-tutoriais` | `/tutoriais?categoria=retaguarda` | Mesma página com filtro |
| `/tutorial/:tutorialId` | `/tutoriais/:slug` | `TutorialViewer` |
| `/categoria/:category` | `/tutoriais?categoria=:category` | Query param |
| Múltiplas páginas estáticas | Eliminadas | Viewer Universal |

### Rotas Protegidas

| Rota | Acesso | Componente |
|------|--------|------------|
| `/admin` | Admin, Suporte | `AdminDashboard` |
| `/admin/tutoriais` | Admin, Suporte | `TutorialManager` |
| `/admin/tutoriais/novo` | Admin, Suporte | `TutorialEditor` |
| `/admin/tutoriais/:id/editar` | Admin, Suporte | `TutorialEditor` |
| `/admin/usuarios` | **Apenas Admin** | `UserManager` |
| `/admin/categorias` | Admin, Suporte | `CategoryManager` |
| `/admin/media` | Admin, Suporte | `MediaLibrary` |
| `/admin/logs` | **Apenas Admin** | `AuditLogs` |

---

## 🔌 Integração com API

### Configuração do Cliente HTTP

Atualizar `src/infrastructure/api/client.js`:

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refreshToken
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', newRefreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, fazer logout
        sessionStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Endpoints da API

Atualizar `src/infrastructure/api/endpoints.js`:

```javascript
const API_VERSION = '/v1';

export const endpoints = {
  // Autenticação
  auth: {
    login: `${API_VERSION}/auth/login`,
    logout: `${API_VERSION}/auth/logout`,
    refresh: `${API_VERSION}/auth/refresh`,
    me: `${API_VERSION}/auth/me`,
  },
  
  // Tutoriais
  tutorials: {
    list: `${API_VERSION}/tutorials`,
    get: (slug) => `${API_VERSION}/tutorials/${slug}`,
    create: `${API_VERSION}/tutorials`,
    update: (id) => `${API_VERSION}/tutorials/${id}`,
    delete: (id) => `${API_VERSION}/tutorials/${id}`,
    search: `${API_VERSION}/tutorials/search`,
    byCategory: (categorySlug) => `${API_VERSION}/tutorials/category/${categorySlug}`,
    publish: (id) => `${API_VERSION}/tutorials/${id}/publish`,
    unpublish: (id) => `${API_VERSION}/tutorials/${id}/unpublish`,
  },
  
  // Passos dos Tutoriais
  steps: {
    list: (tutorialId) => `${API_VERSION}/tutorials/${tutorialId}/steps`,
    create: (tutorialId) => `${API_VERSION}/tutorials/${tutorialId}/steps`,
    update: (tutorialId, stepId) => `${API_VERSION}/tutorials/${tutorialId}/steps/${stepId}`,
    delete: (tutorialId, stepId) => `${API_VERSION}/tutorials/${tutorialId}/steps/${stepId}`,
    reorder: (tutorialId) => `${API_VERSION}/tutorials/${tutorialId}/steps/reorder`,
  },
  
  // Categorias
  categories: {
    list: `${API_VERSION}/categories`,
    get: (slug) => `${API_VERSION}/categories/${slug}`,
    create: `${API_VERSION}/categories`,
    update: (id) => `${API_VERSION}/categories/${id}`,
    delete: (id) => `${API_VERSION}/categories/${id}`,
  },
  
  // Usuários
  users: {
    list: `${API_VERSION}/users`,
    get: (id) => `${API_VERSION}/users/${id}`,
    create: `${API_VERSION}/users`,
    update: (id) => `${API_VERSION}/users/${id}`,
    delete: (id) => `${API_VERSION}/users/${id}`,
    changePassword: (id) => `${API_VERSION}/users/${id}/password`,
  },
  
  // Upload de Mídia
  media: {
    upload: `${API_VERSION}/media/upload`,
    list: `${API_VERSION}/media`,
    delete: (id) => `${API_VERSION}/media/${id}`,
  },
  
  // Auditoria
  audit: {
    logs: `${API_VERSION}/audit/logs`,
  },
};
```

---

## 🎨 Design System & UI/UX

### Princípios de Design (2025/2026)

1. **Glassmorphism Sutil**
   - Backgrounds com blur e transparência
   - Bordas suaves e luminosas
   - Evitar excesso - usar com moderação

2. **Motion Design**
   - Transições suaves com Framer Motion
   - Feedback imediato nas interações
   - Animações de entrada/saída de componentes

3. **Dark Mode Nativo**
   - Respeitar preferência do sistema
   - Toggle manual disponível
   - Cores ajustadas para cada modo

4. **Micro-interações**
   - Hover states elaborados
   - Loading states informativos
   - Toasts com ações

### Paleta de Cores

```css
:root {
  /* Cores Primárias - Azul Lukos */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  
  /* Cores de Acento - Roxo */
  --color-accent-500: #8b5cf6;
  --color-accent-600: #7c3aed;
  
  /* Cores Semânticas */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #06b6d4;
  
  /* Superfícies */
  --surface-1: #ffffff;
  --surface-2: #f8fafc;
  --surface-3: #f1f5f9;
  
  /* Dark Mode */
  --dark-surface-1: #0f172a;
  --dark-surface-2: #1e293b;
  --dark-surface-3: #334155;
}
```

### Tipografia

```css
:root {
  /* Fonte Principal - Moderna e Legível */
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Escalas */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

### Componentes de UI Necessários

| Componente | Biblioteca | Uso |
|------------|------------|-----|
| Buttons | shadcn/ui | Ações primárias/secundárias |
| Cards | shadcn/ui | Listagem de tutoriais |
| Modal/Dialog | Radix UI (já instalado) | Login, confirmações |
| Toast | react-hot-toast (já instalado) | Feedback |
| Tabs | Radix UI (já instalado) | Admin panel |
| Dropdown | Radix UI | Menus, seleção |
| Skeleton | Custom | Loading states |
| Input/Form | react-hook-form + zod (já instalados) | Formulários |

---

## 📁 Estrutura de Arquivos Proposta

```
src/
├── app/
│   ├── App.jsx                    # Rotas principais
│   └── providers.jsx              # Context providers
│
├── components/                    # Componentes base (shadcn/ui)
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
├── contexts/
│   ├── AuthContext.js             # ✏️ Atualizar para API
│   ├── TutorialContext.js         # ✏️ Atualizar para API
│   └── ThemeContext.js
│
├── hooks/
│   ├── useAuth.js                 # Hook de autenticação
│   ├── useTutorials.js            # ➕ NOVO: Hook para tutoriais
│   ├── useCategories.js           # ➕ NOVO: Hook para categorias
│   ├── useMedia.js                # ➕ NOVO: Hook para uploads
│   └── usePermissions.js          # ✏️ Atualizar permissões
│
├── infrastructure/
│   ├── api/
│   │   ├── client.js              # ✏️ Atualizar interceptors
│   │   └── endpoints.js           # ✏️ Atualizar endpoints
│   ├── auth/
│   │   ├── authService.js         # ✏️ Integrar com API
│   │   └── tokenService.js        # ✏️ Refresh token
│   └── config/
│       └── app.config.js          # ✏️ Adicionar configs
│
├── presentation/
│   ├── components/
│   │   ├── TutorialViewer/        # ➕ NOVO: Viewer Universal
│   │   │   ├── TutorialViewer.jsx
│   │   │   ├── TutorialViewer.css
│   │   │   ├── TutorialContent.jsx
│   │   │   ├── TutorialHeader.jsx
│   │   │   ├── TutorialMedia.jsx
│   │   │   ├── TutorialSteps.jsx
│   │   │   └── TutorialSidebar.jsx
│   │   │
│   │   ├── TutorialEditor/        # ➕ NOVO: Editor TipTap
│   │   │   ├── TutorialEditor.jsx
│   │   │   ├── TutorialEditor.css
│   │   │   ├── EditorToolbar.jsx
│   │   │   ├── MediaUploader.jsx
│   │   │   └── extensions/
│   │   │       ├── ImageNode.jsx
│   │   │       └── VideoNode.jsx
│   │   │
│   │   ├── Admin/                 # ✏️ Refatorar
│   │   │   ├── TutorialManager.jsx
│   │   │   ├── UserManager.jsx    # ➕ NOVO
│   │   │   ├── CategoryManager.jsx # ➕ NOVO
│   │   │   └── MediaLibrary.jsx   # ➕ NOVO
│   │   │
│   │   └── ... (outros componentes)
│   │
│   └── pages/
│       ├── public/
│       │   ├── TutorialsPage.jsx  # ✏️ Refatorar para dinâmico
│       │   ├── TutorialViewPage.jsx # ➕ NOVO: Usa TutorialViewer
│       │   └── ... (manter outras)
│       │
│       └── admin/
│           ├── AdminDashboard.jsx # ➕ NOVO
│           ├── AdminPage.jsx      # ✏️ Refatorar
│           └── ... 
│
├── services/                      # ➕ NOVO: Camada de serviços
│   ├── tutorialService.js
│   ├── categoryService.js
│   ├── userService.js
│   ├── mediaService.js
│   └── auditService.js
│
└── shared/
    ├── constants/
    │   └── index.js               # ✏️ Atualizar constantes
    ├── data/
    │   └── __mocks__/             # 🗑️ REMOVER após migração
    └── utils/
        ├── index.js
        ├── routeUtils.js
        └── contentUtils.js        # ➕ NOVO: Utils para conteúdo
```

---

## 📅 Cronograma de Implementação

### Fase 1: Infraestrutura (Semana 1-2)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Configurar variáveis de ambiente para API | Alta | 2h |
| Atualizar `apiClient` com refresh token | Alta | 4h |
| Atualizar `endpoints.js` | Alta | 2h |
| Criar serviços (`tutorialService`, etc.) | Alta | 8h |
| Atualizar `AuthContext` para API | Alta | 6h |
| Criar hooks (`useTutorials`, `useCategories`) | Alta | 6h |
| Testes de integração com API | Alta | 4h |

### Fase 2: Viewer Universal (Semana 2-3)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Criar estrutura `TutorialViewer` | Alta | 4h |
| Implementar `TutorialContent` (render HTML) | Alta | 6h |
| Implementar `TutorialMedia` (vídeos/imagens) | Alta | 6h |
| Implementar `TutorialSteps` | Média | 4h |
| Implementar `TutorialSidebar` | Média | 4h |
| Criar página `TutorialViewPage` | Alta | 4h |
| Refatorar rotas `/tutoriais/*` | Alta | 4h |
| Estilização e responsividade | Alta | 6h |

### Fase 3: Editor TipTap (Semana 3-4)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Instalar e configurar TipTap | Alta | 4h |
| Criar `TutorialEditor` com toolbar | Alta | 8h |
| Implementar extensão de imagens | Alta | 4h |
| Implementar extensão de vídeos | Alta | 4h |
| Implementar `MediaUploader` | Alta | 6h |
| Conectar editor com API (CRUD) | Alta | 6h |
| Autosave e controle de versão | Média | 4h |

### Fase 4: Admin Panel (Semana 4-5)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Criar `AdminDashboard` | Alta | 6h |
| Refatorar `TutorialManager` | Alta | 6h |
| Criar `UserManager` | Alta | 8h |
| Criar `CategoryManager` | Média | 4h |
| Criar `MediaLibrary` | Média | 6h |
| Implementar logs de auditoria | Baixa | 4h |
| Implementar controle de permissões | Alta | 6h |

### Fase 5: Migração e Testes (Semana 5-6)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Migrar dados de mock para API | Alta | 4h |
| Remover arquivos `__mocks__` | Alta | 2h |
| Testes E2E das funcionalidades | Alta | 8h |
| Testes de responsividade | Média | 4h |
| Testes de performance | Média | 4h |
| Documentação de uso | Média | 4h |
| Ajustes finais e bug fixes | Alta | 8h |

### Timeline Visual

```
Semana 1   Semana 2   Semana 3   Semana 4   Semana 5   Semana 6
[=======] [=======] [=======] [=======] [=======] [=======]
 Infra     Viewer     Editor     Admin     Migração   Testes
```

**Estimativa Total:** ~6 semanas (150-180 horas)

---

## 🔧 Configurações de Ambiente

### Variáveis de Ambiente (`.env`)

```env
# API
VITE_API_URL=https://api.lukos.com.br/v1
VITE_API_TIMEOUT=30000

# Autenticação
VITE_JWT_STORAGE=sessionStorage
VITE_TOKEN_REFRESH_INTERVAL=300000

# Upload
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
VITE_ALLOWED_VIDEO_TYPES=video/mp4,video/webm

# Feature Flags
VITE_ENABLE_AUTOSAVE=true
VITE_AUTOSAVE_INTERVAL=30000
VITE_ENABLE_AUDIT_LOG=true

# Analytics (opcional)
VITE_GA_ID=G-XXXXXXXXXX
```

---

## ✅ Checklist de Qualidade

### Performance
- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Cache de dados com React Query
- [ ] Otimização de bundle (Vite)
- [ ] Compressão de imagens no upload

### Segurança
- [ ] Sanitização de HTML (DOMPurify)
- [ ] Validação de inputs (Zod)
- [ ] CSRF protection
- [ ] Rate limiting (API)
- [ ] Logs de auditoria

### Acessibilidade
- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Contraste adequado
- [ ] Alt text em imagens
- [ ] Screen reader friendly

### SEO
- [ ] Meta tags dinâmicas
- [ ] Structured data (JSON-LD)
- [ ] Sitemap dinâmico
- [ ] URLs amigáveis (slugs)

---

## 📚 Referências e Recursos

### Documentação Oficial
- [TipTap Docs](https://tiptap.dev/docs)
- [React Query](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Padrões de Design
- [Tailwind UI](https://tailwindui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel Design](https://vercel.com/design)

### Segurança
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [JWT Best Practices](https://auth0.com/blog/jwt-handbook/)

---

## 🚀 Próximos Passos Imediatos

1. **Confirmar especificação da API externa**
   - Documentação dos endpoints
   - Formato de autenticação
   - Estrutura de responses

2. **Definir ambiente de desenvolvimento**
   - URL da API de staging
   - Credenciais de teste
   - Banco de dados de desenvolvimento

3. **Iniciar Fase 1: Infraestrutura**
   - Criar branch `feature/api-integration`
   - Configurar variáveis de ambiente
   - Implementar serviços base

---

> **Nota:** Este plano está sujeito a ajustes conforme feedback e descobertas durante a implementação. Manter atualizado conforme progresso.

---

*Última atualização: Dezembro 2025*

