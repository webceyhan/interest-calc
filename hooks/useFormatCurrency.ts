import { useContext } from "react";
import { NumberFormatContext } from "@/contexts/NumberFormatContext";

export const useNumberFormat = () => {
  const context = useContext(NumberFormatContext);
  if (!context) {
    throw new Error("useNumberFormat must be used within NumberFormatProvider");
  }
  return context;
};

export const useFormatCurrency = () => {
  const { isRounded } = useNumberFormat();

  return (value: number) => {
    return value.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: isRounded ? 0 : 2,
      maximumFractionDigits: isRounded ? 0 : 2,
    });
  };
};
