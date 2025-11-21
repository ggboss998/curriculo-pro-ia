"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Award } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  institution: string;
  year: string;
}

interface StepCertificationsProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export function StepCertifications({ data, onChange }: StepCertificationsProps) {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      institution: "",
      year: "",
    };
    onChange([...data, newCertification]);
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange(
      data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <Award className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ainda não adicionou formações complementares
          </p>
          <Button onClick={addCertification} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Primeira Formação
          </Button>
        </div>
      )}

      {data.map((certification, index) => (
        <div
          key={certification.id}
          className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-900/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Formação Complementar #{index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertification(certification.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Nome do Curso *</Label>
            <Input
              placeholder="Ex: Certificação em Marketing Digital"
              value={certification.name}
              onChange={(e) =>
                updateCertification(certification.id, "name", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Instituição *</Label>
              <Input
                placeholder="Ex: Google Digital Garage"
                value={certification.institution}
                onChange={(e) =>
                  updateCertification(certification.id, "institution", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Ano de Conclusão *</Label>
              <Input
                type="number"
                placeholder="Ex: 2023"
                value={certification.year}
                onChange={(e) =>
                  updateCertification(certification.id, "year", e.target.value)
                }
                min="1950"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button onClick={addCertification} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Outra Formação
        </Button>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Inclua cursos, certificações e workshops relevantes 
          que complementem a sua formação académica e experiência profissional.
        </p>
      </div>
    </div>
  );
}
