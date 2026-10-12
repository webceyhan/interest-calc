const WITHHOLDING_RATE = 0.15;
const DAYS_PER_YEAR = 365;

export interface DepositCalculation {
  grossInterest: number;
  withholdingAmount: number;
  netInterest: number;
  finalAmount: number;
}

export function calculateDeposit(
  principal: number,
  days: number,
  annualRate: number,
  withholdingRate: number,
  reservedAmount: number = 0
): DepositCalculation {
  const effectivePrincipal = Math.max(0, principal - reservedAmount);
  const dailyRate = annualRate / 100 / DAYS_PER_YEAR;
  const grossInterest = effectivePrincipal * dailyRate * days;
  const withholdingAmount = grossInterest * withholdingRate;
  const netInterest = grossInterest - withholdingAmount;
  const finalAmount = principal + netInterest;

  return {
    grossInterest,
    withholdingAmount,
    netInterest,
    finalAmount,
  };
}

export function formatCurrency(value: number, rounded: boolean = true): string {
  const displayValue = rounded ? Math.round(value) : value;
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: rounded ? 0 : 2,
    maximumFractionDigits: rounded ? 0 : 2,
  }).format(displayValue);
}
