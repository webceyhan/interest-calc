import { createContext, useState } from "react";
import {
  DEFAULT_AMOUNT,
  DEFAULT_TERM_DAYS,
  DEFAULT_INTEREST_RATE,
  DEFAULT_RESERVATION_AMOUNT,
} from "@/constants";

interface CalculatorContextType {
  amount: number;
  termDays: number;
  interestRate: number;
  reservationAmount: number;
  setAmount: (amount: number) => void;
  setTermDays: (termDays: number) => void;
  setInterestRate: (interestRate: number) => void;
  setReservationAmount: (reservationAmount: number) => void;
}

export const CalculatorContext = createContext<
  CalculatorContextType | undefined
>(undefined);

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [termDays, setTermDays] = useState<number>(DEFAULT_TERM_DAYS);
  const [interestRate, setInterestRate] = useState<number>(
    DEFAULT_INTEREST_RATE
  );
  const [reservationAmount, setReservationAmount] = useState<number>(
    DEFAULT_RESERVATION_AMOUNT
  );

  return (
    <CalculatorContext.Provider
      value={{
        amount,
        termDays,
        interestRate,
        reservationAmount,
        setAmount,
        setTermDays,
        setInterestRate,
        setReservationAmount,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

