"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Powered by Inteligência Artificial
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            O seu currículo perfeito
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              em 5 minutos com IA
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Crie currículos profissionais e otimizados para ATS com a ajuda da Inteligência Artificial.
            Templates modernos, entrega instantânea por email e WhatsApp.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>10 Templates Profissionais</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Otimização com IA</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Entrega Instantânea</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg group"
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
              className="px-8 py-6 text-lg"
            >
              <Link href="#templates">Ver Templates</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white dark:border-gray-950"
                />
              ))}
            </div>
            <p>
              <span className="font-semibold text-gray-900 dark:text-white">500+</span> profissionais já criaram o seu currículo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
