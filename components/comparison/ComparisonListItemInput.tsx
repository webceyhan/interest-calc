import { Ref } from "react";

interface ComparisonListItemInputProps {
    type?: "number" | "text";
    value: number | string;
    onChange: (value: number | string) => void;
    step?: number;
    placeholder?: string;
    inputRef?: Ref<HTMLInputElement>;
    className?: string;
}

export const ComparisonListItemInput = ({
    type = "number",
    value,
    onChange,
    step,
    placeholder,
    inputRef,
    className = "text-white",
}: ComparisonListItemInputProps) => (
    <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        step={step}
        className={`w-full px-0 py-2 bg-transparent text-lg md:text-xl font-black border-0 border-b-2 border-b-slate-600 focus:outline-none focus:ring-0 focus:border-b-blue-500 transition-colors ${className}`}
    />
);
