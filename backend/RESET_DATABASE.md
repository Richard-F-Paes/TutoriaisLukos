# Guia para Resetar o Banco de Dados

Este guia explica como limpar completamente o banco de dados e executar seed + webscrape do zero.

## ⚠️ ATENÇÃO

Este processo **DELETA TODOS OS DADOS** do banco de dados. Use apenas em desenvolvimento ou quando quiser resetar completamente.

## Sequência Completa

### Opção 1: Script Automatizado (Recomendado)

O script `reset:all` já integra todo o processo, incluindo o webscrape:

```bash
cd backend
npm run reset:all
```

Este script automatiza todo o processo:
1. Limpa o banco de dados
2. Sincroniza schema (usa `db push` por padrão)
3. Executa seed
4. Executa scraper (com validações automáticas de duplicidade)

**O webscrape é inteligente e evita retrabalho:**
- Valida páginas já extraídas (pula se arquivo JSON existe)
- Valida mídias já baixadas (pula se arquivo existe no sistema de arquivos)
- Valida tutoriais já no banco (verifica slugs e ShareHash duplicados antes de inserir)

**Opções do script:**
```bash
# Pular migrations
SKIP_MIGRATIONS=true npm run reset:all

# Pular seed
SKIP_SEED=true npm run reset:all

# Pular scraper
SKIP_SCRAPER=true npm run reset:all

# Limitar páginas do scraper
SCRAPER_LIMIT=10 npm run reset:all

# Forçar re-extração no scraper (apenas se quiser re-extrair páginas já processadas)
FORCE_EXTRACT=true npm run reset:all

# Usar migrate dev em vez de db push
USE_DB_PUSH=false npm run reset:all
```

**Nota sobre `--force-extract`:** 
- Por padrão, o webscrape pula páginas já extraídas (arquivo JSON existe)
- Use `FORCE_EXTRACT=true` apenas se quiser forçar a re-extração de todas as páginas
- Na primeira execução ou após limpar o banco, não é necessário usar `--force-extract`

### Opção 2: Execução Manual

Use esta opção apenas se precisar de controle granular sobre cada etapa ou se quiser executar etapas específicas isoladamente.

**Quando usar execução manual:**
- Testar uma etapa específica isoladamente
- Executar apenas o webscrape sem resetar o banco
- Personalizar parâmetros do webscrape que não estão disponíveis no script automatizado

**Exemplo de execução manual completa:**

```bash
# 1. Limpar banco
cd backend
npm run clear:database

# 2. Sincronizar schema (recomendado usar db push após limpar)
npm run prisma:push

# 3. Seed de usuário admin
npm run seed

# 4. Webscrape (sem --force-extract na primeira execução)
cd ../WebScrape
python run_scraper.py

# 5. (Opcional) Seed de configurações
cd ../backend
npm run seed:availability
```

## Passo a Passo (Execução Manual)

### 1. Limpar o Banco de Dados

```bash
cd backend
npm run clear:database
```

Este comando:
- Deleta todos os registros de todas as tabelas
- Reseta os contadores de ID (auto-increment)
- Mantém a estrutura das tabelas intacta

### 2. Executar Migrations (se necessário)

Após limpar o banco, é recomendado usar `db push` (mais adequado para desenvolvimento):

```bash
npm run prisma:push
```

**Por que db push?**
- Não requer shadow database (evita erros quando o banco está vazio)
- Mais rápido para desenvolvimento
- Sincroniza o schema diretamente do `schema.prisma`

Se preferir usar migrations (produção ou quando precisa de histórico):

```bash
npm run prisma:migrate
```

**Nota:** `prisma migrate dev` pode falhar após limpar o banco se houver problemas com o shadow database. Nesse caso, use `db push`.

### 3. Executar Seed

Criar o usuário administrador inicial:

```bash
npm run seed
```

**⚠️ IMPORTANTE - Configurar Senha:**

Antes de executar o seed, configure a senha do usuário admin no arquivo `.env`:

