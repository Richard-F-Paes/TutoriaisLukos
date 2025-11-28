// HeadlessUI removido - usando implementação customizada com hover e click fix
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import AdminPasswordModal from '../ui/AdminPasswordModal/AdminPasswordModal';
import './Navbarcategoria.css';

// Component que renderiza conteúdo do menu via portal
const PortalMenuContent = ({ buttonRef, children, className, isOpen }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;
    
    const updatePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4, // 4px gap
        left: rect.left + window.scrollX,
      });
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
  const { theme, toggleTheme } = useTheme();
  
  const [openMenus, setOpenMenus] = useState({});
  const [fixedMenus, setFixedMenus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const timeoutsRef = useRef({});

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
    
    setFixedMenus(prev => ({ ...prev, [menuLabel]: !prev[menuLabel] }));
    setOpenMenus(prev => ({ ...prev, [menuLabel]: !prev[menuLabel] }));
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

  // Fecha menu do usuário se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
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
      if (!isInsideMenu && !isInsideUserMenu) {
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

  const menus = [
    {
      label: 'PDV',
      items: [
        { label: 'PDV Pista', to: '/PDV' },
        { label: 'PDV Loja', to: '/PDVLoja' },
      ],
    },
    {
      label: 'Retaguarda',
      items: [
        { label: 'Cadastros', to: '/Retaguarda/Cadastros' },
        { label: 'Produtos', to: '/Retaguarda/Produtos' },
      ],
    },
    {
      label: 'Aplicativos',
      items: [
        { label: 'Pré-venda', to: '/Prevenda' },
        { label: 'Inventário', to: '/Inventario' },
        { label: 'Instalar Lukos Pay', to: '/POS/Instalar' },
        { label: 'Venda de Combustível', to: '/POS/VendaCombustivel' },
        { label: 'Venda de Produto', to: '/POS/VendaProduto' },
      ],
    },
    {
      label: 'Web',
      items: [
        { label: 'Dashboard', to: '/Dashboard' },
        { label: 'Fatura Web', to: '/FaturaWeb' },
      ],
    },
  ];

  return (
    <header className={`category-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="category-navbar-inner">
        {/* Logo */}
        <Link to="/" className="category-navbar-logo">
          <img
            src="logo.png"
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
                      <Link 
                        key={item.to} 
                        to={item.to} 
                        className={menuItemClasses(false, item.to)}
                        role="menuitem"
                        aria-current={location.pathname === item.to ? 'page' : undefined}
                        onClick={() => {
                          // Fechar menu ao clicar em um item
                          clearAllTimeouts();
                          setOpenMenus(prev => ({ ...prev, [menu.label]: false }));
                          setFixedMenus(prev => ({ ...prev, [menu.label]: false }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            // Fechar menu ao selecionar um item
                            clearAllTimeouts();
                            setOpenMenus(prev => ({ ...prev, [menu.label]: false }));
                            setFixedMenus(prev => ({ ...prev, [menu.label]: false }));
                          }
                        }}
                      >
                        {item.label}
                      </Link>
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

          {/* Botão de tema */}
          <button 
            className="category-theme-button" 
            aria-label="Alternar tema"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTheme();
            }}
            title={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Autenticação / Usuário */}
          {isAuthenticated ? (
            <div className="relative user-menu">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowUserMenu(!showUserMenu);
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
                <div className="category-user-dropdown" role="menu" aria-label="Menu do usuário">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="category-user-action"
                    role="menuitem"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setShowUserMenu(false);
                      }
                    }}
                  >
                    Meu Perfil
                  </Link>

                  {(user?.role === 'admin' ||
                    user?.role === 'super_admin' ||
                    user?.role === 'editor') && (
                    <Link
                      to="/editor"
                      onClick={() => setShowUserMenu(false)}
                      className="category-user-action"
                      role="menuitem"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShowUserMenu(false);
                        }
                      }}
                    >
                      Editor Visual
                    </Link>
                  )}

                  {(user?.role === 'admin' || user?.role === 'super_admin') && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="category-user-action"
                      role="menuitem"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShowUserMenu(false);
                        }
                      }}
                    >
                      Administração
                    </Link>
                  )}

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
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAdminModal(true)}
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
                  <Link
                    key={item.to}
                    to={item.to}
                    className="category-mobile-link sub"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                    aria-current={location.pathname === item.to ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
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
                <Link
                  to="/profile"
                  className="category-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                {(user?.role === 'admin' ||
                  user?.role === 'super_admin' ||
                  user?.role === 'editor') && (
                  <Link
                    to="/editor"
                    className="category-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Editor Visual
                  </Link>
                )}
                {(user?.role === 'admin' || user?.role === 'super_admin') && (
                  <Link
                    to="/admin"
                    className="category-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Administração
                  </Link>
                )}
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
