import { createContext, useState } from "react";
import type { Language } from "@/types";
import { translations, type TranslationKeys } from "@/i18n";
import { DEFAULT_LANGUAGE } from "@/constants";

interface TranslationsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationKeys;
}

export const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export const TranslationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const t = translations[language];

  return (
    <TranslationsContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
};
