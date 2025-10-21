import React from "react";
import { Key, Zap, ShoppingCart, CreditCard, DollarSign } from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function Dashboard() {
  const categorias = ["Cadastros", "Produtos", "Compras", "Financeiro"];

  const dados = [
    { 
      id: 1, 
      title: "Gerar Senha Temporária", 
      category: "Cadastros", 
      productCount: 145, 
      icon: Key,   // ícone alterado
      color: "from-indigo-500 to-indigo-700", 
      description: "Gerenciamento de clientes, fornecedores e usuários do sistema." 
    },
    { 
      id: 2, 
      title: "Preço do Combustível", 
      category: "Produtos", 
      productCount: 89, 
      icon: DollarSign,   // ícone alterado
      color: "from-green-500 to-green-700", 
      description: "Organização e manutenção do catálogo de itens e serviços." 
    },
 
  ];

  return (
    <Categoriaisdostutoriais
      title="Dashboard Financeiro"
      subtitle="Visualize os principais módulos e funcionalidades"
      categories={categorias}
      data={dados}
    />
  );
}

export default Dashboard;
