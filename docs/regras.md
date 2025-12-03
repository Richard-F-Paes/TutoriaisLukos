# Regras do Projeto

> Siga rigorosamente as documentações oficiais, diretrizes e melhores práticas.

## Princípios Fundamentais

- **DRY (Don't Repeat Yourself)** - Uma única fonte de verdade, sem duplicação de código ou arquivos
- **KISS (Keep It Simple)** - Complexidade desnecessária quebra a lógica e o sistema
- **Não criar arquivos desnecessariamente** - Reutilize o que já existe
- **Sem mocks em produção** - Nunca usar dados sintéticos ou fictícios no ambiente produtivo
- **Testes não invasivos** - Não chumbar testes no código nem prejudicar o fluxo/UX
- **Validar após edições** - Sempre checar posicionamentos e controles obrigatóriamente

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
| [Yup](https://github.com/jquense/yup)          | Validação de schemas |

### UI e Componentes

| Ferramenta                                  | Uso                     |
| ------------------------------------------- | ----------------------- |
| [shadcn/ui](https://ui.shadcn.com)             | Componentes base        |
| [Headless UI](https://headlessui.com)          | Componentes acessíveis |
| [Heroicons](https://heroicons.com)             | Ícones (Tailwind)      |
| [Lucide](https://lucide.dev)                   | Ícones alternativos    |
| [React Hot Toast](https://react-hot-toast.com) | Notificações          |

### Animações

| Ferramenta                                   | Uso               |
| -------------------------------------------- | ----------------- |
| [Framer Motion](https://www.framer.com/motion/) | Animações React |
| [dnd kit](https://dndkit.com)                   | Drag and drop     |

### Mídia e Editores

| Ferramenta                                            | Uso              |
| ----------------------------------------------------- | ---------------- |
| [React Player](https://github.com/cookpete/react-player) | Player de vídeo |
| [Quill](https://quilljs.com)                             | Editor rich text |

### HTTP e Autenticação

| Ferramenta                                              | Uso                |
| ------------------------------------------------------- | ------------------ |
| [Axios](https://github.com/axios/axios)                    | Requisições HTTP |
| [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)          | Hash de senhas     |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT                |

## Referências

- [MDN - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js API](https://nodejs.org/api/)
- [Repositório](https://github.com/Richard-F-Paes/tutorial-lukos-react)
