import React from "react";
import { 
  UserPlus, 
  Tag, 
  ShoppingCart, 
  CreditCard, 
  Boxes, 
  FileText, 
  Settings, 
  BarChart3, 
  HeartHandshake, 
  Link as LinkIcon, 
  BookOpen,
  Users,
  Building,
  Truck,
  MapPin,
  UserCheck,
  Package,
  DollarSign,
  TrendingUp,
  Calculator,
  Shield,
  Wrench,
  PieChart,
  Star,
  Zap,
  Phone,
  Mail,
  Globe,
  Database,
  Clipboard,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  Monitor,
  Smartphone,
  Car,
  Fuel,
  Receipt,
  Banknote,
  Wallet,
  FileSpreadsheet,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Home,
  Building2,
  Store,
  Factory,
  Warehouse,
  Grid
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function CategoriesPage() {
  const categorias = [
    "Cadastros",
    "Produtos",
    "Comercial",
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
    // CADASTROS - Card Principal
    { 
      id: 1, 
      title: "Cadastros", 
      category: "Cadastros", 
      productCount: 15, 
      icon: Users, 
      color: "from-blue-500 to-blue-700", 
      description: "Gestão completa de cadastros: Clientes, Funcionários, Fornecedores, Vendedores e muito mais.",
      link: "/cadastros",
      features: ["Clientes", "Funcionários", "Fornecedores"]
    },

    // PRODUTOS
    { 
      id: 2, 
      title: "Ajustes de Bico/Canal", 
      category: "Produtos", 
      productCount: 14, 
      icon: Settings, 
      color: "from-blue-600 to-blue-800", 
      description: "Configuração e ajustes de bicos e canais de combustível.",
      link: "/tutorial/ajustes-bico-canal",
      features: ["Bico", "Canal", "Combustível"]
    },
    { 
      id: 3, 
      title: "Ajustar Preço dos Produtos", 
      category: "Produtos", 
      productCount: 16, 
      icon: DollarSign, 
      color: "from-green-600 to-green-800", 
      description: "Gestão e ajuste de preços de produtos e serviços.",
      link: "/tutorial/ajustar-preco-produtos",
      features: ["Preços", "Produtos", "Ajuste"]
    },
    { 
      id: 4, 
      title: "Agendamento Litros", 
      category: "Produtos", 
      productCount: 10, 
      icon: Calendar, 
      color: "from-purple-600 to-purple-800", 
      description: "Sistema de agendamento de litros e programação.",
      link: "/tutorial/agendamento-litros",
      features: ["Agendamento", "Litros", "Programação"]
    },
    { 
      id: 5, 
      title: "Cadastro de Produtos", 
      category: "Produtos", 
      productCount: 25, 
      icon: Package, 
      color: "from-orange-600 to-orange-800", 
      description: "Cadastro completo de produtos com código de barras e KITs.",
      link: "/tutorial/cadastro-produtos",
      features: ["Produtos", "Código Barras", "KITs"]
    },
    { 
      id: 6, 
      title: "Corujão", 
      category: "Produtos", 
      productCount: 8, 
      icon: Clock, 
      color: "from-cyan-600 to-cyan-800", 
      description: "Sistema de controle e gestão do Corujão.",
      link: "/tutorial/corujao",
      features: ["Corujão", "Controle", "Gestão"]
    },
    { 
      id: 7, 
      title: "Cadastro de Bombas", 
      category: "Produtos", 
      productCount: 12, 
      icon: Fuel, 
      color: "from-pink-600 to-pink-800", 
      description: "Cadastro de bombas, lacres e equipamentos.",
      link: "/tutorial/cadastro-bombas",
      features: ["Bombas", "Lacres", "Equipamentos"]
    },
    { 
      id: 8, 
      title: "Cartão de Desconto", 
      category: "Produtos", 
      productCount: 9, 
      icon: CreditCard, 
      color: "from-teal-600 to-teal-800", 
      description: "Sistema de cartões de desconto e promoções.",
      link: "/tutorial/cartao-desconto",
      features: ["Desconto", "Cartão", "Promoções"]
    },
    { 
      id: 9, 
      title: "Departamentos e Sub Departamentos", 
      category: "Produtos", 
      productCount: 13, 
      icon: Building2, 
      color: "from-lime-600 to-lime-800", 
      description: "Organização de departamentos e sub departamentos.",
      link: "/tutorial/departamentos",
      features: ["Departamentos", "Sub", "Organização"]
    },
    { 
      id: 10, 
      title: "Exporta Produto", 
      category: "Produtos", 
      productCount: 7, 
      icon: Download, 
      color: "from-amber-600 to-amber-800", 
      description: "Exportação de dados de produtos e informações.",
      link: "/tutorial/exporta-produto",
      features: ["Exportação", "Produtos", "Dados"]
    },
    { 
      id: 11, 
      title: "Grades de Produtos", 
      category: "Produtos", 
      productCount: 11, 
      icon: Grid, 
      color: "from-red-600 to-red-800", 
      description: "Gestão de grades e variações de produtos.",
      link: "/tutorial/grades-produtos",
      features: ["Grades", "Variações", "Produtos"]
    },
    { 
      id: 12, 
      title: "Reajuste Preço de Combustível", 
      category: "Produtos", 
      productCount: 15, 
      icon: TrendingUp, 
      color: "from-violet-600 to-violet-800", 
      description: "Sistema de reajuste de preços de combustível.",
      link: "/tutorial/reajuste-preco-combustivel",
      features: ["Reajuste", "Preço", "Combustível"]
    },
    { 
      id: 13, 
      title: "Reajuste de Preço", 
      category: "Produtos", 
      productCount: 18, 
      icon: DollarSign, 
      color: "from-sky-600 to-sky-800", 
      description: "Reajuste geral de preços de produtos e serviços.",
      link: "/tutorial/reajuste-preco",
      features: ["Reajuste", "Preços", "Geral"]
    },
    { 
      id: 14, 
      title: "Vale Ducha", 
      category: "Produtos", 
      productCount: 6, 
      icon: Receipt, 
      color: "from-rose-600 to-rose-800", 
      description: "Sistema de vales de ducha e serviços.",
      link: "/tutorial/vale-ducha",
      features: ["Vale", "Ducha", "Serviços"]
    },

    // COMERCIAL
    { 
      id: 15, 
      title: "Gestão Comercial", 
      category: "Comercial", 
      productCount: 20, 
      icon: BarChart3, 
      color: "from-blue-700 to-blue-900", 
      description: "Gestão completa do setor comercial e vendas.",
      link: "/tutorial/gestao-comercial",
      features: ["Comercial", "Vendas", "Gestão"]
    },
    { 
      id: 16, 
      title: "Orçamento", 
      category: "Comercial", 
      productCount: 14, 
      icon: Calculator, 
      color: "from-green-700 to-green-900", 
      description: "Sistema de orçamentos e propostas comerciais.",
      link: "/tutorial/orcamento",
      features: ["Orçamento", "Propostas", "Comercial"]
    },
    { 
      id: 17, 
      title: "Consulta Pedido Comercial", 
      category: "Comercial", 
      productCount: 12, 
      icon: Search, 
      color: "from-purple-700 to-purple-900", 
      description: "Consulta e acompanhamento de pedidos comerciais.",
      link: "/tutorial/consulta-pedido-comercial",
      features: ["Consulta", "Pedidos", "Comercial"]
    },
    { 
      id: 18, 
      title: "Configuração Comercial", 
      category: "Comercial", 
      productCount: 16, 
      icon: Settings, 
      color: "from-orange-700 to-orange-900", 
      description: "Configurações específicas do módulo comercial.",
      link: "/tutorial/configuracao-comercial",
      features: ["Configuração", "Comercial", "Módulo"]
    },
    { 
      id: 19, 
      title: "Vale Cupom", 
      category: "Comercial", 
      productCount: 8, 
      icon: Receipt, 
      color: "from-cyan-700 to-cyan-900", 
      description: "Sistema de vales e cupons comerciais.",
      link: "/tutorial/vale-cupom",
      features: ["Vale", "Cupom", "Comercial"]
    },
    { 
      id: 20, 
      title: "Grupo de Comissão", 
      category: "Comercial", 
      productCount: 10, 
      icon: Users, 
      color: "from-pink-700 to-pink-900", 
      description: "Gestão de grupos de comissão e vendedores.",
      link: "/tutorial/grupo-comissao",
      features: ["Grupo", "Comissão", "Vendedores"]
    },
    { 
      id: 21, 
      title: "Tabela Especial", 
      category: "Comercial", 
      productCount: 13, 
      icon: FileSpreadsheet, 
      color: "from-teal-700 to-teal-900", 
      description: "Gestão de tabelas especiais e preços diferenciados.",
      link: "/tutorial/tabela-especial",
      features: ["Tabela", "Especial", "Preços"]
    },
    { 
      id: 22, 
      title: "Configuração de Meta de Venda", 
      category: "Comercial", 
      productCount: 11, 
      icon: Target, 
      color: "from-lime-700 to-lime-900", 
      description: "Configuração e acompanhamento de metas de venda.",
      link: "/tutorial/configuracao-meta-venda",
      features: ["Meta", "Venda", "Configuração"]
    },
    { 
      id: 23, 
      title: "Vendas no Mercado Livre", 
      category: "Comercial", 
      productCount: 9, 
      icon: Globe, 
      color: "from-amber-700 to-amber-900", 
      description: "Integração com Mercado Livre para vendas online.",
      link: "/tutorial/vendas-mercado-livre",
      features: ["Mercado Livre", "Online", "Integração"]
    },

    // COMPRAS
    { 
      id: 24, 
      title: "Entrada de Nota Fiscal", 
      category: "Compras", 
      productCount: 22, 
      icon: FileText, 
      color: "from-blue-800 to-blue-950", 
      description: "Entrada e processamento de notas fiscais de compra.",
      link: "/tutorial/entrada-nota-fiscal",
      features: ["Nota Fiscal", "Entrada", "Compra"]
    },
    { 
      id: 25, 
      title: "Entrada Simples", 
      category: "Compras", 
      productCount: 15, 
      icon: Plus, 
      color: "from-green-800 to-green-950", 
      description: "Sistema de entrada simples de produtos e mercadorias.",
      link: "/tutorial/entrada-simples",
      features: ["Entrada", "Simples", "Produtos"]
    },
    { 
      id: 26, 
      title: "Entrada de Nota Fiscal XML", 
      category: "Compras", 
      productCount: 18, 
      icon: Upload, 
      color: "from-purple-800 to-purple-950", 
      description: "Entrada direta de notas fiscais via arquivo XML.",
      link: "/tutorial/entrada-nota-fiscal-xml",
      features: ["XML", "Nota Fiscal", "Entrada"]
    },
    { 
      id: 27, 
      title: "Devolução", 
      category: "Compras", 
      productCount: 12, 
      icon: ArrowLeft, 
      color: "from-orange-800 to-orange-950", 
      description: "Sistema de devolução de produtos e mercadorias.",
      link: "/tutorial/devolucao",
      features: ["Devolução", "Produtos", "Mercadorias"]
    },
    { 
      id: 28, 
      title: "Cadastro de Motivo", 
      category: "Compras", 
      productCount: 8, 
      icon: Tag, 
      color: "from-cyan-800 to-cyan-950", 
      description: "Cadastro de motivos para devoluções e cancelamentos.",
      link: "/tutorial/cadastro-motivo",
      features: ["Motivo", "Devolução", "Cancelamento"]
    },
    { 
      id: 29, 
      title: "Entrada Expressa de Produtos", 
      category: "Compras", 
      productCount: 14, 
      icon: Zap, 
      color: "from-pink-800 to-pink-950", 
      description: "Sistema de entrada expressa para produtos diversos.",
      link: "/tutorial/entrada-expressa-produtos",
      features: ["Expressa", "Produtos", "Entrada"]
    },
    { 
      id: 30, 
      title: "Entrada Expressa de Combustível", 
      category: "Compras", 
      productCount: 16, 
      icon: Fuel, 
      color: "from-teal-800 to-teal-950", 
      description: "Entrada expressa específica para combustíveis.",
      link: "/tutorial/entrada-expressa-combustivel",
      features: ["Expressa", "Combustível", "Entrada"]
    },
    { 
      id: 31, 
      title: "Configurações de Compras", 
      category: "Compras", 
      productCount: 20, 
      icon: Settings, 
      color: "from-lime-800 to-lime-950", 
      description: "Configurações gerais do módulo de compras.",
      link: "/tutorial/configuracoes-compras",
      features: ["Configurações", "Compras", "Módulo"]
    }
  ];

  return (
    <Categoriaisdostutoriais
      title="Retaguarda - Tutoriais Completos"
      subtitle="Acesse todos os tutoriais da Retaguarda do Sistema Lukos organizados por módulo"
      categories={categorias}
      data={dados}
      highlight={{
        title: "Sistema Retaguarda Completo",
        description: "Explore todos os módulos da retaguarda: Cadastros, Produtos, Comercial, Compras, Financeiro, Estoque, Fiscal e muito mais.",
        color: "from-blue-600 to-blue-800",
        icon: Building2,
        buttonLabel: "Acessar Retaguarda",
        link: "/tutorial/retaguarda-completa",
        features: ["45+ Tutoriais", "10 Módulos", "Sistema Completo"]
      }}
    />
  );
}

export default CategoriesPage;
