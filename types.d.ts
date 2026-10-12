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

export type TranslationKeys = {
  title: string;
  subtitle: string;
  termDays: string;
  amount: string;
  interestRate: string;
  compoundInterest: string;
  dayCount: string;
  interestRateLabel: string;
  withholdingRate: string;
  withholdingAmount: string;
  netInterest: string;
  finalAmount: string;
  reservationAmount: string;
  compare: string;
  comparisons: string;
  bankName: string;
  enterBankName: string;
  remove: string;
  clearAll: string;
  reset: string;
  rounded: string;
  precise: string;
  noComparisons: string;
  addBanksToCompare: string;
  comparisonStep1: string;
  comparisonStep2: string;
  comparisonStep3: string;
  share: string;
  copied: string;
  save: string;
  cancel: string;
};

// Comparison types
export interface ComparisonItem {
  id: string;
  bankName: string;
  interestRate: number;
  reservationAmount: number;
}
