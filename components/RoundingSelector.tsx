import { useTranslations } from "@/hooks/useTranslations";
import { useNumberFormat } from "@/hooks/useNumberFormat";
import { RoundingOffIcon, RoundingOnIcon } from "@/components/Icons";

export const RoundingSelector = () => {
  const { t } = useTranslations();
  const { isRounded, setIsRounded } = useNumberFormat();

  return (
    <button
      onClick={() => setIsRounded(!isRounded)}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-300"
      title={isRounded ? t.rounded : t.precise}
    >
      {isRounded ? (
        <RoundingOnIcon />
      ) : (
        <RoundingOffIcon />
      )}
    </button>
  );
};
