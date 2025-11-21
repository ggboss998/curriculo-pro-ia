"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface StepEducationProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function StepEducation({ data, onChange }: StepEducationProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <GraduationCap className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ainda não adicionou formação académica
          </p>
          <Button onClick={addEducation} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Formação
          </Button>
        </div>
      )}

      {data.map((education, index) => (
        <div
          key={education.id}
          className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-900/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Formação #{index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Instituição *</Label>
            <Input
              placeholder="Ex: Universidade de Lisboa"
              value={education.institution}
              onChange={(e) =>
                updateEducation(education.id, "institution", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Grau *</Label>
              <Input
                placeholder="Ex: Licenciatura"
                value={education.degree}
                onChange={(e) =>
                  updateEducation(education.id, "degree", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Área de Estudo *</Label>
              <Input
                placeholder="Ex: Gestão de Empresas"
                value={education.field}
                onChange={(e) =>
                  updateEducation(education.id, "field", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início</Label>
              <Input
                type="month"
                value={education.startDate}
                onChange={(e) =>
                  updateEducation(education.id, "startDate", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Data de Conclusão</Label>
              <Input
                type="month"
                value={education.endDate}
                onChange={(e) =>
                  updateEducation(education.id, "endDate", e.target.value)
                }
                disabled={education.current}
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id={`current-${education.id}`}
                  checked={education.current}
                  onChange={(e) =>
                    updateEducation(education.id, "current", e.target.checked)
                  }
                  className="rounded"
                />
                <label
                  htmlFor={`current-${education.id}`}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Ainda a frequentar
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button onClick={addEducation} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Outra Formação
        </Button>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Inclua cursos relevantes, certificações e 
          formações complementares que valorizem o seu perfil.
        </p>
      </div>
    </div>
  );
}
