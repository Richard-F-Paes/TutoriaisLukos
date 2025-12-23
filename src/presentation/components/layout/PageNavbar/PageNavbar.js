import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Menu, X, ChevronDown, BookOpen, Brain, Info, Briefcase, Phone, Package, BarChart3, ShoppingCart, Wallet, Truck, Store, Link as LinkIcon, Globe, Home, FileText, LayoutDashboard, ShoppingBag, Warehouse, CreditCard, Fuel, Users, ArrowRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';

// Componente reutilizável para ProductCard com estilo Apple Cards
const ProductCard = ({ subItem, index, isMobile = false }) => {
  const SubIcon = subItem.icon || Package;
  const cardId = isMobile ? `submenu-produtos-mobile-${index}` : `submenu-produtos-${index}`;
  const cardRole = isMobile ? 'button' : 'menuitem';

  // Tamanhos responsivos para mobile e desktop - ajustados para melhor visualização
  const cardHeight = isMobile ? 'h-56' : 'h-[16rem]';
  const cardWidth = isMobile ? 'w-44' : 'w-56';
  const mdHeight = isMobile ? 'md:h-64' : 'md:h-[18.5rem]';
  const mdWidth = isMobile ? 'md:w-52' : 'md:w-60';

  return (
    <motion.button
      id={cardId}
      tabIndex={0}
      role={cardRole}
      aria-label={`Produto ${subItem.label}`}
      className={`relative z-10 flex ${cardHeight} ${cardWidth} ${mdHeight} ${mdWidth} flex-col items-start justify-end overflow-hidden rounded-[2rem] cursor-pointer group border border-white/10`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.1 * index, ease: "easeOut" }
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => window.location.href = subItem.href}
    >
      {/* Inner Glass Border for Luxury Feel */}
      <div className="absolute inset-2 border border-white/20 rounded-[1.5rem] z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Overlay de gradiente luxuoso */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/100" />

      {/* Conteúdo do Card */}
      <div className="relative z-40 p-6 w-full text-left">
        {/* Animated Icon Container */}
        <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-1">
          {subItem.iconImage ? (
            <img
              alt={`Icone ${subItem.label}`}
              src={subItem.iconImage}
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          ) : (
            <SubIcon className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          )}
        </div>

        {/* Label de Categoria (Tag) */}
        <span className="text-[10px] font-black tracking-[0.2em] text-purple-400 uppercase mb-2 block opacity-80">
          Lukos Tecnologia
        </span>

        <h4 className="text-white font-black text-2xl mb-2 tracking-tight">
          {subItem.label}
        </h4>

        <p className="text-white/60 text-xs leading-relaxed max-w-[200px] font-medium mb-4 transition-colors group-hover:text-white/80">
          {subItem.description || subItem.label}
        </p>

        {/* Explore Button - Hidden by default, slides in on hover */}
        <div className="flex items-center gap-2 overflow-hidden h-0 group-hover:h-8 transition-all duration-500 ease-out">
          <span className="text-white text-sm font-bold tracking-wide uppercase">Conhecer</span>
          <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <img
        src={subItem.image || 'BANNER-HOME-1.png'}
        alt={subItem.label}
        className="absolute inset-0 z-10 object-cover w-full h-full transition duration-1000 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
      />
    </motion.button>
  );
};

// Componente que renderiza o dropdown via Portal (fora da hierarquia da navbar)
const PortalDropdownContent = ({ buttonRef, children, className, isOpen, onMouseEnter, onMouseLeave, centered = false }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !buttonRef?.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      let left = rect.left + window.scrollX;

      // Se centralizado, calcular posição central
      if (centered && dropdownRef.current) {
        const dropdownWidth = dropdownRef.current.offsetWidth;
        const buttonCenter = rect.left + (rect.width / 2);
        left = buttonCenter - (dropdownWidth / 2) + window.scrollX;

        // Garantir que não saia da tela
        const maxLeft = window.innerWidth - dropdownWidth - 16;
        left = Math.max(16, Math.min(left, maxLeft));
      }

      setPosition({
        top: rect.bottom + window.scrollY + 12, // 12px gap abaixo do botão
        left: left,
        maxHeight: window.innerHeight - (rect.bottom + 24) // Espaço disponível abaixo
      });
    };

    // Atualizar posição inicial
    updatePosition();

    // Atualizar posição após o dropdown ser renderizado (para calcular largura)
    requestAnimationFrame(updatePosition);

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, buttonRef, centered]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      // Delay para permitir animação de saída
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating) return null;

  return ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      className={`${className} ${!isOpen ? 'dropdown-exit' : ''}`}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
        maxHeight: position.maxHeight ? `${position.maxHeight}px` : 'auto',
        overflowY: position.maxHeight ? 'auto' : 'visible'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
};

