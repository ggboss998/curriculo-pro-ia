import Stripe from "stripe";

// Verificar se a variável existe, mas não lançar erro imediatamente
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("⚠️ STRIPE_SECRET_KEY não está configurada. Verifique o arquivo .env.local");
}

// Criar instância do Stripe com fallback para evitar erro de inicialização
export const stripe = new Stripe(stripeSecretKey || "sk_test_dummy_key_for_initialization", {
  apiVersion: "2023-10-16",
});

// Função helper para verificar se o Stripe está configurado corretamente
export function isStripeConfigured(): boolean {
  return !!stripeSecretKey && stripeSecretKey !== "sk_test_dummy_key_for_initialization";
}
