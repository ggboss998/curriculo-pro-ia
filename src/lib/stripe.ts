import Stripe from "stripe";

// Verificar se a variável existe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("⚠️ STRIPE_SECRET_KEY não está configurada. Configure nas variáveis de ambiente.");
}

// Criar instância do Stripe
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

// Função helper para verificar se o Stripe está configurado corretamente
export function isStripeConfigured(): boolean {
  return !!stripeSecretKey;
}
