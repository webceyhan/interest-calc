import type { TranslationKeys } from "@/types";
import { InputCardItem } from "@/components/InputCardItem";

interface InputCardProps {
  amount: number;
  termDays: number;
  interestRate: number;
  reservationAmount: number;
  onAmountChange: (value: number) => void;
  onTermDaysChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onReservationAmountChange: (value: number) => void;
  onCompare: () => void;
  t: TranslationKeys;
}

export const InputCard = ({
  amount,
  termDays,
  interestRate,
  reservationAmount,
  onAmountChange,
  onTermDaysChange,
  onInterestRateChange,
  onReservationAmountChange,
  onCompare,
  t,
}: InputCardProps) => {
  return (
    <div className="lg:col-span-2 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 p-6 md:p-10">
      <div className="space-y-4 md:space-y-6">
        <InputCardItem
          label={t.amount}
          value={amount}
          onChange={onAmountChange}
          placeholder={t.amount}
        />

        <InputCardItem
          label={t.termDays}
          value={termDays}
          onChange={onTermDaysChange}
          placeholder={t.termDays}
        />

        <InputCardItem
          label={t.interestRate}
          value={interestRate}
          onChange={onInterestRateChange}
          placeholder={t.interestRate}
          step={0.1}
        />

        <InputCardItem
          label={t.reservationAmount}
          value={reservationAmount}
          onChange={onReservationAmountChange}
          placeholder={t.reservationAmount}
        />

        <button
          onClick={onCompare}
          className="w-full px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 uppercase tracking-wide text-xs md:text-sm mt-2 md:mt-4 hover:shadow-lg active:scale-95">
          {t.compare}
        </button>
      </div>
    </div>
  );
};
