import { ReactNode } from "react";

interface ComparisonListItemFieldProps {
    label: string;
    value?: string;
    children?: ReactNode;
}

export const ComparisonListItemField = ({
    label,
    value,
    children,
}: ComparisonListItemFieldProps) => (
    <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
            {label}
        </p>
        {value ? (
            <p className="text-lg md:text-xl font-bold text-white">{value}</p>
        ) : (
            children
        )}
    </div>
);
