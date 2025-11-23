"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Phone, User, CreditCard, Check, Shield, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CheckoutFormProps {
  resumeData: any;
  onSuccess: () => void;
}

export function CheckoutForm({ resumeData, onSuccess }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: resumeData.personalData.name || "",
    email: resumeData.personalData.email || "",
    phone: resumeData.personalData.phone || "",
    birthDate: resumeData.personalData.birthDate || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar dados
      if (!formData.name || !formData.email) {
        toast.error("Por favor, preencha todos os campos obrigatórios");
        setLoading(false);
        return;
      }

      // Criar Payment Intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 999,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerBirthDate: formData.birthDate,
          resumeData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao processar pagamento");
      }

      const data = await response.json();
      
      // Verificar se há warning (erro no DB mas pagamento criado)
      if (data.warning) {
        console.warn(data.warning);
      }

      const { clientSecret, orderId } = data;

      if (!clientSecret) {
        throw new Error("Erro ao obter dados de pagamento");
      }

      // Simular pagamento bem-sucedido (em produção, use Stripe Elements)
      // Aguardar 2 segundos para simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Verificar se o pagamento foi processado
      const verifyResponse = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Erro ao verificar pagamento");
      }

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        toast.success("Pagamento processado com sucesso! 🎉");
        toast.info("Você receberá o PDF sem marca d'água por email em instantes.");
        
        // Salvar ID do pedido
        localStorage.setItem("orderId", orderId);
        
        onSuccess();
      } else {
        throw new Error("Pagamento não foi confirmado");
      }
    } catch (error) {
      console.error("Erro:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Erro ao processar pagamento: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-600" />
          Finalizar Compra
        </CardTitle>
        <CardDescription>
          Complete o pagamento para receber seu currículo profissional sem marca d'água
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Cliente */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Seu nome completo"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="seu@email.com"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                📧 Enviaremos o PDF para este email
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                WhatsApp (Opcional)
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+351 912 345 678"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                📱 Também podemos enviar por WhatsApp
              </p>
            </div>

            <div>
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Data de Nascimento (Opcional)
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                📅 Para personalização do currículo
              </p>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-lg mb-4">Resumo do Pedido</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Currículo Profissional</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    PDF sem marca d'água, pronto para enviar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Envio Instantâneo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receba imediatamente no seu email
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Suporte Profissional</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ajuda sempre que precisar
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  €9.99
                </span>
              </div>
            </div>
          </div>

          {/* Informação de Segurança */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Pagamento 100% Seguro
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Processado pelo Stripe. Seus dados estão protegidos com criptografia SSL.
              </p>
            </div>
          </div>

          {/* Botão de Pagamento */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processando Pagamento...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pagar €9.99 com Cartão
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Ao clicar em "Pagar", você concorda com nossos{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
