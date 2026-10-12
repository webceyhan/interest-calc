import { useContext } from "react";
import { BankProductContext } from "@/contexts/BankProductContext";

export const useBankProduct = () => {
  const context = useContext(BankProductContext);
  if (!context) {
    throw new Error("useBankProduct must be used within BankProductProvider");
  }
  return context;
};
