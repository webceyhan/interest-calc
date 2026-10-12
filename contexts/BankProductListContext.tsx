import { createContext, useState, ReactNode } from "react";
import type { ComparisonItem } from "@/types";
import { DEFAULT_BANKS } from "@/utils/banks";

interface BankProductListContextType {
  items: ComparisonItem[];
  addProduct: (product: ComparisonItem) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<ComparisonItem>) => void;
  resetProducts: () => void;
}

export const BankProductListContext = createContext<BankProductListContextType | undefined>(
  undefined
);

interface BankProductListProviderProps {
  children: ReactNode;
}

export const BankProductListProvider = ({ children }: BankProductListProviderProps) => {
  const [items, setItems] = useState<ComparisonItem[]>(() =>
    DEFAULT_BANKS.map((bank, index) => ({
      id: `bank-${index}`,
      bankName: bank.name,
      interestRate: bank.interestRate,
      reservationAmount: bank.reservedAmount,
    }))
  );

  const addProduct = (product: ComparisonItem) => {
    setItems([...items, product]);
  };

  const removeProduct = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateProduct = (id: string, updates: Partial<ComparisonItem>) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const resetProducts = () => {
    setItems(
      DEFAULT_BANKS.map((bank, index) => ({
        id: `bank-${index}`,
        bankName: bank.name,
        interestRate: bank.interestRate,
        reservationAmount: bank.reservedAmount,
      }))
    );
  };

  return (
    <BankProductListContext.Provider value={{ items, addProduct, removeProduct, updateProduct, resetProducts }}>
      {children}
    </BankProductListContext.Provider>
  );
};
