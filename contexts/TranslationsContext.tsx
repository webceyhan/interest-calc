import { createContext, useContext, useState } from "react";
import type { Language, TranslationKeys } from "@/types";
import { translations } from "@/i18n";
import { DEFAULT_LANGUAGE } from "@/constants";

interface TranslationsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationKeys;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export const TranslationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const t = translations[language];

  return (
    <TranslationsContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslations must be used within TranslationsProvider");
  }
  return context;
};
