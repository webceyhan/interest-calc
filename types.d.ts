// Bank types
export interface BankData {
  name: string;
  interestRate: number;
  reservedAmount: number;
}

// Calculation types
export interface CalculationResult {
  interest: number;
  withholding: number;
  netInterest: number;
  finalAmount: number;
}

// Translation types
export type Language = "tr" | "en";

// Comparison types
export interface ComparisonItem {
  id: string;
  bankName: string;
  interestRate: number;
  reservationAmount: number;
}
