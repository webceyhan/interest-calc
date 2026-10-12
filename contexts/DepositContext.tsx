import { createContext, useState } from "react";
import { DEFAULT_AMOUNT } from "@/constants";

interface DepositContextType {
  amount: number;
  setAmount: (amount: number) => void;
}

export const DepositContext = createContext<DepositContextType | undefined>(
  undefined
);

export const DepositProvider = ({ children }: { children: React.ReactNode }) => {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);

  return (
    <DepositContext.Provider value={{ amount, setAmount }}>
      {children}
    </DepositContext.Provider>
  );
};
