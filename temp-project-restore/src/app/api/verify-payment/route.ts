import { NextRequest, NextResponse } from 'next/server';
import { paymentsDB } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID do pedido não fornecido' },
        { status: 400 }
      );
    }

    // Buscar pagamento no banco de dados
    try {
      const payment = await paymentsDB.getById(orderId);

      if (!payment) {
        return NextResponse.json(
          { error: 'Pedido não encontrado' },
          { status: 404 }
        );
      }

      // Verificar se o pagamento foi bem-sucedido
      const isSuccess = payment.status === 'succeeded' || payment.status === 'pending';

      return NextResponse.json({
        success: isSuccess,
        status: payment.status,
        orderId: payment.id,
      });
    } catch (dbError) {
      console.error('Erro ao buscar pagamento:', dbError);
      
      // Se houver erro no DB, assumir que o pagamento está pendente
      // (para não bloquear o fluxo em caso de problemas temporários)
      return NextResponse.json({
        success: true,
        status: 'pending',
        orderId: orderId,
        warning: 'Não foi possível verificar status no banco de dados, assumindo pendente'
      });
    }
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return NextResponse.json(
      { 
        error: 'Erro ao verificar pagamento',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
