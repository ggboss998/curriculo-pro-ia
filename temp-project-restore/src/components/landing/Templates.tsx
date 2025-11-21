"use client";

import { FileText, Palette, Briefcase, Sparkles, Zap, Target, Crown, Rocket, Star, Award } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Moderno",
    icon: Sparkles,
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
    description: "Design moderno com gradiente vibrante",
  },
  {
    id: 2,
    name: "Minimalista",
    icon: FileText,
    preview: "bg-gradient-to-br from-gray-800 to-gray-950",
    description: "Layout limpo com sidebar escura",
  },
  {
    id: 3,
    name: "Criativo",
    icon: Palette,
    preview: "bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-400",
    description: "Cards coloridos e layout em grid",
  },
  {
    id: 4,
    name: "Profissional",
    icon: Briefcase,
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    description: "Executivo clássico e elegante",
  },
  {
    id: 5,
    name: "Tech",
    icon: Zap,
    preview: "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700",
    description: "Perfeito para área tecnológica",
  },
  {
    id: 6,
    name: "Clean",
    icon: Target,
    preview: "bg-gradient-to-br from-white to-gray-100 border-2 border-gray-300",
    description: "Minimalista e ultra limpo",
  },
  {
    id: 7,
    name: "Colorido",
    icon: Star,
    preview: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    description: "Vibrante com gradientes intensos",
  },
  {
    id: 8,
    name: "Europeu",
    icon: Crown,
    preview: "bg-gradient-to-br from-gray-600 via-gray-700 to-amber-600",
    description: "Elegante com detalhes dourados",
  },
  {
    id: 9,
    name: "ATS-Friendly",
    icon: Award,
    preview: "bg-gradient-to-br from-slate-100 to-slate-300",
    description: "Otimizado para sistemas ATS",
  },
  {
    id: 10,
    name: "Executivo",
    icon: Rocket,
    preview: "bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900",
    description: "Premium para executivos",
  },
];

export function Templates() {
  return (
    <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            10 Templates Profissionais
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Escolha entre 10 designs modernos, otimizados para ATS e prontos para impressão
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                {/* Preview */}
                <div className={`h-48 ${template.preview} flex items-center justify-center relative`}>
                  <Icon className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  
                  {/* Marca d'água no preview */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-red-500/30 text-2xl font-black transform rotate-[-45deg] select-none tracking-wider leading-tight">
                      CURRÍCULO<br/>PRO IA
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-white dark:bg-gray-900">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Todos os templates incluem marca d'água "CURRÍCULO PRO IA" na pré-visualização
          </p>
        </div>
      </div>
    </section>
  );
}
