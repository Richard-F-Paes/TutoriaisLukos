# Guia para Resetar o Banco de Dados

Este guia explica como limpar completamente o banco de dados e executar seed + webscrape do zero.

## ⚠️ ATENÇÃO

Este processo **DELETA TODOS OS DADOS** do banco de dados. Use apenas em desenvolvimento ou quando quiser resetar completamente.

## Passo a Passo

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

Se você quiser recriar as tabelas do zero:

```bash
npm run prisma:migrate
```

Ou se preferir usar db push (desenvolvimento):

```bash
npm run prisma:push
```

### 3. Executar Seed

Criar o usuário administrador inicial:

```bash
npm run seed
```

Isso cria:
- Username: `lukos`
- Senha: `lks@123241`
- Email: `lukos@lukos.com`
- Role: `admin`

### 4. Executar Webscrape

Extrair tutoriais do Google Sites:

```bash
cd ../WebScrape
python run_scraper.py --force-extract
```

Opções úteis:
- `--limit N`: Limitar número de páginas (ex: `--limit 10`)
- `--skip-download`: Pular download de mídias
- `--log-level INFO`: Nível de log

### 5. (Opcional) Seed de Configurações de Treinamento

Se precisar das configurações de treinamento:

```bash
cd ../backend
npm run seed:availability
```

## Sequência Completa

```bash
# 1. Limpar banco
cd backend
npm run clear:database

# 2. Executar migrations (se necessário)
npm run prisma:migrate

# 3. Seed de usuário admin
npm run seed

# 4. Webscrape
cd ../WebScrape
python run_scraper.py --force-extract

# 5. (Opcional) Seed de configurações
cd ../backend
npm run seed:availability
```

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
- Execute as migrations primeiro: `npm run prisma:migrate`

### Erro: "not connected"
- Verifique se o SQL Server está rodando
- Verifique o `DATABASE_URL` no arquivo `.env`

### Erro: "Foreign key constraint"
- O script desabilita foreign keys temporariamente, mas se ainda houver erro, execute as migrations novamente

