import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

// Duração padrão de um treinamento em minutos
const TRAINING_DURATION_MINUTES = 60;

// Função auxiliar para gerar slots de horário
function generateTimeSlots(startTime, endTime, slotInterval) {
  const slots = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  for (let minutes = startMinutes; minutes < endMinutes; minutes += slotInterval) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    slots.push(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`);
  }
  
  return slots;
}

// Função auxiliar para verificar se é bloqueio de dia inteiro
function isFullDayBlock(rule) {
  return !rule.isActive && rule.slotInterval === 1440;
}

// Função auxiliar para converter "HH:mm" para minutos
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Função auxiliar para converter minutos para "HH:mm"
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Função auxiliar para verificar sobreposição de intervalos de tempo
function hasTimeOverlap(start1Minutes, end1Minutes, start2Minutes, end2Minutes) {
  // Dois intervalos se sobrepõem se: start1 < end2 && end1 > start2
  return start1Minutes < end2Minutes && end1Minutes > start2Minutes;
}

// Função auxiliar para calcular intervalos disponíveis considerando sobreposição parcial
function calculateAvailableRanges(weeklyRules, specificRules) {
  // Se há bloqueio de dia inteiro, retornar vazio
  if (specificRules.some(r => isFullDayBlock(r))) {
    return [];
  }
  
  // Se não há regra semanal, usar apenas específicas ativas
  if (weeklyRules.length === 0) {
    return specificRules
      .filter(r => r.isActive)
      .map(r => ({
        start: timeToMinutes(r.startTime),
        end: timeToMinutes(r.endTime),
        slotInterval: r.slotInterval
      }));
  }
  
  // Para cada regra semanal
  const availableRanges = [];
  for (const weekly of weeklyRules) {
    let weeklyStart = timeToMinutes(weekly.startTime);
    const weeklyEnd = timeToMinutes(weekly.endTime);
    const weeklyInterval = weekly.slotInterval;
    
    // Coletar todas as regras específicas que se sobrepõem com esta semanal
    const overlappingSpecifics = specificRules
      .filter(specific => {
        if (!specific.isActive) return false;
        const specStart = timeToMinutes(specific.startTime);
        const specEnd = timeToMinutes(specific.endTime);
        // Verifica se há sobreposição
        return !(specEnd <= weeklyStart || specStart >= weeklyEnd);
      })
      .map(specific => ({
        start: timeToMinutes(specific.startTime),
        end: timeToMinutes(specific.endTime),
        rule: specific
      }))
      .sort((a, b) => a.start - b.start);
    
    // Se não há sobreposição, adicionar toda a regra semanal
    if (overlappingSpecifics.length === 0) {
      availableRanges.push({
        start: weeklyStart,
        end: weeklyEnd,
        slotInterval: weeklyInterval
      });
      continue;
    }
    
    // Processar cada sobreposição
    let currentStart = weeklyStart;
    for (const specific of overlappingSpecifics) {
      // Se específica cobre 100% da semanal (começa antes ou igual e termina depois ou igual)
      if (specific.start <= weeklyStart && specific.end >= weeklyEnd) {
        // Não adicionar nada, a semanal está totalmente coberta
        currentStart = weeklyEnd;
        break;
      }
      
      // Se específica está completamente dentro da semanal
      if (specific.start > currentStart && specific.end < weeklyEnd) {
        // Adicionar intervalo antes da específica
        if (specific.start > currentStart) {
          availableRanges.push({
            start: currentStart,
            end: specific.start,
            slotInterval: weeklyInterval
          });
        }
        // Continuar após a específica
        currentStart = specific.end;
      }
      // Se específica começa antes ou igual ao início da semanal
      else if (specific.start <= currentStart && specific.end < weeklyEnd) {
        // Ajustar início para depois da específica
        currentStart = Math.max(currentStart, specific.end);
      }
      // Se específica termina depois ou igual ao fim da semanal
      else if (specific.start > currentStart && specific.end >= weeklyEnd) {
        // Adicionar intervalo antes da específica e terminar
        if (specific.start > currentStart) {
          availableRanges.push({
            start: currentStart,
            end: specific.start,
            slotInterval: weeklyInterval
          });
        }
        currentStart = weeklyEnd;
        break;
      }
    }
    
    // Adicionar intervalo restante após todas as específicas
    if (currentStart < weeklyEnd) {
      availableRanges.push({
        start: currentStart,
        end: weeklyEnd,
        slotInterval: weeklyInterval
      });
    }
  }
  
  return availableRanges;
}

// Listar todas as disponibilidades (admin)
router.get('/', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    
    const availabilities = await prisma.trainingAvailability.findMany({
      orderBy: [
        { dayOfWeek: 'asc' },
        { specificDate: 'asc' },
        { startTime: 'asc' },
      ],
    });
    
    res.json({ data: availabilities });
  } catch (error) {
    console.error('Erro ao listar disponibilidades:', error);
    res.status(500).json({ error: 'Erro ao listar disponibilidades' });
  }
});

// Obter slots disponíveis para uma data específica (público - usado no formulário de agendamento)
router.get('/available-slots', async (req, res) => {
  try {
    const prisma = getPrisma();
    const { date } = req.query; // YYYY-MM-DD format
    
    if (!date) {
      return res.status(400).json({ error: 'Data é obrigatória (formato: YYYY-MM-DD)' });
    }
    
    // Parse da data de forma segura para evitar problemas de timezone
    // Quando usamos new Date('YYYY-MM-DD'), o JS pode interpretar como UTC
    // Por isso, vamos parsear manualmente para garantir o timezone local
    const dateParts = date.split('-');
    if (dateParts.length !== 3) {
      return res.status(400).json({ error: 'Data inválida (formato esperado: YYYY-MM-DD)' });
    }
    
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // getMonth() retorna 0-11
    const day = parseInt(dateParts[2], 10);
    
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return res.status(400).json({ error: 'Data inválida' });
    }
    
    // Criar data no timezone local explicitamente
    const dateOnly = new Date(year, month, day);
    if (isNaN(dateOnly.getTime())) {
      return res.status(400).json({ error: 'Data inválida' });
    }
    
    // Calcular dia da semana usando a data no timezone local
    const dayOfWeek = dateOnly.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Buscar regras de disponibilidade que se aplicam a esta data
    // 1. Regras semanais (dayOfWeek não null, specificDate null)
    // 2. Exceções específicas para esta data (specificDate não null, dayOfWeek null)
    const weeklyRules = await prisma.trainingAvailability.findMany({
      where: {
        dayOfWeek: dayOfWeek,
        specificDate: null,
        isActive: true,
      },
    });
    
    const specificRules = await prisma.trainingAvailability.findMany({
      where: {
        specificDate: dateOnly,
        dayOfWeek: null,
      },
    });
    
    // Se há bloqueio de dia inteiro, retornar slots vazios
    if (specificRules.some(r => isFullDayBlock(r))) {
      return res.json({ data: [] });
    }
    
    // Calcular intervalos disponíveis considerando sobreposição parcial
    const availableRanges = calculateAvailableRanges(weeklyRules, specificRules);
    
    if (availableRanges.length === 0) {
      return res.json({ data: [] }); // Nenhuma disponibilidade
    }
    
    // Gerar slots de cada intervalo disponível
    const allSlots = [];
    for (const range of availableRanges) {
      const startTime = minutesToTime(range.start);
      const endTime = minutesToTime(range.end);
      const slots = generateTimeSlots(startTime, endTime, range.slotInterval);
      allSlots.push(...slots.map(slot => ({ time: slot, available: true })));
    }
    
    // Remover duplicatas e ordenar
    const uniqueSlots = Array.from(new Set(allSlots.map(s => s.time))).map(time => {
      return { time, available: true };
    });
    
    // Buscar agendamentos existentes para esta data (apenas confirmed e completed bloqueiam)
    const existingAppointments = await prisma.trainingAppointment.findMany({
      where: {
        scheduledDate: dateOnly,
        status: {
          in: ['confirmed', 'completed'],
        },
      },
      select: {
        scheduledTime: true,
      },
    });
    
    // Converter agendamentos para intervalos [início, fim] em minutos
    const appointmentIntervals = existingAppointments
      .filter(apt => apt.scheduledTime)
      .map(apt => {
        const startMinutes = timeToMinutes(apt.scheduledTime);
        const endMinutes = startMinutes + TRAINING_DURATION_MINUTES;
        return { start: startMinutes, end: endMinutes };
      });
    
    // Marcar slots bloqueados - um slot está bloqueado se está dentro de algum intervalo de agendamento
    const availableSlots = uniqueSlots.map(slot => {
      const slotMinutes = timeToMinutes(slot.time);
      // Verificar se o slot está dentro de algum intervalo de agendamento
      const isBlocked = appointmentIntervals.some(interval => 
        slotMinutes >= interval.start && slotMinutes < interval.end
      );
      return {
        ...slot,
        available: !isBlocked,
      };
    });
    
    // Ordenar por horário
    availableSlots.sort((a, b) => a.time.localeCompare(b.time));
    
    res.json({ data: availableSlots });
  } catch (error) {
    console.error('Erro ao obter slots disponíveis:', error);
    res.status(500).json({ error: 'Erro ao obter slots disponíveis' });
  }
});

// Obter disponibilidade por ID (admin)
router.get('/:id', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const availability = await prisma.trainingAvailability.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    
    if (!availability) {
      return res.status(404).json({ error: 'Disponibilidade não encontrada' });
    }
    
    res.json({ data: availability });
  } catch (error) {
    console.error('Erro ao obter disponibilidade:', error);
    res.status(500).json({ error: 'Erro ao obter disponibilidade' });
  }
});

// Criar disponibilidade (admin)
router.post('/', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { dayOfWeek, specificDate, startTime, endTime, slotInterval, isActive } = req.body;
    
    // Validações
    if (dayOfWeek === null && !specificDate) {
      return res.status(400).json({ error: 'Deve fornecer dayOfWeek ou specificDate' });
    }
    
    if (dayOfWeek !== null && specificDate) {
      return res.status(400).json({ error: 'Não pode fornecer dayOfWeek e specificDate simultaneamente' });
    }
    
    if (dayOfWeek !== null && (dayOfWeek < 0 || dayOfWeek > 6)) {
      return res.status(400).json({ error: 'dayOfWeek deve ser entre 0 (domingo) e 6 (sábado)' });
    }
    
    if (!startTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
      return res.status(400).json({ error: 'startTime inválido (formato: HH:mm)' });
    }
    
    if (!endTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
      return res.status(400).json({ error: 'endTime inválido (formato: HH:mm)' });
    }
    
    // Validar que startTime < endTime
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    
    if (startMinutes >= endMinutes) {
      return res.status(400).json({ error: 'startTime deve ser anterior a endTime' });
    }
    
    if (slotInterval && (slotInterval < 1 || slotInterval > 1440)) {
      return res.status(400).json({ error: 'slotInterval deve ser entre 1 e 1440 minutos' });
    }
    
    const availability = await prisma.trainingAvailability.create({
      data: {
        dayOfWeek: dayOfWeek !== undefined ? (dayOfWeek === null ? null : parseInt(dayOfWeek)) : null,
        specificDate: specificDate ? new Date(specificDate) : null,
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        slotInterval: slotInterval || 30,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'CREATE',
        entityType: 'TrainingAvailability',
        entityId: availability.id,
        newValues: { dayOfWeek: availability.dayOfWeek, specificDate: availability.specificDate, startTime: availability.startTime, endTime: availability.endTime, slotInterval: availability.slotInterval, isActive: availability.isActive },
        ipAddress,
        userAgent,
      });
    }
    
    res.status(201).json({ data: availability });
  } catch (error) {
    console.error('Erro ao criar disponibilidade:', error);
    res.status(500).json({ error: 'Erro ao criar disponibilidade' });
  }
});

// Atualizar disponibilidade (admin)
router.put('/:id', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const availabilityId = parseInt(req.params.id);
    const { dayOfWeek, specificDate, startTime, endTime, slotInterval, isActive } = req.body;
    
    // Verificar se existe
    const existing = await prisma.trainingAvailability.findUnique({
      where: { id: availabilityId },
    });
    
    if (!existing) {
      return res.status(404).json({ error: 'Disponibilidade não encontrada' });
    }
    
    // Preparar dados para atualização
    const updateData = {};
    
    if (dayOfWeek !== undefined) {
      if (dayOfWeek === null && !specificDate && !existing.specificDate) {
        return res.status(400).json({ error: 'Deve fornecer dayOfWeek ou specificDate' });
      }
      updateData.dayOfWeek = dayOfWeek === null ? null : parseInt(dayOfWeek);
    }
    
    if (specificDate !== undefined) {
      if (specificDate && dayOfWeek !== undefined && dayOfWeek !== null) {
        return res.status(400).json({ error: 'Não pode fornecer dayOfWeek e specificDate simultaneamente' });
      }
      updateData.specificDate = specificDate ? new Date(specificDate) : null;
    }
    
    if (startTime !== undefined) {
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
        return res.status(400).json({ error: 'startTime inválido (formato: HH:mm)' });
      }
      updateData.startTime = startTime.trim();
    }
    
    if (endTime !== undefined) {
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
        return res.status(400).json({ error: 'endTime inválido (formato: HH:mm)' });
      }
      updateData.endTime = endTime.trim();
    }
    
    // Validar que startTime < endTime se ambos estão sendo atualizados
    const finalStartTime = updateData.startTime || existing.startTime;
    const finalEndTime = updateData.endTime || existing.endTime;
    const [startH, startM] = finalStartTime.split(':').map(Number);
    const [endH, endM] = finalEndTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    
    if (startMinutes >= endMinutes) {
      return res.status(400).json({ error: 'startTime deve ser anterior a endTime' });
    }
    
    if (slotInterval !== undefined) {
      if (slotInterval < 1 || slotInterval > 1440) {
        return res.status(400).json({ error: 'slotInterval deve ser entre 1 e 1440 minutos' });
      }
      updateData.slotInterval = slotInterval;
    }
    
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    
    const availability = await prisma.trainingAvailability.update({
      where: { id: availabilityId },
      data: updateData,
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'UPDATE',
        entityType: 'TrainingAvailability',
        entityId: availabilityId,
        oldValues: { dayOfWeek: existing.dayOfWeek, specificDate: existing.specificDate, startTime: existing.startTime, endTime: existing.endTime, slotInterval: existing.slotInterval, isActive: existing.isActive },
        newValues: { dayOfWeek: availability.dayOfWeek, specificDate: availability.specificDate, startTime: availability.startTime, endTime: availability.endTime, slotInterval: availability.slotInterval, isActive: availability.isActive },
        ipAddress,
        userAgent,
      });
    }
    
    res.json({ data: availability });
  } catch (error) {
    console.error('Erro ao atualizar disponibilidade:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Disponibilidade não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao atualizar disponibilidade' });
  }
});

// Excluir disponibilidade (admin)
router.delete('/:id', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const availabilityId = parseInt(req.params.id);
    
    // Verificar se existe
    const existing = await prisma.trainingAvailability.findUnique({
      where: { id: availabilityId },
    });
    
    if (!existing) {
      return res.status(404).json({ error: 'Disponibilidade não encontrada' });
    }
    
    await prisma.trainingAvailability.delete({
      where: { id: availabilityId },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'DELETE',
        entityType: 'TrainingAvailability',
        entityId: availabilityId,
        oldValues: { dayOfWeek: existing.dayOfWeek, specificDate: existing.specificDate, startTime: existing.startTime, endTime: existing.endTime, slotInterval: existing.slotInterval, isActive: existing.isActive },
        ipAddress,
        userAgent,
      });
    }
    
    res.json({ message: 'Disponibilidade excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir disponibilidade:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Disponibilidade não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao excluir disponibilidade' });
  }
});

export default router;

