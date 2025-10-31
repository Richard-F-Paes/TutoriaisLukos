import React from 'react';
import { Users, Package, TrendingUp, ShoppingBag, DollarSign, FileSpreadsheet, Settings, BarChart3, Star, Phone, UserCheck, Building, MapPin, UserPlus, DollarSign as PriceIcon, Calendar, Tag, Gift, Receipt, Percent, FileText, Barcode, Fuel, CreditCard, Layers, Upload, Grid, Wrench, Search, Bell } from 'lucide-react';

const VideoTutorialSubcategories = ({ onSubcategorySelect, category, parentSubcategory = null }) => {
  // Sub-subcategorias dentro de Cadastros
  const cadastrosSubcategories = [
    {
      name: 'Cadastros Cliente',
      icon: Users,
      count: 5,
      color: 'from-blue-500 to-blue-700',
      description: 'Tutoriais sobre cadastro de clientes'
    },
    {
      name: 'Cadastro Funcionário',
      icon: UserCheck,
      count: 4,
      color: 'from-green-500 to-green-700',
      description: 'Tutoriais sobre cadastro de funcionários'
    },
    {
      name: 'Cadastro de Fornecedor',
      icon: Building,
      count: 3,
      color: 'from-purple-500 to-purple-700',
      description: 'Tutoriais sobre cadastro de fornecedores'
    },
    {
      name: 'Cadastros Unidades Operacionais',
      icon: MapPin,
      count: 3,
      color: 'from-orange-500 to-orange-700',
      description: 'Tutoriais sobre unidades operacionais'
    },
    {
      name: 'Cadastros Vendedor',
      icon: UserPlus,
      count: 3,
      color: 'from-cyan-500 to-cyan-700',
      description: 'Tutoriais sobre cadastro de vendedores'
    },
    {
      name: 'Outros Cadastros',
      icon: Settings,
      count: 7,
      color: 'from-gray-500 to-gray-700',
      description: 'Outros tipos de cadastros'
    }
  ];

  // Subcategorias principais de Retaguarda
  const mainSubcategories = {
    'Retaguarda': [
      {
        name: 'Cadastros',
        icon: Users,
        count: 25,
        color: 'from-blue-500 to-blue-700',
        description: 'Cadastros completos',
        hasSubcategories: true
      },
      {
        name: 'Produtos',
        icon: Package,
        count: 28,
        color: 'from-indigo-500 to-indigo-700',
        description: 'Gestão de produtos',
        hasSubcategories: true
      },
      {
        name: 'Comercial',
        icon: TrendingUp,
        count: 7,
        color: 'from-purple-500 to-purple-700',
        description: 'Gestão comercial'
      },
      {
        name: 'Compras',
        icon: ShoppingBag,
        count: 7,
        color: 'from-blue-500 to-blue-700',
        description: 'Entrada de compras'
      },
      {
        name: 'Financeiro',
        icon: DollarSign,
        count: 25,
        color: 'from-emerald-500 to-emerald-700',
        description: 'Controle financeiro'
      },
      {
        name: 'Estoque',
        icon: Package,
        count: 10,
        color: 'from-amber-500 to-amber-700',
        description: 'Controle de estoque'
      },
      {
        name: 'Fiscal',
        icon: FileSpreadsheet,
        count: 11,
        color: 'from-violet-500 to-violet-700',
        description: 'Documentos fiscais'
      },
      {
        name: 'Ferramentas',
        icon: Settings,
        count: 11,
        color: 'from-gray-500 to-gray-700',
        description: 'Ferramentas do sistema'
      },
      {
        name: 'Relatórios',
        icon: BarChart3,
        count: 30,
        color: 'from-blue-500 to-blue-700',
        description: 'Relatórios gerenciais',
        hasSubcategories: true
      },
      {
        name: 'Fidelidade',
        icon: Star,
        count: 10,
        color: 'from-yellow-500 to-yellow-700',
        description: 'Programa de fidelidade'
      },
      {
        name: 'Integrações',
        icon: Phone,
        count: 4,
        color: 'from-green-500 to-green-700',
        description: 'Integrações externas'
      }
    ]
  };

  // Sub-subcategorias dentro de Relatórios
  const relatoriosSubcategories = [
    {
      name: 'Comercial',
      icon: TrendingUp,
      count: 3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Relatórios comerciais'
    },
    {
      name: 'Financeiro',
      icon: DollarSign,
      count: 3,
      color: 'from-green-500 to-emerald-600',
      description: 'Relatórios financeiros'
    },
    {
      name: 'Frente de Caixa',
      icon: ShoppingBag,
      count: 3,
      color: 'from-orange-500 to-amber-600',
      description: 'Relatórios de frente de caixa'
    },
    {
      name: 'Produtos',
      icon: Package,
      count: 3,
      color: 'from-purple-500 to-pink-600',
      description: 'Relatórios de produtos'
    },
    {
      name: 'Fiscal',
      icon: FileText,
      count: 3,
      color: 'from-red-500 to-rose-600',
      description: 'Relatórios fiscais'
    },
    {
      name: 'Entradas',
      icon: Upload,
      count: 3,
      color: 'from-cyan-500 to-blue-600',
      description: 'Relatórios de entradas'
    },
    {
      name: 'Outros',
      icon: Settings,
      count: 3,
      color: 'from-gray-500 to-slate-600',
      description: 'Outros relatórios'
    },
    {
      name: 'Favoritos',
      icon: Star,
      count: 3,
      color: 'from-pink-500 to-rose-600',
      description: 'Relatórios favoritos'
    },
    {
      name: 'Tarefas e Alertas',
      icon: Bell,
      count: 3,
      color: 'from-yellow-500 to-orange-600',
      description: 'Tarefas e alertas dos relatórios'
    },
    {
      name: 'Busca Relatório',
      icon: Search,
      count: 3,
      color: 'from-indigo-500 to-purple-600',
      description: 'Buscar relatórios'
    }
  ];

  // Sub-subcategorias dentro de Produtos
  const produtosSubcategories = [
    {
      name: 'Ajustes e Preços',
      icon: PriceIcon,
      count: 2,
      color: 'from-orange-500 to-orange-700',
      description: 'Ajustes de preços e canais'
    },
    {
      name: 'Agendamento',
      icon: Calendar,
      count: 1,
      color: 'from-blue-500 to-blue-700',
      description: 'Agendamento de litros'
    },
    {
      name: 'Cadastro de Produtos',
      icon: Package,
      count: 2,
      color: 'from-indigo-500 to-indigo-700',
      description: 'Cadastro com e sem código de barras'
    },
    {
      name: 'KIT e Promoções',
      icon: Gift,
      count: 3,
      color: 'from-pink-500 to-pink-700',
      description: 'KITs, promoções e embalagens'
    },
    {
      name: 'Atacarejo e Fiscal',
      icon: Receipt,
      count: 2,
      color: 'from-violet-500 to-violet-700',
      description: 'Atacarejo e regras fiscais'
    },
    {
      name: 'Comissões',
      icon: Percent,
      count: 3,
      color: 'from-green-500 to-green-700',
      description: 'Produtos e grupos comissionados'
    },
    {
      name: 'Códigos e Identificação',
      icon: Barcode,
      count: 4,
      color: 'from-purple-500 to-purple-700',
      description: 'Códigos, etiquetas e ANP'
    },
    {
      name: 'Bombas',
      icon: Fuel,
      count: 3,
      color: 'from-red-500 to-red-700',
      description: 'Cadastro de bombas e lacres'
    },
    {
      name: 'Outros Produtos',
      icon: Settings,
      count: 8,
      color: 'from-gray-500 to-gray-700',
      description: 'Outros tipos de produtos'
    }
  ];

  // Se estamos mostrando sub-subcategorias de Cadastros
  if (parentSubcategory === 'Cadastros') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {cadastrosSubcategories.map((subcategory) => (
          <div
            key={subcategory.name}
            onClick={() => onSubcategorySelect(category, parentSubcategory, subcategory.name)}
            className="group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-[#181818] rounded-xl p-6 border border-[#272727] hover:border-[#383838] transition-all duration-200">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${subcategory.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <subcategory.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {subcategory.name}
              </h3>
              
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                {subcategory.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  {subcategory.count} tutoriais
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 transition-colors"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Se estamos mostrando sub-subcategorias de Relatórios
  if (parentSubcategory === 'Relatórios') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {relatoriosSubcategories.map((subcategory) => (
          <div
            key={subcategory.name}
            onClick={() => onSubcategorySelect(category, parentSubcategory, subcategory.name)}
            className="group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-[#181818] rounded-xl p-6 border border-[#272727] hover:border-[#383838] transition-all duration-200">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${subcategory.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <subcategory.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {subcategory.name}
              </h3>
              
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                {subcategory.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  {subcategory.count} tutoriais
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 transition-colors"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Se estamos mostrando sub-subcategorias de Produtos
  if (parentSubcategory === 'Produtos') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {produtosSubcategories.map((subcategory) => (
          <div
            key={subcategory.name}
            onClick={() => onSubcategorySelect(category, parentSubcategory, subcategory.name)}
            className="group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-[#181818] rounded-xl p-6 border border-[#272727] hover:border-[#383838] transition-all duration-200">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${subcategory.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <subcategory.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {subcategory.name}
              </h3>
              
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                {subcategory.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  {subcategory.count} tutoriais
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 transition-colors"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Subcategorias principais
  const categorySubcats = mainSubcategories[category] || [];

  if (categorySubcats.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {categorySubcats.map((subcategory) => (
        <div
          key={subcategory.name}
          onClick={() => {
            if (subcategory.hasSubcategories) {
              onSubcategorySelect(category, subcategory.name, null);
            } else {
              onSubcategorySelect(category, subcategory.name, null);
            }
          }}
          className="group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-[#181818] rounded-xl p-6 border border-[#272727] hover:border-[#383838] transition-all duration-200">
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${subcategory.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <subcategory.icon size={32} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {subcategory.name}
            </h3>
            
            <p className="text-gray-400 text-sm mb-3 leading-relaxed">
              {subcategory.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                {subcategory.count} tutoriais
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 transition-colors"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoTutorialSubcategories;
