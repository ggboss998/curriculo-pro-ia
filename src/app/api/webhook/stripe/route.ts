import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { paymentsDB } from '@/lib/database';
import { generateResumePDF } from '@/lib/pdf-generator';
import { sendResumeEmail } from '@/lib/email';
import { sendResumeWhatsApp } from '@/lib/whatsapp';
import { renderToBuffer } from '@react-pdf/renderer';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    // Verificar webhook do Stripe
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Processar evento de pagamento bem-sucedido
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;

      // Buscar pagamento no Supabase
      const payment = await paymentsDB.findByPaymentIntent(paymentIntent.id);

      if (!payment) {
        console.error('Pagamento não encontrado:', paymentIntent.id);
        return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
      }

      // Atualizar status do pagamento no Supabase
      await paymentsDB.update(payment.id, { status: 'completed' });

      // Gerar PDF sem marca d'água
      const resumeData = JSON.parse(payment.resume_data || '{}');
      const pdfDocument = generateResumePDF(resumeData);
      const pdfBuffer = await renderToBuffer(pdfDocument);

      // Enviar por email
      try {
        await sendResumeEmail(
          payment.customer_email || '',
          pdfBuffer,
          payment.customer_name || ''
        );
        await paymentsDB.markEmailSent(payment.id);
        console.log('✅ Email enviado com sucesso para:', payment.customer_email);
      } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
      }

      // Enviar por WhatsApp (se número fornecido)
      if (payment.customer_phone) {
        try {
          // Nota: Para WhatsApp, você precisaria hospedar o PDF em algum lugar
          // Por enquanto, vamos apenas marcar como enviado
          // await sendResumeWhatsApp(payment.customer_phone, pdfUrl, payment.customer_name);
          // await paymentsDB.markWhatsAppSent(payment.id);
          console.log('📱 WhatsApp configurado para:', payment.customer_phone);
        } catch (error) {
          console.error('❌ Erro ao enviar WhatsApp:', error);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
