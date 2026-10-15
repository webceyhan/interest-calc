import { useTranslations } from "@/hooks/useTranslations";
import { useNumberFormat } from "@/hooks/useNumberFormat";
import { DecimalsArrowLeftIcon, DecimalsArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const RoundingSelector = () => {
  const { t } = useTranslations();
  const { isRounded, setIsRounded } = useNumberFormat();

  return (
    <Button
      variant="ghost"
      onClick={() => setIsRounded(!isRounded)}
      title={isRounded ? t.rounded : t.precise}
    >
      <div className="w-5 h-5">
        {isRounded ? (
          <DecimalsArrowRightIcon />
        ) : (
          <DecimalsArrowLeftIcon />
        )}
      </div>
    </Button>
  );
};
