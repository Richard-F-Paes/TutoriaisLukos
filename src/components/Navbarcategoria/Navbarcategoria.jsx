import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Navbarcateria() {
  return (
    <div className="flex gap-4 p-8 bg-trans justify-center align-center">
      {/* Menu PDV */}
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">
          PDV
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 outline-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="py-1">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                PDV Pista
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                PDV Loja
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      {/* Menu Retaguarda */}
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">
          Retaguarda
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 outline-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="py-1">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Cadastros
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Produtos
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Comercial
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Financeiro
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Estoque
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Fiscal
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Ferramentas
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Relatórios
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Fidelidade
              </a>
            </MenuItem>
             <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Integrações
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

       {/* Menu Pré venda */}
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">
          
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 outline-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="py-1">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Produtos
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Movimentos
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

        {/* Menu Dashboard*/}
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">
          Dashboard
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 outline-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="py-1">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Gerar Senha Temporária
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Preço do Combustível Dashboard
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

        {/* Menu Fatura Web */}
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">
          Fatura web
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 outline-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="py-1">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Cadastro Fatura Web
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                Requisição de abastecimento Web
              </a>
            </MenuItem>
                 <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
               Cadastro De Frota Web
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}
