"use client";

import { useEffect, useState } from "react";
import { CheckoutForm } from "@/components/payment/CheckoutForm";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Carregar dados do localStorage
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Carregando dados do currículo...
          </p>
          <Link href="/builder">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Editor
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pagamento Confirmado! 🎉
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Seu currículo profissional sem marca d'água foi enviado para o seu email.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>📧 Verifique sua caixa de entrada</strong>
              <br />
              Enviamos o PDF para: <strong>{resumeData.personalData.email}</strong>
            </p>
            {resumeData.personalData.phone && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                <strong>📱 WhatsApp</strong>
                <br />
                Também enviamos para: <strong>{resumeData.personalData.phone}</strong>
              </p>
            )}
          </div>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/builder"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Editor</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Finalizar Compra
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <CheckoutForm
              resumeData={resumeData}
              onSuccess={() => setPaymentSuccess(true)}
            />
          </div>

          {/* Preview */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Pré-visualização do seu Currículo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Após o pagamento, você receberá este currículo <strong>sem marca d'água</strong>
              </p>
            </div>
            <ResumePreview data={resumeData} template={resumeData.selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}
