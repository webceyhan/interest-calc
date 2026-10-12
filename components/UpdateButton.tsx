import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBankProductList } from "@/hooks/useBankProductList";
import { Button } from "@/components/Button";
import { SaveIcon } from "@/components/Icons";

export const UpdateButton = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { items } = useBankProductList();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await login(password);
    if (success) {
      setShowAuthModal(false);
      setPassword("");
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Transform ComparisonItem[] to BankData[] format
      const banksData = items.map(item => ({
        name: item.bankName,
        interestRate: item.interestRate,
        reservedAmount: item.reservationAmount,
      }));

      const response = await fetch("/api/banks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`,
        },
        body: JSON.stringify(banksData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Banks updated successfully!");
        setShowUpdateModal(false);
        setPassword("");
        logout();
      } else {
        setError(data.error || "Failed to update banks");
      }
    } catch (err) {
      setError("Error updating banks: " + (err instanceof Error ? err.message : "Unknown error"));
    }
    setLoading(false);
  };

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Button
          variant="ghost"
          onClick={() => setShowAuthModal(true)}
          title="Admin panel"
        >
          <SaveIcon />
        </Button>

        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-lg p-6 w-96 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Admin Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-gray-700 mb-4 focus:outline-none focus:border-blue-500"
                  disabled={loading}
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setPassword("");
                      setError("");
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleUpdate}
        title="Update bank data"
      >
        <SaveIcon />
      </Button>

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg p-6 w-96 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Update</h2>
            <p className="text-gray-300 mb-4">Enter password to update bank data:</p>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-gray-700 mb-4 focus:outline-none focus:border-blue-500"
                disabled={loading}
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setPassword("");
                    setError("");
                  }}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
