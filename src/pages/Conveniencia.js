import React from "react";
import { 
  Key, Zap, ShoppingCart, CreditCard, DollarSign, 
  CheckCircle, XCircle, Printer, Coffee, Tag, FileText, Wrench
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function Conveniencia() {
  const categorias = ["Vendas", "Financeiro", "Operações", "Relatórios"];

  const dados = [
    { id: 1, title: "Código Rápido", category: "Vendas", productCount: 0, icon: Zap, color: "from-yellow-500 to-yellow-700", description: "Configure códigos rápidos para produtos mais vendidos.", tutorialId: "codigo-rapido-loja" },
    { id: 2, title: "Venda de produtos", category: "Vendas", productCount: 0, icon: ShoppingCart, color: "from-purple-500 to-purple-700", description: "Realize vendas de produtos na loja com diferentes formas de pagamento.", tutorialId: "venda-produtos-loja" },
    { id: 3, title: "Efetuar um serviço", category: "Vendas", productCount: 0, icon: Wrench, color: "from-orange-500 to-orange-700", description: "Registre serviços realizados na loja.", tutorialId: "efetuar-servico-loja" },
    { id: 4, title: "Lançar Sangria", category: "Financeiro", productCount: 0, icon: DollarSign, color: "from-red-500 to-red-700", description: "Registre retiradas de dinheiro do caixa da loja.", tutorialId: "lancar-sangria-loja" },
    { id: 5, title: "Lançar Despesa/Pagamento", category: "Financeiro", productCount: 0, icon: CreditCard, color: "from-pink-500 to-pink-700", description: "Registre despesas e pagamentos realizados na loja.", tutorialId: "lancar-despesa-pagamento-loja" },
    { id: 6, title: "Lançar Recebimento", category: "Financeiro", productCount: 0, icon: CheckCircle, color: "from-green-400 to-green-600", description: "Registre recebimentos realizados na loja.", tutorialId: "lancar-recebimento-loja" },
    { id: 7, title: "Cancelar Venda", category: "Operações", productCount: 0, icon: XCircle, color: "from-gray-500 to-gray-700", description: "Cancele vendas registradas na loja quando necessário.", tutorialId: "cancelar-venda-loja" },
    { id: 8, title: "Cancelar Cupom", category: "Operações", productCount: 0, icon: XCircle, color: "from-gray-400 to-gray-600", description: "Cancele cupons fiscais emitidos na loja.", tutorialId: "cancelar-cupom-loja" },
    { id: 9, title: "Consultar vendas", category: "Relatórios", productCount: 0, icon: FileText, color: "from-blue-400 to-blue-600", description: "Consulte vendas realizadas na loja com filtros e relatórios.", tutorialId: "consultar-vendas-loja" },
    { id: 10, title: "Reimprimir cupom", category: "Relatórios", productCount: 0, icon: Printer, color: "from-gray-400 to-gray-600", description: "Reimprima cupons fiscais já emitidos na loja.", tutorialId: "reimprimir-cupom-loja" },
    { id: 11, title: "Encerrar o Turno", category: "Financeiro", productCount: 0, icon: Coffee, color: "from-green-500 to-green-700", description: "Como encerrar o turno corretamente na loja.", tutorialId: "encerrar-turno-loja" },
    { id: 12, title: "Desconto", category: "Operações", productCount: 0, icon: Tag, color: "from-red-400 to-red-600", description: "Aplique desconto geral na venda da loja.", tutorialId: "desconto-loja" },
    { id: 13, title: "Desconto no item", category: "Operações", productCount: 0, icon: Tag, color: "from-red-500 to-red-700", description: "Aplique desconto em um item específico da venda.", tutorialId: "desconto-item-loja" },
    { id: 14, title: "Abrir gaveta", category: "Operações", productCount: 0, icon: Key, color: "from-indigo-400 to-indigo-600", description: "Abra a gaveta do caixa da loja quando necessário.", tutorialId: "abrir-gaveta-loja" },
    { id: 15, title: "Relatório parcial de caixa", category: "Relatórios", productCount: 0, icon: FileText, color: "from-blue-500 to-blue-700", description: "Visualize relatório parcial de movimentação do caixa da loja.", tutorialId: "relatorio-parcial-caixa-loja" },
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
