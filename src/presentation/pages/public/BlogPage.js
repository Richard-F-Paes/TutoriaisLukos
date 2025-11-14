import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function BlogPage() {
  // Dados de exemplo dos posts do blog
  const blogPosts = [
    {
      id: 1,
      title: 'Como o ERP da Lukos Tecnologia pode transformar a gestão do seu posto?',
      excerpt: 'Com o ERP da Lukos, seu posto ganha eficiência, controle e competitividade. Consulte-nos.',
      author: 'Equipe LUKOS',
      date: '15 de Janeiro, 2025',
      readTime: '5 min',
      category: 'Tecnologia',
      image: 'https://images.pexels.com/photos/6169057/pexels-photo-6169057.jpeg',
    },
    {
      id: 2,
      title: 'Com o ERP da Lukos, seu posto ganha eficiência, controle e competitividade. Consulte-nos.',
      excerpt: 'Simples, Prático e 100% Gerenciado pelo WhatsApp Na Lukos Tecnologia, entendemos a importância de oferecer soluções modernas e acessíveis para',
      author: 'Equipe LUKOS',
      date: '12 de Janeiro, 2025',
      readTime: '7 min',
      category: 'Gestão',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Como a Inteligência Artificial Está Revolucionando a Gestão de Postos de Combustíveis',
      excerpt: 'A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa',
      author: 'Equipe LUKOS',
      date: '10 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Inovação',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'A tecnologia está mudando a forma como diversos setores operam, e os postos de combustíveis não ficam de fora dessa',
      excerpt: 'A conciliação de pagamentos é sempre um grande desafio para o lojista. É quase impossível realizar a conferência das taxas',
      author: 'Equipe LUKOS',
      date: '8 de Janeiro, 2025',
      readTime: '4 min',
      category: 'Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'Tendências de Tecnologia para Postos de Combustível',
      excerpt: 'Explore as principais tendências tecnológicas que estão transformando o setor de postos de combustível.',
      author: 'Equipe LUKOS',
      date: '5 de Janeiro, 2025',
      readTime: '8 min',
      category: 'Setor',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      title: 'Como Reduzir Custos Operacionais com Software de Gestão',
      excerpt: 'Descubra como um sistema de gestão integrado pode reduzir significativamente seus custos operacionais.',
      author: 'Equipe LUKOS',
      date: '3 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Gestão',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative -mt-[90px] flex items-center justify-center">
        <img 
          src="https://images.pexels.com/photos/20500735/pexels-photo-20500735.jpeg"
          alt="Blog" 
          className="w-full h-[600px] object-cover shadow-lg brightness-75 relative -mt-[10px]" 
        />
        <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center gap-4 w-full h-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Nosso Blog
            </span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-2xl">
          BLOG
          LUKOS
          </h2>
          <p className="text-white/90 text-xl text-center max-w-3xl px-4 leading-relaxed drop-shadow-lg">
          Fique atualizado sobre o mercado de Postos de combustíveis no Brasil.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mt-[-10px] pt-16 pb-16 bg-white relative px-4">
        <div className="max-w-7xl mx-auto">
          {/* Grid de Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block"
              >
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-full flex flex-col">
                  {/* Imagem do Post */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo do Post */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta informações */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Link para ler mais */}
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:text-purple-700 transition-colors group/link">
                      Ler mais
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
       
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

