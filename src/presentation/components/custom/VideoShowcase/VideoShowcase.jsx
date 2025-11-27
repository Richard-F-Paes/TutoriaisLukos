import React from 'react';
import { Play } from 'lucide-react';

const VideoShowcase = ({ 
  videoImageUrl = 'https://lukos.com.br/wp-content/uploads/2025/01/BANNER-HOME-1.png',
  onVideoClick,
  subtitle = 'LUKOS ERP E PDV',
  title = 'Soluções completas para gestão de postos de combustível',
  description = 'Com o LUKOS ERP e PDV, a gestão do seu posto de combustível vai mais além. Controle completo de vendas, estoque, financeiro e operações. Automatize processos, reduza custos e tome decisões mais inteligentes com relatórios em tempo real e integração completa entre todas as áreas do seu negócio.',
  linkUrl = '/produtos',
  linkText = 'Saiba mais'
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Título */}
      <div className="pb-4">
        <article className="w-full">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold uppercase text-center text-gray-900 mb-4">
            As empresas que movem o país, confiam na <strong className="text-[#00D4FF]">LUKOS</strong>
          </h2>
        </article>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-between items-center">
        {/* Card com imagem e botão de vídeo */}
        <div className="w-[600px] h-[400px]">
          <div 
            className="relative group cursor-pointer overflow-hidden rounded-[40px] shadow-xl h-full" 
            onClick={onVideoClick}
          >
            {/* Card Image */}
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
              <img 
                src={videoImageUrl} 
                alt="Vídeo LUKOS" 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
              
              {/* Texto vertical "LUKOS" na borda direita */}
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-2 md:pr-4 z-10 pointer-events-none">
                <div 
                  className="text-white/40 text-3xl md:text-4xl lg:text-5xl font-bold uppercase"
                  style={{ 
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    letterSpacing: '0.15em'
                  }}
                >
                  LUKOS
                </div>
              </div>
              
              {/* Card Body - Link com conteúdo */}
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onVideoClick(); }}
                className="absolute inset-0 flex items-center justify-center h-full z-10 no-underline"
              >
                <div className="">
                  <div className="flex flex-col items-center justify-center w-full ">
                    {/* Ícone de play */}
                    <div className="mb-3">
                      <div className="bg-white rounded-full p-4 md:p-6 group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-2xl inline-block">
                        <Play className="w-10 h-10 md:w-14 md:h-14 text-[#690093] ml-1" fill="#690093" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="bsc-grid-item content-wrapper" style={{ width: '616px', height: '381px' }}>
          <div className="bsc-grid box-content desktop-row-gap-32 nested" style={{ gap: '2rem' }}>
            {/* Subtítulo */}
            <div className="bsc-grid-item">
              <span 
                className="bsc-text mobile-subtitle-xxs-bold-uppercase subtitle" 
                style={{ 
                  color: '#007bff',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                {subtitle}
              </span>
            </div>
            
            {/* Título */}
            <div className="bsc-grid-item">
              <h2 
                className="bsc-text mobile-heading-sm desktop-heading-md title" 
                style={{ 
                  color: '#1a1a1a',
                  fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  marginBottom: '1rem'
                }}
              >
                {title}
              </h2>
            </div>
            
            {/* Descrição */}
            <div className="bsc-grid-item">
              <div 
                className="bsc-text mobile-body-md-regular desktop-subtitle-xs-regular description" 
                style={{ 
                  color: 'black',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}
              >
                <p style={{ margin: 0, color: 'black' }}>
                  {description}
                </p>
              </div>
            </div>
            
            {/* Link */}
            <div className="bsc-grid-item link">
              <a 
                href={linkUrl} 
                target="_self" 
                className="bsc-link bsc-custom-link primary mobile-lg bold"
                style={{ 
                  color: '#007bff',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                onMouseLeave={(e) => e.target.style.color = '#007bff'}
              >
                {linkText}
                <span className="icon right" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <svg 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path 
                      d="M12.5744 10.3886L8.12395 14.839C7.90931 15.0537 7.56133 15.0537 7.34671 14.839L6.82765 14.32C6.61337 14.1057 6.61296 13.7584 6.82673 13.5436L10.3538 9.99999L6.82673 6.45637C6.61296 6.24159 6.61337 5.89432 6.82765 5.68005L7.34671 5.16098C7.56135 4.94634 7.90934 4.94634 8.12395 5.16098L12.5744 9.61138C12.789 9.826 12.789 10.174 12.5744 10.3886Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;

