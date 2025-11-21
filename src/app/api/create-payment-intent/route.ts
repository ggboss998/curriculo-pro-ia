import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { paymentsDB } from "@/lib/database";
import { isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Verificar se o Stripe está configurado
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { 
          error: "Stripe não está configurado corretamente. Verifique a variável STRIPE_SECRET_KEY no arquivo .env.local" 
        },
        { status: 500 }
      );
    }

    // Verificar se o Supabase está configurado
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { 
          error: "Supabase não está configurado corretamente. Verifique as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local" 
        },
        { status: 500 }
      );
    }

    // Parse do body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Erro ao fazer parse do JSON:", parseError);
      return NextResponse.json(
        { error: "Corpo da requisição inválido. Esperado JSON válido." },
        { status: 400 }
      );
    }

    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
      customerBirthDate,
      resumeData
    } = body;

    // Validação do amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: "Valor (amount) não foi enviado ou é inválido. Deve ser um número maior que zero." },
        { status: 400 }
      );
    }

    // Validação de campos obrigatórios
    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios." },
        { status: 400 }
      );
    }

    // Criar PaymentIntent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        customerPhone: customerPhone || "",
        customerBirthDate: customerBirthDate || "",
      },
    });

    // Registrar no banco
    const order = await paymentsDB.create({
      user_id: customerEmail, // Usando email como user_id temporariamente
      amount,
      status: "pending",
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      resume_data: resumeData,
      payment_intent_id: paymentIntent.id,
    });

    // Retornar resposta JSON válida
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });

  } catch (error: any) {
    console.error("Erro ao criar PaymentIntent:", error);
    
    // Garantir que sempre retornamos JSON, nunca HTML
    const errorMessage = error?.message || "Erro interno ao criar pagamento.";
    const errorDetails = process.env.NODE_ENV === 'development' ? error?.stack : undefined;
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}
