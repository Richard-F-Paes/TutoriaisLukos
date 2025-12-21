import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clock } from 'lucide-react';
import { useAvailableSlots } from '../../../hooks/useAvailability.js';
import { format, isSameDay, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import './TrainingCalendar.css';

// Função auxiliar para normalizar data (string YYYY-MM-DD ou Date object)
const normalizeDate = (dateInput) => {
  if (!dateInput) return null;
  
  // Se for string no formato YYYY-MM-DD, parse diretamente
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [year, month, day] = dateInput.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  
  // Se for Date object ou outra string, normalizar
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return null;
  
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Função auxiliar para comparar datas (apenas dia, mês e ano)
const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return isSameDay(date1, date2);
};

const TrainingCalendar = ({ selectedDate, selectedTime, onDateChange, onTimeChange, className = '' }) => {
  // Normalizar a data inicial - usar função para garantir que seja calculada apenas uma vez na inicialização
  const [localDate, setLocalDate] = useState(() => normalizeDate(selectedDate));
  
  // Formatar data para YYYY-MM-DD para buscar slots
  const dateString = useMemo(() => {
    if (!localDate) return null;
    return format(localDate, 'yyyy-MM-dd');
  }, [localDate]);

  const { data: slotsData, isLoading: isLoadingSlots } = useAvailableSlots(dateString);
  const availableSlots = slotsData?.data || [];

  // Sincronizar com selectedDate do parent usando useMemo para comparar
  const normalizedSelectedDate = useMemo(() => normalizeDate(selectedDate), [selectedDate]);
  const lastSyncedDateRef = useRef(normalizedSelectedDate);
  
  useEffect(() => {
    // Só atualizar se a data realmente mudou (evitar loops e re-renderizações desnecessárias)
    const currentNormalized = normalizedSelectedDate;
    const lastSynced = lastSyncedDateRef.current;
    
    if (currentNormalized && lastSynced) {
      if (!isSameDate(currentNormalized, lastSynced)) {
        setLocalDate(currentNormalized);
        lastSyncedDateRef.current = currentNormalized;
      }
    } else if (currentNormalized !== lastSynced) {
      setLocalDate(currentNormalized);
      lastSyncedDateRef.current = currentNormalized;
    }
  }, [normalizedSelectedDate]);

  const handleDateSelect = useCallback((date) => {
    if (!date) return;
    
    // Normalizar a data para evitar problemas de timezone
    const normalizedDate = normalizeDate(date);
    if (!normalizedDate) return;
    
    // Atualizar estado local e ref imediatamente para feedback visual
    setLocalDate(normalizedDate);
    lastSyncedDateRef.current = normalizedDate;
    
    // Formatar e enviar para o parent
    const dateStr = format(normalizedDate, 'yyyy-MM-dd');
    onDateChange?.(dateStr);
    
    // Limpar horário selecionado ao mudar data
    onTimeChange?.('');
  }, [onDateChange, onTimeChange]);

  const handleTimeSelect = useCallback((time) => {
    onTimeChange?.(time);
  }, [onTimeChange]);

  // Função para determinar se um dia deve estar desabilitado
  const tileDisabled = useCallback(({ date, view }) => {
    // Desabilitar datas passadas
    if (view === 'month') {
      const today = startOfDay(new Date());
      return date < today;
    }
    return false;
  }, []);

  // Função para estilizar dias no calendário
  const tileClassName = useCallback(({ date, view }) => {
    if (view !== 'month') return '';
    
    const classes = [];
    
    // Destacar data selecionada usando isSameDay do date-fns
    if (localDate && isSameDay(localDate, date)) {
      classes.push('selected-day');
    }
    
    return classes.join(' ');
  }, [localDate]);

  // Calcular data mínima (hoje) uma vez
  const minDate = useMemo(() => startOfDay(new Date()), []);

  return (
    <div className={`training-calendar ${className}`}>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateSelect}
          value={localDate}
          locale="pt-BR"
          minDate={minDate}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
        />
      </div>

      {localDate && (
        <div className="time-slots-container">
          <div className="time-slots-header">
            <Clock size={18} />
            <h3>Horários Disponíveis - {format(localDate, "dd 'de' MMMM", { locale: ptBR })}</h3>
          </div>

          {isLoadingSlots ? (
            <div className="loading-slots">Carregando horários...</div>
          ) : availableSlots.length === 0 ? (
            <div className="no-slots">
              Não há horários disponíveis para esta data
            </div>
          ) : (
            <div className="time-slots-grid">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  className={`time-slot ${!slot.available ? 'unavailable' : ''} ${selectedTime === slot.time ? 'selected' : ''}`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!localDate && (
        <div className="calendar-hint">
          Selecione uma data no calendário para ver os horários disponíveis
        </div>
      )}
    </div>
  );
};

export default TrainingCalendar;

