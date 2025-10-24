import React from "react";
import { 
  Users,
  UserCheck,
  Building,
  MapPin,
  UserPlus,
  Search,
  Globe,
  CheckCircle,
  Tag,
  Settings,
  Phone,
  Shield,
  Wrench,
  Truck,
  Fuel,
  ArrowLeft
} from "lucide-react";
import Categoriaisdostutoriais from "../components/Categoriasdostutoriais/Categoriaisdostutoriais";

function CadastrosPage() {
  const categorias = [
    "Clientes",
    "Funcionários", 
    "Fornecedores",
    "Unidades Operacionais",
    "Vendedores",
    "Contatos",
    "Rede",
    "Status",
    "Classificação",
    "Configurações",
    "Comunicação",
    "Acesso",
    "Serviços",
    "Transportadora",
    "Abastecimento"
  ];

  const dados = [
    { 
      id: 1, 
      title: "Cadastro de Clientes", 
      category: "Clientes", 
      productCount: 25, 
      icon: Users, 
      color: "from-blue-500 to-blue-700", 
      description: "Cadastro completo de clientes com CPF, CNPJ e informações de faturamento.",
      link: "/tutorial/cadastro-clientes",
      features: ["CPF", "CNPJ", "Faturamento"]
    },
    { 
      id: 2, 
      title: "Cadastro de Funcionários", 
      category: "Funcionários", 
      productCount: 18, 
      icon: UserCheck, 
      color: "from-green-500 to-green-700", 
      description: "Gestão de funcionários, grupos de comissão e fornecedores.",
      link: "/tutorial/cadastro-funcionarios",
      features: ["IdentFid", "Comissão", "Fornecedor"]
    },
    { 
      id: 3, 
      title: "Cadastro de Fornecedores", 
      category: "Fornecedores", 
      productCount: 15, 
      icon: Building, 
      color: "from-purple-500 to-purple-700", 
      description: "Cadastro de fornecedores por CNPJ e CPF com informações completas.",
      link: "/tutorial/cadastro-fornecedores",
      features: ["CNPJ", "CPF", "Informações"]
    },
    { 
      id: 4, 
      title: "Unidades Operacionais", 
      category: "Unidades Operacionais", 
      productCount: 12, 
      icon: MapPin, 
      color: "from-orange-500 to-orange-700", 
      description: "Gestão de unidades operacionais, contadores e abastecimentos.",
      link: "/tutorial/unidades-operacionais",
      features: ["Contador", "Abastecimentos", "Operacional"]
    },
    { 
      id: 5, 
      title: "Cadastro de Vendedores", 
      category: "Vendedores", 
      productCount: 20, 
      icon: UserPlus, 
      color: "from-cyan-500 to-cyan-700", 
      description: "Cadastro de vendedores por CNPJ e CPF com comissões.",
      link: "/tutorial/cadastro-vendedores",
      features: ["CNPJ", "CPF", "Comissões"]
    },
    { 
      id: 6, 
      title: "Consulta Contatos", 
      category: "Contatos", 
      productCount: 8, 
      icon: Search, 
      color: "from-pink-500 to-pink-700", 
      description: "Consulta e gestão de contatos e informações de clientes.",
      link: "/tutorial/consulta-contatos",
      features: ["Consulta", "Contatos", "Clientes"]
    },
    { 
      id: 7, 
      title: "Rede Clientes", 
      category: "Rede", 
      productCount: 10, 
      icon: Globe, 
      color: "from-teal-500 to-teal-700", 
      description: "Gestão da rede de clientes e relacionamentos comerciais.",
      link: "/tutorial/rede-clientes",
      features: ["Rede", "Clientes", "Relacionamento"]
    },
    { 
      id: 8, 
      title: "Status do Cliente", 
      category: "Status", 
      productCount: 6, 
      icon: CheckCircle, 
      color: "from-lime-500 to-lime-700", 
      description: "Controle de status e situação dos clientes cadastrados.",
      link: "/tutorial/status-cliente",
      features: ["Status", "Situação", "Controle"]
    },
    { 
      id: 9, 
      title: "Classificação do Tipo de Cliente", 
      category: "Classificação", 
      productCount: 7, 
      icon: Tag, 
      color: "from-amber-500 to-amber-700", 
      description: "Classificação e categorização de tipos de clientes.",
      link: "/tutorial/classificacao-cliente",
      features: ["Classificação", "Tipo", "Categorização"]
    },
    { 
      id: 10, 
      title: "Configurações", 
      category: "Configurações", 
      productCount: 15, 
      icon: Settings, 
      color: "from-red-500 to-red-700", 
      description: "Configurações gerais do sistema e parâmetros.",
      link: "/tutorial/configuracoes",
      features: ["Configurações", "Sistema", "Parâmetros"]
    },
    { 
      id: 11, 
      title: "WhatsApp", 
      category: "Comunicação", 
      productCount: 5, 
      icon: Phone, 
      color: "from-emerald-500 to-emerald-700", 
      description: "Integração e configuração do WhatsApp para comunicação.",
      link: "/tutorial/whatsapp",
      features: ["WhatsApp", "Comunicação", "Integração"]
    },
    { 
      id: 12, 
      title: "Acesso Lukos", 
      category: "Acesso", 
      productCount: 8, 
      icon: Shield, 
      color: "from-indigo-500 to-indigo-700", 
      description: "Gestão de acessos e permissões do sistema Lukos.",
      link: "/tutorial/acesso-lukos",
      features: ["Acesso", "Permissões", "Segurança"]
    },
    { 
      id: 13, 
      title: "Cadastro de Serviços", 
      category: "Serviços", 
      productCount: 12, 
      icon: Wrench, 
      color: "from-violet-500 to-violet-700", 
      description: "Cadastro e gestão de serviços oferecidos.",
      link: "/tutorial/cadastro-servicos",
      features: ["Serviços", "Cadastro", "Gestão"]
    },
    { 
      id: 14, 
      title: "Cadastro de Transportadora", 
      category: "Transportadora", 
      productCount: 9, 
      icon: Truck, 
      color: "from-sky-500 to-sky-700", 
      description: "Cadastro de transportadoras e empresas de logística.",
      link: "/tutorial/cadastro-transportadora",
      features: ["Transportadora", "Logística", "Empresas"]
    },
    { 
      id: 15, 
      title: "Requisição de Abastecimento", 
      category: "Abastecimento", 
      productCount: 11, 
      icon: Fuel, 
      color: "from-rose-500 to-rose-700", 
      description: "Sistema de requisições de abastecimento e controle.",
      link: "/tutorial/requisicao-abastecimento",
      features: ["Requisição", "Abastecimento", "Controle"]
    }
  ];

  return (
    <Categoriaisdostutoriais
      title="Cadastros - Tutoriais Completos"
      subtitle="Acesse todos os tutoriais de Cadastros do Sistema Lukos organizados por categoria"
      categories={categorias}
      data={dados}
      highlight={{
        title: "Módulo de Cadastros Completo",
        description: "Explore todos os tipos de cadastros: Clientes, Funcionários, Fornecedores, Vendedores e muito mais.",
        color: "from-blue-600 to-blue-800",
        icon: Users,
        buttonLabel: "Voltar para Retaguarda",
        link: "/Retaguarda",
        features: ["15 Tutoriais", "15 Categorias", "Sistema Completo"]
      }}
    />
  );
}

export default CadastrosPage;
