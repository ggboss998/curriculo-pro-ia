"use client";

import { Check } from "lucide-react";

interface StepTemplateProps {
  selectedTemplate: string;
  onChange: (template: string) => void;
  resumeData?: any;
}

const templates = [
  {
    id: "modern",
    name: "Moderno",
    description: "Design limpo e contemporâneo",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    id: "professional",
    name: "Profissional",
    description: "Clássico e elegante",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "creative",
    name: "Criativo",
    description: "Ousado e diferenciado",
    preview: "bg-gradient-to-br from-pink-500 to-orange-500",
  },
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Simples e direto",
    preview: "bg-gradient-to-br from-gray-400 to-gray-600",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Para área tecnológica",
    preview: "bg-gradient-to-br from-cyan-500 to-blue-700",
  },
  {
    id: "executive",
    name: "Executivo",
    description: "Para cargos de gestão",
    preview: "bg-gradient-to-br from-amber-600 to-red-700",
  },
  {
    id: "clean",
    name: "Clean",
    description: "Espaçoso e organizado",
    preview: "bg-gradient-to-br from-green-400 to-teal-600",
  },
  {
    id: "colorful",
    name: "Colorido",
    description: "Vibrante e energético",
    preview: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
  },
  {
    id: "european",
    name: "Europeu",
    description: "Formato Europass",
    preview: "bg-gradient-to-br from-blue-600 to-indigo-800",
  },
  {
    id: "ats",
    name: "ATS-Friendly",
    description: "Otimizado para sistemas",
    preview: "bg-gradient-to-br from-slate-600 to-slate-800",
  },
];

export function StepTemplate({ selectedTemplate, onChange, resumeData }: StepTemplateProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Escolha o Template do Seu Currículo
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selecione o design que melhor representa o seu perfil profissional. A pré-visualização ao lado será atualizada automaticamente.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
              selectedTemplate === template.id
                ? "border-blue-600 dark:border-blue-500 shadow-lg"
                : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
            }`}
          >
            {/* Preview */}
            <div
              className={`w-full aspect-[3/4] rounded-lg mb-3 ${template.preview} shadow-md`}
            >
              {selectedTemplate === template.id && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {template.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {template.description}
              </p>
            </div>

            {/* Selected Badge */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Selecionado
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Todos os templates são otimizados para impressão 
          e compatíveis com sistemas ATS (Applicant Tracking Systems). A pré-visualização ao lado mostra como ficará o seu currículo.
        </p>
      </div>
    </div>
  );
}
