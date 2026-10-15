import { useTranslations } from "@/hooks/useTranslations";

export const ComparisonListPlaceholder = () => {
  const { t } = useTranslations();

  return (
    <div className="rounded-2xl p-12 border border-dashed border-gray-600 bg-slate-950/50 flex flex-col items-center justify-center min-h-64">
      <div className="text-center max-w-md">
        <p className="text-lg text-slate-400 font-medium mb-4">
          {t.noComparisons}
        </p>
        <p className="text-sm text-slate-500 mb-4">
          {t.addBanksToCompare}
        </p>
        <p className="text-xs text-slate-500 bg-slate-900/50 rounded-lg p-4">
          {t.comparisonStep1} → {t.comparisonStep2} → {t.comparisonStep3}
        </p>
      </div>
    </div>
  );
};
