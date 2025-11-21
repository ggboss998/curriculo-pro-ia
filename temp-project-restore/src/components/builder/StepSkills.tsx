"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StepSkillsProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export function StepSkills({ data, onChange }: StepSkillsProps) {
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !data.includes(inputValue.trim())) {
      onChange([...data, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    "Comunicação",
    "Trabalho em Equipa",
    "Liderança",
    "Gestão de Projetos",
    "Microsoft Office",
    "Excel Avançado",
    "Inglês Fluente",
    "Resolução de Problemas",
    "Pensamento Crítico",
    "Adaptabilidade",
    "Gestão de Tempo",
    "Atendimento ao Cliente",
  ];

  const availableSuggestions = suggestedSkills.filter(
    (skill) => !data.includes(skill)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skill-input">Adicionar Competência</Label>
        <div className="flex gap-2">
          <Input
            id="skill-input"
            placeholder="Ex: Gestão de Projetos"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={addSkill} disabled={!inputValue.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Pressione Enter ou clique no botão + para adicionar
        </p>
      </div>

      {/* Added Skills */}
      {data.length > 0 && (
        <div className="space-y-3">
          <Label>Competências Adicionadas ({data.length})</Label>
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-2 text-sm flex items-center gap-2 bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100 border border-green-300 dark:border-green-800"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Skills */}
      {availableSuggestions.length > 0 && (
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            Sugestões Populares
          </Label>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 8).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => onChange([...data, skill])}
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Adicione entre 8-12 competências relevantes para a sua área.
        </p>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 ml-4 list-disc">
          <li>Inclua competências técnicas (hard skills) e comportamentais (soft skills)</li>
          <li>Seja específico: "Excel Avançado" em vez de apenas "Excel"</li>
          <li>Priorize competências mencionadas nas ofertas de emprego da sua área</li>
        </ul>
      </div>
    </div>
  );
}
