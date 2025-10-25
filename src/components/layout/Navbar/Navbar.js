
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BookOpen, Home, Menu, X, Fuel, ShoppingCart, Settings, BarChart3, Users, HelpCircle, Phone, CreditCard} from 'lucide-react'
import FixedSearchBar from '../../FixedSearchBar/FixedSearchBar'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/tutoriais', label: 'Tutoriais', icon: BookOpen },
    { path: '/pista-tutoriais', label: 'Pista', icon: Fuel },
    { path: '/conveniencia-tutoriais', label: 'Conveniência', icon: ShoppingCart },
    { path: '/retaguarda-tutoriais', label: 'Retaguarda', icon: Settings },
    { path: '/dashboard-tutoriais', label: 'Dashboard', icon: BarChart3 },
    { path: '/lukos-pay', label: 'Lukos Pay', icon: CreditCard },
    { path: '/Pré-Venda', label: 'Pré-Venda', icon: Users },
    { path: '/FaturaWeb', label: 'Fatura Web', icon: Users },
    
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className=" sm flex justify-center bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-50  ">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 ">
          <div className="flex justify-center items-center h-20 src">
            
            {/* Logo */}
            <Link to="/" className="flex items-center justify-center space-x-6 group hover:scale-105 transition-all duration-300">
              <img
                src="logo.png"
                alt="Logo Tutorial Lukos"
                className="w-12 h-12 group-hover:opacity-80 transition-all duration-300"
              />
          
            </Link>
            <div className="flex justify-baseline items-baseline">
            <h1 className="text-[20px] m-8 font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-600 group-hover:to-purple-700 transition-all duration-500 ease-in-out ">
                Tutorial Lukos
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-lg">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Barra de pesquisa fixa */}
      <FixedSearchBar />
    </>
  )
}

export default Navbar
