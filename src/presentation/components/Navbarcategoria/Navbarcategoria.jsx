// HeadlessUI removido - usando implementação customizada com hover e click fix
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { useEditorModal } from '../../../contexts/EditorModalContext';
import { useQuery } from '@tanstack/react-query';
import { headerMenuService } from '../../../services/headerMenuService';
import AdminPasswordModal from '../ui/AdminPasswordModal/AdminPasswordModal';
import './Navbarcategoria.css';

// Component que renderiza conteúdo do menu via portal
const PortalMenuContent = ({ buttonRef, children, className, isOpen, align = 'left' }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [transform, setTransform] = useState(undefined);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;
    
    const updatePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 4; // 4px gap
      if (align === 'right') {
        setPosition({
          top,
          left: rect.right + window.scrollX,
        });
        setTransform('translateX(-100%)');
      } else {
        setPosition({
          top,
          left: rect.left + window.scrollX,
        });
        setTransform(undefined);
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, buttonRef]);

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
      className={`${className} ${!isOpen ? 'dropdown-exit' : ''}`}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform,
        zIndex: 1001,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default function Navbarcateria() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { openModal } = useTutorialModal();
  const { openEditorModal } = useEditorModal();
  
  const [openMenus, setOpenMenus] = useState({});
  const [fixedMenus, setFixedMenus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const timeoutsRef = useRef({});
  const userDropdownRef = useRef(null);
  const userMenuButtonRef = useRef(null);
  
  // #region agent log
  const __agentLog = (payload) => {
    try {
      fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
    } catch (_) {}
  };
  // #endregion

  useEffect(() => {
    // #region agent log
    __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H5',location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:showUserMenu:effect',message:'Navbarcategoria showUserMenu state changed',data:{showUserMenu,isAuthenticated,hasUser:!!user,userNameLen:(user?.name||'').length},timestamp:Date.now()});
    // #endregion
  }, [showUserMenu, isAuthenticated, user]);

  // Inspeção do DOM para diagnosticar dropdown invisível (sem dados sensíveis)
  useEffect(() => {
    if (!showUserMenu) return;
    // Usar 2 RAFs para garantir que o Portal montou no DOM
    const raf1 = requestAnimationFrame(() => {});
    const raf2 = requestAnimationFrame(() => {
      const portalRoot = document.querySelector('.category-user-dropdown-portal');
      const dropdownEl = portalRoot || userDropdownRef.current;
      const buttonEl = userMenuButtonRef.current;

      const rect = dropdownEl?.getBoundingClientRect?.();
      const btnRect = buttonEl?.getBoundingClientRect?.();
      const cs = dropdownEl ? window.getComputedStyle(dropdownEl) : null;

      const centerX = rect ? rect.left + rect.width / 2 : null;
      const centerY = rect ? rect.top + Math.min(rect.height / 2, 10) : null; // pega ponto perto do topo do dropdown
      const topEl = (centerX != null && centerY != null) ? document.elementFromPoint(centerX, centerY) : null;
      const topElIsInside = topEl && dropdownEl ? dropdownEl.contains(topEl) : null;

      // #region agent log
      __agentLog({
        sessionId:'debug-session',
        runId:'post-fix',
        hypothesisId:'H6',
        location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:userDropdown:domProbe',
        message:'Navbarcategoria user dropdown DOM probe',
        data:{
          portalRootExists:!!portalRoot,
          dropdownExists:!!dropdownEl,
          buttonExists:!!buttonEl,
          rect:rect?{x:Math.round(rect.x),y:Math.round(rect.y),w:Math.round(rect.width),h:Math.round(rect.height)}:null,
          buttonRect:btnRect?{x:Math.round(btnRect.x),y:Math.round(btnRect.y),w:Math.round(btnRect.width),h:Math.round(btnRect.height)}:null,
          computed:cs?{display:cs.display,visibility:cs.visibility,opacity:cs.opacity,position:cs.position,zIndex:cs.zIndex}:null,
          viewport:{w:window.innerWidth,h:window.innerHeight},
          overlap:{probeX:centerX!=null?Math.round(centerX):null,probeY:centerY!=null?Math.round(centerY):null,topTag:topEl?.tagName||null,topClass:topEl?.className?String(topEl.className).slice(0,120):null,topElIsInside},
        },
        timestamp:Date.now()
      });
      // #endregion
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [showUserMenu]);

  // Carregar menus do banco de dados
  const { data: headerMenusData } = useQuery({
    queryKey: ['headerMenus'],
    queryFn: () => headerMenuService.list(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const menuButtonClasses = 'category-dropdown-button';
  const menuItemClasses = (active, path) =>
    `category-dropdown-item ${active ? 'active' : ''} ${
      location.pathname === path ? 'active' : ''
    }`;

  // Criar refs para cada botão de menu
  const menuRefs = useRef({});

  // Função para limpar todos os timeouts
  const clearAllTimeouts = () => {
    Object.values(timeoutsRef.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    timeoutsRef.current = {};
  };

  // Função para fechar todos os menus instantaneamente
  const closeAllMenus = () => {
    clearAllTimeouts();
    setOpenMenus({});
  };

  // Funções para controlar hover e click
  const handleMouseEnter = (menuLabel) => {
    // Limpar todos os timeouts e fechar outros menus instantaneamente
    clearAllTimeouts();
    
    // Fechar todos os outros menus instantaneamente
    setOpenMenus(prev => {
      const newState = {};
      Object.keys(prev).forEach(key => {
        if (key !== menuLabel) {
          newState[key] = false;
        }
      });
      return newState;
    });
    
    if (!fixedMenus[menuLabel]) {
      setOpenMenus(prev => ({ ...prev, [menuLabel]: true }));
    }
  };

  const handleMouseLeave = (menuLabel) => {
    if (!fixedMenus[menuLabel]) {
      // Limpar timeout anterior se existir
      if (timeoutsRef.current[menuLabel]) {
        clearTimeout(timeoutsRef.current[menuLabel]);
      }
      
      // Criar novo timeout de 150ms (melhor UX)
      timeoutsRef.current[menuLabel] = setTimeout(() => {
        setOpenMenus(prev => ({ ...prev, [menuLabel]: false }));
        delete timeoutsRef.current[menuLabel];
      }, 150);
    }
  };

  const handleClick = (menuLabel) => {
    // Limpar todos os timeouts e fechar outros menus instantaneamente
    clearAllTimeouts();
    
    // Remover estado "fixo" de todos os menus anteriores
    // e marcar apenas o menu clicado como "fixo"
    setFixedMenus({ [menuLabel]: true });
    
    // Fechar todos os outros menus e abrir o menu clicado
    setOpenMenus(prev => {
      const newState = {};
      // Fechar todos os outros menus
      Object.keys(prev).forEach(key => {
        if (key !== menuLabel) {
          newState[key] = false;
        }
      });
      // Sempre abrir o menu clicado (sem toggle)
      newState[menuLabel] = true;
      return newState;
    });
  };

  const handleClickOutside = () => {
    clearAllTimeouts();
    setFixedMenus({});
    setOpenMenus({});
  };

  // Efeito de rolagem
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lida com busca
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleOpenEditor = () => {
    setShowUserMenu(false);
    openEditorModal('tutorials');
  };

  // Fecha menu do usuário se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const insideUserMenu = !!target?.closest?.('.user-menu');
      const willCloseUserMenu = !!showUserMenu && !insideUserMenu;
      // #region agent log
      __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H5',location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:clickOutside:userMenu',message:'Navbarcategoria document click (user menu close check)',data:{targetTag:target?.tagName||null,showUserMenu,insideUserMenu,willCloseUserMenu},timestamp:Date.now()});
      // #endregion
      if (willCloseUserMenu) setShowUserMenu(false);
      if (menuOpen && !event.target.closest('.category-mobile-menu') && !event.target.closest('.category-mobile-menu-button')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu, menuOpen]);

  // Adicionar listener para cliques fora e cleanup
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const isInsideMenu = e.target.closest('.category-dropdown');
      const isInsideUserMenu = e.target.closest('.user-menu');
      const isInsidePortalMenu = e.target.closest('.category-dropdown-menu');
      // #region agent log
      __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1',location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:handleDocumentClick',message:'Navbarcategoria doc click - outside detection',data:{targetTag:e.target?.tagName||null,isInsideMenu:!!isInsideMenu,isInsidePortalMenu:!!isInsidePortalMenu,isInsideUserMenu:!!isInsideUserMenu,willClose:(!isInsideMenu && !isInsideUserMenu && !isInsidePortalMenu)},timestamp:Date.now()});
      // #endregion
      if (!isInsideMenu && !isInsideUserMenu && !isInsidePortalMenu) {
        handleClickOutside();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClickOutside();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup: limpar timeouts quando componente for desmontado
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
      clearAllTimeouts();
    };
  }, []);

  // Menus padrão (fallback se não houver no banco)
  const defaultMenus = [
    {
      label: 'PDV',
      items: [
        { label: 'PDV Pista', tutorialSlug: null },
        { label: 'PDV Loja', tutorialSlug: null },
      ],
    },
    {
      label: 'Retaguarda',
      items: [
        { label: 'Cadastros', tutorialSlug: null },
        { label: 'Produtos', tutorialSlug: null },
      ],
    },
    {
      label: 'Aplicativos',
      items: [
        { label: 'Pré-venda', tutorialSlug: null },
        { label: 'Inventário', tutorialSlug: null },
        { label: 'Instalar Lukos Pay', tutorialSlug: null },
        { label: 'Venda de Combustível', tutorialSlug: null },
        { label: 'Venda de Produto', tutorialSlug: null },
      ],
    },
    {
      label: 'Web',
      items: [
        { label: 'Dashboard', tutorialSlug: null },
        { label: 'Fatura Web', tutorialSlug: null },
      ],
    },
  ];

  // Usar menus do banco ou menus padrão
  const menus = headerMenusData?.data?.length > 0 
    ? headerMenusData.data.map(menu => ({
        label: menu.Label || menu.label,
        items: (menu.Items || menu.items || []).map(item => ({
          label: item.Label || item.label,
          tutorialSlug: item.TutorialSlug || item.tutorialSlug || null,
        })),
      }))
    : defaultMenus;

  // Handler para clicar em item do menu
  const handleMenuItemClick = (item, e) => {
    e.preventDefault();
    clearAllTimeouts();
    setOpenMenus(prev => ({ ...prev, [item.parentLabel]: false }));
    setFixedMenus(prev => ({ ...prev, [item.parentLabel]: false }));
    
    // Se tiver tutorialSlug, abrir modal, senão não fazer nada (não deve navegar)
    if (item.tutorialSlug) {
      openModal(item.tutorialSlug);
    }
  };

  return (
    <header className={`category-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="category-navbar-inner">
        {/* Logo */}
        <Link to="/" className="category-navbar-logo">
          <img
            src="/icons/Logo4kIcon.png"
            alt="Logo Lukos Tecnologia"
            className="category-logo-image"
          />
          <span className="category-logo-text">
            <span className="category-logo-line">Lukos</span>
            <span className="category-logo-line">Tecnologia</span>
          </span>
        </Link>

        {/* Menu Desktop */}
        <nav className="category-navbar-menu" role="navigation" aria-label="Menu de categorias">
          {/* Botão Início */}
          <Link
            to="/tutoriais"
            className={`category-nav-link ${location.pathname === '/tutoriais' ? 'active' : ''}`}
            role="menuitem"
            aria-current={location.pathname === '/tutoriais' ? 'page' : undefined}
          >
            Início
          </Link>

          {/* Botão Treinamentos */}
          <Link
            to="/tutoriais/treinamentos"
            className={`category-nav-link ${location.pathname === '/tutoriais/treinamentos' ? 'active' : ''}`}
            role="menuitem"
            aria-current={location.pathname === '/tutoriais/treinamentos' ? 'page' : undefined}
          >
            Treinamentos
          </Link>

          {/* Dropdowns */}
          {menus.map((menu) => {
            const isOpen = openMenus[menu.label] || false;
            const isFixed = fixedMenus[menu.label] || false;
            
            return (
              <div 
                key={menu.label}
                className="category-dropdown"
                onMouseEnter={() => handleMouseEnter(menu.label)}
                onMouseLeave={() => handleMouseLeave(menu.label)}
              >
                <button
                  ref={(el) => {
                    if (el) {
                      menuRefs.current[menu.label] = el;
                    }
                  }}
                  className={menuButtonClasses}
                  onClick={() => handleClick(menu.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClick(menu.label);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-label={`Menu ${menu.label}`}
                  aria-controls={`menu-${menu.label}`}
                >
                  {menu.label}
                  <ChevronDownIcon 
                    aria-hidden="true" 
                    className={`category-dropdown-icon ${isOpen ? 'rotated' : ''}`}
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </button>

                <PortalMenuContent 
                  buttonRef={{ current: menuRefs.current[menu.label] }}
                  className="category-dropdown-menu"
                  isOpen={isOpen}
                >
                  <div className="py-1" role="menu" id={`menu-${menu.label}`} aria-label={`Submenu ${menu.label}`}>
                    {menu.items.map((item) => (
                      item.tutorialSlug ? (
                        <button
                          key={item.label}
                          onClick={(e) => handleMenuItemClick({ ...item, parentLabel: menu.label }, e)}
                          className={menuItemClasses(false, '')}
                          role="menuitem"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleMenuItemClick({ ...item, parentLabel: menu.label }, e);
                            }
                          }}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <span
                          key={item.label}
                          className={menuItemClasses(false, '')}
                          style={{ opacity: 0.5, cursor: 'not-allowed' }}
                          title="Tutorial não configurado"
                        >
                          {item.label}
                        </span>
                      )
                    ))}
                  </div>
                </PortalMenuContent>
              </div>
            );
          })}
        </nav>

        {/* Ações da direita */}
        <div className="category-navbar-actions">
          {/* Campo de busca */}
          <form onSubmit={handleSearch} className="category-search-form">
            <i className="fas fa-search category-search-icon"></i>
            <input
              type="text"
              placeholder="Buscar..."
              className="category-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Autenticação / Usuário */}
          {isAuthenticated ? (
            <div className="relative user-menu">
              <button
                ref={userMenuButtonRef}
                onClick={() => {
                  // #region agent log
                  __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H5',location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:userMenuButton:onClick',message:'Navbarcategoria user menu button clicked',data:{prevShowUserMenu:showUserMenu,isAuthenticated,hasUser:!!user,target:'click'},timestamp:Date.now()});
                  // #endregion
                  setShowUserMenu(prev => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // #region agent log
                    __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H5',location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:userMenuButton:onKeyDown',message:'Navbarcategoria user menu button keydown toggle',data:{key:e.key,prevShowUserMenu:showUserMenu,isAuthenticated,hasUser:!!user},timestamp:Date.now()});
                    // #endregion
                    setShowUserMenu(prev => !prev);
                  }
                }}
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                aria-label="Menu do usuário"
                className="category-user-button"
              >
                <i className="fas fa-user" aria-hidden="true"></i>
                <span className="category-user-name">{user?.name}</span>
                <i
                  className={`fas fa-chevron-down category-chevron ${
                    showUserMenu ? 'rotated' : ''
                  }`}
                  aria-hidden="true"
                ></i>
              </button>

              {showUserMenu && (
                <PortalMenuContent
                  buttonRef={{ current: userMenuButtonRef.current }}
                  className="category-user-dropdown-portal"
                  isOpen={showUserMenu}
                  align="right"
                >
                  <div ref={userDropdownRef} role="menu" aria-label="Menu do usuário">
                    <button
                      onClick={handleOpenEditor}
                      className="category-user-action"
                      role="menuitem"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenEditor();
                        }
                      }}
                    >
                      Editar
                    </button>

                    <button
                      onClick={handleLogout}
                      className="category-user-action logout"
                      role="menuitem"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleLogout();
                        }
                      }}
                    >
                      Sair
                    </button>
                  </div>
                </PortalMenuContent>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                // #region agent log
                __agentLog({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2',location:'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:openLoginModal',message:'Open AdminPasswordModal',data:{wasOpen:showAdminModal,isAuthenticated,menuOpen,showUserMenu},timestamp:Date.now()});
                // #endregion
                setShowAdminModal(true);
              }}
              className="category-login-button"
              title="Acesso Administrativo"
              aria-label="Acesso Administrativo"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="category-login-shield"
              >
                {/* Escudo */}
                <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"/>
                {/* Engrenagem minimalista dentro do escudo */}
                <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.4"/>
                <path d="M12 8.5v3M9.5 10h5" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
              </svg>
            </button>
          )}

          {/* Menu mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-category-menu"
            aria-label={menuOpen ? 'Fechar menu mobile' : 'Abrir menu mobile'}
            className="category-mobile-menu-button"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div id="mobile-category-menu" className="category-mobile-menu" role="navigation" aria-label="Menu mobile de categorias">
          <div className="category-mobile-menu-content">
            <Link
              to="/tutoriais"
              className={`category-mobile-link ${location.pathname === '/tutoriais' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
              aria-current={location.pathname === '/tutoriais' ? 'page' : undefined}
            >
              Início
            </Link>
            <Link
              to="/tutoriais/treinamentos"
              className={`category-mobile-link ${location.pathname === '/tutoriais/treinamentos' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
              aria-current={location.pathname === '/tutoriais/treinamentos' ? 'page' : undefined}
            >
              Treinamentos
            </Link>
            {menus.map((menu) => (
              <div key={menu.label} className="category-mobile-dropdown" role="group" aria-label={menu.label}>
                <div className="category-mobile-dropdown-header">{menu.label}</div>
                {menu.items.map((item) => (
                  item.tutorialSlug ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMenuOpen(false);
                        if (item.tutorialSlug) {
                          openModal(item.tutorialSlug);
                        }
                      }}
                      className="category-mobile-link sub"
                      role="menuitem"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span
                      key={item.label}
                      className="category-mobile-link sub"
                      style={{ opacity: 0.5, cursor: 'not-allowed' }}
                      title="Tutorial não configurado"
                    >
                      {item.label}
                    </span>
                  )
                ))}
              </div>
            ))}
            
            {/* Busca mobile */}
            <form onSubmit={handleSearch} className="category-mobile-search">
              <i className="fas fa-search category-mobile-search-icon"></i>
              <input
                type="text"
                placeholder="Buscar..."
                className="category-mobile-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {/* Autenticação mobile */}
            {isAuthenticated ? (
              <div className="category-mobile-user">
                <div className="category-mobile-user-info">
                  <i className="fas fa-user"></i>
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openEditorModal('tutorials');
                  }}
                  className="category-mobile-link"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="category-mobile-link logout"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowAdminModal(true);
                }}
                className="category-mobile-login-button"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de Senha Administrativa */}
      <AdminPasswordModal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)} 
      />
    </header>
  );
}
