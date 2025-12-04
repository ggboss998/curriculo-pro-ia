"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StepPersonalData } from "@/components/builder/StepPersonalData";
import { StepPresentation } from "@/components/builder/StepPresentation";
import { StepExperience } from "@/components/builder/StepExperience";
import { StepEducation } from "@/components/builder/StepEducation";
import { StepLanguages } from "@/components/builder/StepLanguages";
import { StepCertifications } from "@/components/builder/StepCertifications";
import { StepSkills } from "@/components/builder/StepSkills";
import { StepTemplate } from "@/components/builder/StepTemplate";
import { ResumePreview } from "@/components/builder/ResumePreview";

const steps = [
  { id: 1, name: "Dados Pessoais", description: "Informações básicas" },
  { id: 2, name: "Apresentação", description: "Perfil profissional" },
  { id: 3, name: "Experiência", description: "Histórico profissional" },
  { id: 4, name: "Formação", description: "Educação académica" },
  { id: 5, name: "Línguas", description: "Idiomas que domina" },
  { id: 6, name: "Formações", description: "Cursos complementares" },
  { id: 7, name: "Competências", description: "Skills e habilidades" },
  { id: 8, name: "Template", description: "Escolha o design" },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState({
    personalData: {
      name: "",
      email: "",
      phone: "",
      location: "",
      photo: "",
      photoPosition: { x: 50, y: 50 },
    },
    presentation: "",
    experience: [],
    education: [],
    languages: [],
    certifications: [],
    skills: [],
    selectedTemplate: "modern",
  });

  const updateResumeData = (field: string, value: any) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar dados no localStorage antes de ir para checkout
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      // Ir para página de pagamento
      window.location.href = "/checkout";
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepPersonalData
            data={resumeData.personalData}
            onChange={(data) => updateResumeData("personalData", data)}
          />
        );
      case 2:
        return (
          <StepPresentation
            data={resumeData.presentation}
            onChange={(data) => updateResumeData("presentation", data)}
          />
        );
      case 3:
        return (
          <StepExperience
            data={resumeData.experience}
            onChange={(data) => updateResumeData("experience", data)}
          />
        );
      case 4:
        return (
          <StepEducation
            data={resumeData.education}
            onChange={(data) => updateResumeData("education", data)}
          />
        );
      case 5:
        return (
          <StepLanguages
            data={resumeData.languages}
            onChange={(data) => updateResumeData("languages", data)}
          />
        );
      case 6:
        return (
          <StepCertifications
            data={resumeData.certifications}
            onChange={(data) => updateResumeData("certifications", data)}
          />
        );
      case 7:
        return (
          <StepSkills
            data={resumeData.skills}
            onChange={(data) => updateResumeData("skills", data)}
          />
        );
      case 8:
        return (
          <StepTemplate
            selectedTemplate={resumeData.selectedTemplate}
            onChange={(template) => updateResumeData("selectedTemplate", template)}
            resumeData={resumeData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Currículo Pro IA
            </h1>
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.id
                        ? "bg-green-600 text-white"
                        : currentStep === step.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block">
                    <p
                      className={`text-xs font-medium ${
                        currentStep >= step.id
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 h-1 mx-1 transition-all ${
                      currentStep > step.id
                        ? "bg-green-600"
                        : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {steps[currentStep - 1].name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {steps[currentStep - 1].description}
              </p>
            </div>

            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              {currentStep > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}
              <Button
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {currentStep === steps.length ? (
                  <>
                    Finalizar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Preview Section - Sempre visível com template selecionado */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <ResumePreview data={resumeData} template={resumeData.selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}
