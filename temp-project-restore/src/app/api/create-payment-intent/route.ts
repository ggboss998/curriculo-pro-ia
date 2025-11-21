import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { paymentsDB } from "@/lib/database";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
      customerBirthDate,
      resumeData
    } = await req.json();

    if (!amount) {
      return NextResponse.json(
        { error: "Valor (amount) não foi enviado." },
        { status: 400 }
      );
    }

    // Criar PaymentIntent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerName,
        customerEmail,
        customerPhone,
        customerBirthDate,
      },
    });

    // Registrar no banco
    const order = await paymentsDB.create({
      id: paymentIntent.id,
      amount,
      status: "pending",
      customerName,
      customerEmail,
      customerPhone,
      customerBirthDate,
      resumeData,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });

  } catch (error) {
    console.error("Erro ao criar PaymentIntent:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar pagamento." },
      { status: 500 }
    );
  }
}
