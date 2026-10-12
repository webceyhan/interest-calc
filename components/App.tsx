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
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import { BankProductListProvider } from "@/contexts/BankProductListContext";
import { useTranslations } from "@/hooks/useTranslations";
import { useNumberFormat } from "@/hooks/useNumberFormat";
import { useCalculator } from "@/hooks/useCalculator";
import { useBankProductList } from "@/hooks/useBankProductList";

function AppContent() {
  const { language, setLanguage } = useTranslations();
  useNumberFormat(); // Ensure context is available to children
  const { interestRate, reservationAmount } = useCalculator();
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

          <ResultCard />
        </div>

        <ComparisonList />
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
          <BankProductListProvider>
            <AppContent />
          </BankProductListProvider>
        </CalculatorProvider>
      </NumberFormatProvider>
    </TranslationsProvider>
  );
}

export default App;
