export interface BankData {
  name: string;
  interestRate: number;
  reservedAmount: number;
}

export const DEFAULT_BANKS: BankData[] = [
  {
    name: "ING",
    interestRate: 44,
    reservedAmount: 285000,
  },
  {
    name: "TEB",
    interestRate: 42,
    reservedAmount: 485000,
  },
  {
    name: "Yapı Kredi",
    interestRate: 40.25,
    reservedAmount: 300000,
  },
  {
    name: "Vakıfbank",
    interestRate: 38,
    reservedAmount: 450000,
  },
];
