import React from 'react'
import { motion } from 'framer-motion'
import { Activity, ShoppingCart, User, BarChart2, CreditCard, DollarSign, FileText, MonitorCog } from 'lucide-react'

const CardTutoriais = () => {
  const services = [
    {
      icon: MonitorCog,
      title: 'Retaguarda',
      description: 'Gerencie todo o sistema administrativo da empresa de forma rápida e eficiente.',
      features: ['Controle de estoque', 'Gestão de fornecedores', 'Relatórios gerenciais'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: ShoppingCart,
      title: 'Pista',
      description: 'Organize e acompanhe as vendas em tempo real diretamente na pista.',
      features: ['Registro de vendas', 'Atualização de estoque', 'Histórico de transações'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: User,
      title: 'Conveniência',
      description: 'Acompanhe clientes, programas de fidelidade e cadastros de forma simples.',
      features: ['Cadastro de clientes', 'Programas de fidelidade', 'Relatórios de clientes'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart2,
      title: 'Dashboard',
      description: 'Visualize métricas e indicadores importantes para decisões estratégicas.',
      features: ['Gráficos interativos', 'Indicadores de desempenho', 'Resumo financeiro'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: CreditCard,
      title: 'Lukos Pay',
      description: 'Controle pagamentos, recebimentos e movimentações financeiras facilmente.',
      features: ['Pagamentos digitais', 'Integração bancária', 'Resumo financeiro'],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: DollarSign,
      title: 'Pré Venda',
      description: 'Planeje vendas futuras, cadastre pedidos e organize promoções.',
      features: ['Cadastro de pedidos', 'Controle de promoções', 'Gestão de clientes'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FileText,
      title: 'Fatura Web',
      description: 'Emita e gerencie faturas online com praticidade e segurança.',
      features: ['Emissão de faturas', 'Histórico de pagamentos', 'Envio automático por e-mail'],
      color: 'from-red-500 to-red-600'
    }
  ]

  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
           Categorias de <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Tutoriais</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           Explore nossa biblioteca completa de tutoriais organizados por grupos de funcionalidades.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="text-white" size={28} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Ver tutoriais
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardTutoriais
