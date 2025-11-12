import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, Send } from 'lucide-react';

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
    <section id="agendamento" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Calendar className="text-blue-600" size={40} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Agende seu Treinamento</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato via WhatsApp para confirmar o agendamento
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all transform flex items-center justify-center gap-3 ${
                isSubmitted
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitted ? (
                <>
                  <span className="animate-spin">✓</span>
                  Enviado com sucesso!
                </>
              ) : (
                <>
                  <Send size={24} />
                  Enviar Agendamento via WhatsApp
                </>
              )}
            </button>

            {isSubmitted && (
              <p className="text-center text-green-600 mt-4 text-sm">
                Redirecionando para o WhatsApp...
              </p>
            )}
          </form>
        </div>

        {/* Div com duas colunas */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            {/* Coluna 1 - Conteúdo aqui */}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            {/* Coluna 2 - Conteúdo aqui */}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Clock className="mx-auto text-blue-600 mb-3" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h3>
            <p className="text-gray-600 text-sm">Segunda a Sexta<br />8h às 18h</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Phone className="mx-auto text-blue-600 mb-3" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">Contato Direto</h3>
            <p className="text-gray-600 text-sm">(11) 98765-4321<br />contato@lukos.com.br</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Calendar className="mx-auto text-blue-600 mb-3" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">Confirmação Rápida</h3>
            <p className="text-gray-600 text-sm">Resposta em até<br />24 horas úteis</p>
          </div>
        </div>
      </div>
    </section>
  );
}
