import { useTranslations } from "@/hooks/useTranslations";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useCalculator } from "@/hooks/useCalculator";
import { calculateDeposit } from "@/utils/calculations";
import { WITHHOLDING_RATE } from "@/constants";
import { CalendarDaysIcon, PieChartIcon, PercentIcon, BanknoteIcon } from "lucide-react";
import { ResultCardItem } from "@/components/calculator/ResultCardItem";

export const ResultCard = () => {
  const { t } = useTranslations();
  const formatCurrency = useFormatCurrency();
  const { amount, termDays, interestRate, reservationAmount } = useCalculator();

  const { withholding, netInterest, finalAmount } = calculateDeposit(
    amount,
    termDays,
    interestRate,
    WITHHOLDING_RATE,
    reservationAmount
  );

  return (
    <div className="lg:col-span-3 bg-linear-to-br from-slate-800 to-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-4 md:p-10">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCardItem
            icon={<CalendarDaysIcon />}
            label={t.dayCount}
            value={String(termDays)}
          />
          <ResultCardItem
            icon={<PercentIcon />}
            label={t.interestRateLabel}
            value={`%${interestRate.toFixed(1)}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCardItem
            icon={<PieChartIcon />}
            label={t.withholdingRate}
            value={`%${WITHHOLDING_RATE}`}
          />
          <ResultCardItem
            icon={<BanknoteIcon />}
            label={t.withholdingAmount}
            value={formatCurrency(withholding)}
          />
        </div>

        {/* Net Interest Amount */}
        <ResultCardItem
          icon={<BanknoteIcon />}
          label={t.netInterest}
          value={formatCurrency(netInterest)}
          large
        />

        {/* Final Amount - Main Result */}
        <ResultCardItem
          icon={<BanknoteIcon />}
          label={t.finalAmount}
          value={formatCurrency(finalAmount)}
          large
        />
      </div>
    </div>
  );
};
