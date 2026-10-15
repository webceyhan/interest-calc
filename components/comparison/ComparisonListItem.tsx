import { useRef, useEffect } from "react";
import { PencilIcon, XIcon } from "lucide-react";
import type { ComparisonItem } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useCalculator } from "@/hooks/useCalculator";
import { calculateDeposit } from "@/utils/calculations";
import { WITHHOLDING_RATE } from "@/constants";
import { Button } from "@/components/ui/Button";
import { ComparisonListItemField } from "@/components/comparison/ComparisonListItemField";
import { ComparisonListItemInput } from "@/components/comparison/ComparisonListItemInput";

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
      className={`rounded-2xl p-6 border border-gray-700 hover:border-gray-600 shadow-lg transition-colors animate-slide-in-up ${
        isBestDeal ? "bg-slate-900" : "bg-slate-950"
      }`}>
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="md:w-1/2">
              <ComparisonListItemInput
                type="text"
                inputRef={nameInputRef}
                value={editBankName}
                onChange={(v) => onEditBankNameChange(v as string)}
                placeholder={t.bankName}
                className="text-blue-300 placeholder:text-slate-600"
              />
            </div>
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
          {!isEditing && (
            <Button variant="ghost" onClick={onRemove}>
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 gap-y-4 md:gap-y-6 mb-4">
            <ComparisonListItemField label={t.interestRateLabel}>
              <ComparisonListItemInput
                inputRef={rateInputRef}
                value={editRate}
                onChange={(v) => onEditRateChange(v as number)}
                step={0.1}
              />
            </ComparisonListItemField>
            <ComparisonListItemField label={t.reservationAmount}>
              <ComparisonListItemInput
                value={editReserved}
                onChange={(v) => onEditReservedChange(v as number)}
              />
            </ComparisonListItemField>
            <ComparisonListItemField
              label={t.netInterest}
              value={formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).netInterest)}
            />
            <ComparisonListItemField
              label={t.finalAmount}
              value={formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).finalAmount)}
            />
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
          <ComparisonListItemField
            label={t.interestRateLabel}
            value={`%${item.interestRate.toFixed(1)}`}
          />
          <ComparisonListItemField
            label={t.reservationAmount}
            value={formatCurrency(item.reservationAmount)}
          />
          <ComparisonListItemField
            label={t.netInterest}
            value={formatCurrency(item.netInterest)}
          />
          <ComparisonListItemField
            label={t.finalAmount}
            value={formatCurrency(item.finalAmount)}
          />
        </div>
      )}
    </div>
  );
};
