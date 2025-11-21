"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail, MessageSquare, Home } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-12 text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Pagamento Confirmado!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              O seu currículo está pronto e a caminho! 🎉
            </p>
          </div>

          {/* Delivery Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-900 dark:text-white">
                Entrega em Progresso
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Receberá o seu currículo em PDF nos próximos minutos através do 
                método de entrega selecionado.
              </p>
            </div>
          </div>

          {/* Download Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Descarregar Currículo Agora
          </Button>

          {/* Additional Info */}
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              O que acontece agora?
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Email de confirmação</strong> enviado com o recibo de pagamento
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Currículo em PDF</strong> entregue via email ou WhatsApp
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Suporte disponível</strong> para qualquer dúvida ou ajuste
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild variant="outline" className="flex-1" size="lg">
              <Link href="/builder">
                Criar Outro Currículo
              </Link>
            </Button>
            <Button asChild className="flex-1" size="lg">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Precisa de ajuda? Contacte-nos em{" "}
              <a
                href="mailto:suporte@curriculopro.pt"
                className="text-blue-600 hover:underline"
              >
                suporte@curriculopro.pt
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
