import { useContext } from "react";
import { NumberFormatContext } from "@/contexts/NumberFormatContext";

export const useNumberFormat = () => {
  const context = useContext(NumberFormatContext);
  if (!context) {
    throw new Error("useNumberFormat must be used within NumberFormatProvider");
  }
  return context;
};
