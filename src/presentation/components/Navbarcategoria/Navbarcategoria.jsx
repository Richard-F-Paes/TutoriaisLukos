// HeadlessUI removido - usando implementação customizada com hover e click fix
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTutorialModal } from '../../../contexts/TutorialModalContext';
import { useEditorModal } from '../../../contexts/EditorModalContext';
import { useQuery } from '@tanstack/react-query';
import { headerMenuService } from '../../../services/headerMenuService';
import { defaultHeaderMenus } from '../../../shared/constants/defaultHeaderMenus.js';
import AdminPasswordModal from '../ui/AdminPasswordModal/AdminPasswordModal';
import './Navbarcategoria.css';

const MobileSubmenu = ({ item, depth = 0, openModal, setMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = (item.children || []).length > 0;
  // Aumentando o padding left para melhor hierarquia visual (16px base + depth * 12px)
  const pad = { paddingLeft: `${16 + Math.min(depth, 6) * 12}px` };

  if (hasChildren || item.isSubmenu) {
    return (
      <div className="mobile-submenu-container">
        <div
          className="category-mobile-link sub"
          style={{
            ...pad,
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            paddingRight: '16px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <span>{item.label}</span>
          <ChevronRightIcon
            className={`h-4 w-4 text-purple-700 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
          />
        </div>

        {/* Container para animação de altura poderia ser adicionado aqui */}
        <div className={`mobile-submenu-children ${isOpen ? 'block' : 'hidden'}`}>
          {hasChildren && item.children.map((child, idx) => (
            <MobileSubmenu
              key={`${child.label}-${depth + 1}-${idx}`}
              item={child}
              depth={depth + 1}
              openModal={openModal}
              setMenuOpen={setMenuOpen}
            />
          ))}
        </div>
      </div>
    );
  }

  if (item.tutorialSlug) {
    return (
      <button
        onClick={() => {
          setMenuOpen(false);
          openModal(item.tutorialSlug);
        }}
        className="category-mobile-link sub"
        role="menuitem"
        style={pad}
      >
        {item.label}
      </button>
    );
  }

  return (
    <div
      className="category-mobile-link sub"
      style={{ ...pad, opacity: 0.5, cursor: 'not-allowed' }}
      title="Tutorial não configurado"
    >
      {item.label}
    </div>
  );
};

// Component que renderiza conteúdo do menu via portal
const PortalMenuContent = ({ buttonRef, children, className, isOpen, align = 'left' }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [transform, setTransform] = useState(undefined);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      if (align === 'right') {
        // Para submenus: posicionar ao lado direito do item pai
        const top = rect.top + window.scrollY;
        let left = rect.right + window.scrollX + 4; // 4px gap à direita
        const menuWidth = 200; // Largura do submenu
        const windowWidth = window.innerWidth;

        // Se o submenu sair da tela à direita, posicionar à esquerda
        if (left + menuWidth > windowWidth - 16) {
          left = rect.left + window.scrollX - menuWidth - 4;
        }

        setPosition({ top, left });
        setTransform(undefined);
      } else {
        // Para menus principais: posicionar abaixo do botão
        const top = rect.bottom + window.scrollY + 4; // 4px gap
        // Para menu do usuário, alinhar à direita do botão
        const isUserMenu = className?.includes('category-user-dropdown-portal');
        let left = rect.left + window.scrollX;

        if (isUserMenu) {
          // Alinhar à direita do botão - usar largura padrão do menu (200-250px)
          const dropdownWidth = dropdownRef.current?.offsetWidth || 220;
          left = rect.right + window.scrollX - dropdownWidth;

          // Garantir que não saia da tela à esquerda
          if (left < window.scrollX) {
            left = rect.left + window.scrollX;
          }
        }

        setPosition({
          top,
          left,
        });
        setTransform(undefined);
      }
    };

    updatePosition();
    // Atualizar após render para pegar a largura correta
    requestAnimationFrame(updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, buttonRef, className, align]);

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
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [fixedSubmenus, setFixedSubmenus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const timeoutsRef = useRef({});
  const userDropdownRef = useRef(null);
  const userMenuButtonRef = useRef(null);

  // #region agent log
  const __agentLog = () => { };
  // #endregion

  useEffect(() => {
    // #region agent log
    __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H5', location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:showUserMenu:effect', message: 'Navbarcategoria showUserMenu state changed', data: { showUserMenu, isAuthenticated, hasUser: !!user, userNameLen: (user?.name || '').length }, timestamp: Date.now() });
    // #endregion
  }, [showUserMenu, isAuthenticated, user]);

  // Inspeção do DOM para diagnosticar dropdown invisível (sem dados sensíveis)
  useEffect(() => {
    if (!showUserMenu) return;
    // Usar 2 RAFs para garantir que o Portal montou no DOM
    const raf1 = requestAnimationFrame(() => { });
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
        sessionId: 'debug-session',
        runId: 'post-fix',
        hypothesisId: 'H6',
        location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:userDropdown:domProbe',
        message: 'Navbarcategoria user dropdown DOM probe',
        data: {
          portalRootExists: !!portalRoot,
          dropdownExists: !!dropdownEl,
          buttonExists: !!buttonEl,
          rect: rect ? { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) } : null,
          buttonRect: btnRect ? { x: Math.round(btnRect.x), y: Math.round(btnRect.y), w: Math.round(btnRect.width), h: Math.round(btnRect.height) } : null,
          computed: cs ? { display: cs.display, visibility: cs.visibility, opacity: cs.opacity, position: cs.position, zIndex: cs.zIndex } : null,
          viewport: { w: window.innerWidth, h: window.innerHeight },
          overlap: { probeX: centerX != null ? Math.round(centerX) : null, probeY: centerY != null ? Math.round(centerY) : null, topTag: topEl?.tagName || null, topClass: topEl?.className ? String(topEl.className).slice(0, 120) : null, topElIsInside },
        },
        timestamp: Date.now()
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
    `category-dropdown-item ${active ? 'active' : ''} ${location.pathname === path ? 'active' : ''
    }`;

  // Criar refs para cada botão de menu
  const menuRefs = useRef({});
  const submenuRefs = useRef({});

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
    setOpenSubmenus({});
    setFixedSubmenus({});
  };

  // Funções para controlar hover e click
  const handleMouseEnter = (menuLabel) => {
    // Limpar todos os timeouts e fechar outros menus instantaneamente
    clearAllTimeouts();

    // Fechar todos os outros menus instantaneamente
    setOpenMenus(prev => {
      const newState = {};
      const menusToClose = [];
      Object.keys(prev).forEach(key => {
        if (key !== menuLabel) {
          newState[key] = false;
          menusToClose.push(key);
        }
      });
      // Fechar submenus dos menus que estão fechando
      if (menusToClose.length > 0) {
        setOpenSubmenus(submenuPrev => {
          const newSubmenus = { ...submenuPrev };
          menusToClose.forEach(menuKey => {
            Object.keys(newSubmenus).forEach(submenuKey => {
              if (submenuKey.startsWith(`${menuKey}::`)) {
                delete newSubmenus[submenuKey];
              }
            });
          });
          return newSubmenus;
        });
      }
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
        // Fechar todos os submenus deste menu quando o menu principal fechar
        setOpenSubmenus(prev => {
          const newSubmenus = { ...prev };
          // Remover todos os submenus que começam com o label deste menu
          Object.keys(newSubmenus).forEach(key => {
            if (key.startsWith(`${menuLabel}::`)) {
              delete newSubmenus[key];
            }
          });
          return newSubmenus;
        });
        // Remover fixação dos submenus deste menu
        setFixedSubmenus(prev => {
          const newFixed = { ...prev };
          Object.keys(newFixed).forEach(key => {
            if (key.startsWith(`${menuLabel}::`)) {
              delete newFixed[key];
            }
          });
          return newFixed;
        });
        delete timeoutsRef.current[menuLabel];
      }, 150);
    }
  };

  const handleClick = (menuLabel) => {
    // Limpar todos os timeouts e fechar outros menus instantaneamente
    clearAllTimeouts();

    // Verificar se o menu estava aberto e fixo para toggle
    const wasOpenAndFixed = fixedMenus[menuLabel] && openMenus[menuLabel];

    // Remover estado "fixo" de todos os menus anteriores
    // e marcar apenas o menu clicado como "fixo"
    setFixedMenus({ [menuLabel]: true });

    // Fechar todos os outros menus e abrir o menu clicado
    setOpenMenus(prev => {
      const newState = {};
      const menusToClose = [];
      // Fechar todos os outros menus
      Object.keys(prev).forEach(key => {
        if (key !== menuLabel) {
          newState[key] = false;
          menusToClose.push(key);
        }
      });
      // Fechar submenus dos menus que estão fechando
      if (menusToClose.length > 0) {
        setOpenSubmenus(submenuPrev => {
          const newSubmenus = { ...submenuPrev };
          menusToClose.forEach(menuKey => {
            Object.keys(newSubmenus).forEach(submenuKey => {
              if (submenuKey.startsWith(`${menuKey}::`)) {
                delete newSubmenus[submenuKey];
              }
            });
          });
          return newSubmenus;
        });
      }
      // Sempre abrir o menu clicado (sem toggle)
      newState[menuLabel] = true;
      return newState;
    });

    // Se estava aberto e fixo, apenas remover fixo e fechar submenus
    if (wasOpenAndFixed) {
      setFixedMenus({});
      setOpenSubmenus(prev => {
        const newSubmenus = { ...prev };
        Object.keys(newSubmenus).forEach(key => {
          if (key.startsWith(`${menuLabel}::`)) {
            delete newSubmenus[key];
          }
        });
        return newSubmenus;
      });
      setFixedSubmenus(prev => {
        const newFixed = { ...prev };
        Object.keys(newFixed).forEach(key => {
          if (key.startsWith(`${menuLabel}::`)) {
            delete newFixed[key];
          }
        });
        return newFixed;
      });
    }
  };

  const handleClickOutside = () => {
    clearAllTimeouts();
    setFixedMenus({});
    setOpenMenus({});
    setOpenSubmenus({});
    setFixedSubmenus({});
  };

  // Efeito de rolagem
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H5', location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:clickOutside:userMenu', message: 'Navbarcategoria document click (user menu close check)', data: { targetTag: target?.tagName || null, showUserMenu, insideUserMenu, willCloseUserMenu }, timestamp: Date.now() });
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
      __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H1', location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:handleDocumentClick', message: 'Navbarcategoria doc click - outside detection', data: { targetTag: e.target?.tagName || null, isInsideMenu: !!isInsideMenu, isInsidePortalMenu: !!isInsidePortalMenu, isInsideUserMenu: !!isInsideUserMenu, willClose: (!isInsideMenu && !isInsideUserMenu && !isInsidePortalMenu) }, timestamp: Date.now() });
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

  // Usar menus do banco ou menus padrão
  const mapTreeItem = (item) => {
    const children = (item.Children || item.children || []).map(mapTreeItem);
    const hasChildren = children.length > 0;
    const isSubmenu = Boolean(item.IsSubmenu ?? item.isSubmenu ?? false);
    // Se for submenu (explícito ou tem filhos), não navega (tutorialSlug é null)
    const tutorialSlug = (isSubmenu || hasChildren) ? null : (item.TutorialSlug || item.tutorialSlug || null);
    return {
      label: item.Label || item.label,
      tutorialSlug,
      isSubmenu: isSubmenu || hasChildren,
      children,
    };
  };

  const menus = headerMenusData?.data?.length > 0
    ? headerMenusData.data.map(menu => ({
      label: menu.Label || menu.label,
      items: (menu.Items || menu.items || []).map(mapTreeItem),
    }))
    : defaultHeaderMenus;

  const pathKey = (menuLabel, pathArr) => `${menuLabel}::${pathArr.join('.')}`;
  const isSubmenuOpen = (menuLabel, pathArr) => {
    const key = pathKey(menuLabel, pathArr);
    return !!openSubmenus[key];
  };
  const isSubmenuFixed = (menuLabel, pathArr) => {
    const key = pathKey(menuLabel, pathArr);
    return !!fixedSubmenus[key];
  };
  const toggleSubmenu = (menuLabel, pathArr) => {
    const key = pathKey(menuLabel, pathArr);
    const isCurrentlyFixed = fixedSubmenus[key];

    if (isCurrentlyFixed) {
      // Se está fixo, desfixar e fechar
      setFixedSubmenus(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      setOpenSubmenus(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    } else {
      // Se não está fixo, fixar e abrir
      setFixedSubmenus(prev => ({ ...prev, [key]: true }));
      setOpenSubmenus(prev => ({ ...prev, [key]: true }));
    }
  };

  // Função para abrir submenu temporariamente no hover (se não estiver fixo)
  const openSubmenuOnHover = (menuLabel, pathArr) => {
    const key = pathKey(menuLabel, pathArr);
    if (!fixedSubmenus[key]) {
      setOpenSubmenus(prev => ({ ...prev, [key]: true }));
    }
  };

  // Função para fechar submenu no mouse leave (se não estiver fixo)
  const closeSubmenuOnLeave = (menuLabel, pathArr) => {
    const key = pathKey(menuLabel, pathArr);
    // Delay para permitir movimento entre item e submenu
    const timeoutId = setTimeout(() => {
      setOpenSubmenus(prev => {
        // Verificar se não está fixo antes de fechar
        if (!fixedSubmenus[key] && prev[key]) {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        }
        return prev;
      });
    }, 150);
    // Armazenar timeout para possível cancelamento
    return timeoutId;
  };

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
    <header className={`category-navbar bg-white menu-item-link flex items-center gap-1 px-4 py-2 text-base font-bold transition-all duration-300 rounded-xl whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 text-[#8B5CF6] bg-white/20 hover:bg-white/40 ${isScrolled ? 'scrolled' : ''}`}>
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
        <nav className="category-navbar-menu  bg-white" role="navigation" aria-label="Menu de categorias">
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
                    {(function renderItems(items, parentPath = []) {
                      return items.map((item, idx) => {
                        const pathArr = [...parentPath, idx];
                        const hasChildren = (item.children || []).length > 0;
                        const isSubmenuItem = item.isSubmenu || hasChildren;
                        const open = isSubmenuItem ? isSubmenuOpen(menu.label, pathArr) : false;

                        if (isSubmenuItem) {
                          const submenuId = `submenu-${menu.label}-${pathArr.join('-')}`;
                          const submenuKey = `${menu.label}-${pathArr.join('-')}`;
                          const isFixed = isSubmenuFixed(menu.label, pathArr);

                          // Inicializar ref se não existir
                          if (!submenuRefs.current[submenuKey]) {
                            submenuRefs.current[submenuKey] = { current: null };
                          }
                          const submenuRef = submenuRefs.current[submenuKey];

                          return (
                            <div
                              key={`${item.label}-${pathArr.join('.')}`}
                              style={{ position: 'relative' }}
                              onMouseEnter={() => {
                                if (!isFixed) {
                                  openSubmenuOnHover(menu.label, pathArr);
                                }
                              }}
                              onMouseLeave={() => {
                                if (!isFixed) {
                                  closeSubmenuOnLeave(menu.label, pathArr);
                                }
                              }}
                            >
                              <button
                                ref={submenuRef}
                                type="button"
                                onClick={() => toggleSubmenu(menu.label, pathArr)}
                                className={menuItemClasses(false, '')}
                                role="menuitem"
                                aria-expanded={open}
                                title={isFixed ? "Fechar submenu" : "Abrir submenu"}
                              >
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                  <span>{item.label}</span>
                                  <ChevronRightIcon
                                    aria-hidden="true"
                                    style={{
                                      width: 16,
                                      height: 16,
                                      transition: 'transform 0.2s ease',
                                    }}
                                  />
                                </span>
                              </button>
                              <PortalMenuContent
                                buttonRef={submenuRef}
                                className="category-dropdown-menu submenu-flyout"
                                isOpen={open}
                                align="right"
                              >
                                <div className="py-1" role="menu" id={submenuId} aria-label={`Submenu ${item.label}`}>
                                  {renderItems(item.children, pathArr)}
                                </div>
                              </PortalMenuContent>
                            </div>
                          );
                        }

                        if (item.tutorialSlug) {
                          return (
                            <button
                              key={`${item.label}-${pathArr.join('.')}`}
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
                          );
                        }

                        return (
                          <span
                            key={`${item.label}-${pathArr.join('.')}`}
                            className={menuItemClasses(false, '')}
                            style={{ opacity: 0.5, cursor: 'not-allowed' }}
                            title="Tutorial não configurado"
                          >
                            {item.label}
                          </span>
                        );
                      });
                    })(menu.items)}
                  </div>
                </PortalMenuContent>
              </div>
            );
          })}
        </nav>

        {/* Ações da direita */}
        <div className="category-navbar-actions">
          {/* Autenticação / Usuário */}
          {isAuthenticated ? (
            <div className="relative user-menu">
              <button
                ref={userMenuButtonRef}
                onClick={() => {
                  // #region agent log
                  __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H5', location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:userMenuButton:onClick', message: 'Navbarcategoria user menu button clicked', data: { prevShowUserMenu: showUserMenu, isAuthenticated, hasUser: !!user, target: 'click' }, timestamp: Date.now() });
                  // #endregion
                  setShowUserMenu(prev => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // #region agent log
                    __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H5', location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:userMenuButton:onKeyDown', message: 'Navbarcategoria user menu button keydown toggle', data: { key: e.key, prevShowUserMenu: showUserMenu, isAuthenticated, hasUser: !!user }, timestamp: Date.now() });
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
                  className={`fas fa-chevron-down category-chevron ${showUserMenu ? 'rotated' : ''
                    }`}
                  aria-hidden="true"
                ></i>
              </button>

              {showUserMenu && (
                <PortalMenuContent
                  buttonRef={{ current: userMenuButtonRef.current }}
                  className="category-user-dropdown-portal"
                  isOpen={showUserMenu}
                  align="left"
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
                __agentLog({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H2', location: 'src/presentation/components/Navbarcategoria/Navbarcategoria.jsx:openLoginModal', message: 'Open AdminPasswordModal', data: { wasOpen: showAdminModal, isAuthenticated, menuOpen, showUserMenu }, timestamp: Date.now() });
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
                <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
                {/* Engrenagem minimalista dentro do escudo */}
                <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.4" />
                <path d="M12 8.5v3M9.5 10h5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
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
      {menuOpen && ReactDOM.createPortal(
        <div id="mobile-category-menu" className="category-mobile-menu" role="navigation" aria-label="Menu mobile de categorias">
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="absolute inset-0 z-0"
            onClick={() => setMenuOpen(false)}
          />

          <div className="category-mobile-menu-content z-10">
            {/* Botão Fechar Sidebar */}
            <button
              onClick={() => setMenuOpen(false)}
              className="category-mobile-close-button"
              aria-label="Fechar menu mobile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

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
              <MobileSubmenu
                key={menu.label}
                item={{ label: menu.label, children: menu.items }}
                openModal={openModal}
                setMenuOpen={setMenuOpen}
              />
            ))}

            {/* Autenticação mobile */}
            {isAuthenticated && (
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
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Modal de Senha Administrativa */}
      <AdminPasswordModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
    </header >
  );
}
