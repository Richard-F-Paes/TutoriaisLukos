// Menus padrão do header (fallback quando não há configuração no banco)
// Formato consumido pelo NavbarCategoria: [{ label, items: [{ label, tutorialSlug }] }]
export const defaultHeaderMenus = [
  {
    label: 'PDV',
    items: [
      { label: 'PDV Pista', tutorialSlug: null },
      { label: 'PDV Loja', tutorialSlug: null },
    ],
  },
  {
    label: 'Retaguarda',
    items: [
      { label: 'Cadastros', tutorialSlug: null },
      { label: 'Produtos', tutorialSlug: null },
    ],
  },
  {
    label: 'Aplicativos',
    items: [
      { label: 'Pré-venda', tutorialSlug: null },
      { label: 'Inventário', tutorialSlug: null },
      { label: 'Instalar Lukos Pay', tutorialSlug: null },
      { label: 'Venda de Combustível', tutorialSlug: null },
      { label: 'Venda de Produto', tutorialSlug: null },
    ],
  },
  {
    label: 'Web',
    items: [
      { label: 'Dashboard', tutorialSlug: null },
      { label: 'Fatura Web', tutorialSlug: null },
    ],
  },
];


