import React from 'react';
import { Headphones, Users, Zap, CheckCircle } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600">Soluções completas para impulsionar seu negócio</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-transparent hover:border-blue-200">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="text-blue-600" size={36} />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80" 
                alt="Suporte Técnico" 
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Suporte Técnico</h3>
            <p className="text-gray-600 mb-6">
              Suporte especializado 24/7 para resolver problemas técnicos rapidamente e manter seu negócio funcionando.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Atendimento 24/7</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Suporte Remoto</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Manutenção Preventiva</span>
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-transparent hover:border-orange-200">
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-orange-600" size={36} />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" 
                alt="Treinamentos" 
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">Treinamentos CS</h3>
            <p className="text-gray-600 mb-6">
              Capacitação profissional em conciliação, atendimento ao cliente e processos operacionais.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Conciliação Bancária</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Atendimento ao Cliente</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Processos Operacionais</span>
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-transparent hover:border-green-200">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-green-600" size={36} />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" 
                alt="Sistemas ERP" 
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Sistemas ERP/PDV</h3>
            <p className="text-gray-600 mb-6">
              Soluções completas de gestão e ponto de venda especializadas para postos de gasolina.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Gestão de Estoque</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Controle Financeiro</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span>Relatórios Gerenciais</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

