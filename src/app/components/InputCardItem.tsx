import React from "react";

interface InputCardItemProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  step?: number;
  min?: number;
  max?: number;
  icon?: React.ReactNode;
}

export const InputCardItem = ({
  label,
  value,
  onChange,
  placeholder = "0",
  step = 1,
  min = 0,
  max,
  icon,
}: InputCardItemProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon && <div className="w-5 h-5 text-slate-400">{icon}</div>}
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          {label}
        </label>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white font-bold text-lg md:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
      />
    </div>
  );
};
