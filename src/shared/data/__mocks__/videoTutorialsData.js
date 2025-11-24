// Dados completos dos tutoriais de vídeo
export const tutorials = [
  // TUTORIAIS GERAIS
  {
    id: 1,
    title: 'Como Cadastrar Produtos no Sistema',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '125.4K',
    duration: '15:30',
    publishedAt: 'há 2 dias',
    category: 'Tutoriais'
  },
  {
    id: 2,
    title: 'Tutorial Completo do Sistema Lukos',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '198.2K',
    duration: '45:00',
    publishedAt: 'há 2 dias',
    category: 'Tutoriais'
  },
  {
    id: 3,
    title: 'Operação Avançada no PDV',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '142.9K',
    duration: '33:15',
    publishedAt: 'há 5 dias',
    category: 'Tutoriais'
  },
  
  // PISTA
  {
    id: 4,
    title: 'Configurando Bombas de Combustível',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '89.2K',
    duration: '22:15',
    publishedAt: 'há 5 dias',
    category: 'Pista'
  },
  {
    id: 5,
    title: 'Configurar Preços Dinâmicos na Pista',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '81.6K',
    duration: '24:00',
    publishedAt: 'há 3 semanas',
    category: 'Pista'
  },
  {
    id: 6,
    title: 'Venda de Combustíveis no Modo Pista',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '134.6K',
    duration: '22:45',
    publishedAt: 'há 4 dias',
    category: 'Pista'
  },
  
  // CONVENIENCIA
  {
    id: 7,
    title: 'Gestão de Estoque da Conveniência',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '156.7K',
    duration: '18:45',
    publishedAt: 'há 1 semana',
    category: 'Conveniencia'
  },
  {
    id: 8,
    title: 'Movimentação de Produtos Conveniência',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '95.3K',
    duration: '17:30',
    publishedAt: 'há 4 dias',
    category: 'Conveniencia'
  },
  
  // RETAGUARDA - CADASTROS - CLIENTE
  ...Array.from({ length: 5 }, (_, i) => ({
    id: 100 + i,
    title: [
      'Cadastro de Clientes',
      'Consulta Contatos',
      'Rede Clientes',
      'Status do Cliente',
      'Classificação do Tipo de Cliente'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 2, 4][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    subSubcategory: 'Cadastros Cliente'
  })),
  
  // RETAGUARDA - CADASTROS - FUNCIONÁRIO
  ...Array.from({ length: 4 }, (_, i) => ({
    id: 105 + i,
    title: [
      'Cadastro de Funcionários',
      'Cadastro de IdentFid',
      'Criar Grupo de Comissão',
      'Cadastrar funcionário como fornecedor'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [3, 5, 1, 4][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    subSubcategory: 'Cadastro Funcionário'
  })),
  
  // RETAGUARDA - CADASTROS - FORNECEDOR
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 109 + i,
    title: [
      'Cadastros de Fornecedor',
      'Cadastro de fornecedor por CNPJ',
      'Cadastro de fornecedor por CPF'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [4, 6, 2][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    subSubcategory: 'Cadastro de Fornecedor'
  })),
  
  // RETAGUARDA - CADASTROS - UNIDADES OPERACIONAIS
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 112 + i,
    title: [
      'Unidades Operacionais',
      'Cadastro de Contador',
      'Abastecimentos em Espera'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [1, 2, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    subSubcategory: 'Cadastros Unidades Operacionais'
  })),
  
  // RETAGUARDA - CADASTROS - VENDEDOR
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 115 + i,
    title: [
      'Cadastro de Vendedor',
      'Cadastro de vendedor por CNPJ',
      'Cadastro de vendedor por CPF'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [4, 5, 1][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    subSubcategory: 'Cadastros Vendedor'
  })),
  
  // RETAGUARDA - CADASTROS - OUTROS
  ...Array.from({ length: 7 }, (_, i) => ({
    id: 118 + i,
    title: [
      'Configurações WhatsApp',
      'Acesso Lukos',
      'Cadastro de Serviços',
      'Cadastro de Transportadora',
      'Requisição de abastecimento',
      'Ajustes de Bico/Canal',
      'Ajustar o preço dos produtos'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [1, 3, 2, 4, 1, 3, 2][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Cadastros',
    subSubcategory: 'Outros Cadastros'
  })),
  
  // RETAGUARDA - PRODUTOS - AJUSTES E PREÇOS
  ...Array.from({ length: 2 }, (_, i) => ({
    id: 200 + i,
    title: [
      'Ajustes de Bico/Canal',
      'Ajustar o preço dos produtos'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Ajustes e Preços'
  })),
  
  // RETAGUARDA - PRODUTOS - AGENDAMENTO
  {
    id: 202,
    title: 'Agendamento Litros',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há 2 dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Agendamento'
  },
  
  // RETAGUARDA - PRODUTOS - CADASTRO DE PRODUTOS
  ...Array.from({ length: 2 }, (_, i) => ({
    id: 203 + i,
    title: [
      'Cadastro de Produtos - Sem Código de Barras',
      'Cadastro de Produtos - Com Código de Barras'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [1, 4][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Cadastro de Produtos'
  })),
  
  // RETAGUARDA - PRODUTOS - KIT E PROMOÇÕES
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 205 + i,
    title: [
      'Cadastro de KIT',
      'Cadastro de promoção',
      'Cadastro de produtos com várias embalagens'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 1, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'KIT e Promoções'
  })),
  
  // RETAGUARDA - PRODUTOS - ATACAREJO E FISCAL
  ...Array.from({ length: 2 }, (_, i) => ({
    id: 208 + i,
    title: [
      'Atacarejo',
      'Regra Fiscal'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 4][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Atacarejo e Fiscal'
  })),
  
  // RETAGUARDA - PRODUTOS - COMISSÕES
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 210 + i,
    title: [
      'Produtos comissionados',
      'Comissão por grupo',
      'Comissão em produto específico'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [1, 2, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Comissões'
  })),
  
  // RETAGUARDA - PRODUTOS - CÓDIGOS E IDENTIFICAÇÃO
  ...Array.from({ length: 4 }, (_, i) => ({
    id: 213 + i,
    title: [
      'Código Relacionado',
      'Imprimir Etiqueta (cadastro)',
      'Código ANP',
      'Corujão'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [1, 2, 4, 1][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Códigos e Identificação'
  })),
  
  // RETAGUARDA - PRODUTOS - BOMBAS
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 217 + i,
    title: [
      'Cadastro de Bombas',
      'Lacres',
      'Cadastro de Bomba'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [3, 2, 1][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Bombas'
  })),
  
  // RETAGUARDA - PRODUTOS - OUTROS
  ...Array.from({ length: 8 }, (_, i) => ({
    id: 220 + i,
    title: [
      'Cartão de Desconto',
      'Departamentos e Sub Departamentos',
      'Exporta Produto',
      'Grades de Produtos',
      'Reajuste preço de combustível',
      'Reajuste de Preço',
      'Vale Ducha',
      'Cadastro de Produtos'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3, 1][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Produtos',
    subSubcategory: 'Outros Produtos'
  })),
  
  // RETAGUARDA - COMERCIAL
  ...Array.from({ length: 7 }, (_, i) => ({
    id: 300 + i,
    title: [
      'Gestão Comercial',
      'Orçamento',
      'Consulta Pedido Comercial',
      'Configuração Comercial',
      'Vale Cupom',
      'Tabela Especial',
      'Configuração de Meta de Venda'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Comercial'
  })),
  
  // RETAGUARDA - COMPRAS
  ...Array.from({ length: 7 }, (_, i) => ({
    id: 400 + i,
    title: [
      'Entrada de Nota Fiscal',
      'Entrada Simples',
      'Entrada de nota fiscal direto pelo XML',
      'Devolução',
      'Cadastro de motivo',
      'Entrada expressa de produtos',
      'Entrada expressa de combustível'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [3, 2, 4, 1, 2, 3, 1][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Compras'
  })),
  
  // RETAGUARDA - FINANCEIRO
  ...Array.from({ length: 25 }, (_, i) => ({
    id: 500 + i,
    title: [
      'Resumo de Caixa',
      'Adicionar venda no caixa',
      'Adicionar venda negativa no caixa',
      'Adicionar Pagamentos Retaguarda',
      'Adicionar Recebimentos Retaguarda',
      'Alterar forma de recebimento cupom',
      'Imprimir cupom de retaguarda',
      'Adicionar serviço no caixa',
      'Faturamento',
      'Como fechar faturamento',
      'Adicionar/Remover cupom da fatura',
      'Faturamento Aberto',
      'Gerar boleto/Nfe/Enviar por e-mail após fechar faturamento',
      'Vincular Cliente ao Cupom',
      'Contas a pagar',
      'Contas a Receber',
      'Arquivo de Remessa',
      'Arquivo de Retorno do Banco',
      'Comissionamento',
      'Controle de Cheques',
      'Cadastro de Bancos',
      'Cadastro de Cartão',
      'Cadastro de Carteira Digital',
      'Cadastro de Conta Corrente',
      'Cadastro de Categorias e Subcategorias'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Financeiro'
  })),
  
  // RETAGUARDA - ESTOQUE
  ...Array.from({ length: 10 }, (_, i) => ({
    id: 600 + i,
    title: [
      'Cadastro de Estoque',
      'Consulta Estoque',
      'Inventário',
      'Inventário pela Retaguarda',
      'Acesso inventário pelo Aplicativo',
      'Medição de tanques',
      'Transferência de Estoque',
      'Transferência entre Unidade Operacional',
      'Saída não fiscal',
      'Reposição Automática'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [3, 2, 4, 1, 3, 2, 1, 4, 2, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Estoque'
  })),
  
  // RETAGUARDA - FISCAL
  ...Array.from({ length: 11 }, (_, i) => ({
    id: 700 + i,
    title: [
      'Cadastro de NCM',
      'Cadastro de CFOP',
      'Partilha do Simples Nacional',
      'Grupo de Regra Fiscal',
      'Exceção de Regra Fiscal',
      'Exceção por Grupo Regra Fiscal',
      'Exceção de Regra Fiscal por Produto',
      'Exceção Simples Nacional',
      'Regra de Entrada Fiscal',
      'Simulador de Impostos',
      'Gerenciador de NF-e'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Fiscal'
  })),
  
  // RETAGUARDA - FERRAMENTAS
  ...Array.from({ length: 11 }, (_, i) => ({
    id: 800 + i,
    title: [
      'Grupo de Acesso',
      'Unidades de Medida',
      'Enviar E-Mail',
      'Etiquetas Customizadas',
      'Importação de Caixa',
      'Como agrupar caixas',
      'Troca Operador de Caixa',
      'Inforlub',
      'Conciliação SiTEF',
      'Conciliação PicPay',
      'Conciliação'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Ferramentas'
  })),
  
  // RETAGUARDA - RELATÓRIOS
  ...Array.from({ length: 8 }, (_, i) => ({
    id: 900 + i,
    title: [
      'Relatórios Comercial',
      'Relatórios Financeiro',
      'Relatórios Frente de Caixa',
      'Relatórios Produtos',
      'Relatórios Fiscal',
      'Relatórios Entradas',
      'Outros Relatórios',
      'Busca Relatório'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3, 2][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Relatórios'
  })),
  
  // RETAGUARDA - FIDELIDADE
  ...Array.from({ length: 10 }, (_, i) => ({
    id: 1000 + i,
    title: [
      'Configuração de Fidelidade',
      'Resgate de Pontos',
      'Tabela de Pontos',
      'Pontos por SubGrupo',
      'ChatBot',
      'Cadastro Fidelidade',
      'Novo cadastro fidelidade',
      'Extrato fidelidade',
      'Fidelidade Cliente',
      'Mensagens Personalizadas'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 4, 2, 1, 3, 2, 1, 3][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Fidelidade'
  })),
  
  // RETAGUARDA - INTEGRAÇÕES
  ...Array.from({ length: 4 }, (_, i) => ({
    id: 1100 + i,
    title: [
      'Integração Pagseguro',
      'WhatsApp',
      'Mensagens WhatsApp',
      'Fidelidade por Funcionário'
    ][i],
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    duration: `${Math.floor(Math.random() * 20) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    publishedAt: 'há ' + [2, 3, 1, 2][i] + ' dias',
    category: 'Retaguarda',
    subcategory: 'Integrações'
  })),
  
  // DASHBOARD
  {
    id: 28,
    title: 'Acessando Relatórios do Dashboard',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '94.1K',
    duration: '12:20',
    publishedAt: 'há 1 semana',
    category: 'Dashboard'
  },
  {
    id: 29,
    title: 'Gráficos e Análises em Tempo Real',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '68.2K',
    duration: '14:45',
    publishedAt: 'há 3 dias',
    category: 'Dashboard'
  },
  
  // LUKOS PAY
  {
    id: 30,
    title: 'Configurando Pagamentos Lukos Pay',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '67.8K',
    duration: '19:55',
    publishedAt: 'há 4 dias',
    category: 'Lukos Pay'
  },
  {
    id: 31,
    title: 'Integração com Aplicativos de Pagamento',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '82.4K',
    duration: '19:20',
    publishedAt: 'há 5 dias',
    category: 'Lukos Pay'
  },
  
  // PRE-VENDA
  {
    id: 32,
    title: 'Criando Propostas de Pré-Venda',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '103.5K',
    duration: '28:30',
    publishedAt: 'há 6 dias',
    category: 'Pre-Venda'
  },
  {
    id: 33,
    title: 'Gerenciando Orçamentos de Pré-Venda',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '56.7K',
    duration: '16:10',
    publishedAt: 'há 2 semanas',
    category: 'Pre-Venda'
  },
  
  // FATURA WEB
  {
    id: 34,
    title: 'Emitindo NF-e no Fatura Web',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '58.2K',
    duration: '16:40',
    publishedAt: 'há 2 semanas',
    category: 'Fatura Web'
  },
  {
    id: 35,
    title: 'Cancelamento e Correção de Notas Fiscais',
    thumbnail: '/icons/logo.png',
    channel: 'Lukos Tutoriais',
    views: '71.5K',
    duration: '20:30',
    publishedAt: 'há 1 semana',
    category: 'Fatura Web'
  }
];

export default tutorials;
