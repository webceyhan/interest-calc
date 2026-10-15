import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/Button";

export const LanguageSelector = () => {
  const { language, setLanguage } = useTranslations();

  return (
    <Button
      variant="ghost"
      onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
      title={language === "tr" ? "English" : "Türkçe"}
      className="text-sm font-medium"
    >
      {language === "tr" ? "EN" : "TR"}
    </Button>
  );
};
