"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Pronto para criar o seu currículo perfeito?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100">
          Junte-se a centenas de profissionais que já transformaram as suas carreiras
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg group"
          >
            <Link href="/builder">
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            <Link href="#templates">Ver Templates</Link>
          </Button>
        </div>
        <p className="text-blue-100 text-sm">
          Sem subscrições • Pagamento único • Garantia de 7 dias
        </p>
      </div>
    </section>
  );
}
