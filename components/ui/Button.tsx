import { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "default" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 active:scale-95",
  outline:
    "px-4 py-2 text-sm font-bold text-slate-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 uppercase tracking-wide hover:shadow-md active:scale-95",
  default:
    "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all active:scale-95",
  ghost:
    "text-lg font-bold text-slate-400 hover:text-slate-200 transition-colors shrink-0 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg",
};

export const Button = ({
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = variantClasses[variant];
  const finalClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return <button className={finalClasses} {...props} />;
};
