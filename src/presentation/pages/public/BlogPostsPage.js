import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function BlogPostsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Dados dos posts do blog
  const blogPosts = [
    {
      id: 1,
      title: 'A Revolução da IA Generativa: O Que Esperar em 2024',
      excerpt: 'Explore como a inteligência artificial generativa está remodelando indústrias e o que isso significa para o futuro do desenvolvimento de software e automação.',
      author: 'Ana Silva',
      date: '15 de Julho de 2024',
      category: 'Inteligência Artificial',
      image: 'https://images.pexels.com/photos/4472873/pexels-photo-4472873.jpeg',
      link: '/blog/1',
    },
    {
      id: 2,
      title: 'Segurança Cibernética: Protegendo Seus Dados na Nuvem',
      excerpt: 'Descubra as melhores práticas para garantir a segurança dos seus ativos digitais em ambientes de nuvem híbrida.',
      author: 'Carlos Mendes',
      date: '12 de Julho de 2024',
      category: 'Segurança',
      image: 'https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog/2',
    },
    {
      id: 3,
      title: 'Desenvolvimento Ágil: Acelerando a Inovação',
      excerpt: 'Como as metodologias ágeis podem transformar seu ciclo de desenvolvimento e entregar valor mais rapidamente.',
      author: 'Bruno Lima',
      date: '10 de Julho de 2024',
      category: 'Desenvolvimento',
      image: 'https://lukos.com.br/wp-content/uploads/2025/01/BANNER-HOME-1.png',
      link: '/blog/3',
    },
    {
      id: 4,
      title: 'O Futuro do Trabalho Remoto na Indústria de TI',
      excerpt: 'Entenda como o trabalho remoto está transformando a indústria de tecnologia e quais são as tendências para o futuro.',
      author: 'Equipe LUKOS',
      date: '5 de Julho de 2024',
      category: 'Notícias da Empresa',
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog/4',
    },
    {
      id: 5,
      title: 'Computação Quântica: O Próximo Salto Tecnológico',
      excerpt: 'Descubra como a computação quântica está revolucionando a forma como processamos informações e resolvemos problemas complexos.',
      author: 'Equipe LUKOS',
      date: '1 de Julho de 2024',
      category: 'Inteligência Artificial',
      image: 'https://images.unsplash.com/photo-1602665742701-389671bc40c0?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog/5',
    },
  ];

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white relative">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0a0a0f 100%)' }}
      />
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* Hero Section */}
      <section className="relative pt-[120px] pb-16 z-10">
        <PageNavbar transparent={true} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-[#8B5CF6] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
              ÚLTIMAS NOTÍCIAS
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 leading-tight">
              Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c44cf4] to-[#8B5CF6]">LUKOS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Fique por dentro das últimas tendências, insights e novidades sobre tecnologia e gestão para o seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">

          {/* Conteúdo Principal - Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="group relative bg-[#16161c] border border-white/5 hover:border-[#8B5CF6]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161c] to-transparent opacity-60 z-10" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/20 backdrop-blur-md border border-[#8B5CF6]/30 text-[#a78bfa] text-xs font-bold uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-gray-500 text-xs font-medium mb-3 uppercase tracking-wider">
                    <span>{post.date}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>{post.author}</span>
                  </div>

                  <Link to={post.link} className="block group-hover:no-underline">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#a78bfa] transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    to={post.link}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm uppercase tracking-wide mt-auto group/link"
                  >
                    Ler artigo
                    <ChevronRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex items-center justify-center gap-3">
            <button
              className="flex items-center justify-center rounded-xl w-12 h-12 bg-[#16161c] border border-white/5 text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all font-bold"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center rounded-xl w-12 h-12 font-bold transition-all ${currentPage === page
                    ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                    : 'bg-[#16161c] border border-white/5 text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10'
                  }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="flex items-center justify-center rounded-xl w-12 h-12 bg-[#16161c] border border-white/5 text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all font-bold"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BlogPostsPage;
