import React from 'react';
import { ChevronDown, CheckCircle, BookOpen, Play, Eye, Heart } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function NovaPagina() {
  return (
    <div>
      {/* Navbar */}
      <PageNavbar />
            
      {/* Hero Section */}
      <div className="relative -mt-[90px]">
        <img 
          src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg" 
          alt="" 
          className="w-full h-[500px] object-cover rounded-3xl shadow-lg brightness-50 relative" 
        />  
        <div className="absolute inset-0 bg-black opacity-40 rounded-3xl flex flex-col items-center justify-center gap-4 w-full h-full">
          <h2 className="text-white text-4xl font-bold text-center">Sobre Nós</h2>
          <p className="text-white/90 text-[16px] text-center max-w-2xl px-4">
            Conheça a história, missão e valores da Lukos Tecnologia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-[-10px] pt-16 pb-16 bg-white relative rounded-3xl px-4">
        <div className="max-w-7xl mx-auto">
          {/* Nossa História */}
          <section className="mb-20">
            <div className="flex items-center justify-center">
              {/* Imagem à esquerda */}
              <div className="w-full md:w-[500px]">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image.png" 
                  alt="Nossa História" 
                  className="w-full h-[500px] rounded-2xl object-cover shadow-lg mr-14" 
                />
              </div>

              {/* Conteúdo à direita */}
              <div className="w-full md:w-1/2 space-y-6 ml-10">
                {/* Label pequeno */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      Nossa História
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center">
                  Nossa História
                </h2>

                {/* Descrição */}
                <p className="text-lg text-black leading-relaxed text-center">
                  Desenvolver soluções de software inteligentes e inovadoras, que simplifiquem processos e melhorem a eficiência das pessoas e das empresas, sempre com foco na qualidade, personalização e suporte contínuo.
                </p>

                {/* Lista de benefícios */}
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Mais de 10 anos de experiência</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Milhares de clientes atendidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Inovação constante</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Nossa Visão - Layout Invertido */}
          <section className="mb-20">
            <div className="flex items-center justify-center mt-20">
              {/* Conteúdo à esquerda */}
              <div className="w-full md:w-1/2 space-y-6 mr-10">
                {/* Label pequeno */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                      Nossa Visão
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center">
                  Nossa Visão
                </h2>

                {/* Descrição */}
                <p className="text-lg text-black leading-relaxed text-center">
                  Ser a principal referência no desenvolvimento de software para Postos de Combustíveis e Varejo, liderando a transformação digital do setor e promovendo o crescimento sustentável e o bem-estar de nossos clientes, parceiros, colaboradores e da comunidade.
                </p>

                {/* Lista de benefícios */}
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Liderança em transformação digital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Crescimento sustentável</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-black text-lg">Bem-estar de todos os stakeholders</span>
                  </li>
                </ul>
              </div>

              {/* Imagem à direita */}
              <div className="w-full md:w-[500px]">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image-1.png" 
                  alt="Nossa Visão" 
                  className="w-full h-[500px] rounded-2xl object-cover shadow-lg" 
                />
              </div>
            </div>
          </section>

          {/* Nossos Valores */}
          <section className="mb-20">
            <div className="flex items-center justify-center mt-20">
              {/* Conteúdo à esquerda */}
              <div className="w-full md:w-1/2 space-y-6 mr-10">
                {/* Label pequeno */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                      Nossos Valores
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center">
                  Nossos Valores
                </h2>

                {/* Lista de valores */}
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Respeito e Confiança</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Cliente em Primeiro Lugar</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Inovação Constante</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Trabalho em Equipe</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Ambiente de Trabalho Valorizado</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Paixão pelo que Fazemos</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-black text-lg text-center">Compromisso com a Sustentabilidade</span>
                  </li>
                </ul>
              </div>

              {/* Imagem à direita */}
              <div className="w-full md:w-[500px]">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image-2.png" 
                  alt="Nossos Valores" 
                  className="w-full h-[500px] rounded-2xl object-cover shadow-lg" 
                />
              </div>
            </div>
          </section>

         
          

          {/* Por que escolher a Lukos */}
         
        </div>
      </div>
      {/* Seção de Vídeos */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white mt-20 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Play className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Vídeos Demonstrativos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            A LUKOS aplicada
            ao seu negócio
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Uma ferramenta poderosa e intuitiva, pronta para te auxiliar  24 horas, 7 dias por semana. Veja o que os clientes da LUKOS estão dizendo sobre nossa ferramenta.
            </p>
            
          </div>

      {/* Vídeo Destaque */}
      <div className="max-w-4xl mx-auto relative mb-10  overflow-hidden  px-4" style={{ zIndex: 900 }}>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
          <iframe
            src="https://www.youtube.com/embed/fz5Q0HNVsDE"
            title="Meta - Jornada do Cliente"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vídeo 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-video relative bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/sjWk3XpdH3s?si=Zv2L029tcGpfA30W"
                  title="Lukos ERP - Visão Geral Completa"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
          
            </div>

            {/* Vídeo 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-video relative bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/XY2OcTZqvqs?si=z-_ga6EOq1PrQ2by"
                  title="PDV em Ação - Vendas de Combustível"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Vídeo 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-video relative bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/fz5Q0HNVsDE"
                  title="Relatórios Gerenciais Avançados"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-black mb-6">
              Quer ver mais demonstrações ou tem dúvidas sobre o sistema?
            </p>
            <a 
              href="/contato" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Entre em Contato
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default NovaPagina;
