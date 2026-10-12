import { useState } from "react";
import type { ComparisonItem } from "@/types";
import { TopNav } from "@/components/TopNav";
import { Header } from "@/components/Header";
import { InputCard } from "@/components/InputCard";
import { ResultCard } from "@/components/ResultCard";
import { ComparisonList } from "@/components/ComparisonList";
import { NameDialog } from "@/components/NameDialog";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { NumberFormatProvider } from "@/contexts/NumberFormatContext";
import { CalculatorProvider } from "@/contexts/BankProductContext";
import { useTranslations } from "@/hooks/useTranslations";
import { useNumberFormat } from "@/hooks/useNumberFormat";
import { useCalculator } from "@/hooks/useCalculator";
import { calculateDeposit } from "@/utils/calculations";
import { DEFAULT_BANKS } from "@/utils/banks";
import { WITHHOLDING_RATE } from "@/constants";

function AppContent() {
  const { language, setLanguage } = useTranslations();
  useNumberFormat(); // Ensure context is available to children
  const { amount, termDays, interestRate, reservationAmount } = useCalculator();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comparisons, setComparisons] = useState<ComparisonItem[]>(() =>
    DEFAULT_BANKS.map((bank, index) => ({
      id: `bank-${index}`,
      bankName: bank.name,
      interestRate: bank.interestRate,
      reservationAmount: bank.reservedAmount,
    }))
  );

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
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-12 mb-8 md:mb-12">
          <InputCard onCompare={handleCompare} />

          <ResultCard
            withholding={withholding}
            netInterest={netInterest}
            finalAmount={finalAmount}
            withholdingRate={WITHHOLDING_RATE}
          />
        </div>

        <ComparisonList
          items={comparisons}
          onRemove={handleRemoveComparison}
          onReset={handleReset}
          onUpdate={handleUpdateComparison}
        />
      </div>

      <NameDialog
        isOpen={isDialogOpen}
        placeholder=""
        onSubmit={handleDialogSubmit}
        onCancel={handleDialogCancel}
      />
    </div>
  );
}

function App() {
  return (
    <TranslationsProvider>
      <NumberFormatProvider>
        <CalculatorProvider>
          <AppContent />
        </CalculatorProvider>
      </NumberFormatProvider>
    </TranslationsProvider>
  );
}

export default App;
