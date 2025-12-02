import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Menu, X, ChevronDown, BookOpen, Brain, Info, Briefcase, Phone, Package, BarChart3, ShoppingCart, Wallet, Truck, Store, Link as LinkIcon, Globe, Home, FileText, LayoutDashboard, ShoppingBag, Warehouse, CreditCard, Fuel } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Componente reutilizável para ProductCard (elimina duplicação DRY)
const ProductCard = ({ subItem, index, isMobile = false }) => {
  const SubIcon = subItem.icon || Package;
  const figureHeight = isMobile ? '150px' : '100px';
  const titleFontSize = isMobile ? '12px' : '14px';
  const iconSize = isMobile ? 'w-5 h-5' : 'w-6 h-6';
  const iconWidth = isMobile 
    ? (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 ? 25 : 24)
    : (index === 0 ? 24 : index === 3 ? 25 : index === 7 ? 24 : 25);
  const imageWidth = isMobile ? (index === 6 ? 166 : 165) : 280;
  const imageHeight = isMobile ? 200 : 100;
  const cardId = isMobile ? `submenu-produtos-mobile-${index}` : `submenu-produtos-${index}`;
  const cardRole = isMobile ? 'button' : 'menuitem';
  const marginBottom = isMobile ? '8px' : '6px';

  return (
    <div
      id={cardId}
      tabIndex={0}
      role={cardRole}
      aria-label={`Produto ${subItem.label}`}
      className={`product-card rounded-lg overflow-hidden border ${isMobile ? 'border-gray-200' : 'border-gray-200/30 hover:border-transparent hover:shadow-2xl'} transition-all duration-300`}
      style={!isMobile ? {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      } : {}}
      onClick={() => window.location.href = subItem.href}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = subItem.href;
        }
      }}
      onFocus={(e) => {
        if (!isMobile) {
          e.currentTarget.style.outline = '2px solid #00D4FF';
          e.currentTarget.style.outlineOffset = '2px';
        }
      }}
      onBlur={(e) => {
        if (!isMobile) {
          e.currentTarget.style.outline = 'none';
        }
      }}
    >
      <figure className="relative" style={{ width: '100%', height: figureHeight, margin: 0, marginBottom }}>
        <img 
          alt={`Produto de destaque ${subItem.label} `}
          loading="lazy"
          width={imageWidth}
          height={imageHeight}
          decoding="async"
          data-nimg="1"
          className="product-img"
          style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'cover' }}
          src={subItem.image || 'BANNER-HOME-1.png'}
        />
        <div 
          className="product-img-overlay" 
          style={{ 
            background: 'linear-gradient(0deg, rgb(0, 22, 71) -10%, transparent 45%)',
            borderRadius: '0px 0px 10px 10px',
            bottom: '0px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            height: '100%',
            justifyContent: 'flex-end',
            padding: '20px 10px',
            position: 'absolute',
            transition: 'background-size 0.3s ease-in-out',
            width: '100%',
            margin: '0px',
            textRendering: 'geometricprecision',
            scrollBehavior: 'smooth',
            fontFamily: '"Plus Jakarta Sans", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            zIndex: 10
          }}
        >
          {subItem.iconImage ? (
            <img 
              alt={`Icone ${subItem.label}`}
              loading="lazy"
              width={iconWidth}
              height={index === 3 ? 25 : 24}
              decoding="async"
              data-nimg="1"
              className="product-icon"
              style={{ color: 'transparent' }}
              src={subItem.iconImage}
            />
          ) : (
            <div>
              <SubIcon className={`${iconSize} text-white drop-shadow-2xl`} />
            </div>
          )}
          <p className="product-title" style={{ color: 'white', fontWeight: 'bold', fontSize: titleFontSize, textAlign: 'center', margin: 0 }}>
            {subItem.label}
          </p>
        </div>
      </figure>
      <p className="product-description" style={{ textAlign: 'center' }}>
        {subItem.description}
      </p>
    </div>
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
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
      href: '/',
      icon: Home
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
      href: '/ia',
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
      href: '/sobre',
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

        /* Glassmorphism effect com gradiente Lukos */
        .glass-dropdown {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(0, 212, 255, 0.12) 30%, 
            rgba(139, 92, 246, 0.15) 70%, 
            rgba(59, 130, 246, 0.12) 100%);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          box-shadow: 
            0 20px 60px rgba(0, 212, 255, 0.15),
            0 8px 24px rgba(139, 92, 246, 0.12),
            0 2px 8px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 212, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        /* Efeito de brilho animado no fundo */
        .glass-dropdown::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(0, 212, 255, 0.1) 50%,
            transparent 70%
          );
          animation: shimmer 8s infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        /* Borda animada com gradiente */
        .glass-dropdown::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0.4) 0%,
            rgba(59, 130, 246, 0.3) 25%,
            rgba(139, 92, 246, 0.4) 50%,
            rgba(59, 130, 246, 0.3) 75%,
            rgba(0, 212, 255, 0.4) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.6;
          animation: borderGlow 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes borderGlow {
          0%, 100% {
            opacity: 0.4;
            background: linear-gradient(135deg, 
              rgba(0, 212, 255, 0.3) 0%,
              rgba(59, 130, 246, 0.2) 25%,
              rgba(139, 92, 246, 0.3) 50%,
              rgba(59, 130, 246, 0.2) 75%,
              rgba(0, 212, 255, 0.3) 100%);
          }
          50% {
            opacity: 0.8;
            background: linear-gradient(135deg, 
              rgba(0, 212, 255, 0.5) 0%,
              rgba(59, 130, 246, 0.4) 25%,
              rgba(139, 92, 246, 0.5) 50%,
              rgba(59, 130, 246, 0.4) 75%,
              rgba(0, 212, 255, 0.5) 100%);
          }
        }

        /* Garantir que o conteúdo fique acima do efeito de brilho */
        .glass-dropdown > * {
          position: relative;
          z-index: 1;
        }
        
        /* Efeito de hover no dropdown para intensificar brilho */
        .glass-dropdown:hover::after {
          opacity: 1;
          animation-duration: 2s;
        }

        /* Menu item hover effects */
        .menu-item-link {
          transition: all 0.2s var(--dropdown-transition);
          position: relative;
        }

        .menu-item-link:hover {
          transform: translateY(-1px);
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
        }

        .sub-menu.glass-dropdown .products-grid-container {
          max-width: 100%;
          padding: 0;
        }

        /* CSS Grid Container para produtos - Layout responsivo com quebra automática */
        .products-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.75rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* Desktop: 4 cards por linha */
        @media (min-width: 1024px) {
          .products-grid-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Tablet: 3 cards por linha */
        @media (max-width: 1023px) and (min-width: 768px) {
          .products-grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Mobile: 2 cards por linha */
        @media (max-width: 767px) {
          .products-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
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
    <nav className={`absolute left-0 right-0 z-50 w-full flex items-center justify-center space-x-1 h-[60px] ${transparent ? 'top-12' : 'top-0'}`} style={{
      background: transparent ? 'transparent' : 'linear-gradient(135deg, #1a0f2e 0%, #0d0f14 30%, #0f1419 50%, #141a1a 70%, #1a2e1f 100%)',
      backdropFilter: transparent ? 'none' : 'blur(10px)',
      boxShadow: transparent ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="container mx-auto max-w-full px-4" style={{backgroundColor: 'transparent'}}>
        <div className={`row flex items-center justify-between gap-4 ${transparent ? 'py-2' : 'py-4'}`} style={{backgroundColor: 'transparent'}}>
        {/* Logo - col-lg-2 col-1 */}
        <div className="flex-shrink-0">
          <a className="brand inline-block" href="/">
            <img 
              width="140" 
              height="100" 
              className=" h-[80px] w-[100px]" 
              src="logo.png"
              alt="LUKOS"
            />
          </a>
        </div>

        {/* Menu Desktop - col-lg-6 */}
        <div className="hidden lg:flex px-0 justify-center flex-1 min-w-0" style={{overflow: 'visible'}}>
          <nav className="nav-primary w-full" role="navigation" aria-label="Menu principal" style={{overflow: 'visible'}}>
            <ul className="nav flex items-center justify-center space-x-1 h-[60px]" role="menubar" style={{maxWidth: '100%', flexWrap: 'nowrap'}}>
              {menuItems.map((item) => {
                if (item.hasDropdown) {
                  const Icon = item.icon;
                  const isOpen = openDropdowns[item.key];
                  return (
                    <li key={item.key} className="menu-item relative dropdown-container h-full flex items-center" role="none" style={{overflow: 'visible'}}>
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
                        className="menu-item-link flex items-center gap-1 px-3 py-2 text-lg font-medium text-white hover:text-[#00D4FF] transition-all duration-200 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-transparent whitespace-nowrap"
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
                    <li key={item.key} className="menu-item relative" role="none">
                      <a 
                        href={item.href}
                        className={`menu-item-link flex items-center gap-1 px-3 py-2 text-lg font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${
                          active 
                            ? 'text-[#00D4FF]' 
                            : 'text-white hover:text-[#00D4FF] hover:bg-white/10'
                        } focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-transparent`}
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
          <div className="btn-group dropdown dropdown-container">
            <a href="/contato" aria-label="Ir para página de contato">
              <button
                className="btn btn-xs btn-blue px-5 py-2.5 bg-gradient-to-br from-green-500 via-green-500 to-purple-100/40 text-white text-base font-medium rounded-lg hover:from-green-600 hover:via-green-600 hover:to-purple-200/50 transition-all duration-200 flex items-center gap-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                type="button"
                aria-label="Contato"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Contato
              </button>
            </a>
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="nav-primary-mobile lg:hidden glass-dropdown rounded-xl shadow-xl mt-4 p-6" role="navigation" aria-label="Menu mobile">
          <nav className="menu-principal-container">
            <ul className="nav nav-mobile space-y-4" role="menubar">
              {menuItems.map((item) => (
                <li key={item.key} className="menu-item" role="none">
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown(item.key);
                      }
                    }}
                    aria-expanded={openDropdowns[item.key]}
                    aria-haspopup={item.hasDropdown}
                    className="w-full text-left flex items-center justify-between px-5 py-3.5 text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2"
                    role="menuitem"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdowns[item.key] ? 'rotate-180' : ''}`} aria-hidden="true" />
                    )}
                  </button>
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
