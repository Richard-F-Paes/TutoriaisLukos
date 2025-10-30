
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BookOpen, Home, Menu, X, Fuel, ShoppingCart, Settings, BarChart3, Users, HelpCircle, Phone, CreditCard, FileText} from 'lucide-react'
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
    { path: '/FaturaWeb', label: 'Fatura Web', icon: FileText },
    
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="sm flex justify-center bg-gray-100/90 backdrop-blur-lg shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-center items-center h-16">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive(link.path) ? 'text-white' : 'text-gray-600'}`} />
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
            <div className="lg:hidden py-4 border-t border-gray-200 bg-gray-100/90 backdrop-blur-lg">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive(link.path) ? 'text-white' : 'text-gray-600'}`} />
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
