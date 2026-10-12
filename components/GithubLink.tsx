import { GitHubIcon } from "@/components/Icons";

export const GithubLink = () => (
  <a
    href="https://github.com/webceyhan/interest-calc"
    target="_blank"
    rel="noopener noreferrer"
    className="text-lg font-bold text-slate-400 hover:text-slate-200 transition-colors shrink-0 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg"
    title="View on GitHub"
  >
    <GitHubIcon />
  </a>
);
