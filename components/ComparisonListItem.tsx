import { useRef, useEffect } from "react";
import { PencilIcon, XIcon } from "lucide-react";
import type { ComparisonItem } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useCalculator } from "@/hooks/useCalculator";
import { calculateDeposit } from "@/utils/calculations";
import { WITHHOLDING_RATE } from "@/constants";
import { Button } from "@/components/Button";

interface ComparisonListItemProps {
  item: ComparisonItem & {
    netInterest: number;
    finalAmount: number;
  };
  isBestDeal: boolean;
  isEditing: boolean;
  editBankName: string;
  editRate: number;
  editReserved: number;
  onStartEditing: () => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onRemove: () => void;
  onEditBankNameChange: (value: string) => void;
  onEditRateChange: (value: number) => void;
  onEditReservedChange: (value: number) => void;
}

export const ComparisonListItem = ({
  item,
  isBestDeal,
  isEditing,
  editBankName,
  editRate,
  editReserved,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onRemove,
  onEditBankNameChange,
  onEditRateChange,
  onEditReservedChange,
}: ComparisonListItemProps) => {
  const { t } = useTranslations();
  const formatCurrency = useFormatCurrency();
  const { amount, termDays } = useCalculator();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const rateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    if (editBankName === "") {
      nameInputRef.current?.focus();
    } else {
      rateInputRef.current?.focus();
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
          {isEditing ? (
            <input
              ref={nameInputRef}
              type="text"
              value={editBankName}
              onChange={(e) => onEditBankNameChange(e.target.value)}
              placeholder="Bank name"
              className="w-full md:w-1/2 px-0 py-1 bg-transparent text-blue-300 text-lg font-bold border-0 border-b-2 border-b-slate-600 focus:outline-none focus:ring-0 focus:border-b-blue-500 transition-colors placeholder:text-slate-600"
            />
          ) : (
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
          )}
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <Button variant="ghost" onClick={onStartEditing}>
              <PencilIcon className="size-4" />
            </Button>
          )}
          <Button variant="ghost" onClick={onRemove}>
            <XIcon className="size-4" />
          </Button>
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
                {formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).netInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {t.finalAmount}
              </p>
              <p className="text-lg md:text-xl font-black text-white">
                {formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).finalAmount)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={onSaveEditing}
              className="flex-1">
              {t.save}
            </Button>
            <Button
              variant="default"
              onClick={onCancelEditing}
              className="flex-1">
              {t.cancel}
            </Button>
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
              {formatCurrency(item.reservationAmount)}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
              {t.netInterest}
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              {formatCurrency(item.netInterest)}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
              {t.finalAmount}
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              {formatCurrency(item.finalAmount)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
