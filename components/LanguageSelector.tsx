import { useTranslations } from "@/hooks/useTranslations";

export const LanguageSelector = () => {
  const { language, setLanguage } = useTranslations();

  return (
    <div className="text-sm">
      <button
        onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
        className="font-medium text-slate-400 hover:text-slate-300 transition-colors"
      >
        {language === "tr" ? "English" : "Türkçe"}
      </button>
    </div>
  );
};
