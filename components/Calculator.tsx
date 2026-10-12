import { InputCard } from "@/components/InputCard";
import { ResultCard } from "@/components/ResultCard";

export const Calculator = () => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-12">
    <InputCard />
    <ResultCard />
  </div>
);
