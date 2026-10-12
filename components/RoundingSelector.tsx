import { useTranslations } from "@/hooks/useTranslations";
import { useNumberFormat } from "@/hooks/useNumberFormat";

export const RoundingSelector = () => {
  const { t } = useTranslations();
  const { isRounded, setIsRounded } = useNumberFormat();

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isRounded}
        onChange={(e) => setIsRounded(e.target.checked)}
        className="w-5 h-5 accent-blue-500 cursor-pointer"
        title={isRounded ? t.rounded : t.precise}
      />
      <span className="text-slate-400 font-medium text-sm">{t.rounded}</span>
    </label>
  );
};
