# Plano de Extração e Migração - Tutoriais Lukos

## Objetivo
Extrair todo o conteúdo do site Google Sites (https://sites.google.com/view/lukos-tutoriais/) e estruturá-lo no banco de dados com as tabelas:
- `dbo.Categories`
- `dbo.Media`
- `dbo.Tutorials`
- `dbo.TutorialSteps`

---

## 1. Análise da Estrutura do Site Original

### 1.1 Estrutura completa (menu do site)
Fonte canônica do mapeamento: menu do próprio site (Google Sites). Abaixo está a árvore completa (categorias → subcategorias → páginas), pronta para ser refletida em `dbo.Categories` e `dbo.Tutorials`.

> Observação: no snapshot automatizado do menu alguns caracteres aparecem “quebrados” (ex.: `Cada tro` = `Cadastro`, `Comi ão` = `Comissão`, `Da hBoard` = `DashBoard`). Para o plano e para a modelagem, considere os nomes corretos conforme exibidos no site.

- **Início**

- **Retaguarda**
  - **Cadastros**
    - **Cadastro de Clientes**
      - Cadastro de clientes com CPF
      - Cadastro de clientes com CNPJ
      - Cadastro de Faturamento
      - Frota
      - Gerar código de liberação
    - **Cadastro de Funcionários**
      - Cadastro de IdentFid
      - Criar Grupo de Comissão
      - Cadastrar funcionário como fornecedor
    - **Cadastros de Fornecedor**
      - Cadastro de fornecedor por CNPJ
      - Cadastro de fornecedor por CPF
    - **Unidades Operacionais**
      - Cadastro de Contador
      - Abastecimentos em Espera
    - **Cadastro de Vendedor**
      - Cadastro de vendedor por CNPJ
      - Cadastro de vendedor por CPF
    - Consulta Contatos
    - Rede Clientes
    - Status do Cliente
    - Classificação do Tipo de Cliente
    - Configurações
    - Whatsapp
    - Acesso Lukos
    - Cadastro de Serviços
    - Cadastro de Transportadora
    - Requisição de abastecimento

  - **Produtos**
    - Ajustes de Bico/Canal
    - Ajustar o preço dos produtos
    - Agendamento Litros
    - **Cadastro de Produtos**
      - Sem Código de Barras
      - Com Código de Barras
      - Cadastro de KIT
      - Cadastro de promoção
      - Cadastro de produtos com várias embalagens
      - Atacarejo
      - Regra Fiscal
      - **Produtos comissionados**
        - Comissão por grupo
        - Comissão em produto específico
      - Código Relacionado
      - Imprimir Etiqueta (cadastro)
      - Código ANP
    - Corujão
    - **Cadastro de Bombas**
      - Lacres
      - Cadastro de Bomba
    - Cartão de Desconto
    - Departamentos e Sub Departamentos
    - Exporta Produto
    - Grades de Produtos
    - Reajuste preço de combustível
    - Reajuste de Preço
    - Vale Ducha

  - **Comercial**
    - Gestão Comercial
    - Orçamento
    - Consulta Pedido Comercial
    - Configuração Comercial
    - Vale Cupom
    - Grupo de Comissão
    - Tabela Especial
    - Configuração de Meta de Venda
    - Vendas no Mercado Livre

  - **Compras**
    - Entrada de Nota Fiscal
    - Entrada Simples
    - Entrada de nota fiscal direto pelo XML
    - Devolução
    - Cadastro de motivo
    - Entrada expressa de produtos
    - Entrada expressa de combustível
    - Configurações de Compras

  - **Financeiro**
    - **Resumo de Caixa**
      - Adicionar venda no caixa
      - Adicionar venda negativa no caixa
      - Adicionar Pagamentos Retaguarda
      - Adicionar Recebimentos Retaguarda
      - Alterar forma de recebimento cupom
      - Imprimir cupom de retaguarda
      - Adicionar serviço no caixa
    - **Faturamento**
      - Como fechar faturamento
      - Adicionar/Remover cupom da fatura
      - Faturamento Aberto
      - Gerar boleto/Nfe/Enviar por e-mail após fechar faturamento
    - Vincular Cliente ao Cupom
    - Contas a pagar
    - Contas a Receber
    - Arquivo de Remessa
    - Arquivo de Retorno do Banco
    - Comissionamento
    - Controle de Cheques
    - **Cadastros - Financeiro**
      - Cadastro de Bancos
      - Cadastro de Cartão
      - Cadastro de Carteira Digital
      - Cadastro de Conta Corrente
      - Cadastro de Categorias e Subcategorias
      - Cadastro de Formas de Pagamento
      - Cadastro de Meios de Pagamento
      - Cadastro de Período de Faturamento
      - Indicando terminal
    - **Extrato Bancário**
      - Transferência entre Contas
      - Importar Extrato
      - Lançamento Conta Cofre

  - **Estoque**
    - Cadastro de Estoque
    - Consulta Estoque
    - **Inventário**
      - Inventário pela Retaguarda
      - Acesso inventário pelo Aplicativo
    - Medição de tanques
    - Transferência de Estoque
    - Transferência entre Unidade Operacional
    - Saída não fiscal
    - Reposição Automática
    - Carga Balança

  - **Fiscal**
    - Cadastro de NCM
    - Cadastro de CFOP
    - Partilha do Simples Nacional
    - Grupo de Regra Fiscal
    - **Exceção de Regra Fiscal**
      - Exceção por Grupo Regra Fiscal
      - Exceção de Regra Fiscal por Produto
      - Exceção Simples Nacional
    - Regra de Entrada Fiscal
    - Simulador de Impostos
    - **Gerenciador de NF-e**
      - Nota Avulsa
      - Como salvar NFe
      - Carta de Correção NF-E
    - Status SEFAZ
    - NFe Cupom Vinculado
    - TicketLog
    - Troca NCM
    - **LMC**
      - Movimentação LMC
      - Como Preencher LMC
    - SPED
    - SPED Contribuições
    - Emissão RPS

  - **Ferramentas**
    - Grupo de Acesso
    - Unidades de Medida
    - Enviar E-Mail
    - Etiquetas Customizadas
    - Importação de Caixa
    - Como agrupar caixas
    - Troca Operador de Caixa
    - Inforlub
    - Conciliação SiTEF
    - Conciliação PicPay
    - Conciliação
    - Contrato Lukos
    - Cadastro de terminal
    - Agendamento Tipo Cupom

  - **Relatórios**
    - **Comercial**
      - Balancete De Vendas
      - Mapa Lucratividade
      - Meta de Vendas
    - **Financeiro**
      - Arquivos Conciliados
      - Comissão
      - Comissão por Cliente
      - Conciliação Lukos
      - Conciliação Pagamento
      - Saldo Conta Cofre x Saldo Dia Cofre
      - Conta Corrente
      - Demonstrativo Resultados
      - Extrato Bancário
      - Faturamento Cliente
      - Faturamento em Aberto
      - Funcionários
      - Importação Arquivo OFX
      - Limite cliente
      - Pendências Cliente
      - Período Faturamento
      - Placa
      - Resultado Operacional
      - Taxas shipay
      - Títulos a Receber
      - Títulos a Pagar
      - Vendas Faturadas (Fiado)
      - Ticket Médio Fidelidade
      - Terminal sem vinculo com cartão
    - **Frente de Caixa**
      - Caixa
      - Exportar CF-e/SAT
      - Vendas Conciliadas
      - Consumo por Placa
      - Cupom
      - Itens x Vendedor
      - Formas de Recebimento
      - Fidelidade
      - Funcionário x IdentFID
      - Pagamentos Frente de Caixa
      - Recebimento de Cartão
      - Resgate de Pontos Fidelidade
      - Venda de Combustível
      - Venda de Produtos
      - Vendas Identificadas
      - Vendas por Funcionário
      - Vendas por Fornecedor
      - TEF
      - Sangrias
      - Venda de Serviços
      - Liberação Admin
      - Recebimento Frente Caixa
      - Resgate Pontos Fidelidade
      - Ticket Médio Por Dia
      - Vendas x Celular
    - **Produtos**
      - Alerta Troca de Preço
      - Automação
      - Combustivel dia da Semana
      - Ganho por litro e taxa média de conciliação
      - Entrada de Produtos
      - **Estoque**
        - Imprimir Estoque
        - Imprimir Etiquetas (relatório)
      - EXCEL br
      - Listagem Produtos
      - Medições Tanque
      - Movimento de Estoque
      - Movimentação de Combustível
      - Movimentação de Produtos
      - Saída não fiscal
      - Tabela Especial
      - Tanques
      - Posição de Estoque
      - Posição de Estoque Geral
      - Produtos mais vendidos
      - Produtos sem venda
      - Validade de Produtos
      - Vendas de Produto
      - Venda de produtos por hora
      - Venda de Combustível
      - Venda de Combustível por Forma de Pagamento
      - Venda de Combustível por hora
      - Vendas Cruzadas
      - Venda de Combustível por Bico
    - **Fiscal**
      - Documentos fiscais - XML
      - Resumo de Imposto
      - Impostos NF-e Entrada
      - Tributação
    - **Entradas**
      - **Compras - NFe**
        - Relatório de Compras
        - Remover entrada de nota fiscal
      - **Entrada Não Fiscal**
        - Compras não fiscais
        - Remover entrada não fiscal
      - Entrada de Bonificação
      - Entrada de Combustíveis
      - Entrada Expressa de Combustíveis
      - Entrada Expressa de Produtos
      - Previsão de Estoque
      - Transferência Estoque
      - Transferência Unidade
    - **Outros**
      - Auditoria de Usuário
      - Funcionário x Permissão
    - Favoritos
    - Tarefas e Alertas
    - Busca Relatório

  - **Fidelidade**
    - **Configuração de Fidelidade**
      - Resgate de Pontos
      - Tabela de Pontos
      - Pontos por SubGrupo
      - ChatBot
    - **Cadastro Fidelidade**
      - Novo cadastro fidelidade
      - Extrato fidelidade
    - Fidelidade Cliente
    - Mensagens Personalizadas
    - WhatsApp
    - Mensagens WhatsApp
    - Fidelidade por Funcionário
    - Fidelidade por Turno

  - **Integrações**
    - Pagseguro

- **PDV**
  - **Pista**
    - Aferição
    - Medição de Tanque
    - Venda de produtos
    - Efetuar um serviço
    - Lançar Sangria
    - Lançar Despesa/Pagamento
    - Lançar Recebimento
    - Cancelar Venda
    - Cancelar Cupom
    - Consultar vendas
    - Reimprimir cupom
    - Encerrar o Turno
    - Desconto
    - Desconto no item
    - Abrir gaveta
    - Relatório parcial de caixa
  - **Loja**
    - Código Rápido
    - Venda de produtos Loja
    - Efetuar um serviço Loja
    - Lançar Sangria Loja
    - Lançar Despesa/Pagamento Loja
    - Lançar Recebimento Loja
    - Cancelar Venda Loja
    - Cancelar Cupom Loja
    - Consultar vendas Loja
    - Reimprimir cupom Loja
    - Encerrar o Turno Loja
    - Desconto Loja
    - Desconto no item Loja
    - Abrir gaveta Loja
    - Relatório parcial de caixa Loja

- **DashBoard**
  - Gerar Senha Temporária
  - Preço do Combustível Dashboard

- **Pré-Venda - Comandas**
  - Pré-Venda - Caixa
  - Pré-Venda - Site
  - Pré-Venda - Windows

- **Fatura WEB**
  - Se cadastrando no Fatura Web
  - Requisição de abastecimento WEB
  - Cadastro de Frota WEB
  - Gerar código de liberação

- **PDV Movel**
  - POS
  - Como finalizar Aplicativo na maquininha da Destaxa

### 1.1.1 Validações de “site completo” (páginas fora do menu)
- Tentativa de acessar `/sitemap`: retorna **página 404** (não há sitemap público).
- Tentativa de acessar `/system/app/pages/sitemap/hierarchy`: retorna **página 404** (endpoint de sitemap do “Google Sites clássico” não existe aqui).
- O site tem busca interna (“Search this site”), que pode ser usada como verificação amostral para encontrar páginas e comparar com o menu.

### 1.2 Tipos de Conteúdo por Página
- **Textos**: Instruções, descrições, passos
- **Imagens**: Screenshots, ilustrações, diagramas
- **Vídeos**: Tutoriais em vídeo (provavelmente embutidos via iframe/embed)
- **Links**: Navegação entre páginas

---

## 2. Estratégia de Extração

### 2.1 Abordagem Recomendada: Web Scraping com Python

**Tecnologias:**
- **BeautifulSoup4**: Parsing de HTML
- **Selenium WebDriver**: Para conteúdo JavaScript dinâmico e navegação
- **Requests**: Download de mídias
- **Pillow**: Processamento de imagens (se necessário)
- **yt-dlp**: Download de vídeos do YouTube (se aplicável)

**Por que Selenium?**
- Google Sites pode carregar conteúdo via JavaScript
- Navegação entre páginas pode ser necessária
- Alguns elementos podem estar em iframes

### 2.2 Alternativa: API do Google Sites (se disponível)
- Verificar se há API oficial do Google Sites
- Pode ser mais eficiente, mas pode ter limitações

---

## 3. Mapeamento: Site → Banco de Dados

### 3.1 Tabela: `dbo.Categories`
**Mapeamento:**
- **Categoria Principal**: Nível 1 (ex: "Retaguarda", "PDV", "DashBoard")
- **Subcategoria**: Nível 2 (ex: "Cadastros", "Produtos", "Financeiro")
- **Sub-subcategoria**: Nível 3 (ex: "Cadastro de Clientes", "Cadastro de Funcionários")

**Estratégia:**
- Extrair hierarquia do menu de navegação
- Criar registros para cada nível
- Manter relação pai-filho

**Exemplo:**
```
Categories:
- id: 1, name: "Retaguarda", parent_id: NULL
- id: 2, name: "Cadastros", parent_id: 1
- id: 3, name: "Cadastro de Clientes", parent_id: 2
```

### 3.2 Tabela: `dbo.Tutorials`
**Mapeamento:**
- Cada página de tutorial = 1 registro
- **Campos esperados:**
  - `title`: Título da página
  - `description`: Descrição/resumo (se houver)
  - `category_id`: FK para Categories
  - `url_original`: URL do Google Sites (para referência)
  - `content`: Conteúdo HTML/texto completo
  - `order`: Ordem de exibição
  - `created_at`, `updated_at`: Timestamps

**Estratégia:**
- Extrair título da página (tag `<title>` ou `<h1>`)
- Extrair conteúdo principal (div principal ou article)
- Identificar categoria baseada na URL ou breadcrumb

### 3.3 Tabela: `dbo.TutorialSteps`
**Mapeamento:**
- Cada passo/etapa do tutorial = 1 registro
- **Campos esperados:**
  - `tutorial_id`: FK para Tutorials
  - `step_number`: Número do passo (ordem)
  - `title`: Título do passo
  - `content`: Conteúdo do passo (texto/HTML)
  - `order`: Ordem de exibição

**Estratégia:**
- Identificar estrutura de passos na página:
  - Listas numeradas (`<ol>`)
  - Seções com títulos (`<h2>`, `<h3>`)
  - Divs com classes específicas
- Dividir conteúdo em passos lógicos

### 3.4 Tabela: `dbo.Media`
**Mapeamento:**
- Cada imagem/vídeo = 1 registro
- **Campos esperados:**
  - `tutorial_id`: FK para Tutorials (opcional)
  - `tutorial_step_id`: FK para TutorialSteps (opcional)
  - `media_type`: "image" | "video" | "document"
  - `url`: URL original ou local
  - `file_path`: Caminho local do arquivo baixado
  - `file_name`: Nome do arquivo
  - `file_size`: Tamanho em bytes
  - `mime_type`: Tipo MIME
  - `thumbnail_url`: URL da miniatura (para vídeos)

**Estratégia:**
- Extrair todas as tags `<img>` → `src` attribute
- Extrair todos os `<video>` → `src` attribute
- Extrair iframes de vídeos (YouTube, Vimeo, etc.) → URL do embed
- Extrair links para arquivos (PDFs, etc.)
- **Download de mídias:**
  - Baixar imagens para pasta local
  - Para vídeos embutidos: extrair URL do embed (não baixar, apenas referenciar)
  - Para vídeos diretos: baixar se necessário

---

## 4. Processo de Extração Detalhado

### 4.1 Fase 1: Descoberta e Mapeamento
**Objetivo**: Identificar todas as URLs do site

**Passos:**
1. Acessar página inicial
2. Extrair menu de navegação
3. Identificar todas as URLs de páginas
4. Criar lista completa de URLs para processar
5. Mapear hierarquia de categorias

**Script:**
```python
# Pseudocódigo
def discover_pages(base_url):
    # Navegar para página inicial
    # Extrair links do menu
    # Seguir links recursivamente
    # Retornar lista de URLs
```

### 4.2 Fase 2: Extração de Conteúdo
**Objetivo**: Extrair conteúdo de cada página

**Para cada página:**
1. Carregar página com Selenium
2. Aguardar carregamento completo (JavaScript)
3. Extrair:
   - Título
   - Conteúdo principal
   - Imagens (URLs)
   - Vídeos (URLs/embeds)
   - Links internos
4. Identificar categoria baseada na URL/breadcrumb
5. Dividir conteúdo em passos (se aplicável)

**Script:**
```python
def extract_page_content(url):
    # Carregar página
    # Extrair elementos
    # Retornar objeto estruturado
```

### 4.3 Fase 3: Download de Mídias
**Objetivo**: Baixar todas as imagens e referenciar vídeos

**Para cada mídia:**
1. **Imagens:**
   - Validar URL
   - Baixar arquivo
   - Salvar em estrutura de pastas organizada
   - Registrar metadados

2. **Vídeos:**
   - Identificar tipo (YouTube, Vimeo, direto)
   - Extrair ID/URL do vídeo
   - Registrar URL de embed (não baixar)
   - Se vídeo direto: baixar

**Estrutura de pastas sugerida:**
```
media/
├── images/
│   ├── tutorial_1/
│   │   ├── step_1_image_1.jpg
│   │   └── step_2_image_1.png
│   └── tutorial_2/
└── videos/
    └── (apenas referências, não downloads)
```

### 4.4 Fase 4: Processamento e Limpeza
**Objetivo**: Preparar dados para inserção no banco

**Ações:**
1. Limpar HTML (remover scripts, estilos desnecessários)
2. Normalizar textos (remover espaços extras, quebras de linha)
3. Validar URLs de mídias
4. Identificar e corrigir duplicatas
5. Validar integridade referencial (FKs)

### 4.5 Fase 5: Inserção no Banco de Dados
**Objetivo**: Popular banco de dados

**Ordem de inserção (respeitando FKs):**
1. `dbo.Categories` (primeiro nível, depois filhos)
2. `dbo.Tutorials`
3. `dbo.Media` (associado a tutoriais)
4. `dbo.TutorialSteps`
5. Atualizar `dbo.Media` com associações a passos

**Método:**
- Scripts SQL gerados automaticamente
- Ou uso de ORM (SQLAlchemy) para inserção programática
- Validação de constraints antes de inserção

---

## 5. Desafios e Soluções

### 5.1 Desafio: Conteúdo em JavaScript
**Solução**: Usar Selenium WebDriver com wait explícito

### 5.2 Desafio: Vídeos Embarcados (YouTube, etc.)
**Solução**: 
- Extrair URL do iframe
- Identificar plataforma (YouTube, Vimeo)
- Extrair ID do vídeo
- Armazenar URL de embed completa

### 5.3 Desafio: Estrutura de Passos
**Solução**:
- Analisar padrões HTML
- Usar heurísticas (listas numeradas, seções)
- Permitir ajuste manual se necessário

### 5.4 Desafio: Hierarquia de Categorias
**Solução**:
- Analisar URL (ex: `/retaguarda/cadastros/clientes`)
- Analisar breadcrumb na página
- Analisar menu de navegação

### 5.5 Desafio: Rate Limiting / Bloqueios
**Solução**:
- Adicionar delays entre requisições
- Usar User-Agent realista
- Implementar retry com backoff exponencial
- Considerar uso de proxies se necessário

---

## 6. Estrutura do Projeto Python

```
webscrape-tutoriais-lukos/
├── src/
│   ├── scraper/
│   │   ├── __init__.py
│   │   ├── discoverer.py      # Descoberta de páginas
│   │   ├── extractor.py      # Extração de conteúdo
│   │   ├── media_downloader.py  # Download de mídias
│   │   └── processor.py      # Processamento e limpeza
│   ├── database/
│   │   ├── __init__.py
│   │   ├── models.py         # Modelos das tabelas
│   │   └── inserter.py       # Inserção no banco
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── html_cleaner.py  # Limpeza de HTML
│   │   └── validators.py    # Validação de dados
│   └── main.py              # Script principal
├── media/                    # Mídias baixadas
│   ├── images/
│   └── videos/
├── data/                     # Dados intermediários
│   ├── pages.json           # Páginas descobertas
│   ├── categories.json      # Categorias mapeadas
│   └── raw_content/         # Conteúdo bruto
├── requirements.txt
├── config.py                # Configurações
└── README.md
```

---

## 7. Bibliotecas Python Necessárias

```txt
beautifulsoup4>=4.12.0
selenium>=4.15.0
requests>=2.31.0
lxml>=4.9.0
Pillow>=10.0.0
pyodbc>=5.0.0  # Para SQL Server
python-dotenv>=1.0.0
tqdm>=4.66.0  # Progress bar
```

---

## 8. Fluxo de Execução

```
1. Executar discoverer.py
   └──> Gera: pages.json, categories.json

2. Executar extractor.py
   └──> Gera: raw_content/*.json (uma por página)

3. Executar media_downloader.py
   └──> Baixa: media/images/*, media/videos/*
   └──> Atualiza: raw_content/*.json com paths locais

4. Executar processor.py
   └──> Processa: raw_content/*.json
   └──> Gera: processed_data/tutorials.json, steps.json, media.json

5. Executar inserter.py
   └──> Insere no banco de dados SQL Server
```

---

## 9. Validação e Testes

### 9.1 Validações Necessárias
- [ ] Todas as páginas foram descobertas
- [ ] Todas as categorias foram mapeadas corretamente
- [ ] Todas as mídias foram baixadas/referenciadas
- [ ] Conteúdo foi extraído sem perda de informação
- [ ] Relacionamentos FK estão corretos
- [ ] Não há duplicatas

### 9.2 Testes
- Teste unitário para cada módulo
- Teste de integração do fluxo completo
- Validação manual de amostra de dados

---

## 10. Considerações Importantes

### 10.1 Legal e Ética
- ✅ Verificar termos de uso do Google Sites
- ✅ Respeitar robots.txt (se existir)
- ✅ Implementar delays entre requisições
- ✅ Usar User-Agent apropriado

### 10.2 Performance
- Processar em lotes (batch)
- Implementar cache para evitar re-extração
- Paralelização cuidadosa (respeitando rate limits)

### 10.3 Manutenibilidade
- Logs detalhados de cada etapa
- Tratamento de erros robusto
- Possibilidade de retomar processo interrompido
- Relatórios de progresso

### 10.4 Backup
- Fazer backup do banco antes de inserção
- Manter dados brutos extraídos (JSON)
- Manter mídias baixadas

---

## 11. Próximos Passos

1. **Setup do Ambiente**
   - Criar ambiente virtual Python
   - Instalar dependências
   - Configurar conexão com banco de dados

2. **Desenvolvimento Incremental**
   - Implementar discoverer primeiro
   - Testar com pequena amostra
   - Iterar e refinar

3. **Execução Completa**
   - Executar em ambiente de teste primeiro
   - Validar resultados
   - Executar em produção

4. **Documentação**
   - Documentar estrutura do banco
   - Documentar mapeamentos específicos
   - Criar guia de uso

---

## 12. Referências e Recursos

- [BeautifulSoup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [Google Sites Structure](https://support.google.com/sites/answer/98081)
- [Web Scraping Best Practices](https://www.scrapehero.com/web-scraping-best-practices/)

---

**Data de Criação**: 2024
**Status**: Plano Inicial
**Próxima Revisão**: Após análise técnica inicial

