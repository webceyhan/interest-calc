import { useState } from "react";
import { useBankProductList } from "@/hooks/useBankProductList";
import { Button } from "@/components/Button";
import { SaveIcon } from "lucide-react";

export const UpdateButton = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { items } = useBankProductList();

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const banksData = items.map(item => ({
        name: item.bankName,
        interestRate: item.interestRate,
        reservedAmount: item.reservationAmount,
      }));

      const response = await fetch("/api/banks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banksData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch {
      // silent
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      {showSuccess && (
        <span className="text-green-500 text-xs font-medium">Saved!</span>
      )}
      <Button
        variant="ghost"
        onClick={handleUpdate}
        disabled={loading}
        title="Save bank data"
      >
        <SaveIcon className="size-4" />
      </Button>
    </div>
  );
};
