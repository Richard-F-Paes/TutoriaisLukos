import React from 'react';
import { PlayCircle, Download, Video, Clock } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';

const Button = ({ children, className = '', variant = 'solid', size = 'lg', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizes = {
    lg: 'h-12 px-5 text-base',
    md: 'h-10 px-4 text-sm',
  };
  const variants = {
    solid: 'bg-white text-purple-700 hover:bg-white/90 focus:ring-white/40',
    outline: 'border-2 border-white text-white hover:bg-white/10 focus:ring-white/30',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const HeroSection = () => {
  return (
    <section className="relative pt-14 md:pt-20 pb-12 md:pb-16 overflow-hidden" id="home">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695561324569-5e47c76dc0a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9uJTIwbmlnaHR8ZW58MXx8fHwxNzYxODQxMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 xl:gap-8 items-center">
          <div className="space-y-2.5 md:space-y-3.5">
            <img src="/logo.png" alt="Lukos" className="mx-auto h-14 sm:h-20 w-auto mb-2" />
            <div className="text-white/80 text-xs sm:text-sm">Sistema Completo para Postos de Combustível</div>
            <h1 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-tight">ERP e PDV Especializado Para Seu Posto</h1>
            <p className="text-xs sm:text-sm lg:text-base text-white/90">
              Aprenda a gerenciar seu posto de gasolina com nosso sistema completo. Tutoriais práticos para PDV, controle de combustível, estoque e relatórios gerenciais.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1">
              <Button size="md" className="bg-white text-purple-700 hover:bg-white/90">
                <PlayCircle className="w-4 h-4 mr-1.5" />
                Assistir Tutoriais
              </Button>
              <Button size="md" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-1.5" />
                Baixar Manual
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1733149086317-db960d20f305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9uJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYxODk2NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Posto de gasolina"
                className="w-full h-44 sm:h-52 md:h-60 lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 bg-white rounded-lg p-3.5 sm:p-4 shadow-md max-w-[12rem] sm:max-w-[13rem]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-600">Tutorial Completo</div>
                    <div className="text-xs">PDV na Prática</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    12:30 min
                  </span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Novo</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


