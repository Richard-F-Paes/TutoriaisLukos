import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, BookOpen, Brain, Info, Briefcase, Phone, Package, BarChart3, ShoppingCart, Wallet, Truck, Store, Link as LinkIcon, Globe, Home, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function PageNavbar({ transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openClienteDropdown, setOpenClienteDropdown] = useState(false);
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const closeTimeoutRef = useRef({});
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
          label: 'Sistema ERP', 
          href: '/erp',
          icon: BarChart3,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_ERP_3_bc9518527d.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_ERP_290ccde0c6.svg',
          description: 'Organizar e automatizar seu negócio'
        },
        { 
          label: 'Sistema PDV', 
          href: '/sistemas/pdv',
          icon: ShoppingCart,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_PDV_4_075449fb07.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_PDV_4988fe51a6.svg',
          description: 'Vender na loja física com sistema integrado'
        },
        { 
          label: 'Envios', 
          href: '/sistemas/envios',
          icon: Truck,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_envios_3_eb2be13c58.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_envios_3c51f2fdbd.svg',
          description: 'Economizar em fretes e acelerar entregas'
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
          --dropdown-duration: 250ms;
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
          gap: 10px;
          transition: transform 0.3s var(--dropdown-transition);
          width: 280px;
          flex-shrink: 0;
        }
        
        .product-card:hover {
          transform: scale(1.02);
        }
        
        @media screen and (min-width: 1081px) and (max-width: 1239px) {
          .product-card {
            width: 240px;
          }
        }
        
        @media (min-width: 1240px) and (max-width: 1359px) {
          .product-card {
            width: 260px;
          }
        }
        
        @media screen and (max-width: 380px) {
          .product-card {
            width: fit-content;
          }
        }
        
        @media screen and (max-width: 1080px) {
          .product-card {
            -webkit-box-align: center;
            align-items: center;
            flex-direction: row;
            width: 350px;
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

        /* Glassmorphism effect */
        .glass-dropdown {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.3);
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
            transform: translateY(-5px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOutSlideUp {
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

        @media (max-width: 1280px) {
          .sub-menu {
            max-width: calc(100vw - 2rem);
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
                    <li key={item.key} className="menu-item relative dropdown-container" role="none" style={{overflow: 'visible', zIndex: item.isCardDropdown && isOpen ? 100 : 'auto'}}>
                      <button
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
                      
                      {isOpen && item.hasDropdown && (
                        <>
                          {item.isCardDropdown ? (
                            <div 
                              className="sub-menu glass-dropdown absolute top-full mt-4 rounded-2xl z-[100] p-6 dropdown-menu-enter-active"
                              style={{ 
                                left: '50%',
                                transform: 'translateX(-50%)',
                                transformOrigin: 'top center',
                                width: 'auto',
                                minWidth: 'auto',
                                maxWidth: 'calc(100vw - 2rem)',
                                animation: 'fadeInSlideDown 0.25s var(--dropdown-transition)'
                              }}
                              role="menu"
                              aria-label={`Menu ${item.label}`}
                              onMouseEnter={() => handleDropdownMouseEnter(item.key)}
                              onMouseLeave={() => handleDropdownMouseLeave(item.key)}
                            >
                              <div className="flex flex-row gap-4 justify-center items-center mx-auto">
                                {item.submenu.map((subItem, index) => {
                                  const SubIcon = subItem.icon || Package;
                                  return (
                                    <div
                                      key={index}
                                      id={`submenu-produtos-${index}`}
                                      tabIndex={0}
                                      role="menuitem"
                                      aria-label={`Produto ${subItem.label}`}
                                      className="product-card rounded-lg overflow-hidden border border-gray-200 hover:border-[#00D4FF]/50 hover:shadow-lg transition-all duration-300"
                                      onClick={() => window.location.href = subItem.href}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                          window.location.href = subItem.href;
                                        }
                                      }}
                                      onFocus={(e) => {
                                        e.currentTarget.style.outline = '2px solid #00D4FF';
                                        e.currentTarget.style.outlineOffset = '2px';
                                      }}
                                      onBlur={(e) => {
                                        e.currentTarget.style.outline = 'none';
                                      }}
                                    >
                                      <figure className="relative" style={{ width: '100%', height: '120px', margin: 0, marginBottom: '8px' }}>
                                        <img 
                                          alt={`Produto de destaque ${subItem.label} `}
                                          loading="lazy"
                                          width="280"
                                          height="120"
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
                                              width={index === 0 ? 24 : index === 3 ? 25 : index === 7 ? 24 : 25}
                                              height={index === 3 ? 25 : 24}
                                              decoding="async"
                                              data-nimg="1"
                                              className="product-icon"
                                              style={{ color: 'transparent' }}
                                              src={subItem.iconImage}
                                            />
                                          ) : (
                                            <div>
                                              <SubIcon className="w-6 h-6 text-white drop-shadow-2xl" />
                                            </div>
                                          )}
                                          <p className="product-title" style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', textAlign: 'center', margin: 0 }}>
                                            {subItem.label}
                                          </p>
                                        </div>
                                      </figure>
                                      <p className="product-description" style={{ textAlign: 'center' }}>
                                        {subItem.description}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <ul 
                              className="sub-menu glass-dropdown absolute top-full left-0 mt-2 w-64 rounded-xl z-50 py-2 dropdown-menu-enter-active"
                              style={{
                                animation: 'fadeInSlideDown 0.25s var(--dropdown-transition)'
                              }}
                              role="menu"
                              onMouseEnter={() => handleDropdownMouseEnter(item.key)}
                              onMouseLeave={() => handleDropdownMouseLeave(item.key)}
                            >
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
                                        animation: 'fadeInSlideDown 0.25s var(--dropdown-transition)'
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
                className="btn btn-xs btn-blue px-5 py-2.5 bg-[#00D4FF] text-white text-base font-medium rounded-lg hover:bg-[#00B8E6] transition-all duration-200 flex items-center gap-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2"
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
                            {item.submenu.map((subItem, index) => {
                              const SubIcon = subItem.icon || Package;
                              return (
                                <div
                                  key={index}
                                  id={`submenu-produtos-mobile-${index}`}
                                  tabIndex={0}
                                  role="button"
                                  aria-label={`Produto ${subItem.label} `}
                                  className="product-card rounded-lg overflow-hidden border border-gray-200"
                                  onClick={() => window.location.href = subItem.href}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      window.location.href = subItem.href;
                                    }
                                  }}
                                >
                                  <figure className="relative" style={{ width: '100%', height: '150px', margin: 0, marginBottom: '8px' }}>
                                    <img 
                                      alt={`Produto de destaque ${subItem.label} `}
                                      loading="lazy"
                                      width={index === 6 ? 166 : 165}
                                      height="200"
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
                                          width={index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 ? 25 : 24}
                                          height={index === 3 ? 25 : 24}
                                          decoding="async"
                                          data-nimg="1"
                                          className="product-icon"
                                          style={{ color: 'transparent' }}
                                          src={subItem.iconImage}
                                        />
                                      ) : (
                                        <div>
                                          <SubIcon className="w-5 h-5 text-white drop-shadow-2xl" />
                                        </div>
                                      )}
                                      <p className="product-title" style={{ color: 'white', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', margin: 0 }}>
                                        {subItem.label}
                                      </p>
                                    </div>
                                  </figure>
                                  <p className="product-description" style={{ textAlign: 'center' }}>
                                    {subItem.description}
                                  </p>
                                </div>
                              );
                            })}
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
                className="btn btn-sm btn-blue w-full px-5 py-3 bg-[#00D4FF] text-white text-sm font-medium rounded-lg hover:bg-[#00B8E6] transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2"
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
                    animation: 'fadeInSlideDown 0.25s var(--dropdown-transition)'
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
            animation: 'fadeInSlideDown 0.25s var(--dropdown-transition)',
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
