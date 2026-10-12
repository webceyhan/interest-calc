import { LanguageSelector } from "@/components/LanguageSelector";
import { RoundingSelector } from "@/components/RoundingSelector";
import { GithubLink } from "@/components/GithubLink";

export const TopNav = () => {
  return (
    <div className="flex items-center justify-end gap-6 py-4 md:py-6">
      <RoundingSelector />
      <LanguageSelector />
      <GithubLink />
    </div>
  );
};
