import { useContext } from "react";
import { DepositContext } from "@/contexts/DepositContext";

export const useDeposit = () => {
  const context = useContext(DepositContext);
  if (!context) {
    throw new Error("useDeposit must be used within DepositProvider");
  }
  return context;
};
