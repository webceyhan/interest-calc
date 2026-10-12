import type { Language, TranslationKeys } from "../utils/translations";

interface TopNavProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isRounded: boolean;
  onRoundedChange: (rounded: boolean) => void;
  t: TranslationKeys;
}

export const TopNav = ({
  language,
  onLanguageChange,
  isRounded,
  onRoundedChange,
  t,
}: TopNavProps) => {
  return (
    <div className="flex items-center justify-end gap-6 mb-8 md:mb-12 pb-6 md:pb-8 border-b border-slate-700/50">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isRounded}
          onChange={(e) => onRoundedChange(e.target.checked)}
          className="w-5 h-5 accent-blue-500 cursor-pointer"
          title={isRounded ? t.rounded : t.precise}
        />
        <span className="text-slate-400 font-medium text-sm">{t.rounded}</span>
      </label>
      <div className="text-sm">
        <button
          onClick={() => onLanguageChange(language === "tr" ? "en" : "tr")}
          className="font-medium text-slate-400 hover:text-slate-300 transition-colors"
        >
          {language === "tr" ? "English" : "Türkçe"}
        </button>
      </div>
    </div>
  );
};