```bash
# No arquivo backend/.env, adicione:
SEED_ADMIN_PASSWORD=sua_senha_segura_aqui
```

**Em produção:** Defina uma senha forte e segura.

**Em desenvolvimento:** Se não definir `SEED_ADMIN_PASSWORD`, o script usará uma senha padrão apenas para desenvolvimento (com aviso).

Isso cria:
- Username: `lukos`
- Email: `lukos@lukos.com`
- Role: `admin`
- Senha: Definida via variável de ambiente `SEED_ADMIN_PASSWORD` (ou senha padrão de desenvolvimento se não configurada)

### 4. Executar Webscrape

Extrair tutoriais do Google Sites:

```bash
cd ../WebScrape
python run_scraper.py
```

**Nota:** Na primeira execução ou após limpar o banco, não é necessário usar `--force-extract`. O webscrape valida automaticamente o que já foi processado.

Opções úteis:
- `--limit N`: Limitar número de páginas (ex: `--limit 10`)
- `--force-extract`: Forçar re-extração mesmo se já existir (use apenas para re-extrair)
- `--skip-download`: Pular download de mídias
- `--log-level INFO`: Nível de log

### 5. (Opcional) Seed de Configurações de Treinamento

Se precisar das configurações de treinamento:

```bash
cd ../backend
npm run seed:availability
```


## Validações de Duplicidade do Webscrape

O webscrape possui validações automáticas em todas as etapas para evitar duplicidades e retrabalho desnecessário:

### 1. Descoberta de Páginas
- **Validação:** Verifica se `pages.json` já existe
- **Comportamento:** Se existir, pula a descoberta e usa o arquivo existente
- **Forçar:** Para forçar nova descoberta, delete o arquivo `data/pages.json`

### 2. Extração de Conteúdo
- **Validação:** Verifica se o arquivo JSON da página já existe em `raw_content/`
- **Comportamento:** Pula páginas já extraídas (arquivo existe)
- **Forçar:** Use `--force-extract` para re-extrair todas as páginas

### 3. Download de Mídias
- **Validação:** Verifica se o arquivo já existe no sistema de arquivos
- **Comportamento:** Pula downloads de arquivos que já existem
- **Forçar:** Delete os arquivos manualmente se quiser re-baixar

### 4. Inserção no Banco de Dados
- **Validação:** Verifica slugs e ShareHash duplicados antes de inserir
- **Comportamento:** 
  - Gera slugs únicos automaticamente se houver duplicata
  - Verifica ShareHash existente e gera novo se necessário
  - Trata erros de integridade e busca registros existentes
- **Resultado:** Evita duplicatas e mantém integridade dos dados

**Resumo:** O webscrape é projetado para ser executado múltiplas vezes sem causar duplicidades. Ele detecta automaticamente o que já foi processado e pula essas etapas, processando apenas o que é novo ou foi modificado.

## Verificação

Após executar tudo, você pode verificar:

1. **Usuário admin criado:**
   ```bash
   # Usar Prisma Studio
   npm run prisma:studio
   ```

2. **Tutoriais extraídos:**
   - Verificar tabela `Tutorials` no Prisma Studio
   - Verificar tabela `TutorialSteps` para os passos
   - Verificar tabela `Categories` para as categorias

## Solução de Problemas

### Erro: "Invalid object name"
- Execute o schema sync: `npm run prisma:push`
- Ou execute as migrations: `npm run prisma:migrate`

### Erro: "not connected"
- Verifique se o SQL Server está rodando
- Verifique o `DATABASE_URL` no arquivo `.env`

### Erro: "Foreign key constraint"
- O script desabilita foreign keys temporariamente, mas se ainda houver erro, execute o schema sync novamente

### Erro: "Migration failed to apply cleanly to the shadow database"
- Este erro ocorre quando `prisma migrate dev` tenta validar migrations em um shadow database
- **Solução:** Use `npm run prisma:push` em vez de `npm run prisma:migrate`
- Ou use o script automatizado: `npm run reset:all` (ele usa `db push` por padrão)

