import { Calculator } from "@/components/Calculator";
import { Header } from "@/components/Header";
import { ComparisonList } from "@/components/ComparisonList";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { NumberFormatProvider } from "@/contexts/NumberFormatContext";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import { BankProductListProvider } from "@/contexts/BankProductListContext";
import { AuthProvider } from "@/contexts/AuthContext";

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto p-6 md:py-16">
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
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </BankProductListProvider>
        </CalculatorProvider>
      </NumberFormatProvider>
    </TranslationsProvider>
  );
}

export default App;
