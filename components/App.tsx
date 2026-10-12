import { useState } from "react";
import type { ComparisonItem, Language } from "@/types";
import { TopNav } from "@/components/TopNav";
import { Header } from "@/components/Header";
import { InputCard } from "@/components/InputCard";
import { ResultCard } from "@/components/ResultCard";
import { ComparisonList } from "@/components/ComparisonList";
import { NameDialog } from "@/components/NameDialog";
import { translations } from "@/utils/translations";
import { calculateDeposit } from "@/utils/calculations";
import { DEFAULT_BANKS } from "@/utils/banks";

const WITHHOLDING_RATE = 17.5;

function App() {
  const [amount, setAmount] = useState<number>(1000000);
  const [termDays, setTermDays] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(40);
  const [reservationAmount, setReservationAmount] = useState<number>(0);
  const [language, setLanguage] = useState<Language>("en");
  const [isRounded, setIsRounded] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comparisons, setComparisons] = useState<ComparisonItem[]>(() =>
    DEFAULT_BANKS.map((bank, index) => ({
      id: `bank-${index}`,
      bankName: bank.name,
      interestRate: bank.interestRate,
      reservationAmount: bank.reservedAmount,
    }))
  );

  const t = translations[language];
  const { withholding, netInterest, finalAmount } = calculateDeposit(
    amount,
    termDays,
    interestRate,
    WITHHOLDING_RATE,
    reservationAmount
  );

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
    setComparisons([...comparisons, newComparison]);
    setIsDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  const handleRemoveComparison = (id: string) => {
    setComparisons(comparisons.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    const initialComparisons = DEFAULT_BANKS.map((bank, index) => ({
      id: `bank-${index}`,
      bankName: bank.name,
      interestRate: bank.interestRate,
      reservationAmount: bank.reservedAmount,
    }));
    setComparisons(initialComparisons);
  };

  const handleUpdateComparison = (id: string, updates: Partial<ComparisonItem>) => {
    setComparisons(
      comparisons.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <TopNav
          language={language}
          onLanguageChange={setLanguage}
          isRounded={isRounded}
          onRoundedChange={setIsRounded}
          t={t}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header t={t} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-12 mb-8 md:mb-12">
          <InputCard
            amount={amount}
            termDays={termDays}
            interestRate={interestRate}
            reservationAmount={reservationAmount}
            onAmountChange={setAmount}
            onTermDaysChange={setTermDays}
            onInterestRateChange={setInterestRate}
            onReservationAmountChange={setReservationAmount}
            onCompare={handleCompare}
            t={t}
          />

          <ResultCard
            termDays={termDays}
            interestRate={interestRate}
            withholding={withholding}
            netInterest={netInterest}
            finalAmount={finalAmount}
            withholdingRate={WITHHOLDING_RATE}
            isRounded={isRounded}
            t={t}
          />
        </div>

        <ComparisonList
          items={comparisons}
          amount={amount}
          termDays={termDays}
          isRounded={isRounded}
          onRemove={handleRemoveComparison}
          onReset={handleReset}
          onUpdate={handleUpdateComparison}
          t={t}
        />
      </div>

      <NameDialog
        isOpen={isDialogOpen}
        placeholder={t.enterBankName}
        onSubmit={handleDialogSubmit}
        onCancel={handleDialogCancel}
        t={t}
      />
    </div>
  );
}

export default App;
