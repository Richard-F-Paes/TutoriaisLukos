import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

// Duração padrão de um treinamento em minutos
const TRAINING_DURATION_MINUTES = 60;

// Listar agendamentos
router.get('/', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { status, startDate, endDate, trainingId } = req.query;

    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
    
    if (trainingId) {
      where.trainingId = parseInt(trainingId);
    }

    const appointments = await prisma.trainingAppointment.findMany({
      where,
      include: {
        training: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ data: appointments });
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
});

// Obter agendamento por ID
router.get('/:id', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const appointment = await prisma.trainingAppointment.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        training: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({ data: appointment });
  } catch (error) {
    console.error('Erro ao obter agendamento:', error);
    res.status(500).json({ error: 'Erro ao obter agendamento' });
  }
});

// Criar agendamento (público - não requer autenticação)
router.post('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      trainingId,
      name,
      email,
      phone,
      company,
      trainingType,
      modality,
      scheduledDate,
      scheduledTime,
      message,
    } = req.body;

    // Validações básicas
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Telefone é obrigatório' });
    }

    // Validar trainingId se fornecido
    if (trainingId) {
      const training = await prisma.training.findUnique({
        where: { id: parseInt(trainingId) },
      });
      if (!training) {
        return res.status(400).json({ error: 'Treinamento não encontrado' });
      }
    }

    // Validar disponibilidade e conflitos se data/hora foram fornecidos
    if (scheduledDate && scheduledTime) {
      // Parse da data de forma segura para evitar problemas de timezone
      // Quando usamos new Date('YYYY-MM-DD'), o JS pode interpretar como UTC
      // Por isso, vamos parsear manualmente para garantir o timezone local
      const dateParts = scheduledDate.split('-');
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
      const dayOfWeek = dateOnly.getDay();

      // Validar formato do horário
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(scheduledTime.trim())) {
        return res.status(400).json({ error: 'Horário inválido (formato: HH:mm)' });
      }

      // Buscar regras de disponibilidade
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

      // Função auxiliar para verificar se é bloqueio de dia inteiro
      const isFullDayBlock = (rule) => !rule.isActive && rule.slotInterval === 1440;
      
      // Função auxiliar para converter "HH:mm" para minutos
      const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
      };

      // Função auxiliar para verificar sobreposição de intervalos de tempo
      const hasTimeOverlap = (start1Minutes, end1Minutes, start2Minutes, end2Minutes) => {
        // Dois intervalos se sobrepõem se: start1 < end2 && end1 > start2
        return start1Minutes < end2Minutes && end1Minutes > start2Minutes;
      };

      // Se há bloqueio de dia inteiro, rejeitar
      if (specificRules.some(r => isFullDayBlock(r))) {
        return res.status(400).json({ error: 'Não há disponibilidade para esta data (dia bloqueado)' });
      }

      // Calcular intervalos disponíveis considerando sobreposição parcial
      const calculateAvailableRanges = (weeklyRules, specificRules) => {
        if (weeklyRules.length === 0) {
          return specificRules
            .filter(r => r.isActive)
            .map(r => ({
              start: timeToMinutes(r.startTime),
              end: timeToMinutes(r.endTime),
              slotInterval: r.slotInterval
            }));
        }

        const availableRanges = [];
        for (const weekly of weeklyRules) {
          let weeklyStart = timeToMinutes(weekly.startTime);
          const weeklyEnd = timeToMinutes(weekly.endTime);
          const weeklyInterval = weekly.slotInterval;

          const overlappingSpecifics = specificRules
            .filter(specific => {
              if (!specific.isActive) return false;
              const specStart = timeToMinutes(specific.startTime);
              const specEnd = timeToMinutes(specific.endTime);
              return !(specEnd <= weeklyStart || specStart >= weeklyEnd);
            })
            .map(specific => ({
              start: timeToMinutes(specific.startTime),
              end: timeToMinutes(specific.endTime),
            }))
            .sort((a, b) => a.start - b.start);

          if (overlappingSpecifics.length === 0) {
            availableRanges.push({
              start: weeklyStart,
              end: weeklyEnd,
              slotInterval: weeklyInterval
            });
            continue;
          }

          let currentStart = weeklyStart;
          for (const specific of overlappingSpecifics) {
            if (specific.start <= weeklyStart && specific.end >= weeklyEnd) {
              currentStart = weeklyEnd;
              break;
            }

            if (specific.start > currentStart && specific.end < weeklyEnd) {
              if (specific.start > currentStart) {
                availableRanges.push({
                  start: currentStart,
                  end: specific.start,
                  slotInterval: weeklyInterval
                });
              }
              currentStart = specific.end;
            } else if (specific.start <= currentStart && specific.end < weeklyEnd) {
              currentStart = Math.max(currentStart, specific.end);
            } else if (specific.start > currentStart && specific.end >= weeklyEnd) {
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

          if (currentStart < weeklyEnd) {
            availableRanges.push({
              start: currentStart,
              end: weeklyEnd,
              slotInterval: weeklyInterval
            });
          }
        }

        return availableRanges;
      };

      const availableRanges = calculateAvailableRanges(weeklyRules, specificRules);

      if (availableRanges.length === 0) {
        return res.status(400).json({ error: 'Não há disponibilidade para esta data' });
      }

      // Verificar se o horário está dentro de algum intervalo disponível
      const timeInMinutes = scheduledTime.split(':').reduce((h, m) => h * 60 + parseInt(m), 0);
      let isAvailable = false;

      for (const range of availableRanges) {
        if (timeInMinutes >= range.start && timeInMinutes < range.end) {
          // Verificar se o horário está em um slot válido (múltiplo do interval)
          const slotPosition = timeInMinutes - range.start;
          if (slotPosition % range.slotInterval === 0) {
            isAvailable = true;
            break;
          }
        }
      }

      if (!isAvailable) {
        return res.status(400).json({ error: 'Horário não disponível ou fora do intervalo permitido' });
      }

      // Verificar conflitos com agendamentos existentes (apenas confirmed e completed bloqueiam)
      // Buscar todos os agendamentos confirmados/completos para esta data
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

      // Calcular intervalo do novo agendamento
      const newAppointmentStart = timeToMinutes(scheduledTime.trim());
      const newAppointmentEnd = newAppointmentStart + TRAINING_DURATION_MINUTES;

      // Verificar se há sobreposição com algum agendamento existente
      const hasConflict = existingAppointments.some(apt => {
        if (!apt.scheduledTime) return false;
        const existingStart = timeToMinutes(apt.scheduledTime);
        const existingEnd = existingStart + TRAINING_DURATION_MINUTES;
        return hasTimeOverlap(newAppointmentStart, newAppointmentEnd, existingStart, existingEnd);
      });

      if (hasConflict) {
        return res.status(400).json({ error: 'Este horário já está reservado ou há conflito com outro agendamento' });
      }
    }

    // Build data object conditionally - only include trainingId if it exists
    const appointmentData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company?.trim() || null,
      trainingType: trainingType?.trim() || null,
      modality: modality?.trim() || null,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      scheduledTime: scheduledTime?.trim() || null,
      message: message?.trim() || null,
      status: 'pending',
    };

    // Only include training relation if trainingId is provided
    if (trainingId) {
      appointmentData.training = {
        connect: { id: parseInt(trainingId) }
      };
    }

    const appointment = await prisma.trainingAppointment.create({
      data: appointmentData,
      include: {
        training: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    // Criar log de auditoria (CREATE é público, então userId pode ser null)
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId: null, // Público, sem usuário autenticado
      action: 'CREATE',
      entityType: 'TrainingAppointment',
      entityId: appointment.id,
      newValues: { name: appointment.name, email: appointment.email, phone: appointment.phone, trainingId: appointment.trainingId, status: appointment.status, scheduledDate: appointment.scheduledDate, scheduledTime: appointment.scheduledTime },
      ipAddress,
      userAgent,
    });

    res.status(201).json({ data: appointment });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Treinamento inválido' });
    }
    res.status(500).json({ 
      error: 'Erro ao criar agendamento',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Atualizar agendamento (autenticado - mudar status, adicionar notes)
router.put('/:id', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const {
      status,
      notes,
      scheduledDate,
      scheduledTime,
      trainingId,
    } = req.body;

    const updateData = {};

    if (status && ['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      updateData.status = status;
    }

    if (notes !== undefined) {
      updateData.notes = notes?.trim() || null;
    }

    if (scheduledDate !== undefined) {
      updateData.scheduledDate = scheduledDate ? new Date(scheduledDate) : null;
    }

    if (scheduledTime !== undefined) {
      updateData.scheduledTime = scheduledTime?.trim() || null;
    }

    if (trainingId !== undefined) {
      if (trainingId === null) {
        updateData.trainingId = null;
      } else {
        // Validar se o treinamento existe
        const training = await prisma.training.findUnique({
          where: { id: parseInt(trainingId) },
        });
        if (!training) {
          return res.status(400).json({ error: 'Treinamento não encontrado' });
        }
        updateData.trainingId = parseInt(trainingId);
      }
    }

    // Buscar valores antigos antes de atualizar
    const oldAppointment = await prisma.trainingAppointment.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!oldAppointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    const appointment = await prisma.trainingAppointment.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
      include: {
        training: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'UPDATE',
        entityType: 'TrainingAppointment',
        entityId: appointment.id,
        oldValues: { status: oldAppointment.status, scheduledDate: oldAppointment.scheduledDate, scheduledTime: oldAppointment.scheduledTime, trainingId: oldAppointment.trainingId },
        newValues: { status: appointment.status, scheduledDate: appointment.scheduledDate, scheduledTime: appointment.scheduledTime, trainingId: appointment.trainingId },
        ipAddress,
        userAgent,
      });
    }

    res.json({ data: appointment });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Treinamento inválido' });
    }
    res.status(500).json({ 
      error: 'Erro ao atualizar agendamento',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Deletar agendamento
router.delete('/:id', authenticate, requirePermission('manage_appointments'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const appointmentId = parseInt(req.params.id);

    // Buscar valores antes de deletar
    const oldAppointment = await prisma.trainingAppointment.findUnique({
      where: { id: appointmentId },
    });

    if (!oldAppointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    await prisma.trainingAppointment.delete({
      where: { id: appointmentId },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'DELETE',
        entityType: 'TrainingAppointment',
        entityId: appointmentId,
        oldValues: { name: oldAppointment.name, email: oldAppointment.email, phone: oldAppointment.phone, trainingId: oldAppointment.trainingId, status: oldAppointment.status, scheduledDate: oldAppointment.scheduledDate, scheduledTime: oldAppointment.scheduledTime },
        ipAddress,
        userAgent,
      });
    }

    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar agendamento' });
  }
});

export default router;

