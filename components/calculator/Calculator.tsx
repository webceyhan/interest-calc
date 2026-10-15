import { InputCard } from "@/components/calculator/InputCard";
import { ResultCard } from "@/components/calculator/ResultCard";

export const Calculator = () => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-12 mb-8 md:mb-12">
    <InputCard />
    <ResultCard />
  </div>
);
