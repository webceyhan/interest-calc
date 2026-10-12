import { GitHubIcon } from "@/components/Icons";

export const GithubLink = () => (
  <a
    href="https://github.com/webceyhan/interest-calc"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-slate-300 transition-colors"
    title="View on GitHub"
  >
    <GitHubIcon />
  </a>
);
