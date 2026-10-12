import { TopNav } from "@/components/TopNav";
import { Header } from "@/components/Header";
import { InputCard } from "@/components/InputCard";
import { ResultCard } from "@/components/ResultCard";
import { ComparisonList } from "@/components/ComparisonList";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { NumberFormatProvider } from "@/contexts/NumberFormatContext";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import { BankProductListProvider } from "@/contexts/BankProductListContext";

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <TopNav />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-12 mb-8 md:mb-12">
          <InputCard />

          <ResultCard />
        </div>

        <ComparisonList />
      </div>
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
