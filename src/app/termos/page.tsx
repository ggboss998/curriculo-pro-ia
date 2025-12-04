"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Shield, AlertCircle, Scale, UserCheck, Lock } from "lucide-react";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Termos de Uso
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Última atualização: 15 de Janeiro de 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 space-y-8">
            
            {/* Introdução */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mt-1">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    1. Introdução
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Bem-vindo ao Currículo Pro IA. Ao utilizar nossa plataforma, você concorda com estes Termos de Uso. 
                    Por favor, leia-os cuidadosamente antes de usar nossos serviços. Se você não concordar com qualquer 
                    parte destes termos, não deverá utilizar nossa plataforma.
                  </p>
                </div>
              </div>
            </div>

            {/* Aceitação dos Termos */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mt-1">
                  <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    2. Aceitação dos Termos
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    Ao criar uma conta ou utilizar qualquer funcionalidade do Currículo Pro IA, você declara que:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Tem pelo menos 18 anos de idade ou possui consentimento dos pais/responsáveis</li>
                    <li>Fornecerá informações verdadeiras, precisas e completas</li>
                    <li>Manterá suas credenciais de acesso seguras e confidenciais</li>
                    <li>É responsável por todas as atividades realizadas em sua conta</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Uso da Plataforma */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mt-1">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    3. Uso da Plataforma
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    Você concorda em usar o Currículo Pro IA apenas para fins legais e de acordo com estes Termos. 
                    É proibido:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Usar a plataforma para qualquer propósito ilegal ou não autorizado</li>
                    <li>Tentar obter acesso não autorizado a qualquer parte da plataforma</li>
                    <li>Interferir ou interromper o funcionamento da plataforma</li>
                    <li>Copiar, modificar ou distribuir conteúdo da plataforma sem autorização</li>
                    <li>Usar bots, scripts ou qualquer meio automatizado não autorizado</li>
                    <li>Fornecer informações falsas ou enganosas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Propriedade Intelectual */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mt-1">
                  <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    4. Propriedade Intelectual
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    Todo o conteúdo da plataforma, incluindo mas não limitado a textos, gráficos, logos, ícones, 
                    imagens, templates e software, é propriedade do Currículo Pro IA e está protegido por leis de 
                    direitos autorais e propriedade intelectual.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Os currículos criados por você pertencem a você, mas você nos concede uma licença limitada para 
                    armazenar e processar seu conteúdo para fornecer nossos serviços.
                  </p>
                </div>
              </div>
            </div>

            {/* Pagamentos e Assinaturas */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mt-1">
                  <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    5. Pagamentos e Assinaturas
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    Ao adquirir uma assinatura paga:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Os pagamentos são processados de forma segura através de provedores terceirizados</li>
                    <li>As assinaturas são renovadas automaticamente, salvo cancelamento prévio</li>
                    <li>Você pode cancelar sua assinatura a qualquer momento através das configurações da conta</li>
                    <li>Reembolsos são concedidos de acordo com nossa política de reembolso</li>
                    <li>Os preços estão sujeitos a alterações mediante aviso prévio</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitação de Responsabilidade */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mt-1">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    6. Limitação de Responsabilidade
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    O Currículo Pro IA é fornecido "como está" e "conforme disponível". Não garantimos que:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>O serviço será ininterrupto, seguro ou livre de erros</li>
                    <li>Os resultados obtidos serão precisos ou confiáveis</li>
                    <li>Quaisquer defeitos serão corrigidos</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                    Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais resultantes 
                    do uso ou incapacidade de usar nossa plataforma.
                  </p>
                </div>
              </div>
            </div>

            {/* Modificações dos Termos */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  7. Modificações dos Termos
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão 
                  em vigor imediatamente após a publicação na plataforma. O uso continuado da plataforma após as 
                  alterações constitui aceitação dos novos termos.
                </p>
              </div>
            </div>

            {/* Rescisão */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  8. Rescisão
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Podemos suspender ou encerrar sua conta e acesso à plataforma a qualquer momento, sem aviso prévio, 
                  por violação destes Termos ou por qualquer outro motivo que consideremos apropriado. Você também 
                  pode encerrar sua conta a qualquer momento através das configurações da plataforma.
                </p>
              </div>
            </div>

            {/* Lei Aplicável */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  9. Lei Aplicável
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Estes Termos de Uso são regidos pelas leis de Portugal. Qualquer disputa relacionada a estes termos 
                  será resolvida nos tribunais competentes de Lisboa, Portugal.
                </p>
              </div>
            </div>

            {/* Contato */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  10. Contato
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> suporte@curriculopro.pt
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Telefone:</strong> +351 912 345 678
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Endereço:</strong> Lisboa, Portugal
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à Página Inicial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
