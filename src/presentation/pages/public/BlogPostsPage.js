import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, TrendingUp, Eye } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function BlogPostsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Categorias disponíveis
  const categories = ['Todos', 'Inteligência Artificial', 'Segurança', 'Desenvolvimento', 'Notícias da Empresa'];

  // Dados dos posts do blog
  const blogPosts = [
    {
      id: 1,
      title: 'A Revolução da IA Generativa: O Que Esperar em 2024',
      excerpt: 'Explore como a inteligência artificial generativa está remodelando indústrias e o que isso significa para o futuro do desenvolvimento de software e automação.',
      author: 'Ana Silva',
      date: '15 de Julho de 2024',
      category: 'Inteligência Artificial',
      image: 'https://images.pexels.com/photos/4472873/pexels-photo-4472873.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      link: '/blog/1',
      trending: true,
      views: '4.8k',
    },
    {
      id: 2,
      title: 'Segurança Cibernética: Protegendo Seus Dados na Nuvem',
      excerpt: 'Descubra as melhores práticas para garantir a segurança dos seus ativos digitais em ambientes de nuvem híbrida.',
      author: 'Carlos Mendes',
      date: '12 de Julho de 2024',
      category: 'Segurança',
      image: 'https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=1200&h=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog/2',
      trending: false,
      views: '3.2k',
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
      trending: true,
      views: '5.1k',
    },
    {
      id: 4,
      title: 'O Futuro do Trabalho Remoto na Indústria de TI',
      excerpt: 'Entenda como o trabalho remoto está transformando a indústria de tecnologia e quais são as tendências para o futuro.',
      author: 'Equipe LUKOS',
      date: '5 de Julho de 2024',
      category: 'Notícias da Empresa',
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1200&h=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog/4',
      trending: false,
      views: '2.9k',
    },
    {
      id: 5,
      title: 'Computação Quântica: O Próximo Salto Tecnológico',
      excerpt: 'Descubra como a computação quântica está revolucionando a forma como processamos informações e resolvemos problemas complexos.',
      author: 'Equipe LUKOS',
      date: '1 de Julho de 2024',
      category: 'Inteligência Artificial',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&h=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog/5',
      trending: false,
      views: '4.1k',
    },
  ];

  // Filtrar posts por categoria
  const filteredPosts = selectedCategory === 'Todos'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Posts em destaque (trending)
  const featuredPosts = blogPosts.filter(post => post.trending);

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white relative">
      <PageNavbar transparent={true} />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0a0a0f 100%)' }}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c44cf4] to-[#8B5CF6]">LUKOS</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Insights, tendências e novidades sobre tecnologia e gestão
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === category
                    ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                    : 'bg-[#16161c] text-gray-400 hover:text-white hover:bg-[#1f1f28] border border-white/5'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Breaking News Section */}
        <div className="mb-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Breaking News</h2>
              <Link to="#" className="text-[#8B5CF6] text-sm font-semibold hover:text-[#a78bfa] transition-colors">
                Ver tudo
              </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={post.link}
                  className="group relative flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[500px] bg-[#16161c] border border-white/5 hover:border-[#8B5CF6]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(139,92,246,0.2)] snap-start"
                >
                  {/* Image */}
                  <div className="relative h-80 md:h-[28rem] overflow-hidden bg-gradient-to-br from-[#1a1b26] to-[#0a0a0f]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161c] via-[#16161c]/60 to-transparent z-10" />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      style={{
                        imageRendering: 'crisp-edges',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 rounded-full bg-[#8B5CF6] text-white text-xs font-bold uppercase tracking-wide shadow-lg">
                        {post.category}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#a78bfa] transition-colors">
                        {post.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-gray-300 text-xs">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                          <span className="font-semibold">Em alta</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                        <span>{post.views} ago</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Recomendações</h2>
            </div>

            {/* Grid of Cards - Only 3 posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  to={post.link}
                  className="group bg-[#16161c] border border-white/5 hover:border-[#8B5CF6]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]"
                >
                  {/* Horizontal Layout */}
                  <div className="flex gap-4 p-4">
                    {/* Thumbnail */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1b26] to-[#0a0a0f]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      {/* Category */}
                      <div className="mb-2">
                        <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wide">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#a78bfa] transition-colors">
                        {post.title}
                      </h3>

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>{post.author}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Todos os Artigos Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Todos os Artigos</h2>
              <p className="text-gray-400 text-sm">Explore todo o nosso conteúdo</p>
            </div>

            {/* Full Grid of All Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative bg-[#16161c] border border-white/5 hover:border-[#8B5CF6]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-[#1a1b26] to-[#0a0a0f]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161c] to-transparent opacity-60 z-10" />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                      loading="lazy"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
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

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 pb-12">
              <button
                className="flex items-center justify-center rounded-xl w-12 h-12 bg-[#16161c] border border-white/5 text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`flex items-center justify-center rounded-xl w-12 h-12 font-bold transition-all ${page === 1
                    ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                    : 'bg-[#16161c] border border-white/5 text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                className="flex items-center justify-center rounded-xl w-12 h-12 bg-[#16161c] border border-white/5 text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all font-bold"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default BlogPostsPage;
