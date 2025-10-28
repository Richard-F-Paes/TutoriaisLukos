import React from "react";
import { 
  DollarSign, Receipt, 
  FileText, Package, BarChart3, Users,
  Settings, FileCheck, Printer, Wrench, XCircle
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function FaturaWeb() {
  const categorias = ["Notas Fiscais", "Clientes", "Produtos", "Relatórios"];

  const dados = [
    { id: 1, title: "Emitir Nota Fiscal", category: "Notas Fiscais", productCount: 0, icon: Receipt, color: "from-blue-500 to-blue-700", description: "Emita notas fiscais eletrônicas.", tutorialId: "emitir-nf-faturaweb" },
    { id: 2, title: "Cancelar Nota Fiscal", category: "Notas Fiscais", productCount: 0, icon: XCircle, color: "from-red-500 to-red-700", description: "Cancele notas fiscais emitidas.", tutorialId: "cancelar-nf-faturaweb" },
    { id: 3, title: "Imprimir Nota Fiscal", category: "Notas Fiscais", productCount: 0, icon: Printer, color: "from-gray-500 to-gray-700", description: "Imprima notas fiscais.", tutorialId: "imprimir-nf-faturaweb" },
    { id: 4, title: "Cadastro de Clientes", category: "Clientes", productCount: 0, icon: Users, color: "from-green-500 to-green-700", description: "Gerencie clientes.", tutorialId: "cadastro-clientes-faturaweb" },
    { id: 5, title: "Emissão de Boletinos", category: "Clientes", productCount: 0, icon: FileCheck, color: "from-purple-500 to-purple-700", description: "Emita boletos para clientes.", tutorialId: "boletos-faturaweb" },
    { id: 6, title: "Cadastro de Produtos", category: "Produtos", productCount: 0, icon: Package, color: "from-orange-500 to-orange-700", description: "Gerencie produtos.", tutorialId: "cadastro-produtos-faturaweb" },
    { id: 7, title: "Serviços", category: "Produtos", productCount: 0, icon: Wrench, color: "from-indigo-500 to-indigo-700", description: "Cadastre serviços.", tutorialId: "servicos-faturaweb" },
    { id: 8, title: "Relatório Financeiro", category: "Relatórios", productCount: 0, icon: BarChart3, color: "from-yellow-500 to-yellow-700", description: "Consulte relatórios financeiros.", tutorialId: "relatorio-financeiro-faturaweb" },
    { id: 9, title: "Configurações", category: "Relatórios", productCount: 0, icon: Settings, color: "from-gray-600 to-gray-800", description: "Configure o sistema.", tutorialId: "configuracoes-faturaweb" },
  ];

  return (
    <Categoriaisdostutoriais
      title="Fatura Web"
      subtitle="Sistema de emissão de notas fiscais eletrônicas"
      categories={categorias}
      data={dados}
    />
  );
}

export default FaturaWeb;
