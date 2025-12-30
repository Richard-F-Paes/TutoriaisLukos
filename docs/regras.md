# Regras do Projeto

> Siga rigorosamente as documentações oficiais, diretrizes e melhores práticas.

## Princípios Fundamentais

- **DRY (Don't Repeat Yourself)** - Uma única fonte de verdade, sem duplicação de código ou arquivos
- **KISS (Keep It Simple Stupid)** - Complexidade desnecessária quebra a lógica e o sistema
- **Sem mocks em produção** - Nunca usar dados sintéticos ou fictícios no ambiente produtivo
- **Testes não invasivos** - Não chumbar testes no código nem prejudicar o fluxo/UX
- **Validar após edições** - Sempre checar posicionamentos e controles obrigatóriamente
- **Atualizar Changelog** - Sempre atualizar o arquivo `docs/CHANGELOG.md` ao fazer mudanças significativas no projeto (novas funcionalidades, correções importantes, breaking changes, etc.)

## Stack Técnica

### Core

| Ferramenta                           | Uso               |
| ------------------------------------ | ----------------- |
| [React](https://react.dev)              | Framework UI      |
| [Vite](https://vite.dev)                | Build tool        |
| [Tailwind CSS](https://tailwindcss.com) | Estilização     |
| [PostCSS](https://postcss.org)          | Processamento CSS |

### Roteamento e Formulários

| Ferramenta                                  | Uso                    |
| ------------------------------------------- | ---------------------- |
| [React Router](https://reactrouter.com)        | Navegação            |
| [React Hook Form](https://react-hook-form.com) | Formulários           |
| [Zod](https://zod.dev)                          | Validação de schemas |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Integração Zod com React Hook Form |

### UI e Componentes

| Ferramenta                                  | Uso                     |
| ------------------------------------------- | ----------------------- |
| [shadcn/ui](https://ui.shadcn.com)             | Componentes base        |
| [Radix UI](https://www.radix-ui.com)           | Componentes primitivos (base do shadcn/ui) |
| [Headless UI](https://headlessui.com)          | Componentes acessíveis |
| [Heroicons](https://heroicons.com)             | Ícones (Tailwind)      |
| [Lucide](https://lucide.dev)                   | Ícones alternativos    |
| [Tabler Icons](https://tabler.io/icons)        | Biblioteca de ícones   |
| [React Icons](https://react-icons.github.io/react-icons) | Biblioteca de ícones diversificada |
| [React Hot Toast](https://react-hot-toast.com) | Notificações          |
| [class-variance-authority](https://cva.style)  | Variantes de componentes |
| [clsx](https://github.com/lukeed/clsx)         | Utilitário para classes CSS |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Merge de classes Tailwind |
| [tailwind-variants](https://www.tailwind-variants.org) | Variantes TypeScript para Tailwind |

### Estado e Dados

| Ferramenta                                  | Uso                     |
| ------------------------------------------- | ----------------------- |
| [TanStack Query (React Query)](https://tanstack.com/query) | Gerenciamento de estado servidor |
| [React Error Boundary](https://github.com/bvaughn/react-error-boundary) | Tratamento de erros |

### Animações

| Ferramenta                                   | Uso               |
| -------------------------------------------- | ----------------- |
| [Framer Motion](https://www.framer.com/motion/) | Animações React |
| [GSAP](https://gsap.com)                     | Biblioteca de animação avançada |
| [Motion](https://motion.dev)                 | Animações adicionais |
| [dnd kit](https://dndkit.com)                   | Drag and drop     |
| [React Transition Group](https://reactcommunity.org/react-transition-group) | Transições de componentes |

### Mídia e Editores

| Ferramenta                                            | Uso              |
| ----------------------------------------------------- | ---------------- |
| [React Player](https://github.com/cookpete/react-player) | Player de vídeo |
| [TipTap](https://tiptap.dev)                         | Editor rich text moderno |
| [React Quill](https://github.com/zenoamaro/react-quill) | Editor rich text (alternativo) |
| [Lowlight](https://github.com/wooorm/lowlight)       | Syntax highlighting para code blocks |
| [DOMPurify](https://github.com/cure53/DOMPurify)     | Sanitização de HTML |
| [React Color](https://casesandberg.github.io/react-color) | Seletor de cores |

### Utilidades

| Ferramenta                                  | Uso                     |
| ------------------------------------------- | ----------------------- |
| [date-fns](https://date-fns.org)            | Manipulação de datas    |
| [React Helmet Async](https://github.com/staylor/react-helmet-async) | Gerenciamento de head (SEO) |
| [TypeScript](https://www.typescriptlang.org) | Tipagem estática |

### HTTP e Autenticação (Frontend)

| Ferramenta                                              | Uso                |
| ------------------------------------------------------- | ------------------ |
| [Axios](https://github.com/axios/axios)                    | Requisições HTTP |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT (frontend)     |

### Backend

| Ferramenta                                              | Uso                |
| ------------------------------------------------------- | ------------------ |
| [Express](https://expressjs.com)                        | Framework web Node.js |
| [Prisma](https://www.prisma.io)                         | ORM e gerenciamento de banco de dados |
| [MSSQL (SQL Server)](https://www.microsoft.com/sql-server) | Banco de dados |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)          | Hash de senhas     |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT (autenticação) |
| [Zod](https://zod.dev)                                  | Validação de schemas (backend) |
| [Multer](https://github.com/expressjs/multer)           | Upload de arquivos |
| [Helmet](https://helmetjs.github.io)                    | Segurança HTTP headers |
| [CORS](https://github.com/expressjs/cors)               | Configuração CORS |
| [UUID](https://github.com/uuidjs/uuid)                  | Geração de identificadores únicos |
| [Slugify](https://github.com/simov/slugify)             | Geração de slugs/URLs amigáveis |
| [dotenv](https://github.com/motdotla/dotenv)            | Variáveis de ambiente |

### Ferramentas de Desenvolvimento

| Ferramenta                                  | Uso                     |
| ------------------------------------------- | ----------------------- |
| [Vitest](https://vitest.dev)                | Framework de testes     |
| [ESLint](https://eslint.org)                | Linter JavaScript       |
| [Prettier](https://prettier.io)             | Formatador de código    |
| [gh-pages](https://github.com/tschaub/gh-pages) | Deploy para GitHub Pages |

## Referências

- [MDN - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js API](https://nodejs.org/api/)
- [Repositório](https://github.com/Richard-F-Paes/tutorial-lukos-react)
