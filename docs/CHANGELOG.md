# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Adicionado
- Sistema de changelog para rastreamento de mudanças do projeto
- Documentação consolidada na pasta `docs`
- Suporte a variável de ambiente `DEFAULT_USER_ID` no WebScrape para configurar ID do usuário padrão

### Alterado
- Estrutura da documentação consolidada em arquivos essenciais
- Atualização das regras do projeto com tecnologias reais utilizadas
- WebScrape: `default_user_id` centralizado no Settings (configurável via `.env`) em vez de hardcoded
- WebScrape: Documentação reorganizada (`VALIDACAO.md` movido para `WebScrape/docs/`)

### Corrigido
- WebScrape: Violação DRY corrigida - `default_user_id` removido de múltiplos locais e centralizado em `config.py`

## Tipos de Mudanças

- **Adicionado**: para novas funcionalidades
- **Alterado**: para mudanças em funcionalidades existentes
- **Descontinuado**: para funcionalidades que serão removidas em versões futuras
- **Removido**: para funcionalidades removidas
- **Corrigido**: para correção de bugs
- **Segurança**: para vulnerabilidades corrigidas

## [1.0.0] - YYYY-MM-DD

### Adicionado
- Versão inicial do sistema de tutoriais Lukos
- Interface React com Vite
- Sistema de tutoriais interativos
- Autenticação e controle de acesso
- Gerenciamento de tutoriais via backend
- Banco de dados Prisma com SQL Server

