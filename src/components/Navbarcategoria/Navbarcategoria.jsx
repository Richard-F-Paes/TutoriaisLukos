import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
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

  const menuButtonClasses = 'category-dropdown-button';
  const menuItemClasses = (active, path) =>
    `category-dropdown-item ${active ? 'active' : ''} ${
      location.pathname === path ? 'active' : ''
    }`;

  // Criar refs para cada botão de menu
  const menuRefs = useRef({});

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
        {menus.map((menu) => (
          <Menu as="div" className="category-dropdown" key={menu.label}>
            {({ open }) => (
              <>
                <MenuButton 
                  ref={(el) => {
                    if (el) {
                      menuRefs.current[menu.label] = el;
                    }
                  }}
                  className={menuButtonClasses}
                >
                  {menu.label}
                  <ChevronDownIcon aria-hidden="true" className="category-dropdown-icon" />
                </MenuButton>

                <MenuItems static>
                  <PortalMenuContent 
                    buttonRef={{ current: menuRefs.current[menu.label] }}
                    className="category-dropdown-menu"
                    isOpen={open}
                  >
                    <div className="py-1">
                      {menu.items.map((item) => (
                        <MenuItem key={item.to}>
                          {({ active }) => (
                            <Link to={item.to} className={menuItemClasses(active, item.to)}>
                              {item.label}
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </PortalMenuContent>
                </MenuItems>
              </>
            )}
          </Menu>
        ))}
      </div>
    </div>
  );
}
