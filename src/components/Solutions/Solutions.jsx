import React from 'react';

const Solutions = () => {
  const solutions = [
    {
      title: 'Tutoriais de PDV',
      description: 'Passo a passo para vendas, formas de pagamento e emissão de cupons.',
      image: 'sistemapdv.jpg',
    },
    {
      title: 'Tutoriais de Retaguarda',
      description: 'Cadastros, configurações, usuários e rotinas administrativas do sistema.',
      image: 'sistemaretaguarda.jpg',
    },
    {
      title: 'Relatórios e Indicadores',
      description: 'Entenda dashboards, análises e relatórios gerenciais na prática.',
      image: 'relatorio.jpg',
    },
    {
      title: 'Gestão de Estoque',
      description: 'Controle de produtos e combustíveis, entradas, baixas e aferições.',
      image: 'estoque.jpg',
    },
  ];

  return (
    <section id="solucoes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Aprenda com Tutoriais Práticos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conteúdos guiados para dominar PDV, retaguarda, relatórios e estoque no Lukos ERP
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                </div>
              </div>
              <p className="text-gray-600">{solution.description}</p>
              <button className="text-blue-600 font-semibold mt-3 hover:text-blue-700 transition-colors">Ver tutoriais →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;


