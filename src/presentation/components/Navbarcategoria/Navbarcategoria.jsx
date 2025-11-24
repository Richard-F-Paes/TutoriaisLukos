// HeadlessUI removido - usando implementação customizada com hover e click fix
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
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
  
  const [openMenus, setOpenMenus] = useState({});
  const [fixedMenus, setFixedMenus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
      
      // Criar novo timeout de 1 segundo
      timeoutsRef.current[menuLabel] = setTimeout(() => {
        setOpenMenus(prev => ({ ...prev, [menuLabel]: false }));
        delete timeoutsRef.current[menuLabel];
      }, 1000);
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

    document.addEventListener('click', handleDocumentClick);
    
    // Cleanup: limpar timeouts quando componente for desmontado
    return () => {
      document.removeEventListener('click', handleDocumentClick);
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
      label: 'Mobile',
      items: [
        { label: 'Pré-venda', to: '/Prevenda' },
        { label: 'Inventário', to: '/Inventario' },
      ],
    },
    {
      label: 'POS',
      items: [
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
            alt="Logo Tutorial Lukos"
            className="category-logo-image"
          />
          <span className="category-logo-text">Tutorial Lukos</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="category-navbar-menu">
          {/* Botão Início */}
          <Link
            to="/"
            className={`category-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Início
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
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                >
                  {menu.label}
                  <ChevronDownIcon aria-hidden="true" className="category-dropdown-icon" />
                </button>

                <PortalMenuContent 
                  buttonRef={{ current: menuRefs.current[menu.label] }}
                  className="category-dropdown-menu"
                  isOpen={isOpen}
                >
                  <div className="py-1">
                    {menu.items.map((item) => (
                      <Link 
                        key={item.to} 
                        to={item.to} 
                        className={menuItemClasses(false, item.to)}
                        onClick={() => {
                          // Fechar menu ao clicar em um item
                          clearAllTimeouts();
                          setOpenMenus(prev => ({ ...prev, [menu.label]: false }));
                          setFixedMenus(prev => ({ ...prev, [menu.label]: false }));
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

          {/* Links Adicionais */}
          <Link
            to="/tutoriais"
            className={`category-nav-link ${location.pathname === '/tutoriais' ? 'active' : ''}`}
          >
            Tutoriais
          </Link>
          <Link
            to="/categorias"
            className={`category-nav-link ${location.pathname === '/categorias' ? 'active' : ''}`}
          >
            Categorias
          </Link>
          <Link
            to="/sobre"
            className={`category-nav-link ${location.pathname === '/sobre' ? 'active' : ''}`}
          >
            Sobre
          </Link>
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
          <button className="category-theme-button" aria-label="Alternar tema">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Autenticação / Usuário */}
          {isAuthenticated ? (
            <div className="relative user-menu">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="category-user-button"
              >
                <i className="fas fa-user"></i>
                <span className="category-user-name">{user?.name}</span>
                <i
                  className={`fas fa-chevron-down category-chevron ${
                    showUserMenu ? 'rotated' : ''
                  }`}
                ></i>
              </button>

              {showUserMenu && (
                <div className="category-user-dropdown">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="category-user-action"
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
                    >
                      Editor Visual
                    </Link>
                  )}

                  {(user?.role === 'admin' || user?.role === 'super_admin') && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="category-user-action"
                    >
                      Administração
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="category-user-action logout"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="category-login-button"
            >
              Entrar
            </Link>
          )}

          {/* Menu mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="category-mobile-menu-button"
            aria-label="Menu mobile"
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
        <div className="category-mobile-menu">
          <div className="category-mobile-menu-content">
            <Link
              to="/"
              className={`category-mobile-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Início
            </Link>
            {menus.map((menu) => (
              <div key={menu.label} className="category-mobile-dropdown">
                <div className="category-mobile-dropdown-header">{menu.label}</div>
                {menu.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="category-mobile-link sub"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              to="/tutoriais"
              className={`category-mobile-link ${location.pathname === '/tutoriais' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Tutoriais
            </Link>
            <Link
              to="/categorias"
              className={`category-mobile-link ${location.pathname === '/categorias' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Categorias
            </Link>
            <Link
              to="/sobre"
              className={`category-mobile-link ${location.pathname === '/sobre' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>
            
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
              <Link
                to="/login"
                className="category-mobile-login-button"
                onClick={() => setMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
