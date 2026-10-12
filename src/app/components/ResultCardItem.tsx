import React from "react";

interface ResultCardItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  large?: boolean;
  animated?: boolean;
}

export const ResultCardItem = ({
  icon,
  label,
  value,
  large = false,
  animated = true,
}: ResultCardItemProps) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors ${
        animated ? "animate-fade-in" : ""
      }`}>
      <div
        className={`flex items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 flex-shrink-0 ${
          large ? "w-16 h-16" : "w-12 h-12"
        }`}>
        <div className={large ? "w-8 h-8" : "w-6 h-6"}>{icon}</div>
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p
          className={`font-black text-white ${
            large ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          }`}>
          {value}
        </p>
      </div>
    </div>
  );
};
