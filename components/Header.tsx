import type { TranslationKeys } from "../utils/translations";

interface HeaderProps {
  t: TranslationKeys;
}

export const Header = ({ t }: HeaderProps) => {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight">
        {t.title}
      </h1>
      <p className="text-base md:text-lg text-slate-400 font-medium">{t.subtitle}</p>
    </div>
  );
};
