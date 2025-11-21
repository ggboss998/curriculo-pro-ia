import { supabase } from './supabase';

export interface Payment {
  id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  created_at: string;
  // Campos adicionais para compatibilidade com o sistema existente
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  resume_data?: string;
  payment_intent_id?: string;
  pdf_sent_email?: boolean;
  pdf_sent_whatsapp?: boolean;
}

export const paymentsDB = {
  create: async (payment: Omit<Payment, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar pagamento:', error);
      throw error;
    }

    return data;
  },

  findById: async (id: string): Promise<Payment | null> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar pagamento:', error);
      return null;
    }

    return data;
  },

  findByUserId: async (userId: string): Promise<Payment[]> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar pagamentos do usuário:', error);
      return [];
    }

    return data || [];
  },

  findByPaymentIntent: async (paymentIntentId: string): Promise<Payment | null> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_intent_id', paymentIntentId)
      .single();

    if (error) {
      console.error('Erro ao buscar pagamento por payment_intent_id:', error);
      return null;
    }

    return data;
  },

  update: async (id: string, updates: Partial<Payment>) => {
    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar pagamento:', error);
      throw error;
    }

    return data;
  },

  markEmailSent: async (id: string) => {
    return await paymentsDB.update(id, { pdf_sent_email: true });
  },

  markWhatsAppSent: async (id: string) => {
    return await paymentsDB.update(id, { pdf_sent_whatsapp: true });
  },

  // Métodos adicionais úteis
  findByStatus: async (status: 'pending' | 'completed' | 'failed'): Promise<Payment[]> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar pagamentos por status:', error);
      return [];
    }

    return data || [];
  },

  getAll: async (): Promise<Payment[]> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar todos os pagamentos:', error);
      return [];
    }

    return data || [];
  },
};

// Manter compatibilidade com código existente
export const ordersDB = paymentsDB;
