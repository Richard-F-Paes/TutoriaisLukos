import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Fuel, ShoppingBag, Settings, BarChart3, CreditCard, FileText, Globe, HelpCircle, LayoutList, ChevronDown, ChevronRight, Package, Receipt, DollarSign, TrendingUp, Star, Phone, Shield, FileSpreadsheet, Users, Zap, Store, Truck, Wrench, CheckCircle, Target, Calculator } from 'lucide-react';

const VideoTutorialSidebar = ({ isOpen, onViewChange, currentView, onSubcategorySelect, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const menuItems = [
    { icon: LayoutList, label: 'Categorias', view: 'categories', active: currentView === 'categories' },
    { icon: BookOpen, label: 'Todos', view: 'home', active: currentView === 'home' },
  ];

  const categoriesWithSubitems = [
    {
      icon: BookOpen,
      label: 'Tutoriais',
      id: 'tutoriais',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: Fuel,
      label: 'Pista',
      id: 'pista',
      color: 'from-orange-500 to-orange-700',
      subitems: [
        { icon: Fuel, label: 'Medição de Tanques', color: 'blue' },
        { icon: Settings, label: 'Aferição de Bombas', color: 'orange' },
        { icon: Fuel, label: 'Venda de Combustível', color: 'blue' },
        { icon: CheckCircle, label: 'Encerramento de Turno', color: 'green' },
        { icon: ShoppingBag, label: 'Venda de Produtos', color: 'green' },
        { icon: Wrench, label: 'Efetuar Serviço', color: 'orange' }
      ]
    },
    {
      icon: ShoppingBag,
      label: 'Conveniencia',
      id: 'conveniencia',
      color: 'from-blue-500 to-blue-700',
      subitems: [
        { icon: Package, label: 'Estoque', color: 'indigo' },
        { icon: ShoppingBag, label: 'Produtos', color: 'blue' },
        { icon: Receipt, label: 'Vendas', color: 'green' }
      ]
    },
    {
      icon: Settings,
      label: 'Retaguarda',
      id: 'retaguarda',
      color: 'from-indigo-500 to-indigo-700',
      subitems: [
        { icon: Users, label: 'Cadastros', color: 'blue' },
        { icon: Package, label: 'Produtos', color: 'indigo' },
        { icon: TrendingUp, label: 'Comercial', color: 'purple' },
        { icon: ShoppingBag, label: 'Compras', color: 'blue' },
        { icon: DollarSign, label: 'Financeiro', color: 'emerald' },
        { icon: Package, label: 'Estoque', color: 'amber' },
        { icon: FileSpreadsheet, label: 'Fiscal', color: 'violet' },
        { icon: Settings, label: 'Ferramentas', color: 'gray' },
        { icon: BarChart3, label: 'Relatórios', color: 'blue' },
        { icon: Star, label: 'Fidelidade', color: 'yellow' },
        { icon: Phone, label: 'Integrações', color: 'green' }
      ]
    },
    {
      icon: BarChart3,
      label: 'Dashboard',
      id: 'dashboard',
      color: 'from-green-500 to-green-700',
      subitems: [
        { icon: BarChart3, label: 'Relatórios', color: 'blue' },
        { icon: TrendingUp, label: 'Análises', color: 'purple' },
        { icon: Target, label: 'Métricas', color: 'green' }
      ]
    },
    {
      icon: CreditCard,
      label: 'Lukos Pay',
      id: 'lukos-pay',
      color: 'from-pink-500 to-pink-700',
      subitems: [
        { icon: CreditCard, label: 'Pagamentos', color: 'pink' },
        { icon: Shield, label: 'Segurança', color: 'gray' }
      ]
    },
    {
      icon: FileText,
      label: 'Pre-Venda',
      id: 'pre-venda',
      color: 'from-cyan-500 to-cyan-700',
      subitems: [
        { icon: FileText, label: 'Orçamentos', color: 'cyan' },
        { icon: Calculator, label: 'Propostas', color: 'orange' }
      ]
    },
    {
      icon: Globe,
      label: 'Fatura Web',
      id: 'fatura-web',
      color: 'from-yellow-500 to-yellow-700',
      subitems: [
        { icon: FileSpreadsheet, label: 'NF-e', color: 'violet' },
        { icon: Receipt, label: 'Faturamento', color: 'blue' }
      ]
    },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: 'Ajuda' },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-[#0f0f0f] border-r border-[#272727] transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-2">
        <div className="space-y-1 mb-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onViewChange(item.view)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? 'bg-[#272727] text-white'
                  : 'text-gray-300 hover:bg-[#272727]'
              }`}
            >
              <item.icon size={20} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {isOpen && <hr className="border-[#272727] mb-4" />}

        {isOpen && (
          <div className="mb-4">
            <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Categorias
            </h3>
            <div className="space-y-1">
              {categoriesWithSubitems.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (category.subitems) {
                        // Se tem subitens, expande/colapsa
                        toggleCategory(category.id);
                      }
                      // Sempre seleciona a categoria para mostrar todos os tutoriais dela
                      if (onCategorySelect) {
                        onCategorySelect(category.label);
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon size={20} />
                      <span className="text-sm">{category.label}</span>
                    </div>
                    {category.subitems && (
                      expandedCategories[category.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    )}
                  </button>
                  
                  {category.subitems && expandedCategories[category.id] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {category.subitems.map((subitem, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSubcategorySelect && onSubcategorySelect(category.label, subitem.label)}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#272727] hover:text-gray-300 transition-colors"
                        >
                          <subitem.icon size={16} />
                          <span className="text-xs">{subitem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {isOpen && <hr className="border-[#272727] mb-4" />}

        <div className="space-y-1">
          {bottomItems.map((item, index) => (
            <button key={index} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors">
              <item.icon size={20} />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default VideoTutorialSidebar;
