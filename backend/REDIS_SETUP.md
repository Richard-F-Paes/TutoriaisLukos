# Guia de Configuração do Redis

Este guia explica como instalar e configurar o Redis para o projeto TutoriaisLukos.

## Opções de Instalação

### Opção 1: Redis via Docker (Recomendado - Mais Fácil)

1. **Instalar Docker Desktop** (se ainda não tiver):
   - Baixe em: https://www.docker.com/products/docker-desktop
   - Instale e inicie o Docker Desktop

2. **Executar Redis em container**:
   ```bash
   docker run -d --name redis-tutoriaislukos -p 6379:6379 redis:latest
   ```

3. **Verificar se está rodando**:
   ```bash
   docker ps
   ```

4. **Parar Redis** (quando necessário):
   ```bash
   docker stop redis-tutoriaislukos
   ```

5. **Iniciar Redis novamente**:
   ```bash
   docker start redis-tutoriaislukos
   ```

### Opção 2: Redis via WSL2 (Windows Subsystem for Linux)

1. **Instalar WSL2** (se ainda não tiver):
   ```powershell
   wsl --install
   ```
   Reinicie o computador após a instalação.

2. **Abrir terminal WSL** e instalar Redis:
   ```bash
   sudo apt update
   sudo apt install redis-server -y
   ```

3. **Iniciar Redis**:
   ```bash
   sudo service redis-server start
   ```

4. **Verificar se está rodando**:
   ```bash
   redis-cli ping
   # Deve retornar: PONG
   ```

### Opção 3: Memurai (Redis para Windows)

1. **Baixar Memurai**:
   - Site: https://www.memurai.com/
   - Baixe a versão Developer (gratuita)

2. **Instalar e iniciar**:
   - Execute o instalador
   - O Memurai iniciará automaticamente como serviço do Windows

### Opção 4: Redis Cloud (Serviço Gerenciado)

1. **Criar conta gratuita**:
   - Site: https://redis.com/try-free/
   - Crie uma conta e um banco de dados gratuito

2. **Obter credenciais**:
   - Copie o host, porta e senha fornecidos

3. **Configurar no .env**:
   ```env
   REDIS_HOST=seu-host-redis-cloud.redis.cloud
   REDIS_PORT=12345
   REDIS_PASSWORD=sua-senha-redis-cloud
   REDIS_DB=0
   ```

## Configuração no Projeto

### 1. Criar arquivo .env

Copie o `env.example` para `.env` na pasta `backend`:

```bash
cd backend
copy env.example .env
```

### 2. Configurar variáveis Redis no .env

Abra o arquivo `backend/.env` e configure:

```env
# Redis
REDIS_HOST=localhost          # Host do Redis (localhost para instalação local)
REDIS_PORT=6379               # Porta padrão do Redis
REDIS_PASSWORD=               # Deixe vazio se não usar senha (desenvolvimento)
REDIS_DB=0                    # Número do banco de dados (0-15)
REDIS_ENABLED=true            # true para habilitar, false para desabilitar
```

### 3. Configurações de Cache (Opcional)

```env
# Cache - Tempos em segundos
CACHE_TTL_DEFAULT=300         # 5 minutos (padrão)
CACHE_TTL_TUTORIALS=600       # 10 minutos
CACHE_TTL_CATEGORIES=1800     # 30 minutos
```

### 4. Configurações de Rate Limiting (Opcional)

```env
# Rate Limiting - Requisições por minuto
RATE_LIMIT_AUTH=5            # Endpoints de autenticação
RATE_LIMIT_API=100           # API geral
RATE_LIMIT_UPLOAD=10         # Endpoints de upload
```

## Testando a Conexão

### 1. Verificar se Redis está rodando

**Docker:**
```bash
docker ps | findstr redis
```

**WSL/Linux:**
```bash
redis-cli ping
# Deve retornar: PONG
```

**Windows (PowerShell):**
```powershell
Test-NetConnection -ComputerName localhost -Port 6379
```

### 2. Testar via código

O servidor tentará conectar automaticamente ao iniciar. Você verá uma das mensagens:

- ✅ **Sucesso**: `✅ Conectado ao Redis: localhost:6379`
- ⚠️ **Modo offline**: `⚠️ Redis não disponível. Sistema funcionará em modo offline.`

### 3. Testar manualmente com redis-cli

```bash
# Conectar ao Redis
redis-cli

# Testar comandos básicos
SET teste "Hello Redis"
GET teste
# Deve retornar: "Hello Redis"

# Ver todas as chaves
KEYS *

# Sair
exit
```

## Modo Offline (Sem Redis)

Se você não quiser usar Redis agora, pode desabilitar:

```env
REDIS_ENABLED=false
```

O sistema funcionará normalmente, mas:
- ❌ Cache não funcionará
- ❌ Token blacklist não funcionará (logout não invalidará tokens)
- ❌ Rate limiting não funcionará

## Solução de Problemas

### Erro: "ECONNREFUSED"

**Causa**: Redis não está rodando ou porta incorreta.

**Solução**:
1. Verifique se Redis está rodando
2. Confirme a porta no `.env` (padrão: 6379)
3. Verifique firewall do Windows

### Erro: "Too many reconnection attempts"

**Causa**: Redis não está disponível e o sistema tentou reconectar muitas vezes.

**Solução**:
1. Inicie o Redis
2. Reinicie o servidor Node.js
3. Ou desabilite Redis temporariamente: `REDIS_ENABLED=false`

### Redis não conecta após instalação

**Solução**:
1. Verifique se o serviço está rodando:
   ```bash
   # Docker
   docker ps
   
   # WSL
   sudo service redis-server status
   ```

2. Teste a conexão manualmente:
   ```bash
   redis-cli -h localhost -p 6379 ping
   ```

3. Verifique logs do Redis para erros

## Comandos Úteis

### Docker

```bash
# Ver logs do Redis
docker logs redis-tutoriaislukos

# Reiniciar Redis
docker restart redis-tutoriaislukos

# Remover container (dados serão perdidos)
docker rm -f redis-tutoriaislukos
```

### WSL/Linux

```bash
# Iniciar Redis
sudo service redis-server start

# Parar Redis
sudo service redis-server stop

# Reiniciar Redis
sudo service redis-server restart

# Ver status
sudo service redis-server status
```

### Limpar dados do Redis

```bash
# Conectar ao Redis
redis-cli

# Limpar todos os dados (CUIDADO!)
FLUSHALL

# Limpar apenas banco atual
FLUSHDB

# Limpar apenas chaves de rate limiting (útil quando bloqueado por 429)
KEYS ratelimit:*
# Depois, para cada chave listada, execute:
DEL ratelimit:192.168.0.157
# Ou limpar todas de uma vez (se houver poucas):
DEL ratelimit:*
```

**Limpar rate limiting via código (Node.js):**
```javascript
// No console do Node.js ou em um script
const redis = require('ioredis');
const client = new Redis();
const keys = await client.keys('ratelimit:*');
if (keys.length > 0) {
  await client.del(...keys);
  console.log(`Limpeza concluída: ${keys.length} chaves removidas`);
}
```

## Próximos Passos

1. ✅ Instalar Redis (escolha uma das opções acima)
2. ✅ Configurar `.env` com as credenciais corretas
3. ✅ Iniciar o servidor backend: `npm run dev`
4. ✅ Verificar logs para confirmar conexão bem-sucedida

## Recursos Adicionais

- [Documentação Redis](https://redis.io/docs/)
- [ioredis (cliente Node.js)](https://github.com/redis/ioredis)
- [Docker Hub - Redis](https://hub.docker.com/_/redis)

