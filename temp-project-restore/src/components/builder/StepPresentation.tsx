"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

interface StepPresentationProps {
  data: string;
  onChange: (data: string) => void;
}

export function StepPresentation({ data, onChange }: StepPresentationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [showComparison, setShowComparison] = useState(false);

  const handleAIEnhance = async () => {
    if (!data.trim()) {
      alert("Por favor, escreva algo primeiro para a IA melhorar!");
      return;
    }

    setIsGenerating(true);
    setOriginalText(data);
    setShowComparison(true);

    try {
      // Simulação de chamada à API (substituir por chamada real à OpenAI)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const enhanced = `Profissional experiente com sólida formação e histórico comprovado de resultados. Orientado para objetivos, com excelentes capacidades de comunicação e trabalho em equipa. Procuro constantemente desafios que permitam aplicar e expandir as minhas competências, contribuindo para o sucesso organizacional através de soluções inovadoras e eficientes.`;

      onChange(enhanced);
    } catch (error) {
      console.error("Erro ao melhorar texto:", error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="presentation" className="text-base font-semibold">
          Apresentação Pessoal / Perfil Profissional *
        </Label>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Descreva brevemente quem é, a sua experiência e objetivos profissionais.
        </p>
        <Textarea
          id="presentation"
          placeholder="Ex: Sou um profissional dedicado com 5 anos de experiência em marketing digital..."
          value={data}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="text-base resize-none"
        />
      </div>

      {/* AI Enhancement Button */}
      <Button
        onClick={handleAIEnhance}
        disabled={isGenerating || !data.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            A melhorar com IA...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Melhorar com IA (Grátis)
          </>
        )}
      </Button>

      {/* Before/After Comparison */}
      {showComparison && originalText && (
        <div className="space-y-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Comparação: Antes vs Depois
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ❌ Antes
              </p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {originalText}
                </p>
              </div>
            </div>

            {/* After */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                ✅ Depois (Melhorado)
              </p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border-2 border-green-500 dark:border-green-600">
                <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                  {data}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
            <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Melhorias aplicadas:</strong> Linguagem mais profissional, 
              estrutura otimizada para ATS, destaque de competências-chave.
            </p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Escreva 2-3 frases sobre si. A IA irá transformar 
          o texto num perfil profissional otimizado para recrutadores e sistemas ATS.
        </p>
      </div>
    </div>
  );
}
