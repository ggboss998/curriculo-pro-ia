"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="preco" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Preço Simples e Transparente
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Um único pagamento, acesso completo a todas as funcionalidades
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative p-8 bg-white dark:bg-gray-950 rounded-3xl border-2 border-blue-500 dark:border-blue-500 shadow-2xl">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                Mais Popular
              </span>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">10€</span>
                <span className="text-gray-600 dark:text-gray-400">por currículo</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Pagamento único, sem subscrições
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {[
                "10 Templates Profissionais",
                "Otimização com IA ilimitada",
                "Pré-visualização em tempo real",
                "Download em PDF de alta qualidade",
                "Entrega por Email",
                "Entrega por WhatsApp",
                "Suporte prioritário",
                "Edições ilimitadas por 30 dias",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg group"
            >
              <Link href="/builder">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Pagamento apenas no final, após criar o seu currículo
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            🛡️ Garantia de satisfação de 7 dias ou devolvemos o seu dinheiro
          </p>
        </div>
      </div>
    </section>
  );
}
