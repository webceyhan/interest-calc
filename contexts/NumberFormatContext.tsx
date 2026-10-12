import { createContext, useState } from "react";
import { DEFAULT_IS_ROUNDED } from "@/constants";

interface NumberFormatContextType {
  isRounded: boolean;
  setIsRounded: (isRounded: boolean) => void;
}

export const NumberFormatContext = createContext<NumberFormatContextType | undefined>(
  undefined
);

export const NumberFormatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRounded, setIsRounded] = useState<boolean>(DEFAULT_IS_ROUNDED);

  return (
    <NumberFormatContext.Provider value={{ isRounded, setIsRounded }}>
      {children}
    </NumberFormatContext.Provider>
  );
};
