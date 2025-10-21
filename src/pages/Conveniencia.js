import React from "react";
import { 
  Key, Zap, ShoppingCart, CreditCard, DollarSign, 
  CheckCircle, XCircle, Printer, Coffee, Tag, FileText 
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function Conveniencia() {
  const categorias = ["Vendas", "Financeiro", "Operações", "Relatórios"];

  const dados = [
    { id: 1, title: "Código Rápido", category: "Vendas", productCount: 0, icon: Key, color: "from-indigo-500 to-indigo-700", description: "Acesso rápido a funções do sistema." },
    { id: 2, title: "Venda de produtos", category: "Vendas", productCount: 0, icon: ShoppingCart, color: "from-green-500 to-green-700", description: "Registrar vendas de produtos da loja." },
    { id: 3, title: "Efetuar um serviço", category: "Vendas", productCount: 0, icon: Zap, color: "from-yellow-500 to-yellow-700", description: "Registrar serviços realizados na loja." },
    { id: 4, title: "Lançar Sangria", category: "Financeiro", productCount: 0, icon: DollarSign, color: "from-red-500 to-red-700", description: "Registrar retirada de dinheiro do caixa." },
    { id: 5, title: "Lançar Despesa/Pagamento", category: "Financeiro", productCount: 0, icon: CreditCard, color: "from-pink-500 to-pink-700", description: "Registrar despesas e pagamentos." },
    { id: 6, title: "Lançar Recebimento", category: "Financeiro", productCount: 0, icon: CheckCircle, color: "from-green-400 to-green-600", description: "Registrar recebimentos da loja." },
    { id: 7, title: "Cancelar Venda", category: "Operações", productCount: 0, icon: XCircle, color: "from-gray-500 to-gray-700", description: "Cancelar vendas registradas." },
    { id: 8, title: "Cancelar Cupom", category: "Operações", productCount: 0, icon: XCircle, color: "from-gray-400 to-gray-600", description: "Cancelar cupons emitidos." },
    { id: 9, title: "Consultar vendas", category: "Relatórios", productCount: 0, icon: FileText, color: "from-blue-400 to-blue-600", description: "Consultar vendas realizadas." },
    { id: 10, title: "Reimprimir cupom", category: "Relatórios", productCount: 0, icon: Printer, color: "from-gray-400 to-gray-600", description: "Reimprimir cupons já emitidos." },
    { id: 11, title: "Encerrar o Turno", category: "Financeiro", productCount: 0, icon: Coffee, color: "from-orange-400 to-orange-600", description: "Finalizar o turno do caixa." },
    { id: 12, title: "Desconto", category: "Operações", productCount: 0, icon: Tag, color: "from-red-400 to-red-600", description: "Aplicar desconto geral." },
    { id: 13, title: "Desconto no item", category: "Operações", productCount: 0, icon: Tag, color: "from-red-500 to-red-700", description: "Aplicar desconto em um item específico." },
    { id: 14, title: "Abrir gaveta", category: "Operações", productCount: 0, icon: Key, color: "from-indigo-400 to-indigo-600", description: "Abrir a gaveta do caixa." },
    { id: 15, title: "Relatório parcial de caixa", category: "Relatórios", productCount: 0, icon: FileText, color: "from-blue-500 to-blue-700", description: "Visualizar relatório parcial de caixa." },
  ];

  return (
    <Categoriaisdostutoriais
      title="Conveniência"
      subtitle="Visualize os principais módulos e funcionalidades"
      categories={categorias}
      data={dados}
    />
  );
}

export default Conveniencia;
