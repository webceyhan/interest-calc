import { createContext, useState, ReactNode, useEffect } from "react";
import type { ComparisonItem, BankData } from "@/types";

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

const transformBanksToItems = (banks: BankData[]): ComparisonItem[] =>
  banks.map((bank, index) => ({
    id: `bank-${index}`,
    bankName: bank.name,
    interestRate: bank.interestRate,
    reservationAmount: bank.reservedAmount,
  }));

export const BankProductListProvider = ({ children }: BankProductListProviderProps) => {
  const [items, setItems] = useState<ComparisonItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("/api/banks");
        const banks: BankData[] = await response.json();
        setItems(transformBanksToItems(banks));
      } catch (error) {
        console.error("Failed to load banks:", error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanks();
  }, []);

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

  const resetProducts = async () => {
    try {
      const response = await fetch("/api/banks");
      const banks: BankData[] = await response.json();
      setItems(transformBanksToItems(banks));
    } catch (error) {
      console.error("Failed to reset banks:", error);
    }
  };

  return (
    <BankProductListContext.Provider value={{ items, addProduct, removeProduct, updateProduct, resetProducts }}>
      {children}
    </BankProductListContext.Provider>
  );
};
