// HeadlessUI removido - usando implementação customizada com hover e click fix
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';
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
  const [openMenus, setOpenMenus] = useState({});
  const [fixedMenus, setFixedMenus] = useState({});
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

  // Adicionar listener para cliques fora e cleanup
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const isInsideMenu = e.target.closest('.category-dropdown');
      if (!isInsideMenu) {
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
    <div className="category-navbar">
      <div className="category-navbar-inner">
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
      </div>
    </div>
  );
}
