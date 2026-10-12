export const formatCurrency = (value: number, isRounded: boolean = false): string => {
  return value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: isRounded ? 0 : 2,
    maximumFractionDigits: isRounded ? 0 : 2,
  });
};
