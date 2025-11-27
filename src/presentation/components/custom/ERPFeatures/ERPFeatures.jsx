import React, { useState } from 'react';
import { ShoppingCart, DollarSign, FileText, Receipt, Package, CreditCard, Database, CheckCircle } from 'lucide-react';

const ERPFeatures = () => {
  const [activeErpModule, setActiveErpModule] = useState('compras');

  const erpModules = {
    compras: {
      name: 'Compras',
      icon: ShoppingCart,
      features: [
        'Solicitação de compras',
        'Cotação de fornecedores',
        'Pedido de compra',
        'Alçadas de aprovação',
        'Conferência física',
        'Nota fiscal de entrada',
      ],
    },
    financeiro: {
      name: 'Financeiro',
      icon: DollarSign,
      features: [
        'Plano de contas',
        'Contas a pagar',
        'Contas a receber',
        'Fluxo de caixa',
        'Aplicações e empréstimos',
        'Análises gerenciais',
      ],
    },
    contabilidade: {
      name: 'Contabilidade',
      icon: FileText,
      features: [
        'Gestão orçamentária',
        'Rastreamento contábil',
        'Livros razão e diário',
        'Consolidação de empresas',
        'Visões gerenciais (DRE, DOAR, BP)',
        'Fluxo de caixa gerencial',
      ],
    },
    fiscal: {
      name: 'Fiscal',
      icon: Receipt,
      features: [
        'Apuração de impostos (ISS, ICMS, ST, IPI, COFINS, CSLL)',
        'Geração de demonstrativos',
        'Geração de obrigações eletrônicas',
        'Obrigações acessórias',
        'Livros fiscais',
        'Geração ECF, ECD, SPED Fiscal, SPED, eSocial e REINF',
      ],
    },
    estoque: {
      name: 'Estoque e Custos',
      icon: Package,
      features: [
        'Movimentação de estoque',
        'Gestão de inventário',
        'Rastreabilidade',
        'Custo médio',
        'Consulta de estoque',
        'Controle de perdas',
      ],
    },
    faturamento: {
      name: 'Faturamento',
      icon: CreditCard,
      features: [
        'Políticas comerciais',
        'Pedido de vendas',
        'Nota fiscal de saída',
        'Interface NF-e',
        'Interface NFS-e',
        'Análises gerenciais',
      ],
    },
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conheça as funcionalidades do <span className="text-[#690093]">LUKOS ERP</span>
          </h2>
        </div>

        {/* Tabs de Módulos */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {Object.entries(erpModules).map(([key, module]) => {
              const IconComponent = module.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveErpModule(key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeErpModule === key
                      ? 'bg-[#690093] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {module.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo do Módulo Ativo */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const IconComponent = erpModules[activeErpModule].icon;
                  return <IconComponent className="w-10 h-10 text-[#690093]" />;
                })()}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {erpModules[activeErpModule].name}
                </h3>
              </div>
              <ul className="space-y-3 mb-6">
                {erpModules[activeErpModule].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#690093] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#690093] text-white font-semibold rounded-lg hover:bg-[#5a008f] transition-colors"
                >
                  Ligamos para você
                </a>
                <a
                  href="/sistemas/erp"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#690093] text-[#690093] font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Saiba Mais
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <Database className="w-32 h-32 text-[#690093] mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ERPFeatures;