function PageNavbar({ transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openClienteDropdown, setOpenClienteDropdown] = useState(false);
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const closeTimeoutRef = useRef({});
  const menuButtonRefs = useRef({}); // Refs para os botões de dropdown
  const location = useLocation();

  // #region agent log
  const __agentLog = () => { };
  // #endregion

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const inDropdownContainer = !!target?.closest?.('.dropdown-container');
      const inPortalDropdown = !!target?.closest?.('.glass-dropdown');
      // #region agent log
      __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H1', location: 'src/presentation/components/layout/PageNavbar/PageNavbar.js:handleClickOutside', message: 'PageNavbar outside click check', data: { type: event.type, targetTag: target?.tagName || null, inDropdownContainer, inPortalDropdown, willClose: !inDropdownContainer }, timestamp: Date.now() });
      // #endregion
      if (!inDropdownContainer) {
        setOpenDropdowns({});
        setOpenClienteDropdown(false);
        setOpenLanguageMenu(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdowns({});
        setOpenClienteDropdown(false);
        setOpenLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (key) => {
    // #region agent log
    __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H1', location: 'src/presentation/components/layout/PageNavbar/PageNavbar.js:toggleDropdown', message: 'PageNavbar toggleDropdown', data: { key, prevOpen: !!openDropdowns[key] }, timestamp: Date.now() });
    // #endregion
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDropdownMouseEnter = (key) => {
    // Limpar timeout de fechamento se existir
    if (closeTimeoutRef.current[key]) {
      clearTimeout(closeTimeoutRef.current[key]);
      delete closeTimeoutRef.current[key];
    }
    setHoveredDropdown(key);
    setOpenDropdowns(prev => ({ ...prev, [key]: true }));
  };

  const handleDropdownMouseLeave = (key) => {
    // Delay antes de fechar para melhor UX
    closeTimeoutRef.current[key] = setTimeout(() => {
      setOpenDropdowns(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      setHoveredDropdown(null);
      delete closeTimeoutRef.current[key];
    }, 150);
  };

  const menuItems = [
    {
      label: 'Início',
      hasDropdown: false,
      key: 'inicio',
      href: '/#inicio',
      icon: Home
    },
    {
      label: 'Sobre Nós',
      hasDropdown: false,
      key: 'sobre',
      href: '/#sobre',
      icon: Users
    },
    {
      label: 'Tutoriais',
      hasDropdown: false,
      key: 'tutoriais',
      href: '/tutoriais',
      icon: BookOpen
    },
    {
      label: 'IA',
      hasDropdown: false,
      key: 'ia',
      href: '/#ia',
      icon: Brain
    },
    {
      label: 'Produtos',
      hasDropdown: true,
      key: 'produtos',
      icon: Package,
      isCardDropdown: true,
      submenu: [
        {
          label: 'ERP',
          href: '/erp',
          icon: BarChart3,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_ERP_3_bc9518527d.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_ERP_290ccde0c6.svg',
          description: 'Organizar e automatizar seu negócio'
        },
        {
          label: 'PDV',
          href: '/pdv',
          icon: ShoppingCart,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_PDV_4_075449fb07.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_PDV_4988fe51a6.svg',
          description: 'Vender na loja física com sistema integrado'
        },
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: LayoutDashboard,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_ERP_3_bc9518527d.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_ERP_290ccde0c6.svg',
          description: 'Visualize métricas e indicadores do seu negócio'
        },
        {
          label: 'Pré-Venda',
          href: '/pre-venda',
          icon: ShoppingBag,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_PDV_4_075449fb07.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_PDV_4988fe51a6.svg',
          description: 'Gerencie orçamentos e propostas comerciais'
        },
        {
          label: 'Inventário',
          href: '/inventario',
          icon: Warehouse,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_ERP_3_bc9518527d.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_ERP_290ccde0c6.svg',
          description: 'Controle completo de estoque e produtos'
        },
        {
          label: 'Lukos Pay',
          href: '/lukos-pay',
          icon: CreditCard,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_PDV_4_075449fb07.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_PDV_4988fe51a6.svg',
          description: 'Soluções de pagamento integradas'
        },
        {
          label: 'Fuel Check',
          href: '/fuel-check',
          icon: Fuel,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_ERP_3_bc9518527d.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_ERP_290ccde0c6.svg',
          description: 'Gestão completa para postos de combustível'
        },
      ]
    },
    {
      label: 'Serviços',
      hasDropdown: false,
      key: 'servicos',
      href: '/servicos',
      icon: Briefcase
    },
    {
      label: 'Blog',
      hasDropdown: false,
      key: 'blog',
      href: '/blog',
      icon: FileText
    },
    {
      label: 'Sobre',
      hasDropdown: false,
      key: 'sobre',
      href: '/sobre-nos',
      icon: Info
    },
  ];

  return (
    <>
      <style>{`
        :root {
          --dropdown-transition: cubic-bezier(0.4, 0, 0.2, 1);
          --dropdown-duration: 300ms;
        }

        .product-description {
          color: rgb(0, 22, 71);
          font-family: "Plus Jakarta Sans", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          box-sizing: border-box;
          padding: 0px;
          margin: 0px;
          text-rendering: geometricprecision;
          scroll-behavior: smooth;
        }
        
        @media screen and (min-width: 1081px) and (max-width: 1239px) {
          .product-description {
            font-size: 11.8px;
          }
        }
        
        @media (min-width: 1240px) and (max-width: 1359px) {
          .product-description {
            font-size: 12.3px;
          }
        }
        
        @media screen and (max-width: 380px) {
          .product-description {
            font-size: 12px;
          }
        }
        
        .product-card {
          box-sizing: border-box;
          padding: 0px;
          margin: 0px;
          text-rendering: geometricprecision;
          scroll-behavior: smooth;
          font-family: "Plus Jakarta Sans", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1 1 auto;
          min-width: 160px;
          max-width: 100%;
          width: 0;
          overflow: visible;
          position: relative;
        }
        
        .product-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 0.5rem;
          padding: 2px;
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0) 0%,
            rgba(59, 130, 246, 0) 50%,
            rgba(139, 92, 246, 0) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        
        .product-card:hover {
          transform: scale(1.05) translateY(-4px);
        }
        
        .product-card:hover::before {
          opacity: 1;
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0.6) 0%,
            rgba(59, 130, 246, 0.5) 50%,
            rgba(139, 92, 246, 0.6) 100%);
        }
        
        .product-card:hover {
          box-shadow: 
            0 20px 40px rgba(0, 212, 255, 0.25),
            0 10px 20px rgba(59, 130, 246, 0.15),
            0 4px 8px rgba(139, 92, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .product-card * {
          min-width: 0;
        }
        
        @media screen and (max-width: 1280px) {
          .product-card {
            min-width: 140px;
            gap: 6px;
          }
        }

        @media screen and (max-width: 1024px) {
          .product-card {
            min-width: 130px;
            gap: 5px;
          }
        }

        @media screen and (max-width: 768px) {
          .product-card {
            min-width: 120px;
            gap: 4px;
          }
        }

        @media screen and (max-width: 640px) {
          .product-card {
            min-width: 110px;
          }
        }

        /* Dropdown animations */
        .dropdown-menu-enter {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
          transition: opacity var(--dropdown-duration) var(--dropdown-transition),
                      transform var(--dropdown-duration) var(--dropdown-transition);
        }

        .dropdown-menu-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .dropdown-menu-exit {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 150ms var(--dropdown-transition),
                      transform 150ms var(--dropdown-transition);
        }

        .dropdown-menu-exit-active {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }

        /* Glassmorphism efeito premium e limpo */
        .glass-dropdown {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.1);
          position: relative;
        }

        /* Removidos efeitos de brilho excessivo (shimmer/borderGlow) para reduzir o ruído */
        
        /* Garantir que o conteúdo fique acima do fundo */
        .glass-dropdown > * {
          position: relative;
          z-index: 1;
        }

        /* Menu item hover effects */
        .menu-item-link {
          transition: all 0.3s var(--dropdown-transition);
          position: relative;
        }

        .menu-item-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #8B5CF6, #c44cf4);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          opacity: 0;
        }

        .menu-item-link:hover::after {
          width: 80%;
          opacity: 1;
        }

        .menu-item-link:hover {
          color: #8B5CF6;
          background: rgba(139, 92, 246, 0.05);
        }

        .menu-item-link:focus-visible {
          outline: 2px solid #00D4FF;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Submenu item hover */
        .submenu-item {
          transition: all 0.2s var(--dropdown-transition);
          transform-origin: left center;
        }

        .submenu-item:hover {
          transform: translateX(4px) scale(1.02);
          background-color: rgba(0, 212, 255, 0.05);
        }

        /* Active indicator animation */
        .active-indicator {
          transition: width 0.3s var(--dropdown-transition), opacity 0.3s var(--dropdown-transition);
        }

        /* Keyframe animations */
        @keyframes fadeInSlideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @keyframes fadeOutSlideUp {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px) scale(0.95);
          }
        }
        
        /* Keyframe animations para dropdowns não centralizados */
        @keyframes fadeInSlideDownLeft {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOutSlideUpLeft {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .glass-dropdown {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }

        /* Garantir que o sub-menu não ultrapasse os limites da tela */
        .sub-menu.glass-dropdown {
          box-sizing: border-box;
          max-width: calc(100vw - 2rem);
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
        }

        .sub-menu.glass-dropdown::-webkit-scrollbar {
          width: 6px;
        }

        .sub-menu.glass-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }

        .sub-menu.glass-dropdown::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }

        .sub-menu.glass-dropdown::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.4);
        }

        .products-grid-container::-webkit-scrollbar {
          height: 8px;
        }

        .products-grid-container::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 10px;
        }

        .products-grid-container::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
          border: 2px solid #f9fafb;
          transition: all 0.2s ease;
        }

        .products-grid-container::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
          border-color: #f3f4f6;
        }

        .products-grid-container::-webkit-scrollbar-thumb:active {
          background: #6b7280;
        }

        .sub-menu.glass-dropdown .mega-menu-content {
          max-width: 100%;
          padding: 2rem;
          box-sizing: border-box;
        }

        /* CSS Grid Container para produtos - Layout em Grade Mega-Menu */
        .products-grid-container {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .products-grid-container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .products-grid-container {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            width: auto;
          }
        }


        @media (min-width: 641px) and (max-width: 768px) {
          .products-grid-container {
            gap: 0.625rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .products-grid-container {
            gap: 0.75rem;
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .products-grid-container {
            gap: 0.75rem;
          }
        }

        @media (min-width: 1281px) {
          .products-grid-container {
            gap: 0.875rem;
          }
        }

        /* Tamanhos de botões dentro do grid - Ajustados para Mega-Menu */
        .products-grid-container button {
          width: 100%;
          height: 16rem;
          min-width: 14rem;
        }

        @media (min-width: 1280px) {
          .products-grid-container button {
            height: 18.5rem;
            min-width: 16rem;
          }
        }
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent layout shift during animations */
        .dropdown-container {
          position: relative;
        }

        /* Otimizações de performance para dropdowns */
        .sub-menu.glass-dropdown {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Improved focus styles for better accessibility */
        *:focus-visible {
          outline: 2px solid #00D4FF;
          outline-offset: 2px;
        }

        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          .menu-item-link,
          .submenu-item {
            min-height: 44px;
            display: flex;
            align-items: center;
          }
        }

        /* Seletor de Idioma Minimalista */
        .language-selector-minimalist {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 60;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.65;
          transition: opacity 0.3s ease;
          pointer-events: auto;
        }

        .language-selector-minimalist:hover,
        .language-selector-minimalist.active {
          opacity: 1;
        }

        .language-selector-minimalist .globe-button {
          padding: 0.375rem;
          color: white;
          transition: all 0.2s ease;
          border-radius: 0.375rem;
          background: transparent;
          border: none;
          cursor: pointer;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .language-selector-minimalist .globe-button:hover {
          color: #00D4FF;
          background: rgba(255, 255, 255, 0.05);
          opacity: 1;
          transform: scale(1.1);
        }

        .language-selector-minimalist .globe-button:focus {
          outline: 2px solid #00D4FF;
          outline-offset: 2px;
        }

        .language-selector-minimalist .globe-button:active {
          transform: scale(0.95);
        }

        .language-selector-minimalist .divider-line {
          height: 1rem;
          width: 1px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* Responsividade para mobile */
        @media (max-width: 1024px) {
          .language-selector-minimalist {
            top: 0.75rem;
            right: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .language-selector-minimalist {
            top: 0.5rem;
            right: 0.5rem;
          }
          
          .language-selector-minimalist .globe-button {
            padding: 0.5rem;
            min-width: 36px;
            min-height: 36px;
          }
        }

        /* Garantir que não interfira com outros elementos */
        @media (max-width: 640px) {
          .language-selector-minimalist {
            display: none;
          }
        }
      `}</style>
      <nav className={`fixed left-0 right-0 z-50 w-full flex items-center justify-center transition-all duration-500 ${transparent ? 'top-6 px-6' : 'top-0 px-0'}`}>
        <div className={`container mx-auto transition-all duration-500 relative flex items-center justify-between px-8 h-[70px] ${transparent
          ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl'
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'
          }`}>
          {/* Logo - col-lg-2 col-1 */}
          <div className="flex-shrink-0">
            <a className="brand inline-block hover:scale-105 transition-transform" href="/">
              <img
                width="120"
                height="auto"
                className="h-[50px] w-auto brightness-110"
                src="logo.png"
                alt="LUKOS"
              />
            </a>
          </div>

          {/* Menu Desktop - col-lg-6 */}
          <div className="hidden lg:flex px-0 justify-center flex-1 min-w-0" style={{ overflow: 'visible' }}>
            <nav className="nav-primary w-full" role="navigation" aria-label="Menu principal" style={{ overflow: 'visible' }}>
              <ul className="nav flex items-center bg-[#] rounded-full justify-center space-x-1 h-[60px]" role="menubar" style={{ maxWidth: '100%', flexWrap: 'nowrap' }}>
                {menuItems.map((item) => {
                  if (item.hasDropdown) {
                    const Icon = item.icon;
                    const isOpen = openDropdowns[item.key];
                    return (
                      <li key={item.key} className="dropdown-container h-full flex items-center" role="none" style={{ overflow: 'visible' }}>
                        <button
                          ref={(el) => { if (el) menuButtonRefs.current[item.key] = el; }}
                          onClick={() => toggleDropdown(item.key)}
                          onMouseEnter={() => handleDropdownMouseEnter(item.key)}
                          onMouseLeave={() => handleDropdownMouseLeave(item.key)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleDropdown(item.key);
                            }
                          }}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-label={`${item.label} menu`}
                          className={`menu-item-link flex items-center gap-1 px-4 py-2 text-base font-bold transition-all duration-300 rounded-xl whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 text-[#8B5CF6] ${transparent ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-100/50 hover:bg-gray-200/50'
                            }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {item.label}
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>

                        {item.hasDropdown && (
                          <>
                            {item.isCardDropdown ? (
                              <PortalDropdownContent
                                buttonRef={{ current: menuButtonRefs.current[item.key] }}
                                isOpen={isOpen}
                                centered={true}
                                onMouseEnter={() => handleDropdownMouseEnter(item.key)}
                                onMouseLeave={() => handleDropdownMouseLeave(item.key)}
                                className="sub-menu glass-dropdown rounded-2xl p-3 dropdown-menu-enter-active"
                              >
                                <div
                                  role="menu"
                                  aria-label={`Menu ${item.label}`}
                                  style={{
                                    maxWidth: 'calc(100vw - 2rem)',
                                    width: 'fit-content',
                                    boxSizing: 'border-box',
                                  }}
                                >
                                  <div className="mega-menu-content">
                                    {/* Header do Mega-Menu */}
                                    <div className="mb-8 border-b border-purple-500/10 pb-6">
                                      <h3 className="text-purple-600 font-black text-xs uppercase tracking-[0.3em] mb-2">
                                        Nossas Soluções
                                      </h3>
                                      <p className="text-gray-900 font-extrabold text-3xl tracking-tighter">
                                        Ecossistema Lukos.
                                        <span className="block text-[#8B5CF6]">Tecnologia que impulsiona o seu negócio.</span>
                                      </p>
                                    </div>

                                    <div className="products-grid-container">
                                      {item.submenu.map((subItem, index) => (
                                        <ProductCard
                                          key={index}
                                          subItem={subItem}
                                          index={index}
                                          isMobile={false}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </PortalDropdownContent>
                            ) : (
                              <PortalDropdownContent
                                buttonRef={{ current: menuButtonRefs.current[item.key] }}
                                isOpen={isOpen}
                                centered={false}
                                onMouseEnter={() => handleDropdownMouseEnter(item.key)}
                                onMouseLeave={() => handleDropdownMouseLeave(item.key)}
                                className="sub-menu glass-dropdown w-64 rounded-xl py-2 dropdown-menu-enter-active"
                              >
                                <ul role="menu">
                                  {item.submenu.map((subItem, index) => (
                                    <li key={index} className="menu-item" role="none">
                                      {subItem.hasSubmenu ? (
                                        <div className="relative">
                                          <button
                                            onClick={() => toggleDropdown(`${item.key}-${index}`)}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggleDropdown(`${item.key}-${index}`);
                                              }
                                            }}
                                            aria-expanded={openDropdowns[`${item.key}-${index}`]}
                                            aria-haspopup="true"
                                            className="submenu-item block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                            role="menuitem"
                                          >
                                            {subItem.label}
                                            <ChevronDown className={`ml-1 h-3 w-3 inline transition-transform duration-300 ${openDropdowns[`${item.key}-${index}`] ? 'rotate-180' : ''}`} aria-hidden="true" />
                                          </button>
                                          {openDropdowns[`${item.key}-${index}`] && (
                                            <ul
                                              className="sub-menu glass-dropdown absolute left-full top-0 ml-2 w-56 rounded-xl z-50 py-2 dropdown-menu-enter-active"
                                              style={{
                                                animation: 'fadeInSlideDownLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transformOrigin: 'top left',
                                                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                              }}
                                              role="menu"
                                            >
                                              {subItem.submenu.map((subSubItem, subIndex) => (
                                                <li key={subIndex} role="none">
                                                  <a
                                                    href={subSubItem.href}
                                                    className="submenu-item block px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                                    role="menuitem"
                                                  >
                                                    {subSubItem.label}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      ) : (
                                        <a
                                          href={subItem.href}
                                          target={subItem.external ? "_blank" : undefined}
                                          rel={subItem.external ? "noopener noreferrer" : undefined}
                                          className="submenu-item block px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                          role="menuitem"
                                        >
                                          {subItem.label}
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </PortalDropdownContent>
                            )}
                          </>
                        )}
                      </li>
                    );
                  } else {
                    const Icon = item.icon;
                    const active = location.pathname === item.href;
                    return (
                      <li key={item.key} className="" role="none">
                        <a
                          href={item.href}
                          className={`menu-item-link flex items-center gap-1 px-4 py-2 text-base font-bold transition-all duration-300 rounded-xl whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 text-[#8B5CF6] ${active
                            ? 'bg-[#8B5CF6]/10'
                            : transparent ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-100/50 hover:bg-gray-200/50'
                            }`}
                          role="menuitem"
                          aria-current={active ? 'page' : undefined}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {item.label}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </nav>
          </div>

          {/* Botões Direita - col-lg-4 */}
          <div className="hidden lg:flex items-center space-x-4 ml-4 flex-shrink-0">
            {/* Botão Contato */}
            <div className="flex items-center gap-3">
              <Link
                to="/contato"
                className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-purple-500/20 text-sm flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Contato
              </Link>
            </div>


          </div>

          {/* Mobile Menu Button */}
          <div className="col-2 md:hidden text-right flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsMenuOpen(!isMenuOpen);
                }
              }}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-controls="mobile-menu"
              className="navbar-toggler hamburger flex flex-col justify-center items-center w-10 h-10 space-y-1.5 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 transition-all duration-200"
              type="button"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} aria-hidden="true"></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} aria-hidden="true"></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} aria-hidden="true"></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div id="mobile-menu" className="nav-primary-mobile lg:hidden glass-dropdown rounded-xl shadow-xl mt-4 p-6" role="navigation" aria-label="Menu mobile">
              <nav className="menu-principal-container">
                <ul className="nav nav-mobile space-y-4" role="menubar">
                  {menuItems.map((item) => (
                    <li key={item.key} className="menu-item" role="none">
                      {item.hasDropdown ? (
                        <button
                          onClick={() => toggleDropdown(item.key)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleDropdown(item.key);
                            }
                          }}
                          aria-expanded={openDropdowns[item.key]}
                          aria-haspopup={true}
                          className="w-full text-left flex items-center justify-between px-5 py-3.5 text-gray-700 hover:text-[#8B5CF6] transition-all duration-200 rounded-lg hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
                          role="menuitem"
                        >
                          <span className="flex items-center gap-2">
                            {item.icon && <item.icon className="h-4 w-4" />}
                            {item.label}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdowns[item.key] ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full text-left flex items-center gap-2 px-5 py-3.5 text-gray-700 hover:text-[#8B5CF6] transition-all duration-200 rounded-lg hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
                          role="menuitem"
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          {item.label}
                        </a>
                      )}
                      {openDropdowns[item.key] && item.hasDropdown && (
                        <>
                          {item.isCardDropdown ? (
                            <div className="sub-menu pl-4 mt-2">
                              <div className="grid grid-cols-2 gap-3">
                                {item.submenu.map((subItem, index) => (
                                  <ProductCard
                                    key={index}
                                    subItem={subItem}
                                    index={index}
                                    isMobile={true}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <ul className="sub-menu pl-4 space-y-2 mt-2" role="menu">
                              {item.submenu.map((subItem, index) => (
                                <li key={index} className="menu-item" role="none">
                                  {subItem.hasSubmenu ? (
                                    <div>
                                      <button
                                        onClick={() => toggleDropdown(`${item.key}-${index}`)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleDropdown(`${item.key}-${index}`);
                                          }
                                        }}
                                        aria-expanded={openDropdowns[`${item.key}-${index}`]}
                                        aria-haspopup="true"
                                        className="submenu-item w-full text-left flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-[#00D4FF] transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                        role="menuitem"
                                      >
                                        {subItem.label}
                                        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${openDropdowns[`${item.key}-${index}`] ? 'rotate-180' : ''}`} aria-hidden="true" />
                                      </button>
                                      {openDropdowns[`${item.key}-${index}`] && (
                                        <ul className="sub-menu pl-4 space-y-2 mt-2" role="menu">
                                          {subItem.submenu.map((subSubItem, subIndex) => (
                                            <li key={subIndex} role="none">
                                              <a
                                                href={subSubItem.href}
                                                className="submenu-item block px-4 py-2.5 text-sm text-gray-600 hover:text-[#00D4FF] transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                                role="menuitem"
                                              >
                                                {subSubItem.label}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  ) : (
                                    <a
                                      href={subItem.href}
                                      target={subItem.external ? "_blank" : undefined}
                                      rel={subItem.external ? "noopener noreferrer" : undefined}
                                      className="submenu-item block px-4 py-2.5 text-sm text-gray-600 hover:text-[#00D4FF] transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                      role="menuitem"
                                    >
                                      {subItem.label}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="menu-info text-center mt-6 space-y-4">
                <a href="/contato" className="block">
                  <button
                    className="btn btn-sm btn-blue w-full px-5 py-3 bg-gradient-to-br from-green-500 via-green-500 to-purple-100/40 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:via-green-600 hover:to-purple-200/50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Ir para página de contato"
                  >
                    Contato
                  </button>
                </a>

                <div className="btn-group dropdown dropdown-container relative">
                  <button
                    onClick={() => setOpenClienteDropdown(!openClienteDropdown)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenClienteDropdown(!openClienteDropdown);
                      }
                    }}
                    aria-expanded={openClienteDropdown}
                    aria-haspopup="true"
                    aria-label="Menu do cliente"
                    className="btn btn-sm btn-white-outline w-full px-5 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2"
                  >
                    Sou cliente
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${openClienteDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>

                  {openClienteDropdown && (
                    <div
                      className="dropdown-menu dropdown-menu-secondary glass-dropdown absolute top-full left-0 right-0 mt-2 w-full rounded-xl z-50 py-4 px-4 text-center dropdown-menu-enter-active"
                      style={{
                        animation: 'fadeInSlideDownLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'top center',
                        transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      role="menu"
                      aria-label="Menu de suporte ao cliente"
                    >
                      <strong className="block text-gray-900 font-semibold mb-2">Suporte</strong>
                      <a href="tel:40030015" className="block text-[#00D4FF] hover:text-[#00B8E6] transition-colors mb-3" role="menuitem">4003-0015</a>
                      <small className="block text-gray-600 mt-3 mb-3">ou acesse</small>
                      <div className="space-y-2">
                        <a href="https://suporte.totvs.com" className="submenu-item block text-[#00D4FF] hover:text-[#00B8E6] transition-all duration-200 rounded-lg px-3 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1" role="menuitem" target="_blank" rel="noopener noreferrer">Central do Cliente</a>
                        <a href="https://espacolegislacao.totvs.com/" className="submenu-item block text-[#00D4FF] hover:text-[#00B8E6] transition-all duration-200 rounded-lg px-3 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1" role="menuitem" target="_blank" rel="noopener noreferrer">Espaço Legislação</a>
                        <a href="https://www.totvs.com/carta-da-reforma-tributaria/" className="submenu-item block text-[#00D4FF] hover:text-[#00B8E6] transition-all duration-200 rounded-lg px-3 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1" role="menuitem" target="_blank" rel="noopener noreferrer">Carta Reforma Tributária</a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="langs-option langs-mobile flex justify-center space-x-3" role="group" aria-label="Seleção de idioma">
                  <a href="/" className="langs-btn-mobile flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1" aria-label="Português (Brasil)">
                    <figure className="m-0" aria-hidden="true">
                      <img
                        src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-br_00c220c9.jpg.webp"
                        alt="Bandeira Brasil"
                        className="w-6 h-4 object-cover rounded"
                      />
                    </figure>
                    <span className="text text-sm text-gray-700 font-medium">PT</span>
                  </a>
                  <a href="https://es.totvs.com/" className="langs-btn-mobile flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1" aria-label="Español" target="_blank" rel="noopener noreferrer">
                    <figure className="m-0" aria-hidden="true">
                      <img
                        src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-es_9fac6f20.jpg.webp"
                        alt="Bandeira Espanha"
                        className="w-6 h-4 object-cover rounded"
                      />
                    </figure>
                    <span className="text text-sm text-gray-700 font-medium">ES</span>
                  </a>
                  <a href="https://en.totvs.com/" className="langs-btn-mobile flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1" aria-label="English" target="_blank" rel="noopener noreferrer">
                    <figure className="m-0" aria-hidden="true">
                      <img
                        src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-en_19a7eea0.png.webp"
                        alt="Bandeira Reino Unido"
                        className="w-6 h-4 object-cover rounded"
                      />
                    </figure>
                    <span className="text text-sm text-gray-700 font-medium">EN</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Seletor de Idioma Minimalista - Fixo no top-right */}
      <div
        className={`language-selector-minimalist dropdown-container ${openLanguageMenu ? 'active' : ''}`}
        style={{
          display: isMenuOpen ? 'none' : 'flex'
        }}
      >
        {/* Ícone de Globo */}
        <button
          onClick={() => setOpenLanguageMenu(!openLanguageMenu)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpenLanguageMenu(!openLanguageMenu);
            }
          }}
          aria-expanded={openLanguageMenu}
          aria-haspopup="true"
          aria-label="Selecionar idioma"
          className="globe-button"
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Linha Minimalista */}
        <div
          className="divider-line"
          aria-hidden="true"
        />

        {/* Dropdown Menu */}
        {openLanguageMenu && (
          <ul
            className="glass-dropdown absolute top-full right-0 mt-2 w-44 rounded-xl z-50 py-2 dropdown-menu-enter-active"
            style={{
              animation: 'fadeInSlideDownLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transformOrigin: 'top right',
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            role="menu"
            aria-label="Menu de idiomas"
            onMouseEnter={(e) => {
              const container = e.currentTarget.closest('.language-selector-minimalist');
              if (container) container.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const container = e.currentTarget.closest('.language-selector-minimalist');
              if (container && !openLanguageMenu) container.style.opacity = '0.65';
            }}
          >
            <li role="none">
              <a
                href="/"
                className="submenu-item flex items-center px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                role="menuitem"
                aria-label="Português (Brasil)"
                onClick={() => setOpenLanguageMenu(false)}
              >
                <figure className="m-0 mr-2" aria-hidden="true">
                  <img
                    src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-br_00c220c9.jpg.webp"
                    alt="Bandeira Brasil"
                    className="w-6 h-4 object-cover rounded"
                  />
                </figure>
                <span className="text">PT</span>
              </a>
            </li>
            <li role="none">
              <a
                href="https://es.totvs.com/"
                className="submenu-item flex items-center px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                role="menuitem"
                aria-label="Espanhol"
                onClick={() => setOpenLanguageMenu(false)}
              >
                <figure className="m-0 mr-2" aria-hidden="true">
                  <img
                    src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-es_9fac6f20.jpg.webp"
                    alt="Bandeira Espanha"
                    className="w-6 h-4 object-cover rounded"
                  />
                </figure>
                <span className="text">ES</span>
              </a>
            </li>
            <li role="none">
              <a
                href="https://en.totvs.com/"
                className="submenu-item flex items-center px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                role="menuitem"
                aria-label="Inglês"
                onClick={() => setOpenLanguageMenu(false)}
              >
                <figure className="m-0 mr-2" aria-hidden="true">
                  <img
                    src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-en_19a7eea0.png.webp"
                    alt="Bandeira Reino Unido"
                    className="w-6 h-4 object-cover rounded"
                  />
                </figure>
                <span className="text">EN</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default PageNavbar;
