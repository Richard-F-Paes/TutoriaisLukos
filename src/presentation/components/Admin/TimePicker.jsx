import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown, X } from 'lucide-react';

const TimePicker = ({ value, onChange, disabled = false, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [inputValue, setInputValue] = useState(value || '00:00');
  const containerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      setHour(h || 0);
      setMinute(m || 0);
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleTimeChange = (newHour, newMinute) => {
    const formattedTime = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
    onChange(formattedTime);
    setHour(newHour);
    setMinute(newMinute);
  };

  const adjustHour = (delta) => {
    let newHour = hour + delta;
    if (newHour < 0) newHour = 23;
    if (newHour > 23) newHour = 0;
    handleTimeChange(newHour, minute);
  };

  const adjustMinute = (delta) => {
    let newMinute = minute + delta;
    if (newMinute < 0) newMinute = 59;
    if (newMinute > 59) newMinute = 0;
    handleTimeChange(hour, newMinute);
  };


  const handleTimeInputChange = (e) => {
    let newValue = e.target.value;
    
    // Remover tudo que não é número ou dois pontos
    newValue = newValue.replace(/[^\d:]/g, '');
    
    // Se já tem dois pontos, validar formato HH:mm
    if (newValue.includes(':')) {
      const parts = newValue.split(':');
      let hourPart = parts[0] || '';
      let minutePart = parts[1] || '';
      
      // Limitar hora a 2 dígitos
      if (hourPart.length > 2) hourPart = hourPart.slice(0, 2);
      if (hourPart && parseInt(hourPart) > 23) hourPart = '23';
      
      // Limitar minuto a 2 dígitos
      if (minutePart.length > 2) minutePart = minutePart.slice(0, 2);
      if (minutePart && parseInt(minutePart) > 59) minutePart = '59';
      
      // Atualizar apenas o estado local durante digitação
      setInputValue(`${hourPart}:${minutePart}`);
      
      // Se ambos têm 2 dígitos, formatar e atualizar valor
      if (hourPart.length === 2 && minutePart.length === 2) {
        const h = String(Math.min(parseInt(hourPart) || 0, 23)).padStart(2, '0');
        const m = String(Math.min(parseInt(minutePart) || 0, 59)).padStart(2, '0');
        const formatted = `${h}:${m}`;
        setInputValue(formatted);
        onChange(formatted);
      }
      return;
    }
    
    // Se não tem dois pontos, permitir digitação livre
    const cleanValue = newValue.replace(/\D/g, '');
    
    // Atualizar estado local durante digitação
    if (cleanValue.length === 0) {
      setInputValue('');
    } else if (cleanValue.length <= 4) {
      // Permitir digitação livre até 4 dígitos
      setInputValue(cleanValue);
      
      // Se tem 4 dígitos, formatar automaticamente
      if (cleanValue.length === 4) {
        const hour = Math.min(parseInt(cleanValue.slice(0, 2)) || 0, 23);
        const minute = Math.min(parseInt(cleanValue.slice(2, 4)) || 0, 59);
        const formatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        setInputValue(formatted);
        onChange(formatted);
      }
    } else {
      // Mais de 4 dígitos, manter apenas os 4 primeiros
      const limited = cleanValue.slice(0, 4);
      setInputValue(limited);
      const hour = Math.min(parseInt(limited.slice(0, 2)) || 0, 23);
      const minute = Math.min(parseInt(limited.slice(2, 4)) || 0, 59);
      const formatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      setInputValue(formatted);
      onChange(formatted);
    }
  };
  
  const handleTimeInputBlur = (e) => {
    // Formatar ao perder foco, sempre completando valores incompletos
    // Usar o valor do input ou do estado local
    let finalValue = e?.target?.value || inputValue || '';
    
    if (!finalValue || finalValue.trim() === '') {
      const formatted = '00:00';
      setInputValue(formatted);
      onChange(formatted);
      return;
    }
    
    // Se já tem dois pontos, validar e formatar
    if (finalValue.includes(':')) {
      const parts = finalValue.split(':');
      let hourPart = (parts[0] || '').trim();
      let minutePart = (parts[1] || '').trim();
      
      // Completar hora se incompleta
      const hour = Math.min(Math.max(parseInt(hourPart) || 0, 0), 23);
      
      // Completar minuto se incompleto
      let minute = 0;
      if (minutePart.length > 0) {
        minute = Math.min(Math.max(parseInt(minutePart) || 0, 0), 59);
      }
      
      const formatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      setInputValue(formatted);
      onChange(formatted);
      return;
    }
    
    // Se não tem dois pontos, formatar baseado nos dígitos
    const cleanValue = finalValue.replace(/\D/g, '');
    
    if (cleanValue.length === 0) {
      const formatted = '00:00';
      setInputValue(formatted);
      onChange(formatted);
    } else if (cleanValue.length === 1) {
      // 1 dígito: completar como hora (ex: "1" -> "01:00", "4" -> "04:00")
      const hour = Math.min(Math.max(parseInt(cleanValue) || 0, 0), 23);
      const formatted = `${String(hour).padStart(2, '0')}:00`;
      setInputValue(formatted);
      onChange(formatted);
    } else if (cleanValue.length === 2) {
      // 2 dígitos: completar como hora (ex: "11" -> "11:00", "14" -> "14:00")
      const hour = Math.min(Math.max(parseInt(cleanValue) || 0, 0), 23);
      const formatted = `${String(hour).padStart(2, '0')}:00`;
      setInputValue(formatted);
      onChange(formatted);
    } else if (cleanValue.length === 3) {
      // 3 dígitos: primeiro como hora, últimos dois como minuto (ex: "143" -> "01:43")
      const hour = Math.min(Math.max(parseInt(cleanValue.slice(0, 1)) || 0, 0), 23);
      const minute = Math.min(Math.max(parseInt(cleanValue.slice(1, 3)) || 0, 0), 59);
      const formatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      setInputValue(formatted);
      onChange(formatted);
    } else {
      // 4 dígitos: completar normalmente
      const hour = Math.min(Math.max(parseInt(cleanValue.slice(0, 2)) || 0, 0), 23);
      const minute = Math.min(Math.max(parseInt(cleanValue.slice(2, 4)) || 0, 0), 59);
      const formatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      setInputValue(formatted);
      onChange(formatted);
    }
  };

  return (
    <div ref={containerRef} className="time-picker-container" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleTimeInputChange}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
              // Pequeno delay para garantir que o valor foi atualizado
              setTimeout(() => {
                handleTimeInputBlur(e);
              }, 0);
            }}
            onKeyDown={(e) => {
              // Formatar ao pressionar Enter
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
            placeholder="00:00"
            disabled={disabled}
            required
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              paddingLeft: '2.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              color: disabled ? '#9ca3af' : '#1f2937',
              backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
              transition: 'all 0.2s',
              boxSizing: 'border-box',
              cursor: disabled ? 'not-allowed' : 'text',
              opacity: disabled ? 0.6 : 1,
              fontFamily: 'monospace',
            }}
            onFocus={(e) => {
              if (!disabled) {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.outline = 'none';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Clock size={18} color={disabled ? '#9ca3af' : '#6b7280'} />
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            // Garantir formatação antes de abrir o seletor
            if (!disabled) {
              const input = e.target.closest('.time-picker-container')?.querySelector('input[type="text"]');
              if (input) {
                handleTimeInputBlur({ target: input });
              }
              setIsOpen(!isOpen);
            }
          }}
          disabled={disabled}
          style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: disabled ? '#9ca3af' : '#6b7280',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.target.style.backgroundColor = '#f9fafb';
              e.target.style.borderColor = '#3b82f6';
              e.target.style.color = '#3b82f6';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d1d5db';
              e.target.style.color = '#6b7280';
            }
          }}
        >
          <Clock size={20} />
        </button>
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required
          step="1"
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
            height: 0,
          }}
          aria-hidden="true"
        />
      </div>

      {isOpen && !disabled && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb',
            zIndex: 1000,
            minWidth: '240px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Selecionar Horário</h4>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                padding: '0.25rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Hora */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Hora
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => adjustHour(1)}
                  style={{
                    padding: '0.25rem',
                    border: 'none',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  <ChevronUp size={16} color="#374151" />
                </button>
                <div
                  style={{
                    width: '60px',
                    padding: '0.75rem 0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {String(hour).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => adjustHour(-1)}
                  style={{
                    padding: '0.25rem',
                    border: 'none',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  <ChevronDown size={16} color="#374151" />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#1f2937', marginTop: '1.5rem' }}>:</div>

            {/* Minuto */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Minuto
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => adjustMinute(5)}
                  style={{
                    padding: '0.25rem',
                    border: 'none',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  <ChevronUp size={16} color="#374151" />
                </button>
                <div
                  style={{
                    width: '60px',
                    padding: '0.75rem 0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {String(minute).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => adjustMinute(-5)}
                  style={{
                    padding: '0.25rem',
                    border: 'none',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  <ChevronDown size={16} color="#374151" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;

