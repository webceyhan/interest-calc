interface CalculationResult {
  interest: number;
  withholding: number;
  netInterest: number;
  finalAmount: number;
}

export const calculateDeposit = (
  amount: number,
  termDays: number,
  interestRate: number,
  withholdingRate: number,
  reservationAmount: number = 0
): CalculationResult => {
  const effectiveAmount = amount - reservationAmount;
  const dailyRate = interestRate / 100 / 365;

  // Always use compound interest (automatic daily compounding)
  const compoundFactor = Math.pow(1 + dailyRate, termDays);
  const interest = effectiveAmount * (compoundFactor - 1);

  const withholding = interest * (withholdingRate / 100);
  const netInterest = interest - withholding;
  const finalAmount = amount + netInterest;

  return { interest, withholding, netInterest, finalAmount };
};
