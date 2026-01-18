
export interface User {
  id: string;
  name: string;
  cardNumber: string;
  balance: number;
  accountType: 'Corrente' | 'Poupança';
  accountNumber: string;
}

export interface Transaction {
  id: string;
  type: 'Entrada' | 'Saída';
  category: string;
  amount: number;
  date: string;
  description: string;
  receiver?: string;
  transferMethod?: 'IBAN' | 'Orange Money' | 'Western Union';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface GeminiMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  type: 'Débito' | 'Crédito';
  brand: 'Visa' | 'Mastercard' | 'Outro';
  balance: number;
  isActive: boolean;
  accountNumber: string;
  bank: 'Orabank' | 'Ecobank' | 'Bao';
}
