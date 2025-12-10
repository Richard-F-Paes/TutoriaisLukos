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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Estilo TOTVS Melhorado */}
      <section className="relative min-h-[750px] md:min-h-[900px] flex items-center" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* Navbar dentro do hero com fundo transparente */}
        <PageNavbar transparent={true} />
        
        {/* Background com imagem do profissional */}
        <div 
          className="absolute inset-0 bg-cover bg-center border-b-4 border-gray-300"
          style={{
            backgroundImage: 'url("https://i.pinimg.com/736x/4a/29/f5/4a29f5894432b10ed543ccae39c93e17.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        
        {/* Overlay preto */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full max-w-7xl pt-[60px]"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Coluna Esquerda - Texto */}
            <div className="text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase font-bold mb-6 leading-tight">
                <div className="w-full max-w-3xl">
                  <p className="m-0 mt-0 mb-0 text-3xl border-0 w-full max-w-3xl text-start box-border translate-x-0 translate-y-0 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100" style={{fontFamily: 'TOTVS !important'}}>
                    Nosso Blog
                  </p>
                </div>
              </h1>
              
              <div className="text-lg md:text-xl lg:text-2xl text-white mb-8 leading-relaxed" style={{maxWidth: '560px'}}>
                <p className="w-full max-w-3xl text-start">
                  Fique por dentro das últimas tendências e insights do mundo da tecnologia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full max-w-7xl">

          <div className="w-full h-full pt-8 pb-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Conteúdo Principal - Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Todos os Posts */}
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div 
                    className="w-full h-48 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="p-4">
                    <Link to={post.link} className="block">
                      <div className="text-gray-900">
                        <span className="text-[#c44cf4] font-semibold uppercase">{post.category}</span>
                        {' '}
                        <span className="font-bold">{post.title}</span>
                        {' '}
                        <span className="text-gray-600 font-normal">{post.excerpt}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button 
                className="flex items-center justify-center rounded-lg size-10 bg-white text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center rounded-lg size-10 bg-[#c44cf4] text-white text-sm font-bold">
                {currentPage}
              </button>
              <button 
                className="flex items-center justify-center rounded-lg size-10 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                2
              </button>
              <button 
                className="flex items-center justify-center rounded-lg size-10 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setCurrentPage(currentPage + 2)}
              >
                3
              </button>
              <button 
                className="flex items-center justify-center rounded-lg size-10 bg-white text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BlogPostsPage;
