import nodemailer from 'nodemailer';

// Configurar transporter de email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true para 465, false para outras portas
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Templates de email
const emailTemplates = {
  emailVerification: (data) => ({
    subject: 'Verifique seu email - TutorialLukos',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Verificação de Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo ao TutorialLukos!</h1>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Obrigado por se cadastrar na nossa plataforma de tutoriais.</p>
            <p>Para ativar sua conta e começar a aprender, clique no botão abaixo:</p>
            <a href="${data.verificationLink}" class="button">Verificar Email</a>
            <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 4px;">${data.verificationLink}</p>
            <p><strong>Este link expira em 24 horas.</strong></p>
          </div>
          <div class="footer">
            <p>Se você não criou esta conta, pode ignorar este email.</p>
            <p>© 2024 TutorialLukos. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Redefinir senha - TutorialLukos',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Redefinir Senha</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .warning { background: #FEF2F2; border: 1px solid #FECACA; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Redefinir Senha</h1>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <a href="${data.resetLink}" class="button">Redefinir Senha</a>
            <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 4px;">${data.resetLink}</p>
            <div class="warning">
              <p><strong>⚠️ Importante:</strong></p>
              <ul>
                <li>Este link expira em 10 minutos</li>
                <li>Se você não solicitou esta redefinição, ignore este email</li>
                <li>Sua senha atual continuará funcionando até ser alterada</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p>Por segurança, este link só pode ser usado uma vez.</p>
            <p>© 2024 TutorialLukos. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  welcome: (data) => ({
    subject: 'Bem-vindo ao TutorialLukos!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Bem-vindo</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo ao TutorialLukos!</h1>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Sua conta foi ativada com sucesso!</p>
            <p>Agora você pode:</p>
            <ul>
              <li>✅ Acessar todos os tutoriais</li>
              <li>✅ Acompanhar seu progresso</li>
              <li>✅ Personalizar sua experiência</li>
              <li>✅ Participar da comunidade</li>
            </ul>
            <a href="${process.env.FRONTEND_URL}" class="button">Começar a Aprender</a>
            <p>Se você tiver alguma dúvida, não hesite em entrar em contato conosco.</p>
          </div>
          <div class="footer">
            <p>Obrigado por escolher o TutorialLukos!</p>
            <p>© 2024 TutorialLukos. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Função principal para enviar emails
export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const transporter = createTransporter();
    
    // Verificar se o template existe
    if (!emailTemplates[template]) {
      throw new Error(`Template de email '${template}' não encontrado`);
    }

    // Gerar conteúdo do email
    const emailContent = emailTemplates[template](data);
    
    // Configurar opções do email
    const mailOptions = {
      from: `"TutorialLukos" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject: subject || emailContent.subject,
      html: emailContent.html
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado com sucesso:', {
      to,
      subject: mailOptions.subject,
      messageId: info.messageId
    });

    return info;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw error;
  }
};

// Função para testar configuração de email
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Configuração de email válida');
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração de email:', error);
    return false;
  }
};
