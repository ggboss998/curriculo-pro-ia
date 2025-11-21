'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  resumeData: any;
  disabled?: boolean;
}

export function PaymentButton({ resumeData, disabled }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      
      // Aqui você pode adicionar lógica de download do PDF
      // Por enquanto, apenas simula o processo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Download iniciado! (Funcionalidade de pagamento removida)');
    } catch (error: any) {
      console.error('Erro:', error);
      alert('Erro ao processar download: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled || loading}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Baixar Currículo
        </>
      )}
    </button>
  );
}
