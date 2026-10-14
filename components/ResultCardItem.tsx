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
      className={`rounded-2xl p-3 md:p-6 bg-slate-700/40 border border-slate-600/50 transition-all ${
        animated ? "animate-fade-in" : ""
      }`}>
      <div className="flex items-start gap-4">
        <div className={`flex items-center justify-center w-12 md:w-14 h-12 md:h-14 bg-slate-500 rounded-full shrink-0 border border-slate-500/50 text-slate-900 ${large ? "md:w-16 md:h-16" : ""}`}>
          <div className={`${large ? "size-8 md:size-10" : "size-8"} *:size-full *:text-indigo-200`}>
            {icon}
          </div>
        </div>
        <div className={large ? "flex-1" : "flex-1 min-w-0"}>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p 
            className={`font-bold text-white ${
              large ? "text-2xl md:text-3xl" : "text-lg md:text-2xl"
            }`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
