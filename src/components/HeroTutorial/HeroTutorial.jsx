
import React from 'react'
import {Fuel, ShoppingCart, BookOpen, ArrowDown, LayoutDashboard, CreditCard } from 'lucide-react'

const HeroTutorial = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      assName="relative max-w-7xl mx-auto text-center"
      <div cl>
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-300">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg transform rotate-6 hover:-rotate-6 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            LUKOS
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tutoriais do Sistema
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Aprenda a usar todas as funcionalidades do sistema PDV para pista de combustível 
            e conveniência com nossos tutoriais passo a passo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Fuel className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Pista de Combustível</h3>
            <p className="text-sm text-gray-600">Gestão completa das operações de combustível</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Conveniência</h3>
            <p className="text-sm text-gray-600">Vendas e gestão de produtos da loja</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sistema Geral</h3>
            <p className="text-sm text-gray-600">Configurações e relatórios do sistema</p>F
          </div>
        </div>
        

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Retaguarda</h3>
            <p className="text-sm text-gray-600">Gestão completa das operações de combustível</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="h-6 w-6 text-red-600"  />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
            <p className="text-sm text-gray-600">Vendas e gestão de produtos da loja</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-blue-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lukos Pay</h3>
            <p className="text-sm text-gray-600">Configurações e relatórios do sistema</p>
          </div>
        </div>
        

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400 mx-auto" />
        </div>
      </div>
    </section>
  )
}

export default HeroTutorial;
