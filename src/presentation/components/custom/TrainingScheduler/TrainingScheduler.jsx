import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useCreateAppointment } from '../../../../hooks/useAppointments.js';
import { useTrainingConfigsByType } from '../../../../hooks/useTrainingConfigs.js';
import TrainingCalendar from '../../shared/TrainingCalendar.jsx';
import toast from 'react-hot-toast';

export default function TrainingScheduler() {
  const createAppointmentMutation = useCreateAppointment();
  const { data: trainingTypes = [], isLoading: isLoadingTypes } = useTrainingConfigsByType('training_type');
  const { data: modalities = [], isLoading: isLoadingModalities } = useTrainingConfigsByType('modality');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    trainingType: '',
    modality: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Salvar agendamento no banco de dados
      await createAppointmentMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        trainingType: formData.trainingType || null,
        modality: formData.modality || null,
        scheduledDate: formData.date || null,
        scheduledTime: formData.time || null,
        message: formData.message || null,
      });

      setIsSubmitted(true);
      toast.success('Agendamento enviado com sucesso! Nossa equipe entrará em contato em breve.');

      // Formata a mensagem para WhatsApp (opcional)
      const whatsappMessage = `Olá! Gostaria de agendar um treinamento.

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Empresa:* ${formData.company || 'Não informado'}
*Tipo de Treinamento:* ${formData.trainingType}
*Modalidade:* ${formData.modality || 'Não informado'}
*Data:* ${formData.date || 'Não informada'}
*Horário:* ${formData.time || 'Não informado'}

*Mensagem:*
${formData.message || 'Sem mensagem adicional'}`;

      // Codifica a mensagem para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Número do WhatsApp (substitua pelo número real)
      const whatsappNumber = '5511999999999';

      // Abre o WhatsApp Web/App (opcional - pode ser removido se não quiser)
      // window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          trainingType: '',
          modality: '',
          date: '',
          time: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast.error('Erro ao enviar agendamento. Por favor, tente novamente.');
    }
  };

  return (
    <section id="agendamento" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-emerald-600 to-green-500 rounded-3xl shadow-xl mb-8 border border-gray-200"
          >
            <Calendar className="text-white" size={44} />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase mb-6 tracking-tighter">
            AGENDE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">SEU TREINAMENTO</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Nossa equipe entrará em contato via WhatsApp para confirmar o melhor horário para sua equipe. Tecnologia é sobre pessoas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-200"
        >
          <form onSubmit={handleSubmit} className="p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nome Completo *</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5CF6] transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-12 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Email Corporativo *</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5CF6] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-12 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Whatsapp *</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5CF6] transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-12 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nome da Empresa</label>
                <div className="relative group">
                  <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5CF6] transition-colors" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-12 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                    placeholder="Sua empresa"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">O que deseja aprender? *</label>
                <select
                  name="trainingType"
                  required
                  value={formData.trainingType}
                  onChange={handleChange}
                  disabled={isLoadingTypes}
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {isLoadingTypes ? 'Carregando...' : 'Selecione o treinamento...'}
                  </option>
                  {trainingTypes.map((type) => (
                    <option key={type.id} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Modalidade *</label>
                <select
                  name="modality"
                  required
                  value={formData.modality}
                  onChange={handleChange}
                  disabled={isLoadingModalities}
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {isLoadingModalities ? 'Carregando...' : 'Selecione a modalidade...'}
                  </option>
                  {modalities.map((modality) => (
                    <option key={modality.id} value={modality.value}>
                      {modality.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-8 space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Selecione Data e Horário *</label>
              <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
                <TrainingCalendar
                  selectedDate={formData.date}
                  selectedTime={formData.time}
                  onDateChange={(date) => setFormData(prev => ({ ...prev, date }))}
                  onTimeChange={(time) => setFormData(prev => ({ ...prev, time }))}
                  className="text-gray-900"
                />
              </div>
            </div>

            <div className="mb-12 space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Mensagem ou Dúvida</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-[#8B5CF6] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all resize-none placeholder:text-gray-400"
                placeholder="Escreva sua mensagem aqui"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitted}
              whileHover={!isSubmitted ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitted ? { scale: 0.98 } : {}}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm md:text-base transition-all flex items-center justify-center gap-4 ${isSubmitted
                ? 'bg-green-50 text-green-700 border border-green-300 cursor-not-allowed shadow-sm'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-6 h-6" /> SOLICITAÇÃO ENVIADA
                </>
              ) : (
                <>
                  <Send size={20} /> INICIAR AGENDAMENTO
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Informações Adicionais */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              title: 'Atendimento',
              content: 'Segunda a Sexta das\n08:30 às 17:30',
              border: 'border-blue-500/20'
            },
            {
              icon: Phone,
              title: 'Contato Direto',
              content: '(11) 4858-8429\nsuporte@lukos.com.br',
              border: 'border-[#8B5CF6]/20'
            },
            {
              icon: Calendar,
              title: 'Confirmação',
              content: 'Resposta em até\n24 horas úteis',
              border: 'border-purple-500/20'
            }
          ].map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`p-10 bg-gray-50 border ${info.border} rounded-3xl hover:border-purple-300 hover:shadow-md transition-all group`}
              >
                <div className="inline-flex p-4 rounded-2xl bg-white border border-gray-200 mb-6 group-hover:scale-110 group-hover:bg-purple-50 group-hover:border-purple-300 transition-all duration-500">
                  <Icon className="text-[#8B5CF6]" size={32} />
                </div>
                <h3 className="font-black text-gray-900 uppercase tracking-widest mb-3 text-lg">{info.title}</h3>
                <p className="text-gray-600 text-sm font-bold uppercase leading-relaxed whitespace-pre-line tracking-wider">{info.content}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
