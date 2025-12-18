
import React from 'react'
import { Fuel, ShoppingCart, BookOpen, ArrowDown, LayoutDashboard, CreditCard } from 'lucide-react'

const HeroTutorial = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-20 px-4 sm:px-6 lg:px-8 border-y border-white/5">
      <div className="absolute inset-0 bg-grid-white/[0.02] opacity-20"></div>
      <div className="relative max-w-7xl mx-auto text-center">
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

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            LUKOS
            <span className="block bg-gradient-to-r from-blue-400 to-[#8B5CF6] bg-clip-text text-transparent">
              Tutoriais do Sistema
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Aprenda a usar todas as funcionalidades do sistema PDV para pista de combustível
            e conveniência com nossos tutoriais passo a passo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all duration-300">
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Fuel className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Pista de Combustível</h3>
            <p className="text-sm text-gray-500">Gestão completa das operações de combustível</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-300">
            <div className="bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Conveniência</h3>
            <p className="text-sm text-gray-500">Vendas e gestão de produtos da loja</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-green-500/30 hover:bg-white/[0.08] transition-all duration-300">
            <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Sistema Geral</h3>
            <p className="text-sm text-gray-500">Configurações e relatórios do sistema</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all duration-300">
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Retaguarda</h3>
            <p className="text-sm text-gray-500">Gestão completa das operações de combustível</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-red-500/30 hover:bg-white/[0.08] transition-all duration-300">
            <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Dashboard</h3>
            <p className="text-sm text-gray-500">Vendas e gestão de produtos da loja</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-400/30 hover:bg-white/[0.08] transition-all duration-300">
            <div className="bg-blue-400/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2 uppercase tracking-wider text-xs">Lukos Pay</h3>
            <p className="text-sm text-gray-500">Configurações e relatórios do sistema</p>
          </div>
        </div>


        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-600 mx-auto" />
        </div>
      </div>
    </section>
  )
}

export default HeroTutorial;
