import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function TrainingScheduler() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    trainingType: '',
    date: '',
    time: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formata a mensagem para WhatsApp
    const message = `Olá! Gostaria de agendar um treinamento.

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Empresa:* ${formData.company || 'Não informado'}
*Tipo de Treinamento:* ${formData.trainingType}
*Data:* ${formData.date || 'Não informada'}
*Horário:* ${formData.time || 'Não informado'}

*Mensagem:*
${formData.message || 'Sem mensagem adicional'}`;

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp (substitua pelo número real)
    const whatsappNumber = '5511999999999';
    
    // Abre o WhatsApp Web/App
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        trainingType: '',
        date: '',
        time: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="agendamento" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6"
          >
            <Calendar className="text-white" size={40} />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agende seu Treinamento
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato via WhatsApp para confirmar o agendamento
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            {/* Nome e Email */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <User size={18} className="text-blue-600" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Seu nome completo"
                />
                <User size={20} className="absolute left-4 top-11 text-gray-400" />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Mail size={18} className="text-blue-600" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="seu@email.com"
                />
                <Mail size={20} className="absolute left-4 top-11 text-gray-400" />
              </div>
            </div>

            {/* Telefone e Empresa */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Phone size={18} className="text-blue-600" />
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="(11) 99999-9999"
                />
                <Phone size={20} className="absolute left-4 top-11 text-gray-400" />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Building size={18} className="text-blue-600" />
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Nome da empresa"
                />
                <Building size={20} className="absolute left-4 top-11 text-gray-400" />
              </div>
            </div>

            {/* Tipo de Treinamento */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Tipo de Treinamento *
              </label>
              <select
                name="trainingType"
                required
                value={formData.trainingType}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                <option value="">Selecione o tipo de treinamento...</option>
                <option value="Conciliação Bancária">Conciliação Bancária</option>
                <option value="Atendimento ao Cliente">Atendimento ao Cliente</option>
                <option value="Sistema ERP">Sistema ERP</option>
                <option value="Sistema PDV">Sistema PDV</option>
                <option value="Processos Operacionais">Processos Operacionais</option>
                <option value="Treinamento Personalizado">Treinamento Personalizado</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Data e Horário */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
                  Data Preferencial
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" />
                  Horário Preferencial
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-600" />
                Mensagem Adicional
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Conte-nos mais sobre suas necessidades ou dúvidas..."
              ></textarea>
            </div>

            {/* Botão de Envio */}
            <motion.button
              type="submit"
              disabled={isSubmitted}
              whileHover={!isSubmitted ? { scale: 1.02 } : {}}
              whileTap={!isSubmitted ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                isSubmitted
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  Enviado com sucesso!
                </>
              ) : (
                <>
                  <Send size={24} />
                  Enviar Agendamento via WhatsApp
                </>
              )}
            </motion.button>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-green-600 mt-4 text-sm font-medium"
              >
                Redirecionando para o WhatsApp...
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Informações Adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Clock,
              title: 'Horário de Atendimento',
              content: 'Segunda a Sexta\n8h às 18h',
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: Phone,
              title: 'Contato Direto',
              content: '(11) 98765-4321\ncontato@lukos.com.br',
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: Calendar,
              title: 'Confirmação Rápida',
              content: 'Resposta em até\n24 horas úteis',
              color: 'from-indigo-500 to-indigo-600'
            }
          ].map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${info.color} mb-4`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{info.title}</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">{info.content}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
