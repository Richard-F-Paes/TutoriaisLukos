import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search, Moon, Globe } from 'lucide-react';

function PageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const navItems = [
    { label: 'Blog', hasDropdown: true, key: 'solucoes', href: '/blog', },
    { label: 'IA', hasDropdown: true, key: 'jornadas', href: '/ia' },
    { label: 'Sobre nós', href: '/sobre', hasDropdown: false, href: '/sobre' },
    { label: 'Serviços', href: '/servicos', hasDropdown: true, key: 'insights' },
    { label: 'Contato', href: '/contato', isButton: true, hasDropdown: false, href: '/contato' },
  ];

  return (
    <nav className="bg-white w-[1300px] h-[75px] mt-6 flex items-center justify-center rounded-full shadow-lg sticky top-0 z-50 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/">
            <div className="flex items-center space-x-2 py-2 mr-8">
              <img 
                src="logo.png" 
                alt="Lukos"   
                className="w-1 h-12 transition-all duration-200 ease-in-out" 
                style={{ height: '50px', width: '55px' }}
              />
            </div>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.isButton) {
                return (
                  <div key={item.label} className="relative">
                    <a href={item.href}>
                      <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-white hover:bg-blue-700 shadow-sm bg-[#0b57f4]">
                        {item.label}
                      </button>
                    </a>
                  </div>
                );
              }

              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center text-black"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                );
              }

              return (
                <div key={item.label} className="relative">
                  <a 
                    href={item.href} 
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-black hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                      {item.label}
                    </button>
                  </a>
                </div>
              );
            })}
          </nav>
            
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 ml-auto">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 text-gray-700 h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 text-gray-700 h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              aria-label="Switch to dark mode"
            >
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="relative">
              <button 
                className="justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus:ring-1 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 text-gray-700 h-8 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center space-x-1 min-w-0"
                type="button"
              >
                <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">PT</span>
                <ChevronDown className="h-3 w-3 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden overflow-hidden">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => {
                if (item.isButton) {
                  return (
                    <a key={item.label} href={item.href}>
                      <button className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-white bg-[#0b57f4] hover:bg-blue-700">
                        {item.label}
                      </button>
                    </a>
                  );
                }

                if (item.hasDropdown) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 font-medium text-black hover:text-blue-600 hover:bg-gray-100"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[item.key] ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg transition-all duration-200 font-medium text-black hover:text-blue-600 hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

export default PageNavbar;

