"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Language {
  id: string;
  language: string;
  level: string;
}

interface StepLanguagesProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export function StepLanguages({ data, onChange }: StepLanguagesProps) {
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: "",
      level: "compreendo",
    };
    onChange([...data, newLanguage]);
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    onChange(
      data.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  const levelLabels: Record<string, string> = {
    compreendo: "Compreendo",
    falo: "Falo",
    compreendo_falo: "Compreendo e Falo",
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <Languages className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ainda não adicionou línguas
          </p>
          <Button onClick={addLanguage} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Primeira Língua
          </Button>
        </div>
      )}

      {data.map((language, index) => (
        <div
          key={language.id}
          className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-900/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Língua #{index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLanguage(language.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Língua *</Label>
              <Input
                placeholder="Ex: Inglês"
                value={language.language}
                onChange={(e) =>
                  updateLanguage(language.id, "language", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Nível *</Label>
              <Select
                value={language.level}
                onValueChange={(value) =>
                  updateLanguage(language.id, "level", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compreendo">Compreendo</SelectItem>
                  <SelectItem value="falo">Falo</SelectItem>
                  <SelectItem value="compreendo_falo">Compreendo e Falo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button onClick={addLanguage} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Outra Língua
        </Button>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Inclua todas as línguas que domina. 
          Línguas estrangeiras são muito valorizadas no mercado de trabalho.
        </p>
      </div>
    </div>
  );
}
