import React from 'react';
import { CheckCircle, ArrowRight, Headphones, Users, Zap } from 'lucide-react';

export default function TrainingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  items-center justify-center">
          {/* Imagem à esquerda */}
          <div className="w-full md:w-[500px] ">
            <img 
              src="https://images.pexels.com/photos/8867263/pexels-photo-8867263.jpeg" 
              alt="Suporte Técnico" 
              className="w-full h-[500px]   mr-14" 
            />
          </div>

          {/* Conteúdo à direita */}
          <div className="w-full md:w-1/2 space-y-6 text-right ml-10">
            {/* Div interna com flex */}
            <div className="w-1/2 flex flex-col md:flex-row items-center gap-12">
              {/* Conteúdo da div interna */}
            </div>

            {/* Label pequeno */}
            <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full  ">
              <Headphones className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                Suporte Especializado
              </span>
            </div>
            </div>
            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight text-center">
              Suporte Técnico
            </h2>

            {/* Descrição */}
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Suporte especializado 24/7 para resolver problemas técnicos rapidamente e manter seu negócio funcionando.
            </p>

            {/* Lista de benefícios */}
            <ul className="space-y-4 pt-4 ">
              <li className="flex items-start gap-3 flex items-center justify-  ">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">Atendimento 24/7</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">Suporte Remoto</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">Manutenção Preventiva</span>
              </li>
            </ul>

           
          </div>
        </div>

        {/* Segunda seção - Treinamentos CS */}
        <div className="flex items-center justify-center mt-20">
          {/* Conteúdo à esquerda */}
          <div className="w-full md:w-1/2 space-y-6 text-right mr-10 ">
            {/* Div interna com flex */}
            <div className="w-1/2 flex flex-col md:flex-row items-center gap-12">
              {/* Conteúdo da div interna */}
            </div>

            {/* Label pequeno */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Treinamentos Especializados
                </span>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight text-center">
              Treinamentos CS
            </h2>

            {/* Descrição */}
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Capacitação profissional em conciliação, atendimento ao cliente e processos operacionais.
            </p>

            {/* Lista de benefícios */}
            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">Conciliação Bancária</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">Atendimento ao Cliente</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">Processos Operacionais</span>
              </li>
            </ul>
          </div>

          {/* Imagem à direita */}
          <div className="w-full md:w-[500px] ">
            <img 
              src="https://images.pexels.com/photos/6937858/pexels-photo-6937858.jpeg" 
              alt="Treinamentos CS" 
              className="w-full h-[500px] rounded-2xl object-cover shadow-lg" 
            />
          </div>
        </div>

        {/* Terceira seção - Sistemas ERP/PDV */}
      
      </div>
    </section>
  );
}
