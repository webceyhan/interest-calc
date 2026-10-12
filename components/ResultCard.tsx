import { useTranslations } from "@/hooks/useTranslations";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useBankProduct } from "@/hooks/useBankProduct";
import {
  CalendarIcon,
  PercentIcon,
  InterestRateIcon,
  DepositMoneyIcon,
  FinalEarningsIcon,
} from "@/components/Icons";
import { ResultCardItem } from "@/components/ResultCardItem";

interface ResultsCardProps {
  withholding: number;
  netInterest: number;
  finalAmount: number;
  withholdingRate: number;
}

export const ResultCard = ({
  withholding,
  netInterest,
  finalAmount,
  withholdingRate,
}: ResultsCardProps) => {
  const { t } = useTranslations();
  const formatCurrency = useFormatCurrency();
  const { termDays, interestRate } = useBankProduct();

  return (
    <div className="lg:col-span-3 bg-linear-to-br from-slate-800 to-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-4 md:p-10">
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ResultCardItem
            icon={<CalendarIcon />}
            label={t.dayCount}
            value={String(termDays)}
          />
          <ResultCardItem
            icon={<PercentIcon />}
            label={t.interestRateLabel}
            value={`%${interestRate.toFixed(1)}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ResultCardItem
            icon={<InterestRateIcon />}
            label={t.withholdingRate}
            value={`%${withholdingRate}`}
          />
          <ResultCardItem
            icon={<DepositMoneyIcon />}
            label={t.withholdingAmount}
            value={formatCurrency(withholding)}
          />
        </div>

        {/* Net Interest Amount */}
        <ResultCardItem
          icon={<FinalEarningsIcon />}
          label={t.netInterest}
          value={formatCurrency(netInterest)}
          large
        />

        {/* Final Amount - Main Result */}
        <ResultCardItem
          icon={<FinalEarningsIcon />}
          label={t.finalAmount}
          value={formatCurrency(finalAmount)}
          large
        />
      </div>
    </div>
  );
};
