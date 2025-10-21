
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BookOpen, Home, Menu, X, Fuel, ShoppingCart, Settings, BarChart3, Users, HelpCircle, Phone, CreditCard} from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/pista', label: 'Pista', icon: Fuel },
    { path: '/Conveniencia', label: 'Conveniência', icon: ShoppingCart },
    { path: '/retaguarda', label: 'Retaguarda', icon: Settings },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/lukos-pay', label: 'Lukos Pay', icon: CreditCard },
    { path: '/sobre', label: 'Sobre', icon: Users },
    
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className=" flex justify-center bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 src">
          {/* Logo */}
          <Link to="/" className="flex items-center justify space-x-3 group"
          >
              {/* Logo no topo */}
       

          
          
      
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent m-4 flex justify-center">
               Tutorial
              </h1>
             
            </div>
          </Link>

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
  )
}

export default Navbar
