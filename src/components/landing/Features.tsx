"use client";

import { Sparkles, Zap, Shield, Download, Mail, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Otimização com IA",
    description: "Melhore automaticamente a sua apresentação pessoal e objetivos profissionais com Inteligência Artificial",
  },
  {
    icon: Zap,
    title: "Criação Rápida",
    description: "Crie o seu currículo profissional em apenas 5 minutos com o nosso builder intuitivo passo a passo",
  },
  {
    icon: Shield,
    title: "ATS-Friendly",
    description: "Todos os templates são otimizados para sistemas de rastreamento de candidaturas (ATS)",
  },
  {
    icon: Download,
    title: "Download Instantâneo",
    description: "Receba o seu currículo em PDF de alta qualidade, pronto para enviar ou imprimir",
  },
  {
    icon: Mail,
    title: "Entrega por Email",
    description: "Receba o PDF diretamente no seu email com link para editar quando quiser",
  },
  {
    icon: MessageCircle,
    title: "Envio por WhatsApp",
    description: "Receba o currículo também no WhatsApp para partilhar facilmente com recrutadores",
  },
];

export function Features() {
  return (
    <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Tudo o que precisa para o currículo perfeito
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ferramentas profissionais e tecnologia de ponta ao seu alcance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
