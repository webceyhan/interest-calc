import { useTranslations } from "@/hooks/useTranslations";
import { LanguageSelector } from "@/components/LanguageSelector";
import { RoundingSelector } from "@/components/RoundingSelector";
import { GithubLink } from "@/components/GithubLink";

export const Header = () => {
  const { t } = useTranslations();

  return (
    <div className="flex max-md:flex-col-reverse justify-between mb-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight">
          {t.title}
        </h1>
        <p className="text-base md:text-lg text-slate-400 font-medium">
          {t.subtitle}
        </p>
      </div>

      <div className="flex justify-end items-center gap-2 mb-4">
        <RoundingSelector />
        <LanguageSelector />
        <GithubLink />
      </div>
    </div>
  );
};
