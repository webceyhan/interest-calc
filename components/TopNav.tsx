import { LanguageSelector } from "@/components/LanguageSelector";
import { RoundingSelector } from "@/components/RoundingSelector";
import { GitHubIcon } from "@/components/Icons";

export const TopNav = () => {
  return (
    <div className="flex items-center justify-end gap-6 py-4 md:py-6">
      <RoundingSelector />
      <LanguageSelector />
      <a
        href="https://github.com/webceyhan/interest-calc"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-slate-300 transition-colors"
        title="View on GitHub"
      >
        <GitHubIcon />
      </a>
    </div>
  );
};
