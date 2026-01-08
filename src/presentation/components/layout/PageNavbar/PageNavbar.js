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
  const cardWidth = isMobile ? 'w-full' : 'w-56'; // Full width on mobile menu
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

      if (!inDropdownContainer && !inPortalDropdown) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDropdownMouseEnter = (key) => {
    if (closeTimeoutRef.current[key]) {
      clearTimeout(closeTimeoutRef.current[key]);
      delete closeTimeoutRef.current[key];
    }
    setHoveredDropdown(key);
    setOpenDropdowns(prev => ({ ...prev, [key]: true }));
  };

  const handleDropdownMouseLeave = (key) => {
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

        .glass-dropdown > * {
          position: relative;
          z-index: 1;
        }

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

        .submenu-item {
          transition: all 0.2s var(--dropdown-transition);
          transform-origin: left center;
        }

        .submenu-item:hover {
          transform: translateX(4px) scale(1.02);
          background-color: rgba(0, 212, 255, 0.05);
        }

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
                                className="sub-menu glass-dropdown w-56 rounded-xl py-2 dropdown-menu-enter-active"
                              >
                                <div role="menu">
                                  {item.submenu.map((subItem, index) => (
                                    <div key={index} className="menu-item" role="none">
                                      <a
                                        href={subItem.href}
                                        className="submenu-item block px-4 py-2.5 text-sm text-gray-700 hover:text-[#00D4FF] transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-1"
                                        role="menuitem"
                                      >
                                        {subItem.label}
                                      </a>
                                    </div>
                                  ))}
                                </div>
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
              className="navbar-toggler hamburger flex flex-col justify-center items-center w-10 h-10 space-y-1.5 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 transition-all duration-200"
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block w-6 h-0.5 bg-[#8B5CF6] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} aria-hidden="true"></span>
              <span className={`block w-6 h-0.5 bg-[#8B5CF6] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} aria-hidden="true"></span>
              <span className={`block w-6 h-0.5 bg-[#8B5CF6] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} aria-hidden="true"></span>
            </button>
          </div>

          {/* Mobile Menu Overlay - Premium Full Screen */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto pb-24 animate-[fadeIn_0.3s_ease-out]"
              role="navigation"
              aria-label="Menu mobile"
            >
              <nav className="container mx-auto px-6 py-8 pt-[90px]">
                <ul className="space-y-4" role="menubar">
                  {menuItems.map((item, index) => (
                    <li key={item.key} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0" role="none" style={{ animation: `fadeIn 0.4s ease-out ${index * 0.05}s forwards`, opacity: 1 }}>
                      {/* Note: changed animation to just fadeIn to avoid complex keyframes dependency for now */}
                      {item.hasDropdown ? (
                        <div className="py-2">
                          <button
                            onClick={() => toggleDropdown(item.key)}
                            className="w-full text-left flex items-center justify-between py-2 text-2xl font-bold text-gray-900 hover:text-[#8B5CF6] transition-colors"
                            aria-expanded={openDropdowns[item.key]}
                          >
                            <span className="flex items-center gap-3">
                              {item.icon && <item.icon className="h-6 w-6 text-gray-400" />}
                              {item.label}
                            </span>
                            <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${openDropdowns[item.key] ? 'rotate-180 text-[#8B5CF6]' : ''}`} />
                          </button>

                          {/* Mobile Submenu */}
                          <div className={`overflow-hidden transition-all duration-300 ${openDropdowns[item.key] ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            {item.isCardDropdown ? (
                              <div className="grid grid-cols-1 gap-4 pl-0 border-l-2 border-gray-100 ml-3 pl-4">
                                {item.submenu.map((subItem, idx) => (
                                  <Link
                                    key={idx}
                                    to={subItem.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 active:bg-gray-100 transition-colors"
                                  >
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                                      {subItem.icon && <subItem.icon className="w-6 h-6 text-[#8B5CF6]" />}
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg text-gray-900">{subItem.label}</p>
                                      <p className="text-sm text-gray-500 line-clamp-1">{subItem.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <ul className="pl-6 space-y-4 border-l-2 border-gray-100 ml-3">
                                {item.submenu.map((subItem, idx) => (
                                  <li key={idx}>
                                    <Link
                                      to={subItem.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="block py-1 text-lg text-gray-600 font-medium hover:text-[#8B5CF6]"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full text-left flex items-center gap-3 py-2 text-2xl font-bold text-gray-900 hover:text-[#8B5CF6] transition-colors"
                        >
                          {item.icon && <item.icon className="h-6 w-6 text-gray-400" />}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-12 space-y-4">
                  <Link
                    to="/contato"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-center py-4 bg-[#8B5CF6] text-white rounded-xl font-bold text-lg shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                  >
                    Fale com Consultor
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </nav>

      <div className={`language-selector-minimalist dropdown-container ${openLanguageMenu ? 'active' : ''}`} style={{ display: isMenuOpen ? 'none' : 'flex' }}>
        <button
          onClick={() => setOpenLanguageMenu(!openLanguageMenu)}
          className="globe-button"
          aria-label="Selecionar idioma"
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
        </button>
        <div className="divider-line" aria-hidden="true" />
        {openLanguageMenu && (
          <ul className="glass-dropdown absolute top-full right-0 mt-2 w-44 rounded-xl z-50 py-2" role="menu">
            <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">PT</li>
            <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">EN</li>
            <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">ES</li>
          </ul>
        )}
      </div>
    </>
  );
}

export default PageNavbar;
