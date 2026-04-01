import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController';
import { authMiddleware } from '../middlewares/auth';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

// A rota protegida de criar agendamento. Exige Token JWT válido no Request.
appointmentsRouter.post('/', authMiddleware, appointmentController.create);

// (Bônus) Rota de consulta de disponibilidade
appointmentsRouter.get('/available', appointmentController.getAvailableSlots);

export { appointmentsRouter };
