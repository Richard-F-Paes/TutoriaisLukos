# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Adicionado
- Sistema de changelog para rastreamento de mudanças do projeto
- Documentação consolidada na pasta `docs`
- Suporte a variável de ambiente `DEFAULT_USER_ID` no WebScrape para configurar ID do usuário padrão
- Suporte para download e hospedagem de vídeos do Google Drive no scraper
- Pipeline de mídia hospedada: mídias são salvas em `backend/uploads/images` e `backend/uploads/videos` com URLs públicas `/uploads/...`
- Opção `-CleanArtifacts` no script `reset-db-seed-scraper.ps1` para limpar artefatos do scraper e uploads antes de executar

### Alterado
- Estrutura da documentação consolidada em arquivos essenciais
- Atualização das regras do projeto com tecnologias reais utilizadas
- WebScrape: `default_user_id` centralizado no Settings (configurável via `.env`) em vez de hardcoded
- WebScrape: Documentação reorganizada (`VALIDACAO.md` movido para `WebScrape/docs/`)
- WebScrape: Extração de conteúdo principal melhorada para avaliar todas as ocorrências de `div[role="main"]` e escolher a melhor
- WebScrape: Geração de description melhorada para filtrar skip-links e ruído do Google Sites
- WebScrape: Estratégia de `_split_into_steps` reescrita para fazer chunking por DOM em vez de string splitting, evitando passos inválidos e vazios
- WebScrape: Mídias são salvas diretamente em `backend/uploads/*` quando `BACKEND_UPLOADS_DIR` está configurado ou quando o diretório é detectado automaticamente
- Frontend: `TutorialSteps.jsx` agora suporta fallback para campos alternativos (`content_html`/`contentHtml`) sem quebrar o shape atual

### Corrigido
- WebScrape: Violação DRY corrigida - `default_user_id` removido de múltiplos locais e centralizado em `config.py`
- WebScrape: Descrição de tutoriais agora remove corretamente skip-links ("Pular para o conteúdo principal", etc.)
- WebScrape: Passos de tutoriais não são mais gerados com HTML inválido ou vazio
- WebScrape: Vídeos do Google Drive são baixados usando `download_url` quando disponível
- WebScrape: Ícones decorativos do Google Drive são filtrados e não são baixados
- WebScrape: Mídias são corretamente associadas aos passos e URLs públicas são geradas para renderização no frontend
- Frontend: Renderização de passos agora funciona corretamente mesmo quando o backend retorna campos alternativos

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

