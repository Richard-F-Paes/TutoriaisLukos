import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function BlogPostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados dos posts (mesmos dados do BlogPage)
  const blogPosts = {
    1: {
      id: 1,
      title: 'Como o ERP da Lukos Tecnologia pode transformar a gestão do seu posto?',
      excerpt: 'Com o ERP da Lukos, seu posto ganha eficiência, controle e competitividade. Consulte-nos.',
      author: 'Equipe LUKOS',
      date: '15 de Janeiro, 2025',
      readTime: '5 min',
      category: 'Tecnologia',
      image: 'https://images.pexels.com/photos/6169057/pexels-photo-6169057.jpeg',
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
      title: 'Com o ERP da Lukos, seu posto ganha eficiência, controle e competitividade. Consulte-nos.',
      excerpt: 'Simples, Prático e 100% Gerenciado pelo WhatsApp Na Lukos Tecnologia, entendemos a importância de oferecer soluções modernas e acessíveis para',
      author: 'Equipe LUKOS',
      date: '12 de Janeiro, 2025',
      readTime: '7 min',
      category: 'Gestão',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>Na Lukos Tecnologia, entendemos a importância de oferecer soluções modernas e acessíveis para gestão de postos de combustíveis. Nosso ERP é simples, prático e 100% gerenciado pelo WhatsApp, facilitando o acesso e uso diário.</p>
        
        <h2>Gestão pelo WhatsApp</h2>
        <p>Uma das grandes vantagens do nosso sistema é a possibilidade de gerenciar seu posto diretamente pelo WhatsApp. Isso significa que você pode acessar informações importantes, relatórios e até mesmo realizar operações básicas de qualquer lugar, a qualquer momento.</p>
        
        <h2>Simplicidade e Praticidade</h2>
        <p>Não é necessário ser um especialista em tecnologia para usar nosso ERP. A interface foi desenvolvida pensando na facilidade de uso, permitindo que qualquer pessoa da equipe possa operar o sistema com treinamento mínimo.</p>
      `
    },
    3: {
      id: 3,
      title: 'Como a Inteligência Artificial Está Revolucionando a Gestão de Postos de Combustíveis',
      excerpt: 'A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa',
      author: 'Equipe LUKOS',
      date: '10 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Inovação',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa transformação. A Inteligência Artificial (IA) está revolucionando a gestão desses estabelecimentos, oferecendo soluções inteligentes que otimizam processos e aumentam a eficiência.</p>
        
        <h2>IA na Gestão de Estoque</h2>
        <p>A IA pode prever a demanda de combustíveis com base em dados históricos, condições climáticas e eventos locais. Isso permite uma gestão de estoque mais eficiente, reduzindo custos e evitando desperdícios.</p>
        
        <h2>Automação de Processos</h2>
        <p>Com a IA, muitos processos que antes eram manuais podem ser automatizados, liberando tempo para atividades estratégicas e melhorando a experiência do cliente.</p>
      `
    },
    4: {
      id: 4,
      title: 'A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa',
      excerpt: 'A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas',
      author: 'Equipe LUKOS',
      date: '8 de Janeiro, 2025',
      readTime: '4 min',
      category: 'Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas manualmente, especialmente quando se trata de múltiplas operadoras e diferentes formas de pagamento.</p>
        
        <h2>O Desafio da Conciliação</h2>
        <p>Com o aumento das formas de pagamento digital, a conciliação tornou-se ainda mais complexa. Cada operadora tem suas próprias taxas e regras, tornando o processo manual extremamente trabalhoso e propenso a erros.</p>
        
        <h2>Soluções Tecnológicas</h2>
        <p>As soluções tecnológicas modernas podem automatizar esse processo, realizando a conciliação de forma rápida e precisa, economizando tempo e reduzindo erros.</p>
      `
    },
    5: {
      id: 5,
      title: 'Tendências de Tecnologia para Postos de Combustível',
      excerpt: 'Explore as principais tendências tecnológicas que estão transformando o setor de postos de combustível.',
      author: 'Equipe LUKOS',
      date: '5 de Janeiro, 2025',
      readTime: '8 min',
      category: 'Setor',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>O setor de postos de combustível está passando por uma transformação digital significativa. Novas tecnologias estão surgindo e mudando a forma como esses estabelecimentos operam e interagem com seus clientes.</p>
        
        <h2>Tendências Principais</h2>
        <ul>
          <li>Pagamentos digitais e contactless</li>
          <li>Integração com aplicativos móveis</li>
          <li>Automação de processos</li>
          <li>Análise de dados em tempo real</li>
          <li>Sustentabilidade e energia renovável</li>
        </ul>
        
        <h2>O Futuro do Setor</h2>
        <p>Essas tendências estão moldando o futuro do setor, criando novas oportunidades e desafios para os gestores de postos de combustível.</p>
      `
    },
    6: {
      id: 6,
      title: 'Como Reduzir Custos Operacionais com Software de Gestão',
      excerpt: 'Descubra como um sistema de gestão integrado pode reduzir significativamente seus custos operacionais.',
      author: 'Equipe LUKOS',
      date: '3 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Gestão',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: `
        <p>Reduzir custos operacionais é uma das principais preocupações de qualquer gestor de posto de combustível. Um software de gestão integrado pode ser a solução para otimizar processos e reduzir despesas.</p>
        
        <h2>Otimização de Processos</h2>
        <p>Um bom sistema de gestão automatiza processos que antes eram manuais, reduzindo a necessidade de mão de obra e minimizando erros que podem resultar em perdas financeiras.</p>
        
        <h2>Controle de Estoque</h2>
        <p>O controle eficiente de estoque evita desperdícios e garante que você sempre tenha os produtos necessários, sem excessos que geram custos desnecessários.</p>
        
        <h2>Análise de Dados</h2>
        <p>Com relatórios e análises detalhadas, você pode identificar áreas onde é possível reduzir custos sem comprometer a qualidade do serviço.</p>
      `
    }
  };

  const post = blogPosts[parseInt(id)];

  if (!post) {
    return (
      <div>
        <PageNavbar />
        <div className="min-h-screen bg-white flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">O post que você está procurando não existe.</p>
            <Link
              to="/blog"
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
    <div>
      {/* Navbar */}
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative -mt-[90px] flex items-center justify-center">
        <img 
          src={post.image}
          alt={post.title} 
          className="w-full h-[500px] object-cover shadow-lg brightness-75 relative -mt-[10px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full mb-4">
              <Tag className="w-3 h-3" />
              {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
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

      {/* Main Content */}
      <div className="mt-[-10px] pt-16 pb-16 bg-white relative px-4">
        <div className="max-w-4xl mx-auto">
          {/* Botão Voltar */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Blog
          </Link>

          {/* Conteúdo do Post */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Compartilhar */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Compartilhe este post</p>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostDetailPage;

