import React from 'react';
import { ArrowRight, Target, Code, Bot, Building2, Users, Settings, Zap, Heart } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function SobreNos() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative -mt-[90px] flex items-center justify-center">
        <img 
          src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg" 
          alt="Sobre Nós" 
          className="w-full h-[600px] object-cover shadow-lg brightness-75 relative" 
        />
        <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center gap-4 w-full h-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-full mb-4">
            <Users className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Sobre Nós
            </span>
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-2xl">
            Conheça a LUKOS Tecnologia
          </h1>
          <p className="text-white/90 text-xl text-center max-w-3xl px-4 leading-relaxed drop-shadow-lg">
            Mais de 10 anos transformando a gestão de postos de combustíveis e lojas de conveniência
          </p>
        </div>
        
        
      </section>

      {/* Nossa Jornada */}
      <section className="py-20 bg-white rounded-3xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-[230px]">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-left mt-[15px] mb-[15px]">
                Nossa Jornada
              </h2>
              <div className="w-12 h-1 bg-purple-600 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                A LUKOS transforma negócios com inovação e tecnologia, guiando empresas por uma jornada de evolução, que combina estratégia, serviços com inteligência artificial e execução com precisão. Com mais de 10 anos de atuação, a LUKOS oferece um portfólio abrangente e ágil, em que cada solução é testada e aperfeiçoada em nossa própria operação, garantindo que os clientes recebam resultados reais, práticos e escaláveis.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Com centenas de clientes atendidos e uma atuação focada no mercado brasileiro, a LUKOS é parceira estratégica de postos de combustíveis e lojas de conveniência, levando adiante uma abordagem centrada no cliente e sustentada por práticas transformacionais. Na LUKOS, inovação não é apenas uma promessa: é o diferencial que aplicamos para simplificar a transformação digital, unindo o que há de mais avançado em tecnologia com a compreensão profunda dos desafios de cada cliente.
              </p>
              <button 
                className="gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-purple-200 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 hover:bg-purple-700 shadow-sm h-9 px-4 py-1.5 text-white rounded-lg justify-center items-center flex"
                style={{ background: 'rgb(131, 3, 255)', width: '180px', padding: '6px 20px' }}
              >
                Fale conosco
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://lukos.com.br/wp-content/uploads/2025/01/Image.png" 
                alt="Equipe LUKOS" 
                className="rounded-2xl shadow-lg w-full max-w-md"
              />
            </div>
          </div>

          {/* Grid de Serviços */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-[0px] pb-[0px] mt-[75px] mb-[75px]">
            {/* Estratégia */}
            <div className="rounded-lg p-6 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Estratégia</h3>
              <p className="text-white text-sm leading-relaxed">
                Planejamento estratégico de TI, Gestão de processos e Transformação digital
              </p>
            </div>

            {/* Desenvolvimento */}
            <div className="rounded-lg p-6 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Desenvolvimento</h3>
              <p className="text-white text-sm leading-relaxed">
                Customer Experience & Design, Arquitetura de TI, Cloud, Engenharia de Software, Automação RPA e DevOps
              </p>
            </div>

            {/* Dados & AI */}
            <div className="rounded-lg p-6 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Dados & IA</h3>
              <p className="text-white text-sm leading-relaxed">
                Arquitetura, governança e engenharia de dados, machine learning, deep learning e aceleradores - LLMs GPTs
              </p>
            </div>

            {/* ERP */}
            <div className="rounded-lg p-6 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">ERP</h3>
              <p className="text-white text-sm leading-relaxed">
                Sistema completo de gestão empresarial para postos de combustível
              </p>
            </div>

            {/* PDV */}
            <div className="rounded-lg p-6 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">PDV</h3>
              <p className="text-white text-sm leading-relaxed">
                Ponto de venda integrado para pista e loja de conveniência
              </p>
            </div>

            {/* Operação Contínua */}
            <div className="rounded-lg p-6 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Operação Contínua</h3>
              <p className="text-white text-sm leading-relaxed">
                Suporte 24/7<br />Manutenção e atualizações
              </p>
            </div>
          </div>

          {/* O que nos guia */}
          <div className="mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-[6px] pb-[6px] mt-[91px] mb-[91px]">
              <div className="flex justify-center">
                <img 
                  src="https://lukos.com.br/wp-content/uploads/2025/01/Image-1.png" 
                  alt="Profissional LUKOS"
                />
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">O que nos guia</h2>
                  <div className="w-12 h-1 bg-purple-600 mb-6 mx-auto"></div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Na LUKOS, acreditamos que a tecnologia alcança seu maior valor quando promove o crescimento das pessoas. Caminhamos junto com nossos clientes, ouvindo com atenção, compreendendo seus desafios e cocriando soluções que geram impacto real. Nosso compromisso é entregar inovação com propósito, promovendo mudanças significativas para os negócios e para quem faz parte deles. É assim que colocamos em prática nosso propósito de crescimento humano com tecnologia.
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Digital, Simple, Human */}
            <div className="mt-12 max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-white p-6 rounded-lg shadow-lg text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">Digital</h3>
                  <p className="text-sm">Nos reinventamos todos os dias na era da tecnologia.</p>
                </div>
                <div className="text-white p-6 rounded-lg shadow-lg text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">Simple</h3>
                  <p className="text-sm">Nos posicionamos de forma simples e objetiva.</p>
                </div>
                <div className="text-white p-6 rounded-lg shadow-lg text-center" style={{ backgroundColor: 'rgb(131, 3, 255)' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">Human</h3>
                  <p className="text-sm">Colocamos as pessoas no centro de tudo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher a LUKOS */}
      <section className="py-24 bg-gray-50 mt-16 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Por que escolher a LUKOS?</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Nossa trajetória é marcada por parcerias de sucesso e um compromisso com a excelência. Entregamos projetos estratégicos com confiança, inovação e resultados que falam por si.
            </p>
          </div>

          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Anos de Experiência</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mais de uma década transformando a gestão de postos de combustível
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Clientes Atendidos</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Centenas de postos confiam na LUKOS para suas operações
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte Disponível</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Suporte técnico disponível a qualquer hora, todos os dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default SobreNos;
