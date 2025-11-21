import twilio from 'twilio';

if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_WHATSAPP_NUMBER) {
  console.warn('Variáveis do Twilio não configuradas. WhatsApp desabilitado.');
}

const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export async function sendResumeWhatsApp(
  to: string,
  pdfUrl: string,
  customerName: string
) {
  if (!client) {
    throw new Error('Twilio não está configurado');
  }

  try {
    // Formatar número para WhatsApp (deve incluir código do país)
    const whatsappNumber = to.startsWith('+') ? `whatsapp:${to}` : `whatsapp:+${to}`;
    const fromNumber = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;

    const message = await client.messages.create({
      from: fromNumber,
      to: whatsappNumber,
      body: `🎉 Olá ${customerName}!\n\nSeu currículo profissional está pronto!\n\nBaixe aqui: ${pdfUrl}\n\n✅ Sem marca d'água\n✅ Formato profissional\n✅ Pronto para enviar\n\nBoa sorte na sua busca profissional! 🚀\n\n- Equipa Currículo Pro IA`,
    });

    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    throw error;
  }
}
