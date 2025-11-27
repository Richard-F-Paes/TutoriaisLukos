import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, BookOpen, Brain, Info, Briefcase, Phone, Package, BarChart3, ShoppingCart, Wallet, Truck, Store, Link as LinkIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function PageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openClienteDropdown, setOpenClienteDropdown] = useState(false);
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdowns({});
        setOpenClienteDropdown(false);
        setOpenLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const menuItems = [
    { 
      label: 'Blog', 
      hasDropdown: false, 
      key: 'blog', 
      href: '/blog',
      icon: BookOpen
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
          href: '/sistemas/erp',
          icon: BarChart3,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_sistema_ERP_3_bc9518527d.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_sistema_ERP_290ccde0c6.svg',
          description: 'Organizar e automatizar seu negócio'
        },
        { 
          label: 'Hub de Integração', 
          href: '/sistemas/integracao',
          icon: LinkIcon,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_hubdeintegracao_3_5ed34c0eab.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_hubintegracao_9476475530.svg',
          description: 'Conectar canais e vender sem limites'
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
          label: 'Conta Digital', 
          href: '/sistemas/conta-digital',
          icon: Wallet,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_contadigital_3_d89e2f5be3.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_contadigital_944c930267.svg',
          description: 'Receber, pagar e movimentar'
        },
        { 
          label: 'Envios', 
          href: '/sistemas/envios',
          icon: Truck,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_envios_3_eb2be13c58.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_envios_3c51f2fdbd.svg',
          description: 'Economizar em fretes e acelerar entregas'
        },
        { 
          label: 'Ecommerce', 
          href: '/sistemas/ecommerce',
          icon: Store,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_ecommerce_3_fc023b46f5.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_ecommerce_577508512a.svg',
          description: 'Criar um site exclusivo para sua marca'
        },
        { 
          label: 'Loja', 
          href: '/sistemas/loja',
          icon: Store,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_loja_3_png_5f76f66412.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_loja_43c1ec5482.svg',
          description: 'Ranquear seus produtos nos marketplaces'
        },
        { 
          label: 'Agentes de IA', 
          href: '/sistemas/agentes-ia',
          icon: Brain,
          image: 'https://d3hw41hpah8tvx.cloudfront.net/images/bg_menuprodutos_agentes_IA_cfcfde18db.png',
          iconImage: 'https://d3hw41hpah8tvx.cloudfront.net/images/icon_menuprodutos_agentes_IA_2565782604.svg',
          description: 'Comandar seu ERP com inteligência artificial'
        },
      ]
    },
    { 
      label: 'Sobre nós', 
      hasDropdown: false, 
      key: 'sobre', 
      href: '/sobre',
      icon: Info
    },
    { 
      label: 'Serviços', 
      hasDropdown: true, 
      key: 'servicos',
      icon: Briefcase,
      submenu: [
        { label: 'ERP', href: '/sistemas/erp' },
        { label: 'PDV', href: '/sistemas/pdv' },
        { label: 'Analytics', href: '/sistemas/analytics' },
        { label: 'Inteligência Artificial', href: '/ia' },
      ]
    },
  ];

  return (
    <>
      <style>{`
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
          transition: transform 0.3s ease-in-out;
          width: 151px;
        }
        
        .product-card:hover {
          transform: scale(1.013);
        }
        
        @media screen and (min-width: 1081px) and (max-width: 1239px) {
          .product-card {
            width: 124px;
          }
        }
        
        @media (min-width: 1240px) and (max-width: 1359px) {
          .product-card {
            width: 138px;
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
      `}</style>
    <nav className="absolute top-0 left-0 right-0 z-50 w-full mt-12 flex items-center justify-center space-x-1 h-[60px]" style={{backgroundColor: 'transparent'}}>
      <div className="container mx-auto" style={{backgroundColor: 'transparent'}}>
        <div className="row flex items-center justify-center py-4" style={{backgroundColor: 'transparent'}}>
        {/* Logo - col-lg-2 col-1 */}
        <div className="flex-shrink-0">
          <a className="brand inline-block" href="/">
            <img 
              width="110" 
              height="32" 
              className=" h-[60px] w-[80px]" 
              src="logo.png"
              alt="LUKOS"
            />
          </a>
        </div>

        {/* Menu Desktop - col-lg-6 */}
        <div className="hidden lg:flex px-0 justify-center">
          <nav className="nav-primary">
            <ul className="nav flex items-center justify-center space-x-1 h-[60px]">
              {menuItems.map((item) => {
                if (item.hasDropdown) {
                  const Icon = item.icon;
                  return (
                    <li key={item.key} className="menu-item relative dropdown-container">
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        className="flex items-center gap-1 px-3 py-2 text-xl font-medium text-white hover:text-[#00D4FF] transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdowns[item.key] ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openDropdowns[item.key] && item.hasDropdown && (
                        <>
                          {item.isCardDropdown ? (
                            <div className="sub-menu absolute top-full mt-4 bg-white rounded-2xl shadow-2xl z-50 p-6 border border-gray-200" style={{ left: '70%', transform: 'translateX(-50%)', width: '100%', minWidth: '2000px' }}>
                              <div className="flex flex-wrap gap-4 justify-center items-center mx-auto">
                                {item.submenu.map((subItem, index) => {
                                  const SubIcon = subItem.icon || Package;
                                  return (
                                    <div
                                      key={index}
                                      id={`submenu-produtos-${index}`}
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
                                      <figure className="relative" style={{ width: '100%', height: '200px', margin: 0, marginBottom: '8px' }}>
                                        <img 
                                          alt={`Produto de destaque ${subItem.label} `}
                                          loading="lazy"
                                          width={index === 6 ? 166 : 165}
                                          height="280"
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
                            <ul className="sub-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-200">
                              {item.submenu.map((subItem, index) => (
                            <li key={index} className="menu-item">
                              {subItem.hasSubmenu ? (
                                <div className="relative">
                                  <button
                                    onClick={() => toggleDropdown(`${item.key}-${index}`)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#a44dff] transition-colors"
                                  >
                                    {subItem.label}
                                    <ChevronDown className={`ml-1 h-3 w-3 inline transition-transform ${openDropdowns[`${item.key}-${index}`] ? 'rotate-180' : ''}`} />
                                  </button>
                                  {openDropdowns[`${item.key}-${index}`] && (
                                    <ul className="sub-menu absolute left-full top-0 ml-2 w-56 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-200">
                                      {subItem.submenu.map((subSubItem, subIndex) => (
                                        <li key={subIndex}>
                                          <a
                                            href={subSubItem.href}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#a44dff] transition-colors"
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
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#a44dff] transition-colors"
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
                    <li key={item.key} className="menu-item relative">
                      <a 
                        href={item.href}
                        className={`flex items-center gap-1 px-3 py-2 text-xl font-medium transition-colors ${
                          active 
                            ? 'text-[#00D4FF]' 
                            : 'text-white hover:text-[#00D4FF]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                      {active && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-[#00D4FF] rounded-full"></span>
                      )}
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>

        {/* Botões Direita - col-lg-4 */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Botão Contato */}
          <div className="btn-group dropdown dropdown-container">
            <a href="/contato">
              <button
                className="btn btn-xs btn-blue px-4 py-2 bg-[#00D4FF] text-white text-base font-medium rounded hover:bg-[#00B8E6] transition-colors flex items-center gap-2"
                type="button"
              >
                <Phone className="h-4 w-4" />
                Contato
              </button>
            </a>
          </div>


          {/* Seletor de Idioma */}
          <div className="btn-group dropdown dropdown-container relative">
           

            {openLanguageMenu && (
              <ul className="langs-drop absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-200">
                <li>
                  <a
                    href="https://es.totvs.com/"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <figure className="m-0 mr-2">
                      <img
                        src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-es_9fac6f20.jpg.webp"
                        alt="Linguagem ES-ES"
                        className="w-6 h-4 object-cover rounded"
                      />
                    </figure>
                    <span className="text">ES</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.totvs.com/"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <figure className="m-0 mr-2">
                      <img
                        src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-en_19a7eea0.png.webp"
                        alt="Linguagem EN-EN"
                        className="w-6 h-4 object-cover rounded"
                      />
                    </figure>
                    <span className="text">EN</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="col-2 md:hidden text-right flex-shrink-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-toggler hamburger flex flex-col justify-center items-center w-8 h-8 space-y-1"
            type="button"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="nav-primary-mobile lg:hidden bg-white rounded-lg shadow-xl mt-4 p-4">
          <nav className="menu-principal-container">
            <ul className="nav nav-mobile space-y-2">
              {menuItems.map((item) => (
                <li key={item.key} className="menu-item">
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className="w-full text-left flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#a44dff] transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[item.key] ? 'rotate-180' : ''}`} />
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
                        <ul className="sub-menu pl-4 space-y-1 mt-1">
                          {item.submenu.map((subItem, index) => (
                            <li key={index} className="menu-item">
                              {subItem.hasSubmenu ? (
                                <div>
                                  <button
                                    onClick={() => toggleDropdown(`${item.key}-${index}`)}
                                    className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:text-[#a44dff] transition-colors"
                                  >
                                    {subItem.label}
                                    <ChevronDown className={`h-3 w-3 transition-transform ${openDropdowns[`${item.key}-${index}`] ? 'rotate-180' : ''}`} />
                                  </button>
                                  {openDropdowns[`${item.key}-${index}`] && (
                                    <ul className="sub-menu pl-4 space-y-1 mt-1">
                                      {subItem.submenu.map((subSubItem, subIndex) => (
                                        <li key={subIndex}>
                                          <a
                                            href={subSubItem.href}
                                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#a44dff] transition-colors"
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
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-[#a44dff] transition-colors"
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

          <div className="menu-info text-center mt-6 space-y-3">
            <button className="btn btn-sm btn-blue w-full px-4 py-2 bg-[#00D4FF] text-white text-sm font-medium rounded hover:bg-[#00B8E6] transition-colors">
              Contato
            </button>

            <div className="btn-group dropdown dropdown-container relative">
              <button
                onClick={() => setOpenClienteDropdown(!openClienteDropdown)}
                className="btn btn-sm btn-white-outline w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Sou cliente
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openClienteDropdown ? 'rotate-180' : ''}`} />
              </button>

              {openClienteDropdown && (
                <div className="dropdown-menu dropdown-menu-secondary absolute top-full left-0 right-0 mt-2 w-full bg-white rounded-lg shadow-xl z-50 py-4 px-4 text-center border border-gray-200">
                  <strong className="block text-gray-900 font-semibold mb-1">Suporte</strong>
                  <span className="text-gray-700">4003-0015</span>
                  <small className="block text-gray-600 mt-2 mb-2">ou acesse</small>
                  <div className="space-y-1">
                    <a href="https://suporte.totvs.com" className="block text-[#a44dff] hover:underline">Central do Cliente</a>
                    <a href="https://espacolegislacao.totvs.com/" className="block text-[#a44dff] hover:underline">Espaço Legislação</a>
                    <a href="https://www.totvs.com/carta-da-reforma-tributaria/" className="block text-[#a44dff] hover:underline">Carta Reforma Tributária</a>
                  </div>
                </div>
              )}
            </div>

            <div className="langs-option langs-mobile flex justify-center space-x-2">
              <a href="/" className="langs-btn-mobile flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
                <figure className="m-0">
                  <img
                    src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-br_00c220c9.jpg.webp"
                    alt="Linguagem PT-BR"
                    className="w-6 h-4 object-cover rounded"
                  />
                </figure>
                <span className="text text-sm text-gray-700">PT</span>
              </a>
              <a href="https://es.totvs.com/" className="langs-btn-mobile flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
                <figure className="m-0">
                  <img
                    src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-es_9fac6f20.jpg.webp"
                    alt="Linguagem ES-ES"
                    className="w-6 h-4 object-cover rounded"
                  />
                </figure>
                <span className="text text-sm text-gray-700">ES</span>
              </a>
              <a href="https://en.totvs.com/" className="langs-btn-mobile flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
                <figure className="m-0">
                  <img
                    src="https://www.totvs.com/wp-content/webp-express/webp-images/themes/totvs-theme/dist/images/totvs-menu-bandeira-en_19a7eea0.png.webp"
                    alt="Linguagem EN-EN"
                    className="w-6 h-4 object-cover rounded"
                  />
                </figure>
                <span className="text text-sm text-gray-700">EN</span>
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </nav>
    </>
  );
}

export default PageNavbar;
