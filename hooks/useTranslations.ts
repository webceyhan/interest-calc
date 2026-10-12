import { useContext } from "react";
import { TranslationsContext } from "@/contexts/TranslationsContext";

export const useTranslations = () => {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslations must be used within TranslationsProvider");
  }
  return context;
};
