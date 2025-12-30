# WebScrape - Tutoriais Lukos

Este projeto realiza webscrape do site Google Sites dos Tutoriais Lukos e preenche o banco de dados SQL Server com o conteúdo extraído.

## Estrutura do Projeto

```
WebScrape/
├── src/
│   ├── scraper/          # Módulos de scraping
│   ├── database/          # Módulos de banco de dados
│   └── utils/            # Utilitários
├── config/               # Arquivos de configuração
├── data/                 # Dados intermediários (JSON)
├── media/                # Mídias baixadas (imagens, documentos)
├── config.py             # Configurações principais
├── run_scraper.py        # Script de execução completa
└── requirements.txt      # Dependências Python
```

## Pré-requisitos

1. **Python 3.8+**
2. **SQL Server** com banco de dados configurado
3. **Driver ODBC** para SQL Server instalado
4. **Selenium WebDriver** (Chrome/Edge/Firefox)
5. **Usuário padrão** no banco de dados (configurável via `DEFAULT_USER_ID` no `.env`, padrão: 1) para campos CreatedBy/UpdatedBy

## Instalação

1. **Instalar dependências:**
```bash
pip install -r requirements.txt
```

2. **Configurar arquivo .env:**
```bash
# Copiar o arquivo de exemplo
cp config/env.example .env

# Editar .env com suas configurações
# Especialmente importante:
# - SQLSERVER_SERVER
# - SQLSERVER_DATABASE
# - SQLSERVER_USERNAME / SQLSERVER_PASSWORD (se não usar trusted connection)
```

3. **Verificar/Instalar WebDriver:**
   - Para Edge: geralmente já vem com o Windows
   - Para Chrome: baixar ChromeDriver
   - Para Firefox: baixar GeckoDriver

## Uso

### Execução Completa (Recomendado)

Execute todas as etapas em sequência:

```bash
python run_scraper.py
```

### Opções Disponíveis

```bash
# Limitar número de páginas (útil para testes)
python run_scraper.py --limit 10

# Simular inserção no banco (dry-run)
python run_scraper.py --dry-run

# Pular download de mídias
python run_scraper.py --skip-download

# Forçar re-extração mesmo se já existir
python run_scraper.py --force-extract

# Combinar opções
python run_scraper.py --limit 5 --dry-run --log-level DEBUG
```

### Execução por Etapas (Manual)

Se preferir executar cada etapa separadamente:

```bash
# 1. Descobrir páginas
python -m src.main discover

# 2. Extrair conteúdo
python -m src.main extract --limit 10

# 3. Baixar mídias
python -m src.main download-media

# 4. Processar dados
python -m src.main process

# 5. Verificar schema
python -m src.main check-schema

# 6. Inserir no banco
python -m src.main insert-db --dry-run  # Teste primeiro
python -m src.main insert-db            # Inserção real
```

## Etapas do Processo

1. **Descoberta**: Extrai todas as URLs do menu do site
2. **Extração**: Baixa e processa o conteúdo HTML de cada página
3. **Download de Mídias**: Baixa imagens e documentos referenciados
4. **Processamento**: Converte dados brutos em formato estruturado
5. **Validação**: Verifica se o schema do banco está correto
6. **Inserção**: Popula o banco de dados SQL Server

## Estrutura de Dados

### Categories
- Hierarquia de categorias extraída do menu do site
- Campos: `name`, `slug`, `ParentId`, `SortOrder`

### Tutorials
- Páginas folha (sem filhos no menu) viram tutoriais
- Campos: `title`, `slug`, `content`, `CategoryId`, `CreatedBy`, `UpdatedBy`

### TutorialSteps
- Passos/etapas extraídos de cada tutorial
- Campos: `TutorialId`, `title`, `content`, `SortOrder`

### Media
- Imagens e documentos baixados
- Campos: `FileName`, `OriginalName`, `MimeType`, `size`, `url`, `UploadedBy`

## Configuração

### Variáveis Importantes no .env

```env
# URL do site
BASE_URL=https://sites.google.com/view/lukos-tutoriais/

# Configuração do navegador
BROWSER=edge  # ou chrome, firefox
HEADLESS=true

# SQL Server
SQLSERVER_SERVER=localhost
SQLSERVER_DATABASE=TutoriaisLukos
SQLSERVER_TRUSTED_CONNECTION=true
# OU
# SQLSERVER_USERNAME=seu_usuario
# SQLSERVER_PASSWORD=sua_senha
```

## Troubleshooting

### Erro: "DB schema mismatch"
- Verifique se as colunas do banco correspondem ao esperado
- Execute `python -m src.main check-schema` para ver detalhes

### Erro: "Could not insert categories due to unresolved parents"
- Verifique se a hierarquia de categorias está correta
- Pode indicar referências circulares ou dados inconsistentes

### Erro: "Selenium WebDriver not found"
- Instale o WebDriver apropriado para seu navegador
- Verifique se está no PATH ou configure o caminho

### Erro: "User ID not found"
- Certifique-se de que existe um usuário com o ID configurado no banco
- Configure `DEFAULT_USER_ID` no arquivo `.env` para usar um ID diferente

## Notas Importantes

1. **Primeira Execução**: Pode levar bastante tempo dependendo do número de páginas
2. **Rate Limiting**: O script respeita delays entre requisições para não sobrecarregar o servidor
3. **Backup**: Faça backup do banco antes de inserir dados
4. **Dry-Run**: Sempre teste com `--dry-run` antes de inserir dados reais
5. **Logs**: Use `--log-level DEBUG` para ver detalhes da execução

## Estrutura de Arquivos Gerados

```
data/
├── pages.json              # Páginas descobertas
├── categories.json         # Categorias derivadas
├── raw_content/            # Conteúdo bruto extraído
│   └── *.json
├── processed_data/        # Dados processados
│   ├── categories.json
│   ├── tutorials.json
│   ├── steps.json
│   └── media.json
└── reports/               # Relatórios de qualidade
    └── mismatches.json

media/
├── images/                 # Imagens baixadas
└── documents/             # Documentos baixados
```

## Suporte

Para problemas ou dúvidas, consulte o arquivo `docs/VALIDACAO.md` para detalhes sobre validação e configuração.

