"use client";

import { useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";

export const LanguageSync = () => {
  const { language } = useTranslations();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
};
