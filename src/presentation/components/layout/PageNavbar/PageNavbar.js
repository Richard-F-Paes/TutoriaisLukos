import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Moon } from 'lucide-react';

function PageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const navItems = [
    { label: 'Blog', hasDropdown: false, key: 'solucoes', href: '/blog', },
    { label: 'IA', hasDropdown: false, key: 'jornadas', href: '/ia' },
    { label: 'Sobre nós', href: '/sobre', hasDropdown: false, href: '/sobre' },
    { label: 'Serviços', href: '/servicos', hasDropdown: false, key: 'insights' },
    { label: 'Contato', href: '/contato', isButton: true, hasDropdown: false, href: '/contato' },
  ];

  return (
    <nav className={`bg-white w-[1300px] h-[75px] mt-6 flex items-center justify-center rounded-full shadow-lg sticky top-0 z-50 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-300 ${isScrolled ? 'py-4' : ''}`}>
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
            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              <a 
                href="https://www.instagram.com/lukostecnologia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 7.5C11.11 7.5 10.24 7.76392 9.49993 8.25839C8.75991 8.75285 8.18314 9.45566 7.84254 10.2779C7.50195 11.1002 7.41283 12.005 7.58647 12.8779C7.7601 13.7508 8.18868 14.5526 8.81802 15.182C9.44736 15.8113 10.2492 16.2399 11.1221 16.4135C11.995 16.5872 12.8998 16.4981 13.7221 16.1575C14.5443 15.8169 15.2471 15.2401 15.7416 14.5001C16.2361 13.76 16.5 12.89 16.5 12C16.4988 10.8069 16.0243 9.66303 15.1806 8.81939C14.337 7.97575 13.1931 7.50124 12 7.5ZM12 15C11.4067 15 10.8266 14.8241 10.3333 14.4944C9.83994 14.1648 9.45542 13.6962 9.22836 13.1481C9.0013 12.5999 8.94189 11.9967 9.05764 11.4147C9.1734 10.8328 9.45912 10.2982 9.87868 9.87868C10.2982 9.45912 10.8328 9.1734 11.4147 9.05764C11.9967 8.94189 12.5999 9.0013 13.1481 9.22836C13.6962 9.45542 14.1648 9.83994 14.4944 10.3333C14.8241 10.8266 15 11.4067 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15ZM16.5 2.25H7.5C6.10807 2.25149 4.77358 2.80509 3.78933 3.78933C2.80509 4.77358 2.25149 6.10807 2.25 7.5V16.5C2.25149 17.8919 2.80509 19.2264 3.78933 20.2107C4.77358 21.1949 6.10807 21.7485 7.5 21.75H16.5C17.8919 21.7485 19.2264 21.1949 20.2107 20.2107C21.1949 19.2264 21.7485 17.8919 21.75 16.5V7.5C21.7485 6.10807 21.1949 4.77358 20.2107 3.78933C19.2264 2.80509 17.8919 2.25149 16.5 2.25ZM20.25 16.5C20.25 17.4946 19.8549 18.4484 19.1516 19.1516C18.4484 19.8549 17.4946 20.25 16.5 20.25H7.5C6.50544 20.25 5.55161 19.8549 4.84835 19.1516C4.14509 18.4484 3.75 17.4946 3.75 16.5V7.5C3.75 6.50544 4.14509 5.55161 4.84835 4.84835C5.55161 4.14509 6.50544 3.75 7.5 3.75H16.5C17.4946 3.75 18.4484 4.14509 19.1516 4.84835C19.8549 5.55161 20.25 6.50544 20.25 7.5V16.5ZM18 7.125C18 7.3475 17.934 7.56501 17.8104 7.75002C17.6868 7.93502 17.5111 8.07922 17.3055 8.16436C17.1 8.24951 16.8738 8.27179 16.6555 8.22838C16.4373 8.18498 16.2368 8.07783 16.0795 7.9205C15.9222 7.76316 15.815 7.56271 15.7716 7.34448C15.7282 7.12625 15.7505 6.90005 15.8356 6.69448C15.9208 6.48891 16.065 6.31321 16.25 6.1896C16.435 6.06598 16.6525 6 16.875 6C17.1734 6 17.4595 6.11853 17.6705 6.3295C17.8815 6.54048 18 6.82663 18 7.125Z" fill="#0C1311"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/lukostecnologia/about/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_2070_1055)">
                    <path d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0ZM6 17H3V8H6V17ZM4.5 6.3C3.5 6.3 2.7 5.5 2.7 4.5C2.7 3.5 3.5 2.7 4.5 2.7C5.5 2.7 6.3 3.5 6.3 4.5C6.3 5.5 5.5 6.3 4.5 6.3ZM17 17H14V11.7C14 10.9 13.3 10.2 12.5 10.2C11.7 10.2 11 10.9 11 11.7V17H8V8H11V9.2C11.5 8.4 12.6 7.8 13.5 7.8C15.4 7.8 17 9.4 17 11.3V17Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2070_1055">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@lukos-solucoesemtecnologia8036/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21.9684 6.5175C21.8801 6.17189 21.7109 5.85224 21.4747 5.58491C21.2385 5.31758 20.9421 5.11024 20.61 4.98C17.3963 3.73875 12.2812 3.75 12 3.75C11.7188 3.75 6.60375 3.73875 3.39 4.98C3.0579 5.11024 2.76153 5.31758 2.52534 5.58491C2.28915 5.85224 2.1199 6.17189 2.03156 6.5175C1.78875 7.45313 1.5 9.16313 1.5 12C1.5 14.8369 1.78875 16.5469 2.03156 17.4825C2.11977 17.8283 2.28895 18.1481 2.52515 18.4156C2.76136 18.6831 3.0578 18.8906 3.39 19.0209C6.46875 20.2088 11.2875 20.25 11.9381 20.25H12.0619C12.7125 20.25 17.5341 20.2088 20.61 19.0209C20.9422 18.8906 21.2386 18.6831 21.4748 18.4156C21.711 18.1481 21.8802 17.8283 21.9684 17.4825C22.2113 16.545 22.5 14.8369 22.5 12C22.5 9.16313 22.2113 7.45313 21.9684 6.5175ZM15.0553 12.6113L11.3053 15.2363C11.1931 15.3148 11.0616 15.3612 10.9249 15.3703C10.7883 15.3794 10.6517 15.351 10.5301 15.288C10.4085 15.225 10.3064 15.1299 10.235 15.013C10.1636 14.8962 10.1256 14.762 10.125 14.625V9.375C10.125 9.2378 10.1627 9.10324 10.2339 8.98597C10.3051 8.86869 10.4071 8.77319 10.5289 8.70987C10.6506 8.64655 10.7873 8.61783 10.9242 8.62683C11.0611 8.63584 11.1929 8.68222 11.3053 8.76094L15.0553 11.3859C15.154 11.4551 15.2345 11.547 15.2901 11.6539C15.3457 11.7608 15.3747 11.8795 15.3747 12C15.3747 12.1205 15.3457 12.2392 15.2901 12.3461C15.2345 12.453 15.154 12.5449 15.0553 12.6141V12.6113Z" fill="#0C1311"/>
                </svg>
              </a>
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

