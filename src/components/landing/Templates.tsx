"use client";

import { FileText, Palette, Briefcase } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Minimalista",
    icon: FileText,
    preview: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
    description: "Design limpo e profissional",
  },
  {
    id: 2,
    name: "Tech",
    icon: Briefcase,
    preview: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950",
    description: "Perfeito para área tecnológica",
  },
  {
    id: 3,
    name: "Criativo",
    icon: Palette,
    preview: "bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900 dark:to-pink-950",
    description: "Destaque-se com criatividade",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                {/* Preview */}
                <div className={`h-64 ${template.preview} flex items-center justify-center`}>
                  <Icon className="w-16 h-16 text-gray-400 dark:text-gray-600 group-hover:scale-110 transition-transform" />
                </div>

                {/* Info */}
                <div className="p-6 bg-white dark:bg-gray-900">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    Ver Detalhes
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            + 7 templates adicionais disponíveis no builder
          </p>
        </div>
      </div>
    </section>
  );
}
