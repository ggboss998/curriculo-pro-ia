import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("A variável STRIPE_SECRET_KEY não está configurada nas variáveis de ambiente.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
