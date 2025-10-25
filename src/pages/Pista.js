import React from "react";
import { 
  Key, Zap, ShoppingCart, CreditCard, DollarSign, 
  CheckCircle, XCircle, Printer, Coffee, Tag, FileText, Gauge, Wrench
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function Pista() {
  const categorias = ["Vendas", "Financeiro", "Operações", "Relatórios"];

  const dados = [
    { id: 1, title: "Aferição", category: "Operações", productCount: 0, icon: Gauge, color: "from-indigo-500 to-indigo-700", description: "Aferir equipamentos ou processos.", tutorialId: "afericao-bombas" },
    { id: 2, title: "Medição de Tanque", category: "Operações", productCount: 0, icon: Zap, color: "from-yellow-500 to-yellow-700", description: "Registrar medição do tanque de combustível.", tutorialId: "medicao-tanques" },
    { id: 3, title: "Venda de produtos", category: "Vendas", productCount: 0, icon: ShoppingCart, color: "from-green-500 to-green-700", description: "Registrar vendas de produtos.", tutorialId: "venda-produtos-pista" },
    { id: 4, title: "Efetuar um serviço", category: "Vendas", productCount: 0, icon: Wrench, color: "from-yellow-500 to-yellow-700", description: "Registrar serviços realizados.", tutorialId: "efetuar-servico-pista" },
    { id: 5, title: "Lançar Sangria", category: "Financeiro", productCount: 0, icon: DollarSign, color: "from-red-500 to-red-700", description: "Registrar retirada de dinheiro do caixa.", tutorialId: "lancar-sangria-pista" },
    { id: 6, title: "Lançar Despesa/Pagamento", category: "Financeiro", productCount: 0, icon: CreditCard, color: "from-pink-500 to-pink-700", description: "Registrar despesas e pagamentos.", tutorialId: "lancar-despesa-pagamento-pista" },
    { id: 7, title: "Lançar Recebimento", category: "Financeiro", productCount: 0, icon: CheckCircle, color: "from-green-400 to-green-600", description: "Registrar recebimentos.", tutorialId: "lancar-recebimento-pista" },
    { id: 8, title: "Cancelar Venda", category: "Operações", productCount: 0, icon: XCircle, color: "from-gray-500 to-gray-700", description: "Cancelar vendas registradas.", tutorialId: "cancelar-venda-pista" },
    { id: 9, title: "Cancelar Cupom", category: "Operações", productCount: 0, icon: XCircle, color: "from-gray-400 to-gray-600", description: "Cancelar cupons emitidos.", tutorialId: "cancelar-cupom-pista" },
    { id: 10, title: "Consultar vendas", category: "Relatórios", productCount: 0, icon: FileText, color: "from-blue-400 to-blue-600", description: "Consultar vendas realizadas.", tutorialId: "consultar-vendas-pista" },
    { id: 11, title: "Reimprimir cupom", category: "Relatórios", productCount: 0, icon: Printer, color: "from-gray-400 to-gray-600", description: "Reimprimir cupons já emitidos.", tutorialId: "reimprimir-cupom-pista" },
    { id: 12, title: "Encerrar o Turno", category: "Financeiro", productCount: 0, icon: Coffee, color: "from-orange-400 to-orange-600", description: "Finalizar o turno do caixa.", tutorialId: "encerramento-turno" },
    { id: 13, title: "Desconto", category: "Operações", productCount: 0, icon: Tag, color: "from-red-400 to-red-600", description: "Aplicar desconto geral.", tutorialId: "desconto-pista" },
    { id: 14, title: "Desconto no item", category: "Operações", productCount: 0, icon: Tag, color: "from-red-500 to-red-700", description: "Aplicar desconto em um item específico.", tutorialId: "desconto-item-pista" },
    { id: 15, title: "Abrir gaveta", category: "Operações", productCount: 0, icon: Key, color: "from-indigo-400 to-indigo-600", description: "Abrir a gaveta do caixa.", tutorialId: "abrir-gaveta-pista" },
    { id: 16, title: "Relatório parcial de caixa", category: "Relatórios", productCount: 0, icon: FileText, color: "from-blue-500 to-blue-700", description: "Visualizar relatório parcial de caixa.", tutorialId: "relatorio-parcial-caixa-pista" },
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

export default Pista;
