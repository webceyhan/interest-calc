import { useContext } from "react";
import { BankProductListContext } from "@/contexts/BankProductListContext";

export const useBankProductList = () => {
  const context = useContext(BankProductListContext);
  if (!context) {
    throw new Error("useBankProductList must be used within BankProductListProvider");
  }
  return context;
};
