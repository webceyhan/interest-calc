import { useState } from "react";
import type { ComparisonItem } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useCalculator } from "@/hooks/useCalculator";
import { useBankProductList } from "@/hooks/useBankProductList";
import { calculateDeposit } from "@/utils/calculations";
import { shareComparison } from "@/utils/shareComparison";
import { WITHHOLDING_RATE } from "@/constants";
import { ShareIcon, ResetIcon } from "@/components/Icons";
import { ComparisonListItem } from "@/components/ComparisonListItem";
import { ComparisonListPlaceholder } from "@/components/ComparisonListPlaceholder";
import { Button } from "@/components/Button";

export type { ComparisonItem };

export const ComparisonList = () => {
  const { t } = useTranslations();
  const formatCurrency = useFormatCurrency();
  const { amount, termDays } = useCalculator();
  const { items, removeProduct, resetProducts, updateProduct } = useBankProductList();
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

  const handleShare = () => {
    shareComparison({
      items: sortedItems,
      amount,
      termDays,
      formatCurrency,
      copiedMessage: t.copied,
    });
  };

  const handleStartEditing = (item: ComparisonItem) => {
    setEditingId(item.id);
    setEditRate(item.interestRate);
    setEditReserved(item.reservationAmount);
  };

  const handleSaveEditing = (id: string) => {
    updateProduct(id, { interestRate: editRate, reservationAmount: editReserved });
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
        <div className="flex gap-2">
          {/* Mobile: Icons only */}
          <Button
            variant="ghost"
            onClick={handleShare}
            className="md:hidden">
            <ShareIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={resetProducts}
            className="md:hidden">
            <ResetIcon />
          </Button>
          
          {/* Desktop: Full buttons */}
          <Button
            variant="outline"
            onClick={handleShare}
            className="hidden md:flex items-center gap-2">
            <ShareIcon />
            {t.share}
          </Button>
          <Button
            variant="outline"
            onClick={resetProducts}
            className="hidden md:flex items-center gap-2">
            <ResetIcon />
            {t.reset}
          </Button>
        </div>
      </div>
      
      {items.length === 0 ? (
        <ComparisonListPlaceholder />
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
              onStartEditing={() => handleStartEditing(item)}
              onSaveEditing={() => handleSaveEditing(item.id)}
              onCancelEditing={handleCancelEditing}
              onRemove={() => removeProduct(item.id)}
              onEditRateChange={setEditRate}
              onEditReservedChange={setEditReserved}
            />
          ))}
        </div>
      )}
    </div>
  );
};
