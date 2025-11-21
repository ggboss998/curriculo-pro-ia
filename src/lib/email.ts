import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY não está configurada');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResumeEmail(
  to: string,
  pdfBuffer: Buffer,
  customerName: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Currículo Pro IA <noreply@curriculoproia.com>',
      to: [to],
      subject: 'Seu Currículo Profissional está pronto! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6B7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Seu Currículo está Pronto!</h1>
              </div>
              <div class="content">
                <p>Olá <strong>${customerName}</strong>,</p>
                
                <p>Obrigado por escolher o <strong>Currículo Pro IA</strong>!</p>
                
                <p>Seu currículo profissional foi gerado com sucesso e está anexado neste email em formato PDF, <strong>sem marca d'água</strong>.</p>
                
                <p><strong>O que fazer agora:</strong></p>
                <ul>
                  <li>✅ Baixe o PDF anexado</li>
                  <li>✅ Revise as informações</li>
                  <li>✅ Envie para empresas ou plataformas de emprego</li>
                  <li>✅ Boa sorte na sua busca profissional!</li>
                </ul>
                
                <p>Se precisar de ajuda ou tiver alguma dúvida, não hesite em nos contactar.</p>
                
                <p>Sucesso na sua carreira! 🚀</p>
                
                <p style="margin-top: 30px;">
                  <strong>Equipa Currículo Pro IA</strong>
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Currículo Pro IA. Todos os direitos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'curriculo-profissional.pdf',
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      throw new Error(`Erro ao enviar email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}
