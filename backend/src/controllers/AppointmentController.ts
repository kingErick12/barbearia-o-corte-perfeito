import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';

// Funções utilitárias para lidar com tempo (HH:mm)
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const date = new Date(0, 0, 0, hours, minutes); // Usando data arbitrária apenas para soma
  date.setMinutes(date.getMinutes() + durationMinutes);
  
  const endHours = String(date.getHours()).padStart(2, '0');
  const endMinutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${endHours}:${endMinutes}`;
}

function isOverlapping(startA: string, endA: string, startB: string, endB: string) {
  const toMinutes = (timeString: string) => {
    const [h, m] = timeString.split(':').map(Number);
    return h * 60 + m;
  };

  const sA = toMinutes(startA);
  const eA = toMinutes(endA);
  const sB = toMinutes(startB);
  const eB = toMinutes(endB);

  // Considera sobreposição:
  // Um agendamento começa antes do outro terminar, e o outro começa antes que o primeiro termine.
  return sA < eB && sB < eA;
}

export class AppointmentController {
  
  // POST /api/appointments
  async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      // Recebemos dados do corpo da requisição (gerados no modal do front-end)
      const { barberId, serviceId, date, startTime } = req.body;
      const clientId = req.user?.id; // Autenticação garante que cliente está logado

      if (!clientId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      // 1. Validar se o serviço existe e quanto tempo dura
      const service = await prisma.service.findUnique({
        where: { id: serviceId }
      });

      if (!service) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      // 2. Calcular o horário previsto de término (endTime)
      const endTime = calculateEndTime(startTime, service.durationMinutes);

      // 3. Garantir a formatação correta da data do banco
      // A data que vem do frontend no padrão de string (AAAA-MM-DD -> Formato ISO para inserção ou Date DB)
      // O Prisma espera um dado DateTime para mapear no `@db.Date`.
      const appointmentDate = new Date(`${date}T00:00:00.000Z`);

      // ==============================================
      // 4. LÓGICA CRÍTICA DE CONFLITO DE AGENDA 
      // ==============================================
      
      // Buscar agendamentos do barbeiro naquele dia específico
      const existingAppointments = await prisma.appointment.findMany({
        where: {
          barberId,
          date: appointmentDate,
          status: {
            in: ['CONFIRMED', 'PENDING'] // Não consideramos conflito com horários cancelados
          }
        }
      });

      // Validar sobreposição de horário contra cada agendamento retornado
      for (const apt of existingAppointments) {
        if (isOverlapping(startTime, endTime, apt.startTime, apt.endTime)) {
          return res.status(409).json({
            error: 'Horário indisponível.',
            message: `O barbeiro já tem um agendamento no horário de ${apt.startTime} às ${apt.endTime}.`
          });
        }
      }

      // Buscar os nomes para compor a mensagem do e-mail
      const barber = await prisma.barber.findUnique({ 
        where: { id: barberId },
        include: { user: true } // Precisamos do User para pegar o name e email
      });
      const client = await prisma.user.findUnique({ where: { id: clientId } });

      // ==============================================
      // 5. Tudo Certo! Criar o agendamento
      // ==============================================
      const newAppointment = await prisma.appointment.create({
        data: {
          clientId,
          barberId,
          serviceId,
          date: appointmentDate,
          startTime,
          endTime,
        }
      });

      // 6. ENVIAR NOTIFICAÇÃO POR EMAIL PARA O BARBEIRO
      // Se tivermos os dados completos de nome e o serviço, enviamos (em fallback, usamos 'N/A')
      if (barber && barber.user && client && service) {
        // Chamada Assíncrona, não precisamos esperar (await) para liberar a tela do front mais rápido
        import('../services/EmailService').then(({ EmailService }) => {
          EmailService.sendAppointmentNotification(
            barber.user.email, // O e-mail do sistema do barbeiro
            barber.user.name,
            client.name,
            service.name,
            appointmentDate,
            startTime
          );
        });
      }

      return res.status(201).json(newAppointment);

    } catch (error) {
      console.error('[ERRO CRIAR AGENDAMENTO]:', error);
      return res.status(500).json({ error: 'Erro interno ao criar agendamento.' });
    }
  }

  // GET /api/appointments/available (BÔNUS do Passo 3 - já estruturando para o Frontend buscar)
  async getAvailableSlots(req: AuthRequest, res: Response): Promise<Response> {
    const { barberId, date } = req.query; // Ex: /api/appointments/available?barberId=123&date=2026-03-31
    // ... Aqui iria a lógica rebuscada de varrer das 08:00 às 18:00
    // Omitido no momento para focar na métrica essencial do passo (apenas criar).
    return res.status(200).json({ message: 'Listagem preparada para o futuro do Front!', date, barberId });
  }

}
