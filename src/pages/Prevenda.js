import React from "react";
import { 
  ShoppingCart, CreditCard, DollarSign, 
  CheckCircle, FileText, 
  Car, UserCheck, Package, Truck, Target, BarChart3, Users
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function Prevenda() {
  const categorias = ["Cadastros", "Vendas", "Finanças", "Gestão"];

  const dados = [
    { id: 1, title: "Cadastro de Cliente", category: "Cadastros", productCount: 0, icon: UserCheck, color: "from-blue-500 to-blue-700", description: "Cadastre novos clientes no sistema.", tutorialId: "cadastro-cliente-prevenda" },
    { id: 2, title: "Cadastro de Produtos", category: "Cadastros", productCount: 0, icon: Package, color: "from-purple-500 to-purple-700", description: "Gerencie o cadastro de produtos.", tutorialId: "cadastro-produtos-prevenda" },
    { id: 3, title: "Cadastro de Veículos", category: "Cadastros", productCount: 0, icon: Car, color: "from-green-500 to-green-700", description: "Cadastre veículos no sistema.", tutorialId: "cadastro-veiculos-prevenda" },
    { id: 4, title: "Orçamento", category: "Vendas", productCount: 0, icon: FileText, color: "from-orange-500 to-orange-700", description: "Crie e gerencie orçamentos.", tutorialId: "orcamento-prevenda" },
    { id: 5, title: "Venda", category: "Vendas", productCount: 0, icon: ShoppingCart, color: "from-pink-500 to-pink-700", description: "Realize vendas no sistema.", tutorialId: "venda-prevenda" },
    { id: 6, title: "Comissões", category: "Finanças", productCount: 0, icon: DollarSign, color: "from-yellow-500 to-yellow-700", description: "Gerencie comissões de vendedores.", tutorialId: "comissoes-prevenda" },
    { id: 7, title: "Contas a Receber", category: "Finanças", productCount: 0, icon: CreditCard, color: "from-indigo-500 to-indigo-700", description: "Gerencie contas a receber.", tutorialId: "contas-receber-prevenda" },
    { id: 8, title: "Financeiro", category: "Finanças", productCount: 0, icon: CheckCircle, color: "from-green-600 to-green-800", description: "Visualize relatórios financeiros.", tutorialId: "financeiro-prevenda" },
    { id: 9, title: "Vendedores", category: "Gestão", productCount: 0, icon: Users, color: "from-teal-500 to-teal-700", description: "Gerencie equipe de vendedores.", tutorialId: "vendedores-prevenda" },
    { id: 10, title: "Metas e Metas", category: "Gestão", productCount: 0, icon: Target, color: "from-red-500 to-red-700", description: "Defina e acompanhe metas.", tutorialId: "metas-prevenda" },
    { id: 11, title: "Estoque", category: "Gestão", productCount: 0, icon: Package, color: "from-gray-500 to-gray-700", description: "Controle de estoque.", tutorialId: "estoque-prevenda" },
    { id: 12, title: "Relatórios", category: "Gestão", productCount: 0, icon: BarChart3, color: "from-blue-600 to-blue-800", description: "Consulte relatórios gerenciais.", tutorialId: "relatorios-prevenda" },
  ];

  return (
    <Categoriaisdostutoriais
      title="Pré-Venda"
      subtitle="Sistema completo para gestão de vendas e frotas"
      categories={categorias}
      data={dados}
    />
  );
}

export default Prevenda;
