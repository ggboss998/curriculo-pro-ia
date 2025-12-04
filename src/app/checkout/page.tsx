"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MessageSquare, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { ResumePreview } from "@/components/builder/ResumePreview";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "whatsapp">("email");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Recuperar dados do currículo do localStorage ou sessionStorage
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  const handleFinalize = async () => {
    setIsProcessing(true);

    // Simulação de processamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirecionar para página de sucesso
    window.location.href = "/success";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/builder"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Finalizar Pedido
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Delivery Form */}
          <div className="space-y-6">
            {/* Delivery Method */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Método de Entrega
              </h2>

              <div className="space-y-4">
                {/* Email Option */}
                <button
                  onClick={() => setDeliveryMethod("email")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    deliveryMethod === "email"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        deliveryMethod === "email"
                          ? "bg-blue-600"
                          : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    >
                      <Mail
                        className={`w-6 h-6 ${
                          deliveryMethod === "email"
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Email
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receba o PDF por email instantaneamente
                      </p>
                    </div>
                    {deliveryMethod === "email" && (
                      <Check className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </button>

                {/* WhatsApp Option */}
                <button
                  onClick={() => setDeliveryMethod("whatsapp")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    deliveryMethod === "whatsapp"
                      ? "border-green-600 bg-green-50 dark:bg-green-950/30"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        deliveryMethod === "whatsapp"
                          ? "bg-green-600"
                          : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    >
                      <MessageSquare
                        className={`w-6 h-6 ${
                          deliveryMethod === "whatsapp"
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        WhatsApp
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receba o PDF diretamente no WhatsApp
                      </p>
                    </div>
                    {deliveryMethod === "whatsapp" && (
                      <Check className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </button>
              </div>

              {/* Contact Input */}
              <div className="mt-6 space-y-2">
                {deliveryMethod === "email" ? (
                  <>
                    <Label htmlFor="email">Email para Entrega *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-base"
                    />
                  </>
                ) : (
                  <>
                    <Label htmlFor="whatsapp">Número WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+351 912 345 678"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="text-base"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Pagamento
              </h2>
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💳 <strong>Valor:</strong> 10€ (IVA incluído)
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
                  O pagamento será processado após a finalização do pedido.
                </p>
              </div>
            </div>

            {/* Finalize Button */}
            <Button
              onClick={handleFinalize}
              disabled={
                isProcessing ||
                (deliveryMethod === "email" ? !email : !whatsapp)
              }
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  A processar pedido...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Finalizar Pedido
                </>
              )}
            </Button>

            {/* Security Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Check className="w-4 h-4 text-green-600" />
              <span>Pagamento seguro e encriptado</span>
            </div>
          </div>

          {/* Right Side - Resume Preview */}
          <div className="sticky top-24 h-fit">
            {resumeData ? (
              <ResumePreview data={resumeData} template={resumeData.selectedTemplate || "modern"} />
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  A carregar pré-visualização do currículo...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
