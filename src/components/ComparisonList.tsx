"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { translations, Language } from "@/utils/translations";
import { calculateDeposit, formatCurrency } from "@/utils/calculations";

interface ComparisonItem {
  id: string;
  bankCode: string;
  bankName: string;
  interestRate: number;
  reservationAmount: number;
}

const WITHHOLDING_RATE = 0.15;

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

interface ComparisonListProps {
  amount: number;
  termDays: number;
  isRounded: boolean;
  language: Language;
  items: ComparisonItem[];
  onUpdate: (id: string, updates: Partial<ComparisonItem>) => void;
  onRemove: (id: string) => void;
  onShare: () => void;
  onFetch: () => void;
}

export default function ComparisonList({
  amount,
  termDays,
  isRounded,
  language,
  items,
  onUpdate,
  onRemove,
  onShare,
  onFetch,
}: ComparisonListProps) {
  const t = translations[language];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<string>("");
  const [editReserved, setEditReserved] = useState<string>("");
  const editRateInputRef = useRef<HTMLInputElement>(null);

  const sortedItems = [...items].sort((a, b) => b.interestRate - a.interestRate);

  const startEditing = (item: ComparisonItem) => {
    setEditingId(item.id);
    setEditRate(item.interestRate.toString());
    setEditReserved(item.reservationAmount.toString());
  };

  const saveEditing = () => {
    if (editingId) {
      onUpdate(editingId, {
        interestRate: parseFloat(editRate) || 0,
        reservationAmount: parseFloat(editReserved) || 0,
      });
      setEditingId(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (editingId && editRateInputRef.current) {
      setTimeout(() => editRateInputRef.current?.focus(), 0);
    }
  }, [editingId]);

  if (items.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {t.comparisons}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={onFetch}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              {t.fetch}
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              {t.share}
            </button>
          </div>
        </div>

        <div className="text-center py-12 rounded-lg border-2 border-dashed border-slate-600 bg-slate-900/50">
          <p className="text-slate-400 text-lg mb-4">{t.noComparisons}</p>
          <p className="text-slate-500 text-sm">{t.addBanksToCompare}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          {t.comparisons}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onFetch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            {t.fetch}
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            {t.share}
          </button>
        </div>
      </div>

      <div className="space-y-4 animate-slide-in-up">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 md:p-6 border border-slate-700 animate-fade-in"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold text-sm md:text-base">
                  {item.bankCode}
                </span>
                <span className="text-slate-400 text-sm md:text-base">
                  {item.bankName}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(item)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>

            {editingId === item.id ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 gap-y-4 md:gap-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    {t.interestRateLabel}
                  </p>
                  <div className="flex items-center">
                    <span className="text-lg md:text-xl font-black text-white">
                      %
                    </span>
                    <input
                      ref={editRateInputRef}
                      type="number"
                      step="0.1"
                      value={editRate}
                      onChange={(e) => setEditRate(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEditing()}
                      className="text-lg md:text-xl font-black text-white bg-transparent border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:outline-none px-1 flex-1 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    {t.reservationAmount}
                  </p>
                  <input
                    type="number"
                    value={editReserved}
                    onChange={(e) => setEditReserved(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEditing()}
                    className="text-lg md:text-xl font-black text-white bg-transparent border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:outline-none w-full transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    {t.netInterest}
                  </p>
                  <p className="text-lg md:text-xl font-black text-white">
                    {formatCurrency(
                      calculateDeposit(
                        amount,
                        termDays,
                        parseFloat(editRate) || 0,
                        WITHHOLDING_RATE,
                        parseFloat(editReserved) || 0
                      ).netInterest,
                      isRounded
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    {t.finalAmount}
                  </p>
                  <p className="text-lg md:text-xl font-black text-emerald-400">
                    {formatCurrency(
                      calculateDeposit(
                        amount,
                        termDays,
                        parseFloat(editRate) || 0,
                        WITHHOLDING_RATE,
                        parseFloat(editReserved) || 0
                      ).finalAmount,
                      isRounded
                    )}
                  </p>
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
                    {formatCurrency(
                      calculateDeposit(
                        amount,
                        termDays,
                        item.interestRate,
                        WITHHOLDING_RATE,
                        item.reservationAmount
                      ).netInterest,
                      isRounded
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    {t.finalAmount}
                  </p>
                  <p className="text-lg md:text-xl font-black text-emerald-400">
                    {formatCurrency(
                      calculateDeposit(
                        amount,
                        termDays,
                        item.interestRate,
                        WITHHOLDING_RATE,
                        item.reservationAmount
                      ).finalAmount,
                      isRounded
                    )}
                  </p>
                </div>
              </div>
            )}

            {editingId === item.id && (
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
                >
                  {t.clearAll}
                </button>
                <button
                  onClick={saveEditing}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                >
                  Kaydet
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
