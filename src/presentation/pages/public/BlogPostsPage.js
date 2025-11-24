import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag } from 'lucide-react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';

function BlogPostsPage() {
  // Dados dos posts do blog
  const blogPosts = [
    {
      id: 1,
      title: 'Como o ERP da Lukos Tecnologia pode transformar a gestão do seu posto?',
      excerpt: 'Fique atualizado sobre as principais tendências e oportunidades no mercado de postos de combustíveis no Brasil. Descubra como se manter competitivo.',
      author: 'Equipe LUKOS',
      date: '15 de Janeiro, 2025',
      readTime: '5 min',
      category: 'Mercado',
      image: 'https://images.pexels.com/photos/5816299/pexels-photo-5816299.jpeg',
      link: '/artigo/1',
    },
    {
      id: 2,
      title: 'Programa de Fidelidade Lukos para Postos de Gasolina',
      excerpt: 'A Inteligência Artificial está revolucionando a gestão de postos de combustível. Descubra como a IA da LUKOS pode otimizar suas operações.',
      author: 'Equipe LUKOS',
      date: '12 de Janeiro, 2025',
      readTime: '7 min',
      category: 'Tecnologia',
      image: 'https://i.pinimg.com/1200x/5b/b1/da/5bb1da6cf8532c7951de99a371ac0f59.jpg',
      link: '/artigo/2',
    },
    {
      id: 3,
      title: 'Como a Inteligência Artificial Está Revolucionando a Gestão de Postos de Combustíveis',
      excerpt: 'Conheça a LUKOS Tecnologia e sua equipe de especialistas. Mais de 10 anos transformando a gestão de postos de combustíveis e lojas de conveniência.',
      author: 'Equipe LUKOS',
      date: '10 de Janeiro, 2025',
      readTime: '4 min',
      category: 'Sobre Nós',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/artigo/3',
    },
    {
      id: 4,
      title: '5 Tópicos importantes sobre a Conciliação de Cartões – Lukos',
      excerpt: 'Conheça a equipe de especialistas da LUKOS Tecnologia dedicada ao sucesso dos nossos clientes. Suporte técnico de excelência.',
      author: 'Equipe LUKOS',
      date: '8 de Janeiro, 2025',
      readTime: '6 min',
      category: 'Equipe',
      image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg',
      link: '/artigo/4',
    },
    
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative -mt-[90px] flex items-center justify-center">
        <img 
          src="https://images.pexels.com/photos/7583935/pexels-photo-7583935.jpeg" 
          alt="Blog LUKOS" 
          className="w-full h-[600px] object-cover shadow-lg brightness-75 relative -mt-[10px]" 
        />
        <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center gap-4 w-full h-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Blog LUKOS
            </span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-2xl">
            Conteúdos e Artigos
          </h2>
          <p className="text-white/90 text-xl text-center max-w-3xl px-4 leading-relaxed drop-shadow-lg">
            Fique atualizado sobre o mercado de postos de combustíveis no Brasil e descubra como potencializar sua gestão
          </p>
        </div>
        
        {/* Wave Divider */}
        <div className=" absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="relative block w-[calc(149%+1.3px)] h-[200px]"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              className="fill-white"
            />
          </svg>
        </div>
      </section>

      {/* Seção de Blog Posts */}
      <section className="w-full py-16 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-8xl mx-auto ">

          {/* Lista de Posts - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                to={post.link}
                className="block group"
              >
                <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 h-full flex flex-col">
                  {/* Imagem do Post */}
                  <div className="relative w-full h-[250px] overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=LUKOS';
                        e.target.onerror = null;
                      }}
                    />
                    {/* Overlay gradiente na imagem */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Conteúdo do Post */}
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    {/* Badge de categoria */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full mb-3 w-fit">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Descrição */}
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta informações */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Link para ler mais */}
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:text-purple-700 transition-colors group/link">
                      <span>Ler mais</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostsPage;

