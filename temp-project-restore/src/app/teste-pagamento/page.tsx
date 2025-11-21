"use client";

import { useState } from "react";
import { CreditCard, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function TestePagamento() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleTestPayment = async () => {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      // Criar sessão de checkout
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData: {
            nome: "Teste de Pagamento",
            email: "teste@exemplo.com",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(`Erro: ${data.error || "Erro ao criar sessão de checkout"}`);
        setMessageType("error");
        setLoading(false);
        return;
      }

      const { url } = data;

      if (!url) {
        setMessage("Erro: URL de checkout não foi retornada");
        setMessageType("error");
        setLoading(false);
        return;
      }

      setMessage("Redirecionando para checkout...");
      setMessageType("success");

      // Redirecionar para a URL do checkout
      window.location.href = url;
    } catch (error: any) {
      console.error("Erro:", error);
      setMessage(`Erro: ${error.message || "Erro desconhecido"}`);
      setMessageType("error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Teste de Pagamento Stripe
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Modo de teste ativo - Use cartões de teste
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Cartões de Teste da Stripe
          </h2>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded">
              <span className="font-mono">4242 4242 4242 4242</span>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                Sucesso
              </span>
            </div>
            <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded">
              <span className="font-mono">4000 0000 0000 0002</span>
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                Recusado
              </span>
            </div>
            <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded">
              <span className="font-mono">4000 0025 0000 3155</span>
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                Requer autenticação
              </span>
            </div>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-3">
            💡 Use qualquer data futura e qualquer CVV de 3 dígitos
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Detalhes do Teste
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Produto:</span>
              <span className="font-semibold">Currículo Profissional</span>
            </div>
            <div className="flex justify-between">
              <span>Valor:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                R$ 19,90
              </span>
            </div>
            <div className="flex justify-between">
              <span>Modo:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Teste
              </span>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              messageType === "success"
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                messageType === "success"
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        <button
          onClick={handleTestPayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Iniciar Teste de Pagamento
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            🔒 Ambiente de teste seguro - Nenhuma cobrança real será feita
          </p>
        </div>
      </div>
    </div>
  );
}
