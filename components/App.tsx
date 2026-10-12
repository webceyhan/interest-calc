import { Calculator } from "@/components/Calculator";
import { Header } from "@/components/Header";
import { ComparisonList } from "@/components/ComparisonList";
import { LanguageSelector } from "@/components/LanguageSelector";
import { RoundingSelector } from "@/components/RoundingSelector";
import { GithubLink } from "@/components/GithubLink";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { NumberFormatProvider } from "@/contexts/NumberFormatContext";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import { BankProductListProvider } from "@/contexts/BankProductListContext";

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-end gap-2 py-4 md:py-6">
          <RoundingSelector />
          <LanguageSelector />
          <GithubLink />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header />

        <Calculator />

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
