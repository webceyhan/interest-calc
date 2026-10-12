interface ComparisonItemWithResults {
  bankName: string;
  interestRate: number;
  netInterest: number;
  finalAmount: number;
}

interface ShareOptions {
  items: ComparisonItemWithResults[];
  amount: number;
  termDays: number;
  formatCurrency: (value: number) => string;
  copiedMessage: string;
}

export const shareComparison = async (options: ShareOptions): Promise<boolean> => {
  const { items, amount, termDays, formatCurrency, copiedMessage } = options;
  
  if (items.length === 0) return false;

  const maxBankLength = Math.max(...items.map(item => item.bankName.length));
  
  const shareText = `Bank Comparison\nAmount: ₺${amount.toLocaleString()}\nDays: ${termDays}\n\n${items
    .map((item, i) => {
      const bankName = item.bankName.padEnd(maxBankLength);
      const rate = `%${item.interestRate.toFixed(1)}`.padStart(5);
      const net = formatCurrency(item.netInterest).padStart(10);
      const final = formatCurrency(item.finalAmount).padStart(10);
      const star = i === 0 ? "  ⭐" : "";
      return `${bankName}  ${rate}  Net: ${net}  Final: ${final}${star}`;
    })
    .join("\n")}`;
  
  try {
    await navigator.clipboard.writeText(shareText);
    alert(copiedMessage);
    return true;
  } catch {
    alert("Failed to copy");
    return false;
  }
};
