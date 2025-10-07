export interface FinancialTransaction {
  id: string;
  userId: string;
  reservationId?: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  paymentMethod: PaymentMethod;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 
  | 'deposit'
  | 'payment'
  | 'refund'
  | 'fee'
  | 'discount'
  | 'adjustment';

export type TransactionStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'
  | 'cash'
  | 'check';

export interface TransactionDetails {
  id: string;
  transactionId: string;
  gatewayTransactionId?: string;
  gatewayResponse?: string;
  fees: number;
  netAmount: number;
  metadata?: Record<string, unknown>;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'cancelled';
  clientSecret?: string;
  createdAt: string;
}
