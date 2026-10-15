import type { ComparisonItem } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";
import { useCalculator } from "@/hooks/useCalculator";
import { InputCardItem } from "@/components/calculator/InputCardItem";

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
        </div>
      </div>
    </>
  );
};
