import { useContext } from "react";
import { CalculatorContext } from "@/contexts/BankProductContext";

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
};
