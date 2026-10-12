"use client";

import { useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";

export const DynamicTitle = () => {
  const { t } = useTranslations();

  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  return null;
};

