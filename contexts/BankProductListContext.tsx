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

const DUMMY_BANKS: ComparisonItem[] = [
  {
    id: "dummy-1",
    bankName: "ING Türkiye",
    interestRate: 24.5,
    reservationAmount: 5000,
  },
  {
    id: "dummy-2",
    bankName: "TEB",
    interestRate: 23.75,
    reservationAmount: 10000,
  },
  {
    id: "dummy-3",
    bankName: "Yapı Kredi",
    interestRate: 24.0,
    reservationAmount: 0,
  },
  {
    id: "dummy-4",
    bankName: "Vakıfbank",
    interestRate: 23.5,
    reservationAmount: 2500,
  },
];

export const BankProductListProvider = ({ children }: BankProductListProviderProps) => {
  const [items, setItems] = useState<ComparisonItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("/api/banks");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const banks: BankData[] = await response.json();
        setItems(transformBanksToItems(banks));
      } catch (error) {
        console.warn("Failed to load banks from API, using dummy data:", error);
        setItems(DUMMY_BANKS);
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
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const banks: BankData[] = await response.json();
      setItems(transformBanksToItems(banks));
    } catch (error) {
      console.warn("Failed to reset banks from API, using dummy data:", error);
      setItems(DUMMY_BANKS);
    }
  };

  return (
    <BankProductListContext.Provider value={{ items, addProduct, removeProduct, updateProduct, resetProducts }}>
      {children}
    </BankProductListContext.Provider>
  );
};
