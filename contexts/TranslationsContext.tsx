import { createContext, useState } from "react";
import type { Language } from "@/types";
import { messages } from "@/i18n";
import { DEFAULT_LANGUAGE } from "@/constants";

export type TranslationKeys = {
  title: string;
  subtitle: string;
  termDays: string;
  amount: string;
  interestRate: string;
  compoundInterest: string;
  dayCount: string;
  interestRateLabel: string;
  withholdingRate: string;
  withholdingAmount: string;
  netInterest: string;
  finalAmount: string;
  reservationAmount: string;
  compare: string;
  comparisons: string;
  bankName: string;
  enterBankName: string;
  remove: string;
  clearAll: string;
  reset: string;
  rounded: string;
  precise: string;
  noComparisons: string;
  addBanksToCompare: string;
  comparisonStep1: string;
  comparisonStep2: string;
  comparisonStep3: string;
  share: string;
  copied: string;
  save: string;
  cancel: string;
};

interface TranslationsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationKeys;
}

export const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export const TranslationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const t = messages[language];

  return (
    <TranslationsContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
};
