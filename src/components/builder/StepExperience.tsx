"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase, Sparkles, Calendar } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface StepExperienceProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function StepExperience({ data, onChange }: StepExperienceProps) {
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const enhanceWithAI = async (id: string, position: string, company: string) => {
    if (!position || !company) {
      alert("Por favor, preencha o cargo e a empresa primeiro.");
      return;
    }

    setEnhancingId(id);

    try {
      // Simulação de chamada à IA com descrições mais realistas e contextualizadas
      await new Promise(resolve => setTimeout(resolve, 2000));

      const descriptions = [
        {
          roles: ["gestor", "manager", "coordenador", "diretor"],
          text: `• Coordenei equipa multidisciplinar garantindo alinhamento com objetivos estratégicos da ${company}
• Implementei processos de melhoria contínua que otimizaram a eficiência operacional
• Desenvolvi e executei planos de ação alinhados com a visão da empresa
• Estabeleci parcerias estratégicas com stakeholders-chave do setor
• Liderei projetos de transformação digital que modernizaram operações internas`
        },
        {
          roles: ["marketing", "comunicação", "digital"],
          text: `• Desenvolvi estratégias de marketing digital alinhadas com a identidade da ${company}
• Geri campanhas multicanal que aumentaram o reconhecimento da marca
• Criei conteúdo relevante para diferentes plataformas e públicos-alvo
• Analisei métricas de desempenho e ajustei estratégias conforme necessário
• Colaborei com equipas criativas para garantir consistência da mensagem`
        },
        {
          roles: ["vendas", "comercial", "account"],
          text: `• Geri carteira de clientes garantindo satisfação e fidelização na ${company}
• Identifiquei oportunidades de negócio e desenvolvi propostas comerciais
• Negociei contratos e acordos comerciais com parceiros estratégicos
• Acompanhei todo o ciclo de vendas desde prospeção até fecho
• Colaborei com equipas internas para garantir entrega de valor ao cliente`
        },
        {
          roles: ["desenvolvedor", "programador", "developer", "tech"],
          text: `• Desenvolvi soluções tecnológicas robustas e escaláveis para a ${company}
• Colaborei em projetos ágeis utilizando metodologias modernas de desenvolvimento
• Implementei boas práticas de código e testes automatizados
• Participei em revisões de código e sessões de pair programming
• Contribuí para a arquitetura técnica e escolha de tecnologias`
        },
        {
          roles: ["recursos humanos", "rh", "people"],
          text: `• Geri processos de recrutamento e seleção alinhados com a cultura da ${company}
• Desenvolvi programas de formação e desenvolvimento de colaboradores
• Implementei políticas de recursos humanos que promoveram ambiente positivo
• Acompanhei avaliações de desempenho e planos de carreira
• Colaborei com liderança na gestão de talento e retenção`
        }
      ];

      // Encontrar descrição mais adequada ao cargo
      let selectedDescription = descriptions.find(d => 
        d.roles.some(role => position.toLowerCase().includes(role))
      );

      // Se não encontrar, usar descrição genérica
      if (!selectedDescription) {
        selectedDescription = {
          roles: [],
          text: `• Contribuí ativamente para os objetivos estratégicos da ${company}
• Colaborei com diferentes equipas garantindo alinhamento e eficiência
• Implementei melhorias nos processos da minha área de atuação
• Participei em projetos transversais que agregaram valor à organização
• Mantive foco em resultados e excelência na execução das tarefas`
        };
      }

      updateExperience(id, "description", selectedDescription.text);
    } catch (error) {
      alert("Erro ao aprimorar com IA. Tente novamente.");
    } finally {
      setEnhancingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ainda não adicionou experiências profissionais
          </p>
          <Button onClick={addExperience} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Primeira Experiência
          </Button>
        </div>
      )}

      {data.map((experience, index) => (
        <div
          key={experience.id}
          className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-900/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Experiência #{index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Empresa *</Label>
              <Input
                placeholder="Ex: Tech Solutions Lda"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(experience.id, "company", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Cargo *</Label>
              <Input
                placeholder="Ex: Gestor de Marketing"
                value={experience.position}
                onChange={(e) =>
                  updateExperience(experience.id, "position", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Data de Início *
              </Label>
              <Input
                type="month"
                value={experience.startDate}
                onChange={(e) =>
                  updateExperience(experience.id, "startDate", e.target.value)
                }
              />
              {experience.startDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(experience.startDate)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Data de Fim
              </Label>
              <Input
                type="month"
                value={experience.endDate}
                onChange={(e) =>
                  updateExperience(experience.id, "endDate", e.target.value)
                }
                disabled={experience.current}
              />
              {experience.endDate && !experience.current && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(experience.endDate)}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onChange={(e) =>
                    updateExperience(experience.id, "current", e.target.checked)
                  }
                  className="rounded"
                />
                <label
                  htmlFor={`current-${experience.id}`}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Trabalho aqui atualmente
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Descrição das Responsabilidades</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => enhanceWithAI(experience.id, experience.position, experience.company)}
                disabled={enhancingId === experience.id || !experience.position || !experience.company}
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="w-4 h-4" />
                {enhancingId === experience.id ? "Aprimorando..." : "Aprimorar com IA"}
              </Button>
            </div>
            <Textarea
              placeholder="Descreva as suas principais responsabilidades e conquistas..."
              value={experience.description}
              onChange={(e) =>
                updateExperience(experience.id, "description", e.target.value)
              }
              rows={6}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 Clique em "Aprimorar com IA" para gerar responsabilidades profissionais relacionadas com o cargo e empresa
            </p>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button onClick={addExperience} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Outra Experiência
        </Button>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Liste as experiências mais recentes primeiro. 
          Use a IA para gerar descrições profissionais adaptadas ao seu cargo.
        </p>
      </div>
    </div>
  );
}
