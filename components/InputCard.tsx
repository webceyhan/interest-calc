import { useState } from "react";
import type { ComparisonItem } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";
import { useCalculator } from "@/hooks/useCalculator";
import { useBankProductList } from "@/hooks/useBankProductList";
import { InputCardItem } from "@/components/InputCardItem";
import { NameDialog } from "@/components/NameDialog";

export const InputCard = () => {
  const { t } = useTranslations();
  const {
    amount,
    termDays,
    interestRate,
    reservationAmount,
    setAmount,
    setTermDays,
    setInterestRate,
    setReservationAmount,
  } = useCalculator();
  const { addProduct } = useBankProductList();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCompare = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (bankName: string) => {
    const newComparison: ComparisonItem = {
      id: Date.now().toString(),
      bankName,
      interestRate,
      reservationAmount,
    };
    addProduct(newComparison);
    setIsDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="lg:col-span-2 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 p-6 md:p-10">
        <div className="space-y-4 md:space-y-6">
          <InputCardItem
            label={t.amount}
            value={amount}
            onChange={setAmount}
            placeholder={t.amount}
          />

          <InputCardItem
            label={t.termDays}
            value={termDays}
            onChange={setTermDays}
            placeholder={t.termDays}
          />

          <InputCardItem
            label={t.interestRate}
            value={interestRate}
            onChange={setInterestRate}
            placeholder={t.interestRate}
            step={0.1}
          />

          <InputCardItem
            label={t.reservationAmount}
            value={reservationAmount}
            onChange={setReservationAmount}
            placeholder={t.reservationAmount}
          />

          <button
            onClick={handleCompare}
            className="w-full px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 uppercase tracking-wide text-xs md:text-sm mt-2 md:mt-4 hover:shadow-lg active:scale-95">
            {t.compare}
          </button>
        </div>
      </div>

      <NameDialog
        isOpen={isDialogOpen}
        placeholder=""
        onSubmit={handleDialogSubmit}
        onCancel={handleDialogCancel}
      />
    </>
  );
};
