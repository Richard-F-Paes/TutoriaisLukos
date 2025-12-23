import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, BookOpen } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';
import { Card, CardContent } from '../../components/ui/card/card';

// Componente ImageWithFallback
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  const handleError = () => setDidError(true);

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
}

function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados dos posts (mantenha os dados originais ou mova para um arquivo centralizado)
  const blogPosts = {
    1: {
      id: 1,
      title: 'Como o ERP da Lukos Tecnologia pode transformar a gestão do seu posto?',
      excerpt: `A Lukos é uma empresa especializada em soluções de PDV e ERP para postos de combustíveis e lojas de conveniência, oferecendo tecnologia completa para gestão, automação e controle operacional.\n\nIniciamos nossa trajetória com o propósito de simplificar a rotina dos postos, trazendo ferramentas que unificam processos, aumentam a eficiência e garantem mais segurança nas operações. Com uma equipe experiente no segmento, evoluímos constantemente para atender às necessidades reais do mercado.\n\nAo longo dos anos, nossa plataforma se tornou referência, atendendo empresas em todo o país e contribuindo para uma gestão mais inteligente, ágil e integrada. Nosso compromisso é continuar inovando e proporcionando a melhor experiência possível para nossos clientes.\n\nAcreditamos que tecnologia de qualidade transforma negócios. Por isso, seguimos investindo no aprimoramento de nossos sistemas, suporte técnico e recursos que realmente fazem diferença no dia a dia de quem trabalha com postos e conveniências.`,
      author: 'Equipe LUKOS',
      date: '15 de Janeiro, 2025',
      readTime: '5 min',
      category: 'Mercado',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      image2: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p class="text-gray-300 text-lg leading-relaxed mb-6">O mercado de postos de combustíveis está cada vez mais competitivo, e a gestão eficiente tornou-se fundamental para o sucesso do negócio. O ERP da Lukos Tecnologia oferece uma solução completa e integrada que pode transformar completamente a forma como você gerencia seu posto.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Benefícios do ERP Lukos</h2>
        <p class="text-gray-300 mb-4">Com o ERP da Lukos, você tem acesso a:</p>
        <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
          <li>Controle total de estoque em tempo real</li>
          <li>Gestão financeira integrada</li>
          <li>Relatórios e dashboards personalizados</li>
          <li>Automação de processos operacionais</li>
          <li>Integração com sistemas de pagamento</li>
        </ul>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Eficiência Operacional</h2>
        <p class="text-gray-300 mb-6">A plataforma permite que você tenha visibilidade completa sobre todas as operações do seu posto, desde a venda na bomba até a gestão de fornecedores. Isso resulta em maior eficiência e redução de custos operacionais.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Competitividade no Mercado</h2>
        <p class="text-gray-300">Ao utilizar o ERP da Lukos, você está investindo em tecnologia de ponta que coloca seu posto à frente da concorrência. A capacidade de tomar decisões baseadas em dados reais é um diferencial competitivo significativo.</p>
      `
    },
    2: {
      id: 2,
      title: 'Programa de Fidelidade Lukos para Postos de Gasolina',
      excerpt: 'Simples, Prático e 100% Gerenciado pelo WhatsApp Na Lukos Tecnologia, entendemos a importância de oferecer soluções modernas e acessíveis para gestão de postos de combustíveis. Nosso programa de fidelidade é uma ferramenta poderosa para aumentar a retenção de clientes e fidelizar sua base.',
      author: 'Equipe LUKOS',
      date: '12 de Janeiro, 2025',
      readTime: '7 min',
      category: 'Tecnologia',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      image2: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      content: `
        <p class="text-gray-300 text-lg leading-relaxed mb-6">Na Lukos Tecnologia, entendemos a importância de oferecer soluções modernas e acessíveis para gestão de postos de combustíveis. Nosso Programa de Fidelidade é simples, prático e 100% gerenciado pelo WhatsApp, facilitando o acesso e uso diário.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Gestão pelo WhatsApp</h2>
        <p class="text-gray-300 mb-6">Uma das grandes vantagens do nosso sistema é a possibilidade de gerenciar seu programa de fidelidade diretamente pelo WhatsApp. Isso significa que você pode acessar informações importantes, relatórios e até mesmo realizar operações básicas de qualquer lugar, a qualquer momento.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Simplicidade e Praticidade</h2>
        <p class="text-gray-300 mb-6">Não é necessário ser um especialista em tecnologia para usar nosso programa. A interface foi desenvolvida pensando na facilidade de uso, permitindo que qualquer pessoa da equipe possa operar o sistema com treinamento mínimo.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Benefícios para o Cliente</h2>
        <p class="text-gray-300">O programa de fidelidade oferece vantagens reais para seus clientes, aumentando a satisfação e a retenção. Com pontos acumulados a cada abastecimento, seus clientes têm mais motivos para voltar ao seu posto.</p>
      `
    },
    3: {
      id: 3,
      title: 'Como a Inteligência Artificial Está Revolucionando a Gestão de Postos de Combustíveis',
      excerpt: 'A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa transformação. A Inteligência Artificial (IA) está revolucionando a gestão desses estabelecimentos, oferecendo soluções inteligentes que otimizam processos e aumentam a eficiência.',
      author: 'Equipe LUKOS',
      date: '10 de Janeiro, 2025',
      readTime: '4 min',
      category: 'Sobre Nós',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      image2: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p class="text-gray-300 text-lg leading-relaxed mb-6">A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa transformação. A Inteligência Artificial (IA) está revolucionando a gestão desses estabelecimentos, oferecendo soluções inteligentes que otimizam processos e aumentam a eficiência.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">IA na Gestão de Estoque</h2>
        <p class="text-gray-300 mb-6">A IA pode prever a demanda de combustíveis com base em dados históricos, condições climáticas e eventos locais. Isso permite uma gestão de estoque mais eficiente, reduzindo custos e evitando desperdícios.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Automação de Processos</h2>
        <p class="text-gray-300 mb-6">Com a IA, muitos processos que antes eram manuais podem ser automatizados, liberando tempo para atividades estratégicas e melhorando a experiência do cliente.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Análise Preditiva</h2>
        <p class="text-gray-300">A inteligência artificial permite análises preditivas que ajudam a antecipar tendências de mercado, otimizar preços e melhorar a tomada de decisões estratégicas.</p>
      `
    },
    4: {
      id: 4,
      title: 'Conciliação de Cartões: O Fim das Dores de Cabeça',
      excerpt: 'A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas manualmente, especialmente quando se trata de múltiplas operadoras e diferentes formas de pagamento.',
      author: 'Equipe LUKOS',
      date: '8 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Equipe',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      image2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p class="text-gray-300 text-lg leading-relaxed mb-6">A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas manualmente, especialmente quando se trata de múltiplas operadoras e diferentes formas de pagamento.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">O Desafio da Conciliação</h2>
        <p class="text-gray-300 mb-6">Com o aumento das formas de pagamento digital, a conciliação tornou-se ainda mais complexa. Cada operadora tem suas próprias taxas e regras, tornando o processo manual extremamente trabalhoso e propenso a erros.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Soluções Tecnológicas</h2>
        <p class="text-gray-300 mb-6">As soluções tecnológicas modernas podem automatizar esse processo, realizando a conciliação de forma rápida e precisa, economizando tempo e reduzindo erros.</p>
        
        <h2 class="text-2xl text-white font-bold mb-4 mt-8">Benefícios da Automação</h2>
        <p class="text-gray-300">Com a automação da conciliação, você ganha tempo para focar em outras atividades importantes do seu negócio, além de ter maior precisão nos controles financeiros.</p>
      `
    },
  };

  const post = blogPosts[parseInt(id)];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
        <PageNavbar transparent={false} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post não encontrado</h1>
            <p className="text-gray-400 mb-8">O post que você está procurando não existe.</p>
            <Link
              to="/blog-posts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7c4dff] transition-colors shadow-lg shadow-purple-500/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0a0a0f 100%)' }}
      />

      <PageNavbar transparent={true} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/blog-posts"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              VOLTAR PARA O BLOG
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#a78bfa] text-xs font-bold rounded-full mb-6 uppercase tracking-wider backdrop-blur-md">
              <Tag className="w-3 h-3" />
              {post.category}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm font-medium uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span>{post.author}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} LEITURA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative z-10 -mt-8 mb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video md:aspect-[21/9]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-30 z-10" />
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Main Content Column */}
            <div className="md:col-span-8 md:col-start-3">
              <div className="bg-[#16161c]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12">
                {/* Excerpt */}
                <div className="text-xl text-white/90 font-medium leading-relaxed mb-12 border-l-4 border-[#8B5CF6] pl-6">
                  {post.excerpt.split('\n\n')[0]}
                </div>

                {/* HTML Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Secondary Image if exists */}
                {post.image2 && (
                  <div className="mt-12 rounded-xl overflow-hidden border border-white/5">
                    <ImageWithFallback
                      src={post.image2}
                      alt="Imagem secundária"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>

              {/* Share */}
              <div className="mt-12 text-center py-12 border-t border-white/10">
                <BookOpen className="w-12 h-12 text-[#8B5CF6] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Gostou deste artigo?</h3>
                <p className="text-gray-400 mb-6">Compartilhe com sua rede e ajude a espalhar conhecimento.</p>

                <div className="flex justify-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#8B5CF6] hover:text-white text-gray-400 border border-white/10 transition-all flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </button>
                  {/* Add more share buttons as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostPage;

