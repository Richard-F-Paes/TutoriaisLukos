# 🚀 TutorialLukos React

Uma plataforma moderna de tutoriais para o sistema Lukos, desenvolvida em React com arquitetura modular e design responsivo.

## ✨ Características

- 🎨 **Design Moderno**: Interface limpa e profissional
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- 🧩 **Arquitetura Modular**: Componentes separados e reutilizáveis
- 🎭 **Animações Suaves**: Transições e efeitos visuais elegantes
- 🔍 **Sistema de Busca**: Pesquisa inteligente de tutoriais
- ⚡ **Performance Otimizada**: Carregamento rápido e eficiente

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Navbar/          # Barra de navegação
│   ├── Hero/            # Seção principal
│   ├── Button/          # Botões reutilizáveis
│   ├── Categories/      # Categorias de tutoriais
│   ├── Tutorials/       # Lista de tutoriais
│   ├── CTA/             # Chamada para ação
│   └── Footer/          # Rodapé
├── App.js               # Componente principal
└── index.js             # Ponto de entrada
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Executar

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd tutorial-lukos-react
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm start
```

4. **Acesse no navegador**
```
http://localhost:5173
```
(Nota: O projeto usa Vite, que por padrão roda na porta 5173)

## 📦 Scripts Disponíveis

- `npm start` ou `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Cria build para produção
- `npm run preview` - Visualiza o build de produção
- `npm test` - Executa os testes

## 🎨 Componentes Principais

### Navbar
- Navegação fixa no topo
- Barra de pesquisa integrada
- Efeitos de scroll

### Hero
- Seção principal com call-to-action
- Background com gradiente animado
- Botões de navegação

### Categories
- Grid de categorias do sistema
- Ícones e descrições
- Cores específicas por categoria

### Tutorials
- Cards de tutoriais com imagens
- Badges de nível e categoria
- Meta informações (duração, rating)

## 🎯 Funcionalidades

- ✅ Navegação suave entre seções
- ✅ Sistema de busca em tempo real
- ✅ Design responsivo (mobile-first)
- ✅ Animações e transições
- ✅ Componentes reutilizáveis
- ✅ CSS modular por componente

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints otimizados:

- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **CSS3** - Estilos e animações
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📚 Documentação

A documentação completa está organizada na pasta [`docs/`](./docs/):

### 📖 Guias de Uso
- **[Como Adicionar/Editar Tutoriais](./docs/guias/adicionar-tutoriais.md)** - Guia completo para criar e editar tutoriais
- **[Como Ajustar Imagens e Visual](./docs/guias/ajustar-imagens-visual.md)** - Personalização de imagens, cores e estilos
- **[Sistema de Tutoriais](./docs/guias/sistema-tutoriais.md)** - Visão geral do sistema e funcionalidades

### 🏢 Módulos
- **[Dashboard](./docs/modulos/dashboard.md)** - Tutoriais do Dashboard e Relatórios
- **[Retaguarda](./docs/modulos/retaguarda.md)** - Tutoriais da Retaguarda
- **[Tutoriais Completos](./docs/modulos/tutoriais-completos.md)** - Visão geral de todos os tutoriais

📑 **[Ver índice completo da documentação](./docs/README.md)**

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas nos arquivos CSS:
- Primária: `#2563eb`
- Secundária: `#7c3aed`
- Categorias: Cores específicas por módulo

### Conteúdo
- Categorias: Edite `src/components/Categories/Categories.js`
- Tutoriais: Edite `src/components/Tutorials/Tutorials.js`

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- **Telefone**: (11) 4858-8429
- **Email**: suporte@lukos.com.br
- **Atendimento**: Segunda a sexta-feira das 08h30 às 17h30
- Consulte a [documentação completa](./docs/README.md)
- Abra uma [issue](../../issues) para reportar problemas

---

**Desenvolvido com ❤️ para a comunidade TutorialLukos**
