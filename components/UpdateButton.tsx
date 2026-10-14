import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBankProductList } from "@/hooks/useBankProductList";
import { Button } from "@/components/Button";
import { SaveIcon, LogInIcon, LogOutIcon } from "lucide-react";

export const UpdateButton = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { items } = useBankProductList();

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    try {
      const banksData = items.map(item => ({
        name: item.bankName,
        interestRate: item.interestRate,
        reservedAmount: item.reservationAmount,
      }));

      const response = await fetch("/api/banks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banksData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        setError(data.error || "Failed to update banks");
      }
    } catch (err) {
      setError("Error updating banks: " + (err instanceof Error ? err.message : "Unknown error"));
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        onClick={login}
        title="Sign in with GitHub"
      >
        <LogInIcon className="size-4" />
      </Button>
    );
  }

  return (
    <div className="relative flex items-center gap-3">
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {showSuccess && (
        <span className="text-green-500 font-medium text-sm animate-fade-out">
          Updated
        </span>
      )}

      <Button
        variant="ghost"
        onClick={handleUpdate}
        disabled={loading}
        title="Update bank data"
      >
        <SaveIcon />
      </Button>

      <Button
        variant="ghost"
        onClick={logout}
        title="Sign out"
      >
        <LogOutIcon className="size-4" />
      </Button>
    </div>
  );
};
