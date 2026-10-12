import type { TranslationKeys } from "../utils/translations";

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
        <div className="space-y-2 md:space-y-3">
          <label className="block text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wide">
            {t.amount}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            placeholder={t.amount}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-white placeholder-slate-400 transition-all duration-200 text-sm md:text-base"
          />
        </div>

        <div className="space-y-2 md:space-y-3">
          <label className="block text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wide">
            {t.termDays}
          </label>
          <input
            type="number"
            value={termDays}
            onChange={(e) => onTermDaysChange(Number(e.target.value))}
            placeholder={t.termDays}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-white transition-all duration-200 placeholder-slate-400 text-sm md:text-base"
          />
        </div>

        <div className="space-y-2 md:space-y-3">
          <label className="block text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wide">
            {t.interestRate}
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => onInterestRateChange(Number(e.target.value))}
            step="0.1"
            placeholder={t.interestRate}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-white placeholder-slate-400 transition-all duration-200 text-sm md:text-base"
          />
        </div>

        <div className="space-y-2 md:space-y-3">
          <label className="block text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wide">
            {t.reservationAmount}
          </label>
          <input
            type="number"
            value={reservationAmount}
            onChange={(e) => onReservationAmountChange(Number(e.target.value))}
            placeholder={t.reservationAmount}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-white transition-all duration-200 placeholder-slate-400 text-sm md:text-base"
          />
        </div>

        <button
          onClick={onCompare}
          className="w-full px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 uppercase tracking-wide text-xs md:text-sm mt-2 md:mt-4 hover:shadow-lg active:scale-95">
          {t.compare}
        </button>
      </div>
    </div>
  );
};
