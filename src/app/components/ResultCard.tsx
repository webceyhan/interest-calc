import type { TranslationKeys } from "../utils/translations";
import { formatCurrency } from "../utils/formatting";
import {
  CalendarIcon,
  PercentIcon,
  InterestRateIcon,
  DepositMoneyIcon,
  FinalEarningsIcon,
} from "./ResultIcons";

interface ResultsCardProps {
  termDays: number;
  interestRate: number;
  withholding: number;
  netInterest: number;
  finalAmount: number;
  withholdingRate: number;
  isRounded: boolean;
  t: TranslationKeys;
}

const ResultItem = ({
  icon: Icon,
  label,
  value,
  large = false,
}: {
  icon: React.ComponentType;
  label: string;
  value: string | number;
  large?: boolean;
}) => (
  <div className="rounded-2xl p-3 md:p-6 bg-slate-700/40 border border-slate-600/50 transition-all">
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-12 md:w-14 h-12 md:h-14 bg-slate-500 rounded-full shrink-0 border border-slate-500/50 text-slate-900">
        <div className="w-8 md:w-10 h-8 md:h-10">
          <Icon />
        </div>
      </div>
      <div className={large ? "flex-1" : "flex-1 min-w-0"}>
        <p className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p 
          key={value}
          className={`font-bold text-white animate-fade-in ${large ? "text-2xl md:text-3xl" : "text-lg md:text-2xl"}`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

export const ResultCard = ({
  termDays,
  interestRate,
  withholding,
  netInterest,
  finalAmount,
  withholdingRate,
  isRounded,
  t,
}: ResultsCardProps) => {
  return (
    <div className="lg:col-span-3 bg-linear-to-br from-slate-800 to-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-4 md:p-10">
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ResultItem
            icon={CalendarIcon}
            label={t.dayCount}
            value={termDays}
          />
          <ResultItem
            icon={PercentIcon}
            label={t.interestRateLabel}
            value={`%${interestRate.toFixed(1)}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ResultItem
            icon={InterestRateIcon}
            label={t.withholdingRate}
            value={`%${withholdingRate}`}
          />
          <ResultItem
            icon={DepositMoneyIcon}
            label={t.withholdingAmount}
            value={formatCurrency(withholding, isRounded)}
          />
        </div>

        {/* Net Interest Amount */}
        <ResultItem
          icon={FinalEarningsIcon}
          label={t.netInterest}
          value={formatCurrency(netInterest, isRounded)}
          large
        />

        {/* Final Amount - Main Result */}
        <ResultItem
          icon={FinalEarningsIcon}
          label={t.finalAmount}
          value={formatCurrency(finalAmount, isRounded)}
          large
        />
      </div>
    </div>
  );
};
