import type { Language, TranslationKeys } from "../utils/translations";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isRounded: boolean;
  onRoundedChange: (rounded: boolean) => void;
  t: TranslationKeys;
}

export const Header = ({ language, onLanguageChange, isRounded, onRoundedChange, t }: HeaderProps) => {
  const controls = (
    <div className="flex items-center gap-6">
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
          className="font-medium text-slate-400 hover:text-slate-300 transition-colors">
          {language === "tr" ? "English" : "Türkçe"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Title on top, controls below */}
      <div className="md:hidden mb-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {t.title}
          </h1>
          <p className="text-base text-slate-400 font-medium">{t.subtitle}</p>
        </div>
        {controls}
      </div>

      {/* Desktop: Title and controls side-by-side */}
      <div className="hidden md:flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-slate-400 font-medium">{t.subtitle}</p>
        </div>
        {controls}
      </div>
    </>
  );
};
