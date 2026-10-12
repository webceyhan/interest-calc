import { useState, useRef, useEffect } from "react";
import type { TranslationKeys } from "../utils/translations";
import { formatCurrency } from "../utils/formatting";
import { calculateDeposit } from "../utils/calculations";

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

const PenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

export interface ComparisonItem {
  id: string;
  bankName: string;
  interestRate: number;
  reservationAmount: number;
}

interface ComparisonListProps {
  items: ComparisonItem[];
  amount: number;
  termDays: number;
  isRounded: boolean;
  onRemove: (id: string) => void;
  onReset: () => void;
  onUpdate?: (id: string, updates: Partial<ComparisonItem>) => void;
  t: TranslationKeys;
}

const WITHHOLDING_RATE = 17.5;

export const ComparisonList = ({ items, amount, termDays, isRounded, onRemove, onReset, onUpdate, t }: ComparisonListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<number>(0);
  const [editReserved, setEditReserved] = useState<number>(0);
  const rateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && rateInputRef.current) {
      rateInputRef.current.focus();
    }
  }, [editingId]);

  const itemsWithResults = items.length > 0 ? items.map((item) => {
    const { netInterest, finalAmount } = calculateDeposit(
      amount,
      termDays,
      item.interestRate,
      WITHHOLDING_RATE,
      item.reservationAmount
    );
    return {
      ...item,
      netInterest,
      finalAmount,
    };
  }) : [];

  const sortedItems = [...itemsWithResults].sort((a, b) => b.netInterest - a.netInterest);
  const bestDealId = sortedItems.length > 1 ? sortedItems[0]?.id : null;

  const handleShare = async () => {
    const maxBankLength = Math.max(...sortedItems.map(item => item.bankName.length));
    
    const shareText = `Bank Comparison\nAmount: ₺${amount.toLocaleString()}\nDays: ${termDays}\n\n${sortedItems
      .map((item, i) => {
        const bankName = item.bankName.padEnd(maxBankLength);
        const rate = `%${item.interestRate.toFixed(1)}`.padStart(5);
        const net = formatCurrency(item.netInterest, isRounded).padStart(10);
        const final = formatCurrency(item.finalAmount, isRounded).padStart(10);
        const star = i === 0 ? "  ⭐" : "";
        return `${bankName}  ${rate}  Net: ${net}  Final: ${final}${star}`;
      })
      .join("\n")}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      alert(t.copied);
    } catch {
      alert("Failed to copy");
    }
  };

  const handleStartEditing = (item: ComparisonItem) => {
    setEditingId(item.id);
    setEditRate(item.interestRate);
    setEditReserved(item.reservationAmount);
  };

  const handleSaveEditing = (id: string) => {
    if (onUpdate) {
      onUpdate(id, { interestRate: editRate, reservationAmount: editReserved });
    }
    setEditingId(null);
  };

  const handleCancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 md:mt-12">
      <div className="flex flex-row justify-between items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
          {t.comparisons}
        </h2>
        {items.length > 0 && (
          <div className="flex gap-2">
            {/* Mobile: Icons only */}
            <button
              onClick={handleShare}
              className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-all active:scale-90">
              <ShareIcon />
            </button>
            <button
              onClick={onReset}
              className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-all active:scale-90">
              <ResetIcon />
            </button>
            
            {/* Desktop: Full buttons */}
            <button
              onClick={handleShare}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 uppercase tracking-wide hover:shadow-md active:scale-95">
              <ShareIcon />
              {t.share}
            </button>
            <button
              onClick={onReset}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 uppercase tracking-wide hover:shadow-md active:scale-95">
              <ResetIcon />
              {t.reset}
            </button>
          </div>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="rounded-2xl p-12 border border-dashed border-gray-600 bg-slate-950/50 flex flex-col items-center justify-center min-h-64">
          <div className="text-center max-w-md">
            <p className="text-lg text-slate-400 font-medium mb-4">
              {t.noComparisons}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              {t.addBanksToCompare}
            </p>
            <p className="text-xs text-slate-500 bg-slate-900/50 rounded-lg p-4">
              {t.comparisonStep1} → {t.comparisonStep2} → {t.comparisonStep3}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 border shadow-lg transition-colors animate-slide-in-up ${
                item.id === bestDealId
                  ? "border-gray-700 bg-slate-900 hover:border-gray-600"
                  : "border-gray-700 bg-slate-950 hover:border-gray-600"
              }`}>
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-blue-300">
                      {item.bankName}
                    </h3>
                    {item.id === bestDealId && (
                      <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded">
                        ★ BEST
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartEditing(item)}
                    className="text-lg font-bold text-slate-400 hover:text-slate-200 transition-colors shrink-0 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg">
                    <PenIcon />
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-lg font-bold text-slate-400 hover:text-slate-200 transition-colors shrink-0 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg">
                    ✕
                  </button>
                </div>
              </div>

              {editingId === item.id ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 gap-y-4 md:gap-y-6 mb-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        {t.interestRateLabel}
                      </p>
                      <input
                        ref={rateInputRef}
                        type="number"
                        value={editRate}
                        onChange={(e) => setEditRate(Number(e.target.value))}
                        step="0.1"
                        className="w-full px-0 py-2 bg-transparent text-white text-lg md:text-xl font-black border-0 border-b-2 border-b-slate-600 focus:outline-none focus:ring-0 focus:border-b-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        {t.reservationAmount}
                      </p>
                      <input
                        type="number"
                        value={editReserved}
                        onChange={(e) => setEditReserved(Number(e.target.value))}
                        className="w-full px-0 py-2 bg-transparent text-white text-lg md:text-xl font-black border-0 border-b-2 border-b-slate-600 focus:outline-none focus:ring-0 focus:border-b-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        {t.netInterest}
                      </p>
                      <p className="text-lg md:text-xl font-black text-white">
                        {formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).netInterest, isRounded)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        {t.finalAmount}
                      </p>
                      <p className="text-lg md:text-xl font-black text-white">
                        {formatCurrency(calculateDeposit(amount, termDays, editRate, WITHHOLDING_RATE, editReserved).finalAmount, isRounded)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEditing(item.id)}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all active:scale-95">
                      {t.save}
                    </button>
                    <button
                      onClick={handleCancelEditing}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all active:scale-95">
                      {t.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 gap-y-4 md:gap-y-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                      {t.interestRateLabel}
                    </p>
                    <p className="text-lg md:text-xl font-black text-white">
                      %{item.interestRate.toFixed(1)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                      {t.reservationAmount}
                    </p>
                    <p className="text-lg md:text-xl font-black text-white">
                      {formatCurrency(item.reservationAmount, isRounded)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                      {t.netInterest}
                    </p>
                    <p className="text-lg md:text-xl font-black text-white">
                      {formatCurrency(item.netInterest, isRounded)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                      {t.finalAmount}
                    </p>
                    <p className="text-lg md:text-xl font-black text-white">
                      {formatCurrency(item.finalAmount, isRounded)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
