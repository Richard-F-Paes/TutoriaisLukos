import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, useLocation } from 'react-router-dom';

export default function Navbarcateria() {
  const location = useLocation();

  const menuButtonClasses =
    'inline-flex justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600';

  const menuItemClasses = (active, path) =>
    `block px-4 py-2 text-sm ${active ? 'bg-gray-600 text-white' : 'text-gray-200'} ${
      location.pathname === path ? 'font-bold' : ''
    }`;

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
      label: 'Pré Venda',
      items: [
        { label: 'Produtos', to: '/Prevenda/Produtos' },
        { label: 'Movimentos', to: '/Prevenda/Movimentos' },
      ],
    },
    {
      label: 'Dashboard',
      items: [
        { label: 'Gerar Senha Temporária', to: '/Dashboard/GerarSenha' },
        { label: 'Preço do Combustível', to: '/Dashboard/PrecoCombustivel' },
      ],
    },
    {
      label: 'Fatura Web',
      items: [
        { label: 'Cadastro Fatura Web', to: '/FaturaWeb/Cadastro' },
        { label: 'Requisição de Abastecimento Web', to: '/FaturaWeb/Requisicao' },
        { label: 'Cadastro de Frota Web', to: '/FaturaWeb/Frota' },
      ],
    },
  ];

  return (
    <div className="flex gap-4 p-4 bg-transparent justify-center items-center relative z-20">
      {/* Botão Início */}
      <Link
        to="/"
        className={`px-4 py-2 rounded-md text-sm font-semibold ${
          location.pathname === '/' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'
        }`}
      >
        Início
      </Link>

      {/* Dropdowns */}
      {menus.map((menu) => (
        <Menu as="div" className="relative inline-block z-50" key={menu.label}>
          <MenuButton className={menuButtonClasses}>
            {menu.label}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-300" />
          </MenuButton>

          <MenuItems className="absolute left-0 top-full mt-1 w-56 origin-top-left rounded-md bg-gray-700 shadow-lg outline-none z-50">
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
          </MenuItems>
        </Menu>
      ))}
    </div>
  );
}
