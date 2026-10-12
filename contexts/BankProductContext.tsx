import { createContext, useState } from "react";
import {
  DEFAULT_TERM_DAYS,
  DEFAULT_INTEREST_RATE,
  DEFAULT_RESERVATION_AMOUNT,
} from "@/constants";

interface BankProductContextType {
  termDays: number;
  interestRate: number;
  reservationAmount: number;
  setTermDays: (termDays: number) => void;
  setInterestRate: (interestRate: number) => void;
  setReservationAmount: (reservationAmount: number) => void;
}

export const BankProductContext = createContext<
  BankProductContextType | undefined
>(undefined);

export const BankProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [termDays, setTermDays] = useState<number>(DEFAULT_TERM_DAYS);
  const [interestRate, setInterestRate] = useState<number>(
    DEFAULT_INTEREST_RATE
  );
  const [reservationAmount, setReservationAmount] = useState<number>(
    DEFAULT_RESERVATION_AMOUNT
  );

  return (
    <BankProductContext.Provider
      value={{
        termDays,
        interestRate,
        reservationAmount,
        setTermDays,
        setInterestRate,
        setReservationAmount,
      }}
    >
      {children}
    </BankProductContext.Provider>
  );
};
