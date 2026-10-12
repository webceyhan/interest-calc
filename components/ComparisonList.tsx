import { useState } from "react";
import type { ComparisonItem, TranslationKeys } from "@/types";
import { formatCurrency } from "@/utils/formatting";
import { calculateDeposit } from "@/utils/calculations";
import { WITHHOLDING_RATE } from "@/constants";
import { ShareIcon, ResetIcon } from "@/components/Icons";
import { ComparisonListItem } from "@/components/ComparisonListItem";

export type { ComparisonItem };

interface ComparisonListProps {
  items: ComparisonItem[];
  amount: number;
  termDays: number;
  isRounded: boolean;
  onRemove: (id: string) => void;
  onReset: () => void;
  onUpdate?: (id: string, updates: Partial<ComparisonItem>) => void;
  t: TranslationKeys;
}

export const ComparisonList = ({ items, amount, termDays, isRounded, onRemove, onReset, onUpdate, t }: ComparisonListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<number>(0);
  const [editReserved, setEditReserved] = useState<number>(0);

  const itemsWithResults = items.length > 0 ? items.map((item) => {
    const { netInterest, finalAmount } = calculateDeposit(
      amount,
      termDays,
      item.interestRate,
      WITHHOLDING_RATE,
      item.reservationAmount
    );
    return {
      ...item,
      netInterest,
      finalAmount,
    };
  }) : [];

  const sortedItems = [...itemsWithResults].sort((a, b) => b.netInterest - a.netInterest);
  const bestDealId = sortedItems.length > 1 ? sortedItems[0]?.id : null;

  const handleShare = async () => {
    const maxBankLength = Math.max(...sortedItems.map(item => item.bankName.length));
    
    const shareText = `Bank Comparison\nAmount: ₺${amount.toLocaleString()}\nDays: ${termDays}\n\n${sortedItems
      .map((item, i) => {
        const bankName = item.bankName.padEnd(maxBankLength);
        const rate = `%${item.interestRate.toFixed(1)}`.padStart(5);
        const net = formatCurrency(item.netInterest, isRounded).padStart(10);
        const final = formatCurrency(item.finalAmount, isRounded).padStart(10);
        const star = i === 0 ? "  ⭐" : "";
        return `${bankName}  ${rate}  Net: ${net}  Final: ${final}${star}`;
      })
      .join("\n")}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      alert(t.copied);
    } catch {
      alert("Failed to copy");
    }
  };

  const handleStartEditing = (item: ComparisonItem) => {
    setEditingId(item.id);
    setEditRate(item.interestRate);
    setEditReserved(item.reservationAmount);
  };

  const handleSaveEditing = (id: string) => {
    if (onUpdate) {
      onUpdate(id, { interestRate: editRate, reservationAmount: editReserved });
    }
    setEditingId(null);
  };

  const handleCancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 md:mt-12">
      <div className="flex flex-row justify-between items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
          {t.comparisons}
        </h2>
        {items.length > 0 && (
          <div className="flex gap-2">
            {/* Mobile: Icons only */}
            <button
              onClick={handleShare}
              className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-all active:scale-90">
              <ShareIcon />
            </button>
            <button
              onClick={onReset}
              className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-all active:scale-90">
              <ResetIcon />
            </button>
            
            {/* Desktop: Full buttons */}
            <button
              onClick={handleShare}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 uppercase tracking-wide hover:shadow-md active:scale-95">
              <ShareIcon />
              {t.share}
            </button>
            <button
              onClick={onReset}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 uppercase tracking-wide hover:shadow-md active:scale-95">
              <ResetIcon />
              {t.reset}
            </button>
          </div>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="rounded-2xl p-12 border border-dashed border-gray-600 bg-slate-950/50 flex flex-col items-center justify-center min-h-64">
          <div className="text-center max-w-md">
            <p className="text-lg text-slate-400 font-medium mb-4">
              {t.noComparisons}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              {t.addBanksToCompare}
            </p>
            <p className="text-xs text-slate-500 bg-slate-900/50 rounded-lg p-4">
              {t.comparisonStep1} → {t.comparisonStep2} → {t.comparisonStep3}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedItems.map((item) => (
            <ComparisonListItem
              key={item.id}
              item={item}
              isBestDeal={item.id === bestDealId}
              isEditing={editingId === item.id}
              editRate={editRate}
              editReserved={editReserved}
              amount={amount}
              termDays={termDays}
              isRounded={isRounded}
              onStartEditing={() => handleStartEditing(item)}
              onSaveEditing={() => handleSaveEditing(item.id)}
              onCancelEditing={handleCancelEditing}
              onRemove={() => onRemove(item.id)}
              onEditRateChange={setEditRate}
              onEditReservedChange={setEditReserved}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
};
