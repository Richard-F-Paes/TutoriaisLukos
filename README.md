# TutorialLukos - Plataforma de Tutoriais

Uma plataforma completa de tutoriais para o sistema Lukos, desenvolvida com React (frontend) e Node.js/Express (backend).

## 🏗️ Arquitetura do Projeto

```
/meu-projeto
│
├── /frontend        # Código do cliente (React + Vite)
│   ├── /public      # Arquivos estáticos
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /styles
│   │   ├── /services  # Chamadas à API
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── /backend         # Código do servidor (Node.js + Express)
│   ├── /src
│   │   ├── /routes
│   │   ├── /controllers
│   │   ├── /models
│   │   ├── /middlewares
│   │   └── server.js
│   ├── package.json
│   └── scripts/seed.js
│
├── /shared          # Código compartilhado
│   ├── /utils
│   ├── /constants
│   └── package.json
│
├── package.json     # Workspaces e scripts raiz
└── README.md
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de schemas
- **Framer Motion** - Animações
- **React Hot Toast** - Notificações

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Nodemailer** - Envio de emails
- **Express Validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB (local ou Atlas)

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd tutorial-lukos
```

### 2. Instale as dependências
```bash
npm run install:all
```

### 3. Configure as variáveis de ambiente

#### Frontend
```bash
cp frontend/env.example frontend/.env
```

Edite `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Tutoriais Lukos
```

#### Backend
```bash
cp backend/env.example backend/.env
```

Edite `backend/.env`:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/tutorial-lukos
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Inicie o MongoDB
```bash
# Se usando MongoDB local
mongod
```

### 5. Execute o seed do banco de dados
```bash
cd backend
npm run seed
```

### 6. Inicie os servidores
```bash
# Na raiz do projeto
npm run dev
```

Isso iniciará:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 👥 Contas de Demonstração

Após executar o seed, você terá acesso às seguintes contas:

| Role | Email | Senha | Permissões |
|------|-------|-------|------------|
| Super Admin | admin@lukos.com | admin123 | Todas as permissões |
| Editor | editor@lukos.com | editor123 | Gerenciar conteúdo |
| Moderador | moderator@lukos.com | moderator123 | Moderar conteúdo |
| Viewer | viewer@lukos.com | viewer123 | Visualizar conteúdo |

## 📚 Funcionalidades

### Autenticação
- ✅ Login/Logout
- ✅ Registro de usuários
- ✅ Verificação de email
- ✅ Recuperação de senha
- ✅ JWT com refresh token
- ✅ Sistema de roles e permissões

### Tutoriais
- ✅ Criação e edição de tutoriais
- ✅ Sistema de passos
- ✅ Categorias e dificuldades
- ✅ Busca e filtros
- ✅ Progresso do usuário
- ✅ Avaliações e comentários

### Usuários
- ✅ Perfil personalizável
- ✅ Preferências de tema
- ✅ Estatísticas de progresso
- ✅ Gerenciamento de conta

### Administração
- ✅ Painel administrativo
- ✅ Gerenciamento de usuários
- ✅ Moderação de conteúdo
- ✅ Relatórios e analytics

## 🔧 Scripts Disponíveis

### Scripts Raiz
```bash
npm run dev              # Inicia frontend e backend em desenvolvimento
npm run build            # Build de produção
npm run start            # Inicia em produção
npm run install:all      # Instala dependências de todos os workspaces
npm run test             # Executa testes
npm run lint             # Executa linter
npm run clean            # Limpa node_modules e builds
npm run setup            # Setup completo do projeto
```

### Scripts Frontend
```bash
cd frontend
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run preview          # Preview do build
npm run lint             # Linter
```

### Scripts Backend
```bash
cd backend
npm run dev              # Servidor com nodemon
npm run start            # Servidor de produção
npm run seed             # Popula banco com dados iniciais
npm run test             # Testes
```

## 🗄️ Estrutura do Banco de Dados

### Usuários (Users)
- Informações pessoais
- Autenticação e segurança
- Roles e permissões
- Preferências
- Progresso nos tutoriais

### Tutoriais (Tutorials)
- Metadados (título, descrição, categoria)
- Conteúdo e passos
- Autor e datas
- Estatísticas (visualizações, avaliações)
- Status de publicação

## 🔒 Segurança

- Hash de senhas com bcrypt
- JWT com expiração
- Rate limiting
- Validação de dados
- Sanitização de inputs
- CORS configurado
- Headers de segurança

## 📱 Responsividade

O frontend é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🧪 Testes

```bash
# Testes do frontend
cd frontend && npm run test

# Testes do backend
cd backend && npm run test

# Todos os testes
npm run test
```

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy da pasta dist/
```

### Backend (Heroku/Railway)
```bash
cd backend
# Configurar variáveis de ambiente
# Deploy do código
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato:
- Email: suporte@tutoriallukos.com
- Issues: [GitHub Issues](https://github.com/seu-usuario/tutorial-lukos/issues)

---

Desenvolvido com ❤️ para a comunidade Lukos