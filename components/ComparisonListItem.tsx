import { useRef, useEffect } from "react";
import type { ComparisonItem, TranslationKeys } from "@/types";
import { formatCurrency } from "@/utils/formatting";
import { calculateDeposit } from "@/utils/calculations";
import { WITHHOLDING_RATE } from "@/constants";
import { PenIcon } from "@/components/Icons";

interface ComparisonListItemProps {
  item: ComparisonItem & {
    netInterest: number;
    finalAmount: number;
  };
  isBestDeal: boolean;
  isEditing: boolean;
  editRate: number;
  editReserved: number;
  amount: number;
  termDays: number;
  isRounded: boolean;
  onStartEditing: () => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onRemove: () => void;
  onEditRateChange: (value: number) => void;
  onEditReservedChange: (value: number) => void;
  t: TranslationKeys;
}

export const ComparisonListItem = ({
  item,
  isBestDeal,
  isEditing,
  editRate,
  editReserved,
  amount,
  termDays,
  isRounded,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onRemove,
  onEditRateChange,
  onEditReservedChange,
  t,
}: ComparisonListItemProps) => {
  const rateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && rateInputRef.current) {
      rateInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`rounded-2xl p-6 border shadow-lg transition-colors animate-slide-in-up ${
        isBestDeal
          ? "border-gray-700 bg-slate-900 hover:border-gray-600"
          : "border-gray-700 bg-slate-950 hover:border-gray-600"
      }`}>
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-blue-300">
              {item.bankName}
            </h3>
            {isBestDeal && (
              <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded">
                ★ BEST
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onStartEditing}
            className="text-lg font-bold text-slate-400 hover:text-slate-200 transition-colors shrink-0 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg">
            <PenIcon />
          </button>
          <button
            onClick={onRemove}
            className="text-lg font-bold text-slate-400 hover:text-slate-200 transition-colors shrink-0 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg">
            ✕
          </button>
        </div>
      </div>

      {isEditing ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 gap-y-4 md:gap-y-6 mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {t.interestRateLabel}
              </p>
              <input
                ref={rateInputRef}
                type="number"
                value={editRate}
                onChange={(e) => onEditRateChange(Number(e.target.value))}
                step="0.1"
                className="w-full px-0 py-2 bg-transparent text-white text-lg md:text-xl font-black border-0 border-b-2 border-b-slate-600 focus:outline-none focus:ring-0 focus:border-b-blue-500 transition-colors"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {t.reservationAmount}
              </p>
              <input
                type="number"
                value={editReserved}
                onChange={(e) => onEditReservedChange(Number(e.target.value))}
                className="w-full px-0 py-2 bg-transparent text-white text-lg md:text-xl font-black border-0 border-b-2 border-b-slate-600 focus:outline-none focus:ring-0 focus:border-b-blue-500 transition-colors"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {t.netInterest}
              </p>
              <p className="text-lg md:text-xl font-black text-white">
                {formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).netInterest, isRounded)}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {t.finalAmount}
              </p>
              <p className="text-lg md:text-xl font-black text-white">
                {formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).finalAmount, isRounded)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSaveEditing}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all active:scale-95">
              {t.save}
            </button>
            <button
              onClick={onCancelEditing}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all active:scale-95">
              {t.cancel}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 gap-y-4 md:gap-y-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
              {t.interestRateLabel}
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              %{item.interestRate.toFixed(1)}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
              {t.reservationAmount}
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              {formatCurrency(item.reservationAmount, isRounded)}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
              {t.netInterest}
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              {formatCurrency(item.netInterest, isRounded)}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
              {t.finalAmount}
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              {formatCurrency(item.finalAmount, isRounded)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
