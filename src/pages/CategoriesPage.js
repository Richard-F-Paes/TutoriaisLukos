import React from "react";
import { UserPlus, Tag, ShoppingCart, CreditCard, Boxes, FileText, Settings, BarChart3, HeartHandshake, Link as LinkIcon, BookOpen } from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function CategoriesPage() {
  const categorias = [
    "Cadastros",
    "Produtos",
    "Compras",
    "Financeiro",
    "Estoque",
    "Fiscal",
    "Ferramentas",
    "Relatórios",
    "Fidelidade",
    "Integrações"
  ];

  const dados = [
    { id: 1, title: "Cadastros", category: "Cadastros", productCount: 145, icon: UserPlus, color: "from-blue-500 to-blue-600", description: "Gerenciamento de clientes, fornecedores e usuários do sistema." },
    { id: 2, title: "Produtos", category: "Produtos", productCount: 89, icon: Tag, color: "from-pink-500 to-rose-600", description: "Organização e manutenção do catálogo de itens e serviços." },
    { id: 3, title: "Compras", category: "Compras", productCount: 67, icon: ShoppingCart, color: "from-green-500 to-emerald-600", description: "Controle de pedidos de compra e entrada de notas fiscais." },
    { id: 4, title: "Financeiro", category: "Financeiro", productCount: 34, icon: CreditCard, color: "from-gray-600 to-gray-700", description: "Gestão de contas a pagar, a receber, caixa e bancos." },
    { id: 5, title: "Estoque", category: "Estoque", productCount: 78, icon: Boxes, color: "from-purple-500 to-violet-600", description: "Acompanhamento do inventário e movimentações." },
    { id: 6, title: "Fiscal", category: "Fiscal", productCount: 156, icon: FileText, color: "from-amber-500 to-orange-600", description: "Emissão de notas fiscais, impostos e obrigações acessórias." },
    { id: 7, title: "Ferramentas", category: "Ferramentas", productCount: 92, icon: Settings, color: "from-red-500 to-pink-600", description: "Ajustes gerais, backups e utilitários do sistema." },
    { id: 8, title: "Relatórios", category: "Relatórios", productCount: 43, icon: BarChart3, color: "from-yellow-500 to-orange-500", description: "Visualização de dados e performance de vendas e estoque." },
    { id: 9, title: "Fidelidade", category: "Fidelidade", productCount: 61, icon: HeartHandshake, color: "from-indigo-500 to-blue-600", description: "Programas de pontos e recompensas para clientes." },
    { id: 10, title: "Integrações", category: "Integrações", productCount: 55, icon: LinkIcon, color: "from-cyan-500 to-teal-600", description: "Conexão com e-commerce e serviços externos." },
  ];

  return (
    <Categoriaisdostutoriais
      title="Tutoriais do Sistema"
      subtitle="Acesse os tutoriais organizados por área do sistema Lukos"
      categories={categorias}
      data={dados}
    />
  );
}

export default CategoriesPage;
