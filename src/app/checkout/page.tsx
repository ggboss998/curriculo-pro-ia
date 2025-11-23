"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Download, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumePreview } from "@/components/builder/ResumePreview";

export default function CheckoutPage() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Carregar dados do localStorage
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setResumeData(data);
        console.log("✅ Dados do currículo carregados:", data);
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
      }
    } else {
      console.warn("⚠️ Nenhum dado encontrado no localStorage");
    }
  }, []);

  const handleDownloadPDF = async () => {
    console.log("🎯 BOTÃO CLICADO - Iniciando geração de PDF");
    
    if (!resumeData) {
      console.error("❌ Dados não encontrados");
      alert("❌ Nenhum dado de currículo encontrado. Por favor, volte ao editor e preencha seus dados.");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Importar bibliotecas dinamicamente
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const preview = document.getElementById("cv-preview");
      
      if (!preview) {
        console.error("❌ Elemento cv-preview não encontrado");
        alert("❌ Erro ao capturar preview. Por favor, recarregue a página.");
        setIsGenerating(false);
        return;
      }

      console.log("📸 Capturando preview com html2canvas...");
      
      // Capturar elemento como imagem de alta qualidade
      const canvas = await html2canvas(preview, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
      });
      
      console.log("✅ Canvas gerado:", canvas.width, "x", canvas.height);

      // Criar PDF no formato A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Dimensões A4 em mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calcular dimensões da imagem mantendo proporção
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Converter canvas para imagem
      const imgData = canvas.toDataURL("image/png", 1.0);

      // Adicionar imagem ao PDF
      if (imgHeight <= pdfHeight) {
        // Cabe em uma página
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // Precisa de múltiplas páginas
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      // Nome do arquivo
      const fileName = resumeData?.personalData?.name 
        ? `Curriculo_${resumeData.personalData.name.replace(/\s+/g, '_')}.pdf`
        : 'Curriculo_Profissional.pdf';

      console.log("💾 Salvando PDF:", fileName);

      // Salvar PDF
      pdf.save(fileName);
      
      console.log("✅ PDF gerado e baixado com sucesso!");
      alert(`✅ PDF gerado com sucesso!\n\n📄 Arquivo: ${fileName}\n📏 Formato: A4\n🎨 Design: ${resumeData.selectedTemplate}\n\nO download deve iniciar automaticamente.`);
      
      setIsGenerating(false);
      
    } catch (error: any) {
      console.error("❌ ERRO AO GERAR PDF:", error);
      alert(`❌ Erro ao gerar o PDF.\n\nDetalhes: ${error.message || 'Erro desconhecido'}\n\nPor favor, tente novamente ou recarregue a página.`);
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!resumeData?.personalData?.email) {
      alert("Email não encontrado nos dados do currículo");
      return;
    }

    // Primeiro gerar o PDF
    await handleDownloadPDF();
    
    // Depois abrir cliente de email
    setTimeout(() => {
      const subject = "Seu Currículo Profissional";
      const body = `Olá!\n\nSegue em anexo o meu currículo profissional.\n\nAtenciosamente,\n${resumeData.personalData.name || ''}`;
      
      window.open(`mailto:${resumeData.personalData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      alert("✅ O PDF foi gerado. Salve-o e anexe ao email que acabou de abrir.");
    }, 1000);
  };

  const handleSendWhatsApp = async () => {
    // Primeiro gerar o PDF
    await handleDownloadPDF();
    
    // Depois abrir WhatsApp
    setTimeout(() => {
      const message = "Olá! Segue o meu currículo profissional em anexo.";
      const phone = resumeData?.personalData?.phone?.replace(/\D/g, '') || '';
      
      if (phone) {
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
      }
      alert("✅ O PDF foi gerado. Salve-o e anexe à conversa do WhatsApp que acabou de abrir.");
    }, 1000);
  };

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
              Seu Currículo Está Pronto!
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      {/* Preview visível para captura */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ResumePreview data={resumeData} template={resumeData.selectedTemplate} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 Parabéns!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Seu currículo profissional está pronto para ser compartilhado
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="space-y-6">
            {/* Download PDF */}
            <div className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Baixar PDF
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Faça o download do seu currículo em formato PDF de alta qualidade (A4, idêntico ao preview)
                </p>
                <Button 
                  onClick={handleDownloadPDF}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isGenerating}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? "Gerando..." : "Baixar Agora"}
                </Button>
              </div>
            </div>

            {/* Enviar por Email */}
            <div className="flex items-start gap-4 p-6 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Enviar por Email
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Baixe o PDF e envie diretamente para o seu email
                </p>
                <Button 
                  onClick={handleSendEmail}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isGenerating || !resumeData?.personalData?.email}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isGenerating ? "Preparando..." : "Enviar Email"}
                </Button>
              </div>
            </div>

            {/* Compartilhar no WhatsApp */}
            <div className="flex items-start gap-4 p-6 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Compartilhar no WhatsApp
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Baixe o PDF e compartilhe via WhatsApp
                </p>
                <Button 
                  onClick={handleSendWhatsApp}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isGenerating}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isGenerating ? "Preparando..." : "Compartilhar"}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
