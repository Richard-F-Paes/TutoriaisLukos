import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Search, Video } from 'lucide-react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! 👋 Sou Luk, o assistente virtual da Lukos.',
      sender: 'bot',
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: Video, label: 'Ver Tutoriais', action: 'tutorials' },
    { icon: Search, label: 'Buscar Ajuda', action: 'help' },
    { icon: MessageCircle, label: 'Falar com Suporte', action: 'support' }
  ];

  const tutorialDatabase = [
    // Cadastros
    { id: 'cadastro-clientes', title: 'Cadastro de Clientes', category: 'Cadastros', duration: '10 min', keywords: ['cliente', 'cadastro', 'cpf', 'cnpj', 'clientes'] },
    { id: 'cadastro-funcionarios', title: 'Cadastro de Funcionários', category: 'Cadastros', duration: '15 min', keywords: ['funcionário', 'funcionarios', 'cadastro', 'frentista', 'comissão'] },
    { id: 'cadastro-fornecedores', title: 'Cadastro de Fornecedores', category: 'Cadastros', duration: '12 min', keywords: ['fornecedor', 'fornecedores', 'cadastro', 'fornecedor'] },
    { id: 'cadastro-produtos', title: 'Cadastro de Produtos', category: 'Produtos', duration: '18 min', keywords: ['produto', 'produtos', 'cadastro', 'código', 'barras'] },
    { id: 'cadastro-clientes-cpf', title: 'Cadastro de Clientes com CPF', category: 'Cadastros', duration: '10 min', keywords: ['cliente', 'cpf', 'pessoa', 'física'] },
    
    // PDV Pista
    { id: 'venda-combustivel', title: 'Venda de Combustível', category: 'PDV Pista', duration: '15 min', keywords: ['venda', 'combustível', 'combustivel', 'pista', 'abastecimento', 'bomba'] },
    { id: 'afericao-bombas', title: 'Aferição de Bombas', category: 'PDV Pista', duration: '12 min', keywords: ['aferição', 'afericao', 'bomba', 'bombas', 'calibração'] },
    { id: 'encerramento-turno', title: 'Encerramento de Turno', category: 'PDV Pista', duration: '20 min', keywords: ['encerramento', 'turno', 'fechamento', 'caixa', 'fechar'] },
    { id: 'medicao-tanques', title: 'Medição de Tanques', category: 'PDV Pista', duration: '10 min', keywords: ['medição', 'medicao', 'tanque', 'tanques', 'estoque', 'combustível'] },
    
    // PDV Loja
    { id: 'venda-produtos-loja', title: 'Venda de Produtos na Loja', category: 'PDV Loja', duration: '16 min', keywords: ['venda', 'produto', 'loja', 'conveniência', 'conveniencia'] },
    { id: 'codigo-rapido-loja', title: 'Código Rápido na Loja', category: 'PDV Loja', duration: '8 min', keywords: ['código', 'codigo', 'rápido', 'rapido', 'loja'] },
    
    // Relatórios
    { id: 'dashboard-principal', title: 'Dashboard Principal', category: 'Relatórios', duration: '15 min', keywords: ['dashboard', 'relatório', 'relatorio', 'gerencial', 'análise'] },
    { id: 'relatorio-parcial-caixa-pista', title: 'Relatório Parcial de Caixa - Pista', category: 'Relatórios', duration: '10 min', keywords: ['relatório', 'relatorio', 'parcial', 'caixa', 'pista'] },
    
    // Outros
    { id: 'cancelar-venda-pista', title: 'Cancelar Venda na Pista', category: 'PDV Pista', duration: '8 min', keywords: ['cancelar', 'venda', 'pista', 'cancelamento'] },
    { id: 'desconto-pista', title: 'Aplicar Desconto na Pista', category: 'PDV Pista', duration: '10 min', keywords: ['desconto', 'pista', 'promoção', 'promocao'] }
  ];

  const findRelevantTutorials = (query) => {
    const lowerQuery = query.toLowerCase();
    return tutorialDatabase.filter(tutorial => 
      tutorial.keywords.some(keyword => lowerQuery.includes(keyword)) ||
      tutorial.title.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Busca por tutoriais
    const relevantTutorials = findRelevantTutorials(lowerMessage);
    
    if (relevantTutorials.length > 0) {
      return {
        id: Date.now(),
        text: 'Encontrei estes tutoriais que podem ajudar:',
        sender: 'bot',
        type: 'tutorial',
        tutorials: relevantTutorials
      };
    }

    // Respostas específicas
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('plano')) {
      return {
        id: Date.now(),
        text: 'Nossos planos são personalizados de acordo com o tamanho do seu posto. Entre em contato pelo telefone (11) 98765-4321 ou email contato@lukos.com.br para receber uma proposta! 📞',
        sender: 'bot'
      };
    }

    if (lowerMessage.includes('suporte') || lowerMessage.includes('ajuda') || lowerMessage.includes('problema')) {
      return {
        id: Date.now(),
        text: 'Nossa equipe de suporte está disponível de segunda a sexta, das 8h às 18h:\n\n📞 Telefone: (11) 98765-4321\n📧 Email: suporte@lukos.com.br\n💬 Chat online no portal do cliente',
        sender: 'bot'
      };
    }

    if (lowerMessage.includes('demonstração') || lowerMessage.includes('demo') || lowerMessage.includes('testar')) {
      return {
        id: Date.now(),
        text: 'Ótimo! Podemos agendar uma demonstração gratuita do sistema. Por favor, entre em contato pelo email contato@lukos.com.br ou telefone (11) 98765-4321 para agendar o melhor horário! 🎯',
        sender: 'bot'
      };
    }

    if (lowerMessage.includes('erp') || lowerMessage.includes('sistema')) {
      return {
        id: Date.now(),
        text: 'Nosso ERP é especializado para postos de combustível! Oferece:\n\n✅ Controle de bombas e tanques\n✅ Gestão financeira completa\n✅ Controle de frentistas\n✅ Emissão de notas fiscais\n✅ Relatórios gerenciais\n\nGostaria de ver tutoriais sobre alguma funcionalidade específica?',
        sender: 'bot'
      };
    }

    if (lowerMessage.includes('pdv') || lowerMessage.includes('venda')) {
      return {
        id: Date.now(),
        text: 'Nosso PDV é integrado com as bombas e perfeito para a loja de conveniência! Principais recursos:\n\n✅ Vendas rápidas e intuitivas\n✅ Integração automática com bombas\n✅ Múltiplas formas de pagamento\n✅ Controle de crédito para clientes\n\nPosso mostrar tutoriais sobre o PDV?',
        sender: 'bot'
      };
    }

    if (lowerMessage.includes('tutorial') || lowerMessage.includes('vídeo') || lowerMessage.includes('aprender')) {
      return {
        id: Date.now(),
        text: 'Temos uma biblioteca completa de tutoriais gratuitos! Sobre qual assunto você gostaria de aprender?\n\n• Configuração inicial\n• Gestão de combustíveis\n• Operação do PDV\n• Fechamento de caixa\n• Notas fiscais\n• Relatórios',
        sender: 'bot'
      };
    }

    // Resposta padrão
    return {
      id: Date.now(),
      text: 'Entendo! Posso ajudar você com:\n\n🎥 Tutoriais sobre o sistema\n📞 Informações de contato do suporte\n💼 Detalhes sobre nossos produtos\n📊 Demonstrações do sistema\n\nO que você gostaria de saber?',
      sender: 'bot'
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simula digitação do bot
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleQuickAction = (action) => {
    let message = '';
    if (action === 'tutorials') {
      message = 'Quero ver os tutoriais disponíveis';
    } else if (action === 'help') {
      message = 'Preciso de ajuda com o sistema';
    } else if (action === 'support') {
      message = 'Como falo com o suporte?';
    }
    
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simula digitação do bot
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.5), 0 10px 10px -5px rgba(139, 92, 246, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 text-white rounded-full shadow-2xl flex items-center justify-center z-50 group"
            style={{
              background: 'radial-gradient(circle at center, #6c2396 0%, #7d3fa3 60%, #8b4db0 100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'radial-gradient(circle at center, #7d3fa3 0%, #8b4db0 60%, #9d5cbf 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'radial-gradient(circle at center, #6c2396 0%, #7d3fa3 60%, #8b4db0 100%)';
            }}
            aria-label="Abrir assistente virtual Luk"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-end justify-end p-6 pointer-events-none">
          <Dialog.Panel
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[400px] h-[600px] shadow-2xl flex flex-col overflow-hidden border-2 border-gray-200 rounded-lg bg-white pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center justify-between" style={{
              background: 'radial-gradient(circle at center, #6c2396 0%, #7d3fa3 60%, #8b4db0 100%)'
            }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <img src="logo.png" alt="Lukos" className="w-full h-full object-cover bg-white rounded-full" />
                </div>
                <div>
                  <Dialog.Title className="font-semibold">Assistente Luk</Dialog.Title>
                  <div className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Fechar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              role="log"
              aria-live="polite"
              aria-atomic="false"
              aria-label="Mensagens do chat"
            >
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0.1 : 0 }}
                    className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <img src="logo.png" alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 max-w-[80%]">
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                        }`}
                        style={message.sender === 'user' ? {
                          background: 'radial-gradient(circle at center, #6c2396 0%, #7d3fa3 60%, #8b4db0 100%)'
                        } : {}}
                      >
                        <p className={`whitespace-pre-line ${
                          message.sender === 'user' 
                            ? 'text-white' 
                            : 'text-gray-800'
                        }`}>{message.text}</p>
                      </div>
                      
                      {message.type === 'tutorial' && message.tutorials && (
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: 0.2 }}
                        >
                          {message.tutorials.map((tutorial, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <Link
                                to={`/tutorial/${tutorial.id}`}
                                className="block bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 hover:border-purple-300"
                              >
                                <div className="flex items-start gap-2">
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Video className="w-4 h-4 text-purple-600" aria-hidden="true" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-purple-700 mb-1 font-semibold hover:text-purple-800 transition-colors">
                                      {tutorial.title}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-700 border-purple-200">
                                        {tutorial.category}
                                      </span>
                                      <span className="text-xs text-gray-600 font-medium">
                                        {tutorial.duration}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <AnimatePresence>
              {messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-white border-t overflow-hidden"
                >
                  <div className="text-xs text-purple-600 font-semibold mb-2">Ações rápidas:</div>
                  <div className="flex gap-2">
                    {quickActions.map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 hover:text-purple-800 transition-colors text-xs font-medium"
                          aria-label={action.label}
                        >
                          <Icon className="w-3 h-3" aria-hidden="true" />
                          <span className="hidden sm:inline">{action.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Digite sua mensagem
                </label>
                <input
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder:text-gray-400"
                  aria-label="Campo de mensagem do chat"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                  style={{
                    background: 'radial-gradient(circle at center, #6c2396 0%, #7d3fa3 60%, #8b4db0 100%)'
                  }}
                  aria-label="Enviar mensagem"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

