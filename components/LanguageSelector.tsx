import { useTranslations } from "@/hooks/useTranslations";

export const LanguageSelector = () => {
  const { language, setLanguage } = useTranslations();

  return (
    <button
      onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-300 font-medium text-sm"
      title={language === "tr" ? "English" : "Türkçe"}
    >
      {language === "tr" ? "EN" : "TR"}
    </button>
  );
};
