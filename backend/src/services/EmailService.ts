import nodemailer from 'nodemailer';

// Configuração do "Carteiro" (Transporter)
// No mundo real: você colocaria smtp.gmail.com se fosse usar um Gmail, ou as credenciais do SendGrid/Resend
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io', // Servidor de teste genérico
  port: Number(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER || 'usuario_teste',
    pass: process.env.SMTP_PASS || 'senha_teste'
  }
});

export const EmailService = {
  /**
   * Dispara um e-mail bonitão para o barbeiro avisando do novo agendamento
   */
  async sendAppointmentNotification(
    barberEmail: string, 
    barberName: string, 
    clientName: string, 
    serviceName: string, 
    date: Date,
    startTime: string
  ) {
    // Formatar a data para o padrão Brasileiro (ex: 15/04/2026)
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    
    const mailOptions = {
      from: '"O Corte Perfeito" <sistema@ocorteperfeito.com.br>',
      to: barberEmail, // Vai para o e-mail do Barbeiro cadastrado no banco!
      subject: `🚨 Novo Agendamento: ${clientName} - ${formattedDate} às ${startTime}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #0a0a0a; color: #D4AF37; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-family: Georgia, serif; text-transform: uppercase; letter-spacing: 2px;">O Corte Perfeito</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="margin-top: 0; color: #111;">Olá, ${barberName}!</h2>
            <p style="font-size: 16px; line-height: 1.5;">Você acaba de receber uma nova reserva na sua agenda. Prepare sua navalha e tesoura!</p>
            
            <div style="background-color: #fff; border-left: 4px solid #D4AF37; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <p style="margin: 8px 0; font-size: 16px;"><strong>👤 Cliente:</strong> ${clientName}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>✂️ Serviço:</strong> ${serviceName}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Data:</strong> ${formattedDate}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>⏰ Horário:</strong> ${startTime}</p>
            </div>
            
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              Acesse o painel do sistema para gerenciar seus horários.
            </p>
          </div>
        </div>
      `
    };

    try {
      // Tenta enviar o e-mail
      await transporter.sendMail(mailOptions);
      console.log(`[EMAIL ENVIADO] Notificação com sucesso para o barbeiro ${barberName} no email ${barberEmail}`);
    } catch (error) {
      console.error("[ERRO EMAIL] Falha ao enviar a notificação:", error);
      // Aqui não travamos o App inteiro, apenas logamos o erro da notificação
    }
  }
};
