// LukUnifiedSearch - Busca unificada com chat do Luk
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MessageCircle, BookOpen, ArrowRight, Clock, Bot, User, Eraser } from 'lucide-react';
import { useTutorialModal } from '../../../../contexts/TutorialModalContext';
import apiClient from '../../../../infrastructure/api/client.js';
import './LukUnifiedSearch.css';

const LukUnifiedSearch = ({ className = '', placeholder = "Busque tutoriais, funcionalidades, PDV, Retaguarda, Fatura Web...", isModal = false }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { openModal } = useTutorialModal();

  const scrollToBottom = () => {
    // Scroll apenas dentro do container de resultados, não na página
    if (messagesEndRef.current && showResults) {
      const resultsContainer = messagesEndRef.current.closest('.luk-search-results');
      if (resultsContainer) {
        resultsContainer.scrollTo({
          top: resultsContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    if (showResults) {
      scrollToBottom();
    }
  }, [messages, showResults]);

  // Fechar resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: query,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsSearching(true);
    setShowResults(true);
    setQuery('');

    try {
      const response = await apiClient.get('/api/v1/search', {
        params: { q: query.trim(), limit: 10 }
      });

      const { answer, results } = response.data;

      const lukMessage = {
        id: Date.now() + 1,
        text: answer,
        sender: 'luk',
        results: results || [],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, lukMessage]);
    } catch (error) {
      console.error('Erro ao buscar:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Desculpe, ocorreu um erro ao buscar. Tente novamente.',
        sender: 'luk',
        results: [],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      // Prevenir scroll da página antes de executar a busca
      const currentScrollY = window.scrollY;
      handleSearch(e);
      // Restaurar posição do scroll após um pequeno delay
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
      }, 0);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowResults(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setQuery('');
    setShowResults(false);
  };

  const handleOpenTutorial = (tutorialSlug, viewMode = 'full', stepId = null) => {
    if (tutorialSlug) {
      openModal(tutorialSlug, { viewMode, stepId });
      // Se já estamos no modal, apenas atualiza o conteúdo, não fecha os resultados
      if (!isModal) {
        setShowResults(false);
      }
    }
  };

  return (
    <div ref={searchRef} className={`relative max-w-4xl mx-auto ${isModal ? 'mb-0' : 'mb-8'} ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => messages.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          className="w-full pl-16 py-6 text-base md:text-lg bg-white border-4 border-blue-200 rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-900 font-medium leading-relaxed"
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
            letterSpacing: '0.01em',
            paddingRight: messages.length > 0 && query ? '5.5rem' : query ? '3.5rem' : messages.length > 0 ? '3.5rem' : '4rem'
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-4" style={{ pointerEvents: 'auto', zIndex: 10 }}>
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              style={{ display: 'flex', visibility: 'visible' }}
              title="Limpar chat"
              aria-label="Limpar chat"
            >
              <Eraser className="h-5 w-5" style={{ display: 'block' }} />
            </button>
          )}
          {query && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              title="Limpar texto e fechar"
              aria-label="Limpar texto e fechar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Área de Mensagens/Resultados */}
      {showResults && (messages.length > 0 || isSearching) && (
        <div className="luk-search-results absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-blue-100 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-6 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              Buscando...
            </div>
          ) : (
            <div className="py-2">
              {messages.map((message) => (
                <div key={message.id} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                  {message.sender === 'user' ? (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{message.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 mb-3">{message.text}</p>
                        {message.results && message.results.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {message.results.map((result, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                      <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                      {result.title}
                                    </h3>
                                    {result.snippet && (
                                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                        {result.snippet}
                                      </p>
                                    )}
                                    <div className="flex items-center gap-2 flex-wrap">
                                      {result.type === 'step' && result.stepSortOrder && (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                          Passo {result.stepSortOrder}
                                        </span>
                                      )}
                                      {result.categoryName && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                          {result.categoryName}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                      {result.type === 'step' && result.tutorialSlug && (
                                        <>
                                          <button
                                            onClick={() => handleOpenTutorial(result.tutorialSlug, 'step', result.stepId)}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                          >
                                            <BookOpen className="w-4 h-4" />
                                            Mostrar passo
                                          </button>
                                          <button
                                            onClick={() => handleOpenTutorial(result.tutorialSlug, 'full')}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                          >
                                            Ver tutorial completo
                                          </button>
                                        </>
                                      )}
                                      {result.type === 'tutorial' && result.tutorialSlug && (
                                        <button
                                          onClick={() => handleOpenTutorial(result.tutorialSlug, 'full')}
                                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                        >
                                          <ArrowRight className="w-4 h-4" />
                                          Abrir tutorial
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LukUnifiedSearch;
export { LukUnifiedSearch };

