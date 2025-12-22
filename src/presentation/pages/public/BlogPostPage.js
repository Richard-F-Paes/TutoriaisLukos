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

  // Dados dos posts (mesmos dados do BlogPage)
  const blogPosts = {
    1: {
      id: 1,
      title: 'Como o ERP da Lukos Tecnologia pode transformar a gestão do seu posto?',
      excerpt: `A Lukos é uma empresa especializada em soluções de PDV e ERP para postos de combustíveis e lojas de conveniência, oferecendo tecnologia completa para gestão, automação e controle operacional.

Iniciamos nossa trajetória com o propósito de simplificar a rotina dos postos, trazendo ferramentas que unificam processos, aumentam a eficiência e garantem mais segurança nas operações. Com uma equipe experiente no segmento, evoluímos constantemente para atender às necessidades reais do mercado.

Ao longo dos anos, nossa plataforma se tornou referência, atendendo empresas em todo o país e contribuindo para uma gestão mais inteligente, ágil e integrada. Nosso compromisso é continuar inovando e proporcionando a melhor experiência possível para nossos clientes.

Acreditamos que tecnologia de qualidade transforma negócios. Por isso, seguimos investindo no aprimoramento de nossos sistemas, suporte técnico e recursos que realmente fazem diferença no dia a dia de quem trabalha com postos e conveniências.`,
      author: 'Equipe LUKOS',
      date: '15 de Janeiro, 2025',
      readTime: '5 min',
      category: 'Mercado',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      image2: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>O mercado de postos de combustíveis está cada vez mais competitivo, e a gestão eficiente tornou-se fundamental para o sucesso do negócio. O ERP da Lukos Tecnologia oferece uma solução completa e integrada que pode transformar completamente a forma como você gerencia seu posto.</p>
        
        <h2>Benefícios do ERP Lukos</h2>
        <p>Com o ERP da Lukos, você tem acesso a:</p>
        <ul>
          <li>Controle total de estoque em tempo real</li>
          <li>Gestão financeira integrada</li>
          <li>Relatórios e dashboards personalizados</li>
          <li>Automação de processos operacionais</li>
          <li>Integração com sistemas de pagamento</li>
        </ul>
        
        <h2>Eficiência Operacional</h2>
        <p>A plataforma permite que você tenha visibilidade completa sobre todas as operações do seu posto, desde a venda na bomba até a gestão de fornecedores. Isso resulta em maior eficiência e redução de custos operacionais.</p>
        
        <h2>Competitividade no Mercado</h2>
        <p>Ao utilizar o ERP da Lukos, você está investindo em tecnologia de ponta que coloca seu posto à frente da concorrência. A capacidade de tomar decisões baseadas em dados reais é um diferencial competitivo significativo.</p>
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
        <p>Na Lukos Tecnologia, entendemos a importância de oferecer soluções modernas e acessíveis para gestão de postos de combustíveis. Nosso Programa de Fidelidade é simples, prático e 100% gerenciado pelo WhatsApp, facilitando o acesso e uso diário.</p>
        
        <h2>Gestão pelo WhatsApp</h2>
        <p>Uma das grandes vantagens do nosso sistema é a possibilidade de gerenciar seu programa de fidelidade diretamente pelo WhatsApp. Isso significa que você pode acessar informações importantes, relatórios e até mesmo realizar operações básicas de qualquer lugar, a qualquer momento.</p>
        
        <h2>Simplicidade e Praticidade</h2>
        <p>Não é necessário ser um especialista em tecnologia para usar nosso programa. A interface foi desenvolvida pensando na facilidade de uso, permitindo que qualquer pessoa da equipe possa operar o sistema com treinamento mínimo.</p>
        
        <h2>Benefícios para o Cliente</h2>
        <p>O programa de fidelidade oferece vantagens reais para seus clientes, aumentando a satisfação e a retenção. Com pontos acumulados a cada abastecimento, seus clientes têm mais motivos para voltar ao seu posto.</p>
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
        <p>A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa transformação. A Inteligência Artificial (IA) está revolucionando a gestão desses estabelecimentos, oferecendo soluções inteligentes que otimizam processos e aumentam a eficiência.</p>
        
        <h2>IA na Gestão de Estoque</h2>
        <p>A IA pode prever a demanda de combustíveis com base em dados históricos, condições climáticas e eventos locais. Isso permite uma gestão de estoque mais eficiente, reduzindo custos e evitando desperdícios.</p>
        
        <h2>Automação de Processos</h2>
        <p>Com a IA, muitos processos que antes eram manuais podem ser automatizados, liberando tempo para atividades estratégicas e melhorando a experiência do cliente.</p>
        
        <h2>Análise Preditiva</h2>
        <p>A inteligência artificial permite análises preditivas que ajudam a antecipar tendências de mercado, otimizar preços e melhorar a tomada de decisões estratégicas.</p>
      `
    },
    4: {
      id: 4,
      title: 'Como a Inteligência Artificial Está Revolucionando a Gestão de Postos de Combustíveis',
      excerpt: 'A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas manualmente, especialmente quando se trata de múltiplas operadoras e diferentes formas de pagamento.',
      author: 'Equipe LUKOS',
      date: '8 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Equipe',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      image2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas manualmente, especialmente quando se trata de múltiplas operadoras e diferentes formas de pagamento.</p>
        
        <h2>O Desafio da Conciliação</h2>
        <p>Com o aumento das formas de pagamento digital, a conciliação tornou-se ainda mais complexa. Cada operadora tem suas próprias taxas e regras, tornando o processo manual extremamente trabalhoso e propenso a erros.</p>
        
        <h2>Soluções Tecnológicas</h2>
        <p>As soluções tecnológicas modernas podem automatizar esse processo, realizando a conciliação de forma rápida e precisa, economizando tempo e reduzindo erros.</p>
        
        <h2>Benefícios da Automação</h2>
        <p>Com a automação da conciliação, você ganha tempo para focar em outras atividades importantes do seu negócio, além de ter maior precisão nos controles financeiros.</p>
      `
    },
  };

  const post = blogPosts[parseInt(id)];

  if (!post) {
    return (
      <div>
        <PageNavbar />
        <div className="min-h-screen bg-white flex items-center justify-center pt-[-32px]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">O post que você está procurando não existe.</p>
            <Link
              to="/blog-posts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <PageNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 -mt-[90px] pt-32">
        <div className="">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-4">
              <Tag className="w-3 h-3" />
              {post.category}
            </div>
            <h1 className="text-white mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-blue-100 text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} de leitura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image and Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src={post.image}
                alt={post.title || 'Imagem do post'}
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <Link
                to="/blog-posts"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Blog
              </Link>
              {post.title && <h2 className="mb-6 text-gray-600">{post.title}</h2>}
              <div className="text-gray-600 leading-relaxed space-y-4 text-black ">
                {post.excerpt.split('\n\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-black text-start">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image and Content Section - Inverted */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-gray-600">Nossa História</h2>
              <div className="text-gray-600 leading-relaxed space-y-4 text-black">
                {post.excerpt.split('\n\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-black text-start">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
            <div>
              <ImageWithFallback
                src={post.image2 || post.image}
                alt={post.title || 'Imagem do post'}
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <article className="prose prose-lg max-w-none">
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          <h2 className="mb-6 text-gray-600">Compartilhe este conteúdo</h2>
          <p className="text-gray-600 mb-6">
            Gostou deste post? Compartilhe com outros e ajude a espalhar conhecimento sobre gestão de postos de combustível.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="p-3 rounded-full bg-white hover:bg-gray-200 transition-colors shadow-lg">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostPage;

